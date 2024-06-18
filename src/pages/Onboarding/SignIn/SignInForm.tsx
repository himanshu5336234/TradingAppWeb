import CustomButton from "@/components/UI/CustomButton/CustomButton";
import TextView from "@/components/UI/TextView/TextView";
import { Box, Button, Grid, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import ResetPasswordModal from "@/components/CustomModals/ResetPasswordModal";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import clevertap from "clevertap-web-sdk";
import { signInApi, getAuthorisationUrl } from "@/frontend-api-service/Api/SessionManagement";
import { GetAppURL } from "@/frontend-api-service/Base";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { GoogleLogoIcon, Eyeicon } from "@/assets/icons";
import { recordCleverTapEvent } from "@/utils/recordCleverTapEvent";
const SignInForm = () => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: ""
    },
    onSubmit: (values) => {
      setloader(true);
      recordCleverTapEvent("SIGN_IN_FIRST_FACTOR_BTN_CLICKED", {
        Email: values.email
      });
      window.localStorage.removeItem("socialLoginError");
      signInApi(
        JSON.stringify({
          formFields: [
            {
              id: "email",
              value: values.email
            },
            {
              id: "password",
              value: values.password
            }
          ]
        })
      )
        .then((firstFactorCompleted: { data: { status: string; message: any } }) => {
          setloader(false);
          if (firstFactorCompleted.data.status === "OK") {
            window.gtag("event", "user_data", {
              email: values.email
            });
            clevertap.onUserLogin.push({
              Site: {
                Identity: values.email,
                Email: values.email
              }
            });
            recordCleverTapEvent("SIGN_IN_FIRST_FACTOR_COMPLETED", {
              Email: values.email
            });
            navigate("/auth");
          } else if (firstFactorCompleted.data.status === "WRONG_CREDENTIALS_ERROR") {
            formik.setErrors({
              email: "Incorrect E-mail and Password combination!"
            });
          } else {
            formik.setErrors({
              email: firstFactorCompleted.data.message
            });
          }
        })
        .catch(() => {
          setloader(false);
          formik.setErrors({
            email: "Something went wrong. Please try again later!"
          });
        });
    },
    validationSchema: yup.object({
      password: yup.string().required("Password is required"),
      email: yup.string().required("Email is required").email("Enter a valid email")
    })
  });
  const handleGoogleSignIn = () => {
    getAuthorisationUrl().then((urlCallback: { data: { status: string; url: string } }) => {
      if (urlCallback.data.status === "OK") {
        window.location.href = urlCallback.data.url + "&redirect_uri=" + GetAppURL() + "/auth/callback/google";
      }
    });
  };
  const textStrings: {
    TITLE: string;
    SUBTITLE: string;
    EMAIL: string;
    SIGNINWITHEMAIL: string;
    SIGNINWITHEGOOGLE: string;
    FORGETPASSWORD: string;
  } = {
    TITLE: "Welcome Back to Density!",
    SUBTITLE: "Welcome back! Login to your account.",
    EMAIL: "E-mail Id",
    SIGNINWITHEMAIL: "Sign In with Email",
    SIGNINWITHEGOOGLE: "Sign In with Google",
    FORGETPASSWORD: "Forgot Password?"
  };

  return (
    <>
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
            component={"form"}
            onChange={() => window.localStorage.removeItem("socialLoginError")}
            onSubmit={formik.handleSubmit}
          >
            <Grid container gap={2}>
              <Grid item xs={12}>
                <BasicTextFields
                  autoFocus={true}
                  backgroundColor={"background.primary"}
                  label={"Enter Email"}
                  variant="outlined"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  Error={formik.touched.email && Boolean(formik.errors.email)}
                />
                {formik.touched.email && formik.errors.email?.length && <TextView variant="Medium_12" color={"text.error"} text={formik.errors.email} />}
              </Grid>
              <Grid item xs={12}>
                <BasicTextFields
                  backgroundColor={"background.primary"}
                  label={"Enter Password"}
                  variant="outlined"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  Error={formik.touched.password && Boolean(formik.errors.password)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" disableTypography>
                        <Box style={{ cursor: "pointer", paddingTop: 6 }} onClick={() => handleClickShowPassword()}>
                          {showPassword ? (
                            <Box
                              sx={{
                                background: "linear-gradient(to top right, #00000008 calc(50% - 1px), #fff , transparent calc(43% + 1px) )"
                              }}
                              component={"img"}
                              src={Eyeicon}
                            />
                          ) : (
                            <Box component={"img"} src={Eyeicon} />
                          )}
                        </Box>
                      </InputAdornment>
                    )
                  }}
                />
                {formik.touched.password && formik.errors.password?.length && <TextView variant="Medium_12" color={"text.error"} text={formik.errors.password} />}
              </Grid>
              <Grid item xs={12}>
                <TextView onClick={() => setShowResetPassword(true)} style={{ cursor: "pointer" }} text={textStrings.FORGETPASSWORD} component={"p"} variant={"Medium_14"} />
              </Grid>
            </Grid>
            <CustomButton label="Next" style={{ my: 1, width: "100%", p: 1.2 }} type="submit" isDisabled={loader} isloading={loader} variant="primary" />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%" }}>
        <Button onClick={handleGoogleSignIn} variant="secondary">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box component={"img"} src={GoogleLogoIcon} alt="logo" />
            <TextView text={textStrings.SIGNINWITHEGOOGLE} variant="Bold_14" />
          </Box>
        </Button>
        {window.localStorage.getItem("socialLoginError") && <TextView variant={"Medium_12"} text={window.localStorage.getItem("socialLoginError")} color={"text.error"} />}
      </Box>
      <Box my={1}>
        <TextView component={"p"} variant={"Medium_14"}>
          <TextView text={"New to Density?  "} color="text.quaternary" variant={"Medium_14"} component={"span"} />
          <TextView
            variant={"Medium_14"}
            text={"Sign Up"}
            component={"span"}
            color="text.main"
            style={{
              cursor: "pointer"
            }}
            onClick={() => navigate("/auth/signup")}
          />
        </TextView>
      </Box>

      {showResetPassword && <ResetPasswordModal isOpen={showResetPassword} close={() => setShowResetPassword(false)} />}
    </>
  );
};

export default SignInForm;
