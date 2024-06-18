import React from "react";
import { Grid } from "@mui/material";

interface TableDataCellProps {
  gridSize: number;
  value: any; // Assuming value can be any React node
}

const TableDataCell: React.FC<TableDataCellProps> = ({ gridSize, value }) => {
  return (
    <Grid item xs={gridSize}>
      {value}
    </Grid>
  );
};

export default TableDataCell;
