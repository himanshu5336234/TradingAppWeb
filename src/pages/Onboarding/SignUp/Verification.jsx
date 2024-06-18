import React, { useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";

import OtpTimer from "otp-timer";

import PropTypes from "prop-types";
import SetPassword from "@/pages/Onboarding/SignUp/SetPassword";
// import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
// import { trackSignUpEvent } from "../../../react-ga/ReactGA";
import { signUpApi, resendEmailVerificationOtp } from "@/frontend-api-service/Api/SessionManagement";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { GetAppURL } from "@/frontend-api-service/Base";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import TextView from "@/components/UI/TextView/TextView";
import { recordCleverTapEvent } from "@/utils/recordCleverTapEvent";

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
function Verification({ setCurrentScreen, userEmail, setUserEmail, flowID }) {
  const [emailOTP, setEmailOTP] = useState("");
  const mobile = useMediaQuery("(max-width:900px)");
  const [userInputPassword, setUserInputPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [OTPError, setOTPError] = useState("");
  const [isOTPSent, setIsOTPSent] = useState("");
  const [firstOTPResendButton, setFirstOTPResendButton] = useState(true);
  const [loader, setloader] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInputPassword === "") {
      setPasswordError("Password is Required");
    } else if (!pattern.test(userInputPassword)) {
      setPasswordError("Password not Matching all Conditions");
    }
    if (emailOTP.length === 0) {
      setOTPError("OTP is Required");
    } else if (emailOTP.length !== 6) {
      setOTPError("OTP must be 6 digits!");
    } else {
      setloader(true);
      signUpApi(
        JSON.stringify({
          formFields: [
            {
              id: "email",
              value: userEmail
            },
            {
              id: "password",
              value: userInputPassword
            },
            {
              id: "flowID",
              value: flowID
            },
            {
              id: "otp",
              value: emailOTP
            },
            {
              id: "referralCode",
              value: ""
            }
          ]
        })
      ).then((isSignedUP) => {
        setloader(false);
        if (isSignedUP.data.status === "OK") {
          recordCleverTapEvent("SIGNUP_FIRST_FACTOR_COMPLETED", {
            Email: userEmail,
            flowID: flowID,
            mode: "EMAIL_PASSWORD",
            Identity: userEmail
          });
          window.location.href = GetAppURL() + "/auth";
        } else {
          recordCleverTapEvent("SIGNUP_FIRST_FACTOR_FAILED", {
            Email: userEmail,
            Error: isSignedUP.data.message || isSignedUP.data.formFields[0]?.error,
            Identity: userEmail,
            mode: "EMAIL_PASSWORD"
          });
        }
        if (isSignedUP.data.status === "FIELD_ERROR") {
          if (isSignedUP.data.formFields[0]?.error) {
            setPasswordError(isSignedUP.data.formFields[0]?.error);
          }
          if (isSignedUP.data.formFields[2]?.error) {
            setOTPError(isSignedUP.data.formFields[3]?.error);
          }
        } else if (isSignedUP.data.status === "GENERAL_ERROR") {
          setOTPError("Invalid OTP");
        }
      });
    }
  };

  const handleResendEmailVerificationOtp = () => {
    recordCleverTapEvent("SIGN_UP_1FA_OTP_RESEND_CLICKED", {
      flowID: flowID
    });
    resendEmailVerificationOtp(
      JSON.stringify({
        flowID
      })
    )
      .then((successResponse) => {
        setIsOTPSent(true);
        recordCleverTapEvent("SIGN_UP_1FA_OTP_RESEND_REQUESTED", {
          flowID: flowID
        });
        setTimeout(() => {
          setIsOTPSent(false);
        }, 20000);
      })
      .catch((e) => {
        setOTPError("Something went wrong! Please retry!");
      });
  };

  const handleFirstResendClick = () => {
    setFirstOTPResendButton(false);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "50vh",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Grid container gap={2}>
          <Grid item xs={12}>
            <BasicTextFields
              backgroundColor={"background.primary"}
              variant="outlined"
              label={"Email"}
              id="email"
              name="email"
              type="email"
              disabled
              disabledTextInPrimary
              value={userEmail}
              InputProps={{
                endAdornment: <EditIcon onClick={() => setCurrentScreen("SignUpEmail")} sx={{ fontSize: "16px", cursor: "pointer" }} />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <BasicTextFields
              autoFocus={true}
              placeholder={"000-000"}
              backgroundColor={"background.primary"}
              label={"Enter OTP"}
              variant="outlined"
              id="otp"
              value={emailOTP}
              name="otp"
              type="number"
              onChange={(event) => {
                setEmailOTP(event.target.value);
                setOTPError("");
              }}
            />
            {OTPError.length > 0 && <TextView variant={"Medium_12"} color={"text.error"} text={OTPError} />}
          </Grid>
          {emailOTP.length !== 6 && (
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <TextView color={"text.quaternary"} variant="Regular_14" text={"   Didn't Receive Email?"} />

                {firstOTPResendButton ? (
                  <OtpTimer textColor={"#E2FF6F"} buttonColor={"#E2FF6F"} background="#0e0e0f" minutes={0} seconds={59} text=" " ButtonText="Resend" resend={handleResendEmailVerificationOtp} />
                ) : (
                  <TextView
                    text={"         Resend"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleFirstResendClick();
                      handleResendEmailVerificationOtp();
                    }}
                    color="text.main"
                    component={"span"}
                  />
                )}
                {isOTPSent && <TextView color={"text.quaternary"} text={"Sent!"} component={"h4"} />}
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            {emailOTP.length === 6 && (
              <>
                <SetPassword userInputPassword={userInputPassword} setUserInputPassword={setUserInputPassword} setPasswordError={setPasswordError} />
                {passwordError && <TextView color={"text.error"} text={passwordError} variant={"Medium_12"} />}
              </>
            )}
          </Grid>
        </Grid>
        <CustomButton isloading={loader} isDisabled={loader || !pattern?.test(userInputPassword)} label={" Next"} style={{ my: 1, width: "100%", p: 1.2 }} type="submit" variant="primary" />
      </Box>
    </>
  );
}

Verification.propTypes = {
  setCurrentScreen: PropTypes.func,
  userEmail: PropTypes.string,
  setUserEmail: PropTypes.func,
  flowID: PropTypes.string
};

export default Verification;
