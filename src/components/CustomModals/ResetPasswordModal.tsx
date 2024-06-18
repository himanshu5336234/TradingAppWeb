/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { forgotPasswordApi } from "@/frontend-api-service/Api/SessionManagement";
import { useNavigate } from "react-router-dom";
import BasicTextFields from "../UI/CustomInput/BasicTextFields";
import CustomModal from "./newModal/CustomModal";
import OtpTimer from "otp-timer";
import TextView from "../UI/TextView/TextView";
import LockOutImg from "ASSETS/images/SignalTradingLandingPage/LockOut.svg";
const ResetPassword = ({ isOpen, close }: { isOpen: boolean; close: Function }) => {
  const EMAIL = useRef("");
  const [firstOTPResendButton, setFirstOTPResendButton] = useState(true);
  const [sentEmailSuccess, setSentEmailSuccess] = useState({
    email: "",
    status: false
  });
  const navigate = useNavigate();

  const FORGETPASSWORD = (value: string) => {
    function callForgetPassApi(email: string) {
      forgotPasswordApi(
        JSON.stringify({
          formFields: [
            {
              id: "email",
              value: email
            }
          ]
        })
      )
        .then((isPasswordResetEmailSent: { data: { status: string; message: string | any[] } }) => {
          if (isPasswordResetEmailSent.data.status === "OK") {
            setSentEmailSuccess({ email, status: true });
          } else if (isPasswordResetEmailSent.data.status === "GENERAL_ERROR" && isPasswordResetEmailSent.data.message.length > 0) {
            formik.setErrors({
              email: isPasswordResetEmailSent.data.message
            });
          }
        })
        .catch((error: { data: { message: any } }) =>
          formik.setErrors({
            email: error.data.message
          })
        );
    }
    callForgetPassApi(value);
    EMAIL.current = value;
  };
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: (values) => {
      FORGETPASSWORD(values.email);
    },

    validationSchema: yup.object({
      email: yup.string().email("Enter a valid email").required("Email is required")
    })
  });
  const handleFirstResendClick = () => {
    setFirstOTPResendButton(false);
  };
  const redirectOnSuccess = () => {
    close();
    navigate("/auth");
  };
  return (
    <CustomModal
      ContainerSx={{ maxWidth: { xs: "420px" } }}
      IsOpen={isOpen}
      close={close}
      isClose={true}
      isSecondaryAction={true}
      secondaryName={"Dismiss"}
      isPrimaryAction={true}
      primaryName={sentEmailSuccess.status === true ? "ok" : "Send Link"}
      primaryAction={sentEmailSuccess.status === true ? redirectOnSuccess : formik.handleSubmit}
    >
      <Grid container gap={2}>
        <Grid>
          <Box component={"img"} height={"64px"} src={LockOutImg} alt={LockOutImg} />
        </Grid>
        {!sentEmailSuccess.status && (
          <>
            <Grid item xs={12}>
              <TextView component={"h2"} variant="Regular_28" text={"   Enter your Email"} />
              <TextView component={"p"} color="text.quaternary" variant="Regular_14" text={"A link to reset password will be sent to your email"} />
            </Grid>
            <Grid item xs={12}>
              <BasicTextFields
                label={"Email Id"}
                autoFocus={true}
                variant="outlined"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                Error={formik.touched.email && Boolean(formik.errors.email)}
              />
              {formik.touched.email && Boolean(formik.errors.email) && <TextView variant="Medium_12" color={"text.error"} text={formik.errors.email} />}
            </Grid>
          </>
        )}
        {sentEmailSuccess.status && (
          <>
            <Grid item xs={12}>
              <TextView component={"h2"} variant="Regular_20" text={` A password reset email has been sent to ${sentEmailSuccess.email}`} />
              <TextView style={{ mt: 1 }} component={"p"} color="text.quaternary" variant="Regular_14" text={"Simply click on the link within the email to proceed with resetting your password."} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <TextView component={"p"} color="text.quaternary" variant="Regular_14" text={"Didn't receive Link?"} />
                {firstOTPResendButton ? (
                  <Typography
                    component={"span"}
                    color="text.main"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleFirstResendClick();
                      FORGETPASSWORD(EMAIL.current);
                    }}
                  >
                    Resend
                  </Typography>
                ) : (
                  <OtpTimer textColor={"#E2FF6F"} buttonColor={"#E2FF6F"} background="#242428" minutes={0} seconds={59} text=" " ButtonText="Resend" resend={() => FORGETPASSWORD(EMAIL.current)} />
                )}
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </CustomModal>
  );
};

ResetPassword.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func
};
export default ResetPassword;
