import React, { useState } from "react";
import { Box } from "@mui/material";
import OtpTimer from "otp-timer";

import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import TextView from "@/components/UI/TextView/TextView";

import { deleteAuthKey, createOTP } from "@/frontend-api-service/Api";

interface ComponentProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  deleteKeyOTPDetails: any;
  setDeleteKeyOTPDetails: any;
  deleteKeyId: string;
}

const DeleteKeyOTPModal: React.FC<ComponentProps> = ({ isOpen, setIsOpen, deleteKeyOTPDetails, setDeleteKeyOTPDetails, deleteKeyId }) => {
  const [OTP, setOTP] = useState("");
  const [isResendClicked, setIsResendClicked] = useState(false);
  const [OTPError, setOTPError] = useState("");

  const handleDeleteAPIKey = () => {
    deleteAuthKey(JSON.stringify({ ...deleteKeyOTPDetails, otp: OTP, action: "DELETE" }), deleteKeyId)
      .then(() => {
        setIsOpen(false);
      })
      .catch(() => {
        setOTPError("Invalid OTP.");
      });
  };

  const handleResendOTP = () => {
    if (!isResendClicked) setIsResendClicked(true);
    createOTP().then((OTPVerificationId: any) => {
      setDeleteKeyOTPDetails({ ...deleteKeyOTPDetails, verificationID: OTPVerificationId.data.data.verificationID });
    });
  };

  return (
    <CustomModal
      IsOpen={isOpen}
      isClose={true}
      close={() => setIsOpen(false)}
      primaryAction={handleDeleteAPIKey}
      secondaryAction={() => setIsOpen(false)}
      isPrimaryAction={true}
      isDisabled={OTP.length !== 6}
      primaryName={"Continue"}
    >
      <Box py={"1rem"}>
        <Box>
          <TextView variant={"Bold_28"} text={"Verification Required"}></TextView>
        </Box>
        <Box sx={{ marginTop: "0.75rem" }}>
          <TextView variant={"Regular_16"} text={"A verification code has been sent to your registered number!"}></TextView>
        </Box>
        <Box sx={{ marginTop: "2.25rem", marginBottom: "2.25rem" }}>
          <BasicTextFields
            label={"Verification Code"}
            placeholder={"000-000"}
            Error={OTPError.length > 0}
            errorText={OTPError}
            backgroundColor={"background.default"}
            value={OTP}
            onChange={(event) => setOTP(String(event.target.value).slice(0, 6))}
          />
          <Box mt={"1rem"} sx={{ display: "flex" }}>
            <TextView color={"text.regular"} variant={"Regular_14"} style={{ marginRight: "0.375rem" }} text={"Didn't Receive?"} />
            {isResendClicked ? (
              <OtpTimer textColor={"#E2FF6F"} buttonColor={"#E2FF6F"} minutes={0} seconds={59} text=" " ButtonText="Resend" resend={handleResendOTP} background={"#1B1B1F"} textClass={"otp-timer"} />
            ) : (
              <TextView component={"span"} style={{ cursor: "pointer" }} onClick={handleResendOTP} color={"text.main"} variant={"Regular_14"} text={"Resend"} />
            )}
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default DeleteKeyOTPModal;
