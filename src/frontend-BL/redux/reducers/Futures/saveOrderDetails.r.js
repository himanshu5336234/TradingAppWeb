/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { API_ORDER_TRIGGER, WS_ORDER_TRIGGER, DELETE_API_ORDER_ID, UPDATE_API_ORDER } from "../../constants/Constants";

const initialState = {
  apiTriggered: false,
  webSocketDataRecieved: false,
  clientOrderId: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case API_ORDER_TRIGGER:
      return {
        ...state,
        clientOrderId: [
          {
            clientOrderId: payload.clientOrderId,
            avgPrice: payload.avgPrice,
            status: payload.status,
            executedQty: payload.executedQty,
            side: payload.side,
            symbol: payload.symbol,
            orderType: payload.orderType
          }
        ]
      };

    case UPDATE_API_ORDER:
      const exisitngOrderId = state.clientOrderId.findIndex((orderData) => orderData.clientOrderId === payload.clientOrderId);
      if (exisitngOrderId !== -1 && state.clientOrderId[exisitngOrderId].clientOrderId === payload.clientOrderId) {
        return {
          ...state,
          clientOrderId: [
            ...state.clientOrderId.slice(0, exisitngOrderId),
            {
              ...state.clientOrderId[exisitngOrderId],
              avgPrice: payload.avgPrice,
              status: payload.status,
              executedQty: payload.executedQty,
              side: payload.side,
              symbol: payload.symbol
            },
            ...state.clientOrderId.slice(exisitngOrderId + 1)
          ]
        };
      } else {
        return {
          ...state,
          clientOrderId: [...state.clientOrderId, payload]
        };
      }

    case DELETE_API_ORDER_ID:
      const filledOrderIndex = state.clientOrderId.findIndex((data) => data.clientOrderId === payload);
      if (filledOrderIndex !== -1) {
        return {
          ...state,
          clientOrderId: [...state.clientOrderId.slice(0, filledOrderIndex), ...state.clientOrderId.slice(filledOrderIndex + 1)]
        };
      } else {
        return {
          ...state
        };
      }

    case WS_ORDER_TRIGGER:
      return {
        ...state,
        webSocketDataRecieved: true,
        apiTriggered: false
      };

    default:
      return state;
  }
}
