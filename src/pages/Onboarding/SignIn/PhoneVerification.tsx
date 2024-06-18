import React, { useState, useEffect, useRef } from "react";
import OtpTimer from "otp-timer";
import { Box, Grid } from "@mui/material";
import Session from "supertokens-web-js/recipe/session";

import { createOTPApi, consumeOTPApi, resendOTPApi } from "@/frontend-api-service/Api/SessionManagement";

import { GetAppURL } from "@/frontend-api-service/Base";

import { logoutApp } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import { SUBMIT_BUTTON } from "./Style";

import CustomButton from "@/components/UI/CustomButton/CustomButton";
import TextView from "@/components/UI/TextView/TextView";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { recordCleverTapEvent } from "@/utils/recordCleverTapEvent";
import clevertap from "clevertap-web-sdk";

const textStrings = {
  TITLE: "Enter Verification Code",
  SUBTITLE: "We have sent a verification code on your registered",
  EMAIL: "E-mail Id",
  SIGNUPWITHEMAIL: "Sign Up with Email"
};

function MobileSignInVerification() {
  const shouldNewOtpBeCreated = useRef(true);

  const [loader, setloader] = useState(false);
  const [phoneOTP, setPhoneOTP] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+91XXXXXXXXXX");
  const [sessionDetails, setSessionDetails] = useState({
    data: { preAuthSessionId: "", deviceId: "" }
  });
  const [otpError, setOtpError] = useState("");
  const [isOTPSent, setIsOTPSent] = useState("");
  const [firstOTPResendButton, setFirstOTPResendButton] = useState(true);

  useEffect(() => {
    const userEmail = window.localStorage.getItem("socialLoginEmail");
    if (userEmail) {
      recordCleverTapEvent("SIGN_IN_FIRST_FACTOR_COMPLETED", {
        Email: userEmail,
        mode: "GOOGLE_LOGIN"
      });
      clevertap.onUserLogin.push({
        Site: {
          Identity: userEmail,
          Email: userEmail
        }
      });
    }
    return () => {
      window.localStorage.removeItem("socialLoginEmail");
    };
  }, []);

  useEffect(() => {
    if (shouldNewOtpBeCreated.current) {
      shouldNewOtpBeCreated.current = false;
      Session.doesSessionExist().then((isSessionPresent) => {
        if (isSessionPresent) {
          Session.getAccessTokenPayloadSecurely().then((sessionSnapshot) => {
            const number = sessionSnapshot.phoneNumber;
            const nums = number.substring(0, 5) + "******" + number.substring(number.length - 2, number.length);
            setPhoneNumber(nums);
            createOTPApi(
              JSON.stringify({
                phoneNumber: sessionSnapshot.phoneNumber
              })
            ).then(
              (
                sessionDetailsFromServer: React.SetStateAction<{
                  data: { preAuthSessionId: string; deviceId: string };
                }>
              ) => {
                recordCleverTapEvent("SIGN_IN_2FA_OTP_REQUESTED", {
                  phoneNumber: sessionDetailsFromServer?.data?.phoneNumber
                });
                setSessionDetails(sessionDetailsFromServer);
              }
            );
          });
        }
      });
    }
  }, []);

  const handleSubmitOTP = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    recordCleverTapEvent("SIGN_IN_2FA_OTP_SUBMITTED", {
      phoneNumber: sessionDetails?.data?.phoneNumber
    });
    if (phoneOTP.length === 0) {
      setOtpError("OTP is Required");
    } else if (phoneOTP.length !== 6) {
      setOtpError("OTP must be 6 digits");
    } else {
      setloader(true);
      consumeOTPApi(
        JSON.stringify({
          preAuthSessionId: sessionDetails.data.preAuthSessionId,
          deviceId: sessionDetails.data.deviceId,
          userInputCode: phoneOTP
        })
      )
        .then((isSecondFactorCompleted: { data: { status: string } }) => {
          setloader(false);
          if (isSecondFactorCompleted.data.status === "OK") {
            recordCleverTapEvent("SIGN_IN_2FA_COMPLETED", {
              phoneNumber: sessionDetails?.data?.phoneNumber
            });
            window.location.href = GetAppURL() + "/auth";
          }
          if (isSecondFactorCompleted.data.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
            recordCleverTapEvent("SIGN_IN_2FA_FAILED", {
              Error: "INCORRECT_USER_INPUT_CODE_ERROR"
            });
            setOtpError("Invalid OTP, Please retry!");
          }
        })
        .catch((e: any) => {
          setloader(false);
          recordCleverTapEvent("SIGN_IN_2FA_FAILED", {
            Error: e?.response?.data?.details
          });
          setOtpError("Something went wrong, Please retry!");
        });
    }
  };

  const handleResendOTP = () => {
    recordCleverTapEvent("SIGN_IN_2FA_OTP_RESEND_CLICKED", {
      phoneNumber: sessionDetails?.data?.phoneNumber
    });
    resendOTPApi(
      JSON.stringify({
        preAuthSessionId: sessionDetails.data.preAuthSessionId,
        deviceId: sessionDetails.data.deviceId
      })
    )
      .then((successResponse: any) => {
        setIsOTPSent(true);
        setTimeout(() => {
          setIsOTPSent(false);
        }, 30000);
        recordCleverTapEvent("SIGN_IN_2FA_OTP_RESEND_REQUESTED", {
          phoneNumber: sessionDetails?.data?.phoneNumber
        });
      })
      .catch((e: any) => {
        recordCleverTapEvent("SIGN_IN_2FA_OTP_RESEND_FAILED", {
          phoneNumber: sessionDetails?.data?.phoneNumber,
          Error: e?.response?.data?.details
        });
        console.log(e);
      });
  };

  const handleFirstResendClick = () => {
    setFirstOTPResendButton(false);
  };

  return (
    <>
      <Grid container rowGap={3}>
        <Grid item xs={12}>
          <Box>
            <TextView text={textStrings.TITLE} component={"h1"} variant={"Bold_36"} />
            <TextView text={textStrings.SUBTITLE} component={"h6"} variant={"Medium_16"} color={"text.quaternary"} />
            <TextView text={`            mobile number ${phoneNumber}`} component={"h6"} variant={"Medium_16"} color={"text.quaternary"} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              height: "50vh",
              mt: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
            component={"form"}
            onSubmit={handleSubmitOTP}
          >
            <Grid container gap={2}>
              <Grid item xs={12}>
                <BasicTextFields
                  autoFocus={true}
                  backgroundColor={"background.primary"}
                  label={"Enter OTP"}
                  placeholder={"000-000"}
                  variant="outlined"
                  id="otp"
                  name="otp"
                  type="number"
                  onChange={(event) => {
                    setPhoneOTP(event.target.value);
                    setOtpError("");
                  }}
                />
                {otpError.length > 0 && <TextView variant={"Medium_12"} color={"text.error"} text={otpError} />}
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextView variant={"Medium_14"} text={"Didn't receive SMS?"} color={"text.quaternary"} />

                  {firstOTPResendButton ? (
                    <OtpTimer textColor={"#E2FF6F"} buttonColor={"#E2FF6F"} background="#0e0e0f" minutes={0} seconds={59} text=" " ButtonText="Resend" resend={handleResendOTP} />
                  ) : (
                    <TextView
                      variant={"Medium_14"}
                      component={"span"}
                      color="text.main"
                      text={"                      Resend"}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleFirstResendClick();
                        handleResendOTP();
                      }}
                    />
                  )}
                  {isOTPSent && <TextView component={"h4"} text={"Sent!"} />}
                </Box>
              </Grid>
            </Grid>

            <CustomButton label="Submit" style={SUBMIT_BUTTON} type="submit" isDisabled={loader} isloading={loader} variant="primary" />
          </Box>
        </Grid>
      </Grid>

      <CustomButton onClick={logoutApp} label={"Login With Another Account?"} variant="secondary" />
    </>
  );
}

export default MobileSignInVerification;
