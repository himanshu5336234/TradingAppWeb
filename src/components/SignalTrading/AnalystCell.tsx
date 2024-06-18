import { Grid, Typography } from "@mui/material";
import React from "react";
import DemoProfile from "../../assets/images/DemoProfile.svg";
import EclipseText from "../UI/EclipseText";

interface AnalystCellProps {
  heading: string;
  value: string;
  gridSize: number;
  avatarURL: string;
}

const AnalystCell: React.FC<AnalystCellProps> = ({ heading, value, gridSize, avatarURL }) => {
  return (
    <Grid item container xs={gridSize} gap={2} alignItems={"center"}>
      <Grid item xs={2}>
        <img width={"36px"} src={avatarURL || DemoProfile} />
      </Grid>
      <Grid container item xs={7} gap={2}>
        <Grid item xs={12}>
          <Typography color={"text.secondary"} variant={"Regular_12"}>
            {heading}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* <Typography variant={"Medium_20"}>{value}</Typography> */}
          <EclipseText variant={"Medium_20"} color={"text.primary"} placesToTake={10} text={value} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AnalystCell;
