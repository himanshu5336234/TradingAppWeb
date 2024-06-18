import { OTPMODAL, OTPSTYLE, OTP_CONTAINER_STYLE } from "@/components/Wallet/withdraw/styles";
import React from "react";
import OtpInput from "react-otp-input";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

function ReusableOTP({ helperTextForOTP, OTP, setOTP, OTPLength }) {
  return (
    <Box sx={OTPMODAL}>
      <Box sx={{ textAlign: "center" }}>
        <Typography component={"h1"} variant={"SemiBold_28"}>
          Enter OTP
        </Typography>
        <Typography component={"p"} variant="Regular_12_KYC">
          We have sent a verification code on your registration number
        </Typography>
      </Box>

      <OtpInput shouldAutoFocus={false} inputStyle={OTPSTYLE} containerStyle={OTP_CONTAINER_STYLE} value={OTP} onChange={(otp) => setOTP(otp)} numInputs={OTPLength} />

      <Box sx={{ display: "flex", justifyContent: "space-between", width: "90%" }}>
        {/* import color from theme */}
        <Typography component={"p"} variant="SemiBold_14" sx={{ color: "#808090" }}>
          {helperTextForOTP}
        </Typography>
        <Typography variant="SemiBold_14" color="text.main" sx={{ cursor: "pointer" }}>
          Resend Code
        </Typography>
      </Box>
    </Box>
  );
}

export default ReusableOTP;

ReusableOTP.propTypes = {
  helperTextForOTP: PropTypes.string,
  OTP: PropTypes.number,
  setOTP: PropTypes.func,
  OTPLength: PropTypes.number
};
