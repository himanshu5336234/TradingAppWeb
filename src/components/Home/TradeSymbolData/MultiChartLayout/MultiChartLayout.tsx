import { Grid } from "@mui/material";
import React from "react";
import { TradingViewChart } from "../TradingViewChart/TradingViewChart/TradingViewChart";

const MultiChartLayout = () => {
  return (
    <Grid bgcolor={"black"} container height={"100%"} alignItems={"center"} justifyContent={"space-between"}>
      <Grid item height={"50%"} xs={6}>
        {" "}
        <TradingViewChart ID={0} res={"60"} />
      </Grid>
      <Grid item height={"50%"} xs={6}>
        <TradingViewChart ID={15} res={"15"} />
      </Grid>
      <Grid item height={"50%"} xs={6}>
        <TradingViewChart ID={5} res={"5"} />
      </Grid>
      <Grid item height={"50%"} xs={6}>
        <TradingViewChart ID={1} res={"1"} />
      </Grid>
    </Grid>
  );
};

export default MultiChartLayout;
