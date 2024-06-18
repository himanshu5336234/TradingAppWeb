import React from "react";

import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import { ALERT_MODAL_WRAPPER, COLUMN_CENTER, GAP } from "./alertModal.style";
import { SURE } from "./magicStrings";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

function AlertModal({ IsOpen, handelClose, primaryAction, title, primaryName = "Confirm" }) {
  return (
    <CustomModal primaryName={primaryName} isPrimaryAction={true} primaryAction={primaryAction} IsOpen={IsOpen} isClose={true} close={handelClose}>
      <Box sx={ALERT_MODAL_WRAPPER}>
        <Box sx={GAP}>
          <Box>
            <ErrorRoundedIcon sx={{ color: "#ECA233", fontSize: "62px" }} />
          </Box>
          <Box sx={COLUMN_CENTER}>
            {" "}
            <Typography variant="SemiBold_28" component={"h2"}>
              {SURE}
            </Typography>
            <Typography component={"h3"} variant="Medium_18" color="text.whitegrey">
              {title}
            </Typography>
            {/* <Typography
              variant="Regular_14"
              sx={LEARN_MORE_BUTTON_STYLE}
              // onClick={}
            >
              {LEARN_MORE}
            </Typography> */}
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
}

AlertModal.propTypes = {
  IsOpen: PropTypes.object,
  handelClose: PropTypes.func,
  primaryAction: PropTypes.func,
  title: PropTypes.string,
  primaryName: PropTypes.string
};

export default AlertModal;
