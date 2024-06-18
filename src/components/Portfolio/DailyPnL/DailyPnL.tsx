import React, { useEffect, useState } from "react";
import { Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TextView from "../../UI/TextView/TextView";
import ToggleGroup from "../../UI/ToggleGroup/ToggleGroup";
import ChartIcon from "@/assets/icons/ChartIcon.svg";
import TableIcon from "@/assets/icons/TableIcon.svg";
import NoDataBanner from "../NoDataBanner";
import { styled } from "@mui/material/styles";
import DailyPnLTable from "./DailyPnLTable";
import { dailypnlmock } from "./dailypnlmock";
import DailyPnLChart from "./DailyPnLChart";
import PortfolioFilter from "../PortfolioFilter";
import getDurationRange from "@/helpers/getDurationRange";
import { getPortfolioDailyPnl } from "@/frontend-api-service/Api/NewPortfolio/Portfolio";
import { epochToDateShortFormat } from "@/helpers";
import { displayDateRange } from "@/helpers/displayDateRange";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0),
    border: 0,
    "&.Mui-disabled": {
      border: 0
    },
    "&:not(:first-of-type)": {
      borderRadius: "4px"
    },
    "&:first-of-type": {
      borderRadius: "4px"
    }
  }
}));

const DailyPnl = ({ refreshState }) => {
  const [selectedTab, setSelectedTab] = useState<"table" | "chart">("table");
  const handleTabChange = (_event: React.MouseEvent<HTMLElement>, latestTab: "table" | "chart") => {
    if (latestTab !== null) {
      setSelectedTab(latestTab);
    }
  };
  const [dateRange, setDateRange] = useState(() => {
    const initialState = getDurationRange("week");
    return initialState;
  });
  const [dailyPnlTableList, setDailyPnlTableList] = useState([]);
  const [dailyNetPnlGraphList, setDailyNetPnlGraphList] = useState<number[]>([]);
  const [dailyGrossPnlGraphList, setDailyGrossPnlGraphList] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);

  const fetchDailyPnlData = async (dateRange: { from: any; to: any }) => {
    try {
      const apiResponse = await getPortfolioDailyPnl({ startTime: dateRange.from, endTime: dateRange.to });
      const data = apiResponse.data?.data;
      const netPnlList = data.map((item: { netPNL: number }) => item.netPNL);
      const grossPnlList = data.map((item: { realisedPNL: number }) => item.realisedPNL);
      const graphDataLabels = data.map((item: { startTime: number }) => epochToDateShortFormat(item.startTime));
      const prefixDate = epochToDateShortFormat(data[0]?.startTime - 24 * 60 * 60 * 1000);
      const graphDataLabelsWithPrefix = [prefixDate, ...graphDataLabels];
      setDailyGrossPnlGraphList([0, ...grossPnlList]);
      setDailyNetPnlGraphList([0, ...netPnlList]);
      setLabels(graphDataLabelsWithPrefix);
      setDailyPnlTableList(data.reverse());
      setLoader(false);
    } catch (errorResponse) {
      setLoader(false);
    }
  };
  useEffect(() => {
    setLoader(true);
    fetchDailyPnlData(dateRange);
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
        borderColor: "borderColor.primary"
      }}
    >
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
          <TextView variant="Bold_28" text={"Daily P&L"} component={"span"} />
          <TextView variant="Medium_14" style={{ marginTop: 1.2 }} text={displayDateRange(dateRange)} component={"span"} color="text.regular" />
        </Box>
        <Box display={"flex"} gap={3.4}>
          <Box>
            <PortfolioFilter setDateRange={setDateRange} refreshState={refreshState} />
          </Box>
          <Box>
            <StyledToggleButtonGroup
              size="small"
              exclusive
              onChange={handleTabChange}
              value={selectedTab}
              sx={{
                width: 120,
                backgroundColor: "background.primary",
                padding: 0.5
              }}
            >
              <ToggleButton variant="chip" value="table" sx={{ width: "50%" }}>
                <img src={TableIcon} alt={"table"} />
              </ToggleButton>
              <ToggleButton variant="chip" value="chart" sx={{ width: "50%" }}>
                <img src={ChartIcon} alt={"chart"} />
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Box>
        </Box>
      </Box>
      <Box>
        {dailyPnlTableList.length === 0 && (
          <Box mb={2}>
            <NoDataBanner />
          </Box>
        )}
        {selectedTab === "chart" ? (
          <DailyPnLChart graphData={{ labels: labels, datasetOne: dailyGrossPnlGraphList, datasetTwo: dailyNetPnlGraphList }} />
        ) : (
          <DailyPnLTable tableData={dailyPnlTableList} loader={loader} />
        )}
      </Box>
    </Paper>
  );
};

export default DailyPnl;
