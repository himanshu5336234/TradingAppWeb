import React, { useEffect, useState } from "react";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import OrderDetails from "./OrderDetails";
import { Box } from "@mui/material";
import OrderConfirmationBox from "../../CustomModals/OCOModals/OCO-New-Modals/Components/OrderConfirmationBox";
import TPSLSliderBox from "./TPSLSliderBox";
import AddTPSLInputModal from "./AddTPSLInputModal";
import { useDispatch } from "react-redux";
// import useTPSLForOCOOrders from "@/frontend-BL/businessHooks/ORDER_FORM/useTPSLFotOCOOrders";
import useTPSLForOCOOrders from "@/frontend-BL/businessHooks/ORDER_FORM/useTPSLForOCOOrders";
import { fetchSignalToBeDeleted } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";
import ActionWarningModal from "./ActionWarningModal";
import TextView from "@/components/UI/TextView/TextView";
import { selectedSymbol } from "@/frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
interface SignalDataProps {
  symbol: string;
  orderSide: string;
  SignalTPSL: any[];
  marginMode: string;
  leverage: number;
  orderPrice: number;
  orderStopPrice: number | null;
  signalId: string;
}

interface AddTPSLModalProps {
  IsOpen: boolean;
  setShowAddTPSLModal: React.Dispatch<React.SetStateAction<boolean>>;
  signalData: SignalDataProps;
  dispatchLatestListOfSignalsForAnalyst: () => void;
}
const AddTPSLModal: React.FC<AddTPSLModalProps> = ({ IsOpen, setShowAddTPSLModal, signalData, dispatchLatestListOfSignalsForAnalyst }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [actionWarning, setActionWarning] = useState({
    state: false,
    message: ""
  });
  // const dispatch = useDispatch();
  // dispatch(selectedSymbol(signalData.symbol.toUpperCase()));
  useEffect(() => {
    if (signalData.SignalTPSL.length > 0) {
      setActiveStep(0);
    } else {
      setActiveStep(1);
    }
  }, [signalData]);

  const TakeProfitStopLossEventHook = useTPSLForOCOOrders({
    side: signalData.orderSide,
    symbol: signalData.symbol.toUpperCase(),
    close: () => setShowAddTPSLModal(false),
    entryPrice: 0,
    size: 0,
    costValue: "0",
    isSignalTrading: true
  });

  const handleActionWarningModal = () => {
    setActionWarning({
      state: false,
      message: ""
    });
    setActiveStep(0);
  };

  const handleAddTPSLAction = () => {
    if (signalData.SignalTPSL.length >= 4) {
      setActionWarning({
        state: true,
        message: "You can place maximum 4 TP/SL Ordrs. You already have 4 TP/SL Orders."
      });
      return;
    }

    fetchSignalToBeDeleted(signalData.signalId).then((signal: any) => {
      const signalStatus = signal[0].status;
      if (signalStatus !== "TRIGGERED") {
        setActionWarning({
          state: true,
          message: "Signal has already been completed"
        });
      } else {
        TakeProfitStopLossEventHook.addNewTPSL(signalData.signalId, dispatchLatestListOfSignalsForAnalyst);
      }
    });
  };

  const getModalContent = () => {
    switch (activeStep) {
      case 0:
        return <TPSLSliderBox TPSLData={signalData?.SignalTPSL} entryPrice={signalData.orderPrice} side={signalData.orderSide} symbol={signalData.symbol} />;
      case 1:
        return <AddTPSLInputModal TakeProfitStopLossEventHook={TakeProfitStopLossEventHook} />;
      default:
        return (
          <OrderConfirmationBox
            side={signalData.orderSide}
            leverage={signalData.leverage}
            takeProfit={TakeProfitStopLossEventHook.takeProfitValue}
            stopLoss={TakeProfitStopLossEventHook.stopLossValue}
          />
        );
    }
  };

  const handleAddTPSL = () => {
    if (TakeProfitStopLossEventHook.handleTakeProfitStopLossValidation()) {
      setActiveStep(2);
    }
  };

  const handleAddTPSLBack = () => {
    if (signalData.SignalTPSL.length > 0) {
      setActiveStep(0);
    } else {
      setShowAddTPSLModal(false);
    }
  };
  const getActions = () => {
    switch (activeStep) {
      case 0:
        return {
          primaryName: "Add TP/SL",
          secondaryName: "Cancel",
          primaryAction: () => setActiveStep(1),
          secondaryAction: () => setShowAddTPSLModal(false)
        };
      case 1:
        return {
          primaryName: "Continue",
          secondaryName: "Cancel",
          primaryAction: () => handleAddTPSL(),
          secondaryAction: () => handleAddTPSLBack()
        };
      default:
        return {
          primaryName: "Confirm Order",
          secondaryName: "Cancel",
          primaryAction: () => handleAddTPSLAction(),
          secondaryAction: () => setActiveStep(1)
        };
    }
  };

  const { primaryAction, primaryName, secondaryName, secondaryAction } = getActions();
  return (
    <CustomModal
      IsOpen={IsOpen}
      isPrimaryAction={true}
      isSecondaryAction={true}
      primaryName={primaryName}
      secondaryName={secondaryName}
      close={() => setShowAddTPSLModal(false)}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      isDisabled={TakeProfitStopLossEventHook.loading}
      isloading={TakeProfitStopLossEventHook.loading}
    >
      <Box p={2}>
        <TextView variant={"Medium_16"}>
          {"Take Profit/ Stop Loss-"}
          <TextView component={"span"} color={"text.secondary"}>
            {"Position"}
          </TextView>
        </TextView>
        <OrderDetails
          modalType={""}
          showTriggerPrice={signalData.orderStopPrice ? true : false}
          symbol={signalData.symbol}
          marginMode={signalData.marginMode}
          leverage={signalData.leverage}
          triggerPrice={signalData.orderStopPrice}
          limitPrice={signalData.orderPrice}
          side={signalData.orderSide}
        />
        {getModalContent()}
      </Box>
      {actionWarning.state && (
        <ActionWarningModal
          IsOpen={actionWarning.state}
          handleShowDeletionModal={handleActionWarningModal}
          dispatchLatestListOfSignalsForAnalyst={dispatchLatestListOfSignalsForAnalyst}
          showDeleteWarning={actionWarning}
        />
      )}
    </CustomModal>
  );
};

export default AddTPSLModal;
