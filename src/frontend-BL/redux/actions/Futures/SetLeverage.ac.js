import { setLeverageApi } from "@/frontend-api-service/Api";
import { SET_LEVERAGE_SUCCESS, SET_LEVERAGE_FAIL, SET_LEVERAGE_POS_RISK } from "../../../redux/constants/Constants";
import { showSnackBar } from "../Internal/GlobalErrorHandler.ac";
export const changeLeverage = (symbol, leverage, errorCallBack, successCallBack) => (dispatch) => {
  return setLeverageApi(symbol, leverage)
    .then((data) => {
      dispatch({
        type: SET_LEVERAGE_POS_RISK,
        payload: {
          sym: symbol.toUpperCase(),
          leverage: data.data.leverage
        }
      });
      dispatch(
        showSnackBar({
          src: SET_LEVERAGE_SUCCESS,
          message: `Leverage is set to ${data.data.leverage}x for ${symbol.toUpperCase()} symbol`,
          type: "success"
        })
      );
      successCallBack();
    })
    .catch((error) => {
      dispatch(
        showSnackBar({
          src: SET_LEVERAGE_FAIL,
          message: error.response.data.message,
          type: "failure"
        })
      );
      errorCallBack(error.response.data.message); // eslint-disable-next-line no-unused-expressions
    });
};
