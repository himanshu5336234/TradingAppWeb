import React, { useState } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import UploadImage from "./UploadImage.svg";

const PdfUpload = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.type === "application/pdf") {
      onFileSelect(selectedFile);
    } else {
      // Handle error for non-PDF file
      console.error("Please select a PDF file.");
    }
  };

  return (
    <div>
      <input accept=".pdf" id="pdf-upload" type="file" onChange={handleFileChange} style={{ display: "none" }} />
      <label htmlFor="pdf-upload">
        <Grid lg={10} justifyContent={"center"} border={"0.2px dashed"} my={3} px={3} py={2} mx={10} sx={{ cursor: "pointer" }}>
          <Box component="img" src={UploadImage} px={14} pt={1} pb={1} />
          <Grid item container lg={12} md={11} sm={11} xs={11} justifyContent={"space-around"}>
            <Typography variant={"Medium_12"}>Upload address proof document</Typography>
            <Typography component={"p"} variant={"Medium_12"} color={"#8B8B97"}>
              e.g. Utility bill, Electricity bill, Aadhar card etc.
            </Typography>
          </Grid>
        </Grid>
      </label>
    </div>
  );
};

export default PdfUpload;
