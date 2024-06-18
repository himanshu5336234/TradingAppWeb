import React from "react";
import { Card, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { DASHBOARD_CARD, TOGGLE_BUTTON_GROUP } from "@/pages/UserProfile/Rewards/styles";
import PropTypes from "prop-types";
import RebateEarnings from "./RebateEarnings";

// dailyReferralEarnings, monthlyReferralEarnings, weeklyReferralEarnings - as state values
const RebateDashboard = ({ duration, changeDuration, rebateEarnings }) => {
  return (
    <>
      <Typography variant={"SemiBold_28"} component={"h2"} paddingY={2}>
        {"My Dashboard"}
      </Typography>
      <Card sx={DASHBOARD_CARD}>
        <ToggleButtonGroup sx={TOGGLE_BUTTON_GROUP} size="small" value={duration} exclusive onChange={changeDuration}>
          <ToggleButton variant="main" value="day" sx={{ textTransform: "none", padding: 1 }}>
            {"1 Day"}
          </ToggleButton>
          <ToggleButton variant="main" value="week" sx={{ textTransform: "none" }}>
            {"1 Week"}
          </ToggleButton>
          <ToggleButton variant="main" value="month" sx={{ textTransform: "none" }}>
            {"1 Month"}
          </ToggleButton>
        </ToggleButtonGroup>
        {/* Conditional Render */}
        {duration === "day" && <RebateEarnings totalEarnings={rebateEarnings.totalRebateReward} fees={rebateEarnings.totalRebateFees} rebatePercentage={rebateEarnings.totalRebateRate} />}
        {duration === "week" && <RebateEarnings totalEarnings={rebateEarnings.totalRebateReward} fees={rebateEarnings.totalRebateFees} rebatePercentage={rebateEarnings.totalRebateRate} />}
        {duration === "month" && <RebateEarnings totalEarnings={rebateEarnings.totalRebateReward} fees={rebateEarnings.totalRebateFees} rebatePercentage={rebateEarnings.totalRebateRate} />}
      </Card>
    </>
  );
};

export default RebateDashboard;
RebateDashboard.propTypes = {
  duration: PropTypes.string,
  changeDuration: PropTypes.func,
  rebateEarnings: PropTypes.object
};
