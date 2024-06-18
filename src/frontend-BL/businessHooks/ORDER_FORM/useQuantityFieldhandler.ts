import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ORDERFORM_CONSTANTS } from "./Constants/Orderform_const";
import { SymbolPrecisionHelper } from "../../../helpers";
import useMarketBestPricehandler from "./useMarketBestPricehandler";
import useSetAvailableBalanceForPlacingNewOrder from "./useSetAvailableBalanceForPlacingNewOrder";
import { calculateOpenLoss } from "./helpers/openLossHelper";

interface LeverageBracket {
  symbol: string;
}

interface OrderFormData {
  side: string;
  OrderType: number;
  limitPrice: string;
  triggerPrice: string;
  isTakeProfitStopLossActive: boolean;
  size: string;
}

interface LeverageData {
  sym: string;
}

interface OpenOrder {
  R: boolean;
  o: string;
  s: string;
  S: string;
  p: number;
  q: number;
}

interface OrderDetails {
  symbol: string;
  reduceOnly: boolean;
  side: string;
  status: string;
  ID: string;
  quantity: number;
  executedQuantity: number;
  price: number | "N/A";
  stopPrice: number | undefined;
  type: string;
  createdAt: number;
  notionalQuantity: number;
}

const BUY = "BUY";
const SHORT = "SHORT";
const LONG = "LONG";
const SELL = "SELL";

