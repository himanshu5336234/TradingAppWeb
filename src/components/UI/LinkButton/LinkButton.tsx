import { Link, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
const MuiLinkButton = styled(Link)({
  display: "flex",
  height: "44px",
  component: "button",
  alignItems: "center",
  borderRadius: "8px",
  flexShrink: 0,
  textDecorationColor: "#ffff",
  cursor: "pointer",
  "&.disabled": {
    color: "grey",
    cursor: "default",
    textDecorationColor: "grey"
  }
});
const LinkButton = ({ color, label, onClick, isDisabled }: any) => {
  return (
    <MuiLinkButton className={isDisabled ? "disabled" : ""} color={color} onClick={onClick}>
      <Typography>{label}</Typography>
    </MuiLinkButton>
  );
};

export default LinkButton;
