import React, { useState } from "react";

import { Avatar, Box, Button, Grid, InputAdornment, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PropTypes from "prop-types";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";

import { ACCOUNT_IFSC_CODE, ACCOUNT_NUMBER, BANK_DETAILS, INR } from "../../withdraw/magicStrings";
import { BUTTON_BOX } from "../../Deposit/Content/styles";
import { AVATAR_ICON, RUPEE_LOGO, TITLE_MEDIUM } from "../../withdraw/styles";
import { RS_1000, RS_500, RS_5000 } from "../../Deposit/Content/magicString";

const MWithdrawForm = ({ handleMaxClickForWithdrawl, action, AccountInfo, helperText, formData, SETFORMDATA, fiatBalance }) => {
  const [activeAmountButton, setActiveAmountButton] = useState("");
  return (
    <Box>
      <Box>
        <Typography component="h2" variant="Regular_12" color="#B3B3B3">
          Enter Withdrawal Amount
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={[RUPEE_LOGO, { border: "1px solid #4f4f4f" }]}>
            <Avatar sx={AVATAR_ICON}>
              {" "}
              <CurrencyRupeeIcon sx={{ fontSize: "small" }}></CurrencyRupeeIcon>
            </Avatar>
            <Typography sx={{ color: "text.primary" }} component="h3">
              {INR}
            </Typography>
          </Box>
          <BasicTextFields
            styles={{
              ".MuiInputBase-input": {
                padding: { xs: "10px", md: "16px" }
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" disableTypography>
                  <span style={{ cursor: "pointer" }} onClick={() => handleMaxClickForWithdrawl(Math.trunc(fiatBalance * 100) / 100)}>
                    MAX
                  </span>
                </InputAdornment>
              )
            }}
            variant="outlined"
            size="medium"
            error={helperText?.length > 0}
            fullWidth
            type={"number"}
            maxLength={6}
            placeholder="Enter Amount"
            value={formData?.WithdrawAmount}
            onChange={(event) => SETFORMDATA({ WithdrawAmount: event.target.value })}
          />
        </Box>
        {helperText?.length > 0 && (
          <Typography variant="Regular_12_KYC" sx={{ color: "#E55B4C" }} component={"p"}>
            {helperText}
          </Typography>
        )}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 1, alignItems: "center" }}>
            <Box sx={BUTTON_BOX}>
              <Button
                sx={{ height: 26, width: 50, p: 0, fontSize: "12px" }}
                variant={activeAmountButton === 5000 ? "DensityMain" : "main"}
                onClick={() => {
                  setActiveAmountButton(5000);
                  SETFORMDATA({ ...formData, WithdrawAmount: "5000" });
                }}
              >
                {RS_5000}
              </Button>
              <Button
                sx={{ height: 26, width: 50, p: 0, fontSize: "12px" }}
                variant={activeAmountButton === 1000 ? "DensityMain" : "main"}
                onClick={() => {
                  setActiveAmountButton(1000);
                  SETFORMDATA({ ...formData, WithdrawAmount: "1000" });
                }}
              >
                {RS_1000}
              </Button>
              <Button
                sx={{ height: 26, width: 50, p: 0, fontSize: "12px" }}
                variant={activeAmountButton === 500 ? "DensityMain" : "main"}
                onClick={() => {
                  setActiveAmountButton(500);
                  SETFORMDATA({ ...formData, WithdrawAmount: "500" });
                }}
              >
                {RS_500}
              </Button>
            </Box>
            <Typography variant="Regular_14" component={"p"} color={"text.mild"} sx={{ textAlign: "end" }}>
              {"Available: "}
              <Typography component={"span"} variant="Regular_14" color="text.main">
                ₹{Math.trunc(fiatBalance * 100) / 100}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3, py: 3, borderBlock: "1px dashed #595959" }}>
        <Typography sx={TITLE_MEDIUM} component="h2">
          {BANK_DETAILS}
        </Typography>
        <Box sx={{ py: 1, borderBottom: "1px solid #737373" }}>
          <Typography color="#A9A9A9" variant="Medium_12">
            {ACCOUNT_NUMBER}
          </Typography>
          <Box>
            <Typography variant="Medium_14">{AccountInfo?.accountNumber}</Typography>
          </Box>
        </Box>
        <Box sx={{ pb: 1, borderBottom: "1px solid #737373" }}>
          <Typography color="#A9A9A9" variant="Medium_12">
            {ACCOUNT_IFSC_CODE}
          </Typography>
          <Box>
            <Typography variant="Medium_14">{AccountInfo?.ifsc}</Typography>
          </Box>
        </Box>
      </Box>
      <Grid container gap={5} justifyContent={"flex-start"} sx={{ marginTop: "10px" }}>
        <Grid item xs={4}>
          {" "}
          <Button onClick={action} disabled={formData.WithdrawAmount === "" || helperText !== ""} fullWidth variant="primary">
            Continue
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
MWithdrawForm.propTypes = {
  formData: PropTypes.object,
  action: PropTypes.func,
  handleMaxClickForWithdrawl: PropTypes.func,
  SETFORMDATA: PropTypes.func,
  fiatBalance: PropTypes.number,
  AccountInfo: PropTypes.object,
  setFormData: PropTypes.object,
  helperText: PropTypes.object,
  densityBankAccount: PropTypes.object
};

export default MWithdrawForm;
