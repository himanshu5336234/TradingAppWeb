import React from "react";
import BuyCellTab from "../BuySellTab";
import { Grid } from "@mui/material";

interface SideCellProps {
  side: string;
  gridSize: number;
}

const SideCell: React.FC<SideCellProps> = ({ side, gridSize }) => {
  return (
    <Grid item container alignItems={"center"} xs={gridSize}>
      <BuyCellTab side={side} />
    </Grid>
  );
};

export default SideCell;
