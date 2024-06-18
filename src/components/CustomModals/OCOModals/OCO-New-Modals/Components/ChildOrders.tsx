import React from "react";
import { Grid, Typography } from "@mui/material";
import BuyCellTab from "../../../../SignalTrading/BuySellTab";
import { CHILD_ORDERS_CONTAINER, justifyGridSx } from "../../../../SignalTrading/Modals/Modals.styles";

interface ChildOrdersProps {
  orders: { stopPrice: number; quantity: number }[]; // Update with actual type
  convertToPrecisionValueForPrice: () => void; // Update with actual type and arguments
  isSignal?: boolean;
  entryPrice: number;
  side: string;
} // Update with actual type and arguments
const ChildOrders: React.FC<ChildOrdersProps> = ({ orders, entryPrice, side, isSignal = false }) => {
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
          <BuyCellTab side={side === "BUY" ? "SELL" : "BUY"} />
        </Grid>
        {!isSignal && (
          <Grid container sx={{ ...justifyGridSx, my: 1 }}>
            <Typography color={"text.secondary"} variant="Regular_14">
              {"Size"}
            </Typography>
            <Typography id="Take-Profit-triggerPrice" variant="SemiBold_12">
              {orders[0].quantity}
            </Typography>
          </Grid>
        )}
        <Grid container sx={{ ...justifyGridSx, my: 1 }}>
          <Typography color={"text.secondary"} variant="Regular_14">
            {"Trigger Price (USDT)"}
          </Typography>
          <Typography id="Take-Profit-triggerPrice" variant="SemiBold_12">
            {orders[0].stopPrice}
          </Typography>
        </Grid>
        <Grid container sx={{ ...justifyGridSx, alignItems: "center", my: 1 }}>
          <Typography color={"text.secondary"} variant="Regular_14">
            Estimated Profit
          </Typography>
          <Typography id="Take-Profit-EST-PnL" variant="SemiBold_12" color={"text.success"}>
            {(Math.abs(Number(orders[0].stopPrice) - entryPrice) * orders[0]?.quantity).toFixed(2)} {"USDT"}
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
          <BuyCellTab side={side === "BUY" ? "SELL" : "BUY"} />
        </Grid>
        <Grid container sx={{ ...justifyGridSx, my: 1 }}>
          <Typography color={"text.secondary"} variant="Regular_14">
            {"Size"}
          </Typography>
          <Typography id="Take-Profit-triggerPrice" variant="SemiBold_12">
            {orders[1].quantity}
          </Typography>
        </Grid>
        <Grid container sx={{ ...justifyGridSx, my: 1 }}>
          <Typography color={"text.secondary"} variant="Regular_14">
            {"Trigger Price (USDT)"}
          </Typography>
          <Typography id="Take-Profit-triggerPrice" variant="SemiBold_12">
            {orders[1].stopPrice}
          </Typography>
        </Grid>
        <Grid container sx={{ ...justifyGridSx, alignItems: "center", my: 1 }}>
          <Typography color={"text.secondary"} variant="Regular_14">
            Estimated Loss
          </Typography>
          <Typography id="Take-Profit-EST-PnL" variant="SemiBold_12" color={"#FF6554"}>
            {"-"}
            {(Math.abs(orders[1].stopPrice - entryPrice) * orders[1]?.quantity).toFixed(2)} {"USDT"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChildOrders;
