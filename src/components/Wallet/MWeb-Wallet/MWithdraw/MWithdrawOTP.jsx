import { Box, Drawer, Typography, IconButton } from "@mui/material";
import React from "react";
import OtpInput from "react-otp-input";
import OtpTimer from "otp-timer";
import PropTypes from "prop-types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { VERIFICATION_CODE_SENT_TEXT } from "../../withdraw/magicStrings";
import { OTPMODAL, OTPSTYLE } from "../../withdraw/styles";
import { LoadingButton } from "@mui/lab";
export const MWithDrawOTP = ({ SETFORMDATA, formData, helperTextForOTP, openOTPModal, cancelAction, primaryAction, handleResendOTP, handleFirstResendClick, resendRenderBoolean, loading }) => {
  return (
    <Drawer
      sx={{
        width: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "100%",
          height: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          alignItems: "center",
          overflowY: "hidden",
          top: 0
        }
      }}
      variant="persistent"
      anchor="bottom"
      open={openOTPModal}
    >
      <Box sx={{ height: 64, display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%" }}>
        <Box>
          <IconButton onClick={cancelAction}>
            <ChevronLeftIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={OTPMODAL}>
        <Box sx={{ textAlign: "center" }}>
          <Typography component={"h1"} variant={"SemiBold_24"}>
            {"Please enter the OTP"}
          </Typography>
          <Typography component={"p"} variant="Regular_14">
            {VERIFICATION_CODE_SENT_TEXT}
          </Typography>
        </Box>

        <OtpInput
          shouldAutoFocus={false}
          inputStyle={OTPSTYLE}
          value={formData?.OTP}
          isInputNum={true}
          onChange={(otp) => SETFORMDATA({ ...formData, OTP: otp })}
          numInputs={6}
          separator={<span> </span>}
        />
        {helperTextForOTP && (
          <Typography component={"p"} variant="Regular_12_KYC" sx={{ color: "#E55B4C" }}>
            {helperTextForOTP}
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
          <Typography sx={{ color: "text.mild" }} variant="Regular_14">
            {"Didn't receive SMS?"}
          </Typography>
          {resendRenderBoolean ? (
            <Typography
              component={"span"}
              color="text.main"
              variant="Regular_14"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                handleFirstResendClick();
                handleResendOTP();
              }}
            >
              Resend
            </Typography>
          ) : (
            <OtpTimer textColor={"#E2FF6F"} buttonColor={"#E2FF6F"} minutes={0} seconds={59} text=" " ButtonText="Resend" resend={handleResendOTP} background={"#1F1F24"} />
          )}
        </Box>
        <Box sx={{ width: "100%", mt: 2 }}>
          <LoadingButton
            sx={{
              width: "100%",
              ".MuiLoadingButton-loadingIndicator": {
                color: "black"
              }
            }}
            variant="primary"
            loading={loading}
            onClick={primaryAction}
          >
            {"Submit"}
          </LoadingButton>
        </Box>
      </Box>
    </Drawer>
  );
};
MWithDrawOTP.propTypes = {
  SETFORMDATA: PropTypes.func,
  helperTextForOTP: PropTypes.object,
  formData: PropTypes.object,
  openOTPModal: PropTypes.bool,
  cancelAction: PropTypes.func,
  primaryAction: PropTypes.func,
  handleResendOTP: PropTypes.func,
  handleFirstResendClick: PropTypes.func,
  resendRenderBoolean: PropTypes.bool,
  loading: PropTypes.bool
};
