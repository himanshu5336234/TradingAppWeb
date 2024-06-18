import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox } from "@mui/material";

import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import TextView from "@/components/UI/TextView/TextView";

import WarningDeleteKeyAsset from "@/assets/icons/WarningDeleteKeyAPIManagement.svg";

import { createOTP } from "@/frontend-api-service/Api";

interface ComponentProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  setDeleteKeyOTPDetails: (value: any) => void;
  setIsAPIDeleteKeyOTPModalOpen: (value: boolean) => void;
  deleteKeyName: string;
}

const DeleteKeyModal: React.FC<ComponentProps> = ({ isOpen, setIsOpen, setDeleteKeyOTPDetails, setIsAPIDeleteKeyOTPModalOpen, deleteKeyName }) => {
  const handleCreateOTPForDelete = () => {
    createOTP().then((OTPDetails: any) => {
      setDeleteKeyOTPDetails({ verificationID: OTPDetails.data.data.verificationID });
      setIsOpen(false);
      setIsAPIDeleteKeyOTPModalOpen(true);
    });
  };

  return (
    <CustomModal
      IsOpen={isOpen}
      isClose={true}
      close={() => setIsOpen(false)}
      primaryAction={handleCreateOTPForDelete}
      secondaryAction={() => setIsOpen(false)}
      isPrimaryAction={true}
      isSecondaryAction={true}
      primaryName={"Confirm"}
      secondaryName={"Dismiss"}
    >
      <Box component={"img"} src={WarningDeleteKeyAsset} alt={WarningDeleteKeyAsset} />
      <Box sx={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}>
        <TextView text={"Are you sure?"} variant={"Medium_22"} />
      </Box>
      <Box>
        <TextView text={`This will delete the API "${deleteKeyName}". This is a destructive action and will permanently delete this API.`} variant={"Regular_14"} color={"text.quaternary"} />
      </Box>
    </CustomModal>
  );
};

export default DeleteKeyModal;
