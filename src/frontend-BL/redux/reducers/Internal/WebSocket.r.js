import { DENSITY_WS_CLOSED, DENSITY_WS_OPENED, BINANCE_WS_OPENED, BINANCE_WS_CLOSED } from "../../../redux/constants/Constants";

const initialState = {
  density: {
    connecting: false,
    opened: false
  },
  binance: {
    connecting: false,
    opened: false
  },
  orderBook: {
    connecting: false,
    opened: false
  }
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DENSITY_WS_OPENED:
      return {
        ...state,
        density: payload
      };
    case DENSITY_WS_CLOSED:
      return {
        ...state,
        density: payload
      };
    case BINANCE_WS_OPENED:
      return {
        ...state,
        binance: payload
      };
    case BINANCE_WS_CLOSED:
      return {
        ...state,
        binance: payload
      };
    default:
      return state;
  }
}
