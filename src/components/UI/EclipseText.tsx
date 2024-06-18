import { Typography } from "@mui/material";
import React from "react";

interface EclipseTextProps {
  text: string;
  placesToTake: number;
  variant: string;
  color: string;
  children: any;
}

const EclipseText: React.FC<EclipseTextProps> = ({ text, placesToTake, color, variant, children }) => {
  return (
    <Typography color={color || "text.primary"} variant={variant}>
      {text?.trim()?.length === 0 ? "--" : text?.trim().length <= placesToTake ? text?.trim() : text?.substring(0, placesToTake) + "..."}
      {children}
    </Typography>
  );
};

export default EclipseText;
