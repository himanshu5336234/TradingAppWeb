import React, { useState } from "react";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import ReusableOTP from "../ReusableOTP";
import PropTypes from "prop-types";
import { DIDNT_RECIVE_CODE } from "./magicStrings";

function ApiOTPModal({ IsOpen, closeModal, setIsEditModalOpen }) {
  const [OTP, setOTP] = useState();
  const primaryAction = () => {
    closeModal(false);
    setIsEditModalOpen(true);
  };
  return (
    <CustomModal IsOpen={IsOpen} primaryName="Save" secondaryName="Cancel" secondaryAction={closeModal} isSecondaryAction={true} isPrimaryAction={true} primaryAction={primaryAction}>
      <ReusableOTP helperTextForOTP={DIDNT_RECIVE_CODE} OTP={OTP} setOTP={setOTP} OTPLength={6}></ReusableOTP>
    </CustomModal>
  );
}

export default ApiOTPModal;

ApiOTPModal.propTypes = {
  IsOpen: PropTypes.boolean,
  closeModal: PropTypes.func,
  setIsEditModalOpen: PropTypes.func
};
