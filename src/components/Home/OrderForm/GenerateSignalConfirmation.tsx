import React from "react";
import CustomModal from "../../CustomModals/newModal/CustomModal";
import { Box, Grid, Typography } from "@mui/material";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import { useSelector } from "react-redux";
import BuySellTab from "../../SignalTrading/BuySellTab";

interface OrderDetailsData {
  OrderType: number;
  side: "BUY" | "SELL";
  takeProfit: string;
  stopLoss: string;
  limitPrice: string;
  triggerPrice: string;
  leverageForSignalTrading: number;
}

interface ComponentProps {
  IsOpen: boolean;
  setShowLoader: Function;
  showLoader: boolean;
  generateSignal: Function;
  orderDetails: OrderDetailsData;
  setGenerateConfirmModal: Function;
}

const GenerateSignalConfirmation: React.FC<ComponentProps> = ({ IsOpen, orderDetails, setGenerateConfirmModal, showLoader, generateSignal, setShowLoader }) => {
  const selectedSymbol = useSelector((state: any) => state.selectSymbol.selectedSymbol).toUpperCase();

  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      primaryDisabled={showLoader}
      isPrimaryAction={true}
      primaryName={"Generate Signal"}
      isSecondaryAction={true}
      secondaryName={"Dismiss"}
      title={"Generate Signal Cofirmation"}
      primaryAction={() => generateSignal()}
      secondaryAction={() => {
        setShowLoader(false);
        setGenerateConfirmModal(false);
      }}
      close={() => {
        setShowLoader(false);
        setGenerateConfirmModal(false);
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
              Order Type
            </Typography>
            <Typography variant="Medium_14">{orderDetails.OrderType === 1 ? "LIMIT" : "STOP LIMIT"}</Typography>
          </Grid>
          <Grid container item xs={12} justifyContent="space-between">
            <Typography color={"text.regular"} variant="Medium_12">
              Leverage
            </Typography>
            <Typography variant="Medium_14">
              {orderDetails.leverageForSignalTrading}
              {"X"}
            </Typography>
          </Grid>

          <Grid container item xs={12} justifyContent="space-between">
            <Typography color={"text.regular"} variant="Medium_12">
              {"Limit Price"}
            </Typography>
            <Typography variant="Medium_14">{orderDetails.limitPrice}</Typography>
          </Grid>
          {orderDetails.type === 3 && (
            <Grid container item xs={12} justifyContent="space-between">
              <Typography color={"text.regular"} variant="Medium_12">
                {"Trigger Price"}
              </Typography>
              <Typography variant="Medium_14">{orderDetails.triggerPrice}</Typography>
            </Grid>
          )}
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
    </CustomModal>
  );
};

export default GenerateSignalConfirmation;
