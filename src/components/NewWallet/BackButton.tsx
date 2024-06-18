import React from "react";
import { Box, Typography } from "@mui/material";
import { FLEX_BOX_ROW_ALIGN_CENTER } from "../SignalTrading/Modals/Modals.styles";
import { useNavigate } from "react-router-dom";
import { USER_SETTING_TABS } from "@/pages/UserProfile/Constants";
const BackButton = ({ label }: { label: string }) => {
  const navigate = useNavigate();

  return (
    <Box
      gap={2}
      sx={{ ...FLEX_BOX_ROW_ALIGN_CENTER, cursor: "pointer", my: 2 }}
      onClick={() =>
        navigate("/Wallet/", {
          state: { currentTab: USER_SETTING_TABS.WALLET }
        })
      }
    >
      <Typography style={{ fontSize: "30px", cursor: "pointer" }} mb={0.3}>
        &#8592;
      </Typography>
      <Typography variant="Bold_36">{label}</Typography>
    </Box>
  );
};

export default BackButton;
