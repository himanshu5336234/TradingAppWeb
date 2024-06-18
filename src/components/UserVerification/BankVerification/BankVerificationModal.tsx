import React, { useRef, FC, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import TextView from "@/components/UI/TextView/TextView";
import CustomModal from "../../CustomModals/newModal/CustomModal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Regx } from "@/utils/constants";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";

import PropTypes from "prop-types";
interface BankVerificationModalProps {
  IsOpen: boolean;
  handelClose: () => void;
  action: (values: object) => void;
}
const BankVerificationModal: FC<BankVerificationModalProps> = ({ IsOpen, handelClose, action }) => {
  const FormSubmit = useRef<HTMLButtonElement | null>(null);
  const formik = useFormik({
    initialValues: {
      accountHoldersName: "",
      accountNumber: "",
      ifsc: ""
    },
    onSubmit: (values) => {
      action({
        ...values,
        accountNumber: values.accountNumber.toString()
      });
    },

    validationSchema: Yup.object({
      accountHoldersName: Yup.string().required("Name as per your bank account is mandatory").matches(Regx.alfabetsRegExp, "Only alphabets are allowed for this field"),
      accountNumber: Yup.string().required("Account number is required").matches(Regx.NumberRegex, "Invalid Account number"),
      ifsc: Yup.string().required("IFSC code is required").matches(Regx.ifscRegExp, "Invalid IFSC Code")
    })
  });

  const FormDataSubmit = () => {
    FormSubmit.current?.click();
  };
  useEffect(() => {
    formik.handleReset();
    return () => {
      formik.handleReset();
    };
  }, []);

  return (
    <CustomModal
      primaryName="Confirm"
      isClose={true}
      primaryAction={FormDataSubmit}
      isPrimaryAction={true}
      isSecondaryAction={true}
      secondaryName="Dismiss"
      secondaryAction={() => {
        formik.handleReset();
        handelClose();
      }}
      ContainerSx={{
        maxWidth: { sm: "460px", xs: "320px", lg: "500px", md: "460px" }
      }}
      IsOpen={IsOpen}
      close={() => {
        formik.handleReset();
        handelClose();
      }}
    >
      <Grid item p={1.2}>
        <TextView component={"p"} variant="Medium_16" text={"Bank Verification"} />
      </Grid>
      <form onSubmit={formik.handleSubmit}>
        <Grid container sx={{ p: 1 }}>
          <Grid item xs={12}>
            <BasicTextFields
              name="accountHoldersName"
              value={formik.values.accountHoldersName.toUpperCase()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorText={formik.touched.accountHoldersName ? formik.errors.accountHoldersName : ""}
              type="text"
              label="Account Holder Name "
              placeholder={"NAME XYZ"}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "14px" }}>
            <BasicTextFields
              name="accountNumber"
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              errorText={formik.touched.accountNumber ? formik.errors.accountNumber : ""}
              type="text"
              label="Account Number"
              placeholder={"123456789"}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "14px" }}>
            <BasicTextFields
              name="ifsc"
              value={formik.values.ifsc.toUpperCase()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              type="text"
              label="IFSC Code"
              placeholder={"ABC 123"}
              errorText={formik.touched.ifsc ? formik.errors.ifsc : ""}
            />
          </Grid>
          <Button sx={{ display: "none" }} type="submit" ref={FormSubmit}></Button>
        </Grid>
      </form>
    </CustomModal>
  );
};

BankVerificationModal.propTypes = {
  IsOpen: PropTypes.bool.isRequired,
  handelClose: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired
};

export default BankVerificationModal;
