import React, { useState } from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PropTypes from "prop-types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { AVATAR_ICON } from "@/components/Wallet/withdraw/styles";
import { BUTTON_BOX, RUPEE_LOGO, ENTER_AMOUNT_HELPER_TEXT_WRAPPER, BOX_SPACE_BETWEEN } from "../../Deposit/Content/styles";
import { ACCOUNT_NUMBER, BANK_TYPE, BENEFICIARY_ACCOUNT, BENEFICIARY_ENTITY, BENEFICIARY_IFSC, DEPOSIT_AMOUNT, INR, LIMIT, RS_1000, RS_500, RS_5000 } from "../../Deposit/Content/magicString";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
function MEnterAmount({ handleAmtSubmit, formData, helperText, setFormData, densityBankAccount }) {
  const [activeAmountButton, setActiveAmountButton] = useState("");
  return (
    <>
      <Box sx={{ px: 1, pt: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Typography component="h2" variant="Regular_12" color="#B3B3B3">
            {ACCOUNT_NUMBER}
          </Typography>
          <BasicTextFields
            disabled={true}
            styles={{
              ".MuiInputBase-input": {
                padding: { xs: "10px", md: "16px" }
              }
            }}
            type="number"
            variant="outlined"
            size="medium"
            placeholder={"xxxxxx" + formData?.accountNumber?.substr(formData?.accountNumber.length - 4)}
          />
          <Typography variant="Regular_12_KYC" component={"p"} sx={{ color: "#E55B4C" }}>
            {helperText?.accountNumber}
          </Typography>
        </Box>

        <Box>
          <Typography component="h2" variant="Regular_12" color="#B3B3B3">
            {DEPOSIT_AMOUNT}
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
              variant="outlined"
              size="medium"
              styles={{
                ".MuiInputBase-input": {
                  padding: { xs: "10px", md: "16px" }
                }
              }}
              fullWidth
              type={"number"}
              maxLength={6}
              error={helperText?.depositAmount?.length > 0}
              placeholder="Enter Amount"
              value={formData?.depositAmount}
              onChange={(event) => {
                setFormData({ ...formData, depositAmount: event.target.value });
                setActiveAmountButton(0);
              }}
            />
          </Box>
          <Box sx={ENTER_AMOUNT_HELPER_TEXT_WRAPPER}>
            <Typography variant="Regular_12_KYC" component={"p"} sx={{ color: "#E55B4C" }}>
              {helperText?.depositAmount}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 1, alignItems: "center" }}>
            <Box sx={BUTTON_BOX}>
              <Button
                sx={{ height: 26, width: 50, p: 0, fontSize: "12px" }}
                variant={activeAmountButton === 5000 ? "DensityMain" : "main"}
                onClick={() => {
                  setActiveAmountButton(5000);
                  setFormData({ ...formData, depositAmount: 5000 });
                }}
              >
                {RS_5000}
              </Button>
              <Button
                sx={{ height: 26, width: 50, p: 0, fontSize: "12px" }}
                variant={activeAmountButton === 1000 ? "DensityMain" : "main"}
                onClick={() => {
                  setActiveAmountButton(1000);
                  setFormData({ ...formData, depositAmount: 1000 });
                }}
              >
                {RS_1000}
              </Button>
              <Button
                sx={{ height: 26, width: 50, p: 0, fontSize: "12px" }}
                variant={activeAmountButton === 500 ? "DensityMain" : "main"}
                onClick={() => {
                  setActiveAmountButton(500);
                  setFormData({ ...formData, depositAmount: 500 });
                }}
              >
                {RS_500}
              </Button>
            </Box>
            <Typography variant="Regular_12" component={"p"} color={"text.mild"} sx={{ textAlign: "end" }}>
              {LIMIT}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ pt: 3, pb: 2, borderBlock: "1px dashed #595959", my: 3 }}>
          <Typography variant="SemiBold_16">{"Transfer Money to this Bank Account"}</Typography>
          <Box sx={{ my: 1 }}>
            <Box sx={{ ...BOX_SPACE_BETWEEN, py: 1, borderBottom: "1px solid #737373" }}>
              <Typography variant={"light_12"} color="text.mild">
                {BENEFICIARY_ENTITY}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", pt: 0.5 }}>
                <Typography variant={"SemiBold_12"}>{densityBankAccount?.accountHolderName}</Typography>
                <Box sx={{ marginTop: "-8px" }}>
                  <CopyButton copyText={densityBankAccount?.accountHolderName} fontSize={"12px"} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ ...BOX_SPACE_BETWEEN, py: 1, borderBottom: "1px solid #737373" }}>
              <Typography variant={"light_12"} color="text.mild">
                {BENEFICIARY_ACCOUNT}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", pt: 0.5 }}>
                <Typography variant={"SemiBold_12"}>{densityBankAccount?.accountNumber}</Typography>
                <Box sx={{ marginTop: "-8px" }}>
                  <CopyButton copyText={densityBankAccount?.accountNumber} fontSize={"12px"} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ ...BOX_SPACE_BETWEEN, py: 1, borderBottom: "1px solid #737373" }}>
              <Typography variant={"light_12"} color="text.mild">
                {BENEFICIARY_IFSC}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", pt: 0.5 }}>
                <Typography variant={"SemiBold_12"}>{densityBankAccount?.ifsc}</Typography>
                <Box sx={{ marginTop: "-8px" }}>
                  <CopyButton copyText={densityBankAccount?.ifsc} fontSize={"12px"} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ ...BOX_SPACE_BETWEEN, py: 1, borderBottom: "1px solid #737373" }}>
              <Typography variant={"light_12"} color="text.mild">
                {BANK_TYPE}{" "}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", pt: 0.5 }}>
                <Typography variant={"SemiBold_12"}>{densityBankAccount?.accountType}</Typography>
                <Box sx={{ marginTop: "-8px" }}>
                  <CopyButton copyText={densityBankAccount?.accountType} fontSize={"12px"} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-start", py: 1 }}>
            <InfoOutlinedIcon
              sx={{
                fontSize: "small",
                color: "#A9A9A9",
                marginTop: "2px",
                marginRight: "2px"
              }}
            ></InfoOutlinedIcon>
            <Typography variant="Regular_12">{"The amount should be deposited with above bank account only. Amount coming from any other bank account would be refunded back."}</Typography>
          </Box>
        </Box>
        <Grid container gap={5} justifyContent={"flex-start"} sx={{ marginTop: "25px" }}>
          <Grid item xs={5}>
            {" "}
            <Button disabled={formData.depositAmount === "" || helperText.depositAmount !== ""} onClick={() => handleAmtSubmit()} fullWidth variant="primary">
              Continue
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
MEnterAmount.propTypes = {
  formData: PropTypes.any,
  setOpenDepositModal: PropTypes.func,
  setFormData: PropTypes.object,
  helperText: PropTypes.object,
  handleAmtSubmit: PropTypes.func,
  densityBankAccount: PropTypes.object
};
export default MEnterAmount;
