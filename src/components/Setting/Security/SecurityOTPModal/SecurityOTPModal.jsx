import React, { useState } from "react";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import ReusableOTP from "../../ReusableOTP";
import PropTypes from "prop-types";
import { SECURITY_OTP_MODAL_STYLE } from "./Styles";

function SecurityOTPModal({ IsOpen, handleCancelAction, handleSubmitAction, passwordObj }) {
  const [OTP, setOTP] = useState(null);

  const handleSubmitOTP = () => {
    // TODO: validate OTP
    if (OTP === null) {
      alert("Enter Valid OTP");
      return;
    }
    // if validated 1)close modal 2)send post request to change password 3)issue snackbar 4)initiate Sign Out
    handleSubmitAction();
    // TODO: send post request
    setOTP(null);
    // TODO: Initiate Sign Out Routine
  };
  return (
    <>
      <CustomModal
        IsOpen={IsOpen}
        primaryName="Submit"
        secondaryName="Cancel"
        secondaryAction={handleCancelAction}
        isSecondaryAction={true}
        isPrimaryAction={true}
        primaryAction={handleSubmitOTP}
        ContainerSx={SECURITY_OTP_MODAL_STYLE}
        isClose={false}
      >
        <ReusableOTP helperTextForOTP={"Didn't recive code? "} OTP={OTP} setOTP={setOTP} OTPLength={6}></ReusableOTP>
      </CustomModal>
    </>
  );
}

export default SecurityOTPModal;

SecurityOTPModal.propTypes = {
  IsOpen: PropTypes.bool,
  handleCancelAction: PropTypes.func,
  handleSubmitAction: PropTypes.func,
  passwordObj: PropTypes.object
};
