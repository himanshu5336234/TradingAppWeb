import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import { getMarginTypeApi } from "@/frontend-api-service/Api";
import BuyCellTab from "@/components/SignalTrading/BuySellTab";
interface Order {
  symbol: string;
  side: "BUY" | "SELL";
  price: string;
  type: string;
  stopPrice: string;
}
interface ParentOrderProps {
  order: Order;
  convertToPrecisionValueInPricePrecisionUnit: Function;
}
const ParentOrder: React.FC<ParentOrderProps> = ({ order, convertToPrecisionValueInPricePrecisionUnit }) => {
  const [marginType, setMarginType] = useState("");

  useEffect(() => {
    if (order.symbol) {
      getMarginTypeApi(order.symbol.toUpperCase()).then((marginType: any) => setMarginType(marginType.data.marginType));
    }
  }, [order]);

  const getPrice = () => {
    if (order && (order.type === "TAKE_PROFIT_MARKET" || order.type === "STOP_MARKET")) {
      return order.stopPrice;
    }
    return order.price;
  };

  return (
    <Grid
      container
      justifyContent={"space-between"}
      p={2}
      my={2}
      sx={{
        borderRadius: "4px",
        background: "linear-gradient(180deg, #29292E -40.25%, rgba(41, 41, 46, 0.00) 169.4%)"
      }}
    >
      <Grid container alignItems={"center"} item gap={2} xs={3}>
        <img src={getCurrencyUrl(order?.symbol?.toUpperCase().replace("USDT", "").toLowerCase())} width={"24px"} />
        <Grid item>
          <Typography variant={"Medium_14"}>
            {order.symbol.toUpperCase()}
            <Typography component={"div"} variant={"SemiBold_11"} color={"text.secondary"}>
              {marginType}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={3} gap={2}>
        <Typography variant={"SemiBold_11"} color={"text.secondary"} mb={0.3}>
          {"Order Type"}
          <Typography component={"div"} color={"#fff"} variant={"SemiBold_12"}>
            {order.type}
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={3.5} gap={2} ml={2}>
        <Typography variant={"SemiBold_11"} color={"text.secondary"}>
          {order.type === "TAKE_PROFIT_MARKET" || order.type === "STOP_MARKET" ? "Trigger Price" : "Price"}
          <Typography component={"div"} color={"#fff"} variant={"SemiBold_12"}>
            {getPrice() ? convertToPrecisionValueInPricePrecisionUnit(getPrice()) : "--"}
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={1} gap={2}>
        <Typography component={"div"} variant={"SemiBold_11"} color={"text.secondary"} mb={0.3}>
          {"SIDE"}
        </Typography>
        <BuyCellTab side={order.side} />
      </Grid>
    </Grid>
  );
};

export default ParentOrder;
