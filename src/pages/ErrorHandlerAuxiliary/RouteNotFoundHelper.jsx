import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { OuterBox } from "./ErrorHandlerAuxiliary.styled";
import error404 from "@/assets/images/userSettings/ReferralTabs/error404.svg";
import { useNavigate } from "react-router-dom";

const InternetDownHelper = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={OuterBox}>
        <Box component={"img"} src={error404} alt="no internet" />
        <Box sx={{ marginBottom: "15px", marginTop: "20px" }}>
          <Typography color={"text.quaternary"} variant={"Bold_16"}>
            Oops! Something went wrong
          </Typography>
        </Box>
        <Box>
          <Typography color={"text.quaternary"} variant={"Regular_14"}>
            We are sorry, the page you requested could not be found. Please go back to the homepage.
          </Typography>
        </Box>
        <Button onClick={() => navigate("/")} variant={"secondary"} sx={{ width: "186px", height: "38px", marginTop: "28px" }}>
          Continue to Trade
        </Button>
      </Box>
    </>
  );
};

export default InternetDownHelper;
