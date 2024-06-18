import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomModal from "./newModal/CustomModal";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux";
import BuySellTab from "../SignalTrading/BuySellTab";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import { SymbolPrecisionHelper } from "@/helpers";
function OrderConfirmedModal({ isOpen, setOrderConfirm, orderDetails, createOrderApiCall, showLoader, setShowLoader }) {
  const [DontShowMeAgain, setDontShowMeAgain] = useState(false);
  const selectedSymbol = useSelector((state) => state.selectSymbol.selectedSymbol).toUpperCase();
  const leverage = useSelector((state) => state.positionsDirectory.leverage.find((data) => data.sym === selectedSymbol?.toUpperCase()));
  const handleSubmit = (event) => {
    DontShowMeAgain && window.localStorage.setItem("doNotShowAgainOrderConfirmModal", true);

    setShowLoader(true);
    createOrderApiCall();
    setDontShowMeAgain(false);
  };
  const { setDecimalPrecision, symbolQuantityPrecision } = SymbolPrecisionHelper({ symbol: selectedSymbol });
  function ReturnOrderTypeLabel(orderDetails) {
    // Limit order = price
    // in case of market order = market (text) or -
    // in case of stop loss market = trigger price
    // in case of stop loss limit = trigger price
    if (orderDetails.OrderType === 0 && !orderDetails.takeProfit.length > 0 && !orderDetails.stopLoss.length > 0) {
      return "Market";
    } else if (orderDetails.OrderType === 0 && orderDetails.stopLoss.length > 0) {
      return "Trigger Price";
    } else if (orderDetails.OrderType === 1 && orderDetails.stopLoss.length > 0) {
      return "Trigger Price";
    }
    if (orderDetails.OrderType === 3 || orderDetails.OrderType === 2) {
      return "Stop Price";
    } else {
      return "Price";
    }
  }
  return (
    <>
      <CustomModal
        ContainerSx={{
          maxWidth: { sm: "500px", xs: "350px" }
        }}
        primaryAction={handleSubmit}
        isDisabled={showLoader}
        isloading={showLoader}
        IsOpen={isOpen}
        isClose={true}
        close={() => {
          setShowLoader(false);
          setOrderConfirm(false);
        }}
        title={"Order Confirmation"}
        isPrimaryAction={true}
        primaryName={"Confirm Order"}
        isSecondaryAction={true}
        secondaryName={"Dismiss"}
        isSecondaryActionVisible={true}
        secondaryAction={() => {
          setDontShowMeAgain(false);
          setOrderConfirm(false);
        }}
      >
        <Box
          sx={{
            mt: 1.5,
            p: 3,
            borderRadius: "4px",
            background: "linear-gradient(179.32deg, #29292E 0.56%, rgba(41, 41, 46, 0) 131.04%)"
          }}
        >
          <Grid container gap={1}>
            <Grid item container xs={12}>
              <Grid item xs={1} container alignItems={"center"}>
                <Box
                  component={"img"}
                  src={getCurrencyUrl(selectedSymbol.replace("USDT", "").toLowerCase())}
                  alt="symbolLogo"
                  sx={{
                    height: { sm: 28, xs: 20 },
                    width: { sm: 28, xs: 20 },
                    borderRadius: "50%",
                    backgroundColor: "white"
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant="Bold_14">{selectedSymbol.toUpperCase()}</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="space-between">
              <Typography color={"text.regular"} variant="Regular_12">
                Side
              </Typography>
              <BuySellTab side={orderDetails.side} />
            </Grid>
            <Grid container item xs={12} justifyContent="space-between">
              <Typography color={"text.regular"} variant="Medium_12">
                Leverage
              </Typography>
              <Typography variant="Medium_14">
                {leverage?.leverage}
                <Typography variant="Medium_14">{" x"}</Typography>
              </Typography>
            </Grid>
            {orderDetails.OrderType !== 0 && (
              <Grid container item xs={12} justifyContent="space-between">
                <Typography color={"text.regular"} variant="Medium_12">
                  {ReturnOrderTypeLabel(orderDetails)}
                </Typography>
                <Typography variant="Medium_14">
                  {orderDetails.OrderType === 1 ? orderDetails.limitPrice : orderDetails.OrderType === 2 ? orderDetails.triggerPrice : orderDetails.OrderType === 3 ? orderDetails.triggerPrice : null}
                </Typography>
              </Grid>
            )}
            {orderDetails.OrderType === 3 && (
              <Grid container item xs={12} justifyContent="space-between">
                <Typography color={"text.regular"} variant="Medium_12">
                  {"Limit Price"}
                </Typography>
                <Typography variant="Medium_14">{orderDetails.limitPrice}</Typography>
              </Grid>
            )}
            <Grid container item xs={12} justifyContent="space-between">
              <Typography color={"text.regular"} variant="Medium_12">
                Size
              </Typography>
              <Typography variant="Medium_14">
                {setDecimalPrecision(orderDetails.size, symbolQuantityPrecision) || orderDetails.quantity} {selectedSymbol?.toUpperCase()?.replace("USDT", "")}
              </Typography>
            </Grid>
            <Grid container item xs={12} justifyContent="space-between">
              <Typography color={"text.regular"} variant="Medium_12">
                Take Profit
              </Typography>
              <Typography variant="Medium_14">{!orderDetails.takeProfit ? "--" : orderDetails.takeProfit}</Typography>
            </Grid>
            <Grid container item xs={12} justifyContent="space-between">
              <Typography color={"text.regular"} variant="Medium_12">
                Stop Loss
              </Typography>
              <Typography variant="Medium_14">{!orderDetails.stopLoss ? "--" : orderDetails.stopLoss}</Typography>
            </Grid>
          </Grid>
        </Box>
        <FormControlLabel
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "12px",
              color: "text.regular"
            }
          }}
          control={
            <Checkbox
              id="don't-show-me-checkbox"
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 18 },
                "&.Mui-checked": {
                  color: "text.main"
                }
              }}
              checked={DontShowMeAgain}
              onChange={(event) => setDontShowMeAgain(event.target.checked)}
            />
          }
          label="Don't show me again"
        />
      </CustomModal>
    </>
  );
}

OrderConfirmedModal.propTypes = {
  isOpen: PropTypes.bool,
  setOrderConfirm: PropTypes.func,
  createOrderApiCall: PropTypes.func,
  orderDetails: PropTypes.object,
  sourceComponent: PropTypes.string,
  showLoader: PropTypes.bool,
  setShowLoader: PropTypes.func
};
export default OrderConfirmedModal;
