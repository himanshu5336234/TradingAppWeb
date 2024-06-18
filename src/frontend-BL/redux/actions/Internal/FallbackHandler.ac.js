import { UPDATE_ERROR_COUNT, RESET_ERROR_COUNT } from "../../../redux/constants/Constants";

export const increaseErrorCount = () => (dispatch) => {
  dispatch({
    type: UPDATE_ERROR_COUNT,
    payload: 1
  });
};

export const decreaseErrorCount = () => (dispatch) => {
  dispatch({
    type: UPDATE_ERROR_COUNT,
    payload: -1
  });
};

export const resetErrorCount = () => (dispatch) => {
  dispatch({
    type: RESET_ERROR_COUNT
  });
};
