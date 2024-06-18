import { createNewSignal } from "../../../../frontend-api-service/Api/SignalTrading/SignalTrading";
import { GetAppURL } from "../../../../frontend-api-service/Base";
import { showSnackBar } from "../../../../frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
export const generateNewSignal = ({ singalData, dispatch, setShowLoader, setShowGenerateConfirm }) => {
  // setShowLoader(true);
  const params = { ...singalData, orderType: returnOrderType(singalData) };
  createNewSignal(params)
    .then(() => {
      dispatch(
        showSnackBar({
          src: "SIGNAL_CREATION_SUCCESS",
          message: "Your order has been created successfully",
          type: "success"
        })
      );
      setShowLoader(false);
      if (setShowGenerateConfirm) setShowGenerateConfirm(false);
      window.location.href = GetAppURL() + "/signal-trading/analyst";
    })
    .catch((err) => {
      dispatch(
        showSnackBar({
          src: "SIGNAL_CREATION_SUCCESS",
          message: err.response.data.details,
          type: "failure"
        })
      );
      setShowLoader(false);
      if (setShowGenerateConfirm) setShowGenerateConfirm(false);
    });
};

const returnOrderType = (params) => {
  if (params.orderType === 1) return "LIMIT";
  // Stop Limit
  if (params.orderType === 3) {
    if (params.orderSide === "BUY") {
      if (params.orderStopPrice < params.lastTradedPrice) {
        return "TAKE_PROFIT";
      } else {
        return "STOP";
      }
    } else if (params.orderSide === "SELL") {
      if (params.orderStopPrice > params.lastTradedPrice) {
        return "TAKE_PROFIT";
      } else {
        return "STOP";
      }
    }
  }
};
