import { fetchFutureAccountDetails } from "../../redux/actions/Futures/Futures.ac";
// import { availableBalanceAction } from "../../redux/actions/User/AvailableBalance.ac";
import {
  OPEN_ORDERS_UPDATE_SIZE_REST,
  OPEN_ORDERS_UPDATE_SIZE_STREAM,
  UPDATE_ACTIVE_POSITIONS_WEB_STREAM,
  SET_MARGIN_TYPE,
  ERASE_POSITION_DIRECTORY,
  OPEN_ORDERS_FETCH_SUCCESS,
  CREATE_POSIITON_ACCOUNT_INFO,
  UPDATE_ISOLATED_WALLET_POS_RISK,
  REMOVE_POSITIONS_QUANT,
  REMOVE_UNREALISED_PROFITLOSS,
  REMOVE_CROSS_WALLET_DETAILS
} from "../../redux/constants/Constants";

import { fetchAccountPositionInfo } from "../../redux/actions/User/AccountInfo.ac";
import { fetchAllOpenOrdersApi } from "../../../frontend-api-service/Api";

import { showSnackBar } from "../../redux/actions/Internal/GlobalErrorHandler.ac";
import { getLeverage } from "../../redux/actions/Futures/GetLeverage.ac";

const ORDER_STATUS = {
  NEW: "NEW",
  FILLED: "FILLED",
  PARTIALLY_FILLED: "PARTIALLY_FILLED",
  CANCELED: "CANCELED",
  EXPIRED: "EXPIRED"
};

const ORDER_TYPE = {
  MARKET: "MARKET",
  LIMIT: "LIMIT"
};

const ORDER_SIDE = {
  BUY: "BUY",
  SELL: "SELL"
};

const entryPriceHandler = (data, currentPos, preciseEntryPrice) => {
  const prevPosAmt = Number(currentPos[0].posAmt);
  const currentPosAmt = Number(data.l);
  const prevSide = currentPos[0].side;
  const currentSide = data.S;
  const PositionsSide = data.S === ORDER_SIDE.BUY ? Number(1) : Number(-1);
  const sideBasedOnPosAmt = Math.sign(prevPosAmt + PositionsSide * currentPosAmt) === 1 ? ORDER_SIDE.BUY : ORDER_SIDE.SELL;
  if (prevSide === currentSide) {
    return (Math.abs(prevPosAmt) * currentPos[0].entryPrice + Number(data.l) * Number(data.L)) / (Number(data.l) + Math.abs(prevPosAmt));
  }
  if (prevSide !== currentSide) {
    if (prevSide === sideBasedOnPosAmt) {
      return currentPos[0].entryPrice;
    } else {
      return data.L;
    }
  }
};

const createNewPosition = async (data, store) => {
  const leverageDirectory = store.getState().positionsDirectory.leverage.find((obj) => obj.sym === data.s);
  const marginType = store.getState().positionsDirectory.marginType?.find((obj) => obj.sym === data.s);

  const activePositionsPayload = {
    sym: data.s,
    side: data.S,
    entryPrice: Number(data.L),
    posAmt: (data.S === ORDER_SIDE.BUY ? Number(1) : Number(-1)) * Number(data.l),
    leverage: leverageDirectory?.leverage,
    marginType: marginType?.marginType?.toUpperCase(),
    isolatedWallet: 0
  };

  store.dispatch({
    type: CREATE_POSIITON_ACCOUNT_INFO,
    payload: activePositionsPayload
  });
};

const updateActivePosition = async (data, store) => {
  const currentPosition = store.getState().positionsDirectory.currentPositions.filter((s) => s.sym === data.s);
  const PositionsSide = data.S === ORDER_SIDE.BUY ? Number(1) : Number(-1);
  if (Number(currentPosition[0].posAmt) + Number(PositionsSide) * Number(data.l) !== 0) {
    const symbolPrecisionData = store.getState().tradablesymbolList.tradablesymbolList.filter((s) => s.symbol === data.s);
    const leverageDirectory = store.getState().positionsDirectory.leverage.find((obj) => obj.sym === data.s);
    const quantityPrecision = () => {
      if (symbolPrecisionData !== undefined) {
        return symbolPrecisionData[0].quantityPrecision;
      }
    };
    const pricePrecision = () => {
      if (symbolPrecisionData !== undefined) {
        return symbolPrecisionData[0].pricePrecision;
      }
    };
    const preciseEntryPrice = (n) => Number(Number(n).toFixed(pricePrecision()));
    const precisePosAmt = (n) => Number(Number(n).toFixed(quantityPrecision()));

    const activePositionsPayload = {
      sym: data.s,
      // side: data.S,
      entryPrice: entryPriceHandler(data, currentPosition, preciseEntryPrice),
      leverage: leverageDirectory?.leverage,
      posAmt: precisePosAmt(precisePosAmt(currentPosition[0].posAmt) + precisePosAmt(PositionsSide * precisePosAmt(data.l)))
    };
    store.dispatch({
      type: UPDATE_ACTIVE_POSITIONS_WEB_STREAM,
      payload: activePositionsPayload
    });
  } else {
    store.dispatch({ type: REMOVE_POSITIONS_QUANT, payload: data.s });
    store.dispatch({
      type: REMOVE_UNREALISED_PROFITLOSS,
      payload: { symbol: data.s }
    });
    store.dispatch({
      type: REMOVE_CROSS_WALLET_DETAILS,
      payload: { symbol: data.s }
    });
  }
};

const createNewAccountObj = async (data, store) => {
  const accountUpdatePayload = {
    sym: data.symbol,
    isolatedWallet: Number(data.isolatedWallet)
  };
  store.dispatch({
    type: SET_MARGIN_TYPE,
    payload: {
      sym: data.symbol,
      marginType: data.marginType.toUpperCase()
    }
  });
  store.dispatch({
    type: UPDATE_ISOLATED_WALLET_POS_RISK,
    payload: accountUpdatePayload
  });
};

