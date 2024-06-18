import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import TPSLBox from "./TPSLBox";
import IndividualOrders from "./IndividualOrders";

interface Order {
  symbol: string;
  quantity: number;
  side: string;
  stopPrice: string;
  type: string;
}
interface strategyOrdersObject {
  ocoOrders: object[];
  individualOrders: Order[][];
}

const StrategyOrdersComponent = ({
  strategyOrders,
  symbol,
  entryPrice,
  index,
  setIndex,
  setActiveStep,
  cancelOrder,
  side
}: {
  strategyOrders: strategyOrdersObject;
  symbol: string;
  entryPrice: number;
  index: number;
  setIndex: (val: boolean) => void;
  setActiveStep: (val: boolean) => void;
  cancelOrder: () => void;
  side: "BUY" | "SELL";
}) => {
  const [tabState, setTabState] = useState("ocoOrders");
  useEffect(() => {
    if (strategyOrders.ocoOrders.length === 0 && strategyOrders.individualOrders.length > 0) {
      setTabState("individualOrders");
    }
  }, [strategyOrders.ocoOrders.length, strategyOrders.individualOrders.length]);

  return (
    <Box>
      <Tabs
        textColor="white"
        TabIndicatorProps={{ style: { backgroundColor: "white" } }}
        selectionFollowsFocus
        value={tabState}
        aria-label="Tabs where each tab needs to be selected manually"
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between"
        }}
        onChange={(_, val) => setTabState(val)}
      >
        <Tab
          sx={{ fontSize: "14px", fontWeight: "500", textTransform: "none" }}
          label={`One Cancels Other Orders  (${strategyOrders.ocoOrders?.length === 0 ? 0 : index}/${strategyOrders.ocoOrders?.length})`}
          value={"ocoOrders"}
        />
        <Tab sx={{ fontSize: "14px", fontWeight: "500", textTransform: "none" }} label={`Individual Orders (${strategyOrders.individualOrders.length})`} value={"individualOrders"} />
      </Tabs>

      <Box mt={2}>
        {tabState === "ocoOrders" && (
          <TPSLBox side={side} entryPrice={entryPrice} symbol={symbol} strategyOrders={strategyOrders.ocoOrders} index={index} setIndex={setIndex} setActiveStep={setActiveStep} />
        )}
        {tabState === "individualOrders" && <IndividualOrders orders={strategyOrders.individualOrders} cancelOrder={cancelOrder} />}
      </Box>
    </Box>
  );
};

export default StrategyOrdersComponent;
