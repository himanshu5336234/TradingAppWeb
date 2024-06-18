import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useNavigate } from "react-router-dom";
import { USER_SETTING_TABS } from "@/pages/UserProfile/Constants";
import PropTypes from "prop-types";

const MNotVerifiedBanner = ({ pageTitle = "INR Wallet" }) => {
  const navigate = useNavigate();
  const handleGetVerifiedClick = () => {
    navigate("/user", {
      state: { currentTab: USER_SETTING_TABS.USER_VERIFICATION }
    });
  };
  return (
    <Box
      sx={{
        width: 327,
        height: 261,
        background: "linear-gradient(18deg, #2C2C34 25.10%, #ECA233 220.4%)",
        position: "absolute",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        border: "1.2px solid #595858",
        borderRadius: "2px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Grid container sx={{ px: 2, mb: 2, mx: 2, alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
            <ReportProblemIcon sx={{ fontSize: "45px", color: "#ECA233" }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative", alignItems: "center" }}>
              <Typography variant="SemiBold_16" textAlign={"center"}>{`Complete Bank Verification, to unlock ${pageTitle}!`}</Typography>
              <Typography variant="Regular_12" textAlign={"center"} component="p">
                {"You need to complete your KYC and Bank Verification to deposit or withdraw money"}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              px: "20px",
              py: "12px",
              backgroundColor: "#ECA233",
              height: 36,
              borderRadius: "2px",
              textAlign: "center",
              maxWidth: 280,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={handleGetVerifiedClick}
          >
            <Typography variant="SemiBold_16" color="black" component={"p"}>
              Get Verified Now
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MNotVerifiedBanner;
MNotVerifiedBanner.propTypes = {
  pageTitle: PropTypes.string
};
