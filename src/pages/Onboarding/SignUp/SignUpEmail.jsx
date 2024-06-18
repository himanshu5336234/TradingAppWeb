import React, { useState } from "react";
import { Grid, Box, Link } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import { emailVerificationOtpCreate } from "@/frontend-api-service/Api/SessionManagement";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import { posthog } from "posthog-js";
import TextView from "@/components/UI/TextView/TextView";
import CustomCheckBox from "@/components/UI/CheckBox/CustomCheckBox";
import clevertap from "clevertap-web-sdk";
import { recordCleverTapEvent } from "@/utils/recordCleverTapEvent";

const textStrings = {
  TITLE: "Get Started with Density!",
  SUBTITLE: "Create your account. Select a method to Sign Up:",
  EMAIL: "Email Id",
  SIGNUPWITHEMAIL: "Sign Up with Email"
};
function SignUpEmail({ setCurrentScreen, userEmail, setUserEmail, setFlowID, isTermsChecked, setIsTermsChecked, termsError, setTermsError, textStringsTerms }) {
  const [loader, setloader] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: userEmail
    },
    onSubmit: (values) => {
      window.localStorage.removeItem("socialLoginError");
      if (isTermsChecked) {
        clevertap.onUserLogin.push({
          Site: {
            Identity: values.email,
            Email: values.email
          }
        });
        posthog.capture("email_signup_initiated", {
          email: values.email,
          event_time: new Date().toUTCString()
        });

        setloader(true);
        emailVerificationOtpCreate(
          JSON.stringify({
            email: values.email
          })
        )
          .then((isOTPCreated) => {
            setloader(false);
            if (isOTPCreated.status === 200) {
              recordCleverTapEvent("SIGNUP_FLOW_STARTED", {
                Email: values.email,
                mode: "EMAIL_PASSWORD"
              });
              window.gtag("event", "user_data", {
                email: values.email
              });

              setCurrentScreen("OTPandEmail");
              setUserEmail(values.email);
              setFlowID(isOTPCreated.data.flowID);
            }
          })
          .catch((error) => {
            setloader(false);
            recordCleverTapEvent("SIGNUP_FLOW_FAILED", {
              Email: values.email,
              Error: error.response.data.details,
              mode: "EMAIL_PASSWORD"
            });
            if (error.response.status === 400) {
              formik.setErrors({
                email: error.response.data.details
              });
            }
          });
      } else {
        setTermsError("You need to accept our terms and privacy policy to create an account.");
      }
    },
    validateOnBlur: false,
    validationSchema: yup.object({
      email: yup.string("Enter your email").email("Enter a valid email").required("Email is required")
    })
  });
  return (
    <>
      <Box
        sx={{
          minHeight: "50vh",
          mt: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
        component={"form"}
        onChange={() => window.localStorage.removeItem("socialLoginError")}
        onSubmit={formik.handleSubmit}
      >
        <Grid container gap={2}>
          <Grid item xs={12}>
            <BasicTextFields
              backgroundColor={"background.primary"}
              label={textStrings.EMAIL}
              autoFocus={true}
              fullWidth
              variant="outlined"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={String(formik.values.email)}
              Error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && Boolean(formik.errors.email) && <TextView variant="Medium_12" color={"text.error"} text={formik.errors.email} />}
          </Grid>
          <Grid xs={12} item>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CustomCheckBox
                varient="primary"
                label={textStringsTerms.TERMS}
                id="don't-show-me-checkbox"
                checked={isTermsChecked}
                onchange={() => {
                  setIsTermsChecked(!isTermsChecked);
                  setTermsError("");
                }}
              />
              <TextView variant={"Medium_12"} color="text.quaternary">
                <Link
                  sx={{
                    color: "text.quaternary"
                  }}
                  href="https://density.exchange/policies/terms-of-use"
                  rel="noreferrer"
                  target={"_blank"}
                >
                  {textStringsTerms.TERMSOFSERVICE}
                </Link>

                <TextView style={{ mx: 0.5 }} text={"and"} color="text.quaternary" />
                <Link
                  sx={{
                    color: "text.quaternary"
                  }}
                  href="https://density.exchange/policies/privacy-policy"
                  rel="noreferrer"
                  target={"_blank"}
                >
                  {textStringsTerms.POLICY}
                </Link>
              </TextView>
            </Box>
            {termsError && <TextView variant="Regular_12" color={"text.error"} text={termsError} />}
          </Grid>
        </Grid>
        <CustomButton
          isloading={loader}
          isDisabled={loader || Boolean(formik.errors.email)}
          label={"Request OTP"}
          type="submit"
          variant="primary"
          style={{ width: "100%", my: 1, p: 1.2 }}
          onClick={() => {
            recordCleverTapEvent("SIGNUP_BTN_CLICKED", {
              Email: values.email
            });
          }}
        />
      </Box>
    </>
  );
}

SignUpEmail.propTypes = {
  setCurrentScreen: PropTypes.func,
  userEmail: PropTypes.string,
  setUserEmail: PropTypes.func,
  setFlowID: PropTypes.func,
  isTermsChecked: PropTypes.bool,
  setIsTermsChecked: PropTypes.func,
  termsError: PropTypes.string,
  setTermsError: PropTypes.func,
  textStringsTerms: PropTypes.object
};

export default SignUpEmail;
