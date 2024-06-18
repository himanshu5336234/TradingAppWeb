import { useDeposit } from "@/frontend-BL/businessHooks/WALLET/useDeposit";
import { Box, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import MDepositForm from "./MDepositForm";
import MFinal from "./MFinal";
import PropTypes from "prop-types";
import MReferenceForm from "./MReferenceForm";
import { StepperStyle } from "../MWalletStyles";
import MNotVerifiedBanner from "../MNotVerifedBanner";

const steps = ["Enter Amount", "Reference ID", "Instant Transfer"];

const MDeposit = ({ setSelectedWalletTab, IsUserVerified }) => {
  const {
    formData,
    helperText,
    activeStep,
    PrimaryAction,
    SecondaryAction,
    densityBankAccount,
    SETFORMDATA,
    dontShowModalAgain,
    setDontShowModalAgain,
    openDepositModal,
    setOpenDepositModal,
    handleAmtSubmit,
    depositModalPrimaryAction,
    loading
  } = useDeposit();
  return (
    <Box sx={{ position: "relative" }}>
      <Container maxWidth="md" sx={{ filter: IsUserVerified ? "blur(0px)" : "blur(10px)", pointerEvents: IsUserVerified ? "auto" : "none" }}>
        <Grid item xs={12} paddingY={2}>
          <Stepper sx={StepperStyle}>
            {steps.map((label, index) => {
              return (
                <Step key={label} completed={index <= activeStep}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid item sm>
          {activeStep === 0 && (
            <MDepositForm
              formData={formData}
              activeStep={activeStep}
              setFormData={SETFORMDATA}
              PrimaryAction={PrimaryAction}
              helperText={helperText}
              densityBankAccount={densityBankAccount}
              handleAmtSubmit={handleAmtSubmit}
              dontShowModalAgain={dontShowModalAgain}
              setDontShowModalAgain={setDontShowModalAgain}
              openDepositModal={openDepositModal}
              setOpenDepositModal={setOpenDepositModal}
              depositModalPrimaryAction={depositModalPrimaryAction}
            />
          )}
          {activeStep === 1 && (
            <MReferenceForm PrimaryAction={PrimaryAction} SecondaryAction={SecondaryAction} formData={formData} setFormData={SETFORMDATA} helperText={helperText} loading={loading} />
          )}
          {activeStep === 2 && (
            <MFinal Header={"Your Deposit Request has successfully been submitted !"} SubHeader={"Transaction status will be updated in 24 hrs"} setSelectedWalletTab={setSelectedWalletTab} />
          )}
        </Grid>
      </Container>
      {!IsUserVerified && <MNotVerifiedBanner pageTitle={"INR Deposit"} />}
    </Box>
  );
};

export default MDeposit;

MDeposit.propTypes = {
  setSelectedWalletTab: PropTypes.func,
  IsUserVerified: PropTypes.bool
};
