import { SymbolPrecisionHelper } from "../../../helpers";
import { useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "./helpers/CREATE_NEW_ORDER";
import { generateNewSignal } from "./helpers/CREATE_NEW_SIGNAL";
import { recordCleverTapEvent } from "../../../utils/recordCleverTapEvent";

const returnOrderType = (type: number) => {
  if (type === 0) return "MARKET";
  if (type === 1) return "LIMIT";
  if (type === 2) return "TRIGGER";
  if (type === 3) return "STOP LIMIT";
};

const useOrderFormSubmit = ({
  setOrderConfirm,
  setShowGenerateConfirm,
  state,
  dispatchOrderEvent
}: {
  setOrderConfirm: Function;
  setShowGenerateConfirm: Function;
  state: any;
  dispatchOrderEvent: Function;
}) => {
  const MWebFlag = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const symbol = useSelector((state: any) => state.selectSymbol.selectedSymbol?.toUpperCase());

  const profileData = useSelector((state: any) => state.profile.profileDetails);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderErrors, setOrderErrors] = useState("");
  const marginTypeData = useSelector((state: { positionsDirectory: { marginType: any[] } }) =>
    state.positionsDirectory.marginType.find((data: { sym: string }) => data.sym?.toUpperCase() === symbol.toUpperCase())
  );
  const leverageFromServer = useSelector((state: any) => state.positionsDirectory.leverage).find((item: { sym: string }) => item.sym?.toUpperCase() === symbol.toUpperCase());
  const positionsTabNavCallback = (orderType: number) => {
    // if (MWebFlag) {
    //   // route to position tab with state
    //   if (orderType === 0) {
    //     navigate("/orders", { state: { currentMwebTab: 1, mOrdersTab: 0 } });
    //   } else {
    //     navigate("/orders", { state: { currentMwebTab: 1, mOrdersTab: 1 } });
    //   }
    // }
  };
  const formValuesForOrderForm = useRef({});
  const [showLoader, setShowLoader] = useState(false);

  const lastTradedPrice = useSelector((state: any) => state.BinanceStreamData.binanceData?.[`${symbol?.toLowerCase()}@ticker`]);
  const { symbolQuantityPrecision, convertToPrecisionValueInContractAssetUnit } = SymbolPrecisionHelper({ symbol });
  const dispatch = useDispatch();
  const { side, size, OrderType, triggerPrice, limitPrice, takeProfit, stopLoss, isReduceOnly, leverageForSignalTrading } = state;
  const createOrderApiCall = () => {
    if (state.isTakeProfitStopLossActive && state.stopLossError.length > 0 && state.takeProfitError.length > 0) {
      return true;
    }
    const formValues: {
      symbol: string;
      side: string;
      quantity: string;
      type: number; // You should replace this with the actual type of 'OrderType'
      reduceOnly?: boolean;
      timeInForce?: string;
      stopPrice?: string;
      price?: string;
      takeProfit?: number[]; // You should replace this with the actual type of 'takeProfit'
      takeProfitEnabled?: boolean;
      stopLoss?: number[]; // You should replace this with the actual type of 'stopLoss'
      stopLossEnabled?: boolean;
    } = {
      symbol: symbol.toUpperCase(),
      side,
      quantity: convertToPrecisionValueInContractAssetUnit(size, symbolQuantityPrecision),
      type: OrderType
    };

    if (isReduceOnly) {
      formValues.reduceOnly = true;
    }

    if (isReduceOnly && (OrderType === 2 || OrderType === 3)) {
      formValues.timeInForce = "GTE_GTC";
    }

    if (OrderType === 2 || OrderType === 3) {
      formValues.stopPrice = triggerPrice;
    }

    if (OrderType === 1 || OrderType === 3) {
      formValues.price = limitPrice;
    }

    if (takeProfit.length > 0) {
      formValues.takeProfit = takeProfit;
      formValues.takeProfitEnabled = true;
    }

    if (stopLoss.length > 0) {
      formValues.stopLoss = stopLoss;
      formValues.stopLossEnabled = true;
    }

    createOrder(formValues, lastTradedPrice, dispatch, setShowLoader, setOrderConfirm, positionsTabNavCallback, setOrderStatus, setOrderErrors);
    formValuesForOrderForm.current = formValues;
  };

  useEffect(() => {
    if (orderStatus === "success") {
      recordCleverTapEvent("CONFIRM_ORDER_BUTTON_SUCCESS", {
        Email: profileData?.email,
        Identity: profileData?.email,
        ReduceOnly: state.isReduceOnly,
        leverage: leverageFromServer?.leverage,
        marginType: marginTypeData?.marginType?.toUpperCase(),
        limitPrice: state.limitPrice,
        triggerPrice: state.triggerPrice,
        takeProfit: state.takeProfit,
        stopLoss: state.stopLoss,
        side: state.side,
        size: state.size,
        symbol: symbol,
        OrderType: returnOrderType(state.OrderType),
        sizeToggle: state.sizeToggle,
        TPSL: state.takeProfit?.length > 0 || state.stopLoss?.length > 0 ? "ORDERFORM" : "NA"
      });
      setOrderStatus("");
    } else if (orderStatus === "failed") {
      recordCleverTapEvent("CONFIRM_ORDER_BUTTON_FAILED", {
        Email: profileData?.email,
        Identity: profileData?.email,
        ReduceOnly: state.isReduceOnly,
        leverage: leverageFromServer?.leverage,
        marginType: marginTypeData?.marginType?.toUpperCase(),
        limitPrice: state.limitPrice,
        triggerPrice: state.triggerPrice,
        takeProfit: state.takeProfit,
        stopLoss: state.stopLoss,
        side: state.side,
        size: state.size,
        sizeToggle: state.sizeToggle,
        orderErrors: JSON.stringify(orderErrors),
        TPSL: state.takeProfit?.length > 0 || state.stopLoss?.length > 0 ? "ORDERFORM" : "NA",
        symbol: symbol,
        OrderType: returnOrderType(state.OrderType)
      });
      setOrderErrors("");
      setOrderStatus("");
    }
  }, [orderStatus]);

  const generateSignal = () => {
    if (state.isTakeProfitStopLossActive && state.stopLossError.length > 0 && state.takeProfitError.length > 0) {
      return true;
    }
    setShowLoader(true);
    const formValues: {
      symbol: string;
      orderSide: string;
      orderType: number; // You should replace this with the actual type of 'OrderType'
      lastTradedPrice: number; // You should replace this with the actual type of 'lastTradedPrice'
      reduceOnly?: boolean;
      timeInForce?: string;
      orderStopPrice?: number;
      orderPrice?: number;
      takeProfitStopPrice?: number;
      stopLossStopPrice?: number;
      leverage?: number;
      marginMode?: string;
      stopLossType?: string;
      takeProfitType?: string;
    } = {
      symbol: symbol.toUpperCase(),
      orderSide: side,
      marginMode: "ISOLATED",
      leverage: parseFloat(leverageForSignalTrading),
      // quantity: size,
      orderType: OrderType,
      lastTradedPrice
    };

    if (isReduceOnly) {
      formValues.reduceOnly = true;
    }

    if (isReduceOnly && (OrderType === 2 || OrderType === 3)) {
      formValues.timeInForce = "GTE_GTC";
    }

    if (OrderType === 2 || OrderType === 3) {
      formValues.orderStopPrice = parseFloat(triggerPrice);
    }

    if (OrderType === 1 || OrderType === 3) {
      formValues.orderPrice = parseFloat(limitPrice);
    }

    if (takeProfit.length > 0) {
      formValues.takeProfitStopPrice = parseFloat(takeProfit);
      formValues.takeProfitType = "TAKE_PROFIT_MARKET";
      // formValues.takeProfitEnabled = true;
    }

    if (stopLoss.length > 0) {
      formValues.stopLossStopPrice = parseFloat(stopLoss);
      formValues.stopLossType = "STOP_MARKET";
      // formValues.stopLossEnabled = true;
    }
    generateNewSignal({
      singalData: formValues,
      dispatch,
      setShowLoader,
      setShowGenerateConfirm
    });
  };

  const CheckPriceFieldErrorBasedOnOrderType = useCallback(
    (type: number) => {
      switch (type) {
        case 1: {
          if (state.limitPrice.length === 0 || state.limitPriceError.length > 0) {
            return true;
          }
          break;
        }
        case 2: {
          if (state.triggerPrice.length === 0 || state.triggerPriceError.length > 0) {
            return true;
          }
          break;
        }
        case 3: {
          if ((state.triggerPrice.length === 0 || state.triggerPriceError.length) > 0 || state.limitPrice.length === 0 || state.limitPriceError.length > 0) {
            return true;
          }
          break;
        }
      }
    },
    [state]
  );
  const hangleSubmitOrderForm = () => {
    recordCleverTapEvent("CREATE_ORDER_BUTTON_CLICKED", {
      Email: profileData?.email,
      Identity: profileData?.email,
      ReduceOnly: state.isReduceOnly,
      OrderType: state.OrderType,
      leverage: leverageFromServer?.leverage,
      marginType: marginTypeData?.marginType?.toUpperCase(),
      limitPrice: state.limitPrice,
      triggerPrice: state.triggerPrice,
      takeProfit: state.takeProfit,
      stopLoss: state.stopLoss,
      side: state.side,
      size: state.size,
      sizeToggle: state.sizeToggle,
      TPSL: state.takeProfit?.length > 0 || state.stopLoss?.length > 0 ? "ORDERFORM" : "NA"
    });
    if (handleTakeProfitStopLossValidation(state.side)) {
      if (localStorage.getItem("doNotShowAgainOrderConfirmModal")) {
        createOrderApiCall();
      } else {
        setOrderConfirm(true);
      }
    }
  };
  // const handleGenerateSignal = () => {
  //   if (handleTakeProfitStopLossValidation(state.side)) {
  //     generateSignal();
  //   }
  // }
  const handleTakeProfitStopLossValidation = (side: string) => {
    let validation = true;
    const MarketOrderType = state.OrderType === 2 ? "trigger" : state.OrderType === 1 || state.OrderType === 3 ? "limit" : "last traded ";
    const value = state.OrderType === 2 ? state.triggerPrice : state.OrderType === 1 || state.OrderType === 3 ? state.limitPrice : lastTradedPrice;
    if (state?.isSignalTrading) {
      if (state?.takeProfit.length === 0) {
        dispatchOrderEvent({
          type: "UPDATE_TAKE_PROFIT_ERROR",
          payload: `TP Price can not be empty`
        });
        validation = false;
      }
      if (state.stopLoss.length === 0) {
        dispatchOrderEvent({
          type: "UPDATE_STOP_LOSS_ERROR",
          payload: `SL Price can not be empty`
        });
        validation = false;
      }
      const diff = (parseFloat(lastTradedPrice) * 0.1) / 100;

      if (state.OrderType === 1) {
        if (side === "BUY" || side === "LONG") {
          const newLTP = parseFloat(lastTradedPrice) - diff;
          if (newLTP <= limitPrice) {
            dispatchOrderEvent({
              type: "UPDATE_LIMIT_PRICE_ERROR",
              payload: `Can't place signal as it will be automatically triggered at current market price`
            });
            validation = false;
          }
        } else {
          const newLTP = parseFloat(lastTradedPrice) + diff;
          if (newLTP >= limitPrice) {
            dispatchOrderEvent({
              type: "UPDATE_LIMIT_PRICE_ERROR",
              payload: `Can't place signal as it will be automatically triggered at current market price`
            });
            validation = false;
          }
        }
      } else {
        const upperBound = parseFloat(lastTradedPrice) + diff;
        const lowerBound = parseFloat(lastTradedPrice) - diff;
        if (state.triggerPrice <= upperBound && state.triggerPrice >= lowerBound) {
          dispatchOrderEvent({
            type: "UPDATE_TRIGGER_PRICE_ERROR",
            payload: `Can't place signal as it will be automatically triggered at current market price`
          });
          validation = false;
        }
      }
    }
    if (side === "BUY") {
      if (state.takeProfit.length > 0 && Number(value) > Number(state.takeProfit)) {
        dispatchOrderEvent({
          type: "UPDATE_TAKE_PROFIT_ERROR",
          payload: `TP should be greater than the ${MarketOrderType} Price`
        });
        validation = false;
      }
      if (state.stopLoss.length > 0 && Number(value) < state.stopLoss) {
        dispatchOrderEvent({
          type: "UPDATE_STOP_LOSS_ERROR",
          payload: `SL should be less than the ${MarketOrderType} Price`
        });
        validation = false;
      }
    } else {
      if (state.takeProfit.length > 0 && Number(value) < Number(state.takeProfit)) {
        dispatchOrderEvent({
          type: "UPDATE_TAKE_PROFIT_ERROR",
          payload: `TP should be less than the ${MarketOrderType} Price`
        });
        validation = false;
      }
      if (state.stopLoss.length > 0 && Number(value) > Number(state.stopLoss)) {
        dispatchOrderEvent({
          type: "UPDATE_STOP_LOSS_ERROR",
          payload: `SL should be greater than the ${MarketOrderType} Price`
        });
        validation = false;
      }
    }
    return validation;
  };

  const isOrderFormSubmitButtonDisable = useMemo(() => {
    if (!state.leverageDisable) {
      return true;
    }
    if (!state.isSignalTrading && (state.sizeError.length > 0 || state.size.length === 0)) {
      return true;
    }
    if (CheckPriceFieldErrorBasedOnOrderType(state.OrderType)) {
      return true;
    }
    if (state.isTakeProfitStopLossActive && state.takeProfit.length === 0 && state.stopLoss.length === 0) {
      return true;
    }
    return false;
  }, [state]);

  const handleSubmitSignal = () => {
    if (handleTakeProfitStopLossValidation(state.side)) {
      setShowGenerateConfirm(true);
    }
  };
  return {
    showLoader,
    setShowLoader,
    isOrderFormSubmitButtonDisable,
    hangleSubmitOrderForm,
    handleGenerateSignal: generateSignal,
    createOrderApiCall,
    handleSubmitSignal,
    side: state.side,
    state,
    formValuesForOrderForm
  };
};

export default useOrderFormSubmit;