export const checkForPositions = (data) => {
  return data.X === ORDER_STATUS.PARTIALLY_FILLED || data.X === ORDER_STATUS.FILLED;
};

export const positionsHandler = (data, store) => {
  const positionsDirectory = store.getState().positionsDirectory.currentPositions;
  const isActivePosition = positionsDirectory.findIndex((pos) => pos.sym === data.s);
  if (Number(data.l) !== 0) {
    store.dispatch(getLeverage(data.s));
  } else {
    store.dispatch({ type: REMOVE_POSITIONS_QUANT, payload: data.s });
    store.dispatch({
      type: REMOVE_UNREALISED_PROFITLOSS,
      payload: { symbol: data.s }
    });
    store.dispatch({
      type: REMOVE_CROSS_WALLET_DETAILS,
      payload: { symbol: data.s }
    });
  }
  return isActivePosition === -1 ? createNewPosition(data, store) : updateActivePosition(data, store);
};

export const accountUpdateHandler = async (data, store) => {
  return createNewAccountObj(data, store);
};

export const checkForExistingOrderId = (store, clientId) => {
  const clientOrderList = store.getState().saveOrderDetails.clientOrderId;
  if (clientOrderList !== undefined && clientOrderList.length !== 0) {
    const exisitngOrderId = clientOrderList.findIndex((orderData) => orderData.clientOrderId === clientId);
    if (exisitngOrderId !== -1) {
      if (clientOrderList[exisitngOrderId].status === ORDER_STATUS.FILLED || clientOrderList[exisitngOrderId].status === ORDER_STATUS.PARTIALLY_FILLED) {
        return true;
      }
    }
  }
  return false;
};

export function removeOrderFromSnapshot(orderID, store) {
  const openOrdersApiData = store.getState().futures.openOrders;
  const openOrdersApiDataAfterRemoval = openOrdersApiData.filter((openOrder) => openOrder.idUuid !== orderID);

  store.dispatch({
    type: OPEN_ORDERS_UPDATE_SIZE_REST,
    payload: openOrdersApiDataAfterRemoval
  });
}

export function removeOrderFromStream(orderID, store) {
  const openOrdersSocketData = store.getState().OpenOrdersStream.OpenOrdersStream;
  const openOrdersStreamDataAfterRemoval = openOrdersSocketData.filter((openOrder) => openOrder?.c !== orderID);
  store.dispatch({
    type: OPEN_ORDERS_UPDATE_SIZE_STREAM,
    payload: openOrdersStreamDataAfterRemoval
  });
}

export const checkForOpenOrders = (data) => {
  return data.X === ORDER_STATUS.NEW;
};

export const checkForPartiallyFilledOrders = (data) => {
  return data.X === ORDER_STATUS.PARTIALLY_FILLED;
};

export const checkForCancelledOrExpiredOrFilledOrders = (data) => {
  return data.X === ORDER_STATUS.CANCELED || data.x === ORDER_STATUS.EXPIRED || data.X === ORDER_STATUS.FILLED;
};

export const updateBalanceHandler = (data, store) => {
  if (data.ot === ORDER_TYPE.MARKET && (data.X === ORDER_STATUS.PARTIALLY_FILLED || data.X === ORDER_STATUS.FILLED)) {
    store.dispatch(fetchFutureAccountDetails());
  }
  if (data.ot === ORDER_TYPE.LIMIT && data.X === ORDER_STATUS.NEW) {
    store.dispatch(fetchFutureAccountDetails());
  }
};

export function updateFilledSizeForSnapshot(stream, store) {
  const openOrdersApiData = store.getState().futures.openOrders;
  const openOrdersApiDataAfterFilledSize = openOrdersApiData.map((openOrder) => (openOrder.idUuid === stream.i ? { ...openOrder, executedQty: openOrder.executedQty + stream.l } : openOrder));
  store.dispatch({
    type: OPEN_ORDERS_UPDATE_SIZE_REST,
    payload: openOrdersApiDataAfterFilledSize
  });
}

export function updateFilledSizeForStream(stream, store) {
  const openOrdersSocketData = store.getState().OpenOrdersStream.OpenOrdersStream;
  const openOrdersStreamDataAfterFilledSize = openOrdersSocketData.map((openOrder) => (openOrder.i === stream.i ? { ...openOrder, l: openOrder.l + stream.l } : openOrder));
  store.dispatch({
    type: OPEN_ORDERS_UPDATE_SIZE_STREAM,
    payload: openOrdersStreamDataAfterFilledSize
  });
}

export function checkForLiquidatedPosition(stream, store) {
  if (stream.c.includes("autoclose")) {
    store.dispatch({
      type: ERASE_POSITION_DIRECTORY,
      payload: null
    });
    setTimeout(() => {
      store.dispatch(fetchAccountPositionInfo());
    }, 2000);
    setTimeout(() => {
      fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&status=SCHEDULED&status=PARTIALLY_FILLED" }).then((openOrders) => {
        store.dispatch({
          type: OPEN_ORDERS_UPDATE_SIZE_STREAM,
          payload: []
        });
        store.dispatch({
          type: OPEN_ORDERS_FETCH_SUCCESS,
          payload: openOrders.data.data
        });
      });
    }, 2000);
    store.dispatch(
      showSnackBar({
        src: ERASE_POSITION_DIRECTORY,
        message: "Your position has been liquidated. We encourage you to use Stop Loss to avoid further losses!",
        type: "failure"
      })
    );
    return true;
  }
}
