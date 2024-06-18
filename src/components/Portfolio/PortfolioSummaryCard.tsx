import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import TextView from "../UI/TextView/TextView";
import TotalValueField from "./TotalValueField";
import MyEarningImage from "@/assets/images/MyEarningImage.svg";
import { numberWithCommas } from "@/helpers/commaHelper";
import NoDataBanner from "./NoDataBanner";
import getDurationRange from "@/helpers/getDurationRange";
import { getPortfolioSummary } from "@/frontend-api-service/Api/NewPortfolio/Portfolio";

import WalletBalanceModal from "./WalletBalanceModal";
import FeeBreakdownModal from "./FeeBreakdownModal";
import { displayDateRange } from "@/helpers/displayDateRange";
import PortfolioFilter from "./PortfolioFilter";

interface PortfolioSummaryInterface {
  grossPnl: number;
  netPnl: number;
  totalFee: number;
}
export type DurationOptionsType = "day" | "week" | "month" | "all" | "custom";

const PorfolioSummaryCard = ({ refreshState }: { refreshState: any }) => {
  const [showWallet, setShowWallet] = useState(false);
  const [showFeeBreakDown, setShowFeeBreakDown] = useState(false);
  const [dateRange, setDateRange] = useState(() => {
    const initialState = getDurationRange("week");
    return initialState;
  });
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummaryInterface>({ totalFee: 0, netPnl: 0, grossPnl: 0 });

  // fetch portfolio summary
  const fetchPortfolioSummary = async (dateRange: { from: number; to: number }) => {
    const apiResponse = await getPortfolioSummary({ startTime: dateRange.from, endTime: dateRange.to });
    const data = apiResponse.data;
    setPortfolioSummary({
      netPnl: data?.netPNL,
      grossPnl: data?.realisedPNL,
      totalFee: data?.commission
    });
  };

  useEffect(() => {
    fetchPortfolioSummary(dateRange);
  }, [dateRange]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "100%", lg: 1072 },
        minHeight: 320,
        backgroundColor: "neutral.grey2",
        backgroundImage: "none",
        borderRadius: 2,
        padding: "32px 36px",
        gap: "32px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
          <TextView variant="Bold_28" text={"My Portfolio"} component={"span"} />
          <TextView variant="Medium_14" style={{ marginTop: 1.2 }} text={displayDateRange(dateRange)} component={"span"} color="text.regular" />
        </Box>
        <Box>
          <PortfolioFilter setDateRange={setDateRange} refreshState={refreshState} />
        </Box>
      </Box>
      {portfolioSummary?.grossPnl === 0 && portfolioSummary?.netPnl === 0 && portfolioSummary?.totalFee === 0 && <NoDataBanner />}
      <Box display={"flex"} flexDirection={{ xs: "column", lg: "row" }} gap={2} width={"100%"} height={"100%"}>
        <Box display={"flex"} justifyContent={"space-between"} flexDirection={"row"} sx={{ backgroundColor: "neutral.grey3", p: "24px 32px", flex: 2.6, borderRadius: 2 }}>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"} alignItems={"flex-start"} gap={5}>
              <TotalValueField
                totalName="Gross Realised P&L (USDT)"
                totalValue={portfolioSummary?.grossPnl === 0 && portfolioSummary?.netPnl === 0 && portfolioSummary?.totalFee === 0 ? "--" : numberWithCommas(portfolioSummary?.grossPnl.toFixed(2))}
                tooltipText="Total Realised P&L excluding all Fees for the given time period"
                color={portfolioSummary?.grossPnl > 0 ? "text.success" : portfolioSummary?.grossPnl === 0 ? "text.default" : "text.error"}
              />
              <TotalValueField
                totalName="Net Realised P&L (USDT)"
                totalValue={portfolioSummary?.grossPnl === 0 && portfolioSummary?.netPnl === 0 && portfolioSummary?.totalFee === 0 ? "--" : numberWithCommas(portfolioSummary?.netPnl.toFixed(2))}
                tooltipText="Total Realised P&L inclusive of all Fees for the give time period"
                color={portfolioSummary?.netPnl > 0 ? "text.success" : portfolioSummary?.netPnl === 0 ? "text.default" : "text.error"}
              />
            </Box>
            <TextView
              component={"h6"}
              onClick={() => setShowWallet(true)}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                padding: "7.5px 12px"
              }}
              text={"View Wallet"}
              variant="Medium_12"
            />
          </Box>
          <Box>
            <img src={MyEarningImage} alt="My Earning" />
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} sx={{ backgroundColor: "neutral.grey3", p: "24px 32px", flex: 1, borderRadius: 2 }}>
          {/* <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}> */}
          <TotalValueField
            totalName="Total Fee (USDT)"
            totalValue={
              portfolioSummary?.grossPnl === 0 && portfolioSummary?.netPnl === 0 && portfolioSummary?.totalFee === 0
                ? "--"
                : portfolioSummary?.totalFee > 0
                ? `+${numberWithCommas(portfolioSummary?.totalFee.toFixed(2))}`
                : `${numberWithCommas(portfolioSummary?.totalFee.toFixed(2))}`
            }
            tooltipText="Fee inclusive of Commission, Funding Fee and Liquidation Fee"
            color="text.default"
          />

          <TextView
            component={"h6"}
            onClick={() => setShowFeeBreakDown(true)}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              padding: "7.5px 12px"
            }}
            text={"View Details"}
            variant="Medium_12"
          />
          {/* </Box> */}
        </Box>
      </Box>
      <WalletBalanceModal showWallet={showWallet} setShowWallet={setShowWallet} />
      <FeeBreakdownModal showFeeBreakDown={showFeeBreakDown} setShowFeeBreakDown={setShowFeeBreakDown} dateRange={dateRange} refreshState={refreshState} />
    </Paper>
  );
};

export default PorfolioSummaryCard;
