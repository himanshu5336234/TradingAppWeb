import React from "react";
import { Box, InputAdornment } from "@mui/material";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import TextView from "../UI/TextView/TextView";
import { SymbolPrecisionHelper } from "@/helpers";
interface ComponentProps {
  helperText: string;
  formData: any;
  SETFORMDATA: (val: {}) => void;
  action: () => void;
  fiatBalance: number;
  loading: boolean;
}

const WithDrawForm: React.FC<ComponentProps> = ({ helperText, formData, SETFORMDATA, action, loading, fiatBalance }) => {
  const { convertToPrecisionValueInContractAssetUnit } = SymbolPrecisionHelper({ symbol: "" });

  const handleWithrawAmount = (e: any) => {
    const val = e.target.value;
    SETFORMDATA({ ...formData, WithdrawAmount: convertToPrecisionValueInContractAssetUnit(val, 2) });
  };

  return (
    <Box width={"50%"}>
      <TextView component={"p"} variant="Bold_28" style={{ mt: 4, mb: 2 }} text={"Enter Amount"}></TextView>

      <Box
        sx={{
          backgroundColor: "background.primary",
          width: "100%",
          borderRadius: "8px",
          p: 2
        }}
      >
        <Box sx={{ borderRadius: "4px", backgroundColor: "background.default" }}>
          <BasicTextFields
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" disableTextView>
                  <TextView style={{ cursor: "pointer" }} variant={"SemiBold_11"} color={"text.default"} text={"INR"}></TextView>
                </InputAdornment>
              )
            }}
            styles={{ my: 0.3 }}
            label={"Enter Amount"}
            type={"number"}
            value={formData?.WithdrawAmount}
            // onChange={handleSizeChange}
            onFocus={(e) =>
              e.target.addEventListener(
                "wheel",
                function (e: React.FocusEvent<HTMLElement>) {
                  e.preventDefault();
                },
                { passive: false }
              )
            }
            onChange={handleWithrawAmount}
            placeholder={"0.00"}
            variant="outlined"
          />
          <Box p={1}>
            <ToggleGroup
              value={formData?.WithdrawAmount}
              exclusive
              handleChange={(_, value) => {
                SETFORMDATA({ ...formData, WithdrawAmount: value });
              }}
              variant={"primary"}
              values={[
                { name: "5000", value: 5000, id: "INR-withdraw-10-BTN" },
                { name: "2000", value: 2000, id: "INR-withdraw-25-BTN" },
                { name: "1000", value: 1000, id: "INR-withdraw-50-BTN" },
                { name: "500", value: 500, id: "INR-withdraw-75-BTN" }
              ]}
            />
          </Box>

          <TextView component={"p"} style={{ p: 1 }} variant="Regular_14" color={"text.error"} text={helperText}></TextView>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1
          }}
        >
          <TextView color={"text.regular"} variant="Medium_11" text={"Availavle Balance"}></TextView>
          <TextView variant="Medium_11" text={`₹ ${fiatBalance.toFixed(2)}`}>
            {/* <TextView component={"span"} color={"text.main"} variant="Medium_11">{fiatExchangeRateForUSDT}{" INR"}</TextView> */}
          </TextView>
        </Box>
        <Box maxWidth={"200px"} mt={6} mb={4}>
          <CustomButton label={"Withdraw"} variant={"primary"} onClick={() => action()} isDisabled={loading} isloading={loading} />
        </Box>
      </Box>
    </Box>
  );
};

export default WithDrawForm;
