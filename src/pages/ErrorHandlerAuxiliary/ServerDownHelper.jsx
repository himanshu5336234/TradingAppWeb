import React from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import { ButtonStyled, centredContainer, OuterBox } from "./ErrorHandlerAuxiliary.styled";
import NoInternet from "@/assets/images/maintenance.svg";
import TextView from "@/components/UI/TextView/TextView";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { maintaincenotice } from "@/assets/strings/constants";
import { BASE_URL } from "@/frontend-api-service/Base";
const ServerDownHelper = () => {
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", justifyContent: "center", gap: 5, alignItems: "center", p: { xs: "2rem", md: "2rem 6rem" } }}>
        <Box sx={{ width: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
          <TextView component={"p"} style={{ fontSize: "44px", lineHeight: "normal", fontWeight: 700 }} text={"We are under maintenance"} />
          <TextView component={"p"} variant={"Regular_16"} text={"Don't worry, we're just sprucing things up to make your experience even better! We will be back soon."} />

          <Box sx={{ display: "flex", gap: "9px", alignItems: "center" }}>
            <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
            <TextView variant="Regular_16" text={"To view and close existing positions"} component={"span"}>
              <Link
                target="_blank"
                href={BASE_URL().maintainceUrl}
                sx={{
                  ml: 1,
                  color: "text.main",
                  textDecoration: "underline"
                }}
              >
                {"Click Here"}
              </Link>
            </TextView>
          </Box>
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }} component={"img"} src={NoInternet} alt="no internet" />
      </Box>
    </>
  );
};

export default ServerDownHelper;
