import { Box, Typography } from "@mui/material";
import React from "react";
import { SideNavIconButtonProps } from "../SideBar.types";

const SideBarIconButton = ({ selected = false, iconComponent, onClick, label }: SideNavIconButtonProps) => {
  return (
    <Box id={label} onClick={onClick} sx={{ py: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", cursor: "pointer" }}>
      {iconComponent}
      {label && (
        <Typography textAlign={"center"} component={"h6"} variant={selected ? "Medium_9" : "Medium_8"} color={selected ? "neutral.black" : "neutral.grey7"}>
          {label}
        </Typography>
      )}
    </Box>
  );
};

export default SideBarIconButton;
