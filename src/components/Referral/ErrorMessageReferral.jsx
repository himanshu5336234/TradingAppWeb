import React from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const ErrorMessageReferral = ({ type, message }) => {
  const getError = () => {
    switch (type) {
      case "success":
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center"
            }}
            gap={0.5}
          >
            <CheckCircleIcon style={{ color: "#29B57E", fontSize: "12px" }} />
            <Typography variant="Bold_10" color={"#29B57E"} component={"span"}>
              {message}
            </Typography>
          </Box>
        );
      case "error":
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center"
            }}
            gap={0.5}
          >
            <ErrorIcon style={{ color: "#F46151", fontSize: "12px" }} />
            <Typography variant="Bold_10" color={"#F46151"} component={"span"}>
              {message}
            </Typography>
          </Box>
        );
      default:
        return <></>;
    }
  };
  return <>{getError()}</>;
};

ErrorMessageReferral.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};
export default ErrorMessageReferral;
