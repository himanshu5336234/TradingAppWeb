import React from "react";
import { Box, Typography } from "@mui/material";
import { DEFAULT_TAB_STYLES, ERROR_TAB_STYLES, PENDING_TAB_STYLES, SUCCESS_TAB_STYLES } from "./signalTrading.styles";

interface StatusTabProps {
  type: string; // Adjust the possible values as needed
  text: string;
}

const StatusTab: React.FC<StatusTabProps> = ({ type, text }) => {
  const getStatusTab = () => {
    switch (type) {
      case "SUCCESS":
        return (
          <Box sx={SUCCESS_TAB_STYLES}>
            <Typography variant={"SemiBold_12"}>{text}</Typography>
          </Box>
        );
      case "PENDING":
        return (
          <Box sx={PENDING_TAB_STYLES}>
            <Typography variant={"SemiBold_12"} color={"#0E0E0F"}>
              {text}
            </Typography>
          </Box>
        );
      case "ERROR":
        return (
          <Box sx={ERROR_TAB_STYLES}>
            <Typography variant={"SemiBold_12"}>{text}</Typography>
          </Box>
        );
      default:
        return (
          <Box sx={DEFAULT_TAB_STYLES}>
            <Typography variant={"SemiBold_12"} color={"text.mild"}>
              {text}
            </Typography>
          </Box>
        );
    }
  };

  return getStatusTab();
};

export default StatusTab;
