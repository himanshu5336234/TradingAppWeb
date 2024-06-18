import React from "react";
import arrow from "./ArrowIcon.svg";
import giftImage from "./GiftImage.svg";

import { Box, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import TextView from "@/components/UI/TextView/TextView";

const ReferralAndRebateCard = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      item
      p={3}
      gap={2}
      xs={12}
      sx={{
        border: "1px solid",
        borderRadius: "8px",
        borderColor: "#44444D",
        backgroundColor: "background.primary",
        height: "100%"
      }}
    >
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextView text={"Referral & Rebate"} variant="Bold_24" />
          <Box onClick={() => navigate("/referral_rebate")} style={{ cursor: "pointer" }} component={"img"} src={arrow} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box component={"img"} height={"100px"} src={giftImage} />
      </Grid>

      <Grid item>
        <TextView text={"          Refer And Earn"} variant="Medium_16" color={"#C0DF5A"} />

        <TextView text={"Invite friends to sign up and start trading. Earn upto 0.03% of the trading volume generate by them."} variant="Regular_14" />
      </Grid>
      <Grid item>
        <TextView text={"     Trading Fee Rebate"} variant="Medium_16" color={"#C0DF5A"} />

        <TextView text={"   Sign up using referral code and get a flat rebate of upto 20% on your trading fee."} variant="Regular_14" />
      </Grid>
    </Grid>
  );
};
export default ReferralAndRebateCard;
