import { useState, useEffect } from "react";
import { editASignal } from "@/frontend-api-service/Api/SignalTrading/SignalTrading";
// import { SymbolPrecisionHelper } from "@/helpers";
import { _24hrTicker } from "@/frontend-api-service/Api";
import { useDispatch } from "react-redux";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
const symbolPrecisionByMinTickSize = 3;
// import { useSelector } from "react-redux"
export const useAddTPSLSignalTrading = ({ side, symbol, close }: { side: string; symbol: string; close: Function }) => {
  const [takeProfitValue, setTakeProfitValue] = useState("");
  const [stopLossValue, setStopLossValue] = useState("");
  const [lastTradedPrice, setLastTradedPrice] = useState();
  const [takeProfitError, setTakeProfitError] = useState("");
  const [stopLossError, setStopLossError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    _24hrTicker(symbol).then((res: any) => {
      setLastTradedPrice(res.data.lastPrice);
    });
  }, [symbol]);

  // const {symbolPrecisionByMinTickSize} = SymbolPrecisionHelper({symbol});

  const convertToPrecisionValueInPrecisionUnit = (value: number, Precision: number) => {
    let numStr = value.toString();
    numStr = numStr.replace(/-/g, "");
    // Find the index of the decimal point
    const decimalIndex = numStr.indexOf(".");

    // If there is a decimal point, remove the portion before it
    if (decimalIndex !== -1) {
      return (numStr = numStr.substr(0, Precision + decimalIndex + 1));
    } else {
      return numStr;
    }
  };

  const handleTakeProfit = (e: any) => {
    const val = e.target.value;
    setTakeProfitError("");
    if (val.length > 0) setTakeProfitValue(convertToPrecisionValueInPrecisionUnit(val, symbolPrecisionByMinTickSize));
    else setTakeProfitValue("");
  };
  const handleStopLoss = (e: any) => {
    const val = e.target.value;
    setStopLossError("");
    if (val.length > 0) setStopLossValue(convertToPrecisionValueInPrecisionUnit(val, symbolPrecisionByMinTickSize));
    else setStopLossValue("");
  };

  const handleTakeProfitStopLossValidation = () => {
    let validation = true;
    const value = lastTradedPrice;
    if (takeProfitValue.length <= 0) {
      setTakeProfitError("Take Profit value can not be empty");
      validation = false;
      return;
    }
    if (stopLossValue.length <= 0) {
      setStopLossError("Stop Loss value can not be empty");
      validation = false;
      return;
    }
    if (side === "BUY") {
      if (takeProfitValue.length > 0 && Number(value) > Number(takeProfitValue)) {
        setTakeProfitError(`Take Profit should be greater than the Last Traded Price`);
        validation = false;
      }
      if (stopLossValue.length > 0 && Number(value) < Number(stopLossValue)) {
        setStopLossError(`Stop Loss should be less than the Last Traded Price`);
        validation = false;
      }
    } else {
      if (takeProfitValue.length > 0 && Number(value) < Number(takeProfitValue)) {
        setTakeProfitError(`Take Profit should be less than the Last Traded Price`);
        validation = false;
      }
      if (stopLossValue.length > 0 && Number(value) > Number(stopLossValue)) {
        setStopLossError(`Stop Loss should be greater than the Last Traded Price`);
        validation = false;
      }
    }
    return validation;
  };

  const submitNewPrice = (signalId: string, dispatchLatestListOfSignalsForAnalyst: Function) => {
    const reqBody = {
      signalId,
      takeProfitStopPrice: Number(takeProfitValue),
      stopLossStopPrice: Number(stopLossValue)
    };

    setLoading(true);

    editASignal(reqBody)
      .then(() => {
        dispatchLatestListOfSignalsForAnalyst();
        dispatch(
          showSnackBar({
            src: "ADD_TP_SL_SUCCESS",
            message: "TP SL ADDED SUCCESSFULLY",
            type: "success"
          })
        );
        setLoading(false);

        close();
        // setShowEditTPSLModal(false)
        // setshowEditTriggerPriceBox(false);
      })
      .catch((err: any) => {
        // setshowEditTriggerPriceBox(false);
        setLoading(false);
        dispatch(
          showSnackBar({
            src: "ADD_TP_SL_FAILED",
            message: err.response.data.details,
            type: "failure"
          })
        );
      });
  };

  const addNewTPSL = (signalId: string, dispatchLatestListOfSignalsForAnalyst: Function) => {
    if (!handleTakeProfitStopLossValidation()) return;

    submitNewPrice(signalId, dispatchLatestListOfSignalsForAnalyst);
  };

  return {
    takeProfitValue,
    stopLossValue,
    setTakeProfitValue,
    setStopLossValue,
    takeProfitValidationError: takeProfitError,
    stopLossErrorValidationError: stopLossError,
    addNewTPSL,
    handleTakeProfit,
    handleStopLoss,
    handleTakeProfitStopLossValidation,
    loading
  };
};
