import { Box } from "@mui/material";
import React, { memo, useRef } from "react";
import { SymbolPrecisionHelper } from "../../../../../helpers";
import { useSelector } from "react-redux";
import LastTradedPrice from "@/components/LastTradedPrice/LastTradedPrice";
import Loader from "@/components/UI/Loader";
import OrderBookRowWrapper from "./OrderBookRowWrapper";

const OrderBookTable = ({ asksOrBids }: { asksOrBids: string }) => {
  const ref = useRef(null);
  const ref2 = ref?.current?.offsetHeight ?? 300;
  const symbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  const OrderBookl = useSelector((state: any) => state.OrderBook);

  const { convertToPrecisionValueInContractAssetUnit, setDecimalPrecision, symbolPricePrecision, symbolQuantityPrecision } = SymbolPrecisionHelper({ symbol });
  return (
    <Box sx={{ height: "calc(100% - 70px)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {OrderBookl.loading && <Loader circular={true} />}
      {!OrderBookl.loading && (
        <Box height={"100%"} width={"100%"} overflow={"hidden"} ref={ref}>
          {(asksOrBids === "ALL" || asksOrBids === "ASKS") && (
            <OrderBookRowWrapper
              orders={OrderBookl}
              height={asksOrBids === "ALL" ? ref2 / 2 - 17.5 : ref2 - 35}
              convertToPrecisionValueInContractAssetUnit={convertToPrecisionValueInContractAssetUnit}
              orderType={"asksSnapShot"}
              symbolPricePrecision={symbolPricePrecision}
              symbolQuantityPrecision={symbolQuantityPrecision}
              setDecimalPrecision={setDecimalPrecision}
            />
          )}
          <Box
            sx={{
              height: "35px",
              textAlign: "left"
            }}
          >
            <LastTradedPrice id={"orderbook-ltp"} arrow symbolPricePrecision={symbolPricePrecision} variant="SemiBold_18" convertToPrecisionValueForPrice={setDecimalPrecision} symbol={symbol} />
          </Box>
          {(asksOrBids === "ALL" || asksOrBids === "BIDS") && (
            <OrderBookRowWrapper
              orders={OrderBookl}
              height={asksOrBids === "ALL" ? ref2 / 2 - 17.5 : ref2 - 35}
              convertToPrecisionValueInContractAssetUnit={convertToPrecisionValueInContractAssetUnit}
              orderType={"bidsSnapShot"}
              symbolPricePrecision={symbolPricePrecision}
              symbolQuantityPrecision={symbolQuantityPrecision}
              setDecimalPrecision={setDecimalPrecision}
            />
          )}
        </Box>
      )}
    </Box>
  );
};
export default memo(OrderBookTable);
