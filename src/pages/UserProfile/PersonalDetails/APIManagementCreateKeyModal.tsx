import React, { useState } from "react";
import { Box } from "@mui/material";

import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import TextView from "@/components/UI/TextView/TextView";

import { createOTP } from "@/frontend-api-service/Api";

interface ComponentProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  setIsOTPModalOpen: (value: boolean) => void;
  setOTPDetails: any;
  listOfApiKeysCreated: any;
}

const CreateKeyModal: React.FC<ComponentProps> = ({ isOpen, setIsOpen, setIsOTPModalOpen, setOTPDetails, listOfApiKeysCreated }) => {
  const [APIName, setAPIName] = useState("");
  const [expiryDays, setExpiryDays] = useState("");

  const [apiNameError, setApiNameError] = useState("");
  const [expiryDaysError, setExpiryDaysError] = useState("");

  const handleSendOTPApi = () => {
    if (listOfApiKeysCreated.filter((apiKey: any) => apiKey.name === APIName).length > 0) {
      setApiNameError("This name is already in use. Please choose a different name");
      return;
    }
    if (!APIName) {
      setApiNameError("API Name cannot be empty.");
      return;
    }
    if (Number(expiryDays) <= 0) {
      setExpiryDaysError("Enter a valid value.");
      return;
    }
    createOTP().then((OTPDetails: any) => {
      setOTPDetails({ verificationID: OTPDetails.data.data.verificationID, name: APIName, expiryDaysLimit: Number(expiryDays) });
      setIsOpen(false);
      setIsOTPModalOpen(true);
    });
  };

  return (
    <CustomModal
      IsOpen={isOpen}
      isClose={true}
      close={() => setIsOpen(false)}
      primaryAction={handleSendOTPApi}
      secondaryAction={() => setIsOpen(false)}
      isPrimaryAction={true}
      isSecondaryAction={true}
      secondaryName={"Cancel"}
      primaryName={"Confirm"}
    >
      <Box p={"1rem"}>
        <TextView variant="Bold_28" text={"Create API Key"}></TextView>
        <Box sx={{ marginTop: "2.25rem", marginBottom: "2.25rem" }}>
          <BasicTextFields
            Error={apiNameError.length > 0}
            errorText={apiNameError}
            label={"Add Name"}
            backgroundColor={"background.default"}
            value={APIName}
            onChange={(event) => {
              setAPIName(event.target.value);
              setApiNameError("");
            }}
          />
        </Box>
        <BasicTextFields
          label={"Add Expiry (days)"}
          backgroundColor={"background.default"}
          type={"number"}
          Error={expiryDaysError.length > 0}
          errorText={expiryDaysError}
          value={expiryDays}
          onChange={(event) => {
            const input = event.target.value;
            const regex = /^[0-9\b]+$/;
            if (!input || regex.test(input)) setExpiryDays(input);
            setExpiryDaysError("");
          }}
        />
      </Box>
    </CustomModal>
  );
};

export default CreateKeyModal;
