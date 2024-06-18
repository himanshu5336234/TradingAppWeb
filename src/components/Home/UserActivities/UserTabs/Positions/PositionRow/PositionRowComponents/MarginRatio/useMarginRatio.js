import { SET_CROSS_WALLET_DETAILS } from "@/frontend-BL/redux/constants/Constants";
import { SymbolPrecisionHelper } from "@/helpers";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLiquidationPrice } from "../LiquidationPrice/useLiquidationPrice";

function useMarginRatio({ symbol }) {
  const currentPositionData = useSelector((state) => state.positionsDirectory.currentPositions?.find((data) => data?.sym === symbol));
  const { symbolPricePrecision } = SymbolPrecisionHelper({ symbol });
  const dispatch = useDispatch();
  const isIsolated = useMemo(() => {
    return currentPositionData?.marginType?.toUpperCase() === "ISOLATED";
  }, [currentPositionData?.marginType]);
  const allCrossPosititonUnrealizedPnLData = useSelector((state) => state.positionsDirectory.unRealizedPnLForCross);
  const crossWalletDetails = useSelector((state) => state.positionsDirectory.crossWalletDetails);
  const crossWalletBalance = useSelector((state) => state.futures.accountInfo.totalCrossWalletBalance);
  const getIsolatedWallet = useSelector((state) => state.positionsDirectory.isolatedWallet.find((data) => data.sym === symbol));
  const fetchMarkPrice = useSelector((state) => state.BinanceStreamData?.binanceData?.[`${symbol.toLowerCase()}@markPrice@1s`]);
  const getPositionAmount = currentPositionData?.posAmt;
  const getEntryPrice = currentPositionData?.entryPrice;
  const leverageDirectory = useSelector((state) => state.positionsDirectory.leverage?.find((obj) => obj.sym === symbol));
  const getLeverage = leverageDirectory?.leverage;

  const { MarginRatioHelpers } = useLiquidationPrice({ symbol });

  const getPositionUnrealizedProfit = useMemo(() => {
    return getPositionAmount * (fetchMarkPrice - getEntryPrice);
  }, [fetchMarkPrice, getEntryPrice]);

  const getMarginBalance = useMemo(() => {
    return Number(getIsolatedWallet?.isolatedWallet) + Number(getPositionUnrealizedProfit);
  }, [getPositionUnrealizedProfit?.toFixed(4), getIsolatedWallet?.isolatedWallet]);

  const getMarginBalanceForCrossedPositions = useMemo(() => {
    let unrealizedPnLForCrossedPositions = 0;
    if (!isIsolated) {
      unrealizedPnLForCrossedPositions = allCrossPosititonUnrealizedPnLData.reduce((accumulator, position) => (Number(position.unRealisedPnl) || 0) + accumulator, 0);
    }
    return Number(crossWalletBalance) + Number(unrealizedPnLForCrossedPositions);
  }, [crossWalletBalance, allCrossPosititonUnrealizedPnLData]);

  const getPositionMarginRatio = useMemo(() => {
    const mmtr = MarginRatioHelpers?.maintainanceMargin ?? 0;
    const mb = getMarginBalance ?? 0;
    const mbCrossed = getMarginBalanceForCrossedPositions;

    let totalMaintenanceMarginOfAllContracts = 0;
    if (isIsolated) {
      return (Math.abs(mmtr) / Math.abs(mb)) * 100;
    } else {
      totalMaintenanceMarginOfAllContracts = crossWalletDetails.reduce((accumulator, position) => (Number(position.maintMargin) || 0) + accumulator, 0);
      return (totalMaintenanceMarginOfAllContracts / Math.abs(mbCrossed)) * 100;
    }
  }, [getPositionUnrealizedProfit?.toFixed(4), getMarginBalanceForCrossedPositions, getMarginBalance, MarginRatioHelpers]);

  useEffect(() => {
    if (!isIsolated) {
      const payload = {
        symbol,
        posAmt: parseFloat(getPositionAmount)?.toFixed(symbolPricePrecision) ?? 0,
        maintMargin: parseFloat(MarginRatioHelpers?.maintainanceMargin)?.toFixed(4) ?? 0,
        marginBalance: parseFloat(getMarginBalanceForCrossedPositions)?.toFixed(4),
        initialMargin: (((Number(Math.abs(getPositionAmount)) || 0) * (Number(fetchMarkPrice) || 0)) / (Number(getLeverage) || 1) || 0)?.toFixed(4) ?? 0,
        unPnl: Number(getPositionUnrealizedProfit?.toFixed(4)),
        marginRatio: getPositionMarginRatio?.toFixed(2),
        cum: MarginRatioHelpers?.cum,
        mmr: MarginRatioHelpers?.mmr
      };
      dispatch({
        type: SET_CROSS_WALLET_DETAILS,
        payload
      });
    }
  }, [getPositionUnrealizedProfit.toFixed(4)]);
  return {
    marginRatio: getPositionMarginRatio?.toFixed(2),
    marginBalance: isIsolated ? getMarginBalance : getMarginBalanceForCrossedPositions,
    maintMargin: MarginRatioHelpers?.maintainanceMargin
  };
}

export default useMarginRatio;
