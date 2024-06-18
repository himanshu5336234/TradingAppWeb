import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import { Box } from "@mui/material";
import React from "react";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import OtpTimer from "otp-timer";
import TextView from "@/components/UI/TextView/TextView";
import { useSelector } from "react-redux";
interface FormData {
  WithdrawAmount: string;
  OTP: string;
  verificationIdFromServer: string;
}
interface ComponentProps {
  action: () => void;
  IsOpen: boolean;
  cancelAction: () => void;
  SETFORMDATA: (val: {}) => void;
  formData: FormData;
  handleResendOTP: () => void;
  handleFirstResendClick: () => void;
  helperTextForOTP: string;
  resendRenderBoolean: boolean;
}

const OTPModal: React.FC<ComponentProps> = ({ action, IsOpen, cancelAction, SETFORMDATA, formData, helperTextForOTP, resendRenderBoolean, handleFirstResendClick, handleResendOTP }) => {
  const mobileNumber = useSelector((state: { profile: { profileDetails: { mobileNumber: string } } }) => state.profile.profileDetails?.mobileNumber);

  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      close={() => cancelAction()}
      primaryAction={() => action()}
      secondaryAction={() => cancelAction()}
      isPrimaryAction={true}
      isSecondaryAction={true}
      secondaryName={"Dismiss"}
      primaryName={"Confirm"}
    >
      <Box
        p={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <TextView variant="Medium_22" text={"Enter OTP"}></TextView>
        <TextView variant="Regular_14" color={"text.quaternary"} text={`We have sent a verification code on +91 ******${mobileNumber?.substr(-4)} for security check`}></TextView>
        <BasicTextFields
          label={"Enter OTP"}
          backgroundColor={"background.default"}
          type={"number"}
          value={formData.OTP}
          placeholder={"000-000"}
          onChange={(event) => SETFORMDATA({ ...formData, OTP: event.target.value })}
        />
        <TextView component={"p"} variant="Regular_14" color={"text.error"} text={helperTextForOTP}></TextView>
        {resendRenderBoolean && (
          <TextView color={"text.regular"} variant={"Regular_12"}>
            {"Didn't Receive?"}
            <TextView
              component={"span"}
              style={{
                ml: 0.5
              }}
              onClick={() => {
                handleFirstResendClick();
                handleResendOTP();
              }}
              color={"text.main"}
              variant={"Regular_12"}
              text={"Resend"}
            ></TextView>
          </TextView>
        )}
        {!resendRenderBoolean && <OtpTimer textColor={"#E2FF6F"} buttonColor={"#E2FF6F"} minutes={0} seconds={59} text=" " ButtonText="Resend" resend={handleResendOTP} background={"#1F1F24"} />}
      </Box>
    </CustomModal>
  );
};

export default OTPModal;
