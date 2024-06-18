import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_UNREALISED_PROFITLOSS,
  SET_UNREALISED_PROFITLOSS_BASED_ON_LTP,
  SET_UNREALISED_PROFITLOSS_CROSS,
  SET_UNREALISED_PROFITLOSS_CROSS_BASED_ON_LTP
} from "@/frontend-BL/redux/constants/Constants";
import { SymbolPrecisionHelper } from "@/helpers";
import TextView from "@/components/UI/TextView/TextView";
interface PositionPnLProps {
  symbol: string;
  isRoE: boolean;
  variant: string;
  posAmt: number;
  entryPrice: number;
  marginType: string;
}
const PositionPnL = ({ symbol, variant, posAmt, entryPrice, marginType }: PositionPnLProps) => {
  const dispatch = useDispatch();
  const TotalUnRealisedProfitAndLossBasedOn = useSelector((state: any) => state.TotalProfitLossBasedOn);
  const crossWalletDetails = useSelector((state: any) => state.positionsDirectory.crossWalletDetails.find((data: { symbol: string }) => data.symbol === symbol));
  const isolatedWallet = useSelector((state: any) => state.positionsDirectory.isolatedWallet.find((data: { sym: string }) => data.sym === symbol));
  const { symbolPricePrecision } = SymbolPrecisionHelper({ symbol });
  const fetchMarkPrice = useSelector((state: any) => state.BinanceStreamData?.binanceData?.[`${symbol.toLowerCase()}@markPrice@1s`]);
  const fetchLastTradePrice = useSelector((state: any) => state.BinanceStreamData?.binanceData?.[`${symbol.toLowerCase()}@ticker`]);
  const MarginType = marginType?.toUpperCase();
  const getPositionUnrealizedProfit = useMemo(() => {
    let ROE = 0;
    const unRealisedPnl = fetchMarkPrice ? posAmt * (Number(fetchMarkPrice) - entryPrice) : "";
    if (unRealisedPnl !== "") {
      if (MarginType !== "CROSS") {
        ROE = (unRealisedPnl / Number(isolatedWallet?.isolatedWallet || 1)) * 100;
        dispatch({
          type: SET_UNREALISED_PROFITLOSS,
          payload: {
            unRealisedPnl: unRealisedPnl || 0,
            symbol,
            ratio: ROE || 0
          }
        });
      } else {
        ROE = (unRealisedPnl / Number(crossWalletDetails?.initialMargin || 1)) * 100;
        dispatch({
          type: SET_UNREALISED_PROFITLOSS_CROSS,
          payload: {
            unRealisedPnl: unRealisedPnl || 0,
            symbol,
            ratio: ROE || 0
          }
        });
      }
      return { unRealisedPnl: Number(unRealisedPnl).toFixed(4), roe: ROE.toFixed(2) };
    } else {
      return { unRealisedPnl: "--", roe: "" };
    }
  }, [posAmt, Number(fetchMarkPrice).toFixed(symbolPricePrecision), entryPrice]);
  const getPositionUnrealizedProfitBasedOnLTP = useMemo(() => {
    let ROE;
    const unRealisedPnl = fetchLastTradePrice ? posAmt * (Number(fetchLastTradePrice) - entryPrice) : "";
    if (unRealisedPnl !== "") {
      if (MarginType !== "CROSS") {
        ROE = (unRealisedPnl / Number(isolatedWallet?.isolatedWallet || 1)) * 100;
        dispatch({
          type: SET_UNREALISED_PROFITLOSS_BASED_ON_LTP,
          payload: {
            unRealisedPnl: unRealisedPnl || 0,
            symbol,
            ratio: ROE || 0
          }
        });
      } else {
        ROE = (unRealisedPnl / Number(crossWalletDetails?.initialMargin || 1)) * 100;
        dispatch({
          type: SET_UNREALISED_PROFITLOSS_CROSS_BASED_ON_LTP,
          payload: {
            unRealisedPnl: unRealisedPnl || 0,
            symbol,
            ratio: ROE || 0
          }
        });
      }
      return { unRealisedPnl: Number(unRealisedPnl).toFixed(4), roe: ROE.toFixed(2) };
    } else {
      return { unRealisedPnl: "--", roe: "" };
    }
  }, [posAmt, Number(fetchLastTradePrice).toFixed(symbolPricePrecision), entryPrice]);

  const showPNL = useMemo(() => {
    if (TotalUnRealisedProfitAndLossBasedOn.TotalProfitLossBasedOn === "LTP") {
      return getPositionUnrealizedProfitBasedOnLTP;
    } else {
      return getPositionUnrealizedProfit;
    }
  }, [TotalUnRealisedProfitAndLossBasedOn, getPositionUnrealizedProfitBasedOnLTP, getPositionUnrealizedProfit]);
  return (
    <>
      {showPNL.unRealisedPnl !== "--" && (
        <>
          <TextView
            id="position-pnl"
            component="p"
            variant={variant}
            style={{
              textAlign: "left",
              color: Number(showPNL.unRealisedPnl) > 0 ? "text.success" : Number(showPNL.unRealisedPnl) === 0 ? "text.primary" : showPNL.unRealisedPnl === "--" ? "text.primary" : "text.error"
            }}
            text={showPNL.unRealisedPnl}
          />

          <TextView
            id="position-pnl"
            component="p"
            variant={"Medium_11"}
            style={{
              textAlign: "left",
              color: Number(showPNL.unRealisedPnl) > 0 ? "text.success" : Number(showPNL.unRealisedPnl) === 0 ? "text.primary" : showPNL.unRealisedPnl === "--" ? "text.primary" : "text.error"
            }}
            text={`${showPNL.roe} %`}
          />
        </>
      )}
    </>
  );
};

PositionPnL.propTypes = {
  variant: PropTypes.string,
  symbol: PropTypes.string,
  initialVal: PropTypes.string,
  entryPrice: PropTypes.number,
  isRoE: PropTypes.bool,
  posAmt: PropTypes.string,
  marginType: PropTypes.string
};

export default memo(PositionPnL);
