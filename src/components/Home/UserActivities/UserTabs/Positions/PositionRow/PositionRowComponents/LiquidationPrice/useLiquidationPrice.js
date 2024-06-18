import { UPDATE_LIQUIDATION_PRICE } from "@/frontend-BL/redux/constants/Constants";
import { SymbolPrecisionHelper } from "@/helpers";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useLiquidationPrice = ({ symbol }) => {
  const symbolMarkPrice = useSelector((state) => state.BinanceStreamData.binanceData?.[`${symbol?.toLowerCase()}@markPrice@1s`]);
  const currentPositionData = useSelector((state) => state.positionsDirectory.currentPositions?.find((data) => data.sym === symbol));
  const getPositionSize = Number(currentPositionData?.posAmt) * Number(symbolMarkPrice);
  const leverageBracketData = useSelector((state) => state.leverageBracket.leverageBracket.find((sym) => sym.symbol === symbol));
  const getPositionAmount = currentPositionData?.posAmt;
  const getEntryPrice = currentPositionData?.entryPrice;
  const getIsolatedWallet = useSelector((state) => state.positionsDirectory.isolatedWallet.find((data) => data.sym === symbol));
  const activeCrossedPositions = useSelector((state) => state.positionsDirectory.crossWalletDetails);
  const calculatedCrossedPositionForCurrentContract = activeCrossedPositions.find((position) => position.symbol.toLowerCase() === symbol.toLowerCase());
  const calculatedCrossedPositionForOtherContracts = useMemo(() => {
    return activeCrossedPositions.filter((position) => position.symbol.toLowerCase() !== symbol.toLowerCase());
  }, [activeCrossedPositions]);
  const crossWalletBalance = useSelector((state) => state.futures.accountInfo.totalCrossWalletBalance);
  const activeCrossedPositionsPnLData = useSelector((state) => state.positionsDirectory.unRealizedPnLForCross);
  const { setDecimalPrecision, symbolPricePrecision } = SymbolPrecisionHelper({
    symbol
  });
  const dispatch = useDispatch();
  const MarginRatioHelpers = useMemo(() => {
    const size = Math.abs(getPositionSize);
    if (leverageBracketData !== undefined) {
      const leverageData = leverageBracketData?.leverageBrackets?.brackets;
      if (leverageData !== undefined) {
        for (let i = 0; i < leverageData.length; i++) {
          if (size >= leverageData[i].notionalFloor && size <= leverageData[i].notionalCap) {
            return {
              maintainanceMargin: size * leverageData[i].maintenanceMarginRatio - leverageData[i].cum,
              mmr: leverageData[i].maintenanceMarginRatio,
              cum: leverageData[i].cum
            };
          }
        }
      }
    }
  }, [leverageBracketData, getPositionSize]);

  const liquidationPrice = useMemo(() => {
    if (
      currentPositionData?.marginType?.toUpperCase() === "ISOLATED" &&
      MarginRatioHelpers?.mmr !== 0 &&
      getIsolatedWallet !== undefined &&
      getPositionAmount !== undefined &&
      getEntryPrice !== undefined &&
      MarginRatioHelpers?.cum !== null
    ) {
      const numerator = Number(getIsolatedWallet.isolatedWallet) + MarginRatioHelpers?.cum - getPositionAmount * getEntryPrice;
      const denominator = Math.abs(getPositionAmount) * MarginRatioHelpers?.mmr - getPositionAmount;
      const liqPrice = numerator / denominator;
      dispatch({
        type: UPDATE_LIQUIDATION_PRICE,
        payload: {
          sym: symbol,
          liquidationPrice: setDecimalPrecision(String(liqPrice), symbolPricePrecision)
        }
      });
      return liqPrice < 0 ? "--" : setDecimalPrecision(String(liqPrice), symbolPricePrecision);
    } else if (
      currentPositionData?.marginType?.toUpperCase() !== "ISOLATED" &&
      MarginRatioHelpers?.mmr !== 0 &&
      getIsolatedWallet !== undefined &&
      getPositionAmount !== undefined &&
      getEntryPrice !== undefined &&
      MarginRatioHelpers?.cum !== null
    ) {
      let totalMaintenanceMarginForOtherContracts = 0;
      let totalUnrealizedPnlForOtherContracts = 0;
      let liquidationPrice = "--";
      if (calculatedCrossedPositionForOtherContracts && calculatedCrossedPositionForOtherContracts.length) {
        totalMaintenanceMarginForOtherContracts = calculatedCrossedPositionForOtherContracts.reduce((accumulator, position) => (Number(position.maintMargin) || 0) + accumulator, 0);
        totalUnrealizedPnlForOtherContracts = activeCrossedPositionsPnLData.reduce((accumulator, position) => (Number(position.unRealisedPnl) || 0) + accumulator, 0);
      }
      if (calculatedCrossedPositionForCurrentContract && Object.keys(calculatedCrossedPositionForCurrentContract).length) {
        liquidationPrice =
          (Number(crossWalletBalance) -
            Number(totalMaintenanceMarginForOtherContracts) +
            Number(totalUnrealizedPnlForOtherContracts) +
            calculatedCrossedPositionForCurrentContract.cum -
            (currentPositionData?.side === "BUY" ? 1 : -1) * Math.abs(Number(getPositionAmount)) * Number(getEntryPrice)) /
          (Math.abs(Number(getPositionAmount)) * (calculatedCrossedPositionForCurrentContract.mmr - (currentPositionData?.side === "BUY" ? 1 : -1)));
      }
      dispatch({
        type: UPDATE_LIQUIDATION_PRICE,
        payload: { sym: symbol, liquidationPrice }
      });
      const liqPrice = liquidationPrice > 0 ? fallbackForNaN(liquidationPrice) : "--";
      return liqPrice;
    }
  }, [MarginRatioHelpers, activeCrossedPositionsPnLData, getPositionAmount, symbol, currentPositionData]);

  function fallbackForNaN(number) {
    if (isNaN(number)) {
      return "--";
    }
    return setDecimalPrecision(String(number), symbolPricePrecision);
  }

  return {
    liquidationPrice,

    MarginRatioHelpers,
    setDecimalPrecision
  };
};
