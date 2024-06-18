import { Checkbox } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import UPI from "../../assets/images/Walletimages/UPIIcon.svg";
import Neft from "../../assets/images/Walletimages/NEFTPay.svg";
import TextView from "../UI/TextView/TextView";

const PaymentMethod = ({ isChecked, setPaymentMethod, method }: { isChecked: boolean; setPaymentMethod: (val: string) => void; method: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mt: 2,
        alignItems: "center",
        backgroundColor: "background.primary",
        px: 3,
        py: 2,
        borderRadius: "8px 8px 0 0",
        border: "1px soild"
      }}
    >
      <Checkbox
        sx={{
          "&.Mui-checked": {
            color: "white"
          }
        }}
        checked={isChecked}
        onChange={() => {
          setPaymentMethod(method);
        }}
      />

      <img src={method === "UPI" ? UPI : Neft} width={"66px"} height={"44px"} />

      <TextView variant="Medium_16" text={method === "UPI" ? "UPI ID (GPay , PhonePe, Paytm etc.)" : "IMPS / NEFT (Bank Transfer)"} />
    </Box>
  );
};

export default PaymentMethod;
