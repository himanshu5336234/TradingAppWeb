import { AVAILABLE_BALANCE_FETCH_SUCCESS, AVAILABLE_BALANCE_FETCH_FAIL } from "../../../redux/constants/Constants";

const initialState = {
  availableBalance: 0
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AVAILABLE_BALANCE_FETCH_SUCCESS:
      return {
        ...state,
        availableBalance: payload.availableBalance
      };
    case AVAILABLE_BALANCE_FETCH_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
