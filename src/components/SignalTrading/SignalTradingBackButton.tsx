import React from "react";
import { Box, Typography } from "@mui/material";
import { FLEX_BOX_ROW_ALIGN_CENTER } from "./Modals/Modals.styles";
import { useNavigate } from "react-router-dom";
const SignalTradingBackButton = () => {
  const navigate = useNavigate();

  return (
    <Box gap={2} sx={{ ...FLEX_BOX_ROW_ALIGN_CENTER, cursor: "pointer" }} onClick={() => navigate("/signal-trading")}>
      <Typography style={{ fontSize: "30px", cursor: "pointer", color: "#666673" }} mb={0.3}>
        &#8592;
      </Typography>
      <Typography color={"text.secondary"} variant="Medium_14">
        {"Signal Trading/ Signal Dashboard"}
      </Typography>
    </Box>
  );
};

export default SignalTradingBackButton;
