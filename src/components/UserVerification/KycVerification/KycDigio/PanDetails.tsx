import React from "react";
import { Grid, Box } from "@mui/material";
import HeaderComponent from "../../../../pages/UserVerification/AccountVerification/HeaderComponent";
import TextView from "../../../UI/TextView/TextView";
import PanVerification from "./PanVerification";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export const PanDetails = () => {
  return (
    <>
      <Box p={"2rem 6rem"}>
        <Grid container gap={3}>
          <Grid item xs={12}>
            <HeaderComponent heading={"Account / KYC Verification"} subHeading={"Enter PAN Details"} tagLine={""} LinkButton={""} />
          </Grid>
          <Box sx={{ display: "flex", gap: 10 }}>
            <PanVerification />

            <Box
              sx={{
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #44444D",
                borderRadius: "4px",
                p: 3
              }}
              gap={2}
            >
              <TextView text={"Please validate your PAN to proceed"} component={"p"} color={"#B1B1BA"} variant={"Regular_16"} />
              <TextView variant={"Regular_16"} color={"#B1B1BA"} text={" Make Sure your PAN is "} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                <TextView style={{ ml: 2 }} text={"Linked with your Aadhar"} component={"p"} variant={"Regular_16"} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                <TextView style={{ ml: 2 }} text={"Linked with your Bank Account and UPI ID"} component={"p"} variant={"Regular_16"} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  );
};
