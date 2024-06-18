import { useCallback, useEffect, useMemo, useState } from "react";

import { SymbolPrecisionHelper } from "@/helpers";
import { useDispatch, useSelector } from "react-redux";
import { ORDERFORM_CONSTANTS } from "./Constants/Orderform_const";
import { createOrder } from "@/frontend-BL/businessHooks/ORDER_FORM/helpers/CREATE_NEW_ORDER";
import useMarketBestPricehandler from "./useMarketBestPricehandler";
interface LeverageData {
  sym: string;
}

const useQuickOrder = () => {
  const symbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  const { assumingPrice, lastTradedPrice } = useMarketBestPricehandler({
    side: "",
    symbol
  });
  const [sizeInContract, setSizeInContract] = useState<String>("");
  const [sizeInUsdt, setSizeInUsdt] = useState<String>("");
  const [quantityType, setQuantityType] = useState<String>("");
  const [sizeError, setSizeError] = useState<String>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  const availableBalanceForCrossedPosition = useSelector((state: any) => state.currentPositions.crossWalletBalance);
  const leverageFromServer = useSelector((state: any) => state.positionsDirectory.leverage).find((item: LeverageData) => item.sym === symbol.toUpperCase());
  const { setDecimalPrecision, symbolQuantityPrecision, symbolMinQTYFormMarketOrders, symbolMinQTYFormLimitOrders, minimimumNotionalValueFromTradableSymbol } = SymbolPrecisionHelper({ symbol });
  useEffect(() => {
    closeQuickTrade();
    setSizeInUsdt("");
    setSizeError("");
    setSizeInContract("");
    setQuantityType(symbol.toUpperCase().replace("USDT", ""));
  }, [symbol]);
  const fetchMarkPrice = useSelector((state: any) => state.BinanceStreamData?.binanceData?.[`${symbol.toLowerCase()}@markPrice@1s`]);
  const openLossHandlerValue = useCallback(
    (side: string, size: number) => {
      if (fetchMarkPrice && assumingPrice) {
        const priceDifference = side === "BUY" ? 1 : -1;
        return size * Math.abs(Math.min(0, priceDifference * (Number(fetchMarkPrice) - Number(assumingPrice))));
      } else {
        return 0;
      }
    },
    [fetchMarkPrice, assumingPrice]
  );
  const minQty = (comparator: number, price: number, stepper: number) => {
    return Math.max(comparator, Number(convertToPrecisionValueInContractAssetUnit(Number(minimimumNotionalValueFromTradableSymbol) / price, symbolQuantityPrecision)) + stepper);
  };
  const MinQtyForContract = (type: string) => {
    if (type) {
      if (type === "Market") {
        const val = minQty(Number(symbolMinQTYFormMarketOrders?.minQty), Number(lastTradedPrice), Number(symbolMinQTYFormMarketOrders?.stepSize));
        return val;
      }
    } else {
      return parseFloat(minimimumNotionalValueFromTradableSymbol);
    }
  };
  const convertToPrecisionValueInContractAssetUnit = (value: number, Precision: number) => {
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
  const MaxBuyingPower: number = useMemo(() => {
    if (typeof parseFloat(leverageFromServer?.leverage) === "number" && typeof availableBalanceForCrossedPosition === "number") {
      return Math.trunc(parseFloat(leverageFromServer?.leverage) * availableBalanceForCrossedPosition * 100) / 100;
    }
    return 0; // Handle cases where either value is not a number
  }, [availableBalanceForCrossedPosition, leverageFromServer]);

  const MaxBuyingPowerInContractSize: number = useMemo(() => {
    if (MaxBuyingPower) {
      const value = parseFloat(lastTradedPrice) ?? 1;
      const div = MaxBuyingPower / value;
      return Number(setDecimalPrecision(String(div), symbolQuantityPrecision));
    } else {
      return 0;
    }
  }, [MaxBuyingPower, lastTradedPrice, symbolQuantityPrecision]);
  const minQtyForMarket = () => Math.max(Number(symbolMinQTYFormMarketOrders?.stepSize), Number((Number(minimimumNotionalValueFromTradableSymbol) / lastTradedPrice).toFixed(symbolQuantityPrecision)));
  const PriceToContactSize = useCallback(
    (payload: number, Precision: number) => {
      const value = parseFloat(lastTradedPrice) ?? 1;
      const div = payload / value;
      return Number(convertToPrecisionValueInContractAssetUnit(div, Precision));
    },
    [lastTradedPrice]
  );
  const ValidationForSelectedPositionAuxiliary = (value: number, type: string) => {
    const MinQtyForContract = (type: string) => {
      const val = minQtyForMarket();
      if (type) {
        if (type === "Market") {
          return val;
        } else {
          return parseFloat(symbolMinQTYFormLimitOrders.minQty);
        }
      } else {
        return parseFloat(minimimumNotionalValueFromTradableSymbol);
      }
    };
    const minval = MinQtyForContract(type);

    if (Number(value) > Number(MaxBuyingPowerInContractSize)) {
      setSizeError(ORDERFORM_CONSTANTS.EXCEEDS_AVAILABLE_BALANCE_LABEL);
    } else if (value < minval) {
      setSizeError(ORDERFORM_CONSTANTS.INADEQUATE_MARGIN_LABEL);
    } else {
      setSizeError("");
    }
  };
  const ContactSizeToPrice = useCallback(
    (payload: number, Precision: number) => {
      const value = parseFloat(lastTradedPrice) ?? 1;
      return Number(convertToPrecisionValueInContractAssetUnit(payload * value, Precision));
    },
    [lastTradedPrice]
  );
  const handleQuantityChange = (event: any) => {
    let value = event.target.value;
    setSizeInUsdt(convertToPrecisionValueInContractAssetUnit(value, 2));
    if (value.length > 0) {
      setSizeInContract(PriceToContactSize(Number(value), symbolQuantityPrecision).toString());
    } else {
      setSizeInContract("");
    }

    ValidationForSelectedPositionAuxiliary(PriceToContactSize(Number(value), symbolQuantityPrecision), "Market");
  };

  const handleSizeInContractAssetChange = (event: any) => {
    let value = event.target.value;
    setSizeInUsdt(ContactSizeToPrice(value, 2).toString());
    setSizeInContract(convertToPrecisionValueInContractAssetUnit(Number(value), symbolQuantityPrecision));
    ValidationForSelectedPositionAuxiliary(Number(value), "Market");
  };
  const minQantityForContract = useMemo(() => {
    return MinQtyForContract("Market");
  }, [lastTradedPrice]);
  const handleSetMinSize = () => {
    setSizeError("");
    if (quantityType === "USDT") {
      const quantityValueTemp = ContactSizeToPrice(Number(minQantityForContract), 2)?.toString();
      handleSizeInContractAssetChange({
        target: { value: minQantityForContract }
      });
      setSizeInUsdt(quantityValueTemp);
    } else {
      handleSizeInContractAssetChange({
        target: {
          value: convertToPrecisionValueInContractAssetUnit(Number(minQantityForContract), symbolQuantityPrecision)
        }
      });
    }
  };
  const PlaceOrder = ({ side, quantity }: { side: string; quantity: number }) => {
    const setOrderConfirm = () => null;
    const positionsTabNavCallback = () => null;
    if (Number(quantity) > 0) {
      const formValues: {
        symbol: string;
        side: string;
        quantity: number;
        type: number; // You should replace this with the actual type of 'OrderType'
      } = {
        symbol: symbol.toUpperCase(),
        side,
        quantity,
        type: 0
      };
      createOrder(formValues, dispatch, setShowLoader, setOrderConfirm, positionsTabNavCallback);
    } else {
      setSizeError("Enter size");
    }
  };
  const costPrice = useCallback(
    (side: string) => {
      return setDecimalPrecision((Number(sizeInContract) * lastTradedPrice) / parseFloat(leverageFromServer?.leverage) + openLossHandlerValue(side, Number(sizeInContract)), 2);
    },
    [sizeInContract, lastTradedPrice]
  );
  const closeQuickTrade = () => {
    setSizeInUsdt("");
    setSizeError("");
    setSizeInContract("");
  };
  return {
    costPrice,
    handleSetMinSize,
    minQtyForMarket,
    handleQuantityChange,
    handleSizeInContractAssetChange,
    sizeInContract,
    sizeError,
    quantityType,
    symbol,
    sizeInUsdt,
    showLoader,
    setQuantityType,
    PlaceOrder,
    closeQuickTrade
  };
};

useQuickOrder.propTypes = {};

export default useQuickOrder;
