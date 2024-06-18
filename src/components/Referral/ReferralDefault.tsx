import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import ReferralInput from "./ReferralInput";
import { useReferral } from "@/frontend-BL/businessHooks/REFERRAL/useReferral";
import OnBoardingLayout from "@/pages/Onboarding/OnBoardingLayout";
import TextView from "../UI/TextView/TextView";

const ReferralDefault = () => {
  const {
    applyReferralCode,
    VerifyReferralCode,
    isReferralVerified,
    referralInputTextMessage,
    setIsReferralVerified,
    setReferralInputTextMessage,
    isReferred,
    setIsReferred,
    headingMessage,
    setHeadingMessage
  } = useReferral();

  useEffect(() => {
    const referralCode = localStorage.getItem("referralCode");

    if (referralCode !== null && referralCode !== "undefined") {
      setIsReferred({
        isCode: true,
        code: referralCode
      });
      VerifyReferralCode(referralCode, true);
    } else {
      setHeadingMessage("Do you have a referral code? Enter it below.");
      setIsReferred({
        isCode: false,
        code: ""
      });
    }
  }, []);

  return (
    <OnBoardingLayout>
      <Grid container rowGap={3}>
        <Grid item xs={12}>
          <Box>
            <TextView text={isReferred.isCode ? "You have been invited!" : "Enter Referral Code (Optional)"} component={"h1"} variant={"Bold_36"} />
            <TextView text={headingMessage} component={"h6"} variant={"Medium_16"} color={"text.quaternary"} />
          </Box>
        </Grid>
        <ReferralInput
          isReferred={isReferred}
          isReferralVerified={isReferralVerified}
          referralInputTextMessage={referralInputTextMessage}
          VerifyReferralCode={VerifyReferralCode}
          setIsReferralVerified={setIsReferralVerified}
          applyReferralCode={applyReferralCode}
          setReferralInputTextMessage={setReferralInputTextMessage}
        />
      </Grid>
    </OnBoardingLayout>
  );
};

export default ReferralDefault;
