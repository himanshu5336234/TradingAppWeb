import React, { useEffect, useState } from "react";
import { Box, Paper, Tooltip } from "@mui/material";
import TextView from "../UI/TextView/TextView";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import NoDataBanner from "./NoDataBanner";
import PortfolioFilter from "./PortfolioFilter";
import getDurationRange from "@/helpers/getDurationRange";
import { getPortfolioCummulativePnl } from "@/frontend-api-service/Api/NewPortfolio/Portfolio";
import { displayDateRange } from "@/helpers/displayDateRange";
import { epochToDateShortFormat } from "../../helpers";
import { PnlLineChart } from "./PnlLineChart";
import TableNoRowsOverlay from "../Setting/Rewards/TableNoRowsOverlay";
const CummulativePnL = ({ refreshState }: { refreshState: boolean }) => {
  const [dateRange, setDateRange] = useState(() => {
    const initialState = getDurationRange("week");
    return initialState;
  });
  const [cummulativeNetPnlGraphList, setCummulativeNetPnlGraphList] = useState<number[]>([]);
  const [cummulativeGrossPnlGraphList, setCummulativeGrossPnlGraphList] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);

  const fetchCummulativePnlData = async (dateRange: { from: any; to: any }) => {
    try {
      const apiResponse = await getPortfolioCummulativePnl({ startTime: dateRange.from, endTime: dateRange.to });
      const data = apiResponse.data?.data;
      const netPnlList = data.map((item: { netPNL: number }) => item.netPNL);
      const grossPnlList = data.map((item: { realisedPNL: number }) => item.realisedPNL);
      const graphDataLabels = data.map((item: { startTime: number }) => epochToDateShortFormat(item.startTime));
      const prefixDate = epochToDateShortFormat(data[0]?.startTime - 24 * 60 * 60 * 1000);
      const graphDataLabelsWithPrefix = [prefixDate, ...graphDataLabels];
      setCummulativeGrossPnlGraphList([0, ...grossPnlList]);
      setCummulativeNetPnlGraphList([0, ...netPnlList]);
      setLabels(graphDataLabelsWithPrefix);
      setLoader(false);
    } catch (errorResponse) {
      setLoader(false);
    }
  };
  useEffect(() => {
    setLoader(true);
    fetchCummulativePnlData(dateRange);
  }, [dateRange]);
  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "100%", lg: 1072 },
        backgroundColor: "background.default",
        backgroundImage: "none",
        borderRadius: 2,
        padding: "32px 36px",
        gap: "32px",
        display: "flex",
        flexDirection: "column",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "borderColor.primary",
        position: "relative"
      }}
    >
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
          <TextView variant="Bold_28" text={"Cummulative P&L"} component={"span"} />
          <TextView variant="Medium_14" style={{ marginTop: 1.2 }} text={displayDateRange(dateRange)} component={"span"} color="text.regular" />
        </Box>
        <Box>
          <PortfolioFilter setDateRange={setDateRange} refreshState={refreshState} />
        </Box>
      </Box>
      {cummulativeGrossPnlGraphList.length === 0 && (
        <Box mb={2}>
          <NoDataBanner />
        </Box>
      )}

      {cummulativeGrossPnlGraphList.length <= 1 ? (
        <Box height={300}>
          <TableNoRowsOverlay message={"No Active Data"} />
        </Box>
      ) : (
        <Box>
          <Box display="flex" flexDirection={"row"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
            <TextView text={"P&L (USDT)"} component="p" variant="Medium_14" color="text.regular" />
            <Box display={"flex"} gap="24px">
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      color: "text.quaternary",
                      fontSize: "11px",
                      backgroundColor: "background.tertiary",
                      fontWeight: 600,
                      p: "8px",
                      maxWidth: 160
                    }
                  }
                }}
                title={"Cumulative of Realised P&L exclusive of all the Fees, over the time period selected"}
                arrow
                placement="top"
              >
                <Box display={"flex"} gap={1} alignItems={"center"}>
                  <FiberManualRecordIcon sx={{ width: 10, height: 10, color: "#A044FE" }} />
                  <TextView text={"Gross Cumulative P&L"} component="span" color="text.regular" variant="Medium_14" />
                </Box>
              </Tooltip>
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      color: "text.quaternary",
                      fontSize: "11px",
                      backgroundColor: "background.tertiary",
                      fontWeight: 600,
                      p: "8px",
                      maxWidth: 160
                    }
                  }
                }}
                title={"Cumulative of Realised P&L inclusive of all the Fees, over the time period selected"}
                arrow
                placement="top"
              >
                <Box display={"flex"} gap={1} alignItems={"center"}>
                  <FiberManualRecordIcon sx={{ width: 10, height: 10, color: "#C0DF5A" }} />
                  <TextView text={"Net Cumulative P&L"} component="span" variant="Medium_14" color="text.regular" />
                </Box>
              </Tooltip>
            </Box>
          </Box>
          <Box height={400} sx={{ position: "relative", width: "100%" }} ml={2.5}>
            <PnlLineChart graphData={{ labels: labels, datasetOne: cummulativeGrossPnlGraphList, datasetTwo: cummulativeNetPnlGraphList }} />
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default CummulativePnL;
