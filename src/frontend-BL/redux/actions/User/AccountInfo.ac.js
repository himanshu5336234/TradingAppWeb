import {
  FUTURES_ACCOUNT_INFO_FETCH_FAIL,
  CREATE_POSIITON_ACCOUNT_INFO,
  SET_LIQUIDATION_PRICE,
  SET_LEVERAGE_POS_RISK,
  UPDATE_ISOLATED_WALLET_POS_RISK,
  SET_MARGIN_TYPE,
  API_SNAPSHOT_UPDATED
} from "../../../redux/constants/Constants";
import { fetchOrderDetailsByID, getFuturesPosition } from "../../../../frontend-api-service/Api";
export const fetchAccountPositionInfo = (TracePositionDatabyId, store) => (dispatch) => {
  dispatch({
    type: API_SNAPSHOT_UPDATED,
    payload: false
  });
  getFuturesPosition()
    .then((result) => {
      dispatch({
        type: API_SNAPSHOT_UPDATED,
        payload: true
      });
      if (TracePositionDatabyId !== undefined) {
        TracePositionDatabyId(result.data.positions, store);
      }
      const activePositionsArr = result.data.positionList.filter((item) => Number(item.positionAmount) !== 0);
      for (let i = 0; i < activePositionsArr.length; i++) {
        const activePositionsPayload = {
          sym: activePositionsArr[i].symbol,
          leverage: activePositionsArr[i].leverage,
          side: Math.sign(activePositionsArr[i].positionAmount) === 1 ? "BUY" : "SELL",
          entryPrice: activePositionsArr[i].entryPrice,
          posAmt: parseFloat(activePositionsArr[i].positionAmount),
          marginType: activePositionsArr[i].marginType,
          isolatedWallet: activePositionsArr[i].marginAmount || 0,
          unRealizedPnL: activePositionsArr[i].unRealizedProfitOrLoss,
          margin: activePositionsArr[i].marginAmount
        };
        dispatch({
          type: SET_MARGIN_TYPE,
          payload: {
            sym: activePositionsArr[i].symbol,
            marginType: activePositionsArr[i].marginType.toUpperCase()
          }
        });
        dispatch({
          type: CREATE_POSIITON_ACCOUNT_INFO,
          payload: activePositionsPayload
        });
        dispatch({
          type: SET_LIQUIDATION_PRICE,
          payload: {
            sym: activePositionsArr[i].symbol,
            liquidationPrice: activePositionsArr[i].liquidationPrice
          }
        });
        dispatch({
          type: UPDATE_ISOLATED_WALLET_POS_RISK,
          payload: {
            sym: activePositionsArr[i].symbol,
            isolatedWallet: activePositionsArr[i].marginAmount
          }
        });
        dispatch({
          type: SET_LEVERAGE_POS_RISK,
          payload: {
            sym: activePositionsArr[i].symbol,
            leverage: activePositionsArr[i].leverage
          }
        });
      }

      return Promise.resolve();
    })
    .catch(({ response }) => {
      dispatch({
        type: FUTURES_ACCOUNT_INFO_FETCH_FAIL,
        payload: response.data.message
      });
      console.log(response, "response");
    });
};
export const fetchUserOrderDetailsById = (Id, TracePositionDatabyOrderId, store) => (dispatch) => {
  fetchOrderDetailsByID(Id)
    .then((response) => {
      TracePositionDatabyOrderId(store, response.data.order);
      return Promise.resolve();
    })
    .catch((error) => {
      console.log(error);
      // return Promise.reject(error);
    });
};
