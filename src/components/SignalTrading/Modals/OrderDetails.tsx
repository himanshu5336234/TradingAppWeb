import { Grid, Typography } from "@mui/material";
import React from "react";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import BuyCellTab from "../BuySellTab";
interface OrderDetailsProps {
  symbol: string;
  marginMode: string;
  leverage: number;
  showTriggerPrice: boolean;
  modalType: string;
  limitPrice: number;
  triggerPrice?: number | null;
  side: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ symbol = "BTCUSDT", marginMode = "ISOLATED", leverage = "17", showTriggerPrice = true, modalType = "", triggerPrice, limitPrice, side }) => {
  return (
    <Grid container mt={2} mb={4}>
      <Grid container alignItems={"center"} item gap={2} xs={3}>
        <img src={getCurrencyUrl(symbol.replace("USDT", "").toLowerCase())} width={"28px"} />
        <Grid item>
          <Typography variant={"Medium_14"}>
            {symbol}
            <Typography component={"div"} variant={"SemiBold_11"} color={"text.secondary"}>
              {marginMode.includes("ISOLATED") ? "ISOLATED" : "CROSS"}
              {" | "}
              {leverage}
              {"x"}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={3.5} gap={2} ml={2}>
        <Typography variant={"SemiBold_11"} color={"text.secondary"}>
          {modalType === "LIMIT_PRICE" ? "CURRENT LIMIT PRICE" : "LIMIT PRICE"}
          <Typography component={"div"} color={"#fff"} variant={"SemiBold_12"}>
            {limitPrice ? limitPrice : "--"}
          </Typography>
        </Typography>
      </Grid>
      {showTriggerPrice && (
        <Grid item xs={3} gap={2}>
          <Typography variant={"SemiBold_11"} color={"text.secondary"}>
            {"TRIGGER PRICE"}
            <Typography component={"div"} color={"#fff"} variant={"SemiBold_12"}>
              {triggerPrice ? triggerPrice : "--"}
            </Typography>
          </Typography>
        </Grid>
      )}
      <Grid item xs={1} gap={1}>
        <Typography component={"div"} variant={"SemiBold_11"} color={"text.secondary"} mb={0.3}>
          {"SIDE"}
        </Typography>
        <BuyCellTab side={side} />
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
