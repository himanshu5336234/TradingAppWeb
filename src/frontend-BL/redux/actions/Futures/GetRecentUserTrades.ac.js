import { SET_RECENT_USER_TRADES_SUCCESS, SET_RECENT_USER_TRADES_FAIL } from "../../../redux/constants/Constants";

export const setRecentUserTrades = (successFlag, apiResponse) => (dispatch) => {
  if (successFlag) {
    dispatch({
      type: SET_RECENT_USER_TRADES_SUCCESS,
      payload: apiResponse
    });
  } else {
    dispatch({
      type: SET_RECENT_USER_TRADES_FAIL,
      payload: apiResponse.msg
    });
  }
};
