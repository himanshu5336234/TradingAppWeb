import { Button, Typography } from "@mui/material";
import { BUTTON_NAME_ADDPASSWORD, BUTTON_NAME_CHANGE } from "@/pages/UserProfile/Security/magicStrings";
import { SECURITY_BUTTON } from "@/pages/UserProfile/Security/styles";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import PropTypes from "prop-types";

const EDIT_ICON_STYLE = { fontSize: "14px !important", marginBottom: "2px" };

const SecurityActionButtons = ({ buttonName, actionButtonHandler }) => {
  return (
    <Button
      sx={SECURITY_BUTTON}
      variant="outlined"
      onClick={actionButtonHandler}
      startIcon={(buttonName === BUTTON_NAME_CHANGE || buttonName === BUTTON_NAME_ADDPASSWORD) && <EditIcon sx={EDIT_ICON_STYLE}></EditIcon>}
    >
      <Typography variant="Regular_12">{buttonName}</Typography>
    </Button>
  );
};

export default SecurityActionButtons;

SecurityActionButtons.propTypes = {
  buttonName: PropTypes.string,
  actionButtonHandler: PropTypes.func
};
