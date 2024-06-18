import React, { useState } from "react";
import CustomModal from "./CustomModal";
import PropTypes from "prop-types";
import { Typography, FormControlLabel, Checkbox, Box } from "@mui/material";
const StepBox = ({ title, num }) => {
  return (
    <Box
      sx={{
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        p: 2,
        gap: 2,
        width: "32%"
      }}
    >
      <Typography variant="Regular_12" color={"#A9A9A9"}>
        {num}
      </Typography>
      <Typography variant="Regular_14">{title}</Typography>
    </Box>
  );
};
const ManualKycStepModal = ({ IsOpen, close, primaryAction }) => {
  const [checkBoxState, setCheckBoxState] = useState(false);
  return (
    <CustomModal IsOpen={IsOpen} close={close} isClose={true} primaryAction={primaryAction} primaryName={"Okay"} isDisabled={!checkBoxState} isPrimaryAction={true}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          py: 2
        }}
      >
        <Typography variant="Regular_12">
          You will now be redirected to a different page. Please upload the following documents in this order:
          {/* <Typography component={"span"} variant="Bold_20"> Aadhar Card (front) , Aadhar Card (back), Selfie </Typography> */}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3
          }}
        >
          <StepBox title={"Aadhaar Card (Front)"} num={"01"} />
          <StepBox title={"Aadhaar Card (Back)"} num={"02"} />
          <StepBox title={"Selfie"} num={"03"} />
        </Box>
        <Typography variant="Bold_16_21">
          {"Note "}
          <Typography variant="Regular_12" color={"#A9A9A9"}>
            {"We will start KYC verification after you have submitted all the above documents. Please note that it may take some time for KYC to be verified"}
          </Typography>
        </Typography>
        {/* <Box
        sx={{
          alignSelf: "flex-start"
        }}
      > */}
        <FormControlLabel
          control={
            <Checkbox
              id="Position-close-checkbox"
              sx={{
                width: "0px",
                height: " 0px",
                color: "text.quaternary",
                "&:hover": {
                  backgroundColor: "transparent"
                }
              }}
              checked={checkBoxState}
              onChange={(event) => setCheckBoxState(event.target.checked)}
            />
          }
          label="I Understand"
          sx={{
            mt: 1,
            ml: 0,
            gap: "10px",
            ".MuiTypography-root": { fontSize: { xs: "10px", md: "12px" }, fontWeight: "500", letterSpacing: "0.5px", color: "text.quaternary" }
          }}
        />
      </Box>
      {/* </Box> */}
    </CustomModal>
  );
};
ManualKycStepModal.propTypes = {
  IsOpen: PropTypes.bool,
  close: PropTypes.func,
  primaryAction: PropTypes.func
};
StepBox.propTypes = {
  title: PropTypes.string,
  num: PropTypes.string
};
export default ManualKycStepModal;
