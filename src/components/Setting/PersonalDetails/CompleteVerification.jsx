import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function CompleteVerification() {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = "/user";
    navigate(path, { state: { currentTab: "user-verification" } });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "background.secondary",
        pt: "22px",
        px: "10px",
        pb: "15px",
        mb: "10px"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant={"SemiBold_18"}>Verification</Typography>
        <Typography variant={"Regular_12"}>Complete Your Verification now</Typography>
      </Box>

      <Button variant="primary" onClick={routeChange} sx={{ display: { xs: "none", lg: "block" } }}>
        <Typography variant="SemiBold_14">Verify</Typography>
      </Button>
      <Button variant="primary" onClick={() => navigate("/user")} sx={{ display: { xs: "block", lg: "none" } }}>
        <Typography variant="SemiBold_14">Verify</Typography>
      </Button>
    </Box>
  );
}

export default CompleteVerification;
