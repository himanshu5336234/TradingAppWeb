import React from "react";
import { Box } from "@mui/material";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import TextView from "@/components/UI/TextView/TextView";

interface AccountDetails {
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  accountType: string;
}
interface ComponentProps {
  accountDetails: AccountDetails;
}
const DesnityBankDetails: React.FC<ComponentProps> = ({ accountDetails }) => {
  const getBox = ({ title, val, width = "100%" }: { title: string; val: string; width: string }) => {
    return (
      <Box
        p={2}
        sx={{
          border: "1px solid #383840",
          width
        }}
      >
        <TextView component={"div"} color="text.regular" variant="Medium_14">
          {title}
          <Box
            sx={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <TextView color="text.primary" variant="Medium_16">
              {val}
            </TextView>
            <CopyButton copyText={val} sideText={""} />
          </Box>
        </TextView>
      </Box>
    );
  };
  return (
    <Box width={"45%"} alignSelf={"flex-end"}>
      <Box p={2} sx={{ backgroundColor: "background.primary", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
        <TextView color={"text.regular"} variant={"Medium_14"} text={"Transfer To"}>
          {" "}
          <TextView style={{ ml: 1 }} color={"text.main"} variant={"Medium_12"} text={"     **   Updated Bank Details. Please Reverify . "} />
        </TextView>
      </Box>

      {getBox({ title: "BANK Name", val: "Equitas Bank", width: "100%" })}
      {getBox({ title: "Beneficiary Entity", val: accountDetails?.accountHolderName, width: "100%" })}
      {getBox({ title: "Beneficiary Account Number", val: accountDetails?.accountNumber, width: "100%" })}
      <Box sx={{ display: "flex", width: "100%" }}>
        {getBox({ title: "Beneficiary IFSC", val: accountDetails?.ifsc, width: "50%" })}
        {getBox({ title: "Bank Account Type", val: accountDetails?.accountType, width: "50%" })}
      </Box>
    </Box>
  );
};

export default DesnityBankDetails;
