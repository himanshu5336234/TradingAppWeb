import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import React, { useCallback } from "react";
import { Typography, Box, Grid } from "@mui/material";
import OrderDetails from "./OrderDetails";
import ChildOrdersEditTPSL from "./ChildOrderEditTPSL";
import { useSelector } from "react-redux";
interface EditTPSLModalProps {
  IsOpen: boolean;
  setShowEditTPSLModal: React.Dispatch<React.SetStateAction<boolean>>;
  signalData: any;
  dispatchLatestListOfSignalsForAnalyst: Function;
}
const EditTPSLModal: React.FC<EditTPSLModalProps> = ({ IsOpen, setShowEditTPSLModal, signalData, dispatchLatestListOfSignalsForAnalyst }) => {
  const tradableSymbolList = useSelector((state: any) => state.tradablesymbolList.tradablesymbolList);
  const selectedSymbolDetails = tradableSymbolList?.filter((listedSymbol: any) => listedSymbol.symbol.toUpperCase() === signalData.symbol.toUpperCase());
  const pricePrecisionValue = selectedSymbolDetails[0]?.pricePrecision;

  const convertToPrecisionValueInPricePrecisionUnit = useCallback(
    (value: any) => {
      return Math.round(parseFloat(value) * Math.pow(10, pricePrecisionValue)) / Math.pow(10, pricePrecisionValue);
    },
    [pricePrecisionValue]
  );
  return (
    <CustomModal
      IsOpen={IsOpen}
      isPrimaryAction={false}
      isSecondaryAction={true}
      secondaryName={"Close"}
      secondaryAction={() => setShowEditTPSLModal(false)}
      ContainerSx={{
        maxWidth: { lg: "780px", sm: "700px", xs: "350px" }
      }}
    >
      <Box p={2}>
        <Typography variant={"Medium_16"}>
          {"Take Profit/ Stop Loss-"}
          <Typography component={"span"} color={"text.secondary"}>
            {"Position"}
          </Typography>
        </Typography>
        <OrderDetails
          symbol={signalData.symbol}
          marginMode={signalData.marginMode.includes("ISOLATED") ? "Isolated" : "Cross"}
          leverage={signalData.leverage}
          triggerPrice={signalData?.orderStopPrice}
          limitPrice={signalData?.orderPrice}
          side={signalData.orderSide}
        />
        <Grid container item xs={12} justifyContent={"center"} gap={2}>
          <ChildOrdersEditTPSL
            side={signalData.orderSide}
            symbol={signalData.symbol}
            limitPrice={signalData.orderPrice} // Updated to a number
            triggerPrice={signalData?.takeProfitStopPrice}
            signalId={signalData.signalId}
            setShowEditTPSLModal={setShowEditTPSLModal}
            dispatchLatestListOfSignalsForAnalyst={dispatchLatestListOfSignalsForAnalyst}
            convertToPrecisionValueInPricePrecisionUnit={convertToPrecisionValueInPricePrecisionUnit}
            type={"TP"}
            stopLossOrTakeProfitPrice={signalData?.stopLossStopPrice}
          />
          <ChildOrdersEditTPSL
            side={signalData.orderSide}
            symbol={signalData.symbol}
            limitPrice={signalData.orderPrice} // Updated to a number
            triggerPrice={signalData?.stopLossStopPrice}
            signalId={signalData.signalId}
            setShowEditTPSLModal={setShowEditTPSLModal}
            dispatchLatestListOfSignalsForAnalyst={dispatchLatestListOfSignalsForAnalyst}
            convertToPrecisionValueInPricePrecisionUnit={convertToPrecisionValueInPricePrecisionUnit}
            type={"SL"}
            stopLossOrTakeProfitPrice={signalData?.takeProfitStopPrice}
          />
        </Grid>
      </Box>
    </CustomModal>
  );
};

export default EditTPSLModal;
