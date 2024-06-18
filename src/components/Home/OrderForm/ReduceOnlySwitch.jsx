import React, { useContext } from "react";
import { Switch, Typography, Box, Tooltip, FormControlLabel, Checkbox } from "@mui/material";
import { ORDERFORM_CONSTANTS } from "../../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";
import OrderFormContext from "./OrderFormNewWrapper";
import TextView from "../../UI/TextView/TextView";
import { Reduce_OnlyTooltip } from "@/assets/strings/tooltip.string";
const ReduceOnlySwitch = () => {
  const { state, dispatchOrderEvent } = useContext(OrderFormContext);
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
        placement="top"
        title={<TextView text={Reduce_OnlyTooltip} />}
      >
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
              checked={state.isReduceOnly}
              disabled={!state?.leverageDisable}
              onChange={(event) => {
                dispatchOrderEvent({
                  type: "UPDATE_REDUCE_ONLY",
                  payload: event.target.checked
                });
                dispatchOrderEvent({
                  type: "UPDATE_TAKE_PROFIT_STOP_LOSS_ACYIVE",
                  payload: false
                });
              }}
            />
          }
          label={ORDERFORM_CONSTANTS.REDUCE_ONLY_LABEL}
        />
      </Tooltip>
    </>
  );
};
export default React.memo(ReduceOnlySwitch);
