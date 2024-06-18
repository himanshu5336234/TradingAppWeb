import React from "react";
import { UTCToDateConvertor, epochToDateConvertor } from "@/helpers";
import { Typography, Grid } from "@mui/material";

interface DateCellProps {
  value: string; // Assuming 'value' is of type number representing an epoch timestamp
  gridSize: number;
}

const DateCell: React.FC<DateCellProps> = ({ value, gridSize }) => {
  return (
    <Grid container item xs={gridSize} alignItems={"center"}>
      <Typography variant={"Regular_14"}>
        {UTCToDateConvertor(value).split(",")[0]}
        <Typography component={"div"} variant={"Regular_14"} color={"text.secondary"}>
          {UTCToDateConvertor(value).split(",")[1]}
        </Typography>
      </Typography>
    </Grid>
  );
};

export default DateCell;
