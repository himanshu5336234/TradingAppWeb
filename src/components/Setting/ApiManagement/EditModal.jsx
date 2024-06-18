import React from "react";

import { Box, Checkbox, Grid, Typography } from "@mui/material";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import PropTypes from "prop-types";
import { API_RESTRICTIONS_DATA } from "./Constants";
import useApiManagement from "BL/businessHooks/SETTING/useApiManagement";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import { API_KEY_FIELD, EDIT_MODAL_CHECKBOX, EDIT_MODAL_CHECKBOX_WRAPPER, EDIT_MODAL_TITLE_PADDING, SECRET_KEY_FIELD } from "./styles";
import { API_KEY, API_RESTRICTIONS, SECRET_KEY } from "./magicStrings";

function EditModal({ IsOpen, closeModal, NewApiKeyData }) {
  const { deleteApiKey, addNewApiKeyToState } = useApiManagement();

  const cancelButton = () => {
    deleteApiKey(NewApiKeyData?.id);
    closeModal();
  };
  const saveButton = () => {
    addNewApiKeyToState(NewApiKeyData);
    closeModal();
  };

  const RenderApiRestrictions = () => {
    return API_RESTRICTIONS_DATA.map((obj) => {
      return (
        <Grid item xs={4} key={obj.name}>
          <Box sx={EDIT_MODAL_CHECKBOX_WRAPPER}>
            <Checkbox defaultChecked sx={EDIT_MODAL_CHECKBOX} />
            <Typography component={"h3"} variant={"Regular_14"}>
              {obj.name}
            </Typography>
          </Box>
        </Grid>
      );
    });
  };
  return (
    <CustomModal title={"API Name"} IsOpen={IsOpen} primaryName="Save" secondaryName="Cancel" secondaryAction={cancelButton} isSecondaryAction={true} isPrimaryAction={true} primaryAction={saveButton}>
      <Grid container>
        <Grid item xs={12}>
          <Typography component={"h1"} sx={EDIT_MODAL_TITLE_PADDING}>
            {API_KEY}
          </Typography>
          <Box sx={API_KEY_FIELD}>
            <Typography component={"h2"}>{`${NewApiKeyData?.auth_token.substring(0, 60)}${"....***"}`}</Typography>
            <CopyButton copyText={NewApiKeyData?.auth_token}></CopyButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography component={"h1"} sx={SECRET_KEY_FIELD}>
            {SECRET_KEY}
          </Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Typography variant={"SemiBold_22"} component={"h2"}>
              {NewApiKeyData?.api_secret}
            </Typography>
            <CopyButton copyText={NewApiKeyData?.api_secret}></CopyButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mt: "28px" }}>
            <Typography component={"h1"}>{API_RESTRICTIONS}</Typography>
            <Grid container sx={{ minHeight: "40px", pb: "10px" }}>
              {RenderApiRestrictions()}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </CustomModal>
  );
}

export default EditModal;

EditModal.propTypes = {
  IsOpen: PropTypes.boolean,
  closeModal: PropTypes.func,
  NewApiKeyData: PropTypes.object
};
