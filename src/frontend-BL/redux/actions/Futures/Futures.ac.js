import {
  OPEN_ORDERS_FETCH_SUCCESS,
  OPEN_ORDERS_FETCH_FAIL,
  ORDER_HISTORY_FETCH_SUCCESS,
  ORDER_HISTORY_FETCH_FAIL,
  TRADE_HISTORY_FETCH_SUCCESS,
  TRADE_HISTORY_FETCH_FAIL,
  TRANSACTION_HISTORY_FETCH_SUCCESS,
  TRANSACTION_HISTORY_FETCH_FAIL,
  POSITIONS_FETCH_FAIL,
  ORDER_CREATION_SUCESS,
  SET_LIQUIDATION_PRICE,
  UPDATE_ISOLATED_WALLET_POS_RISK,
  SET_LEVERAGE_POS_RISK,
  ALL_ORDER_HISTORY_FETCH_SUCCESS,
  ALL_ORDER_HISTORY_FETCH_FAIL,
  DENSITY_WS_SUBSCRIBE_CLOSE_ORDER,
  SET_MARGIN_TYPE
} from "../../../redux/constants/Constants";
import {
  openOrdersApi,
  orderHistoryApi,
  tradeHistoryApi,
  positionRiskApi,
  createOrder,
  allOrderHistoryApi,
  getFuturesAccountDetailsApi,
  getfuturesTransactionhistory,
  closePositionApi,
  tradeIdDataApi,
  // getQuickOrderDataApi,
  changeMarginTypeApi,
  getMarginTypeApi
} from "../../../../frontend-api-service/Api";
import { saveOrderDetails } from "./saveOrderDetails.ac";
import { showSnackBar } from "../Internal/GlobalErrorHandler.ac";
import { formatFuturesTypes } from "../../../../helpers/wallet/formatTransactionTypes";
import { posthog } from "posthog-js";
import axios from "axios";
import { Format } from "../../../../helpers";
import { QUICK_ORDER, SERVER_DOWN_HELPER } from "../../../../frontend-api-service/URI";
import { GetAppURL } from "../../../../frontend-api-service/Base";
import { recordCleverTapEvent } from "../../../../utils/recordCleverTapEvent";

export const fetchFutureAccountDetails = () => (dispatch) => {
  getFuturesAccountDetailsApi()
    .then((response) => {
      dispatch({
        type: "FUTURES_ACCOUNT_INFO_FETCH_SUCCESS",
        payload: response.data
      });
    })
    .catch(({ response }) => {
      dispatch(
        showSnackBar({
          src: "FUTURES_ACCOUNT_INFO_FETCH_FAIL",
          message: response.data.message,
          details: response.data.message,
          type: "failure"
        })
      );
    });
};

export const fetchOpenOrders = (symbol) => (dispatch) => {
  openOrdersApi(symbol).then(
    (result) => {
      dispatch({
        type: OPEN_ORDERS_FETCH_SUCCESS,
        payload: result.data
      });
      return Promise.resolve();
    },
    (error) => {
      const message = error.toString();
      dispatch({
        type: OPEN_ORDERS_FETCH_FAIL,
        payload: message
      });
      return Promise.reject(error);
    }
  );
};

export const fetchPositions = (symbol) => (dispatch) => {
  positionRiskApi(symbol).then(
    (result) => {
      dispatch({
        type: UPDATE_ISOLATED_WALLET_POS_RISK,
        payload: {
          sym: result.data[0].symbol,
          isolatedWallet: result.data[0].isolatedWallet
        }
      });
      dispatch({
        type: SET_LIQUIDATION_PRICE,
        payload: {
          sym: result.data[0].symbol,
          liquidationPrice: result.data[0].liquidationPrice
        }
      });
      dispatch({
        type: SET_LEVERAGE_POS_RISK,
        payload: {
          sym: result.data[0].symbol,
          leverage: result.data[0].leverage
        }
      });
      return Promise.resolve();
    },
    (error) => {
      const message = error.toString();
      dispatch({
        type: POSITIONS_FETCH_FAIL,
        payload: message
      });
      return Promise.reject(error);
    }
  );
};

export const fetchOrderHistory = (symbol) => (dispatch) => {
  orderHistoryApi(symbol).then(
    (result) => {
      dispatch({
        type: ORDER_HISTORY_FETCH_SUCCESS,
        payload: result.data.filter((item) => item.status !== "SCHEDULED")
      });
      return Promise.resolve();
    },
    (error) => {
      const message = error.toString();
      dispatch({
        type: ORDER_HISTORY_FETCH_FAIL,
        payload: message
      });
      return Promise.reject(error);
    }
  );
};

export const fetchALLOrderHistory = () => (dispatch) => {
  allOrderHistoryApi().then(
    (result) => {
      dispatch({
        type: ALL_ORDER_HISTORY_FETCH_SUCCESS,
        payload: result.data
      });
      return Promise.resolve();
    },
    (error) => {
      const message = error.toString();
      dispatch({
        type: ALL_ORDER_HISTORY_FETCH_FAIL,
        payload: message
      });
      return Promise.reject(error);
    }
  );
};

export const fetchTradeHistory = (symbol) => (dispatch) => {
  tradeHistoryApi().then(
    (result) => {
      dispatch({
        type: TRADE_HISTORY_FETCH_SUCCESS,
        payload: result.data
      });
      return Promise.resolve();
    },
    (error) => {
      const message = error.toString();
      dispatch({
        type: TRADE_HISTORY_FETCH_FAIL,
        payload: message
      });
      return Promise.reject(error);
    }
  );
};

