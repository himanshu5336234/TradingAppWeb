import React, { useCallback, useEffect, useState } from "react";

import { Box, Grid, Typography } from "@mui/material";
// import CustomButton from "@/components/UI/CustomButton/CustomButton";

import MyEarningImage from "../../../assets/images/MyEarningImage.svg";
import Pattern from "../../../assets/images/SignalTradingLandingPage/Pattern.svg";
import Points from "./Points";
// import Stats from "./Stats";
import ActionStatus from "./ActionStatus";
import AnalystCard from "./AnalystCard";
import CustomSelect from "@/components/UI/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "../TablePagination";
// import { useNavigate } from "react-router-dom";

import {
  fetchUserPersonna,
  fetchListOfAvailableAnalysts,
  fetchFollowerDetails
  // fetchSignalTradingOverAllStats
} from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";
import { LANDING_PAGE_CONTAINER, POINTS_CONTAINER } from "./LandingPage.styles";
const pageSize = 9;
const Index: React.FC = () => {
  // const navigate = useNavigate();
  const userPersonna = useSelector((state: any) => state.SignalTrading.userPersonna);
  const analystsList = useSelector((state: any) => state.SignalTrading.analystsListedOnDensity);
  const analystId = useSelector((state: any) => state.SignalTrading.analystIdIfAFollower);
  // const overAllTradingStats = useSelector((state) => state.SignalTrading.overAllSignalTradingStats);
  const [period, setPeriod] = useState("ALL_TIME");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUserPersonna());
  }, []);

  const dispatchFetchAllAnalyst = useCallback(() => {
    dispatch(fetchListOfAvailableAnalysts({ statsTimeWindow: period, pageNumber: page, size: pageSize, status: "ACTIVE" }));
  }, [period, page]);

  useEffect(() => {
    dispatchFetchAllAnalyst();
  }, [dispatchFetchAllAnalyst]);

  useEffect(() => {
    if (userPersonna.userType === "FOLLOWER") {
      dispatch(fetchFollowerDetails({ status: "FOLLOW" }));
    }
  }, [userPersonna.userType]);

  const handlePeriodChange = (val: string) => {
    setPeriod(val);
    setPage(1);
  };

  return (
    <Box pb={4}>
      <Box sx={LANDING_PAGE_CONTAINER}>
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%"
          }}
        >
          <img
            src={Pattern}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%"
            }}
          />
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} px={3}>
          <Box maxWidth={"450px"}>
            <Typography variant="Bold_44">{"Signal Trading and its Benefits"}</Typography>
          </Box>

          <Typography
            variant={"Bold_14"}
            onClick={() => window.open("https://blogs.density.exchange/introducing-signal-trading-on-density-exchange/")}
            mt={2}
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
              textDecorationThickness: "3px",
              textUnderlineOffset: "4px",
              zIndex: 2
            }}
          >
            {"Frequently Asked Questions"}
          </Typography>
        </Box>

        <Box sx={POINTS_CONTAINER}>
          <Points />
          <img src={MyEarningImage} width={"226px"} alt="My Earning" />
        </Box>

        {/* <Stats /> */}
      </Box>
      <ActionStatus analystId={analystId} dispatchFetchAllAnalyst={dispatchFetchAllAnalyst} />
      <Box px={6}>
        <Grid container rowGap={6} gap={2} mt={3}>
          <Grid item xs={6}>
            <Typography variant="Bold_24">{"Top Analysts"}</Typography>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={1}>
            <CustomSelect
              value={period}
              setValue={handlePeriodChange}
              values={[
                { name: "All", value: "ALL_TIME" },
                { name: "1 Week", value: "1_WEEK" },
                { name: "2 Weeks", value: "HALF_MONTH" },
                { name: "1 Month", value: "1_MONTH" }
              ]}
              selectStyle={{ fontSize: "14px", height: "32px" }}
              menuStyle={{ fontSize: "14px" }}
            />
          </Grid>
          {analystsList?.data?.length > 0 &&
            analystsList.data.map((analyst: any) => (
              <AnalystCard key={analyst.AnalystId} analyst={analyst} userPersonna={userPersonna} followedAnalystId={analystId} dispatchFetchAllAnalyst={dispatchFetchAllAnalyst} />
            ))}
        </Grid>
        {analystsList?.data?.length > 0 && (
          <Grid container mt={4} justifyContent={"flex-end"}>
            <TablePagination page={page} totalPages={Math.ceil(analystsList?.totalRecords / pageSize)} setPage={setPage} />
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Index;
