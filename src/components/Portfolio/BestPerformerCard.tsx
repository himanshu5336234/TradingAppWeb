import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextView from "../UI/TextView/TextView";
import RankOne from "../../assets/icons/RankOne.svg";
import RankTwo from "../../assets/icons/RankTwo.svg";
import RankThree from "../../assets/icons/RankThree.svg";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import { getPortfolioTopPerformers } from "@/frontend-api-service/Api/NewPortfolio/Portfolio";
import getDurationRange from "@/helpers/getDurationRange";
import PortfolioFilter from "./PortfolioFilter";
import NoDataBanner from "./NoDataBanner";
import { displayDateRange } from "@/helpers/displayDateRange";
import { numberWithCommas } from "@/helpers/commaHelper";

interface BestPerformerObject {
  rank: number;
  symbol: string;
  value: number;
}

const BestPerformerCard = ({ refreshState }: { refreshState: boolean }) => {
  const [dateRange, setDateRange] = useState(() => {
    const initialState = getDurationRange("week");
    return initialState;
  });
  const [bestPerformers, setBestPerformers] = useState<BestPerformerObject[]>([]);
  const fetchBestPerformers = async (dateRange: { to: any; from: any }) => {
    const apiResponse = await getPortfolioTopPerformers({ startTime: dateRange.from, endTime: dateRange.to });
    const bestPerformerApiList = apiResponse?.data?.netPNL;
    // const bestPerformerApiList = [{symbol: "BNBUSDT", value: 123432000.444},{symbol: "BTCUSDT", value: -22300.422}];
    const bestPerformerList = bestPerformerApiList.map((item: { symbol: string; value: number }, index: number) => {
      const rank = index + 1;
      return { rank: rank, ...item };
    });

    setBestPerformers(bestPerformerList);
  };
  useEffect(() => {
    fetchBestPerformers(dateRange);
  }, [dateRange]);
  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "100%", lg: 477 },
        backgroundColor: "background.default",
        backgroundImage: "none",
        borderRadius: 2,
        gap: bestPerformers.length === 0 ? 3 : 8,
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "borderColor.primary"
      }}
    >
      <Box>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2} mb={3}>
          <TextView variant="Bold_28" text={"Best Performers"} component={"p"} />
          <TextView variant="Medium_14" style={{ marginTop: 1.2 }} text={displayDateRange(dateRange)} component={"p"} color="text.regular" />
        </Box>
        <Box mb={1}>
          <PortfolioFilter setDateRange={setDateRange} refreshState={refreshState} />
        </Box>
      </Box>
      <Box display={"flex"} width={"100%"} flexDirection={"column"} gap={2}>
        {bestPerformers.length === 0 ? (
          <>
            <NoDataBanner variant="small" />
          </>
        ) : (
          <>
            {bestPerformers.map((item) => (
              <Box display={"flex"} width={"100%"} alignItems={"center"}>
                <Box display={"flex"} flex={1}>
                  <img src={getImageBasisRank(item.rank)} style={{ width: 35, height: 40 }} />
                </Box>
                <Box display={"flex"} flex={3} flexDirection={"row"} gap={1} overflow={"wrap"} alignItems={"center"}>
                  <Box
                    component={"img"}
                    src={getCurrencyUrl(item.symbol.replace("USDT", "").toLowerCase())}
                    alt={item.symbol}
                    sx={{
                      height: "28px",
                      width: "28px",
                      borderRadius: "50%",
                      backgroundColor: "white"
                    }}
                  />
                  <TextView text={item.symbol.replace("USDT", "-USDT")} variant={"Bold_14"} />
                </Box>
                <Box display={"flex"} flex={2}>
                  <TextView text={`${numberWithCommas(item.value.toFixed(2))} USDT`} variant={"Bold_14"} color={item.value < 0 ? "text.error" : item.value === 0 ? "text.default" : "text.success"} />
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Paper>
  );
};

export default BestPerformerCard;
// utils
const getImageBasisRank = (rank: number) => {
  switch (rank) {
    case 1:
      return RankOne;
    case 2:
      return RankTwo;
    case 3:
      return RankThree;
    default:
      return RankThree;
  }
};