export const fetchFuturesTransactionHistory = (payload) => (dispatch) => {
  return getfuturesTransactionhistory(payload).then(
    (result) => {
      const data = result.data.accountIncomeTransactionList.map((element, index) => ({
        ...element,
        internalId: index,
        time: element.createdAt,
        incomeType: formatFuturesTypes(element.incomeType)
      }));
      if (payload.hideSmallBalances) {
        const filteredData = data.filter((rowObj) => Math.abs(rowObj.amount) > 0.01);
        // repeated map for maintaining index order for datagrid
        const updatedIndexData = filteredData.map((element, index) => ({
          ...element,
          internalId: index,
          time: element.createdAt,
          incomeType: formatFuturesTypes(element.incomeType)
        }));
        dispatch({
          type: TRANSACTION_HISTORY_FETCH_SUCCESS,
          payload: updatedIndexData
        });
      } else {
        dispatch({
          type: TRANSACTION_HISTORY_FETCH_SUCCESS,
          payload: data
        });
      }
      return Promise.resolve(result.data.totalCount);
    },
    (error) => {
      const message = error.toString();
      dispatch({
        type: TRANSACTION_HISTORY_FETCH_FAIL,
        payload: message
      });
      return Promise.reject(error);
    }
  );
};

export const getTradeIdData = (tradeID) => {
  const tradeIdData = tradeIdDataApi(tradeID)
    .then((result) => {
      const orderId = result.data.order.ID;
      const trades = result.data.order.trades;
      const tradeData = trades.map((tradesObj) => {
        return {
          commission: tradesObj.commission,
          realizedPnl: tradesObj.realizedPnl,
          tradeId: tradesObj.ID
        };
      });

      return { orderId, tradeData, symbol: result.data.order.symbol };
    })
    .catch((err) => {
      console.log(err, "error tradeid");
      return { orderId: "---", tradeData: [] };
    });
  return tradeIdData;
};
// export const CLOSEPOSITON = (symbol) => (dispatch) => {
export const CLOSEPOSITON = (symbol, callback) => (dispatch) => {
  posthog.capture("close_position_button_click", {
    symbol,
    event_time: new Date().toUTCString()
  });
  closePositionApi({ symbol })
    .then((res) => {
      callback();
      recordCleverTapEvent("CLOSE_POSITION_SUCCESS", {
        symbol
      });
      dispatch(
        showSnackBar({
          src: "CREATE_ORDER_SUCCESS",
          message: "Your order has been closed successfully",
          type: "success"
        })
      );
      dispatch({
        type: DENSITY_WS_SUBSCRIBE_CLOSE_ORDER,
        payload: {
          data: [res?.data],
          type: "MARKET",
          eventType: "CLOSE_ORDER"
        }
      });
    })
    .catch((error) => {
      callback();
      recordCleverTapEvent("CLOSE_POSITION_FAILED", {
        symbol,
        error: error.response.data.message.split(":")[1]
      });
      dispatch(
        showSnackBar({
          src: "CREATE_ORDER_FAILED",
          message: error.response.data.message.split(":")[1],
          type: "failure"
        })
      );
    });
};
// TODO: Modify this function
export const createNewOrder = (symbol, side, type, reduceOnly, quantity) => (dispatch) => {
  createOrder({ reduceOnly, symbol, side, type, quantity })
    .then((result) => {
      dispatch(saveOrderDetails(result));
      dispatch(
        showSnackBar({
          src: "CREATE_ORDER_SUCCESS",
          message: "Your order has been placed successfully",
          type: "success"
        })
      );
      dispatch({
        type: ORDER_CREATION_SUCESS,
        payload: result.data
      });
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch(
        showSnackBar({
          src: "CREATE_ORDER_FAILED",
          message: error.response.data.message.split(":")[1],
          type: "failure"
        })
      );
    });
};
export const SETMARGINTYE = (payload, callback) => (dispatch) => {
  changeMarginTypeApi(payload)
    .then((response) => {
      const { symbol, marginType } = response.data;
      dispatch(
        showSnackBar({
          src: "SET_MARGIN_TYPE_SUCCESS",
          message: "success",
          type: "success"
        })
      );
      recordCleverTapEvent("CHANGE_MARGIN_MODE", {
        marginType: marginType?.toUpperCase(),
        symbol: symbol?.toUpperCase()
      });
      callback(symbol, marginType);
    })
    .catch((error) => {
      dispatch(
        showSnackBar({
          src: "SET_MARGIN_TYPE_FAILED",
          message: error.response.data.message.split(":")[1],
          type: "failure"
        })
      );
    });
};

export const GET_MARGIN_TYPE = (payload) => (dispatch) => {
  getMarginTypeApi(payload)
    .then((response) => {
      dispatch({
        type: SET_MARGIN_TYPE,
        payload: {
          sym: response.data.symbol.toUpperCase(),
          marginType: response.data.marginType.toUpperCase()
        }
      });
    })
    .catch((error) => {
      dispatch(
        showSnackBar({
          src: "GET_MARGIN_TYPE_FAILED",
          message: error.response.data.message.split(":")[1],
          type: "failure"
        })
      );
    });
};
