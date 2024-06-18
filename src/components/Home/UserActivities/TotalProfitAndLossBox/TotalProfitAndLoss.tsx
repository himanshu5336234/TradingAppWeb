import TextView from "@/components/UI/TextView/TextView";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
interface Props {
  variant: string;
}
export const TotalProfitAndLoss = ({ variant }: Props) => {
  const TotalUnRealisedProfitAndLossBasedOn = useSelector((state: any) => state.TotalProfitLossBasedOn);
  const TotalUnRealisedProfitAndLossBasedOnMarkPrice = useSelector((state: any) => state.positionsDirectory.unRealizedPnL);
  const TotalUnRealisedProfitAndLossForCrossBasedOnMarkPrice = useSelector((state: any) => state.positionsDirectory.unRealizedPnLForCross);
  const TotalUnRealisedProfitAndLossBasedOnLTP = useSelector((state: any) => state.positionsDirectory.unRealizedPnLCalculatedBasedOnLastTradedPrice);
  const TotalUnRealisedProfitAndLossForCrossBasedOnLTP = useSelector((state: any) => state.positionsDirectory.unRealizedPnLForCrossCalculatedBasedOnLastTradedPrice);
  const crossWalletDetails = useSelector((state: any) => state.positionsDirectory.crossWalletDetails);
  const isolatedWallet = useSelector((state: any) => state.positionsDirectory.isolatedWallet);
  const totalMarginUsed = useMemo(() => {
    let isolatedWalletMarginUsed = 0,
      crossWalletMarginUsed = 0;
    if (isolatedWallet.length !== 0) {
      isolatedWalletMarginUsed = isolatedWallet.reduce((accumulator: string, isolatedPosition: Record<string, string>) => Number(accumulator) + Number(isolatedPosition?.isolatedWallet), 0);
    }

    if (crossWalletDetails.length !== 0) {
      crossWalletMarginUsed = crossWalletDetails.reduce((accumulator: number, crossWalletPosition: Record<string, string>) => Number(accumulator) + Number(crossWalletPosition?.initialMargin), 0);
    }
    return isolatedWalletMarginUsed + crossWalletMarginUsed;
  }, [crossWalletDetails, isolatedWallet]);
  const combinedPnlBasedOnMarkPrice = useMemo(() => {
    if (TotalUnRealisedProfitAndLossBasedOnMarkPrice.length === 0 && TotalUnRealisedProfitAndLossForCrossBasedOnMarkPrice.length === 0) {
      return "--";
    }
    const pnl = TotalUnRealisedProfitAndLossBasedOnMarkPrice.reduce((accumulator: string, data: { unRealisedPnl: string }) => {
      return Number(accumulator) + Number(data.unRealisedPnl);
    }, 0);

    const pnlForCross = TotalUnRealisedProfitAndLossForCrossBasedOnMarkPrice.reduce((accumulator: string, data: { unRealisedPnl: string }) => {
      return Number(accumulator) + Number(data.unRealisedPnl);
    }, 0);

    return { unrelealizedPnl: pnl + pnlForCross, roe: ((pnlForCross + pnl) / totalMarginUsed) * 100 };
  }, [TotalUnRealisedProfitAndLossBasedOnMarkPrice, TotalUnRealisedProfitAndLossForCrossBasedOnMarkPrice]);

  const combinedPnlBasedOnLastPrice = useMemo(() => {
    if (TotalUnRealisedProfitAndLossBasedOnLTP.length === 0 && TotalUnRealisedProfitAndLossForCrossBasedOnLTP.length === 0) {
      return "--";
    }
    const pnl = TotalUnRealisedProfitAndLossBasedOnLTP.reduce((accumulator: number, data: { unRealisedPnl: number }) => {
      return Number(accumulator) + data.unRealisedPnl;
    }, 0);

    const pnlForCross = TotalUnRealisedProfitAndLossForCrossBasedOnLTP.reduce((accumulator: number, data: { unRealisedPnl: number }) => {
      return Number(accumulator) + data.unRealisedPnl;
    }, 0);
    return { unrelealizedPnl: pnl + pnlForCross, roe: ((pnlForCross + pnl) / totalMarginUsed) * 100 };
  }, [TotalUnRealisedProfitAndLossBasedOnLTP, TotalUnRealisedProfitAndLossForCrossBasedOnLTP]);
  const showPNL = useMemo(() => {
    if (TotalUnRealisedProfitAndLossBasedOn.TotalProfitLossBasedOn === "LTP") {
      return combinedPnlBasedOnLastPrice;
    } else {
      return combinedPnlBasedOnMarkPrice;
    }
  }, [TotalUnRealisedProfitAndLossBasedOn, combinedPnlBasedOnMarkPrice, combinedPnlBasedOnLastPrice]);

  return (
    <>
      {showPNL !== "--" && (
        <TextView
          id="total-position"
          component="span"
          variant={variant ?? "SemiBold_14"}
          style={{
            color: Number(showPNL.unrelealizedPnl) > 0 ? "text.success" : Number(showPNL.unrelealizedPnl) === 0 ? "text.primary" : showPNL.unrelealizedPnl === "--" ? "text.primary" : "text.error"
          }}
          text={showPNL?.unrelealizedPnl?.toFixed(2)}
        >
          <TextView
            variant={"Medium_12"}
            style={{
              color: Number(showPNL.unrelealizedPnl) > 0 ? "text.success" : Number(showPNL.unrelealizedPnl) === 0 ? "text.primary" : showPNL.unrelealizedPnl === "--" ? "text.primary" : "text.error"
            }}
          >
            &nbsp;{` ( ${(showPNL?.roe).toFixed(2)} % )`}
          </TextView>
        </TextView>
      )}
    </>
  );
};
