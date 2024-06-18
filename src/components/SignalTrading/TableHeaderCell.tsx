import React from "react";
import { Grid, Typography } from "@mui/material";

interface TableCellProps {
  heading: {
    id: string;
    gridSize: number;
    name: string;
  };
}

const TableCell: React.FC<TableCellProps> = ({ heading }) => {
  return (
    <Grid item xs={heading.gridSize}>
      <Typography variant="SemiBold_11" color={"text.secondary"}>
        {heading.name}
      </Typography>
    </Grid>
  );
};

export default TableCell;
