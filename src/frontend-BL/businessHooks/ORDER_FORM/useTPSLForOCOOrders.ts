// import OrderFormContext from "@/components/OrderForm/OrderFormNewWrapper";
import { SymbolPrecisionHelper } from "../../../helpers";
import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editASignal } from "../../../frontend-api-service/Api/SignalTrading/SignalTrading";
import { showSnackBar } from "../../redux/actions/Internal/GlobalErrorHandler.ac";
import { cancelOrderHelper, placeOCOOrderHelper, cancelAllStrategyOrdersHelper } from "./StrategyOrdersHelper";
import { GET_STRATEGY_ORDER } from "../../redux/actions/Futures/GetStrategyOrder.ac";
import { recordCleverTapEvent } from "../../../utils/recordCleverTapEvent";

interface UseTakeProfitProps {
  side: string;
  symbol: string;
  entryPrice: number;
  size: number;
  costValue: string;
  close: Function;
  isSignalTrading: boolean;
}

const useTPSLForOCOOrders = ({ symbol, side, size, entryPrice, costValue, close = () => {}, isSignalTrading }: UseTakeProfitProps) => {
  const dispatch = useDispatch<any>();

  const lastTradedPrice = useSelector((state: { BinanceStreamData: { binanceData: any } }) => state.BinanceStreamData.binanceData?.[`${symbol?.toLowerCase()}@ticker`]);
  const [takeProfitValue, setTakeProfitValue] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLossValue, setStopLossValue] = useState("");
  const [takeProfitError, setTakeProfitError] = useState("");
  const [stopLossError, setStopLossError] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [index, setIndex] = useState(1);
  const [dropDownValueForTakeProfit, setDropDownForTakeProfitValue] = useState("price");
  const [estimateProfitForTakeProfit, setEstimateProfitForTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [dropDownValueForStoploss, setDropDownForStopLossValue] = useState("price");
  const [estimateProfitForStopLoss, setEstimateProfitForStopLoss] = useState("");
  const [loading, setLoading] = useState(false);
  const [strategyOrders, setStrategyOrders] = useState({
    ocoOrders: [],
    individualOrders: [],
    isEmpty: true
  });

  const { symbolPrecisionByMinTickSize, convertToPrecisionValueInContractAssetUnit } = SymbolPrecisionHelper({ symbol });

  useEffect(() => {
    const loadComp = async () => {
      const res = await dispatch(GET_STRATEGY_ORDER(symbol));
      if (res) {
        setStrategyOrders(res);
        if (res && !res.isEmpty) {
          setActiveStep(0);
        }
      }
    };
    loadComp();
  }, [symbol]);

  const handleTakeProfitPrice = (event: any) => {
    const value = event.target.value;
    if (value.length > 0) {
      setTakeProfit(convertToPrecisionValueInContractAssetUnit(value, symbolPrecisionByMinTickSize));
      setTakeProfitValue(convertToPrecisionValueInContractAssetUnit(value, symbolPrecisionByMinTickSize));
      if (!isSignalTrading && size && costValue) calculateEstimateProfitAndLossForTakeProfit(value, entryPrice, size, side);
    } else {
      setTakeProfit("");
      setEstimateProfitForTakeProfit("");
      setTakeProfitValue("");
    }
  };
  const handleTakeProfitAmount = (event: any) => {
    const value = event.target.value;

    if (value.length > 0) {
      setTakeProfit(convertToPrecisionValueInContractAssetUnit(value, symbolPrecisionByMinTickSize));
      let AmountToPice = "";
      if (side === "BUY") {
        AmountToPice = String(Number(entryPrice) + Number(value) / Number(size));
      } else {
        AmountToPice = String(Number(entryPrice) - Number(value) / Number(size));
      }
      setTakeProfitValue(convertToPrecisionValueInContractAssetUnit(AmountToPice, symbolPrecisionByMinTickSize));
      setEstimateProfitForTakeProfit(convertToPrecisionValueInContractAssetUnit(AmountToPice, symbolPrecisionByMinTickSize));
    } else {
      setTakeProfit("");
      setEstimateProfitForTakeProfit("");
      setTakeProfitValue("");
    }
  };
  const handleTakeProfitROE = (event: any) => {
    const value = event.target.value;

    if (value.length > 0) {
      const precisionTP = convertToPrecisionValueInContractAssetUnit(value, 2);
      setTakeProfit(precisionTP);
      const marginGainAfterROE = (Number(costValue) * Number(value)) / 100;
      setEstimateProfitForTakeProfit(convertToPrecisionValueInContractAssetUnit(String(marginGainAfterROE), symbolPrecisionByMinTickSize));

      if (side === "BUY") {
        const AmountToPice = String(Number(entryPrice) + Number(marginGainAfterROE) / Number(size));
        setTakeProfitValue(convertToPrecisionValueInContractAssetUnit(AmountToPice, symbolPrecisionByMinTickSize));
      } else {
        const AmountToPice = String(Number(entryPrice) - Number(marginGainAfterROE) / Number(size));
        setTakeProfitValue(convertToPrecisionValueInContractAssetUnit(AmountToPice, symbolPrecisionByMinTickSize));
      }
    } else {
      setTakeProfit("");
      setEstimateProfitForTakeProfit("");
      setTakeProfitValue("");
    }
  };
  
  const handleStopLossPrice = (event: any) => {
    const value = event.target.value;
    if (value.length > 0) {
      setStopLoss(convertToPrecisionValueInContractAssetUnit(value, symbolPrecisionByMinTickSize));
      setStopLossValue(convertToPrecisionValueInContractAssetUnit(value, symbolPrecisionByMinTickSize));
      if (!isSignalTrading && size && costValue) calculateEstimateProfitAndLossForStopLoss(value, size, side, entryPrice);
    } else {
      setStopLoss("");
      setEstimateProfitForStopLoss("");
      setStopLossValue("");
    }
  };
  const handleStopLossAmount = (event: any) => {
    const value = event.target.value;
    if (value.length > 0) {
      setStopLoss(convertToPrecisionValueInContractAssetUnit(value, symbolPrecisionByMinTickSize));
      let AmountToPice = "";
      if (side === "BUY") {
        AmountToPice = String(Number(entryPrice) - Number(value) / Number(size));
      } else {
        AmountToPice = String(Number(entryPrice) + Number(value) / Number(size));
      }
      setStopLossValue(convertToPrecisionValueInContractAssetUnit(AmountToPice, symbolPrecisionByMinTickSize));
      setEstimateProfitForStopLoss(convertToPrecisionValueInContractAssetUnit(AmountToPice, symbolPrecisionByMinTickSize));
    } else {
      setStopLoss("");
      setEstimateProfitForStopLoss("");
      setStopLossValue("");
    }
  };
  const handleStopLossROE = (event: any, costValue: string) => {
    const value = event.target.value;
    if (value.length > 0) {
      setStopLoss(convertToPrecisionValueInContractAssetUnit(value, symbolPrecisionByMinTickSize));
      const marginGainAfterROE = String((Number(costValue) * Number(value)) / 100);
      setEstimateProfitForStopLoss(convertToPrecisionValueInContractAssetUnit(marginGainAfterROE, symbolPrecisionByMinTickSize));
      if (side === "BUY") {
        const AmountToPice = Number(entryPrice) - Number(marginGainAfterROE) / Number(size);
        setStopLossValue(convertToPrecisionValueInContractAssetUnit(String(AmountToPice), symbolPrecisionByMinTickSize));
      } else {
        const AmountToPice = entryPrice + Number(marginGainAfterROE) / size;
        setStopLossValue(convertToPrecisionValueInContractAssetUnit(String(AmountToPice), symbolPrecisionByMinTickSize));
      }
    } else {
      setStopLoss("");
      setEstimateProfitForStopLoss("");
      setStopLossValue("");
    }
  };
  const calculateEstimateProfitAndLossForStopLoss = useCallback(
    (payload: string, size: number, side: string, entryPrice: number) => {
      // const MarketOrderType = (state.OrderType === 1 || state.OrderType === 3) ? "LIMIT" : (state.OrderType === 2) ? "STOP_MARKET" : "MARKET"
      if (side === "BUY") {
        const Pnl = Number(size) * (Number(entryPrice) - Number(payload));
        if (Pnl > 0) {
          setEstimateProfitForStopLoss(convertToPrecisionValueInContractAssetUnit(String(Pnl), symbolPrecisionByMinTickSize));
        } else {
          setEstimateProfitForStopLoss("");
        }
      } else {
        const Pnl = Number(size) * (Number(payload) - Number(entryPrice));
        if (Pnl > 0) {
          setEstimateProfitForStopLoss(convertToPrecisionValueInContractAssetUnit(String(Pnl), symbolPrecisionByMinTickSize));
        } else {
          setEstimateProfitForStopLoss("");
        }
      }
    },
    [symbolPrecisionByMinTickSize]
  );

  const handleTakeProfit = (event: any) => {
    setTakeProfitError("");
    if (dropDownValueForTakeProfit === "price") {
      handleTakeProfitPrice(event);
    } else if (dropDownValueForTakeProfit === "amount") {
      handleTakeProfitAmount(event);
    } else {
      handleTakeProfitROE(event);
    }
  };
  const handleStopLoss = (event: any) => {
    setStopLossError("");

    if (dropDownValueForStoploss === "price") {
      handleStopLossPrice(event);
    } else if (dropDownValueForStoploss === "amount") {
      handleStopLossAmount(event);
    } else {
      handleStopLossROE(event, costValue);
    }
  };
  const handleTakeProfitDropDownValue = (payload: string) => {
    setDropDownForTakeProfitValue(payload);
    handleTakeProfit({ target: { value: "" } });
    handleStopLoss({ target: { value: "" } });
  };
  const handleStopLossValueDropDownValue = (payload: string) => {
    setDropDownForStopLossValue(payload);
    handleTakeProfit({ target: { value: "" } });
    handleStopLoss({ target: { value: "" } });
  };
  const handleStopLossAndTakeProfitDropDownValue = (payload: string) => {
    handleStopLossValueDropDownValue(payload);
    handleTakeProfitDropDownValue(payload);
  };

  const calculatedMaxPercentangeProfitLoss = (ltp: string, type: "SL" | "TP") => {
    const amount = type === "SL" ? calculatedMaxLossAmount(ltp) : calculatedMinProfitAmount(ltp);
    return convertToPrecisionValueInContractAssetUnit(String(Number(amount) * 100) / Number(costValue), 2);
  };

  const calculatedMinProfitAmount = (ltp: string) => {
    let amount = 0;
    if (side === "SELL") {
      amount = (Number(entryPrice) - Number(ltp)) * Number(size);
    } else {
      amount = (Number(ltp) - Number(entryPrice)) * Number(size);
    }
    return convertToPrecisionValueInContractAssetUnit(String(amount), symbolPrecisionByMinTickSize);
  };

  const calculatedMaxLossAmount = (ltp: string) => {
    let amount = 0;
    if (side === "SELL") {
      amount = (Number(ltp) - Number(entryPrice)) * Number(size);
    } else {
      amount = (Number(entryPrice) - Number(ltp)) * Number(size);
    }
    return convertToPrecisionValueInContractAssetUnit(String(amount), symbolPrecisionByMinTickSize);
  };

  const handleTakeProfitStopLossValidation = () => {
    let validation = true;
    const value = lastTradedPrice;
    if (isSignalTrading) {
      if (takeProfitValue.length <= 0) {
        setTakeProfitError("Take Profit value can not be empty");
        validation = false;
      }
      if (stopLossValue.length <= 0) {
        setStopLossError("Stop Loss value can not be empty");
        validation = false;
      }
      if (!validation) return;
    }
    if (!takeProfitValue && !stopLossValue) {
      setTakeProfitError(`Both Take Profit and Stop Loss Value can not be empty`);
      setStopLossError(`Both Take Profit and Stop Loss Value can not be empty`);
      validation = false;
    }
    if (side === "BUY") {
      if (takeProfitValue.length > 0 && Number(value) > Number(takeProfitValue)) {
        if (dropDownValueForTakeProfit === "amount") {
          setTakeProfitError(`Amount value can not be lesser than ${calculatedMinProfitAmount(value)} for Last Traded Price: ${value}`);
        } else if (dropDownValueForTakeProfit === "ROE") {
          setTakeProfitError(`Value can not be lesser than ${calculatedMaxPercentangeProfitLoss(value, "TP")} for Last Traded Price: ${value}`);
        } else setTakeProfitError(`Take Profit should be greater than the Last Traded Price`);
        validation = false;
      }
      if (stopLossValue.length > 0 && Number(value) < Number(stopLossValue)) {
        if (dropDownValueForStoploss === "amount") {
          setStopLossError(`Amount value can not be lesser than ${calculatedMaxLossAmount(value)} for Last Traded Price: ${value}`);
        } else if (dropDownValueForStoploss === "ROE") {
          setStopLossError(`Value can not be lesser than ${calculatedMaxPercentangeProfitLoss(value, "SL")} for Last Traded Price: ${value}`);
        } else setStopLossError(`Stop Loss should be less than the Last Traded Price`);
        validation = false;
      }
    } else {
      if (takeProfitValue.length > 0 && Number(value) < Number(takeProfitValue)) {
        if (dropDownValueForTakeProfit === "amount") {
          setTakeProfitError(`Amount value can not be lesser than ${calculatedMinProfitAmount(value)} for Last Traded Price: ${value}`);
        } else if (dropDownValueForTakeProfit === "ROE") {
          setTakeProfitError(`Value can not be lesser than ${calculatedMaxPercentangeProfitLoss(value, "TP")} for Last Traded Price: ${value}`);
        } else setTakeProfitError(`Take Profit should be less than the Last Traded Price`);
        validation = false;
      }
      if (stopLossValue.length > 0 && Number(value) > Number(stopLossValue)) {
        if (dropDownValueForStoploss === "amount") {
          setStopLossError(`Amount value can not be lesser than ${calculatedMaxLossAmount(value)} for Last Traded Price: ${value}`);
        } else if (dropDownValueForStoploss === "ROE") {
          setStopLossError(`Value can not be lesser than ${calculatedMaxPercentangeProfitLoss(value, "SL")} for Last Traded Price: ${value}`);
        } else setStopLossError(`Stop Loss should be greater than the Last Traded Price`);
        validation = false;
      }
    }
    return validation;
  };

  const handleLastClick = (type: "TAKE_PROFIT" | "STOP_LOSS") => {
    if (type === "TAKE_PROFIT") {
      handleTakeProfit({ target: { value: lastTradedPrice } });
    } else {
      handleStopLoss({ target: { value: lastTradedPrice } });
    }
  };

  const placeOCOOrder = () => {
    const strategyOrdersToPlace = [];
    if (takeProfit.length > 0) {
      strategyOrdersToPlace.push({
        symbol,
        side: side === "BUY" ? "SELL" : "BUY",
        type: "TAKE_PROFIT_MARKET",
        stopPrice: String(takeProfitValue),
        reduceOnly: true,
        timeInForce: "GTE_GTC",
        price: String(entryPrice),
        quantity: String(size)
      });
    }
    if (stopLoss.length > 0) {
      strategyOrdersToPlace.push({
        symbol,
        side: side === "BUY" ? "SELL" : "BUY",
        type: "STOP_MARKET",
        stopPrice: String(stopLossValue),
        reduceOnly: true,
        timeInForce: "GTE_GTC",
        price: String(entryPrice),
        quantity: String(size)
      });
    }
    strategyOrdersToPlace?.forEach((obj, index) => {
      const orderType = index === 0 ? "TP" : "SL";
      recordCleverTapEvent(`PLACE_OTOCO_ORDER_${orderType}`, {
        symbol: obj?.symbol,
        side: obj?.side,
        type: obj?.type,
        price: obj?.price,
        stopPrice: obj?.stopPrice,
        quantity: obj?.quantity
      });
    });
    setLoading(true);
    placeOCOOrderHelper({
      strategyOrdersToPlace,
      setLoading,
      setStrategyOrders,
      dispatch,
      close
    });
  };

  const cancelOrder = ({ orders, setLoading }: { orders: any[]; setLoading: Function }) => {
    cancelOrderHelper({ orders, close, dispatch, setLoading });
  };

  function handleContinue() {
    if (handleTakeProfitStopLossValidation()) {
      setActiveStep(2);
    }
  }

  const getActions = () => {
    switch (activeStep) {
      case 0:
        return {
          primaryName: "Add TP/SL",
          secondaryName: "Cancel All Orders",
          primaryAction: () => setActiveStep(1),
          secondaryAction: () => setActiveStep(3)
        };
      case 1:
        return {
          primaryName: "Continue",
          secondaryName: "Cancel",
          primaryAction: () => handleContinue(),
          secondaryAction: () => close()
        };
      case 2:
        return {
          primaryName: "Confirm Order",
          secondaryName: "Cancel",
          primaryAction: () => placeOCOOrder(),
          secondaryAction: () => setActiveStep(1)
        };
      case 3:
        return {
          secondaryName: "Dismiss",
          primaryName: "Yes I am Sure",
          primaryAction: () => {
            let orderId: any[] = [];
            if (strategyOrders?.ocoOrders.length > 0) {
              orderId = [...strategyOrders?.ocoOrders.reduce((acc: any, curr) => acc.concat(curr), []).map((item: any) => item["idUuid"])];
            }
            if (strategyOrders?.individualOrders.length > 0) {
              orderId = [...orderId, ...strategyOrders?.individualOrders.map((item: any) => item["idUuid"])];
            }
            cancelAllStrategyOrdersHelper({
              orders: orderId,
              setLoading,
              dispatch,
              close
            });
          },
          secondaryAction: () => setActiveStep(0)
        };
      case 4:
        return {
          secondaryName: "Dismiss",
          primaryName: "Yes I am Sure",
          primaryAction: () =>
            cancelAllStrategyOrdersHelper({
              orders: strategyOrders.ocoOrders[index - 1].map((item) => item.idUuid),
              setLoading,
              dispatch,
              close
            }),
          secondaryAction: () => setActiveStep(0)
        };
      default:
        return {
          secondaryName: "Dismiss",
          primaryName: "Yes I am Sure",
          primaryAction: () => setActiveStep(4),
          secondaryAction: () => setActiveStep(0)
        };
    }
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
    stopLoss,
    dropDownValueForStoploss,
    estimateProfitForStopLoss,
    handleStopLoss,
    strategyOrders,
    setStrategyOrders,
    estimateProfitForTakeProfit,
    stopLossValidaionError: stopLossError,
    takeProfitValidationError: takeProfitError,
    takeProfit,
    handleStopLossAndTakeProfitDropDownValue,
    handleTakeProfitDropDownValue,
    handleTakeProfit,
    handleTakeProfitStopLossValidation,
    loading,
    setLoading,
    placeOCOOrder,
    cancelOrder,
    getActions,
    activeStep,
    setActiveStep,
    index,
    setIndex,
    takeProfitValue,
    stopLossValue,
    handleLastClick,
    addNewTPSL,
    dropDownValueForTakeProfit,
    handleContinue,
    lastTradedPrice,
    calculatedMinProfitAmount
  };
};

export default useTPSLForOCOOrders;
