import { Box } from "@mui/material";
import React, { memo, useCallback } from "react";
import OrderBookRow from "./OrderBookRow";

const OrderBookRowWrapper = ({
  convertToPrecisionValueInContractAssetUnit,
  orders,
  height,
  orderType,
  symbolPricePrecision,
  symbolQuantityPrecision,
  setDecimalPrecision
}: {
  orders: any;
  height: number;
  convertToPrecisionValueInContractAssetUnit: Function;
  orderType: string;
  symbolPricePrecision: number;
  symbolQuantityPrecision: number;
  setDecimalPrecision: Function;
}) => {
  const bidsAndAsksOrders = orderType === "bidsSnapShot" ? [...orders[orderType]] : [...orders[orderType]].reverse();
  const showOrdersRows = useCallback(
    (payload: any, orderType: string) => {
      if (payload.length > 0) {
        const orders =
          orderType === "bidsSnapShot"
            ? payload.slice(0, convertToPrecisionValueInContractAssetUnit(String(height / 25), 0))
            : payload.slice(payload.length - convertToPrecisionValueInContractAssetUnit(String(height / 25), 0));
        const maxOrder = orderType === "bidsSnapShot" ? orders[orders.length - 1][2] : orders[0][2];
        return orders.map((items: any, index: number) => {
          return (
            <Box key={index}>
              <OrderBookRow
                items={items}
                Max={maxOrder}
                setDecimalPrecision={setDecimalPrecision}
                rowType={orderType}
                symbolQuantityPrecision={symbolQuantityPrecision}
                symbolPricePrecision={symbolPricePrecision}
              />
            </Box>
          );
        });
      }
    },
    [height]
  );

  return (
    <Box display={"flex"} flexDirection="column" overflow={"hidden"} height={height}>
      {showOrdersRows(bidsAndAsksOrders, orderType)}
    </Box>
  );
};

export default memo(OrderBookRowWrapper);
