import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Tabs, Tab } from "@mui/material";
import { SIGNAL_HEADER } from "../signalTrading.styles";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import AnalystCell from "../AnalystCell";
import HeaderSectionCell from "../HeaderSectionCell";
import EditSquare from "../../../assets/images/EditSquareWhite.svg";
import MyEarningBox from "./MyEarningBox";
import EarnignMatrixBox from "./EarnignMatrixBox";
// import LineChartComponent from "../LineChartComponent";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
import CompletedTradingTable from "./CompletedTradeTable";
import LiveSignalsTable from "./LiveSignalsTable";
import RejectedSignalsTable from "./RejectedSignalsTable";
import UnfollowSuccessModal from "../Modals/UnfollowStepsModal";

import { fetchUserPersonna, fetchFollowerDetails, fetchFollowedAnalyst, fetchFollowerStats } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RiskParameterModal from "../Modals/RiskParameterModal";
import { MARGIN_INFO_BOX, MARGIN_INFO_CONTAINER, TAB_STYLES } from "./Follower.Styles";
import { formatTimefromTimestamp } from "@/helpers";

import { useNavigate } from "react-router-dom";
import SignalTradingBackButton from "../SignalTradingBackButton";

// const followers_data = [87, 12, 64, 38, 5, 45, 53, 92, 75, 19, 60, 10, 42, 84, 79, 48, 7, 93, 98, 88, 74, 82, 96, 20, 47, 68, 35, 69, 30, 22, 28, 55, 62, 37, 21, 27, 71, 95, 41, 65, 77, 59, 70, 24, 49, 94, 29, 31, 2, 14, 3, 17, 6, 50, 11, 1, 58, 40, 23, 67, 15, 8, 80, 33, 36, 86, 66, 91, 81, 4, 16, 83, 25, 32, 18, 76, 78, 26, 73, 54, 56, 9, 89, 34, 63, 72, 99, 90, 57, 43, 51, 85, 46, 44, 61, 52];
// const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

