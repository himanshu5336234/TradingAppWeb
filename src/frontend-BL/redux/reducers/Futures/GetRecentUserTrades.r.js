import { SET_RECENT_USER_TRADES_SUCCESS, SET_RECENT_USER_TRADES_FAIL } from "../../../redux/constants/Constants";

const initialState = {
  recentUserTrades: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_RECENT_USER_TRADES_SUCCESS:
      return {
        ...state,
        recentUserTrades: payload.data
      };
    case SET_RECENT_USER_TRADES_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
