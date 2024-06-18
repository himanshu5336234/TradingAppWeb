import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Tab, Tabs, Box } from "@mui/material";
import OpenOrders from "./OrderTabs/mOpenOrder";
import OrderHistory from "./OrderTabs/mOrderHistory";
import PnlHistory from "./OrderTabs/mPnlHistory";
import { FONT14 } from "@/pages/MobileView/style";
import MPositions from "./OrderTabs/mPositions/MPositions";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useHandleBinanceSocketSubsMweb from "@/frontend-BL/businessHooks/BINANCE_WORKER/useHandleBinanceSocketSubsMweb";
const MOrders = () => {
  const openOrdersApiData = useSelector((state) => state.futures.openOrders);
  const allPositionsData = useSelector((state) => state.positionsDirectory.currentPositions);
  const [currentView, setCurrentView] = useState(0);
  const { state } = useLocation();
  const TABSINDEX = useMemo(() => currentView, [currentView]);

  useEffect(() => {
    if (state?.currentMwebTab === 1) {
      setCurrentView(state?.mOrdersTab);
    }
  }, [state]);

  useHandleBinanceSocketSubsMweb();

  const ToggleView = () => {
    switch (TABSINDEX) {
      case 1:
        return <OpenOrders openOrdersApiData={openOrdersApiData} index={TABSINDEX} />;
      case 2:
        return <OrderHistory index={TABSINDEX} />;
      case 3:
        return <PnlHistory index={TABSINDEX} />;
      default:
        return <MPositions allPositionsData={allPositionsData} index={TABSINDEX} />;
    }
  };

  ToggleView.propTypes = {
    current: PropTypes.number
  };
  const handleChange2 = (e) => {
    const attributeValue = e.target.attributes.order.nodeValue;
    e.stopPropagation();
    setCurrentView(Number(attributeValue));
  };

  return (
    <Box sx={{ p: 1 }}>
      <Grid item xs={12}>
        <Tabs
          selectionFollowsFocus
          textColor="text.ultramild"
          value={currentView}
          variant="scrollable"
          scrollButtons={false}
          aria-label="Tabs where each tab needs to be selected manually"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            overflow: "auto !important"
          }}
          onChange={(e) => handleChange2(e)}
        >
          <Tab sx={FONT14} label={`Position (${allPositionsData.length})`} order={0} />
          <Tab sx={FONT14} label={`Open Orders (${openOrdersApiData.length})`} order={1} />
          <Tab sx={FONT14} label="Order History" order={2} />
          <Tab sx={FONT14} label="Position History" order={3} />
        </Tabs>
      </Grid>
      <Box sx={{ mt: 4 }}>{ToggleView()}</Box>
    </Box>
  );
};
MOrders.propTypes = {
  index: PropTypes.number
};
export default MOrders;
