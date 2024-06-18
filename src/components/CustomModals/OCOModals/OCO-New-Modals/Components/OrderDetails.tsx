import { Grid, Typography } from "@mui/material";
import React from "react";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import BuySellTab from "../../../../SignalTrading/BuySellTab";
import LastTradedPrice from "@/components/LastTradedPrice/LastTradedPrice";
import { SymbolPrecisionHelper } from "@/helpers";
interface OrderDetailsProps {
  symbol: string;
  marginMode: string;
  leverage: number;
  showTriggerPrice: boolean;
  modalType: string;
  entryPrice: number;
  triggerPrice?: number;
  side: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ symbol, marginMode, leverage, showTriggerPrice = true, triggerPrice, entryPrice, side }) => {
  const { setDecimalPrecision, symbolPricePrecision } = SymbolPrecisionHelper({ symbol });
  return (
    <Grid container gap={2} my={2}>
      <Grid container alignItems={"center"} item gap={2} xs={3}>
        <img src={getCurrencyUrl(symbol.replace("USDT", "").toLowerCase())} width={"28px"} />
        <Grid item>
          <Typography variant={"SemiBold_14"}>
            {symbol}
            <Typography component={"p"} variant={"Medium_11"} color={"text.secondary"}>
              {marginMode}
              {"  |  "}
              {leverage}
              {"x"}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems={"center"} xs={2}>
        <Typography component={"p"} variant={"Medium_10"} color={"text.secondary"}>
          {"ENTRY PRICE"}
          <Typography component={"p"} mt={0.5} color={"#fff"} variant={"Medium_12"}>
            {entryPrice ? setDecimalPrecision(String(entryPrice), symbolPricePrecision) : "--"}
          </Typography>
        </Typography>
      </Grid>
      {showTriggerPrice && (
        <Grid item xs={2}>
          <Typography variant={"Medium_10"} color={"text.secondary"}>
            {"TRIGGER PRICE"}
            <Typography component={"p"} color={"#fff"} variant={"Medium_12"}>
              {triggerPrice ? symbolPricePrecision(triggerPrice, symbolPricePrecision) : "--"}
            </Typography>
          </Typography>
        </Grid>
      )}
      <Grid container alignItems={"center"} item xs={2}>
        <Typography component={"p"} variant={"Medium_10"} color={"text.secondary"}>
          {"POSITION SIDE"}
        </Typography>
        <BuySellTab side={side} />
      </Grid>
      <Grid item xs={3}>
        <Typography component={"p"} variant={"Medium_10"} color={"text.secondary"}>
          {"LAST TRADED PRICE"}
        </Typography>
        <LastTradedPrice variant={"Medium_12"} convertToPrecisionValueForPrice={setDecimalPrecision} symbolPricePrecision={symbolPricePrecision} symbol={symbol} />
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
