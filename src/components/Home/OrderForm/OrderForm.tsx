import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import OrderTypeTabs from "./OrderTypeTabs";
import BalanceLabel from "./BalanceLabel";
import OrderformSubmit from "./OrderformSubmit";
import { ORDERfORM } from "./style";
import MarginTypeButton from "./MarginTypeButton";
import { OrderFormNewWrapper } from "./OrderFormNewWrapper";
import TakeProfitStopLoss from "./TakeProfitStopLoss/TakeProfitStopLoss";
import QuantityLimitTriggerFieldWrapper from "./QuantityLimitTriggerFieldWrapper/QuantityLimitTriggerFieldWrapper";
import LeverageContanier from "./LeverageContainer";

import LockedOutScreen from "./LockedOutScreen";
import SignalTradingSwicth from "./SignalTradingSwicth";
import CustomDivider from "../../UI/Divider/CustomDivider";
import BuySellToggle from "./BuySellToggle";

function OrderForm() {

  return (
    <OrderFormNewWrapper>
      <Box sx={[ORDERfORM]}>
        <Box>
          <Grid container gap={0.5} justifyContent={"space-between"} alignItems={"center"}>
            <BuySellToggle />
            <Grid container gap={0.5} alignItems={"center"} justifyContent={"space-between"} item>
              <BalanceLabel />
            </Grid>
            <Grid xs={2.5} item>
              <LeverageContanier />
            </Grid>
            <Grid xs={3.5} item>
              <Box className="productTour__step3">
                <MarginTypeButton />
              </Box>
            </Grid>
            <Grid item xs={5.2}>
              <Box className="productTour__step4">
                <OrderTypeTabs />
              </Box>
            </Grid>
            <Grid item xs={6.2}>
              <Box className="productTour__step4">
                <SignalTradingSwicth />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <CustomDivider alignment={""} />
        <Box height={"calc(100% - 200px)"} sx={{ position: "relative" }}>
          <Box height={"calc(100%)"} overflow={"auto"}>
            <Box sx={{ height: "400px" }}>
              <Grid item xs={12} gap={1} justifyContent={"space-between"} container>
                <QuantityLimitTriggerFieldWrapper />

                <Grid container item justifyContent={"space-between"} gap={1} xs={12}>
                  <TakeProfitStopLoss />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <LockedOutScreen />
          <div>
            <OrderformSubmit />
          </div>
        </Box>
        <OrderformSubmit />
      </Box>
    </OrderFormNewWrapper>
  );
}
OrderForm.propTypes = {
  isMobile: PropTypes.bool,
  Side: PropTypes.string,
  auxiliaryHelpers: PropTypes.object
};
export default React.memo(OrderForm);
