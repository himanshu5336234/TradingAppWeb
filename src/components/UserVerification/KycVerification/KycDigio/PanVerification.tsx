import React, { useState } from "react";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Regx } from "@/utils/constants";
import { Box } from "@mui/system";
import CustomButton from "../../../UI/CustomButton/CustomButton";
import { getPanValidation } from "@/pages/UserVerification/KYCVerification/helpers";
import TextView from "../../../UI/TextView/TextView";
import { useDispatch, useSelector } from "react-redux";

const PanVerification = () => {
  const { getKycDetails } = useSelector((state: any) => state.getKycDetails);
  const dispatch = useDispatch();
  const [failPan, setPanFailure] = useState("");
  const [apiResponseStatus, setApiResponseStatus] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      panNumber: ""
    },
    onSubmit: async (values) => {
      setPanFailure("");
      const payload = {
        ...values,
        fullName: values.fullName.toUpperCase(),
        panNumber: values.panNumber.toUpperCase(),
        dob: "21/08/2000"
      };

      const { status, reason } = await getPanValidation({
        payload,
        callback: setApiResponseStatus
      });
      if (status === "SUCCESS") {
        dispatch({
          type: "NEW_KYC_DETAILS",
          payload: { ...getKycDetails, status: "STARTED" }
        });
      } else if (status === "FAILED") {
        setPanFailure(`Note: ${reason}`);
      }
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Name as per your pan is mandatory").matches(Regx.alfabetsRegExp, "Only alphabets are allowed for this field"),
      panNumber: Yup.string().required("Pan is required").matches(Regx.panRegExp, "Invalid PAN")
    })
  });
  return (
    <Box width={"100%"} maxWidth={"700px"} component={"form"} onSubmit={formik.handleSubmit}>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <BasicTextFields
            backgroundColor={"background.secondary"}
            label={"Full Name ( as per PAN )"}
            errorText={formik.touched.fullName ? formik.errors.fullName : ""}
            name="fullName"
            placeholder={"Full Name"}
            value={formik.values.fullName.toLocaleUpperCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>{" "}
        <Grid item xs={12}>
          <BasicTextFields
            backgroundColor={"background.secondary"}
            errorText={formik.touched.panNumber ? formik.errors.panNumber : ""}
            label={"PAN Number"}
            name="panNumber"
            placeholder={"ABC12XY23"}
            value={formik.values.panNumber.toLocaleUpperCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton isloading={apiResponseStatus} isDisabled={apiResponseStatus} style={{ p: 1.5 }} label={"Continue"} type="submit" />
          <TextView variant={"Medium_12"} component={"p"} color={"text.error"} text={failPan} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PanVerification;
