import { UPDATE_ERROR_COUNT, RESET_ERROR_COUNT } from "../../../redux/constants/Constants";

const initialState = {
  errorCount: 0
};

// expected action for GLOBAL_ERROR_ADD = { { type: GLOBAL_ERROR_ADD, payload: {src: SET_LEVERAGE_FAIL, errorCode: 502, errorMessage: "Internal Server Error"} }}
// expected action GLOBAL_ERROR_REMOVE = { { type: GLOBAL_ERROR_REMOVE, payload: {src: SET_LEVERAGE_FAIL} }}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_ERROR_COUNT:
      return {
        ...state,
        errorCount: state.errorCount + payload
      };
    case RESET_ERROR_COUNT:
      return {
        ...state,
        errorCount: 0
      };
    default:
      return state;
  }
}
