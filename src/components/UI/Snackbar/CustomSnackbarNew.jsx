import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessImage from "../../../assets/images/SnackbarImages/Success.svg";
import ErrorImage from "../../../assets/images/SnackbarImages/Error.svg";
import WarningImage from "../../../assets/images/SnackbarImages/Warning.svg";
import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "./CustomSnackbar.css";
const Msg = ({ type, title, close, heading }) => {
  const getImage = () => {
    switch (type) {
      case "SUCCESS":
        return <img src={SuccessImage} height={"50px"} />;
      case "ERROR":
        return <img src={ErrorImage} height={"50px"} />;
      default:
        return <img src={WarningImage} height={"50px"} />;
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "100%"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%"
        }}
      >
        {getImage()}
        <Box>
          <Typography component={"p"} variant="Medium_20" color={"text.primary"}>
            {heading}
          </Typography>
          <Typography component={"p"} mt={1} variant="Medium_12" color={"text.primary"}>
            {title}
          </Typography>
        </Box>
      </Box>
      <CloseIcon sx={{ width: "17px", color: "white", cursor: "pointer" }} onClick={close} />
    </Box>
  );
};
const CustomSnackbarNew = ({
  snackbarTitle,
  snackbarActionName,
  snackbarActionHandler,
  snackbarContext,
  snackbarType,
  isSnackbarOpen,
  handleIsSnackbarOpen,
  snackbarActionDefault,
  snackbarSubTitle,
  alertTimer
}) => {
  useEffect(() => {
    if (snackbarTitle) {
      switch (snackbarType) {
        case "success":
          toast(<Msg type={"SUCCESS"} title={snackbarTitle} heading={"Updated Successfully"} />, {
            className: "toast-success",
            onClose: snackbarActionDefault
          });
          break;
        case "warning":
          toast(<Msg type={"WARNING"} title={snackbarTitle} heading={"Update Pending"} />, {
            className: "toast-warning",
            onClose: snackbarActionDefault
          });
          break;
        default:
          toast(<Msg type={"ERROR"} title={snackbarTitle} heading={"Update Failed!"} />, {
            className: "toast-error",
            onClose: snackbarActionDefault
          });
      }
    }
  }, [snackbarTitle]);
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick={true}
      closeButton={false}
      rtl={false}
      pauseOnFocusLoss={true}
      // draggable
      pauseOnHover={true}
      // theme="light"
    />
  );
};

CustomSnackbarNew.propTypes = {
  snackbarTitle: PropTypes.string.isRequired,
  snackbarActionName: PropTypes.string,
  snackbarActionHandler: PropTypes.func,
  snackbarContext: PropTypes.object,
  snackbarType: PropTypes.oneOf(["success", "information", "warning", "failure"]).isRequired,
  isSnackbarOpen: PropTypes.bool.isRequired,
  handleIsSnackbarOpen: PropTypes.func.isRequired,
  snackbarActionDefault: PropTypes.func.isRequired,
  snackbarSubTitle: PropTypes.string,
  alertTimer: PropTypes.number
};
CustomSnackbarNew.defaultProps = {
  snackbarTitle: "Error! Please Try again",
  snackbarActionName: "",
  snackbarContext: {},
  snackbarType: "failure",
  snackbarActionHandler: () => null,
  isSnackbarOpen: false,
  alertTimer: 2000
};

Msg.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  close: PropTypes.func,
  heading: PropTypes.string
};
export default CustomSnackbarNew;
