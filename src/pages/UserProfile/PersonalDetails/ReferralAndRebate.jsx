import React from "react";
import arrow from "./ArrowIcon.svg";
// import { useSelector } from "react-redux";

import { Box, Grid, Typography } from "@mui/material";
const ReferralAndRebate = () => {
  // const isReferrerNotNull = useSelector((state) => state.profile.profileDetails.referrerUserID) === NULL;
  const ReferralNotDone = (
    <>
      <Grid item container px={5} pt={3} lg={12} md={12} justifyContent={"space-between"}>
        <Grid item pt={3} pb={1.8} lg={6} md={6}>
          <Typography variant="Medium_16" color={"#C0DF5A"}>
            Refer And Earn
          </Typography>
        </Grid>
        <Grid item pt={3} pb={1.8} lg={3} md={3}>
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            <Typography variant="Bold_14" color={"text.primary"}>
              Try Now
            </Typography>
          </span>
        </Grid>
        <Box display={"flex"} flexDirection={"row"}>
          <Typography variant="Regular_14" mt={1.5} mr={2}>
            Invite friends to sign up and start trading. Earn upto 0.03% of the trading volume generate by them.
          </Typography>
        </Box>
      </Grid>
    </>
  );
  const ReferralDone = (
    <>
      <Grid item container px={5} pt={3} lg={12} md={12} justifyContent={"space-between"}>
        <Grid item pt={3} pb={1.8} lg={6} md={6}>
          <Typography variant="Medium_16" color={"text.quaternary"}>
            Refer And Earn
          </Typography>
        </Grid>
        <Grid item pt={3} pb={1.8} lg={3} md={3}>
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            <Typography variant="Bold_14" color={"text.primary"}>
              See Details
            </Typography>
          </span>
        </Grid>
      </Grid>
      <Grid container item px={5} md={12} lg={12} display={"flex"} flexDirection={"row"} spacing={0.5}>
        <Grid item style={{ flex: "auto" }}>
          <Grid justifyContent={"space-around"} bgcolor={"background.default"} p={2}>
            <Typography color={"text.secondary"} component={"p"} variant={"Medium_11"}>
              Level
            </Typography>
            <Typography component={"p"} variant={"Medium_12"} color={"#EBFF25"} mt={1}>
              01
            </Typography>
          </Grid>
        </Grid>
        <Grid item style={{ flex: "auto" }}>
          <Grid bgcolor={"background.default"} p={2}>
            <Typography color={"text.secondary"} component={"p"} variant={"Medium_11"}>
              My Earnings (USDT)
            </Typography>
            <Typography component={"p"} variant={"Medium_12"} color={"text.primary"} mt={1}>
              2,682,739.00
            </Typography>
          </Grid>
        </Grid>

        <Grid item style={{ flex: "auto" }}>
          <Grid bgcolor={"background.default"} p={2}>
            <Typography color={"text.secondary"} component={"p"} variant={"Medium_11"}>
              Refree Volume
            </Typography>
            <Typography component={"p"} variant={"Medium_12"} color={"text.primary"} mt={1}>
              74429.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
  const RebateNotDone = (
    <>
      <Grid item container px={5} pt={6} lg={12} md={12}>
        <Typography variant="Medium_16" color={"#C0DF5A"}>
          Trading Fee Rebate
        </Typography>
        <Box display={"flex"} flexDirection={"row"}>
          <Typography variant="Regular_14" mt={1.5} mr={2}>
            You have signed up without any referral code. Hence, you are not eligible for this reward.
          </Typography>
        </Box>
      </Grid>
    </>
  );
  const RebateDone = (
    <>
      <Grid item container px={5} pt={3} pb lg={12} md={12} justifyContent={"space-between"}>
        <Grid item pt={3} pb={1.8} lg={6} md={6}>
          <Typography variant="Medium_16" color={"text.quaternary"}>
            Trading Fee Rebate
          </Typography>
        </Grid>
        <Grid item pt={3} pb={1.8} lg={3} md={3}>
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            <Typography variant="Bold_14" color={"text.primary"}>
              See Details
            </Typography>
          </span>
        </Grid>
      </Grid>
      <Grid container item px={5} md={12} lg={12} display={"flex"} flexDirection={"row"} spacing={0.5}>
        <Grid item style={{ flex: "auto" }}>
          <Grid justifyContent={"space-around"} bgcolor={"background.default"} p={2}>
            <Typography color={"text.secondary"} component={"p"} variant={"Medium_11"}>
              Rebate %
            </Typography>
            <Typography component={"p"} variant={"Medium_12"} color={"#EBFF25"} mt={1}>
              01
            </Typography>
          </Grid>
        </Grid>
        <Grid item style={{ flex: "auto" }}>
          <Grid bgcolor={"background.default"} p={2}>
            <Typography color={"text.secondary"} component={"p"} variant={"Medium_11"}>
              My Earnings (USDT)
            </Typography>
            <Typography component={"p"} variant={"Medium_12"} color={"text.primary"} mt={1}>
              2,682,739.00
            </Typography>
          </Grid>
        </Grid>

        <Grid item style={{ flex: "auto" }}>
          <Grid bgcolor={"background.default"} p={2}>
            <Typography color={"text.secondary"} component={"p"} variant={"Medium_11"}>
              Fee (USDT)
            </Typography>
            <Typography component={"p"} variant={"Medium_12"} color={"text.primary"} mt={1}>
              74429.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
  return (
    <Grid item md={4} py={5} lg={4} ml={6} sx={{ border: "1px solid", borderRadius: "8px", borderColor: "#44444D", backgroundColor: "background.primary" }}>
      <Grid container item lg={12} md={12} px={5} justifyContent={"space-between"}>
        <Typography variant="Bold_24">Referral & Rebate</Typography>
        <Box component={"img"} src={arrow} />
      </Grid>
      {ReferralDone}
      {/* {isReferrerNotNull ? { RebateDone } : { RebateNotDone }} */}
    </Grid>
  );
};
export default ReferralAndRebate;
