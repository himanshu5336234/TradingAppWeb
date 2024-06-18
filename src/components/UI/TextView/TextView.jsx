import { Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
const TextView = ({ id, text, component, variant, color, onClick, style, children, textAlign }) => {
  return (
    <Typography textAlign={textAlign} id={id} sx={{ ...style }} color={color ?? "text.primary"} onClick={onClick} variant={variant ?? ""} component={component}>
      {text}
      {children}
    </Typography>
  );
};
TextView.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  variant: PropTypes.string,
  component: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.ReactNode,
  textAlign: PropTypes.string,
  onClick: PropTypes.func
};
export default TextView;
