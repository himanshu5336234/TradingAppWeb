import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { OuterBox, ButtonStyled } from "./ErrorHandlerAuxiliary.styled";
import NoInternet from "@/assets/images/userSettings/ReferralTabs/NoInternet.svg";
import { useNavigate } from "react-router-dom";

const InternetDownHelper = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={OuterBox}>
        <img src={NoInternet} alt="no internet" />
        <Box sx={{ marginBottom: "15px", marginTop: "25px" }}>
          <Typography color={"text.quaternary"} variant={"Bold_24"}>
            No Internet Connection
          </Typography>
        </Box>
        <Box>
          <Typography color={"text.quaternary"} variant={"Regular_14"}>
            Please check your internet connection and refresh page to start trading again.
          </Typography>
        </Box>
        <Button id="refresh-button" onClick={() => navigate("/")} variant={"secondary"} sx={ButtonStyled}>
          RefreshPage
        </Button>
      </Box>
    </>
  );
};

export default InternetDownHelper;
