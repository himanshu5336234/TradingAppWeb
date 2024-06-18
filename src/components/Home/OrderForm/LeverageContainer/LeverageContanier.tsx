import { LeverageToolTip } from "@/assets/strings/tooltip.string";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import TextView from "@/components/UI/TextView/TextView";
import { ORDERFORM_CONSTANTS } from "@/frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";
import { changeLeverage } from "@/frontend-BL/redux/actions/Futures/SetLeverage.ac";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import React, { memo, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BalanceLabel from "../BalanceLabel";
import OrderFormContext from "../OrderFormNewWrapper";
import LeverageSlider from "./LeverageSlider";
import MaximumBuyingPower from "./MaximumBuyingPower";

const LeverageContanier = () => {
  const dispatch = useDispatch();
  const selectedSymbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  const [openLeverageModal, setOpenleverageModal] = useState(false);
  const leverageFromServer = useSelector((state: any) => state.positionsDirectory.leverage).find((item: { sym: any }) => item.sym === selectedSymbol.toUpperCase());
  const [leverage, setLeverage] = useState(1);
  const { state, dispatchOrderEvent } = useContext(OrderFormContext);
  useEffect(() => {
    if (leverageFromServer?.leverage) {
      setLeverage(Number(leverageFromServer?.leverage));
    }
  }, [leverageFromServer?.leverage]);

  const handleLeverageChange = (event: { target: any }) => {
    const value = event.target.value;
    setLeverage(value);
    dispatchOrderEvent({ type: "UPDATE_LEVERAGE_DISABLE", payload: false });
  };
  const errorCallBack = (error: any) => {
    dispatchOrderEvent({ type: "UPDATE_LEVERAGE_ERROR", payload: error });
    dispatchOrderEvent({ type: "UPDATE_LEVERAGE_DISABLE", payload: false });
  };
  const successCallBack = () => {
    dispatchOrderEvent({ type: "UPDATE_LEVERAGE_DISABLE", payload: true });
    setOpenleverageModal(false);
  };
  const confirm_leverage_change = () => {
    dispatch(changeLeverage(selectedSymbol.toUpperCase(), Number(leverage), errorCallBack, successCallBack));
  };

  return (
    <>
      <Box
        className="productTour__step5"
        sx={{
          cursor: "pointer",
          boxShadow: " 0px 0px 1px 0.1px #b1b1ba",

          borderRadius: "2.5px"
        }}
        id="orderForm-marginTypeChange-button"
        onClick={() => {
          setOpenleverageModal(!openLeverageModal);
        }}
      >
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item xs={12}>
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
              title={<TextView text={LeverageToolTip} />}
            >
              <TextView style={{ m: 0.6 }} variant="Medium_12" textAlign={"center"} component={"h6"}>
                {leverage}
                <TextView variant="Regular_10" component={"span"}>
                  {" x"}
                </TextView>
              </TextView>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
      <CustomModal
        ContainerSx={{ maxWidth: { sm: "500px", xs: "320px" } }}
        secondaryName={"Dismiss"}
        secondaryAction={() => {
          handleLeverageChange({
            target: { value: leverageFromServer?.leverage }
          });
          successCallBack();
        }}
        isSecondaryAction={true}
        isDisabled={state.leverageDisable}
        primaryAction={confirm_leverage_change}
        isPrimaryAction={true}
        isClose={true}
        close={() => {
          handleLeverageChange({
            target: { value: leverageFromServer?.leverage }
          });
          successCallBack();
        }}
        IsOpen={openLeverageModal}
      >
        <Box>
          <Grid gap={1} rowSpacing={3} container>
            <Grid item xs={12}>
              <Typography id="Leverage-text" variant={"SemiBold_16"} component="p">
                {ORDERFORM_CONSTANTS.LEVERAGE_LABEL}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <LeverageSlider handleLeverageChange={handleLeverageChange} leverage={leverage} maxLeverage={state.maxLeverage} confirm_leverage_change={confirm_leverage_change} />
              <Typography color={"#EBB62F"} sx={{ textTransform: "capitalize" }} variant="Regular_12">
                {state.leverageError}
              </Typography>
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
                <MaximumBuyingPower id="maximum-buying-power-leverage" alignment={"vertical"} leverage={leverage ?? 10} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CustomModal>
    </>
  );
};

export default memo(LeverageContanier);
