/* eslint-disable multiline-ternary */
import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import SignUpEmail from "./SignUpEmail";
import Verification from "@/pages/Onboarding/SignUp/Verification";
import { getAuthorisationUrl } from "@/frontend-api-service/Api/SessionManagement";
import { GetAppURL } from "@/frontend-api-service/Base";
import { usePostHog } from "posthog-js/react";
import OnBoardingLayout from "../OnBoardingLayout";
import TextView from "@/components/UI/TextView/TextView";
import { useNavigate } from "react-router-dom";
import { GoogleLogoIcon } from "@/assets/icons";
const textStringsTerms = {
  TERMS: "By creating an account, You agree to our",
  TERMSOFSERVICE: "Terms of Service",
  POLICY: "Privacy Policy"
};

function SignUpOnboardingScreen() {
  const [currentScreen, setCurrentScreen] = useState("SignUpEmail");
  const [userEmail, setUserEmail] = useState("");
  const [flowID, setFlowID] = useState(null);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState("");
  const posthog = usePostHog();
  const textStrings = {
    TITLE: "Get Started with Density!",
    SUBTITLE: "Create your account. Select a method to Sign Up",
    EMAIL: "E-mail Id",
    SIGNUPWITHEGOOGLE: "Sign Up with Google"
  };
  const navigate = useNavigate();
  const handleGoogleSignUp = () => {
    if (isTermsChecked) {
      posthog.capture("google_signup_initiated", {
        event_time: new Date().toUTCString()
      });
      getAuthorisationUrl()
        .then((urlCallback: { data: { status: string; url: string; user: object } }) => {
          if (urlCallback.data.status === "OK") {
            window.location.href = urlCallback.data.url + "&redirect_uri=" + GetAppURL() + "/auth/callback/google";
          }
        })
        .catch(() => {
          // setGoogleError("Something went wrong, Please retry!");
        });
    } else {
      setTermsError("You need to accept our terms and privacy policy to create an account.");
    }
  };
  return (
    <OnBoardingLayout>
      <Grid container gap={4}>
        <Grid item xs={12}>
          <TextView component={"h1"} variant={"Bold_36"} text={textStrings.TITLE} />
          <TextView component={"h6"} variant={"Medium_16"} text={textStrings.SUBTITLE} color={"text.quaternary"} />
        </Grid>
        <Grid item xs={12}>
          {currentScreen === "SignUpEmail" && (
            <SignUpEmail
              setCurrentScreen={setCurrentScreen}
              setFlowID={setFlowID}
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              isTermsChecked={isTermsChecked}
              setIsTermsChecked={setIsTermsChecked}
              textStringsTerms={textStringsTerms}
              termsError={termsError}
              setTermsError={setTermsError}
            />
          )}
          {currentScreen === "OTPandEmail" && <Verification flowID={flowID} setCurrentScreen={setCurrentScreen} userEmail={userEmail} setUserEmail={setUserEmail} />}
        </Grid>
      </Grid>
      {currentScreen === "SignUpEmail" && (
        <Box sx={{ mb: 2, width: "100%" }}>
          <Button onClick={handleGoogleSignUp} variant="secondary">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box component={"img"} src={GoogleLogoIcon} alt="logo" />
              <TextView text={textStrings.SIGNUPWITHEGOOGLE} variant="Bold_14" />
            </Box>
          </Button>
          {window.localStorage.getItem("socialLoginError") && <TextView variant={"Medium_12"} text={window.localStorage.getItem("socialLoginError")} color={"text.error"} />}
        </Box>
      )}
      <TextView component={"p"} variant={"Medium_14"}>
        <TextView text={"Already a User?  "} color="text.quaternary" variant={"Medium_14"} component={"span"} />
        <TextView
          variant={"Medium_14"}
          text={"Login"}
          component={"span"}
          color="text.main"
          style={{
            cursor: "pointer"
          }}
          onClick={() => navigate("/auth/signin")}
        />
      </TextView>
    </OnBoardingLayout>
  );
}

export default SignUpOnboardingScreen;
