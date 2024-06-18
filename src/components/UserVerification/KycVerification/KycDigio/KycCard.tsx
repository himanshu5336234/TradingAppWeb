import React from "react";
import { Box, Grid } from "@mui/material";
import TextView from "../../../UI/TextView/TextView";
import CustomButton from "../../../UI/CustomButton/CustomButton";
import { KycResponse } from "@/pages/UserVerification/KYCVerification/helpers";
type KycCardProps = {
  KycImage: string;
  kycDetails: KycResponse;
  heading: string;
  headingText: string;
  kycType: string;
  text: string;
  isRecommended: boolean;
  isDisabled: boolean;
  primaryButtonText: string;
  secondaryAction: () => void;
  primaryAction: () => void;
};
export const KycCard = ({ KycImage, kycDetails, kycType, heading, headingText, text, primaryButtonText, isRecommended, isDisabled, primaryAction, secondaryAction }: KycCardProps) => {
  const KycAttempt = {
    QUICK_KYC_FLOW: "quickKYCAttemptRemaining",
    MANUAL_KYC_FLOW: "manualKYCAttemptRemaining"
  };
  const ShowPrimaryActionButton = () => {
    if (kycDetails[KycAttempt[kycType]] >= 2) {
      return (
        <Grid item xs={12} lg={7}>
          <CustomButton isDisabled={isDisabled} isloading={isDisabled} style={{ p: 1.5 }} variant={"primary"} onClick={primaryAction} label={primaryButtonText} />
        </Grid>
      );
    } else if (kycDetails[KycAttempt[kycType]] === 1) {
      return (
        <Grid item xs={12} lg={5.7}>
          <CustomButton style={{ p: 1.5 }} variant={"secondary"} onClick={primaryAction} label={"Start New Kyc"} />
        </Grid>
      );
    } else {
      return <></>;
    }
  };

  const ShowSecondaryActionButton = () => {
    if (kycDetails[KycAttempt[kycType]] !== 2 && kycDetails?.flowData?.workFlowType === kycType && kycDetails.status !== "FAILED") {
      return (
        <Grid item xs={12} lg={5.7}>
          <CustomButton style={{ p: 1.5 }} isDisabled={isDisabled} isloading={isDisabled} variant={"primary"} label={"Resume"} onClick={secondaryAction} />
        </Grid>
      );
    } else if (kycDetails[KycAttempt[kycType]] === 0 && kycDetails?.flowData?.workFlowType === kycType && kycDetails.status !== "FAILED") {
      return (
        <>
          <Grid item xs={12} lg={7}>
            <CustomButton style={{ p: 1.5 }} variant={"primary"} isDisabled={true} label={"No Attempts Left"} />
          </Grid>
        </>
      );
    } else if (kycDetails[KycAttempt[kycType]] === 0 && (kycDetails?.flowData?.workFlowType !== kycType || kycDetails.status === "FAILED")) {
      return (
        <>
          <Grid item xs={12} lg={7}>
            <CustomButton style={{ p: 1.5 }} variant={"primary"} isDisabled={true} label={"No Attempts Left"} />
          </Grid>
        </>
      );
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        border: isRecommended ? "2px solid  #48BA78" : "none",
        borderRadius: "4px",
        opacity: kycDetails?.status === "FAILED" && kycDetails[KycAttempt[kycType]] === 0 ? 0.6 : 1
      }}
    >
      {isRecommended && (
        <Box
          sx={{
            position: "absolute",
            background: "linear-gradient(91.77deg, rgba(226, 255, 111, 0.72) -31.26%, #29B57E 121.62%);",
            borderRadius: "0px 0px 0px 2px",
            paddingLeft: 1,
            paddingRight: "10px",
            height: "24px",
            top: 0,
            right: 0,
            justifyContent: "flex-end"
          }}
        >
          <TextView variant={"Medium_14"} text={"Recommended"} />
        </Box>
      )}
      <Grid container sx={{ borderRadius: "4px" }}>
        <Grid alignItems={"center"} container gap={2} item py={2} px={4.5} xs={12} sx={{ backgroundColor: "background.primary" }}>
          <Grid item>
            <Box component={"img"} src={KycImage} />
          </Grid>

          <Grid item>
            <TextView component={"p"} variant={"Medium_22"} text={heading} />
            <TextView component={"p"} variant={"Regular_14"} color={"text.regular"} text={headingText} />
          </Grid>
        </Grid>

        <Grid item container xs={12} py={3} rowGap={5} px={4.5} sx={{ backgroundColor: "background.secondary" }}>
          <Grid item xs={12}>
            {kycDetails?.flowData?.flowStatus !== "" && (
              <>
                <TextView variant={"Medium_14"} color={"text.quaternary"} text={`Attempts Left : `} />
                <TextView variant={"Medium_14"} text={kycDetails[KycAttempt[kycType]]} />{" "}
              </>
            )}
            <TextView text={text} component={"p"} variant={"Medium_14"} color={"text.quaternary"} />
          </Grid>
          <Grid item gap={2} container xs={12}>
            {ShowPrimaryActionButton()}

            {ShowSecondaryActionButton()}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
