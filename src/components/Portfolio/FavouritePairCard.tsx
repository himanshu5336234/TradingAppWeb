import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextView from "../UI/TextView/TextView";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartItemInterface } from "./PieChart";
import PieChart from "./PieChart";
import getDurationRange from "@/helpers/getDurationRange";
import { getPortfolioTopPerformers } from "@/frontend-api-service/Api/NewPortfolio/Portfolio";
import PortfolioFilter from "./PortfolioFilter";
import { displayDateRange } from "@/helpers/displayDateRange";
import NoDataBanner from "./NoDataBanner";
import { numFormatter } from "@/helpers/commaHelper";

ChartJS.register(ArcElement, Tooltip, Legend);

interface FavouritePairObject {
  symbol: string;
  value: string;
  color: string;
}
const FavouritePairCard = ({ refreshState }: { refreshState: boolean }) => {
  const [dateRange, setDateRange] = useState(() => {
    const initialState = getDurationRange("week");
    return initialState;
  });
  const [totalVolume, setTotalVolume] = useState(0);
  const [favouritePairs, setFavouritePairs] = useState<FavouritePairObject[]>([]);
  const [pieChartItems, setPieChartItems] = useState<ChartItemInterface>({ data: [], backgroundColors: [], totalVol: 0 });

  const fetchBestPerformers = async (dateRange: { to: any; from: any }) => {
    const apiResponse = await getPortfolioTopPerformers({ startTime: dateRange.from, endTime: dateRange.to });
    const favouritePairApiList = apiResponse?.data?.volume;
    // const favouritePairApiList = [{symbol: "BNBUSDT", value: 77000},{symbol: "BTCUSDT", value: 10030.422}, {symbol: "Others", value: 1000.422}];
    const topPerformerVolumeList = favouritePairApiList.map((item: { symbol: string; value: number }) => Number(item.value));
    const totalVol = apiResponse?.data?.totalVolume;
    const totalVolForPie = topPerformerVolumeList.reduce((sum: number, currentVal: number) => currentVal + sum, 0);
    let pieColors: string[] = [];
    const favouritePairList: FavouritePairObject[] = favouritePairApiList.map((item: { symbol: string; value: number }, index: number) => {
      let color: string;
      let formattedSymbol;
      if (index === 0) {
        color = "#A044FE";
      } else if (index === 1) {
        color = "#C0DF5A";
      } else if (index === 2) {
        color = "#EBB62F";
      } else {
        color = "#29B57E";
      }
      // add Others
      if (item.symbol === "") {
        formattedSymbol = "Others";
      } else {
        formattedSymbol = item.symbol;
      }
      pieColors.push(color);
      const fixedVal = item.value;

      const updatedItem = { color, value: fixedVal, symbol: formattedSymbol };
      return updatedItem;
    });
    setFavouritePairs(favouritePairList);
    setPieChartItems({ ...pieChartItems, data: topPerformerVolumeList, totalVol: totalVolForPie, backgroundColors: pieColors });
    setTotalVolume(totalVol);
  };

  useEffect(() => {
    fetchBestPerformers(dateRange);
  }, [dateRange]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "100%", lg: 580 },
        backgroundColor: "background.default",
        backgroundImage: "none",
        borderRadius: 2,
        padding: "32px 24px",
        gap: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "borderColor.primary"
      }}
    >
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
        <TextView variant="Bold_28" text={"Favourite Pair"} component={"p"} />
        <TextView variant="Medium_14" style={{ marginTop: 1.2 }} text={displayDateRange(dateRange)} component={"p"} color="text.regular" />
      </Box>
      <Box mb={1}>
        <PortfolioFilter setDateRange={setDateRange} refreshState={refreshState} />
      </Box>
      {favouritePairs.length === 0 ? (
        <NoDataBanner variant="small" />
      ) : (
        <Box display={"flex"} justifyContent={"space-between"} flexDirection={"row"} width={"100%"}>
          <Box width={180} height={180} position={"relative"}>
            <PieChart chartItems={pieChartItems} />
          </Box>
          <Box width={"55%"} display={"flex"} flexDirection={"column"} gap={3.5}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <TextView text={"Total Volume"} variant="Bold_14" component="p" />
              <TextView text={`${numFormatter(totalVolume, 2)} USDT`} variant="Medium_14" component="p" color="text.quaternary" />
            </Box>
            <Box>
              {favouritePairs.map((item) => (
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Box gap={1} flexDirection={"row"} display={"flex"} alignItems={"center"}>
                    <FiberManualRecordIcon sx={{ width: 10, height: 10, color: item.color }} />
                    <TextView text={item.symbol.replace("USDT", "-USDT")} variant="Bold_14" component="p" />
                  </Box>
                  <TextView text={`${numFormatter(item.value, 2)} USDT`} variant="Medium_14" component="p" color="text.quaternary" />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default FavouritePairCard;
