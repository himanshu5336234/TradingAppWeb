import { Grid } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import Reference from "../../Deposit/Content/Reference";
const MReferenceForm = ({ setFormData, helperText, formData, PrimaryAction, SecondaryAction, loading }) => {
  // component requires formdata and step
  return (
    <>
      <Grid container mb={3}>
        <Grid item xs={12}>
          <Reference formData={formData} setFormData={setFormData} helperText={helperText} PrimaryAction={PrimaryAction} SecondaryAction={SecondaryAction} loading={loading} />
        </Grid>
      </Grid>
    </>
  );
};
MReferenceForm.propTypes = {
  setFormData: PropTypes.func,
  helperText: PropTypes.object,
  formData: PropTypes.object,
  PrimaryAction: PropTypes.func,
  SecondaryAction: PropTypes.func,
  loading: PropTypes.func
};
export default MReferenceForm;
