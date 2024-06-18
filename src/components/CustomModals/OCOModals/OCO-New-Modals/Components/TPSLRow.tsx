import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import BuySellTab from "@/components/SignalTrading/BuySellTab";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import TextView from "@/components/UI/TextView/TextView";
interface Order {
  symbol: string;
  quantity: number;
  side: string;
  stopPrice: string;
  type: string;
}
interface TPSLRowProps {
  order: Order;
  cancelOrder: Function;
}
const TPSLRow: React.FC<TPSLRowProps> = ({ order, cancelOrder }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Grid container mt={2}>
      <Grid item xs={3}>
        <Typography id="position-size-Contract" variant="Medium_12">
          {Math.abs(order.quantity) ?? "--"} {order.symbol.replace("USDT", "").toUpperCase()}
        </Typography>
      </Grid>
      <Grid container item xs={1.5}>
        <BuySellTab side={order.side} />
      </Grid>
      <Grid item xs={3}>
        <TextView text={order.type.split("_").join(" ")} variant="Medium_12" />
      </Grid>
      <Grid item xs={2.5}>
        <Typography variant="Medium_12">{order?.stopPrice}</Typography>
      </Grid>
      <Grid container item xs={2}>
        <CustomButton
          id={"cancel"}
          loadingTextDisable={true}
          isloading={loading}
          isDisabled={loading}
          variant="closePositionfailed"
          style={{ p: "2px" }}
          onClick={() => cancelOrder({ orders: order, setLoading })}
          label={"Cancel"}
        />
      </Grid>
    </Grid>
  );
};

export default TPSLRow;
