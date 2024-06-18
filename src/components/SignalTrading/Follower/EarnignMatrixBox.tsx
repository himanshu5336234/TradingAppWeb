import React from "react";
import { Grid, Typography } from "@mui/material";
interface EarnignMatrixBoxProps {
  heading: string;
  value: string;
  gridSize: number;
}
const EarnignMatrixBox: React.FC<EarnignMatrixBoxProps> = ({ heading, value, gridSize }) => {
  return (
    <Grid container item xs={gridSize} border={"1px solid #29292E"} p={3}>
      <Typography variant="Regular_14" color={"text.secondary"}>
        {heading}
        <Typography color={"#fff"} component={"div"} variant="Medium_16">
          {value}
        </Typography>
      </Typography>
    </Grid>
  );
};

export default EarnignMatrixBox;
