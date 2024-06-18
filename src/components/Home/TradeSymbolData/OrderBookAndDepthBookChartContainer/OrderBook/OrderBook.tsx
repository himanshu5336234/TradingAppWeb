import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import AskOrbids from "./AskOrBids";
import TableHeadWrapperForAsksBids from "./TableHeadWrapperForAsksBids";
import OrderBookTable from "./OrderBookTable";
import TextView from "@/components/UI/TextView/TextView";

const OrderBook = () => {
  const [asksOrBids, setAsksOrBids] = useState("ALL");

  const handleTabsChange = useCallback(
    (newValue: string) => {
      setAsksOrBids(newValue);
    },
    [asksOrBids]
  );
  return (
    <Box height={"100%"} width={"100%"} p={2}>
      <TextView component={"p"} text={"Order Book"} variant={"SemiBold_12"} />
      <AskOrbids asksOrBids={asksOrBids} handleTabsChange={handleTabsChange} />
      <TableHeadWrapperForAsksBids asksOrBids={asksOrBids} />
      <OrderBookTable asksOrBids={asksOrBids} />
    </Box>
  );
};
export default OrderBook;
