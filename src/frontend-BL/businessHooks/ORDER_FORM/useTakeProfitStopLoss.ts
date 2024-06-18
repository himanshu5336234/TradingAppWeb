import { SymbolPrecisionHelper } from "../../../helpers";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
const useTakeProfitStopLoss = ({ state, dispatchOrderEvent }: { state: any; dispatchOrderEvent: Function }) => {
  const symbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  // const lastTradedPrice = useSelector((state: any) => state.BinanceStreamData.ticker.find((item: any) => symbol && item.symbol === symbol.toUpperCase()));
  const lastTradedPrice = useSelector((state: any) => state.BinanceStreamData.binanceData?.[`${symbol?.toLowerCase()}@ticker`]);
  const [takeProfit, setTakeProfit] = useState<string>("");
  const [dropDownValueForTakeProfit, setDropDownForTakeProfitValue] = useState<string>("price");
  const [estimateProfitForTakeProfit, setEstimateProfitForTakeProfit] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [dropDownValueForStoploss, setDropDownForStopLossValue] = useState<string>("price");
  const [estimateProfitForStopLoss, setEstimateProfitForStopLoss] = useState<string>("");
  const { symbolPrecisionByMinTickSize, symbolPricePrecision } = SymbolPrecisionHelper({ symbol });
  useEffect(() => {
    clearAllStateWhenTakeProfitStopLossActive();
  }, [symbol, state.OrderType, state.limitPrice, state.size, state.triggerPrice, state.side]);
  const convertToPrecisionValueInPrecisionUnit = (value: number, Precision: number) => {
    let numStr = value.toString();
    numStr = numStr.replace(/-/g, "");
    if (numStr.startsWith(".")) {
      numStr = `0${numStr}`; // Add a leading zero
    }

    // Find the index of the decimal point
    const decimalIndex = numStr.indexOf(".");

    // If there is a decimal point, remove the portion before it
    if (decimalIndex !== -1) {
      return (numStr = numStr.substr(0, Precision + decimalIndex + 1));
    } else {
      return numStr;
    }
  };
  const Price = (payload: string) => {
    if (payload === "LIMIT") {
      return Number(state.limitPrice);
    } else if (payload === "STOP_MARKET") {
      return Number(state.triggerPrice);
    } else {
      return Number(lastTradedPrice);
    }
  };

  const handleTakeProfitPrice = (event: any) => {
    const value = event.target.value;
    if (value.length > 0) {
      setTakeProfit(convertToPrecisionValueInPrecisionUnit(value, symbolPrecisionByMinTickSize));
      dispatchOrderEvent({
        type: "UPDATE_TAKE_PROFIT",
        payload: convertToPrecisionValueInPrecisionUnit(value, symbolPrecisionByMinTickSize)
      });
      calculateEstimateProfitAndLossForTakeProfit(value);
    } else {
      setTakeProfit("");
      setEstimateProfitForTakeProfit("");
      dispatchOrderEvent({
        type: "UPDATE_TAKE_PROFIT",
        payload: ""
      });
    }
  };
  const handleTakeProfitAmount = (event: any) => {
    const value = event.target.value;

    if (value.length > 0) {
      setTakeProfit(convertToPrecisionValueInPrecisionUnit(value, symbolPrecisionByMinTickSize));
      const MarketOrderType = state.OrderType === 1 || state.OrderType === 3 ? "LIMIT" : state.OrderType === 2 ? "STOP_MARKET" : "MARKET";
      if (state.side === "BUY") {
        const AmountToPice = Price(MarketOrderType) + Number(value) / Number(state.size);
        dispatchOrderEvent({
          type: "UPDATE_TAKE_PROFIT",
          payload: convertToPrecisionValueInPrecisionUnit(AmountToPice, symbolPricePrecision)
        });
        setEstimateProfitForTakeProfit(convertToPrecisionValueInPrecisionUnit(AmountToPice, 2));
      } else {
        const AmountToPice = Price(MarketOrderType) - Number(value) / Number(state.size);
        dispatchOrderEvent({
          type: "UPDATE_TAKE_PROFIT",
          payload: convertToPrecisionValueInPrecisionUnit(AmountToPice, symbolPricePrecision)
        });
        setEstimateProfitForTakeProfit(convertToPrecisionValueInPrecisionUnit(AmountToPice, 2));
      }
    } else {
      setTakeProfit("");
      setEstimateProfitForTakeProfit("");
      dispatchOrderEvent({
        type: "UPDATE_TAKE_PROFIT",
        payload: ""
      });
    }
  };
  const handleTakeProfitROE = (event: any) => {
    const value = event.target.value;
    if (value.length > 0) {
      setTakeProfit(convertToPrecisionValueInPrecisionUnit(value, symbolPricePrecision));
      const marginGainAfterROE = (Number(state.costValue) * Number(value)) / 100;
      setEstimateProfitForTakeProfit(convertToPrecisionValueInPrecisionUnit(marginGainAfterROE, 2));
      const MarketOrderType = state.OrderType === 1 || state.OrderType === 3 ? "LIMIT" : state.OrderType === 2 ? "STOP_MARKET" : "MARKET";

      if (state.side === "BUY") {
        const AmountToPice = Price(MarketOrderType) + marginGainAfterROE / Number(state.size);
        dispatchOrderEvent({
          type: "UPDATE_TAKE_PROFIT",
          payload: convertToPrecisionValueInPrecisionUnit(AmountToPice, symbolPricePrecision)
        });
      } else {
        const AmountToPice = Price(MarketOrderType) - marginGainAfterROE / Number(state.size);
        dispatchOrderEvent({
          type: "UPDATE_TAKE_PROFIT",
          payload: convertToPrecisionValueInPrecisionUnit(AmountToPice, symbolPricePrecision)
        });
      }
    } else {
      setTakeProfit("");
      setEstimateProfitForTakeProfit("");
      dispatchOrderEvent({
        type: "UPDATE_TAKE_PROFIT",
        payload: ""
      });
    }
  };
  const calculateEstimateProfitAndLossForTakeProfit = useCallback(
    (payload: string) => {
      const MarketOrderType = state.OrderType === 1 || state.OrderType === 3 ? "LIMIT" : state.OrderType === 2 ? "STOP_MARKET" : "MARKET";
      if (state.side === "BUY") {
        const Pnl = Number(state.size) * (Number(payload) - Price(MarketOrderType));
        if (Pnl > 0) {
          setEstimateProfitForTakeProfit(convertToPrecisionValueInPrecisionUnit(Pnl, symbolPricePrecision));
        } else {
          setEstimateProfitForTakeProfit("");
        }
      } else {
        const Pnl = Number(state.size) * (Price(MarketOrderType) - Number(payload));
        if (Pnl > 0) {
          setEstimateProfitForTakeProfit(convertToPrecisionValueInPrecisionUnit(Pnl, symbolPricePrecision));
        } else {
          setEstimateProfitForTakeProfit("");
        }
      }
    },
    [state.OrderType, state.size, state.side, symbolPricePrecision]
  );

  const handleStopLossPrice = (event: any) => {
    const value = event.target.value;
    if (value.length > 0) {
      setStopLoss(convertToPrecisionValueInPrecisionUnit(value, symbolPrecisionByMinTickSize));
      dispatchOrderEvent({
        type: "UPDATE_STOP_LOSS",
        payload: convertToPrecisionValueInPrecisionUnit(value, symbolPrecisionByMinTickSize)
      });
      calculateEstimateProfitAndLossForStopLoss(value);
    } else {
      setStopLoss("");
      setEstimateProfitForStopLoss("");
      dispatchOrderEvent({
        type: "UPDATE_STOP_LOSS",
        payload: ""
      });
    }
  };
  const handleStopLossAmount = (event: any) => {
    const value = event.target.value;
    if (value.length > 0) {
      setStopLoss(convertToPrecisionValueInPrecisionUnit(value, symbolPrecisionByMinTickSize));
      const MarketOrderType = state.OrderType === 1 || state.OrderType === 3 ? "LIMIT" : state.OrderType === 2 ? "STOP_MARKET" : "MARKET";
      if (state.side === "BUY") {
        const AmountToPice = Price(MarketOrderType) - Number(value) / Number(state.size);
        dispatchOrderEvent({
          type: "UPDATE_STOP_LOSS",
          payload: convertToPrecisionValueInPrecisionUnit(AmountToPice, symbolPricePrecision)
        });
        setEstimateProfitForStopLoss(convertToPrecisionValueInPrecisionUnit(AmountToPice, 2));
      } else {
        const AmountToPice = Price(MarketOrderType) + Number(value) / Number(state.size);
        dispatchOrderEvent({
          type: "UPDATE_STOP_LOSS",
          payload: convertToPrecisionValueInPrecisionUnit(AmountToPice, symbolPricePrecision)
        });
        setEstimateProfitForStopLoss(convertToPrecisionValueInPrecisionUnit(AmountToPice, 2));
      }
    } else {
      setStopLoss("");
      setEstimateProfitForStopLoss("");
      dispatchOrderEvent({
        type: "UPDATE_STOP_LOSS",
        payload: ""
      });
    }
  };
  const handleStopLossROE = (event: any) => {
    const value = event.target.value;
    if (value.length > 0) {
      setStopLoss(convertToPrecisionValueInPrecisionUnit(value, symbolPricePrecision));
      const marginGainAfterROE = (Number(state.costValue) * Number(value)) / 100;
      setEstimateProfitForStopLoss(convertToPrecisionValueInPrecisionUnit(marginGainAfterROE, 2));
      const MarketOrderType = state.OrderType === 1 || state.OrderType === 3 ? "LIMIT" : state.OrderType === 2 ? "STOP_MARKET" : "MARKET";
      if (state.side === "BUY") {
        const AmountToPice = Price(MarketOrderType) - marginGainAfterROE / Number(state.size);
        dispatchOrderEvent({
          type: "UPDATE_STOP_LOSS",
          payload: convertToPrecisionValueInPrecisionUnit(AmountToPice, symbolPricePrecision)
        });
      } else {
        const AmountToPice = Price(MarketOrderType) + marginGainAfterROE / Number(state.size);
        dispatchOrderEvent({
          type: "UPDATE_STOP_LOSS",
          payload: convertToPrecisionValueInPrecisionUnit(AmountToPice, symbolPricePrecision)
        });
      }
    } else {
      setStopLoss("");
      setEstimateProfitForStopLoss("");
      dispatchOrderEvent({
        type: "UPDATE_STOP_LOSS",
        payload: ""
      });
    }
  };
  const calculateEstimateProfitAndLossForStopLoss = useCallback(
    (payload: string) => {
      const MarketOrderType = state.OrderType === 1 || state.OrderType === 3 ? "LIMIT" : state.OrderType === 2 ? "STOP_MARKET" : "MARKET";
      if (state.side === "BUY") {
        const Pnl = Number(state.size) * (Price(MarketOrderType) - Number(payload));
        if (Pnl > 0) {
          setEstimateProfitForStopLoss(convertToPrecisionValueInPrecisionUnit(Pnl, 2));
        } else {
          setEstimateProfitForStopLoss("");
        }
      } else {
        const Pnl = Number(state.size) * (Number(payload) - Price(MarketOrderType));
        if (Pnl > 0) {
          setEstimateProfitForStopLoss(convertToPrecisionValueInPrecisionUnit(Pnl, 2));
        } else {
          setEstimateProfitForStopLoss("");
        }
      }
    },
    [state.OrderType, state.size, state.side]
  );

  const handleTakeProfit = (event: any) => {
    dispatchOrderEvent({
      type: "UPDATE_TAKE_PROFIT_ERROR",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_STOP_LOSS_ERROR",
      payload: ""
    });
    if (dropDownValueForTakeProfit === "price") {
      handleTakeProfitPrice(event);
    } else if (dropDownValueForTakeProfit === "amount") {
      handleTakeProfitAmount(event);
    } else {
      handleTakeProfitROE(event);
    }
  };
  const handleStopLoss = (event: any) => {
    dispatchOrderEvent({
      type: "UPDATE_STOP_LOSS_ERROR",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_TAKE_PROFIT_ERROR",
      payload: ""
    });
    if (dropDownValueForStoploss === "price") {
      handleStopLossPrice(event);
    } else if (dropDownValueForStoploss === "amount") {
      handleStopLossAmount(event);
    } else {
      handleStopLossROE(event);
    }
  };
  const handleTakeProfitDropDownValue = (payload: string) => {
    setTakeProfit("");
    setEstimateProfitForTakeProfit("");
    setDropDownForTakeProfitValue(payload);
    dispatchOrderEvent({
      type: "UPDATE_TAKE_PROFIT_ERROR",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_TAKE_PROFIT",
      payload: ""
    });
  };
  const handleStopLossValueDropDownValue = (payload: string) => {
    setStopLoss("");
    setEstimateProfitForStopLoss("");
    setDropDownForStopLossValue(payload);
    dispatchOrderEvent({
      type: "UPDATE_STOP_LOSS_ERROR",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_STOP_LOSS",
      payload: ""
    });
  };
  const handleStopLossAndTakeProfitDropDownValue = (payload: string) => {
    handleStopLossValueDropDownValue(payload);
    handleTakeProfitDropDownValue(payload);
  };
  const clearAllStateWhenTakeProfitStopLossActive = () => {
    setStopLoss("");
    setTakeProfit("");
    setEstimateProfitForTakeProfit("");
    setEstimateProfitForStopLoss("");
    dispatchOrderEvent({
      type: "UPDATE_STOP_LOSS",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_TAKE_PROFIT",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_TAKE_PROFIT_ERROR",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_STOP_LOSS_ERROR",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_REDUCE_ONLY",
      payload: false
    });
  };

  // Deep link TP/SL
  useEffect(() => {
    if (dropDownValueForStoploss) {
      const data = JSON.parse(localStorage.getItem("orderFormData"));
      if (!data || Object.keys(data)?.length === 0) return;
      if (data.takeProfit) {
        handleTakeProfit({ target: { value: data.takeProfit } });
      }
      if (data.takeProfit) {
        handleStopLoss({ target: { value: data.stopLoss } });
      }
    }
  }, [state.isTakeProfitStopLossActive]);

  return {
    stopLoss,
    dropDownValueForStoploss,
    estimateProfitForStopLoss,
    handleStopLoss,
    estimateProfitForTakeProfit,
    stopLossValidaionError: state.stopLossError,
    takeProfitValidationError: state.takeProfitError,
    takeProfit,
    handleStopLossAndTakeProfitDropDownValue,
    handleTakeProfitDropDownValue,
    handleTakeProfit,
    clearAllStateWhenTakeProfitStopLossActive
  };
};

export default useTakeProfitStopLoss;
