import { Typography, Box, Grid, Tabs, Tab } from "@mui/material";
// import { Button } from "../UI/Atoms/Button/Button";
import CustomButton from "../UI/CustomButton/CustomButton";
import React, { useState, useEffect } from "react";
import { SIGNAL_HEADER } from "./signalTrading.styles";
import HeaderSectionCell from "./HeaderSectionCell";

import ShareIcon from "../../assets/images/ShareIcon.svg";

import AnalystCell from "./AnalystCell";

import LiveTradingTable from "./LiveTradingTableAnalyst";
import CompletedSignals from "./CompletedTradeTableAnalyst";

import useHandleBinanceSocketSubs from "@/frontend-BL/businessHooks/BINANCE_WORKER/useHandleBinanceSocketSubs";
import ToggleGroup from "../UI/ToggleGroup/ToggleGroup";

import { fetchUserPersonna, fetchAnalystDetailsForSelf } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";

import { formatTimefromTimestamp } from "@/helpers";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import ShareAnalystProfileModal from "./Modals/ShareAnalystProfileModal";

import { getTradableCoins } from "@/frontend-BL/redux/actions/Futures/GetTradableCoins.ac";
import SignalTradingBackButton from "./SignalTradingBackButton";

// const followers_data = [87, 12, 64, 38, 5, 45, 53, 92, 75, 19, 60, 10, 42, 84, 79, 48, 7, 93, 98, 88, 74, 82, 96, 20, 47, 68, 35, 69, 30, 22, 28, 55, 62, 37, 21, 27, 71, 95, 41, 65, 77, 59, 70, 24, 49, 94, 29, 31, 2, 14, 3, 17, 6, 50, 11, 1, 58, 40, 23, 67, 15, 8, 80, 33, 36, 86, 66, 91, 81, 4, 16, 83, 25, 32, 18, 76, 78, 26, 73, 54, 56, 9, 89, 34, 63, 72, 99, 90, 57, 43, 51, 85, 46, 44, 61, 52]
// const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]

