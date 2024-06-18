import { GET_AGGTRADE_SUCCESS } from "../../constants/Constants";

export const SetAggTradeStatus = (value) => (dispatch) => {
  dispatch({ type: GET_AGGTRADE_SUCCESS, payload: value.payload });
};
