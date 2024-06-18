import React from "react";
import { Box } from "@mui/material";
import WarningIcon from "../../assets/images/WarningIcon.svg";
import { STATUS_BODY_CONTAINER } from "../SignalTrading/Modals/Modals.styles";
import TextView from "../UI/TextView/TextView";

interface WarningModalWalletProps {
  heading: string;
  currentCurrency: string;
  amountToConvert: string;
  covertedAmount: string;
  fiatExchangeRateForUSDT: string;
}
const WarningModalWallet: React.FC<WarningModalWalletProps> = ({ heading, currentCurrency, amountToConvert, covertedAmount, fiatExchangeRateForUSDT }) => {
  return (
    <Box sx={STATUS_BODY_CONTAINER}>
      <img src={WarningIcon} width={"64px"} />
      <TextView variant="Medium_20" text={heading}></TextView>
      <TextView component={"span"} variant="Regular_14" color={"text.secondary"}>
        {"Are you sure you want to proceed with your request to exchange "}
        <TextView component={"span"} variant="Regular_14" color={"text.main"}>
          &nbsp;{`${amountToConvert} ${currentCurrency}`} &nbsp;
        </TextView>
        {" for "}
        <TextView component={"span"} variant="Regular_14" color={"text.main"}>
          &nbsp; {`${covertedAmount} ${currentCurrency === "INR" ? "USDT" : "INR"}`}&nbsp;{" "}
        </TextView>
        {` at a rate ${fiatExchangeRateForUSDT} INR/USDT`}
      </TextView>
    </Box>
  );
};

export default WarningModalWallet;