const AnalystDashboard = () => {
  const [tableState, setTableState] = useState("liveSignals");
  const [period, setPeriod] = useState("ALL_TIME");
  const [showShareModal, setShowShareModal] = useState(false);
  // const [alignment, setAlignment] = useState("followers");

  useHandleBinanceSocketSubs({ tradeScreen: true });

  const userPersonnaDetails = useSelector((state: any) => state.SignalTrading.userPersonna);
  const analystDetailsForSelf = useSelector((state: any) => state.SignalTrading.analystDetailsForSelf);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const handleShareClick = () => {
    setShowShareModal(true);
  };

  useEffect(() => {
    dispatch(fetchUserPersonna());
    dispatch(getTradableCoins());
  }, []);

  useEffect(() => {
    if (userPersonnaDetails?.analystId) {
      dispatch(fetchAnalystDetailsForSelf({ analystId: userPersonnaDetails?.analystId, statsTimeWindow: period }));
    }
  }, [userPersonnaDetails?.analystId, period]);

  useEffect(() => {
    if (userPersonnaDetails.userType && userPersonnaDetails.userType !== "ANALYST") navigate("/signal-trading");
  }, [userPersonnaDetails.userType]);

  return (
    <Box p={4} width={"100%"}>
      <SignalTradingBackButton />
      <Box sx={SIGNAL_HEADER}>
        <Typography variant="Bold_32">{"Signal Dashboard"}</Typography>
        <CustomButton onClick={() => navigate("/", { state: { isSignalTrading: true } })} style={{ maxWidth: "240px" }} variant={"primary"} label={"Generate Signal"} />
      </Box>

      <Box
        mt={3}
        mb={2}
        sx={{
          borderRadius: "8px",
          overflow: "hidden"
        }}
      >
        <Grid
          p={3}
          container
          rowSpacing={2}
          alignItems={"center"}
          sx={{
            backgroundColor: "#29292E"
          }}
          justifyContent={"space-between"}
        >
          <AnalystCell avatarURL={analystDetailsForSelf?.avatar} heading={"Analyst Name"} value={analystDetailsForSelf?.nickName} gridSize={3} />
          <HeaderSectionCell heading={"Followers"} value={analystDetailsForSelf?.followersCount} gridSize={1.5} valueColor={"text.primary"} showToolTip={false} toolTipTitle="" />
          <HeaderSectionCell
            heading={"ROI"}
            value={`${analystDetailsForSelf?.roi?.toFixed(2)} %`}
            gridSize={1.3}
            valueColor={analystDetailsForSelf?.roi > 0 ? "text.success" : analystDetailsForSelf?.roi < 0 ? "text.error" : "text.primary"}
            showToolTip={false}
            toolTipTitle=""
          />
          <HeaderSectionCell
            heading={"Total Signals"}
            value={analystDetailsForSelf?.signalsGenerated}
            gridSize={1.7}
            valueColor={"text.primary"}
            showToolTip={true}
            toolTipTitle={"Published + Triggered + Completed signals. New and Deleted signals not included"}
          />
          <HeaderSectionCell heading={"Win %"} value={`${analystDetailsForSelf?.winRate?.toFixed(2)} %`} gridSize={1.2} valueColor={"text.primary"} showToolTip={false} toolTipTitle="" />
          <HeaderSectionCell
            heading={"Analyst Since"}
            value={formatTimefromTimestamp(analystDetailsForSelf?.approvedAt)}
            gridSize={1.8}
            valueColor={"text.primary"}
            showToolTip={false}
            toolTipTitle=""
          />
          <Grid item container xs={1} alignContent={"center"} justifyContent={"center"}>
            {/* <ShareIcon fontSize="18px" /> */}
            <img src={ShareIcon} width={"24px"} onClick={handleShareClick} />
          </Grid>
        </Grid>
        {/* <Box
            pt={2}
            sx={{width: "100%", height: "260px" }}
         >
            <LineChartComponent 
               xAxes={dates}
               yAxes={followers_data}
            />
         </Box> */}
      </Box>
      <Grid container rowSpacing={6}>
        <Grid container item xs={6} gap={1}>
          <ToggleGroup
            value={period}
            handleChange={(_: any, val: string) => {
              setPeriod(val);
            }}
            values={[
              { name: "All", value: "ALL_TIME", id: "filterBarToggles" },
              { name: "1 Week", value: "1_WEEK", id: "filterBarToggles" },
              { name: "2 Weeks", value: "HALF_MONTH", id: "filterBarToggles" },
              { name: "1 Month", value: "1_MONTH", id: "filterBarToggles" }
            ]}
          />
        </Grid>

        {/* <Grid container item xs={6} gap={1} justifyContent={"center"}>
            <ToggleGroup  
               value={alignment}
               handleChange={(_: any, val: string) => {
                  setAlignment(val);
                  }}
               values={[
                  { name: "Followers", value: "followers", id: "filterBarToggles" },
                  { name: "Win %", value: "win%", id: "filterBarToggles" },
                  { name: "ROI", value: "roi", id: "filterBarToggles" },
                  { name: "Signals", value: "signals", id: "filterBarToggles" }

               ]}
               />
            </Grid> */}
      </Grid>

      <Box mt={6}>
        <Tabs
          //  centered
          textColor="white"
          TabIndicatorProps={{ style: { backgroundColor: "white" } }}
          selectionFollowsFocus
          value={tableState}
          aria-label="Tabs where each tab needs to be selected manually"
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between"
          }}
          onChange={(_, val) => setTableState(val)}
        >
          <Tab sx={{ fontSize: "16px", fontWeight: "500", textTransform: "none" }} label="Live Signals" value={"liveSignals"} />
          <Tab sx={{ fontSize: "16px", fontWeight: "500", textTransform: "none" }} label="Completed Signals" value={"completedSignals"} />
        </Tabs>
      </Box>
      {tableState === "liveSignals" && <LiveTradingTable />}
      {tableState === "completedSignals" && <CompletedSignals />}
      {showShareModal && <ShareAnalystProfileModal IsOpen={showShareModal} data={analystDetailsForSelf} setShowShareModal={setShowShareModal} />}
    </Box>
  );
};

export default AnalystDashboard;
