import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Link, Typography } from "@mui/material";
import { PADDED_TEXT_FIELD, STEP_MAIN } from "./styles";
import { DEPOSIT, ENTER_REFERENCE_ID, REFERENCE_ID } from "./magicString";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
// import { LoadingButton } from "@mui/lab";
import CustomButton from "@/components/UI/CustomButton/CustomButton";

function Reference({ PrimaryAction, SecondaryAction, helperText, formData, setFormData, loading }) {
  return (
    <Box sx={STEP_MAIN}>
      <Typography variant="SemiBold_28" component="h1" sx={{ mb: "25px", display: { xs: "none", md: "block" } }}>
        {REFERENCE_ID}
      </Typography>
      <Box>
        <Typography component="h2">{ENTER_REFERENCE_ID}</Typography>
        <BasicTextFields
          type="text"
          variant="outlined"
          size="medium"
          styles={{
            ".MuiInputBase-input": {
              padding: { xs: "10px", md: "16px" }
            }
          }}
          fullWidth
          error={helperText.referenceId !== ""}
          inputProps={{ style: PADDED_TEXT_FIELD }}
          value={formData.referenceId}
          onChange={(event) => setFormData({ ...formData, referenceId: event.target.value })}
        />{" "}
        <Typography variant="Regular_12_KYC" component={"p"} sx={{ color: "#E55B4C" }}>
          {helperText?.referenceId}
        </Typography>
        <Typography sx={{ fontSize: { xs: "12px", md: "16px" } }} textAlign={"start"} mt={1}>
          <Link sx={{ cursor: "pointer", textDecoration: "none" }} href={"https://blog.talkcharge.com/wp-content/uploads/2020/05/HDFC-Bank-Statement-with-UTR-no..png"} target={"_blank"}>
            What is Reference ID?{" "}
          </Link>
        </Typography>
      </Box>
      <Box sx={{ py: "10px" }}>
        <Typography component="h2">{DEPOSIT}</Typography>
        <BasicTextFields
          variant="outlined"
          styles={{
            ".MuiInputBase-input": {
              padding: { xs: "10px", md: "16px" }
            },
            backgroundColor: "#39393D",
            ".MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#575756 !important"
              }
            }
          }}
          size="medium"
          value={formData?.depositAmount}
          disabled
          fullWidth
          InputLabelProps={{
            style: { color: "text.primary" }
          }}
        />
      </Box>
      <Box sx={{ alignItems: "flex-start", py: 1, mt: "40px", borderBottom: "1px dotted #595959", display: { xs: "flex", md: "none" } }}>
        <InfoOutlinedIcon
          sx={{
            fontSize: "small",
            color: "#A9A9A9",
            marginTop: "2px",
            marginRight: "2px"
          }}
        ></InfoOutlinedIcon>
        <Typography sx={{ fontSize: "12px" }}>
          <Typography component={"span"} variant="SemiBold_12">
            NOTE:
          </Typography>{" "}
          Deposit above 5000 INR will be credited within 5 minutes and any amount less than 5000 INR will be credited after 4 hours.
        </Typography>
      </Box>
      <Grid container gap={5} justifyContent={"flex-start"} marginTop={"15px"}>
        <Grid xs={5} md={3} item>
          {" "}
          <CustomButton onClick={SecondaryAction} fullWidth={true} variant="secondary" textVariant="Medium_14" label={"Previous"}></CustomButton>
        </Grid>
        <Grid item xs={5} md={3}>
          {" "}
          <CustomButton
            isDisabled={formData.referenceId === "" || helperText?.referenceId !== ""}
            onClick={PrimaryAction}
            isloading={loading}
            variant="primary"
            style={{ height: 38 }}
            textVariant="Medium_14"
            fullWidth={true}
            label={"Continue"}
            loadingTextDisable={true}
          ></CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}
Reference.propTypes = {
  PrimaryAction: PropTypes.func,
  SecondaryAction: PropTypes.func,
  formData: PropTypes.any,
  setFormData: PropTypes.object,
  helperText: PropTypes.object,
  loading: PropTypes.bool
};

export default Reference;
