import React, { useContext, useEffect } from "react";

import { Box, MenuItem, Select, Typography } from "@mui/material";
import { ORDERFORM_CONSTANTS } from "@/frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";
import OrderFormContext from "./OrderFormNewWrapper";

const OrderTypeTabs = () => {
  const { state, dispatchOrderEvent } = useContext(OrderFormContext);

  useEffect(() => {
    if (state.isSignalTrading) {
      dispatchOrderEvent({
        type: "UPDATE_ORDER_TYPE",
        payload: 1
      });
    }
  }, [state.isSignalTrading]);
  const TypeChange = (event) => {
    dispatchOrderEvent({
      type: "UPDATE_ORDER_TYPE",
      payload: event.target.value
    });
  };
  return (
    <Box sx={{ border: "1px solid black", borderRadius: "4px" }}>
      <Select
        id="orderForm-orderTypeChange-button"
        fullWidth
        defaultValue={state.OrderType}
        value={state.OrderType}
        onChange={TypeChange}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "background.default",
              backgroundImage: "none",
              borderRadius: "4px",
              "& .Mui-selected": {
                backgroundColor: "background.default",
                "&:hover": {
                  backgroundColor: "background.primary"
                }
              },
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "background.primary"
              },
              "& .MuiMenuItem-root": {
                padding: 1
              }
            }
          }
        }}
        sx={{
          backgroundColor: "background.default",
          border: "1px solid",
          minWidth: "60px",
          mx: 0,

          height: "30px"
        }}
      >
        {!state.isSignalTrading && (
          <MenuItem value={0}>
            {" "}
            <Typography id="orderForm-selectOption-market" variant="Regular_12">
              {" "}
              {ORDERFORM_CONSTANTS.MARKET_TYPE_LABEL}
            </Typography>
          </MenuItem>
        )}
        {
          <MenuItem value={1}>
            <Typography id="orderForm-selectOption-limit" variant="Regular_12">
              {" "}
              {ORDERFORM_CONSTANTS.LIMIT_TYPE_LABEL}
            </Typography>
          </MenuItem>
        }

        {!state.isSignalTrading && (
          <MenuItem value={2}>
            {" "}
            <Typography id="orderForm-selectOption-stopMarkett" variant="Regular_12">
              {" "}
              {ORDERFORM_CONSTANTS.STOP_MARKET_LABEL}
            </Typography>
          </MenuItem>
        )}
        {
          <MenuItem value={3}>
            <Typography id="orderForm-selectOption-stopLimit" variant="Regular_12">
              {" "}
              {ORDERFORM_CONSTANTS.STOP_LIMIT_LABEL}
            </Typography>
          </MenuItem>
        }
      </Select>
    </Box>
  );
};

export default OrderTypeTabs;
