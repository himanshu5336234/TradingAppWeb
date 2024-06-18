import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, InputAdornment } from "@mui/material";

import OtpTimer from "otp-timer";
import Session from "supertokens-web-js/recipe/session";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import userology from "userology-sdk";
import { useNavigate } from "react-router-dom";

import { logoutApp } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";

import { createOTPApi, consumeOTPApi, resendOTPApi } from "@/frontend-api-service/Api/SessionManagement";

import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { GetAppURL } from "@/frontend-api-service/Base";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import { usePostHog } from "posthog-js/react";
import OnBoardingLayout from "../OnBoardingLayout";
import TextView from "@/components/UI/TextView/TextView";
import { IndianFlagIcon } from "@/assets/icons";
import { recordCleverTapEvent } from "@/utils/recordCleverTapEvent";
import clevertap from "clevertap-web-sdk";
const textStrings = {
  TITLE: "Mobile Verification",
  SUBTITLE: "Enter your mobile number and OTP to complete Two Factor Authorisation",
  EMAIL: "E-mail Id",
  SIGNUPWITHEMAIL: "Sign Up with Email"
};

function MobileVerification() {
  const [loader, setloader] = useState(false);
  const postHog = usePostHog();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [isRequestOTP, setIsRequestOTP] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [sessionDetails, setSessionDetails] = useState({
    data: { preAuthSessionId: "", deviceId: "" }
  });
  const [isOTPButtonDisabled, setIsOTPButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const [isOTPSent, setIsOTPSent] = useState("");
  const isMobilePresentChecked = useRef(false);
  const [editPhoneNo, setEditPhoneNo] = useState(true);
  const [firstOTPResendButton, setFirstOTPResendButton] = useState(true);

  useEffect(() => {
    if (!isMobilePresentChecked.current) {
      isMobilePresentChecked.current = true;
      void Session.doesSessionExist().then((isSessionPresent) => {
        if (isSessionPresent) {
          void Session.getAccessTokenPayloadSecurely().then((sessionSnapshot) => {
            if (sessionSnapshot.phoneNumber) navigate("/auth");
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    const userEmail = window.localStorage.getItem("socialLoginEmail");
    if (userEmail) {
      recordCleverTapEvent("SIGNUP_FIRST_FACTOR_COMPLETED", {
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

  function handleSubmitOTP() {
    if (phoneOTP.length === 0) {
      setOtpError("OTP is Required");
    } else if (phoneOTP.length !== 6) {
      setOtpError("OTP must be 6 digits!");
    } else {
      consumeOTPApi(
        JSON.stringify({
          preAuthSessionId: sessionDetails.data.preAuthSessionId,
          deviceId: sessionDetails.data.deviceId,
          userInputCode: phoneOTP
        })
      )
        .then((isSecondFactorCompleted: { data: { status: string } }) => {
          if (isSecondFactorCompleted.data.status === "OK") {
            localStorage.setItem("isSignedUp", true);
            window.location.href = GetAppURL() + "/referral";
            recordCleverTapEvent("SIGN_UP_2FA_COMPLETED", {
              phoneNumber: "+91" + phoneNumber
            });
            postHog.capture("sign_up_completed", {
              event_time: new Date().toUTCString()
            });
          }
          if (isSecondFactorCompleted.data.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
            recordCleverTapEvent("SIGN_UP_VALIDATE_OTP_FAILED", {
              Error: "INCORRECT_USER_INPUT_CODE_ERROR",
              phoneNumber: "+91" + phoneNumber
            });
            setOtpError("Invalid OTP, Please retry!");
          }
        })
        .catch((e) => {
          recordCleverTapEvent("SIGN_UP_VALIDATE_OTP_FAILED", {
            Error: e?.response?.data?.details,
            phoneNumber: "+91" + phoneNumber
          });
          setOtpError("Something went wrong, Please retry!");
        });
    }
  }

  function handleSubmitPhone() {
    if (phoneNumber.length === 0) {
      setPhoneError("Phone Number is required");
    } else if (phoneNumber.length !== 10) {
      setPhoneError("Phone Number must be 10 digits");
    } else {
      setloader(true);
      recordCleverTapEvent("SIGN_UP_REQUEST_OTP_BTN_CLICKED", {});
      createOTPApi(
        JSON.stringify({
          phoneNumber: "+91" + phoneNumber
        })
      ).then(
        (
          sessionDetailsFromServer: React.SetStateAction<{
            data: { preAuthSessionId: string; deviceId: string };
          }>
        ) => {
          setloader(false);
          if (sessionDetailsFromServer.data.status === "OK") {
            setSessionDetails(sessionDetailsFromServer);
            setIsRequestOTP(true);
            setEditPhoneNo(false);
            recordCleverTapEvent("SIGN_UP_REQUEST_OTP_SUCCESS", {
              phoneNumber: "+91" + phoneNumber
            });
          } else if (sessionDetailsFromServer.data.status === "GENERAL_ERROR") {
            setPhoneError(sessionDetailsFromServer.data.message);
            recordCleverTapEvent("SIGN_UP_REQUEST_OTP_FAILED", {
              Error: sessionDetailsFromServer.data.message,
              phoneNumber: "+91" + phoneNumber
            });
          }
        }
      );
    }
  }

  const handleResendOTP = () => {
    recordCleverTapEvent("SIGN_UP_2FA_OTP_RESEND_CLICKED", {});
    resendOTPApi(
      JSON.stringify({
        preAuthSessionId: sessionDetails.data.preAuthSessionId,
        deviceId: sessionDetails.data.deviceId
      })
    )
      .then(() => {
        setIsOTPSent(true);
        setIsOTPButtonDisabled(true);
        setTimeout(() => {
          setIsOTPButtonDisabled(false);
          setIsOTPSent(false);
        }, 30000);
      })
      .catch(() => {
        setOtpError("Something went Wrong, Please Retry");
      });
  };

  const handleFirstResendClick = () => {
    setFirstOTPResendButton(false);
  };

  return (
    <OnBoardingLayout>
      <Grid container rowGap={3}>
        <Grid item xs={12}>
          <Box>
            <TextView text={textStrings.TITLE} component={"h1"} variant={"Bold_36"} />
            <TextView text={textStrings.SUBTITLE} component={"h6"} variant={"Medium_16"} color={"text.quaternary"} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              minHeight: "50vh",
              mt: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Grid container gap={2}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      backgroundColor: "background.primary",
                      p: "20px",
                      borderRadius: "6px"
                    }}
                  >
                    <Box src={IndianFlagIcon} component={"img"} />
                    <TextView text={"+91"} />
                  </Box>
                  <BasicTextFields
                    autoFocus={true}
                    Error={Boolean(phoneError.length)}
                    variant="outlined"
                    type={"number"}
                    placeholder={"99999 99999"}
                    backgroundColor={"background.primary"}
                    label=" Mobile Number"
                    value={phoneNumber}
                    disabled={!editPhoneNo}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                      setPhoneError("");
                    }}
                    InputProps={{
                      endAdornment: (
                        <>
                          <InputAdornment position="end">
                            <EditOutlinedIcon
                              sx={{ width: "15px" }}
                              onClick={() => {
                                setIsRequestOTP(false);
                                setEditPhoneNo(true);
                              }}
                            />
                          </InputAdornment>
                        </>
                      )
                    }}
                  />
                </Box>
                {phoneError && <TextView text={phoneError} variant="Medium_12" color={"text.error"} />}
              </Grid>
              <Grid item xs={12}>
                {isRequestOTP && (
                  <>
                    <Grid item xs={12}>
                      <BasicTextFields
                        autoFocus={true}
                        value={phoneOTP}
                        placeholder={"000-000"}
                        backgroundColor={"background.primary"}
                        label={"Enter OTP"}
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
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <TextView variant={"Medium_14"} text={"Didn't receive SMS?"} color={"text.quaternary"} />

                      {firstOTPResendButton ? (
                        <OtpTimer textColor={"#E2FF6F"} buttonColor={"#E2FF6F"} background="#0e0e0f" minutes={0} seconds={59} text=" " ButtonText="Resend" resend={handleResendOTP} />
                      ) : (
                        <TextView
                          variant={"Medium_14"}
                          component={"span"}
                          color="text.main"
                          text={"Resend"}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleFirstResendClick();
                            handleResendOTP();
                          }}
                        />
                      )}
                      {isOTPSent && <TextView component={"h4"} text={"Sent!"} />}
                    </Box>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {isRequestOTP ? (
        <CustomButton isDisabled={loader} isloading={loader} label={"Submit"} variant="primary" type="submit" onClick={() => handleSubmitOTP()} />
      ) : (
        <CustomButton isDisabled={loader} isloading={loader} label={"Request OTP"} type="submit" variant="primary" onClick={() => handleSubmitPhone()} />
      )}

      <Box mt={2}>
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
            onClick={() => {
              logoutApp();
            }}
          />
        </TextView>
      </Box>
    </OnBoardingLayout>
  );
}

export default MobileVerification;
