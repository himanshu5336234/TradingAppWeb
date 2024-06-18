import { Checkbox } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import manual from "../../assets/images/Walletimages/manualMethod.svg";
import Neft from "../../assets/images/Walletimages/NEFTPay.svg";
import TextView from "../UI/TextView/TextView";

const WithdrawMethod = ({ isChecked, setPaymentMethod, method }: { isChecked: boolean; setPaymentMethod: (val: string) => void; method: string }) => {
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
        border: "1px soild",
        alignSelf: "stretch"
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
      <img src={method === "manual" ? manual : Neft} width={"66px"} height={"44px"} />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
        <TextView variant="Medium_16" text={method === "manual" ? "Manual Withdrawal" : "Automated Withdrawal"} />
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <TextView color={"text.quaternary"} variant="Regular_12" text={method === "manual" ? "Usually takes 24 hours" : "Instant transfer"} />
          <TextView color={"text.quaternary"} variant="Regular_12" text={"|"} />

          <TextView color={"text.quaternary"} variant="Regular_12" text={method === "manual" ? "Zero Fees charged" : "Instant transfer"} />
          <TextView color={"text.quaternary"} variant="Regular_12" text={"|"} />

          <TextView color={"text.quaternary"} variant="Regular_12" text={method === "manual" ? "No max limit" : "Upto ₹50,000"} />
        </Box>
      </Box>
    </Box>
  );
};

export default WithdrawMethod;
