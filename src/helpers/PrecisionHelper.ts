import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { numberWithCommas } from "./commaHelper";

export const SymbolPrecisionHelper = ({ symbol }: { symbol: string }) => {
  const convertToPrecisionValueInContractAssetUnit = (value: string, Precision: number) => {
    let numStr = value?.toString();
    if (numStr.startsWith(".")) {
      numStr = `0${numStr}`; // Add a leading zero
    }

    numStr = numStr?.replace(/-/g, "");
    // Find the index of the decimal point
    const decimalIndex = numStr?.indexOf(".");

    // If there is a decimal point, remove the portion before it
    if (decimalIndex !== -1) {
      return (numStr = numStr.substr(0, Precision + decimalIndex + 1));
    } else {
      return numStr;
    }
  };
  symbol = symbol && symbol?.toUpperCase();
  const nanFallback = "--";
  const symbolPrecisionData = useSelector((state: any) => state.tradablesymbolList.tradablesymbolList.find((data: { symbol: string }) => data?.symbol?.toLowerCase() === symbol?.toLowerCase()));
  const symbolPricePrecision = useMemo(() => {
    if (symbolPrecisionData !== undefined) {
      return symbolPrecisionData.pricePrecision;
    }
  }, [symbolPrecisionData]);
  const symbolQuantityPrecision = useMemo(() => {
    if (symbolPrecisionData !== undefined) {
      return symbolPrecisionData.quantityPrecision;
    }
  }, [symbolPrecisionData]);
  const symbolMinQTYFormMarketOrders = useMemo(() => {
    if (symbolPrecisionData !== undefined) {
      return symbolPrecisionData.filters.find((item: { filterType: string }) => item.filterType === "MARKET_LOT_SIZE");
    }
  }, [symbolPrecisionData]);
  const symbolMinQTYFormLimitOrders = useMemo(() => {
    if (symbolPrecisionData !== undefined) {
      return symbolPrecisionData.filters.find((item: { filterType: string }) => item.filterType === "LOT_SIZE");
    }
  }, [symbolPrecisionData]);

  const symbolMinPriceForOrders = useMemo(() => {
    if (symbolPrecisionData !== undefined) {
      return symbolPrecisionData.filters.find((item: { filterType: string }) => item.filterType === "PRICE_FILTER");
    }
  }, [symbolPrecisionData]);

  const symbolMaxPriceForOrders = useMemo(() => {
    if (symbolPrecisionData !== undefined) {
      return symbolPrecisionData.filters.find((item: { filterType: string }) => item.filterType === "PRICE_FILTER");
    }
  }, [symbolPrecisionData]);

  const symbolPrecisionByMinTickSize = useMemo(() => {
    if (symbolPrecisionData !== undefined) {
      const PriceFilterObject = symbolPrecisionData.filters.find((item: { filterType: string }) => item.filterType === "PRICE_FILTER");
      const TickSizeString = PriceFilterObject?.tickSize;
      const tickSizeStr = TickSizeString.toString().replace(/^0+/, "");
      const decimalIndex = tickSizeStr.indexOf("1");
      const digitsBetweenDecimalAndFirstOne = decimalIndex >= 0 ? decimalIndex : 0;
      return digitsBetweenDecimalAndFirstOne;
    }
  }, [symbolPrecisionData]);

  const minimimumNotionalValueFromTradableSymbol = useMemo(() => {
    if (symbolPrecisionData !== undefined) {
      const minNotionalObject = symbolPrecisionData.filters.find((item: { filterType: string }) => item.filterType === "MIN_NOTIONAL");
      return minNotionalObject?.notional;
    }
  }, [symbolPrecisionData]);

  const setDecimalPrecision = (value: string, precision: number) => {
    const res = convertToPrecisionValueInContractAssetUnit(Number(value), Number(precision));
    return value !== ("undefined" && "-") ? numberWithCommas(Number(res).toFixed(precision)) : nanFallback;
  };

  const defaultlimiter = (n: number) => {
    if (isNaN(n)) return nanFallback;
    const res = Number(Number(n).toFixed(2));
    return numberWithCommas(res);
  };
  const setQuantityPrecision = useCallback(
    (n: number) => {
      if (isNaN(n)) return nanFallback;
      const res = Number(Number(n).toFixed(symbolQuantityPrecision));
      return numberWithCommas(res);
    },
    [symbolQuantityPrecision]
  );
  return {
    setDecimalPrecision,
    defaultlimiter,
    setQuantityPrecision,
    symbolMinQTYFormMarketOrders,
    symbolMinQTYFormLimitOrders,
    symbolPricePrecision,
    symbolQuantityPrecision,
    symbolMinPriceForOrders,
    symbolMaxPriceForOrders,
    convertToPrecisionValueInContractAssetUnit,
    symbolPrecisionByMinTickSize,
    minimimumNotionalValueFromTradableSymbol
  };
};
