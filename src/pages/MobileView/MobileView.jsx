import React, { useEffect, useMemo, useState } from "react";
import WalletIcon from "ASSETS/images/Wallet.svg";
import WorkIcon from "ASSETS/images/Work.svg";
import OrderIcon from "ASSETS/images/Order.svg";
import LogoutIcon from "ASSETS/images/logOut.svg";
import PropTypes from "prop-types";
import { Tab, Tabs, Box } from "@mui/material";
// import MPosition from "@/pages/MobileView/mPositions/MPositions";
import MOrders from "@/pages/MobileView/mOrders/MOrders";
import {
  // BINANCE_WS_CONNECT,
  // BINANCE_WS_DISCONNECT,
  // DENSITY_WS_CONNECT,
  // DENSITY_WS_DISCONNECT,
  OPEN_ORDERS_FETCH_SUCCESS
} from "BL/redux/constants/Constants";
// import internetConnectionStatus from "@/hooks/internetConnectionStatus";
import { openOrdersApi } from "API/Api";
import { fetchAccountPositionInfo } from "BL/redux/actions/User/AccountInfo.ac";
import { useDispatch, useSelector } from "react-redux";
import { getTradableCoins } from "BL/redux/actions/Futures/GetTradableCoins.ac";
import MProfile from "@/pages/MobileView/mProfile/mProfile";
import { bottomFixed } from "@/pages/MobileView/style";
import MobileTradeScreen from "./TradeScreen/MobileTradeScreen";
import Wallet from "../Wallet/Wallet";
import { useLocation } from "react-router-dom";

const MobileView = () => {
  const { state } = useLocation();
  const [currentView, setCurrentView] = useState(2);
  const TABSINDEX = useMemo(() => currentView, [currentView]);
  const dispatch = useDispatch();
  // const { isOnline } = internetConnectionStatus();
  let isOpenOrdersApiCalled = false;
  let openOrdersFromServer = [];
  let symbolsFromServer = useSelector((state) => state.tradablesymbolList.tradablesymbolList);
  symbolsFromServer = symbolsFromServer && symbolsFromServer.map((symbol) => symbol.symbol);
  if (symbolsFromServer.length > 0 && !isOpenOrdersApiCalled) fetchOpenOrders();

  useEffect(() => {
    if (state) {
      setCurrentView(state?.currentMwebTab);
    }
  }, [state]);

  useEffect(() => {
    dispatch(fetchAccountPositionInfo());
    dispatch(getTradableCoins());
  }, []);
  useEffect(() => {
    fetchOpenOrders();
  }, []);
  function fetchOpenOrders() {
    isOpenOrdersApiCalled = true;
    symbolsFromServer &&
      symbolsFromServer.forEach((symbol) => {
        openOrdersApi(symbol)
          .then((successResponse) => {
            openOrdersFromServer = [...openOrdersFromServer, ...successResponse.data];
            dispatch({
              type: OPEN_ORDERS_FETCH_SUCCESS,
              payload: openOrdersFromServer
            });
          })
          .catch((errorResponse) => {
            console.error(errorResponse);
          });
      });
  }

  const ToggleView = () => {
    switch (TABSINDEX) {
      case 1:
        return <MOrders index={TABSINDEX} />;
      case 2:
        return <Wallet index={TABSINDEX} />;
      case 3:
        return <MProfile index={TABSINDEX} />;

      default:
        return <MobileTradeScreen />;
      //  <MPosition index={TABSINDEX} isExitLimitMarketModalOpen={isExitLimitMarketModalOpen} exitWithLimitOrMarket={exitWithLimitOrMarket} />;
    }
  };

  ToggleView.propTypes = {
    current: PropTypes.number
  };

  const handleChange = (e, newVal) => {
    // const attributeValue = Number(e.target.attributes.order.nodeValue);
    // e.stopPropagation();
    setCurrentView(newVal);
  };
  return (
    <>
      <Box sx={{ width: "100%", height: "66vh" }}>{ToggleView()}</Box>
      <Box sx={[bottomFixed]}>
        <Tabs
          centered
          textColor="text.ultramild"
          selectionFollowsFocus
          value={currentView}
          aria-label="Tabs where each tab needs to be selected manually"
          sx={{ height: "60px", display: "flex", justifyContent: "space-between" }}
          onChange={handleChange}
        >
          <Tab sx={{ fontSize: "10px" }} icon={<img style={{ height: "20px" }} src={WorkIcon} />} aria-label="Trade" value={0} />
          <Tab sx={{ fontSize: "10px" }} icon={<img style={{ height: "20px" }} src={OrderIcon} />} aria-label="Positions" value={1} />
          <Tab sx={{ fontSize: "10px" }} icon={<img style={{ height: "20px" }} src={WalletIcon} />} aria-label="Wallet" value={2} />
          <Tab sx={{ fontSize: "10px" }} icon={<img style={{ height: "20px" }} src={LogoutIcon} />} label="" value={3} />
        </Tabs>
      </Box>
    </>
  );
};

export default MobileView;
