import { Tooltip } from "@mui/material";
import React, { useMemo, memo } from "react";
import { useSelector } from "react-redux";
// import { SetAggTradeStatus } from "@/frontend-BL/redux/actions/User/SetAggTradeStatus.ac";
import TextView from "../UI/TextView/TextView";
interface lastTradedPriceProps {
  arrow?: boolean;
  contextListner: string;
  symbolPricePrecision: number;
  convertToPrecisionValueForPrice: (price?: string, precision?: number) => string;
  symbol: string;
  variant: string;
  id: string;
}

const lastTradedPrice: React.FC<lastTradedPriceProps> = ({ arrow, symbolPricePrecision, convertToPrecisionValueForPrice, symbol, variant, id }) => {
  const OrderBook = useSelector((state: any) => state.OrderBook);
  const snapltp = useSelector((state: { BinanceStreamData: { binanceData: any } }) => state.BinanceStreamData.binanceData?.[`${symbol?.toLowerCase()}@ticker`]);
  const titleTag = document.getElementById("dynamicTitle");
  if (titleTag && snapltp) {
    titleTag.innerHTML = `${
      convertToPrecisionValueForPrice(snapltp, symbolPricePrecision) + " | "
    }${symbol?.toUpperCase()} | Buy, Sell & Trade Crypto Futures of Bitcoin, Ethereum and other cryptocurrencies with up to 25x leverage on India's most trusted and secure Trading platform`;
  }

  const getLastPriceColor = useMemo(() => {
    if (Boolean(OrderBook?.asksSnapShot?.length > 0) && Boolean(OrderBook?.bidsSnapShot?.length > 0)) {
      if (Number(snapltp) <= Number(OrderBook?.bidsSnapShot[0][0])) {
        return "#29B57E";
      } else if (Number(snapltp) >= Number(OrderBook?.asksSnapShot[0][0])) {
        return "#F46151";
      } else {
        return "#fff";
      }
    } else {
      return "#fff";
    }
  }, [snapltp, OrderBook]);
  const getArrowBasedOnLastPrice = useMemo(() => {
    if (Boolean(OrderBook?.asksSnapShot?.length > 0) && Boolean(OrderBook?.bidsSnapShot?.length > 0)) {
      if (Number(snapltp) <= Number(OrderBook?.bidsSnapShot[0][0])) {
        return <>&#8593;</>;
      } else if (Number(snapltp) >= Number(OrderBook?.asksSnapShot[0][0])) {
        return <>&#8595;</>;
      }
    }
  }, [snapltp, OrderBook]);
  return (
    <>
      <Tooltip
        componentsProps={{
          tooltip: {
            sx: {
              color: "#ffff",
              fontSize: "11px",
              backgroundColor: "background.tertiary",
              fontWeight: 600,
              p: "10px"
            }
          }
        }}
        arrow
        placement="bottom"
        title={<TextView text={"Last Traded Price (USDT)"} />}
      >
        <TextView id={id || ""} component={"span"} variant={variant} color={getLastPriceColor} text={convertToPrecisionValueForPrice(snapltp, symbolPricePrecision)} />
        {arrow && (
          <TextView style={{ ml: 1 }} variant={"SemiBold_16"} color={getLastPriceColor} component={"span"}>
            {getArrowBasedOnLastPrice}
          </TextView>
        )}
      </Tooltip>
    </>
  );
};

export default memo(lastTradedPrice);
