import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import React, { useState } from "react";
import StatusBody from "@/components/SignalTrading/Modals/StatusBody";
import { Box } from "@mui/material";
import ChildOrdersComponents from "./Components/ChildOrdersComponents";
import { useDispatch } from "react-redux";
import { cancelAllStrategyOrders } from "@/frontend-BL/businessHooks/ORDER_FORM/StrategyOrdersHelper";
interface ParentOrderProps {
  ID: string;
  symbol: string;
}
interface ActiveModalProps {
  parentOrder: ParentOrderProps;
  TPOrder: object;
  SLOrder: object;
}
interface OTOCOModalProps {
  IsOpen: boolean;
  close: Function;
  activeModalData: ActiveModalProps;
}
const index: React.FC<OTOCOModalProps> = ({ IsOpen, close, activeModalData }) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const getModalData = () => {
    if (activeStep === 0) return <ChildOrdersComponents activeModalData={activeModalData} close={() => close()} />;
    else return <StatusBody status={"WARNING"} heading={"Are you sure?"} message={"It will cancel all existing TP/SL and OCO orders on this Order. Exercise caution before confirming."} />;
  };

  const getPrimaryAction = () => {
    if (activeStep === 0) {
      return () => setActiveStep(1);
    } else return () => cancelAllStrategyOrders({ activeModalData, close, dispatch, setLoading });
  };
  return (
    <CustomModal
      IsOpen={IsOpen}
      isPrimaryAction={true}
      isSecondaryAction={activeStep === 0 ? false : true}
      isClose={true}
      isDisabled={loading}
      isloading={loading}
      close={() => close()}
      primaryName={activeStep === 0 ? "Cancel All" : "Yes, I am sure"}
      primaryAction={getPrimaryAction()}
      secondaryName={"Dismiss"}
      secondaryAction={() => setActiveStep(0)}
      ContainerSx={{
        maxWidth: { xs: activeStep === 0 ? "650px" : "450px" }
      }}
    >
      <Box>{getModalData()}</Box>
    </CustomModal>
  );
};

export default index;
