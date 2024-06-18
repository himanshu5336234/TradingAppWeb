import React from "react";

import { Box, Grid } from "@mui/material";

import TextView from "@/components/UI/TextView/TextView";

import arrow from "./ArrowIcon.svg";
import APIManagement_Icon from "../../../assets/icons/APIManagement_Icon.svg";

import { useNavigate } from "react-router-dom";

export const APIManagementCard = () => {
  const navigate = useNavigate();

  return (
    <Box p={"1.5rem"} sx={{ border: "1px solid", borderRadius: "8px", borderColor: "#44444D", backgroundColor: "background.primary", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextView text={"API Management"} variant={"Bold_24"} />
        <Box onClick={() => navigate("/api_management")} style={{ cursor: "pointer" }} component={"img"} src={arrow} />
      </Box>
      <Box>
        <Box py={"1.5rem"} component={"img"} src={APIManagement_Icon} sx={{ margin: "auto" }} />
      </Box>
      <TextView text={"Use Density API's to place and close orders, as well as to monitor your wallet status and transaction history."} variant={"Regular_14"} />
    </Box>
  );
};
