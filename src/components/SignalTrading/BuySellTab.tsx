import React from "react";
import { Box } from "@mui/material";
import { BUY_TAB_STYLES, SELL_TAB_STYLES } from "./signalTrading.styles";
import TextView from "../UI/TextView/TextView";

interface BuySellTabProps {
  side: string;
}

const BuySellTab: React.FC<BuySellTabProps> = ({ side }) => {
  return side === "BUY" || side === "LONG" ? (
    <Box sx={BUY_TAB_STYLES}>
      <TextView text={"        BUY"} color={"#29B57E"} variant={"Medium_12"} />
    </Box>
  ) : (
    <Box sx={SELL_TAB_STYLES}>
      <TextView color={"#FF6554"} text={"        SELL"} variant={"Medium_12"} />
    </Box>
  );
};

export default BuySellTab;
