import { Box, ToggleButton, ToggleButtonGroup, useMediaQuery } from "@mui/material";
import NewModal from "@/components/CustomModals/newModal/CustomModal";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNewBuyModal } from "BL/businessHooks/WALLET/useNewBuyModal";
import INRConversionContent from "./INRConversionContent";
import { CONVERSION_TOGGLE_BUTTON_WRAPPER } from "@/pages/UserProfile/Wallet/styles";
import { CONVERSION_TOGGLE_BUTTON_GROUP } from "../TransactionHistory/Styled";
import USDTConversionContent from "./USDTConversionContent";
import { useNewSellModal } from "@/frontend-BL/businessHooks/WALLET/useNewSellModal";
import { USER_SETTING_TABS } from "@/pages/UserProfile/Constants";
import { useNavigate } from "react-router-dom";

const CurrencyConverter = ({ currentTab, isOpen, close, setSelectedWalletTab }) => {
  const {
    showINRConversionStep,
    handleINRConversionSubmit,
    INRConversionHelperText,
    INRConversionAmount,
    conversionRateforUSDT,
    handleMaxClickForInr,
    INRtoUSDT,
    callfiatBuyUsdtAPI,
    primaryINRActionName,
    loadingUsdtBuy,
    setShowINRConversionStep
  } = useNewBuyModal();
  const {
    showUSDTConversionStep,
    USDTConversionHelperText,
    SubmitUSDTConversionFormData,
    USDTConversionAmount,
    primaryUSDTActionName,
    USDTTOINR,
    handleMaxClickForUsdt,
    conversionRateforINR,
    callSellUsdtAPI,
    loadingUsdtSell,
    setShowUSDTConversionStep
  } = useNewSellModal();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [selectedToggle, setSelectedToggle] = useState(currentTab);
  const handleToggle = (event, toggleValue) => {
    if (toggleValue !== null) setSelectedToggle(toggleValue);
  };
  const handleConversionModalSecondaryAction = () => {
    close();
    if (selectedToggle === "INRTOUSDT") {
      setShowINRConversionStep("");
    } else {
      setShowUSDTConversionStep("");
    }
  };
  const handleConversionModalPrimaryActions = () => {
    if (selectedToggle === "INRTOUSDT") {
      return showINRConversionStep === "confirm" ? callfiatBuyUsdtAPI() : handleINRConversionSubmit();
    } else {
      return showUSDTConversionStep === "confirm" ? callSellUsdtAPI() : SubmitUSDTConversionFormData();
    }
  };

  const handleAddFunds = () => {
    if (isDesktop) {
      navigate(USER_SETTING_TABS.DEPOSIT_WALLET.route, { state: { currentTab: USER_SETTING_TABS.DEPOSIT_WALLET } });
    } else {
      setSelectedWalletTab("inrDeposit");
    }
  };

  return (
    <NewModal
      IsOpen={isOpen}
      close={handleConversionModalSecondaryAction}
      isClose={false}
      isPrimaryAction={selectedToggle === "INRTOUSDT" ? showINRConversionStep !== "success" : showUSDTConversionStep !== "success"}
      isSecondaryAction={selectedToggle === "INRTOUSDT" ? showINRConversionStep !== "success" : showUSDTConversionStep !== "success"}
      primaryName={selectedToggle === "INRTOUSDT" ? primaryINRActionName : primaryUSDTActionName}
      primaryAction={handleConversionModalPrimaryActions}
      primaryDisabled={selectedToggle === "INRTOUSDT" ? Boolean(INRConversionHelperText) : Boolean(USDTConversionHelperText)}
      secondaryAction={handleConversionModalSecondaryAction}
      secondaryName={"Cancel"}
      isloading={loadingUsdtBuy || loadingUsdtSell}
    >
      {showINRConversionStep === "" && showUSDTConversionStep === "" && (
        <Box sx={CONVERSION_TOGGLE_BUTTON_WRAPPER}>
          <ToggleButtonGroup sx={CONVERSION_TOGGLE_BUTTON_GROUP} value={selectedToggle} exclusive onChange={handleToggle} aria-label="text alignment">
            <ToggleButton variant="main" value={"INRTOUSDT"} aria-label="left aligned" sx={{ marginRight: "2px" }}>
              {"INR to USDT"}
            </ToggleButton>

            <ToggleButton variant="main" value={"USDTTOINR"} aria-label="centered">
              {"USDT to INR"}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}
      {selectedToggle === "INRTOUSDT" && (
        <INRConversionContent
          INRConversionAmount={INRConversionAmount}
          conversionRateforUSDT={conversionRateforUSDT}
          handleMaxClickForInr={handleMaxClickForInr}
          INRtoUSDT={INRtoUSDT}
          showINRConversionStep={showINRConversionStep}
          INRConversionHelperText={INRConversionHelperText}
          handleAddFunds={handleAddFunds}
        />
      )}
      {selectedToggle === "USDTTOINR" && (
        <USDTConversionContent
          USDTTOINR={USDTTOINR}
          handleMaxClickForUsdt={handleMaxClickForUsdt}
          showUSDTConversionStep={showUSDTConversionStep}
          USDTConversionHelperText={USDTConversionHelperText}
          USDTConversionAmount={USDTConversionAmount}
          conversionRateforINR={conversionRateforINR}
          handleAddFunds={handleAddFunds}
        />
      )}
    </NewModal>
  );
};

export default CurrencyConverter;
CurrencyConverter.propTypes = {
  currentTab: PropTypes.string,
  isOpen: PropTypes.bool,
  close: PropTypes.object,
  setSelectedWalletTab: PropTypes.func
};
