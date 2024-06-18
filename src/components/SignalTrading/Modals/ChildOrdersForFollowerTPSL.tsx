import React from "react";
import { Grid, Typography } from "@mui/material";
import { justifyGridSx, CHILD_ORDERS_CONTAINER } from "./Modals.styles";
import BuySellTab from "../BuySellTab";

const ChildOrdersForFollowerTPSL = ({ side, order, convertToPrecisionValueForPrice, entryPrice }: { side: string; order: any; convertToPrecisionValueForPrice: Function; entryPrice: number }) => {
  const calculateROI = (type: "SL" | "TP") => {
    if (!order) return 0;
    if (type === "SL") {
      const roi = (Math.abs(order.SLStopPrice - entryPrice) / entryPrice).toFixed(2);
      return (Number(roi) * 100).toFixed(2);
    } else {
      const roi = (Math.abs(order.TPStopPrice - entryPrice) / entryPrice).toFixed(2);
      return (Number(roi) * 100).toFixed(2);
    }
  };

  return (
    <Grid container justifyContent={"center"} gap={1.4}>
      {/* TP Box */}
      <Grid
        xs={5.8}
        sx={{
          ...CHILD_ORDERS_CONTAINER,
          background: "linear-gradient(179deg, rgba(41, 181, 126, 0.40) -389.3%, rgba(41, 181, 126, 0.00) 126.66%)"
        }}
      >
        <Grid container sx={{ ...justifyGridSx, mt: 1, mb: 4 }}>
          <Typography variant="Medium_14">{"Take Profit"}</Typography>
        </Grid>
        <Grid container sx={{ ...justifyGridSx, my: 1 }}>
          <Typography color={"text.secondary"} variant="Regular_14">
            Side
          </Typography>
          <BuySellTab side={side} />
        </Grid>
        <Grid container sx={{ ...justifyGridSx, my: 1 }}>
          <Typography color={"text.secondary"} variant="Regular_14">
            {"Trigger Price (USDT)"}
          </Typography>
          <Typography id="Take-Profit-triggerPrice" variant="SemiBold_12">
            {convertToPrecisionValueForPrice(order.TPStopPrice)}
          </Typography>
        </Grid>
        <Grid container sx={{ ...justifyGridSx, alignItems: "center", my: 1 }}>
          <Typography color={"text.secondary"} variant="Regular_14">
            Estimated Profit
          </Typography>
          <Typography id="Take-Profit-EST-PnL" variant="SemiBold_12" color={"text.success"}>
            {calculateROI("TP")} {"%"}
          </Typography>
        </Grid>
      </Grid>

      {/* SL Box */}

      <Grid
        xs={5.8}
        sx={{
          ...CHILD_ORDERS_CONTAINER,
          background: "linear-gradient(180deg, rgba(255, 101, 84, 0.40) -252.71%, rgba(254, 101, 84, 0.00) 124.85%)"
        }}
      >
        <Grid container sx={{ ...justifyGridSx, mt: 1, mb: 4 }}>
          <Typography variant="Medium_14">{"Stop Loss"}</Typography>
        </Grid>

        <Grid container sx={{ ...justifyGridSx, my: 1 }}>
          <Typography color={"text.secondary"} variant="Regular_14">
            Side
          </Typography>

          <BuySellTab side={side} />
        </Grid>
        <Grid container sx={{ ...justifyGridSx, my: 1 }}>
          <Typography color={"text.secondary"} variant="Regular_14">
            {"Trigger Price (USDT)"}
          </Typography>
          <Typography id="Take-Profit-triggerPrice" variant="SemiBold_12">
            {convertToPrecisionValueForPrice(order.SLStopPrice)}
          </Typography>
        </Grid>
        <Grid container sx={{ ...justifyGridSx, alignItems: "center", my: 1 }}>
          <Typography color={"text.secondary"} variant="Regular_14">
            Estimated Loss
          </Typography>
          <Typography id="Take-Profit-EST-PnL" variant="SemiBold_12" color={"#FF6554"}>
            {"- "}
            {calculateROI("SL")} {"%"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChildOrdersForFollowerTPSL;
