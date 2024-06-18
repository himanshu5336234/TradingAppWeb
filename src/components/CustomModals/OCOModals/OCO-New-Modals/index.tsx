import React from "react";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import OrderDetails from "./Components/OrderDetails";
import { Box, Typography } from "@mui/material";
import OrderConfirmationBox from "./Components/OrderConfirmationBox";
// import TPSLSliderBox from "./Components/TPSLBox";
import AddTPSLInputModal from "./Components/AddTPSLInputModal";
import useTPSLForOCOOrders from "@/frontend-BL/businessHooks/ORDER_FORM/useTPSLForOCOOrders";
import { useSelector } from "react-redux";
// import IndividualOrders from "./Components/IndividualOrders";
import StrategyOrdersComponent from "./Components/StrategyOrdersComponent";
import StatusBody from "@/components/SignalTrading/Modals/StatusBody";
interface IsolatedWallet {
  isolatedWallet: any;
}

interface AddTPSLModalProps {
  IsOpen: boolean;
  setShowOCOModal: React.Dispatch<React.SetStateAction<boolean>>;
  symbol: string;
  leverage: number;
  entryPrice: number;
  side: "BUY" | "SELL";
  type: number;
  isIsolated: boolean;
  sizeInContractAsset: number;
  quantityValue: number;
  isolatedWallet: IsolatedWallet;
}
const index: React.FC<AddTPSLModalProps> = ({
  IsOpen,
  setShowOCOModal,
  symbol,
  leverage,
  entryPrice,
  side,
  // type,
  isIsolated,
  sizeInContractAsset,
  // quantityValue,
  isolatedWallet
}) => {
  const crossWalletDetails = useSelector((state: any) => state.positionsDirectory.crossWalletDetails.find((data: any) => data.symbol === symbol));
  const costVal = !isIsolated ? crossWalletDetails?.initialMargin : isolatedWallet?.isolatedWallet;
  // console.log(!isIsolated,crossWalletDetails, crossWalletDetails?.initialMargin, "value of price", costVal);

  const TakeProfitStopLossEventHook = useTPSLForOCOOrders({
    symbol,
    side,
    entryPrice,
    costValue: costVal,
    size: sizeInContractAsset,
    close: () => setShowOCOModal(false),
    isSignalTrading: false
  });
  const getModalContent = () => {
    switch (TakeProfitStopLossEventHook.activeStep) {
      case 0:
        // return <TPSLSliderBox strategyOrders={TakeProfitStopLossEventHook.strategyOrders.ocoOrders} />;
        return (
          <StrategyOrdersComponent
            side={side}
            index={TakeProfitStopLossEventHook.index}
            setIndex={TakeProfitStopLossEventHook.setIndex}
            entryPrice={entryPrice}
            symbol={symbol}
            strategyOrders={TakeProfitStopLossEventHook.strategyOrders}
            setActiveStep={TakeProfitStopLossEventHook.setActiveStep}
            cancelOrder={TakeProfitStopLossEventHook.cancelOrder}
          />
        );
      case 1:
        return <AddTPSLInputModal TakeProfitStopLossEventHook={TakeProfitStopLossEventHook} />;
      case 2:
        return <OrderConfirmationBox leverage={leverage} side={side} takeProfit={TakeProfitStopLossEventHook.takeProfitValue} stopLoss={TakeProfitStopLossEventHook.stopLossValue} />;
      case 3:
        return <StatusBody status={"WARNING"} heading={"Are you sure?"} message={"It will cancel all existing TP/SL and OCO orders on this Order. Exercise caution before confirming."} />;
      case 4:
        return <StatusBody status={"WARNING"} heading={"Are you sure?"} message={"It will cancel selected child orders on this Order. Exercise caution before confirming."} />;
      default:
        return <StatusBody status={"WARNING"} heading={"Are you sure?"} message={"It will cancel your new TP/SL order, and no order will be placed. Exercise caution before confirming."} />;
    }
  };

  const IsPrimaryDisabled = () => {
    let disabled = false;
    if (TakeProfitStopLossEventHook.activeStep === 2) {
      if (TakeProfitStopLossEventHook.takeProfit.length <= 0 && TakeProfitStopLossEventHook.stopLoss.length <= 0) {
        disabled = true;
      }
    }
    return disabled;
  };

  const { primaryAction, primaryName, secondaryName, secondaryAction } = TakeProfitStopLossEventHook.getActions();
  return (
    <CustomModal
      IsOpen={IsOpen}
      isPrimaryAction={true}
      isSecondaryAction={true}
      primaryName={primaryName}
      secondaryName={secondaryName}
      close={() => setShowOCOModal(false)}
      isClose={true}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      primaryDisabled={IsPrimaryDisabled() || TakeProfitStopLossEventHook.loading}
      isloading={TakeProfitStopLossEventHook.loading}
      ContainerSx={{ maxWidth: { xs: TakeProfitStopLossEventHook.activeStep <= 2 ? "660px" : "450px" } }}
      secondaryButtonSX={{
        maxWidth: "150px"
      }}
    >
      <Box pt={3}>
        {(TakeProfitStopLossEventHook.activeStep === 0 || TakeProfitStopLossEventHook.activeStep === 1 || TakeProfitStopLossEventHook.activeStep === 2) && (
          <>
            <Typography variant={"Medium_16"}>
              {"Take Profit / Stop Loss - "}
              <Typography component={"span"} color={"text.regular"}>
                {"Position"}
              </Typography>
            </Typography>
            <OrderDetails
              symbol={symbol}
              marginMode={isIsolated ? "ISOLATED" : "CROSS"}
              leverage={leverage}
              showTriggerPrice={false}
              modalType=""
              triggerPrice={0}
              entryPrice={entryPrice}
              side={side}
            />{" "}
          </>
        )}
        <Box
          my={2}
          sx={{
            overflow: "hidden",
            overflowY: "scroll"
          }}
        >
          {getModalContent()}
        </Box>

        <Typography component={"p"} variant="Regular_12">
          Note This setting applies to the entire position. This will place a One Cancels Other (OCO) order.
        </Typography>
      </Box>
    </CustomModal>
  );
};

export default index;
