import { useWithdraw } from "@/frontend-BL/businessHooks/WALLET/useWithdraw";
import { Box, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import MFinal from "../MDeposit/MFinal";
import React from "react";
import { StepperStyle } from "../MWalletStyles";
import MWithdrawForm from "./MWithdrawForm";
import { MWithDrawOTP } from "./MWithdrawOTP";
import PropTypes from "prop-types";
import MNotVerifiedBanner from "../MNotVerifedBanner";

const steps = ["Amount and Bank", "Waiting Period"];
const MWithdraw = ({ setSelectedWalletTab, IsUserVerified }) => {
  const {
    helperTextForOTP,
    helperText,
    formData,
    activeStep,
    AccountInfo,
    action,
    SETFORMDATA,
    handleMaxClickForWithdrawl,
    fiatBalance,
    cancelOTPSubmission,
    openOTPModal,
    handleResendOTP,
    handleFirstResendClick,
    resendRenderBoolean,
    loading
  } = useWithdraw();
  return (
    <Box sx={{ position: "relative" }}>
      <Container maxWidth="md" sx={{ filter: IsUserVerified ? "blur(0px)" : "blur(10px)", pointerEvents: IsUserVerified ? "auto" : "none" }}>
        <Grid item xs={12} paddingY={2}>
          <Stepper sx={StepperStyle}>
            <Step key={steps[0]} completed={activeStep === "" || activeStep === "success"}>
              <StepLabel>{steps[0]}</StepLabel>
            </Step>
            <Step key={steps[1]} completed={activeStep === "success"}>
              <StepLabel>{steps[1]}</StepLabel>
            </Step>
          </Stepper>
        </Grid>
        <Grid item sm>
          {activeStep === "" && (
            <MWithdrawForm
              action={action}
              handleMaxClickForWithdrawl={handleMaxClickForWithdrawl}
              AccountInfo={AccountInfo}
              helperText={helperText}
              formData={formData}
              SETFORMDATA={SETFORMDATA}
              fiatBalance={fiatBalance}
            />
          )}
          {activeStep === "success" && (
            <MFinal Header={"Your Withdraw Request has successfully been submitted !"} SubHeader={"Transaction status will be updated in 24 hrs"} setSelectedWalletTab={setSelectedWalletTab} />
          )}
        </Grid>
      </Container>
      {!IsUserVerified && <MNotVerifiedBanner pageTitle={"INR Withdraw"} />}
      {
        <MWithDrawOTP
          SETFORMDATA={SETFORMDATA}
          formData={formData}
          helperTextForOTP={helperTextForOTP}
          primaryAction={action}
          cancelAction={cancelOTPSubmission}
          openOTPModal={openOTPModal}
          handleResendOTP={handleResendOTP}
          handleFirstResendClick={handleFirstResendClick}
          resendRenderBoolean={resendRenderBoolean}
          loading={loading}
        />
      }
    </Box>
  );
};

export default MWithdraw;
MWithdraw.propTypes = {
  setSelectedWalletTab: PropTypes.func,
  IsUserVerified: PropTypes.bool
};
