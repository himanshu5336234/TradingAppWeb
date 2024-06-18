import React from "react";
import { Box, InputAdornment, Typography } from "@mui/material";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import DoubleCheckIcon from "@/assets/images/Walletimages/doubleCheckIcon.svg";
import TextView from "../UI/TextView/TextView";
import { SymbolPrecisionHelper } from "@/helpers";
import UpiAppsIcons from "./UpiAppsIcons";

interface FormData {
  referenceId: string;
  accountNumber: string;
  depositAmount: string;
}

interface HelperData {
  referenceId: string;
  accountNumber: string;
  depositAmount: string;
}
interface ComponentProps {
  helperText: HelperData;
  formData: FormData;
  setFormData: (val: void) => void;
  handleAmtSubmit: () => void;
  depositType: "UPI" | "OTHER";
}
const WalletDepositeForm: React.FC<ComponentProps> = ({ formData, helperText, setFormData, handleAmtSubmit, depositType }) => {
  const InstantAprrovalElement = (val: string) => {
    return (
      <Box display={"flex"} alignItems={"center"} gap={0.5}>
        <img src={DoubleCheckIcon} width={"14px"} />
        <TextView variant="Medium_12" color={"text.regular"} text={val}></TextView>
      </Box>
    );
  };

  const { convertToPrecisionValueInContractAssetUnit } = SymbolPrecisionHelper({ symbol: "" });

  const handleDepositAmount = (e: any) => {
    const val = e.target.value;
    setFormData({ ...formData, depositAmount: convertToPrecisionValueInContractAssetUnit(val, 2) });
  };

  return (
    <>
      <Box width={"50%"}>
        <Box
          sx={{
            backgroundColor: "background.primary",
            width: "100%",
            borderRadius: "8px"
            // p: 2,
          }}
          px={3.5}
          pt={3.5}
          pb={5.5}
        >
          {depositType !== "UPI" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <TextView text={"Registered Account Number"} variant="Medium_14" color={"background.main"} />
              {/* <TextView text={"xxxxxx" + formData?.accountNumber?.substr(formData?.accountNumber.length - 4)} variant="Medium_14" /> */}
              <TextView text={formData?.accountNumber} variant="Medium_14" />
            </Box>
          )}

          <Box sx={{ borderRadius: "4px", backgroundColor: "background.default", mt: 3 }}>
            <BasicTextFields
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" disableTextView>
                    <TextView style={{ cursor: "pointer" }} variant={"SemiBold_11"} color={"text.default"} text={"INR"}></TextView>
                  </InputAdornment>
                )
              }}
              styles={{ my: 0.3 }}
              label={"Enter Deposit Amount"}
              type={"number"}
              value={formData?.depositAmount}
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e: any) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              onChange={handleDepositAmount}
              placeholder={"0.00"}
              variant="outlined"
            />
            <Box p={1}>
              <ToggleGroup
                value={formData?.depositAmount}
                exclusive
                handleChange={(_, value) => {
                  setFormData({ ...formData, depositAmount: value });
                }}
                variant={"primary"}
                values={[
                  { name: depositType === "UPI" ? "10000" : InstantAprrovalElement("10000"), value: 10000, id: "INR-withdraw-10-BTN" },
                  { name: depositType === "UPI" ? "5000" : InstantAprrovalElement("5000"), value: 5000, id: "INR-withdraw-25-BTN" },
                  { name: "1000", value: 1000, id: "INR-withdraw-50-BTN" },
                  { name: "500", value: 500, id: "INR-withdraw-75-BTN" }
                ]}
              />
              {depositType !== "UPI" && (
                <Box display={"flex"} alignItems={"center"} gap={0.5} mt={0.5}>
                  <img src={DoubleCheckIcon} width={"14px"} />
                  <TextView variant="Medium_12" color={"text.main"} text={"Instant Approval"}></TextView>
                </Box>
              )}
            </Box>

            <TextView component={"p"} style={{ p: 1 }} variant="Regular_14" color={"text.error"} text={helperText?.depositAmount}></TextView>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1
            }}
          >
            <TextView color={"text.regular"} variant="Medium_11" text={"Deposit Amount Limit"}></TextView>
            <TextView variant="Medium_11" text={depositType === "UPI" ? `upto  ₹ 1 Lakh` : `₹ 500 - ₹ 5 Lakh`}>
              {/* <TextView component={"span"} color={"text.main"} variant="Medium_11">{fiatExchangeRateForUSDT}{" INR"}</TextView> */}
            </TextView>
          </Box>
          {depositType === "UPI" && (
            <Box
              my={6}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2
              }}
            >
              <TextView text={"Scan the QR using any UPI app"} color={"text.quaternary"} />
              <UpiAppsIcons />
            </Box>
          )}
          <Box maxWidth={"200px"} mt={2} mb={4}>
            <CustomButton label={"Continue"} variant={"primary"} isDisabled={formData.depositAmount === "" || helperText.depositAmount !== ""} onClick={() => handleAmtSubmit()} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default WalletDepositeForm;
