import React from "react";
import CustomModal from "./CustomModal";
import { Box, Link } from "@mui/material";
import { STATUS_BODY_CONTAINER } from "@/components/SignalTrading/Modals/Modals.styles";
import WarningIcon from "../../../assets/images/WarningIcon.svg";
import TextView from "@/components/UI/TextView/TextView";
const PopUpWarningModal = ({ IsOpen, close, action }: { IsOpen: boolean; close: () => void; action: () => void }) => {
  const handlePrimaryAction = () => {
    action();
    close();
  };
  return (
    <CustomModal IsOpen={IsOpen} close={close} isClose={true} primaryAction={handlePrimaryAction} isPrimaryAction={true} primaryName={"Okay"}>
      <Box sx={STATUS_BODY_CONTAINER}>
        <img src={WarningIcon} width={"64px"} />
        <TextView variant="Medium_20" text={"Popup Blocker warning"}></TextView>
        <TextView
          variant="Regular_14"
          color={"text.secondary"}
          text={"To complete Aadhaar Verification, you will be redirected to a new page. Please ensure that popups are enabled for a seamless experience.Need help enabling popups? "}
        >
          <Link target="_blank" rel="noreferrer" href="https://support.google.com/chrome/answer/95472?hl=en&co=GENIE.Platform%3DDesktop">
            {"How to Enable popups"}
          </Link>
        </TextView>
      </Box>
    </CustomModal>
  );
};

export default PopUpWarningModal;
