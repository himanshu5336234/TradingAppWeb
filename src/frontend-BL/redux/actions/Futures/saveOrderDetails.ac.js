import { API_ORDER_TRIGGER, DELETE_API_ORDER_ID, UPDATE_API_ORDER, UPDATE_OPEN_ORDER } from "../../constants/Constants";

export const saveOrderDetails = (response) => (dispatch) => {
  const apiData = {
    clientOrderId: response.data.clientOrderId,
    avgPrice: response.data.avgPrice,
    status: response.data.status,
    executedQty: response.data.executedQty,
    side: response.data.side,
    symbol: response.data.symbol,
    orderType: response.data.origType
  };
  dispatch({
    type: API_ORDER_TRIGGER,
    payload: apiData
  });
};

export const deleteApiOrderIdFromStore = (data) => (dispatch) => {
  dispatch({
    type: DELETE_API_ORDER_ID,
    payload: data
  });
};

export const updateStoredCheckOrderApiData = (data) => (dispatch) => {
  const responsePayload = {
    clientOrderId: data.clientOrderId,
    avgPrice: data.price,
    status: data.status,
    executedQty: data.executedQty,
    side: data.side,
    symbol: data.symbol,
    orderType: data.origType
  };
  dispatch({
    type: UPDATE_API_ORDER,
    payload: responsePayload
  });
};

export const updateOpenOrdersCheckOrderApi = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_OPEN_ORDER,
    payload: data
  });
};
