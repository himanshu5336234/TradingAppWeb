import React from "react";
import { Grid, Typography } from "@mui/material";
import { ORDERFORM_CONSTANTS } from "../../../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";
import { numberWithCommas } from "@/helpers/commaHelper";

import { useSelector } from "react-redux";

const MaximumBuyingPower = ({ id, leverage, alignment }: { id: string; leverage: number; alignment: string }) => {
  const availableBalance = useSelector((state: any) => state.currentPositions.crossWalletBalance);

  return (
    <Grid container pl={1} height={"100%"} id={id} alignItems={"center"} item>
      <Grid xs={alignment === "vertical" ? 12 : 6} item display={"flex"}>
        <Typography id="orderForm-maxBuyPower-label" variant={alignment === "vertical" ? "Medium_11" : "Medium_10"} color={"text.regular"}>
          {ORDERFORM_CONSTANTS.MAX_BUYING_POWER_LABEL}
        </Typography>
      </Grid>
      <Grid xs={alignment === "vertical" ? 12 : 6} item display={"flex"} justifyContent={alignment !== "vertical" && "right"}>
        <Typography id="orderForm-maxBuyingPower" variant={alignment === "vertical" ? "Medium_12" : "Medium_11"} component={"h6"}>
          {numberWithCommas(Math.trunc(leverage * availableBalance * 100) / 100) + " "}
          <Typography component={"span"} variant={alignment === "vertical" ? "Medium_11" : "Medium_10"}>
            {"USDT"}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default React.memo(MaximumBuyingPower);
