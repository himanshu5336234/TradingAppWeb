import React, { useState, useEffect } from "react";
import { Box, Grid, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import PasswordStrength from "@/components/UI/PasswordStrength/PasswordStrength";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { resetPasswordApi } from "@/frontend-api-service/Api/SessionManagement";
import { useNavigate } from "react-router-dom";

import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import OnBoardingLayout from "../OnBoardingLayout";
import { Eyeicon } from "@/assets/icons";
import TextView from "@/components/UI/TextView/TextView";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
const textStrings = {
  TITLE: "Reset Password",
  SUBTITLE: "Create a New password to Sign In",
  NEWPASSWORD: "Enter New Password",
  REENTERPASSWORD: "Re-enter New Password",
  BACK: "Reset password"
};

function ResetPassword() {
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [showPasswordStrengthForRe, setShowPasswordStrengthForRe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPasswordForRe, setShowPasswordForRe] = useState(false);
  const handleClickShowPasswordForRe = () => setShowPasswordForRe((show) => !show);
  const mobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  useEffect(() => {
    if (!new URLSearchParams(window.location.href.substring(window.location.href.indexOf("?"))).get("token")) {
      navigate("/auth");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      repassword: ""
    },
    onSubmit: (values) => {
      resetPasswordApi(
        JSON.stringify({
          method: "token",
          formFields: [
            {
              id: "password",
              value: values.password
            }
          ],
          token: new URLSearchParams(window.location.href.substring(window.location.href.indexOf("?"))).get("token")
        })
      ).then((isPasswordReset) => {
        if (isPasswordReset.data.status === "OK") {
          navigate("/auth");
        }
      });
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required("You are required to enter password")
        .min(8, "Password must be atleast 8 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Password must satisfy all the conditions"),
      repassword: yup
        .string()
        .required("You are required to re-enter password")
        .min(8, "Password must be atleast 8 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Password must satisfy all the conditions")
        .oneOf([yup.ref("password"), null], "Passwords do not match")
    })
  });

  const handleFocus = (event, type) => {
    if (event.type === "focus") {
      setShowPasswordStrength(true);
    } else if (event.type === "blur") {
      setShowPasswordStrength(false);
    }
  };

  const handleFocusForRe = (event, type) => {
    if (event.type === "focus") {
      setShowPasswordStrengthForRe(true);
    } else if (event.type === "blur") {
      setShowPasswordStrengthForRe(false);
    }
  };

  return (
    <OnBoardingLayout>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12}>
          <Box>
            <TextView text={textStrings.TITLE} component={"h1"} variant={"Bold_36"} />
            <TextView text={textStrings.SUBTITLE} component={"h6"} variant={"Medium_16"} color={"text.quaternary"} />
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
            onSubmit={formik.handleSubmit}
          >
            <Grid container gap={2}>
              <Grid item position={"relative"} xs={12}>
                <BasicTextFields
                  label={textStrings.NEWPASSWORD}
                  backgroundColor={"background.primary"}
                  autoFocus={true}
                  id="password"
                  placeholder={textStrings.NEWPASSWORD}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" disableTypography>
                        <span style={{ cursor: "pointer" }} onClick={() => handleClickShowPassword()}>
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
                        </span>
                      </InputAdornment>
                    )
                  }}
                  onChange={formik.handleChange}
                  onBlur={handleFocus}
                  onFocus={handleFocus}
                  value={formik.values.password}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Box
                  sx={{
                    position: "absolute",
                    right: "0",
                    zIndex: "100000"
                  }}
                >
                  <PasswordStrength password={formik.values.password} isOpen={showPasswordStrength} />
                </Box>
              </Grid>

              <Grid item position={"relative"} xs={12}>
                <BasicTextFields
                  label={textStrings.REENTERPASSWORD}
                  backgroundColor={"background.primary"}
                  placeholder={textStrings.REENTERPASSWORD}
                  id="repassword"
                  name="repassword"
                  type={showPasswordForRe ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" disableTypography>
                        <span style={{ cursor: "pointer" }} onClick={() => handleClickShowPasswordForRe()}>
                          {showPasswordForRe ? (
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
                        </span>
                      </InputAdornment>
                    )
                  }}
                  onChange={formik.handleChange}
                  onBlur={handleFocusForRe}
                  onFocus={handleFocusForRe}
                  value={formik.values.repassword}
                  error={formik.touched.repassword && Boolean(formik.errors.repassword)}
                  helperText={formik.touched.repassword && formik.errors.repassword}
                  InputLabelProps={{
                    style: { color: "#4E4E55" }
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    right: "0",
                    zIndex: "100000"
                  }}
                >
                  <PasswordStrength password={formik.values.repassword} isOpen={showPasswordStrengthForRe} />
                </Box>
              </Grid>
            </Grid>
            <CustomButton label="Submit" type="submit" variant="primary" />
          </Box>
        </Grid>
      </Grid>
    </OnBoardingLayout>
  );
}

export default ResetPassword;
