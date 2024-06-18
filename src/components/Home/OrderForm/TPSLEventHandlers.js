export function caclulatePNLfromTPPriceEvent(
  takeProfitValue,
  TP_DropDown,
  setUnrealizedPnLTP,
  sizeInContractAsset,
  lastTradedPrice,
  limitPriceContractAsset,
  side,
  type,
  convertToPrecisionValueForPrice,
  triggerPrice
) {
  if (takeProfitValue !== "" && TP_DropDown !== "Amount") {
    if (side === "BUY") {
      if (type === 0) {
        const PnLValue = Math.abs(sizeInContractAsset) * (takeProfitValue - lastTradedPrice);
        setUnrealizedPnLTP(convertToPrecisionValueForPrice(PnLValue));
      } else if (type === 2) {
        const PnLValue = Math.abs(sizeInContractAsset) * (takeProfitValue - convertToPrecisionValueForPrice(triggerPrice));
        setUnrealizedPnLTP(convertToPrecisionValueForPrice(PnLValue));
      } else {
        const PnLValue = Math.abs(sizeInContractAsset) * (takeProfitValue - limitPriceContractAsset);
        setUnrealizedPnLTP(convertToPrecisionValueForPrice(PnLValue));
      }
    } else if (side === "SELL") {
      if (type === 0) {
        const PnLValue = Math.abs(sizeInContractAsset) * (lastTradedPrice - takeProfitValue);
        setUnrealizedPnLTP(convertToPrecisionValueForPrice(PnLValue));
      } else if (type === 2) {
        const PnLValue = Math.abs(sizeInContractAsset) * (convertToPrecisionValueForPrice(triggerPrice) - takeProfitValue);
        setUnrealizedPnLTP(convertToPrecisionValueForPrice(PnLValue));
      } else {
        const PnLValue = Math.abs(sizeInContractAsset) * (limitPriceContractAsset - takeProfitValue);
        setUnrealizedPnLTP(convertToPrecisionValueForPrice(PnLValue));
      }
    }
  }
}
export function caclulatePNLfromSLPriceEvent(
  stopLossValue,
  SL_DropDown,
  setUnrealizedPnLSL,
  sizeInContractAsset,
  lastTradedPrice,
  limitPriceContractAsset,
  side,
  type,
  convertToPrecisionValueForPrice,
  triggerPrice
) {
  if (stopLossValue !== "" && SL_DropDown !== "Amount") {
    if (side === "BUY") {
      if (type === 0) {
        const PnLValue = Math.abs(sizeInContractAsset) * (lastTradedPrice - stopLossValue);
        setUnrealizedPnLSL(convertToPrecisionValueForPrice(PnLValue));
      } else if (type === 2) {
        const PnLValue = Math.abs(sizeInContractAsset) * (convertToPrecisionValueForPrice(triggerPrice) - stopLossValue);
        setUnrealizedPnLSL(convertToPrecisionValueForPrice(PnLValue));
      } else {
        const PnLValue = Math.abs(sizeInContractAsset) * (limitPriceContractAsset - stopLossValue);
        setUnrealizedPnLSL(convertToPrecisionValueForPrice(PnLValue));
      }
    } else if (side === "SELL") {
      if (type === 0) {
        const PnLValue = Math.abs(sizeInContractAsset) * (stopLossValue - lastTradedPrice);
        setUnrealizedPnLSL(convertToPrecisionValueForPrice(PnLValue));
      } else if (type === 2) {
        const PnLValue = Math.abs(sizeInContractAsset) * (stopLossValue - convertToPrecisionValueForPrice(triggerPrice));
        setUnrealizedPnLSL(convertToPrecisionValueForPrice(PnLValue));
      } else {
        const PnLValue = Math.abs(sizeInContractAsset) * (stopLossValue - limitPriceContractAsset);
        setUnrealizedPnLSL(convertToPrecisionValueForPrice(PnLValue));
      }
    }
  }
}
export function convertAmountToPriceForTP(
  userInputAmount,
  side,
  type,
  convertToPrecisionValueForPrice,
  setTakeProfitValue,
  setUnrealizedPnLTP,
  lastTradedPrice,
  sizeInContractAsset,
  limitPriceContractAsset,
  triggerPrice
) {
  if (side === "BUY") {
    if (type === 0) {
      const TakeProfitInValue = convertToPrecisionValueForPrice(parseFloat(lastTradedPrice) + parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setTakeProfitValue(convertToPrecisionValueForPrice(TakeProfitInValue));
      setUnrealizedPnLTP(convertToPrecisionValueForPrice(TakeProfitInValue));
    } else if (type === 2) {
      const StopLossInValue = convertToPrecisionValueForPrice(parseFloat(triggerPrice) + parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setTakeProfitValue(convertToPrecisionValueForPrice(StopLossInValue));
      setUnrealizedPnLTP(convertToPrecisionValueForPrice(StopLossInValue));
    } else {
      const TakeProfitInValue = convertToPrecisionValueForPrice(parseFloat(limitPriceContractAsset) + parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setTakeProfitValue(convertToPrecisionValueForPrice(TakeProfitInValue));
      setUnrealizedPnLTP(convertToPrecisionValueForPrice(TakeProfitInValue));
    }
  } else if (side === "SELL") {
    if (type === 0) {
      const TakeProfitInValue = convertToPrecisionValueForPrice(parseFloat(lastTradedPrice) - parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setTakeProfitValue(convertToPrecisionValueForPrice(TakeProfitInValue));
      setUnrealizedPnLTP(convertToPrecisionValueForPrice(TakeProfitInValue));
    } else if (type === 2) {
      const TakeProfitInValue = convertToPrecisionValueForPrice(parseFloat(triggerPrice) - parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setTakeProfitValue(convertToPrecisionValueForPrice(TakeProfitInValue));
      setUnrealizedPnLTP(convertToPrecisionValueForPrice(TakeProfitInValue));
    } else {
      const TakeProfitInValue = convertToPrecisionValueForPrice(parseFloat(limitPriceContractAsset) - parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setTakeProfitValue(convertToPrecisionValueForPrice(TakeProfitInValue));
      setUnrealizedPnLTP(convertToPrecisionValueForPrice(TakeProfitInValue));
    }
  }
}
export function convertAmountToPriceForSL(
  userInputAmount,
  side,
  type,
  convertToPrecisionValueForPrice,
  setStopLossValue,
  setUnrealizedPnLSL,
  lastTradedPrice,
  sizeInContractAsset,
  limitPriceContractAsset,
  triggerPrice
) {
  if (side === "BUY") {
    if (type === 0) {
      const StopLossInValue = convertToPrecisionValueForPrice(parseFloat(lastTradedPrice) - parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setStopLossValue(convertToPrecisionValueForPrice(StopLossInValue));
      setUnrealizedPnLSL(convertToPrecisionValueForPrice(StopLossInValue));
    } else if (type === 2) {
      const StopLossInValue = convertToPrecisionValueForPrice(parseFloat(triggerPrice) - parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setStopLossValue(convertToPrecisionValueForPrice(StopLossInValue));
      setUnrealizedPnLSL(convertToPrecisionValueForPrice(StopLossInValue));
    } else {
      const StopLossInValue = convertToPrecisionValueForPrice(parseFloat(limitPriceContractAsset) - parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setStopLossValue(convertToPrecisionValueForPrice(StopLossInValue));
      setUnrealizedPnLSL(convertToPrecisionValueForPrice(StopLossInValue));
    }
  } else if (side === "SELL") {
    if (type === 0) {
      const StopLossInValue = convertToPrecisionValueForPrice(parseFloat(lastTradedPrice) + parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setStopLossValue(convertToPrecisionValueForPrice(StopLossInValue));
      setUnrealizedPnLSL(convertToPrecisionValueForPrice(StopLossInValue));
    } else if (type === 2) {
      const StopLossInValue = convertToPrecisionValueForPrice(parseFloat(triggerPrice) + parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setStopLossValue(convertToPrecisionValueForPrice(StopLossInValue));
      setUnrealizedPnLSL(convertToPrecisionValueForPrice(StopLossInValue));
    } else {
      const StopLossInValue = convertToPrecisionValueForPrice(parseFloat(limitPriceContractAsset) + parseFloat(userInputAmount) / parseFloat(sizeInContractAsset));
      setStopLossValue(convertToPrecisionValueForPrice(StopLossInValue));
      setUnrealizedPnLSL(convertToPrecisionValueForPrice(StopLossInValue));
    }
  }
}
