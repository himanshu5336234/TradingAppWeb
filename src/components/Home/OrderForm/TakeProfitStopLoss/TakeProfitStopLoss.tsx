import React, { useContext, useEffect } from "react";
import TakeProfit from "./TakeProfit";
import StopLoss from "./StopLoss";
import PropTypes from "prop-types";
import OrderFormContext from "../OrderFormNewWrapper";
import { Box, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import useTakeProfitStopLoss from "@/frontend-BL/businessHooks/ORDER_FORM/useTakeProfitStopLoss";
import ReduceOnlySwitch from "../ReduceOnlySwitch";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
import { useSelector } from "react-redux";

const TakeProfitStopLoss = () => {
  const selectedSymbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  const { state, dispatchOrderEvent } = useContext(OrderFormContext);
  const TakeProfitStopLossEventHook = useTakeProfitStopLoss({ state, dispatchOrderEvent });
  const { clearAllStateWhenTakeProfitStopLossActive } = TakeProfitStopLossEventHook;

  useEffect(() => {
    if (state.isSignalTrading) {
      dispatchOrderEvent({
        type: "UPDATE_TAKE_PROFIT_STOP_LOSS_ACYIVE",
        payload: true
      });
    } else {
      dispatchOrderEvent({
        type: "UPDATE_TAKE_PROFIT_STOP_LOSS_ACYIVE",
        payload: false
      });
    }
  }, [state.isSignalTrading, selectedSymbol]);

  const selectValues = !state.isSignalTrading
    ? [
        {
          name: "Price",
          value: "price"
        },
        { name: "ROE%", value: "ROE" },
        { name: " Amount (P&L)", value: "amount" }
      ]
    : [
        {
          name: "Price",
          value: "price"
        }
      ];
  return (
    <>
      <Grid container gap={1} justifyContent={"flex-start"}>
        <Grid container item gap={0.5} xs={12}>
          <Grid item>
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
                  disabled={state.size.length === 0 || state.sizeError.length > 0}
                  checked={state.isSignalTrading ? true : state.isTakeProfitStopLossActive}
                  onChange={(event) => {
                    dispatchOrderEvent({
                      type: "UPDATE_TAKE_PROFIT_STOP_LOSS_ACYIVE",
                      payload: !state.isSignalTrading ? event.target.checked : true
                    });
                    clearAllStateWhenTakeProfitStopLossActive();
                  }}
                />
              }
              label={"TP/ SL "}
            />
          </Grid>
          <Grid item>{!state.isSignalTrading && <ReduceOnlySwitch />}</Grid>
        </Grid>
      </Grid>

      {state.isTakeProfitStopLossActive && (
        <Box
          sx={{
            backgroundColor: "background.default",
            borderRadius: "4px",
            p: 1
          }}
        >
          <Grid container alignItems={"baseline"} justifyContent={"space-between"} rowSpacing={1} gap={0.1}>
            <Grid item container justifyContent={"space-between"} xs={12}>
              <Grid item xs={1.5}>
                <Typography variant="Regular_11" color={"text.secondary"}>
                  {"TP/SL"}
                </Typography>
              </Grid>
              <Grid>
                <ToggleGroup
                  variant="secondary"
                  value={TakeProfitStopLossEventHook.dropDownValueForStoploss}
                  handleChange={(event, value) => {
                    TakeProfitStopLossEventHook.handleStopLossAndTakeProfitDropDownValue(event.target.value);
                  }}
                  values={selectValues}
                />
              </Grid>
            </Grid>

            <Grid item xs={5.9}>
              <TakeProfit bg={"background.primary"} TakeProfitStopLossEventHook={TakeProfitStopLossEventHook} />
            </Grid>
            <Grid item xs={5.9}>
              <StopLoss bg={"background.primary"} TakeProfitStopLossEventHook={TakeProfitStopLossEventHook} />
            </Grid>
          </Grid>{" "}
        </Box>
      )}
    </>
  );
};
TakeProfitStopLoss.propTypes = {
  symbol: PropTypes.string
};
export default TakeProfitStopLoss;
