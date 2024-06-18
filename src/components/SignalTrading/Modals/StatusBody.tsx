import React from "react";
import { Box } from "@mui/material";
import WarningIcon from "../../../assets/images/WarningIcon.svg";
import SuccessICon from "../../../assets/images/SnackbarImages/Success.svg";
import ErrorIcom from "../../../assets/images/SnackbarImages/Error.svg";
import { STATUS_BODY_CONTAINER } from "./Modals.styles";
import TextView from "@/components/UI/TextView/TextView";

interface StatusBodyProps {
  message: string;
  heading: string;
  status: string;
}

const StatusBody: React.FC<StatusBodyProps> = ({ message, heading, status }) => {
  return (
    <Box sx={STATUS_BODY_CONTAINER}>
      <img src={status === "WARNING" ? WarningIcon : status === "SUCCESS" ? SuccessICon : ErrorIcom} width={"64px"} />
      <TextView variant="Medium_20" text={heading} />
      <TextView variant="Regular_14" color={"text.quaternary"} text={message} />
    </Box>
  );
};

export default StatusBody;
