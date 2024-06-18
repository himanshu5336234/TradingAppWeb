import React from "react";
import { Box, Typography } from "@mui/material";
import Crown from "../../../assets/images/SignalTradingLandingPage/Crown.svg";
import CurrencyNote from "../../../assets/images/SignalTradingLandingPage/CurrencyNote.svg";
import UpDownArrows from "../../../assets/images/SignalTradingLandingPage/UpDownArrows.svg";
import { STATS_TEXT_BOX_STYLES, STATS_MAIN_BOX_STYLES, STATS_CONTAINER } from "./LandingPage.styles";
const Stats = () => {
  return (
    <Box sx={STATS_CONTAINER}>
      <Box sx={STATS_MAIN_BOX_STYLES}>
        <img src={Crown} />
        <Box sx={STATS_TEXT_BOX_STYLES}>
          <Typography variant="Bold_32">{"300+"}</Typography>
          <Typography variant="Regular_16" color={"text.secondary"}>
            {"Followers"}
          </Typography>
        </Box>
      </Box>
      <Box sx={STATS_MAIN_BOX_STYLES}>
        <img src={CurrencyNote} />
        <Box sx={STATS_TEXT_BOX_STYLES}>
          <Typography variant="Bold_32">{"3 Mn+"}</Typography>
          <Typography variant="Regular_16" color={"text.secondary"}>
            {"Realised P&L"}
          </Typography>
        </Box>
      </Box>
      <Box sx={STATS_MAIN_BOX_STYLES}>
        <img src={UpDownArrows} />
        <Box sx={STATS_TEXT_BOX_STYLES}>
          <Typography variant="Bold_32">{"5 Mn+"}</Typography>
          <Typography variant="Regular_16" color={"text.secondary"}>
            {"Volume Traded"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Stats;
