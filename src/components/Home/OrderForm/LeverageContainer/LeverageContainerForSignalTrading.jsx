import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import { ORDERFORM_CONSTANTS } from "@/frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";
// import { changeLeverage } from "@/frontend-BL/redux/actions/Futures/SetLeverage.ac";
import { Box, Grid, Typography } from "@mui/material";
import React, { memo, useContext, useState } from "react";
import { useSelector } from "react-redux";
import BalanceLabel from "../BalanceLabel";
import OrderFormContext from "../OrderFormNewWrapper";
import LeverageSlider from "./LeverageSlider";
import MaximumBuyingPower from "./MaximumBuyingPower";

const LeverageContanier = () => {
  const selectedSymbol = useSelector((state) => state.selectSymbol.selectedSymbol);
  const [openLeverageModal, setOpenleverageModal] = useState(false);
  const leverageFromServer = useSelector((state) => state.positionsDirectory.leverage).find((item) => item.sym === selectedSymbol.toUpperCase());
  const { state, dispatchOrderEvent } = useContext(OrderFormContext);
  const handlePrimaryAction = () => {
    dispatchOrderEvent({ type: "UPDATE_LEVERAGE_DISABLE", payload: true });
    dispatchOrderEvent({ type: "UPDATE_LEVERAGE_ERROR", payload: "" });
    setOpenleverageModal(false);
  };
  const handleLeverageChange = (event) => {
    const value = event.target.value;
    dispatchOrderEvent({
      type: "UPDATE_LEVERAGE_FOR_SIGNAL_TRADING",
      payload: { leverage: value }
    });
    dispatchOrderEvent({ type: "UPDATE_LEVERAGE_DISABLE", payload: false });
  };
  return (
    <>
      <Box
        className="productTour__step5"
        sx={{
          cursor: "pointer",
          border: "1px solid",
          borderColor: "text.quaternary",
          p: 1,
          px: 2,
          borderRadius: "4px"
        }}
        id="orderForm-marginTypeChange-button"
        onClick={() => setOpenleverageModal(!openLeverageModal)}
      >
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item xs={12}>
            <Typography variant="Medium_12" textAlign={"center"} component={"h6"}>
              {state.leverageForSignalTrading}
              <Typography variant="Regular_10" id="leverage-value" component={"span"}>
                {" x"}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <CustomModal
        ContainerSx={{ maxWidth: { sm: "500px" } }}
        secondaryName={"Dismiss"}
        secondaryAction={() => setOpenleverageModal(false)}
        isSecondaryAction={true}
        primaryAction={handlePrimaryAction}
        isPrimaryAction={true}
        isClose={true}
        close={() => setOpenleverageModal(false)}
        IsOpen={openLeverageModal}
      >
        <Box>
          <Grid gap={1} rowSpacing={3} container>
            <Grid item xs={12}>
              {" "}
              <Typography id="Leverage-text" variant={"SemiBold_16"} component="p">
                {ORDERFORM_CONSTANTS.LEVERAGE_LABEL}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <LeverageSlider
                error={state.leverageError}
                isLeverageBtnDisabled={state.leverageDisable}
                handleLeverageChange={handleLeverageChange}
                leverage={state.leverageForSignalTrading}
                maxLeverage={Math.min(state.maxLeverage, 25)}
                // confirm_leverage_change={confirm_leverage_change}
              />
            </Grid>
            <Grid item xs={5.6}>
              <Box
                sx={{
                  height: "100%",
                  borderRadius: "4px",
                  p: 1,
                  backgroundColor: "background.default"
                }}
              >
                <BalanceLabel />
              </Box>
            </Grid>
            <Grid item xs={5.6}>
              <Box
                sx={{
                  borderRadius: "4px",
                  height: "100%",
                  p: 1,
                  backgroundColor: "background.default"
                }}
              >
                <MaximumBuyingPower id="maximum-buying-power-sl" leverage={Math.min(leverageFromServer?.leverage, 25)} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CustomModal>
    </>
  );
};

export default memo(LeverageContanier);
