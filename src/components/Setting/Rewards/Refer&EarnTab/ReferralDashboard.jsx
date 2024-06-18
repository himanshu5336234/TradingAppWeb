import React from "react";
import { Card, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import { DASHBOARD_CARD, TOGGLE_BUTTON_GROUP } from "@/pages/UserProfile/Rewards/styles";
import PropTypes from "prop-types";
import ReferralEarnings from "./ReferralEarnings";

const ReferralDashboard = ({ duration, changeDuration, referralEarnings }) => {
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
        {duration === "day" && <ReferralEarnings totalEarnings={referralEarnings.totalReward} totalVolume={referralEarnings.totalVolume} Level={referralEarnings.level} />}
        {duration === "week" && <ReferralEarnings totalEarnings={referralEarnings.totalReward} totalVolume={referralEarnings.totalVolume} Level={referralEarnings.level} />}
        {duration === "month" && <ReferralEarnings totalEarnings={referralEarnings.totalReward} totalVolume={referralEarnings.totalVolume} Level={referralEarnings.level} />}
      </Card>
    </>
  );
};

export default ReferralDashboard;
ReferralDashboard.propTypes = {
  duration: PropTypes.string,
  changeDuration: PropTypes.func,
  referralEarnings: PropTypes.object
};
