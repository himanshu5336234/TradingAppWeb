import React, { memo, useEffect, useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BORDERBOTTOM, SECTIONHEIGHT } from "@/pages/MobileView/style";
import { POSITION, TOTAL } from "@/pages/MobileView/mMagicString";
import PropTypes from "prop-types";
import { fetchAccountPositionInfo } from "@/frontend-BL/redux/actions/User/AccountInfo.ac";
import { fetchAllOpenOrdersApi } from "@/frontend-api-service/Api";
import PnlFrame from "@/assets/images/PositionsCard/PnlFrame.svg";
import PositionItem from "./PositionItem";
import { OPEN_ORDERS_FETCH_SUCCESS } from "@/frontend-BL/redux/constants/Constants";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import { CloseAllPosition } from "@/components/Home/UserActivities/TotalProfitAndLossBox/CloseAllPosition";
import { TotalProfitAndLoss } from "@/components/Home/UserActivities/TotalProfitAndLossBox/TotalProfitAndLoss";

const header = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  flexDirection: "row"
};
const MPositions = ({ allPositionsData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountPositionInfo());
    fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&status=SCHEDULED&status=PARTIALLY_FILLED" }).then((openOrders) => {
      dispatch({
        type: OPEN_ORDERS_FETCH_SUCCESS,
        payload: openOrders.data.data
      });
    });
  }, []);

  // oco states

  const isSnapshotUpdated = useSelector((state) => state.positionsDirectory.isSnapshotUpdated);

  const positionsDirectory = useMemo(() => {
    if (isSnapshotUpdated && allPositionsData?.length > 0) {
      return allPositionsData.map((item, index) => (
        <Box sx={{ width: "100%" }} key={index}>
          <PositionItem index={index} data={item} />
        </Box>
      ));
    } else if (isSnapshotUpdated && allPositionsData?.length === 0) {
      return (
        <Box my={10}>
          <TableNoRowsOverlay message={"No data Found"} />
        </Box>
      );
    } else if (!isSnapshotUpdated) {
      return (
        <Box my={10}>
          <TableNoRowsOverlay message={"Please wait while we get your positions!"} />
        </Box>
      );
    }
  }, [allPositionsData]);
  return (
    <>
      {" "}
      <Grid container gap="20px">
        <Grid item xs={12}>
          <Box sx={header}>
            <Box sx={BORDERBOTTOM}>
              <Typography variant="SemiBold_20">{POSITION}</Typography>
            </Box>
            <Box sx={{ width: "100px" }}>
              <CloseAllPosition />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={[
              {
                p: 2,
                backgroundImage: `url(${PnlFrame})`,
                backgroundSize: "cover",
                textAlign: "center"
              }
            ]}
          >
            <Box
              sx={{
                gap: 1,
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center"
              }}
            >
              <TotalProfitAndLoss variant="SemiBold_22" />
              {/* <CloseAllPosition textStyle="Medium_22" isDisable={allPositionsData.length === 0} type={"TotalUnRealisedProfitAndLoss"} />{" "} */}
              <Typography component="span" color={"text.regular"} variant={"Medium_10"}>
                {" USDT"}
              </Typography>
            </Box>

            <Typography variant="Regular_12" component={"p"} color="text.mild">
              {TOTAL}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={SECTIONHEIGHT}>
            <Grid container justifyContent={"center"} gap="10px">
              {positionsDirectory}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
MPositions.propTypes = {
  index: PropTypes.number,
  allPositionsData: PropTypes.any
};
export default memo(MPositions);
