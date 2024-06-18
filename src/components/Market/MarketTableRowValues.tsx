import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import TextView from "../UI/TextView/TextView";

interface MarketTableRowValuesProps {
  symbol: string;
}

export const MarketTableRowValues: React.FC<MarketTableRowValuesProps> = ({ symbol }) => {
  const tableRow = useSelector((state: any) => state.activeSymbolData.activeSymbolsMap)[symbol];

  return (
    <>
      <Grid item xs={1.5}>
        <TextView variant={"Medium_14"} text={tableRow ? tableRow["lp"] : "--"} />
      </Grid>
      <Grid item xs={1.5}>
        <TextView color={tableRow && tableRow["percentage"] >= 0 ? "text.success" : "text.error"} variant={"Medium_14"} text={tableRow ? `${tableRow["percentage"]} %` : "--"} />
      </Grid>
      <Grid item xs={2}>
        <Typography variant="Medium_14">
          {tableRow ? `${tableRow["high"]} / ` : "--/"}
          <Typography variant="Medium_14" color="text.regular">
            {tableRow ? tableRow["low"] : "--"}
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={2.5}>
        <TextView variant="Medium_14" text={tableRow ? tableRow["vol"] : "--"} />
      </Grid>
    </>
  );
};
