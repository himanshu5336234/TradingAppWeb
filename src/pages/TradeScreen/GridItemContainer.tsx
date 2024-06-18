import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Box } from "@mui/material";

const GridItemContainer = ({ item }: { item: string }) => {
  console.log("csdcdskcndlskcnsdncs");
  return (
    <Box key={item} bgcolor={"background.primary"} className={`grid-item`}>
      <DragIndicatorIcon className="grid-item__title" fontSize="small" />
      <Box className="grid-item__graph"></Box>
    </Box>
    // <Box key={Key} className={`grid-item`}>
    //   {props.fixed && <Box className="grid-item__title">csd</Box>}
    //   <Box className="grid-item__graph">{props.children}</Box>
    // </Box>
  );
};

export default GridItemContainer;
