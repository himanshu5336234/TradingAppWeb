import React from "react";
import { Box, Typography } from "@mui/material";
// import LeverageIcon from "../../../assets/images/SignalTradingLandingPage/LeverageIcon.svg";
const Points = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Typography variant="Regular_16">{"🚀 Leverage expertise of a curated list of pro traders."}</Typography>
      <Typography variant="Regular_16">{"🤝 Choose your trader. Copy their trades automatically at a risk level you are comfortable with."}</Typography>
      <Typography variant="Regular_16">{"📈 Automatically enter and exit positions at same time as the trader you follow."}</Typography>
      <Typography variant="Regular_16">{"😎 Sit back, relax, enjoy, no need for continuous monitoring."}</Typography>
      <Typography variant="Regular_16">{"💰 All profits generated are exclusively yours."}</Typography>
    </Box>
  );
};

export default Points;
