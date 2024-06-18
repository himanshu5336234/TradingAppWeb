import { GLOBAL_ERROR_ADD, GLOBAL_ERROR_REMOVE } from "../../../redux/constants/Constants";

const initialState = {
  errorDirectory: []
};

// expected action for GLOBAL_ERROR_ADD = { { type: GLOBAL_ERROR_ADD, payload: {src: SET_LEVERAGE_FAIL, errorCode: 502, errorMessage: "Internal Server Error"} }}
// expected action GLOBAL_ERROR_REMOVE = { { type: GLOBAL_ERROR_REMOVE, payload: {src: SET_LEVERAGE_FAIL} }}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GLOBAL_ERROR_ADD:
      return {
        ...state,
        errorDirectory: [
          ...state.errorDirectory,
          {
            errorType: payload.src,
            errorDialogType: payload.dialogType,
            errorCode: payload.errorCode,
            errorMessage: payload.errorMessage,
            errorUi: payload.errorUi,
            errorTime: new Date().getTime(),
            errorHandlerForReduxStateUpdation: payload.errorHandlerForReduxStateUpdation
          }
        ]
      };
    case GLOBAL_ERROR_REMOVE:
      return {
        ...state,
        errorDirectory: state.errorDirectory.filter((error) => error.errorType !== payload.src)
      };
    default:
      return state;
  }
}
