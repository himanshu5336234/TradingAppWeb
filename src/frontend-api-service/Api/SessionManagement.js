import { Format } from "../../helpers/String";

import {
  SIGNIN_URL,
  CREATE_OTP_URL,
  CONSUME_OTP_URL,
  RESEND_OTP_URL,
  FORGOT_PASSWORD_URL,
  SIGNUP_URL,
  SIGNINUP_URL,
  EMAIL_VERIFICATION_OTP_CREATE,
  EMAIL_VERIFICATION_OTP_RESEND,
  GET_AUTHORISATION_URL,
  RESET_PASSWORD_URL,
  RESEND_EMAIL_VERIFICATION_OTP_URL
} from "../URI";

import axiosWithApiServer from "../Utils/axiosHelpers/axiosWithApiServer";

export const signInApi = (loginCredentials) => {
  const url = Format(SIGNIN_URL.url);
  return axiosWithApiServer({
    url,
    method: SIGNIN_URL.reqType,
    body: loginCredentials
  });
};

export const createOTPApi = (phoneNumber) => {
  const url = Format(CREATE_OTP_URL.url);
  return axiosWithApiServer({
    url,
    method: CREATE_OTP_URL.reqType,
    body: phoneNumber
  });
};

export const consumeOTPApi = (otp) => {
  const url = Format(CONSUME_OTP_URL.url);
  return axiosWithApiServer({
    url,
    method: CONSUME_OTP_URL.reqType,
    body: otp
  });
};

export const resendOTPApi = (sessionSnapshot) => {
  const url = Format(RESEND_OTP_URL.url);
  return axiosWithApiServer({
    url,
    method: RESEND_OTP_URL.reqType,
    body: sessionSnapshot
  });
};

export const forgotPasswordApi = (email) => {
  const url = Format(FORGOT_PASSWORD_URL.url);
  return axiosWithApiServer({
    url,
    method: FORGOT_PASSWORD_URL.reqType,
    body: email
  });
};

export const resetPasswordApi = (resetCredentials) => {
  const url = Format(RESET_PASSWORD_URL.url);
  return axiosWithApiServer({
    url,
    method: RESET_PASSWORD_URL.reqType,
    body: resetCredentials
  });
};

export const resendEmailVerificationOtp = (flowID) => {
  const url = Format(RESEND_EMAIL_VERIFICATION_OTP_URL.url);
  return axiosWithApiServer({
    url,
    method: RESEND_EMAIL_VERIFICATION_OTP_URL.reqType,
    body: flowID
  });
};

export const emailVerificationOtpCreate = (email) => {
  const url = Format(EMAIL_VERIFICATION_OTP_CREATE.url);
  return axiosWithApiServer({
    url,
    method: EMAIL_VERIFICATION_OTP_CREATE.reqType,
    body: email
  });
};

export const emailVerificationOtpResend = (email) => {
  const url = Format(EMAIL_VERIFICATION_OTP_RESEND.url);
  return axiosWithApiServer({
    url,
    method: EMAIL_VERIFICATION_OTP_RESEND.reqType,
    body: email
  });
};

export const signUpApi = (userDetails) => {
  const url = Format(SIGNUP_URL.url);
  return axiosWithApiServer({
    url,
    method: SIGNUP_URL.reqType,
    body: userDetails
  });
};

export const getAuthorisationUrl = () => {
  const url = Format(GET_AUTHORISATION_URL.url);
  return axiosWithApiServer({
    url,
    method: GET_AUTHORISATION_URL.reqType
  });
};

export const signInUpWithGoogleApi = (loginCredentials) => {
  const url = Format(SIGNINUP_URL.url);
  return axiosWithApiServer({
    url,
    method: SIGNINUP_URL.reqType,
    body: loginCredentials,
    headers: {
      headers: {
        rid: "thirdpartyemailpassword"
      }
    }
  });
};
