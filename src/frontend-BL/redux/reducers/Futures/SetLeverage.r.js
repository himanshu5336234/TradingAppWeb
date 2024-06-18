import { SET_LEVERAGE_SUCCESS, SET_LEVERAGE_FAIL } from "../../../redux/constants/Constants";

const initialState = {
  leverage: ""
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LEVERAGE_SUCCESS:
      return {
        ...state,
        leverage: payload.leverage
      };
    case SET_LEVERAGE_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