const useQuantityFieldhandler = ({ state, dispatchOrderEvent }: { state: any; dispatchOrderEvent: any }) => {
  const convertToPrecisionValueInContractAssetUnit = (value: number, Precision: number) => {
    let numStr = value.toString();
    if (numStr.startsWith(".")) {
      numStr = `0${numStr}`; // Add a leading zero
    }

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
  const symbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  const fetchMarkPrice = useSelector((state: any) => state.BinanceStreamData?.binanceData?.[`${symbol.toLowerCase()}@markPrice@1s`]);
  const availableBalanceForCrossedPosition = useSelector((state: any) => state.currentPositions.crossWalletBalance);
  const leverageBracketList = useSelector((state: any) => state.leverageBracket.leverageBracket);
  const leverageFromServer = useSelector((state: any) => state.positionsDirectory.leverage).find((item: LeverageData) => item.sym === symbol.toUpperCase());
  const selectedPositionAuxiliary = useSelector((state: any) => state.positionsDirectory.currentPositions.find((position: any) => position.sym.toUpperCase() === symbol?.toUpperCase()));
  const [quantityValue, setQuantityValue] = useState<string>("");
  const [quantityType, setQuantityType] = useState<string>("");
  // const { state, dispatchOrderEvent } = useContext(OrderFormContext);
  const { assumingPrice, lastTradedPrice } = useMarketBestPricehandler({ side: state.side, symbol });
  useSetAvailableBalanceForPlacingNewOrder();
  const { symbolMinPriceForOrders, symbolQuantityPrecision, symbolMinQTYFormMarketOrders, symbolMinQTYFormLimitOrders, symbolPrecisionByMinTickSize, minimimumNotionalValueFromTradableSymbol } =
    SymbolPrecisionHelper({ symbol });
  useEffect(() => {
    ClearOrderForm();
    setQuantityType("USDT");
  }, [symbol]);

  useEffect(() => {
    if (symbol.length && leverageBracketList.length) {
      const leverageBracketListForSelectedSymbol = leverageBracketList.filter((symbols: LeverageBracket) => symbols?.symbol?.toLowerCase() === symbol.toLowerCase());
      if (leverageBracketListForSelectedSymbol.length > 0) {
        dispatchOrderEvent({
          type: "UPDATE_MAX_LEVERAGE",
          payload: leverageBracketListForSelectedSymbol[0]?.leverageBrackets?.brackets[0].initialLeverage
        });
      }

      const quantityValueInNumber = state.size ? parseFloat(state.size) : 0;
      for (let bracketList = 0; bracketList < leverageBracketListForSelectedSymbol[0]?.leverageBrackets?.brackets.length; bracketList++) {
        if (
          quantityValueInNumber >= leverageBracketListForSelectedSymbol[0]?.leverageBrackets?.brackets[bracketList].notionalFloor &&
          quantityValueInNumber < leverageBracketListForSelectedSymbol[0]?.leverageBrackets?.brackets[bracketList].notionalCap
        ) {
          dispatchOrderEvent({
            type: "UPDATE_MAX_LEVERAGE_SIZE",
            payload: leverageBracketListForSelectedSymbol[0]?.leverageBrackets?.brackets[bracketList].initialLeverage
          });

          break;
        }
      }
    }
  }, [symbol, state.size, leverageBracketList]);

  const MaxBuyingPower: number = useMemo(() => {
    if (typeof parseFloat(leverageFromServer?.leverage) === "number" && typeof availableBalanceForCrossedPosition === "number") {
      return Number(convertToPrecisionValueInContractAssetUnit(Number(leverageFromServer?.leverage) * availableBalanceForCrossedPosition, 2));
    }
    return 0; // Handle cases where either value is not a number
  }, [availableBalanceForCrossedPosition, leverageFromServer]);

  const ClearOrderForm = () => {
    setQuantityValue("");
    dispatchOrderEvent({
      type: "UPDATE_SIZE_ERROR",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_SIZE",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_TAKE_PROFIT_STOP_LOSS_ACYIVE",
      payload: false
    });
    dispatchOrderEvent({
      type: "UPDATE_LIMIT_PRICE_ERROR",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_LIMIT_PRICE",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_TRIGGER_PRICE",
      payload: ""
    });
  };
  const IsSizeFieldDisabled = useCallback(
    (TYPE: number) => {
      switch (TYPE) {
        case 3:
        case 1: {
          if (state.limitPrice.length === 0 || !state.leverageDisable) {
            return true;
          } else {
            return false;
          }
        }
        case 2: {
          if (state.triggerPrice.length === 0 || !state.leverageDisable) {
            return true;
          } else {
            return false;
          }
        }
        default: {
          if (!state.leverageDisable) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    [state]
  );
  const minQty = (comparator: number, price: number, stepper: number) => {
    return Math.max(comparator, Number(convertToPrecisionValueInContractAssetUnit(Number(minimimumNotionalValueFromTradableSymbol) / price, symbolQuantityPrecision)) + stepper);
  };

  const MinQtyForContract = (type: string) => {
    if (type) {
      if (type === "Market") {
        const val = minQty(Number(symbolMinQTYFormMarketOrders?.minQty), Number(assumingPrice), Number(symbolMinQTYFormMarketOrders?.stepSize));
        return val;
      } else if (type === "Limit") {
        const val = minQty(Number(symbolMinQTYFormLimitOrders?.minQty), Number(state.limitPrice), Number(symbolMinQTYFormLimitOrders?.stepSize));
        return val;
      } else {
        const val = minQty(Number(symbolMinQTYFormMarketOrders?.minQty), Number(state.triggerPrice), Number(symbolMinQTYFormMarketOrders?.stepSize));
        return val;
      }
    } else {
      return parseFloat(minimimumNotionalValueFromTradableSymbol);
    }
  };
  const PriceToContactSize = useCallback(
    (payload: number) => {
      switch (state.OrderType) {
        case 1:
        case 3: {
          const value = state.limitPrice > 0 ? parseFloat(state.limitPrice) : 1;
          return payload / value;
        }
        case 2: {
          const value = state.triggerPrice > 0 ? parseFloat(state.triggerPrice) : 1;
          return payload / value;
        }

        default: {
          const value = assumingPrice ?? 1;
          return payload / value;
        }
      }
    },
    [assumingPrice, state.OrderType, state.triggerPrice, state.limitPrice]
  );

  const MaxBuyingPowerInContractSize: number = useMemo(() => {
    if (MaxBuyingPower) {
      return PriceToContactSize(MaxBuyingPower);
    } else {
      return 0;
    }
  }, [MaxBuyingPower, assumingPrice, state, symbolQuantityPrecision]);

  const isLinkExpired = (expiryTimestamp: number) => {
    const now = new Date().getTime();
    return now > expiryTimestamp;
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orderFormData"));
    if (isLinkExpired(data?.$exp_date1)) {
      setTimeout(() => {
        localStorage.removeItem("orderFormData");
      }, 2000);
      return;
    }
    if (!data || Object.keys(data)?.length === 0) return;
    if (data.size) {
      handleSizeInContractAssetChange({ target: { value: data.size } });
      if (data.isTakeProfitStopLossActive) {
        dispatchOrderEvent({
          type: "UPDATE_TAKE_PROFIT_STOP_LOSS_ACYIVE",
          payload: true
        });
      }
    }
  }, [state.OrderType]);

  const fillOrderForm = (data: OrderFormData) => {
    dispatchOrderEvent({
      type: "UPDATE_SIDE",
      payload: data.side
    });
    dispatchOrderEvent({
      type: "UPDATE_ORDER_TYPE",
      payload: data.OrderType
    });
    setQuantityType(`${symbol.toUpperCase().replace("USDT", "")}`);
    if (data.limitPrice) {
      dispatchOrderEvent({
        type: "UPDATE_LIMIT_PRICE",
        payload: data.limitPrice
      });
    }
    if (data.triggerPrice) {
      dispatchOrderEvent({
        type: "UPDATE_TRIGGER_PRICE",
        payload: data.triggerPrice
      });
    }
  };

  useEffect(() => {
    if (MaxBuyingPowerInContractSize) {
      const data = JSON.parse(localStorage.getItem("orderFormData"));
      if (isLinkExpired(data?.$exp_date1)) {
        localStorage.removeItem("orderFormData");
        return;
      }
      if (!data || Object.keys(data)?.length === 0) return;
      fillOrderForm(data);
    }
    return () => {
      localStorage.removeItem("orderFormData");
    };
  }, [MaxBuyingPowerInContractSize]);

  const ContactSizeToPrice = useCallback(
    (payload: number, Precision: number) => {
      switch (state.OrderType) {
        case 1:
        case 3: {
          const value = state.limitPrice > 0 ? parseFloat(state.limitPrice) : 1;
          return Number(convertToPrecisionValueInContractAssetUnit(payload * value, Precision));
        }
        case 2: {
          const value = state.triggerPrice > 0 ? parseFloat(state.triggerPrice) : 1;
          return Number(convertToPrecisionValueInContractAssetUnit(payload * value, Precision));
        }

        default: {
          const value = assumingPrice ?? 1;
          return Number(convertToPrecisionValueInContractAssetUnit(payload * value, Precision));
        }
      }
    },
    [assumingPrice, state.OrderType, state.triggerPrice, state.limitPrice]
  );

  const handleQuantityChange = (event: any) => {
    dispatchOrderEvent({
      type: "UPDATE_SIZE_ERROR",
      payload: ""
    });

    let value = event.target.value;
    setQuantityValue(convertToPrecisionValueInContractAssetUnit(value, 2));
    if (value.length > 0) {
      dispatchOrderEvent({
        type: "UPDATE_SIZE",
        payload: PriceToContactSize(Number(value))
      });
    } else {
      dispatchOrderEvent({
        type: "UPDATE_SIZE",
        payload: ""
      });
      dispatchOrderEvent({
        type: "UPDATE_TAKE_PROFIT_STOP_LOSS_ACYIVE",
        payload: false
      });
    }
    const MarketOrderType = state.OrderType === 0 || state.OrderType === 2 ? "Market" : "Limit";
    ValidationForSelectedPositionAuxiliary(PriceToContactSize(Number(value)), MarketOrderType);
  };

  const handleSizeInContractAssetChange = (event: any) => {
    let value = event.target.value;
    setQuantityValue(ContactSizeToPrice(value, 2).toString());
    dispatchOrderEvent({
      type: "UPDATE_SIZE_ERROR",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_SIZE",
      payload: convertToPrecisionValueInContractAssetUnit(value, symbolQuantityPrecision)
    });
    const MarketOrderType = state.OrderType === 0 || state.OrderType === 2 ? "Market" : "Limit";
    ValidationForSelectedPositionAuxiliary(Number(value), MarketOrderType);
  };
  const handleLimitPriceChange = (event: any) => {
    let value = event.target.value;
    value = value.replace(/-/g, "");
    value = value.replace(/[^\d.]/g, "");
    dispatchOrderEvent({
      type: "UPDATE_LIMIT_PRICE_ERROR",
      payload: ""
    });
    dispatchOrderEvent({
      type: "UPDATE_LIMIT_PRICE",
      payload: convertToPrecisionValueInContractAssetUnit(value, symbolPrecisionByMinTickSize)
    });
    if (Number(symbolMinPriceForOrders.minPrice) > Number(value)) {
      dispatchOrderEvent({
        type: "UPDATE_LIMIT_PRICE_ERROR",
        payload: "Enter Min Limit Price"
      });
    }
    if (Number(symbolMinPriceForOrders.maxPrice) < Number(value)) {
      dispatchOrderEvent({
        type: "UPDATE_LIMIT_PRICE_ERROR",
        payload: "Exceed Max Limit Price"
      });
    }
    const Size = Number(state.size) * Number(value);
    setQuantityValue(convertToPrecisionValueInContractAssetUnit(Size, symbolPrecisionByMinTickSize));
    if (value.length === 0) {
      setQuantityValue("");

      dispatchOrderEvent({
        type: "UPDATE_SIZE",
        payload: ""
      });
    }
  };

  const handleQuantityPercentageChange = (event: any) => {
    if (IsSizeFieldDisabled(state.OrderType)) return;

    const value = event.target.value;
    dispatchOrderEvent({
      type: "UPDATE_QUANTITY_PERCENTAGE",
      payload: value
    });
    dispatchOrderEvent({
      type: "UPDATE_SIZE_ERROR",
      payload: ""
    });
    const val = (Number(value) / 100) * MaxBuyingPower;

    handleQuantityChange({ target: { value: String(val) } });
  };
  const handleTriggerPriceChange = (event: any) => {
    dispatchOrderEvent({
      type: "UPDATE_TRIGGER_PRICE_ERROR",
      payload: ""
    });
    let value = event.target.value;
    value = value.replace(/-/g, "");
    value = value.replace(/[^\d.]/g, "");

    dispatchOrderEvent({
      type: "UPDATE_TRIGGER_PRICE",
      payload: convertToPrecisionValueInContractAssetUnit(value, symbolPrecisionByMinTickSize)
    });
    if (state.OrderType !== 3) {
      const Size = Number(state.size) * Number(value);
      setQuantityValue(convertToPrecisionValueInContractAssetUnit(Size, symbolPrecisionByMinTickSize));
    }

    if (Number(symbolMinPriceForOrders.minPrice) > Number(value)) {
      dispatchOrderEvent({
        type: "UPDATE_TRIGGER_PRICE_ERROR",
        payload: "Enter Min Trigger Price"
      });
    }
    if (Number(symbolMinPriceForOrders.maxPrice) < Number(value)) {
      dispatchOrderEvent({
        type: "UPDATE_TRIGGER_PRICE_ERROR",
        payload: "Exceed Max Trigger Price"
      });
    }

    if (value.length === 0 && state.OrderType !== 3) {
      setQuantityValue("");
      dispatchOrderEvent({
        type: "UPDATE_SIZE",
        payload: ""
      });
    }
  };
  const handleLastPrice = (payload: string) => {
    const value = String(lastTradedPrice);
    if (payload === "LIMIT") {
      handleLimitPriceChange({ target: { value } });
    } else if (payload === "TRIGGER") {
      handleTriggerPriceChange({ target: { value } });
    }
  };

  const minQantityForContract = useMemo(() => {
    const MarketOrderType = state.OrderType === 0 ? "Market" : state.OrderType === 1 || state.OrderType === 3 ? "Limit" : "Trigger";
    return MinQtyForContract(MarketOrderType);
  }, [state, assumingPrice]);
  const handleSetMinSize = () => {
    if (IsSizeFieldDisabled(state.OrderType)) return;
    if (quantityType === "USDT") {
      const quantityValueTemp = ContactSizeToPrice(minQantityForContract, 2)?.toString();
      handleSizeInContractAssetChange({
        target: { value: minQantityForContract }
      });
      setQuantityValue(quantityValueTemp);
    } else {
      handleSizeInContractAssetChange({
        target: { value: minQantityForContract }
      });
    }
  };

  const LimitOrdersFromSocket =
    useSelector((state: any) => state.OpenOrdersStream?.OpenOrdersStream?.filter((openOrder: OpenOrder) => openOrder.o === "LIMIT" && openOrder.s.toUpperCase() === symbol?.toUpperCase())) ?? [];
  // filter only limit orders
  const LimitOrdersFromApi: [] =
    useSelector((state: any) => state.futures?.openOrders?.filter((openOrder: any) => openOrder.type === "LIMIT" && openOrder.symbol.toUpperCase() === symbol?.toUpperCase())) ?? [];
  // changes 231123 start

  const totalOpenOrdersForSymbolRef = useRef<OrderDetails[]>([]);

  useEffect(() => {
    const uniqueIdsSet = new Set(); // Memoize the set creation
    const openOrdersWebsocketMap: OrderDetails[] = LimitOrdersFromSocket.map((order: any) => {
      const uniqueId = order.c;
      if (!uniqueIdsSet.has(uniqueId)) {
        uniqueIdsSet.add(uniqueId);
        return {
          symbol: order.s,
          reduceOnly: order.R,
          side: order.S,
          status: order.X,
          ID: uniqueId,
          quantity: order.q,
          executedQuantity: order.z,
          price: Number(order.p) || "N/A",
          stopPrice: order.sp,
          type: order.o,
          createdAt: order.T,
          notionalQuantity: Number(order.q) * Number(order.p)
        };
      } else {
        return null;
      }
    }).filter((order: any) => order !== null);

    const openOrdersApiFiltered = LimitOrdersFromApi.filter((order: any) => !uniqueIdsSet.has(order.ID));

    totalOpenOrdersForSymbolRef.current = [...openOrdersWebsocketMap, ...openOrdersApiFiltered];

    return () => {};
  }, [LimitOrdersFromApi, LimitOrdersFromSocket]);

  const CheckForWillItOpenPosition = useCallback(
    (size: number) => {
      const side = state.side;
      if (selectedPositionAuxiliary && side === selectedPositionAuxiliary.side) {
        return true;
      } else if (
        // if sides are different then add a check for checking if the net quantity is positive or not
        selectedPositionAuxiliary &&
        side !== selectedPositionAuxiliary.side
      ) {
        if (side === BUY && selectedPositionAuxiliary.side === SELL) {
          const totalOpenOrderBuyQuantity = totalOpenOrdersForSymbolRef?.current?.reduce((accumulator, order) => (order.side === LONG ? accumulator + Number(order.quantity) : accumulator), 0);

          //New Order Quantity (contract) > Abs (Short position quantity) - Open Buy Order Quantity(Only LIMIT Order)
          if (Number(size) > Math.abs(Number(selectedPositionAuxiliary.posAmt) - totalOpenOrderBuyQuantity)) {
            return true;
          } else {
            return false;
          }
        } else if (side === SELL && selectedPositionAuxiliary.side === BUY) {
          const totalOpenOrderBuyQuantity = totalOpenOrdersForSymbolRef?.current?.reduce((accumulator, order) => (order.side === SELL ? accumulator + Number(order.quantity) : accumulator), 0);
          //New Order Quantity (contract) > Abs (Short position quantity) - Open Buy Order Quantity(Only LIMIT Order)
          if (Number(size) > Math.abs(Number(selectedPositionAuxiliary.posAmt) - totalOpenOrderBuyQuantity)) {
            return true;
          } else {
            // if exisiting position is not there, then it will obviously open a new position
            return false;
          }
        }
      } else {
        return true;
      }
    },
    [selectedPositionAuxiliary, quantityValue, state.side, totalOpenOrdersForSymbolRef.current]
  );

  const costValue = useCallback(
    (size: number) => {
      const openLoss = calculateOpenLoss(assumingPrice, state.side, fetchMarkPrice, state.OrderType, size, state.triggerPrice, state.limitPrice);
      let priceMultiplier = 0;
      switch (state.OrderType) {
        case 0: {
          priceMultiplier = Number(assumingPrice);
          break;
        }
        case 1:
        case 3:
          priceMultiplier = Number(state.limitPrice);
          break;
        case 2:
          priceMultiplier = Number(state.triggerPrice);
          break;
        default:
          break;
      }
      if (!state.isReduceOnly && CheckForWillItOpenPosition(Number(size))) {
        if (!selectedPositionAuxiliary && LimitOrdersFromApi?.length === 0 && LimitOrdersFromSocket?.length === 0) {
          const initialMargin = (Number(size) * priceMultiplier) / Number(leverageFromServer?.leverage);
          const costToOpenPosition = Math.trunc(initialMargin * 1000) / 1000 + Math.trunc(openLoss * 1000) / 1000;
          dispatchOrderEvent({
            type: "UPDATE_COST",
            payload: Number(costToOpenPosition)
          });
          return Number(costToOpenPosition);
        } else {
          const positionNotionalQuantity = selectedPositionAuxiliary ? Number(selectedPositionAuxiliary.posAmt) * Number(fetchMarkPrice || 0) : 0;

          const bidNotionalQuantity = totalOpenOrdersForSymbolRef?.current?.reduce(
            (accumulator, order) => (order.side === BUY ? accumulator + Math.abs(Number(order.notionalQuantity)) : accumulator),
            0
          );
          const askNotionalQuantity = totalOpenOrdersForSymbolRef?.current?.reduce(
            (accumulator, order) => (order.side === SELL ? accumulator + Math.abs(Number(order.notionalQuantity)) : accumulator),
            0
          );
          // - Initial Margin for new order = max(0, after order initialMargin for that symbol - current initialMargin for that symbol)
          // - after order initialMargin = after order Notional / leverage
          // - after order Notional= max(bidNotional + positionNotional + order notional, askNotional - positionNotional) for BUY
          // - after order Notional= max(bidNotional + positionNotional, askNotional - positionNotional + order notional) for SELL
          // - current initialMargin = max(bidNotional + positionNotional , askNotional - positionNotional) / leverage
          const currentInitialMargin = Number(Math.max(bidNotionalQuantity + positionNotionalQuantity, askNotionalQuantity - positionNotionalQuantity) / Number(leverageFromServer?.leverage));
          let afterOrderNotionalQuantity = 0;
          const orderNotionalQuantity = Number(size) * priceMultiplier;
          if (state.side === BUY) {
            afterOrderNotionalQuantity = Math.max(bidNotionalQuantity + positionNotionalQuantity + orderNotionalQuantity, askNotionalQuantity - positionNotionalQuantity);
          } else {
            afterOrderNotionalQuantity = Math.max(bidNotionalQuantity + positionNotionalQuantity, askNotionalQuantity - positionNotionalQuantity + orderNotionalQuantity);
          }
          const afterOrderInitialMargin = afterOrderNotionalQuantity / Number(leverageFromServer?.leverage);

          const InitialMarginforNewOrder = Math.max(0, afterOrderInitialMargin - currentInitialMargin);
          dispatchOrderEvent({
            type: "UPDATE_COST",
            payload: Math.trunc((InitialMarginforNewOrder + openLoss) * 1000) / 1000
          });
          return Math.trunc((InitialMarginforNewOrder + openLoss) * 1000) / 1000;
        }
      } else {
        if (state.costValue !== 0) {
          dispatchOrderEvent({
            type: "UPDATE_COST",
            payload: 0
          });
          return 0;
        }
      }
    },
    [quantityValue, state.side, state.limitPrice, state.triggerPrice, leverageFromServer, state.OrderType, state.isReduceOnly]
  );

  const ValidationForSelectedPositionAuxiliary = (value: number, type: string) => {
    const minval = MinQtyForContract(type);
    dispatchOrderEvent({
      type: "UPDATE_SIZE_ERROR",
      payload: ""
    });
    if (Number(value?.toFixed(symbolQuantityPrecision)) < minval && !state.isReduceOnly) {
      dispatchOrderEvent({
        type: "UPDATE_SIZE_ERROR",
        payload: ORDERFORM_CONSTANTS.INADEQUATE_MARGIN_LABEL
      });
    }
    if (costValue(value) > Number(availableBalanceForCrossedPosition) && !state.isReduceOnly) {
      dispatchOrderEvent({
        type: "UPDATE_SIZE_ERROR",
        payload: ORDERFORM_CONSTANTS.EXCEEDS_AVAILABLE_BALANCE_LABEL
      });
    }
    if (selectedPositionAuxiliary && selectedPositionAuxiliary.side !== state.side) {
      if (value <= selectedPositionAuxiliary.posAmt) {
        dispatchOrderEvent({
          type: "UPDATE_SIZE_ERROR",
          payload: ""
        });
      }
    }
  };

  useEffect(() => {
    const MarketOrderType = state.OrderType === 0 || state.OrderType === 2 ? "Market" : "Limit";
    if (quantityValue) {
      ValidationForSelectedPositionAuxiliary(PriceToContactSize(Number(Number(quantityValue).toFixed(3))), MarketOrderType);
    } else if (quantityValue === "") {
      dispatchOrderEvent({
        type: "UPDATE_COST",
        payload: 0
      });
    }
  }, [state.isReduceOnly, state.side, leverageFromServer, state.limitPrice, state.triggerPrice]);
  return {
    quantityType,
    quantityValue,
    size: state.size,
    symbol,
    minQantityForContract,
    quantityValueInPercent: state.quantityPercentage,
    handleQuantityChange,
    setQuantityType,
    handleLimitPriceChange,
    handleLastPrice,
    handleTriggerPriceChange,
    handleQuantityPercentageChange,
    IsSizeFieldDisabled,
    ContactSizeToPrice,
    handleSizeInContractAssetChange,
    MinQtyForContract,
    triggerPrice: state.triggerPrice,
    sizeError: state.sizeError,
    limitPrice: state.limitPrice,
    limitPriceError: state.limitPriceError,
    triggerPriceError: state.triggerPriceError,
    OrderType: state.OrderType,
    handleSetMinSize
  };
};

export default useQuantityFieldhandler;
