import { Box, Container, InputAdornment, Link, Typography } from "@mui/material";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import React, { useState } from "react";
import { PASSWORD_CHANGE_MODAL_BODY_STYLE, PASSWORD_ERROR_WRAPPER } from "./Styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SecurityOTPModal from "../SecurityOTPModal/SecurityOTPModal";
import { changePasswordApi } from "API/Api";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordApi } from "API/Api/SessionManagement";
import ErrorIcon from "@mui/icons-material/Error";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Regx } from "@/utils/constants";
import AlertModal from "@/components/UI/CustomModals/AlertModal";
import PropTypes from "prop-types";
import { ENTER_NEW_PASSWORD, ENTER_OLD_PASSWORD, FORGOT_PASSWORD } from "./Constants";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";

// validate old and new passwords
const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string()
    .min(8, "Password must contain at least 8 characters")
    .matches(Regx.passwordRegExp, "Password must contain at least one uppercase, one lowercase, one number and one special character")
    .notOneOf([Yup.ref("oldPassword"), null], "You have Entered Your Old Password")
    .required("New Password is required")
});

function ChangePasswordModal({ openPasswordModal, setOpenPasswordModal }) {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openOTPModal, setOpenOTPModal] = useState(false);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.profile.profileDetails);

  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "" },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      handleSubmitPasswordChange();
    }
  });
  const { values, handleBlur, handleChange, handleSubmit, touched, errors, resetForm } = formik;

  const toggleOldPasswordVisibility = () => {
    setIsOldPasswordVisible((show) => !show);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((show) => !show);
  };

  const handleCancelPasswordChange = () => {
    resetForm();
    setOpenPasswordModal(false);
  };

  const handleSubmitPasswordChange = () => {
    setOpenPasswordModal(false);
    setOpenConfirmationModal(true);
  };

  const handleConfirmation = () => {
    changePasswordApi(JSON.stringify({ oldPassword: values.oldPassword, newPassword: values.newPassword }))
      .then((response) => {
        if (response?.data?.status === "success") {
          dispatch(
            showSnackBar({
              src: "CHANGE_PASSWORD_SUCCESS",
              message: "Change Password Successful",
              type: "success"
            })
          );
          resetForm();
        } else {
          dispatch(
            showSnackBar({
              src: "CHANGE_PASSWORD_FAILED",
              message: "Incorrect Old Password",
              type: "failure"
            })
          );
          resetForm();
          setOpenPasswordModal(true);
        }
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: "CHANGE_PASSWORD_FAILED",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
    setOpenConfirmationModal(false);
  };

  const forgotPasswordApiBody = {
    formFields: [
      {
        id: "email",
        value: loggedInUser?.email
      }
    ]
  };
  const forgotPassword = () => {
    setOpenPasswordModal(false);
    forgotPasswordApi(JSON.stringify(forgotPasswordApiBody))
      .then((response) => {
        if (response?.data?.status === "OK") {
          dispatch(
            showSnackBar({
              src: "RESET_MAIL_SENT",
              message: "Reset Mail sent Successfully",
              type: "success"
            })
          );
        } else {
          dispatch(
            showSnackBar({
              src: "RESET_MAIL_SENDING_FAILED",
              message: response?.data?.message,
              type: "failure"
            })
          );
        }
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: "RESET_MAIL_SENDING_FAILED",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomModal
        IsOpen={openPasswordModal}
        primaryName="Submit"
        secondaryName="Cancel"
        primaryAction={handleSubmit}
        secondaryAction={handleCancelPasswordChange}
        isSecondaryAction={true}
        isPrimaryAction={true}
      >
        <Container sx={PASSWORD_CHANGE_MODAL_BODY_STYLE}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{ENTER_OLD_PASSWORD}</Typography>
            <BasicTextFields
              name="oldPassword"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment sx={{ cursor: "pointer" }} position="end">
                    <Box sx={{ display: "flex" }} aria-label="toggle password visibility" onClick={toggleOldPasswordVisibility}>
                      {isOldPasswordVisible ? <VisibilityIcon sx={{ fontSize: "18px" }} /> : <VisibilityOffIcon sx={{ width: "18px" }} />}
                    </Box>
                  </InputAdornment>
                )
              }}
              error={touched.oldPassword && Boolean(errors.oldPassword)}
              onBlur={handleBlur}
              type={isOldPasswordVisible ? "text" : "password"}
              value={values.oldPassword}
              styles={{ width: "90%", mb: 0 }}
              onChange={handleChange}
            />
            <Box sx={PASSWORD_ERROR_WRAPPER}>
              {Boolean(errors.oldPassword) && touched.oldPassword && (
                <Typography variant="Regular_12" color="text.error" component={"p"} sx={{ display: "flex" }}>
                  <ErrorIcon fontSize="14px" sx={{ mt: 0.2, mx: 0.3 }} />

                  {errors.oldPassword}
                </Typography>
              )}
            </Box>
            <Link sx={{ cursor: "pointer", pt: 0.2 }} onClick={forgotPassword}>
              {FORGOT_PASSWORD}
            </Link>
          </Box>
          <Box>
            <Typography>{ENTER_NEW_PASSWORD}</Typography>
            <BasicTextFields
              name="newPassword"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment sx={{ cursor: "pointer" }} position="end">
                    <Box sx={{ display: "flex" }} aria-label="toggle password visibility" onClick={toggleNewPasswordVisibility}>
                      {isNewPasswordVisible ? <VisibilityIcon sx={{ fontSize: "18px" }} /> : <VisibilityOffIcon sx={{ width: "18px" }} />}
                    </Box>
                  </InputAdornment>
                )
              }}
              type={isNewPasswordVisible ? "text" : "password"}
              value={values.newPassword}
              error={touched.oldPassword && Boolean(errors.oldPassword)}
              styles={{ width: "90%", mb: 0 }}
              onChange={handleChange}
              onBlur={handleBlur}
            ></BasicTextFields>
            <Box sx={PASSWORD_ERROR_WRAPPER}>
              {Boolean(errors.newPassword) && touched.newPassword && (
                <Typography variant="Regular_12" color="text.error" component={"p"} sx={{ display: "flex" }}>
                  <ErrorIcon fontSize="14px" sx={{ mt: 0.2, mx: 0.3 }} />
                  {errors.newPassword}
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </CustomModal>
      <AlertModal
        IsOpen={openConfirmationModal}
        title={"Are you sure you want to add password."}
        primaryName={"confirm"}
        primaryAction={handleConfirmation}
        handelClose={() => setOpenConfirmationModal(false)}
      ></AlertModal>
      <SecurityOTPModal IsOpen={openOTPModal} handleCancelAction={() => setOpenOTPModal(false)} handleSubmitAction={() => setOpenOTPModal(false)} passwordObj={values} />
    </form>
  );
}

export default ChangePasswordModal;

ChangePasswordModal.propTypes = {
  openPasswordModal: PropTypes.bool,
  setOpenPasswordModal: PropTypes.func
};
