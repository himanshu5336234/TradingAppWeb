import React, { useState } from "react";
import { Box, Button, Checkbox, Container, Typography } from "@mui/material";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { CreateApiInitialFormState } from "./Constants";
import useApiManagement from "BL/businessHooks/SETTING/useApiManagement";
import EditModal from "./EditModal";
import ApiOTPModal from "./ApiOTPModal";
import { CHECKBOX, CREATE_API_WRAPPER, GAP, TEXT_FIELD } from "./styles";
import * as Yup from "yup";
import { API_MANAGEMENT, CREATE_API_KEY, NAME, PERMISSION, READ_ONLY, TRADE } from "./magicStrings";

function CreateApi() {
  const [IsEditModalOpen, setIsEditModalOpen] = useState(false);
  const [IsOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [NewApiKeyData, setNewApiKeyData] = useState();
  const { createNewApiKey } = useApiManagement();

  // validate old and new passwords
  const createAPIFieldValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    permissions: Yup.array().min(1).required()
  });

  const formik = useFormik({
    initialValues: CreateApiInitialFormState,
    validationSchema: createAPIFieldValidation,
    onSubmit: (values) => {
      createNewApiKey(values)
        .then((data) => {
          setNewApiKeyData(data);
          setIsOTPModalOpen(true);
        })
        .catch((error) => console.log(error));
      resetForm();
    }
  });
  const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm } = formik;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography component={"h1"} variant={"SemiBold_28"} sx={{ pb: "28px" }}>
          {API_MANAGEMENT}
        </Typography>
        <Container sx={CREATE_API_WRAPPER}>
          <Typography component={"h2"} variant={"Regular_20"}>
            {CREATE_API_KEY}
          </Typography>
          <Box>
            {" "}
            <Typography component={"h3"} variant={"Regular_16"} sx={{ pb: "4px" }}>
              {NAME}
            </Typography>
            <BasicTextFields
              name="name"
              variant="outlined"
              styles={TEXT_FIELD}
              inputProps={{
                style: {
                  padding: 12
                }
              }}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={Boolean(touched.name) && Boolean(errors.name) && errors.name}
              error={Boolean(touched.name) && Boolean(errors.name)}
            ></BasicTextFields>
          </Box>
          <Typography component={"h3"} variant={"Regular_16"}>
            {PERMISSION}
          </Typography>
          <Box sx={GAP}>
            <Box sx={GAP}>
              <Checkbox
                value="Read Only"
                checked={values.permissions.includes("Read Only")}
                sx={{ ...CHECKBOX, ...(Boolean(touched.permissions) && Boolean(errors.permissions) && { color: "red" }) }}
                name="permissions"
                onChange={handleChange}
              />
              <Typography component={"h3"} variant={"Regular_14"}>
                {READ_ONLY}
              </Typography>
            </Box>
            <Box sx={GAP}>
              <Checkbox
                value="Trade"
                checked={values.permissions.includes("Trade")}
                sx={{ ...CHECKBOX, ...(Boolean(touched.permissions) && Boolean(errors.permissions) && { color: "red" }) }}
                name="permissions"
                onChange={handleChange}
              />
              <Typography component={"h3"} variant={"Regular_14"}>
                {TRADE}
              </Typography>
            </Box>
          </Box>
          <Button variant="primary" sx={{ mt: "12px" }} onClick={handleSubmit}>
            {CREATE_API_KEY}
          </Button>
        </Container>
      </form>
      {IsEditModalOpen && <EditModal IsOpen={IsEditModalOpen} closeModal={() => setIsEditModalOpen(false)} NewApiKeyData={NewApiKeyData}></EditModal>}
      {IsOTPModalOpen && <ApiOTPModal IsOpen={IsOTPModalOpen} closeModal={() => setIsOTPModalOpen(false)} setIsEditModalOpen={setIsEditModalOpen}></ApiOTPModal>}
    </>
  );
}

export default CreateApi;

CreateApi.propTypes = {
  setIsOTPModalOpen: PropTypes.func
};
