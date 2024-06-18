import React from "react";
import { Grid } from "@mui/material";
import WatchListRevamped from "../WatchListRevamped/WatchListRevamped";
import { TradingViewChart } from "./TradingViewChart/TradingViewChart";

const TradingViewChartWrapper = () => {
  return (
    <Grid height="100%" container>
      <Grid display={{ xs: "none", sm: "block" }} xs={12} item height={"30px"}>
        <WatchListRevamped />
      </Grid>

      <Grid xs={12} height={`calc(100% - 30px)`} item>
        <TradingViewChart ID={0} res={"60"} />
      </Grid>
    </Grid>
  );
};

export default TradingViewChartWrapper;
