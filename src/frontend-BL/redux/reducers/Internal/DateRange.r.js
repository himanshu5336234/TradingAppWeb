import { RESET_DATE_RANGE_SUCCESS, UPDATE_DATE_RANGE_SUCCESS } from "../../../redux/constants/Constants";

const initialState = {
  from: 4154,
  to: 2147483647
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_DATE_RANGE_SUCCESS:
      return {
        ...state,
        from: payload.from,
        to: payload.to
      };
    case RESET_DATE_RANGE_SUCCESS:
      return {
        ...state,
        from: initialState.from,
        to: initialState.to
      };
    default:
      return state;
  }
}
