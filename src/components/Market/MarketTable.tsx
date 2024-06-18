import React from "react";
import { Grid, Box } from "@mui/material";
import MarketCards from "./MarketCards";
import EconomicCalender from "./EconomicCalender";
import NewsBox from "./NewsBox";
import MarketTableContainer from "./MarketTableContainer";
import TextView from "../UI/TextView/TextView";

function MarketTable() {
  return (
    <Box p={"2rem 6rem"}>
      <Grid container gap={10}>
        <Grid gap={4} container item xs={12}>
          <Grid item xs={12}>
            <TextView variant="Bold_44" text={"Markets"} component={"p"} />
          </Grid>
          <Grid item xs={12}>
            <MarketCards />
          </Grid>
        </Grid>
        <Grid container gap={4} item xs={12}>
          <Grid item flex={0.6}>
            <NewsBox />
          </Grid>
          <Grid container item flex={1}>
            <EconomicCalender />
          </Grid>
        </Grid>
        <Grid container gap={8} item xs={12}>
          <Grid item xs={12}>
            <TextView text={"Market Overview"} variant="Bold_28" />
          </Grid>
          <MarketTableContainer />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MarketTable;
