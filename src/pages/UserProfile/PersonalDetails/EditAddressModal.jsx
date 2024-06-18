import { Avatar, Typography, Grid, TextField, span } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";

import PdfUpload from "./PdfUpload";
const EditAddressModal = ({ close, Address }) => {
  const handleFileSelect = (file) => {
    setSelectedPdf(file);
  };
  const [isErrorAddress, setisErrorAddress] = useState(false);

  const [address, setAddress] = useState();
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  return (
    <CustomModal IsOpen={true} close={close} isClose={true} ContainerSx={{ maxWidth: { xs: "360px", sm: "360px", md: "500px", lg: "500px" }, maxHeight: "370px" }} secondaryAction={close}>
      <Grid container md={12} lg={12} sm={12} xs={12} px={1}>
        <Typography px={1.5} py={1.6} variant="Medium_16">
          Edit Address
        </Typography>
        <Grid md={12} lg={12} sm={12} xs={12} mt={1} px={1}>
          <BasicTextFields autoFocus={true} variant="outlined" label={"Current Address"} onChange={handleChangeAddress} value={address}></BasicTextFields>
        </Grid>
      </Grid>

      <PdfUpload onFileSelect={handleFileSelect} />
    </CustomModal>
  );
};
export default EditAddressModal;
