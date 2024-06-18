import React, { useContext, useEffect } from "react";
import { Box, Switch, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import OrderFormContext from "./OrderFormNewWrapper";
import { useLocation } from "react-router-dom";

const SignalTradingSwicth = () => {
  const location = useLocation();
  const { userType } = useSelector((state) => state.SignalTrading.userPersonna);
  const { state, dispatchOrderEvent } = useContext(OrderFormContext);
  useEffect(() => {
    if (location.state && location.state.isSignalTrading) {
      dispatchOrderEvent({
        type: "UPDATE_SIGNAL_TRADING_STATE",
        payload: true
      });
    }
  }, [location.state]);

  const clearAllStateWhenTakeProfitStopLossActive = () => {
    dispatchOrderEvent({
      type: "UPDATE_SIGNAL_TRADING_STATE",
      payload: !state.isSignalTrading
    });
    dispatchOrderEvent({
      type: "UPDATE_TAKE_PROFIT_STOP_LOSS_ACYIVE",
      payload: true
    });
  };
  return (
    userType === "ANALYST" && (
      <Box className="productTour__step4">
        <Switch size="small" checked={state.isSignalTrading} disabled={false} onChange={clearAllStateWhenTakeProfitStopLossActive} />
        <Typography sx={{ ml: 2 }} variant="Regular_12">
          {"Signal Trading"}
        </Typography>
      </Box>
    )
  );
};

export default SignalTradingSwicth;
