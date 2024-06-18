import { OPEN_ORDERS_WEB_STREAM, OPEN_ORDERS_UPDATE_SIZE_STREAM } from "../../../redux/constants/Constants";

const initialState = {
  OpenOrdersStream: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_ORDERS_WEB_STREAM:
      return {
        ...state,
        OpenOrdersStream: [...state.OpenOrdersStream, payload]
      };
    case OPEN_ORDERS_UPDATE_SIZE_STREAM:
      return {
        ...state,
        OpenOrdersStream: payload
      };
    default:
      return state;
  }
}
