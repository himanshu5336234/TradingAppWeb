import React, { useContext, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { ORDERFORM_CONSTANTS } from "BL/businessHooks/ORDER_FORM/Constants/Orderform_const";
import { Box } from "@mui/material";

import OrderFormContext from "./OrderFormNewWrapper";
const BuySellToggle = () => {
  const { state, dispatchOrderEvent } = useContext(OrderFormContext);
  // useEffect(() => {
  //   if (Side) {
  //     SideChange({ target: { value: Side } });
  //   }
  // }, [Side]);
  console.log("rerender");
  const SideChange = (event: { target: any }) => {
    const { value } = event.target;
    if (value) {
      dispatchOrderEvent({ type: "UPDATE_SIDE", payload: value });
    }

    //  setShowOrderForm({ expand: false, side: event.target.value });
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      border: 0,
      "&.Mui-disabled": {
        border: 0
      },
      "&:not(:first-of-type)": {
        borderRadius: theme.shape.borderRadius
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius
      }
    }
  }));
  return (
    <Box className="productTour__step2" sx={{ backgroundColor: "neutral.grey2", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "45px",
          width: "96%"
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          exclusive
          id="orderForm-buySellToggle-button"
          onClick={SideChange}
          value={state.side}
          sx={{
            width: "100%",
            backgroundColor: "background.default"
          }}
          aria-label="text alignment"
        >
          <ToggleButton id="buyLong-btn" variant="success" value="BUY" sx={{ width: "50%", textTransform: "capitalize" }}>
            {ORDERFORM_CONSTANTS.BUY_LONG_LABEL}
          </ToggleButton>
          <ToggleButton id="sellSort-btn" variant="failed" value="SELL" sx={{ width: "50%", textTransform: "capitalize" }}>
            {ORDERFORM_CONSTANTS.SELL_SHORT_LABEL}
          </ToggleButton>
        </StyledToggleButtonGroup>
        {/* {!showOrderForm.expand && (
          <ExpandMoreIcon
            onClick={() => {
              setShowOrderForm({
                expand: !showOrderForm.expand,
                side: showOrderForm.side
              });
              localStorage.setItem("showOrderForm", true);
            }}
            sx={{
              cursor: "pointer",
              width: { sm: 24, xs: 20 },
              height: { sm: 24, xs: 20 }
            }}
          />
        )} */}
        {/* {showOrderForm.expand && (
          <ExpandLessIcon
            onClick={() => {
              localStorage.setItem("showOrderForm", false);
              setShowOrderForm({
                expand: !showOrderForm.expand,
                side: showOrderForm.side
              });
            }}
            sx={{
              cursor: "pointer",
              width: { sm: 24, xs: 20 },
              height: { sm: 24, xs: 20 }
            }}
          />
        )} */}
      </Box>
    </Box>
  );
};

BuySellToggle.propTypes = {
  showOrderForm: PropTypes.object,
  setShowOrderForm: PropTypes.func,
  handleSideChange: PropTypes.func,
  Side: PropTypes.string
};

export default React.memo(BuySellToggle);