const FollowerDashboard = () => {
  const [tableState, setTableState] = useState("LIVE");
  const [period, setPeriod] = useState("ALL_TIME");
  const [showUnfollowSuccessModal, setShowUnfollowSuccessModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState({ status: false, type: "" });
  const handlePeriodChange = (_: any, val: string) => {
    setPeriod(val);
  };
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userPersonna = useSelector((state: any) => state.SignalTrading.userPersonna.userType);
  const followerDetails = useSelector((state: any) => state.SignalTrading.followerDetails);
  const analystId = useSelector((state: any) => state.SignalTrading.analystIdIfAFollower);
  const analystDetails = useSelector((state: any) => state.SignalTrading.analystDetailsFollowedByTheFollower);
  const followerStats = useSelector((state: any) => state.SignalTrading.followerStats);

  const liveSignalListForFollowers = useSelector((state: any) => state.SignalTrading.liveSignalForFollowers);

  // const tableRowSize = 5;
  // const [totalNumberOfRecords, setTotalNumberOfRecords] = useState("");
  // const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(fetchUserPersonna());
    dispatch(fetchFollowerDetails({ status: "FOLLOW" }));
  }, []);

  useEffect(() => {
    if (analystId) {
      dispatch(fetchFollowerStats(analystId, null, null, period));
    }
  }, [analystId, period]);

  useEffect(() => {
    if (analystId) {
      dispatch(fetchFollowedAnalyst({ analystId }));
    }
  }, [analystId]);

  useEffect(() => {
    if (userPersonna && userPersonna !== "FOLLOWER") navigate("/signal-trading");
  }, [userPersonna]);

  return (
    <Box p={4}>
      <SignalTradingBackButton />
      <Typography variant="Bold_32">User Dashboard</Typography>
      <Box sx={SIGNAL_HEADER} mt={5}>
        <Typography variant="Bold_24">{"Signal Dashboard"}</Typography>
        <CustomButton style={{ maxWidth: "240px" }} variant={"secondary"} label={"Unfollow"} onClick={() => setShowUnfollowSuccessModal(true)} />
      </Box>
      <Grid container mt={4}>
        <Grid
          container
          p={2}
          item
          xs={6}
          gap={2}
          alignItems={"center"}
          sx={{
            backgroundColor: "#29292E",
            borderTopLeftRadius: "8px"
          }}
          // justifyContent={"space-between"}
        >
          <AnalystCell avatarURL={analystDetails.avatar} heading={"Analyst Name"} value={analystDetails.nickName} gridSize={4} />
          <HeaderSectionCell heading={"Followers"} value={analystDetails.followersCount} gridSize={3} valueColor={"text.primary"} />
          <HeaderSectionCell heading={"Following Since"} value={formatTimefromTimestamp(analystDetails.approvedAt)} gridSize={3} valueColor={"text.primary"} />
        </Grid>

        <Grid item xs={6}>
          <Box
            display={"flex"}
            alignItems={"center"}
            // border={"1px solid"}
            height={"100%"}
            justifyContent={"space-around"}
            sx={MARGIN_INFO_CONTAINER}
          >
            <Box sx={MARGIN_INFO_BOX}>
              <Typography color={"text.secondary"} variant={"Regular_12"}>
                {"Margin Locked Per Signal"}
              </Typography>
              <Box>
                <Typography variant={"Reular_16"} mr={1}>
                  {followerDetails?.length && followerDetails[0].marginPerSignal}
                </Typography>
                <img src={EditSquare} alt="Edit Icon" onClick={() => setShowRiskModal({ status: true, type: "MARGIN_PER_SIGNAL" })} style={{ cursor: "pointer" }} />
              </Box>
            </Box>
            <Box sx={{ ...MARGIN_INFO_BOX, borderTopRightRadius: "8px" }}>
              <Typography color={"text.secondary"} variant={"Regular_12"}>
                {"Max Margin Locked Across All Signal"}
              </Typography>
              <Box>
                <Typography variant={"Reular_16"} mr={1}>
                  {followerDetails?.length && followerDetails[0].marginLocked}
                </Typography>
                <img src={EditSquare} alt="Edit Icon" onClick={() => setShowRiskModal({ status: true, type: "MARGIN_ALL_SIGNAL" })} style={{ cursor: "pointer" }} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          border={"1px solid #29292E"}
          sx={{
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px"
          }}
          // borderRight={"none"}
        >
          <Tabs
            //  centered
            textColor="#8B8B97"
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
            <Tab sx={TAB_STYLES} label="Live" value={"LIVE"} />
            <Tab sx={TAB_STYLES} label="Completed" value={"COMPLETED"} />
            <Tab sx={TAB_STYLES} label="Rejected" value={"REJECTED"} />
          </Tabs>
        </Grid>
        {/* <Grid
        item
        container
        xs={3}
        border={"1px solid #29292E"}
        borderLeft={"none"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        pr={3}
       >
        <Typography
          color={"text.secondary"}
          variant="Regular_12"
        >
           {"MEDIAN ROI"}
           <Typography
            color={"text.success"}
            variant="Bold_16_22"
            component={"span"}
            ml={2}
           >
            {"30%"}
           </Typography>
        </Typography>

       </Grid> */}
      </Grid>
      {tableState === "COMPLETED" && <CompletedTradingTable />}
      {tableState === "LIVE" && <LiveSignalsTable />}
      {tableState === "REJECTED" && <RejectedSignalsTable />}
      <MyEarningBox ROI={followerStats?.roi?.toFixed(3)} />
      <Grid container>
        <EarnignMatrixBox gridSize={6} heading="Total Number of Signals:" value={followerStats.totalSignal} />
        <EarnignMatrixBox gridSize={6} heading="Win %:" value={followerStats?.winPercent?.toFixed(3)} />
      </Grid>
      {/* <Box
        pt={2}
        sx={{ width: "100%", height: "260px" }}>
        <LineChartComponent
          xAxes={dates}
          yAxes={followers_data}
        />
     </Box> */}
      <Grid container rowSpacing={3} my={1}>
        <Grid item xs={6}>
          <ToggleGroup
            value={period}
            handleChange={handlePeriodChange}
            values={[
              { name: "All", value: "ALL_TIME", id: "filterBarToggles" },
              { name: "1 Week", value: "1_WEEK", id: "filterBarToggles" },
              { name: "2 Weeks", value: "HALF_MONTH", id: "filterBarToggles" },
              { name: "1 Month", value: "1_MONTH", id: "filterBarToggles" }
            ]}
          />
        </Grid>

        <Grid container item xs={6} gap={1} justifyContent={"flex-end"}></Grid>
      </Grid>
      {showUnfollowSuccessModal && (
        <UnfollowSuccessModal
          analystId={analystId}
          name={analystDetails.nickName}
          numberOfLiveSignals={liveSignalListForFollowers?.data?.length}
          IsOpen={showUnfollowSuccessModal}
          setShowUnfollowSuccessModal={setShowUnfollowSuccessModal}
        />
      )}
      {showRiskModal?.status && (
        <RiskParameterModal
          IsOpen={showRiskModal?.status}
          analystId={analystId}
          setShowRiskModal={setShowRiskModal}
          type={showRiskModal?.type}
          initialMarginPerSignal={followerDetails?.length && followerDetails[0].marginPerSignal}
          initialMarginAcrossAllSignals={followerDetails?.length && followerDetails[0].marginLocked}
        />
      )}
    </Box>
  );
};

export default FollowerDashboard;
