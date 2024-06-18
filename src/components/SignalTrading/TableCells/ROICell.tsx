import React from "react";
import { Grid, Typography } from "@mui/material";

interface ROICellProps {
  gridSize: number;
  roi: number;
}

const ROICell: React.FC<ROICellProps> = ({ gridSize, roi }) => {
  return (
    <Grid item container xs={gridSize} alignItems={"center"} gap={2}>
      <Typography variant="Regular_14" color={roi > 0 ? "text.success" : roi < 0 ? "#FF6554" : "#fff"}>
        {roi ? roi?.toFixed(2) + "%" : "--"}
      </Typography>
    </Grid>
  );
};

export default ROICell;
