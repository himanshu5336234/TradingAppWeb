import React from "react";
import { Box } from "@mui/material";
import TextView from "@/components/UI/TextView/TextView";

interface ComponentProps {
  AccountInfo: any;
}

const UserBankDetailsNew: React.FC<ComponentProps> = ({ AccountInfo }) => {
  return (
    <Box
      width={"40%"}
      sx={{
        alignSelf: "flex-end"
      }}
    >
      <Box p={2} sx={{ backgroundColor: "background.primary", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
        <TextView color={"text.regular"} variant={"Medium_14"} text={"BANK DETAILS"}></TextView>
      </Box>
      <Box
        p={2}
        sx={{
          border: "1px solid #383840"
        }}
      >
        <TextView color="text.regular" variant="Medium_14">
          {"Account Number"}
          <TextView component={"div"} color="text.primary" variant="Medium_16">
            {AccountInfo?.accountNumber}
          </TextView>
        </TextView>
      </Box>
      <Box
        p={2}
        sx={{
          border: "1px solid #383840"
        }}
      >
        <TextView color="text.regular" variant="Medium_14">
          {"IFSC Number"}
          <TextView component={"div"} color="text.primary" variant="Medium_16">
            {AccountInfo?.ifsc}
          </TextView>
        </TextView>
      </Box>
    </Box>
  );
};

export default UserBankDetailsNew;
