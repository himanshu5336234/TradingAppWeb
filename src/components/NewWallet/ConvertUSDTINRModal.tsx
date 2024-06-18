import React, { useState } from "react";
import CustomModal from "../CustomModals/newModal/CustomModal";
import { Box, Grid } from "@mui/material";
import InrUsdtToggle from "./InrUsdtToggle";
import { useNewBuyModal } from "@/frontend-BL/businessHooks/WALLET/useNewBuyModal";
import { useNewSellModal } from "@/frontend-BL/businessHooks/WALLET/useNewSellModal";
import InrToUSDTContent from "./InrToUSDTContent";
import UsdtToInrContent from "./UsdtToInrContent";
import TextView from "../UI/TextView/TextView";

interface ComponentProps {
  IsOpen: boolean;
  setShowConversionModal: (val: boolean) => void;
  fiatExchangeRateForUSDT: string;
}

const ConvertUSDTINRModal: React.FC<ComponentProps> = ({ IsOpen, setShowConversionModal, fiatExchangeRateForUSDT }) => {
  const [currentCurrency, setCurrentCurrency] = useState("INR");

  const {
    callfiatBuyUsdtAPI,
    INRConversionAmount,
    handleMaxClickForInr,
    INRtoUSDT,
    showINRConversionStep,
    setShowINRConversionStep,
    handleINRConversionSubmit,
    INRConversionHelperText,
    conversionRateforUSDT
  } = useNewBuyModal();
  const {
    callSellUsdtAPI,
    USDTConversionAmount,
    handleMaxClickForUsdt,
    USDTTOINR,
    showUSDTConversionStep,
    setShowUSDTConversionStep,
    SubmitUSDTConversionFormData,
    USDTConversionHelperText,
    conversionRateforINR
  } = useNewSellModal();

  const getActions = () => {
    switch (currentCurrency === "INR" ? showINRConversionStep : showUSDTConversionStep) {
      case "confirm":
        return {
          primaryName: "Confirm",
          secondaryName: "Dismiss",
          primaryAction: () => handleConvertAction(),
          secondaryAction: () => (currentCurrency === "INR" ? setShowINRConversionStep("main") : setShowUSDTConversionStep("main"))
        };
      case "success":
        return {
          primaryName: "Okay",
          secondaryName: "",
          primaryAction: () => setShowConversionModal(false),
          secondaryAction: () => {
            return;
          }
        };
      default:
        return {
          primaryName: "Convert",
          secondaryName: "Dismiss",
          primaryAction: () => (currentCurrency === "INR" ? handleINRConversionSubmit() : SubmitUSDTConversionFormData()),
          secondaryAction: () => setShowConversionModal(false)
        };
    }
  };
  const handleCurrencyChange = (e: any) => {
    setCurrentCurrency(e.target.value);
  };

  const handleConvertAction = () => {
    if (currentCurrency === "INR") {
      callfiatBuyUsdtAPI();
    } else if (currentCurrency === "USDT") {
      callSellUsdtAPI();
    }
  };

  const { primaryAction, primaryName, secondaryAction, secondaryName } = getActions();

  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      close={() => setShowConversionModal(false)}
      isPrimaryAction={true}
      isSecondaryAction={(currentCurrency === "INR" && showINRConversionStep !== "success") || (currentCurrency === "USDT" && showUSDTConversionStep !== "success") ? true : false}
      secondaryName={secondaryName}
      primaryName={primaryName}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
    >
      {((currentCurrency === "INR" && showINRConversionStep === "main") || (currentCurrency === "USDT" && showUSDTConversionStep === "main")) && (
        <Box px={4}>
          <InrUsdtToggle currentCurrency={currentCurrency} handleCurrencyChange={handleCurrencyChange} />
        </Box>
      )}
      <Box p={3}>
        <Grid container mt={1} gap={1}>
          {currentCurrency === "INR" ? (
            <InrToUSDTContent
              INRConversionAmount={INRConversionAmount}
              handleMaxClickForInr={handleMaxClickForInr}
              INRtoUSDT={INRtoUSDT}
              activeStep={showINRConversionStep}
              INRConversionHelperText={INRConversionHelperText}
              fiatExchangeRateForUSDT={conversionRateforUSDT}
            />
          ) : (
            <UsdtToInrContent
              USDTConversionAmount={USDTConversionAmount}
              handleMaxClickForUsdt={handleMaxClickForUsdt}
              USDTTOINR={USDTTOINR}
              activeStep={showUSDTConversionStep}
              USDTConversionHelperText={USDTConversionHelperText}
              fiatExchangeRateForUSDT={conversionRateforINR}
            />
          )}
        </Grid>
      </Box>
    </CustomModal>
  );
};

export default ConvertUSDTINRModal;
