import { GetAppURL } from "@/frontend-api-service/Base";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const notLoggedInTypography = { color: "white", textAlign: "center", paddingLeft: "20px", marginTop: "5%", marginBottom: "auto", paddingRight: "20px" };
const ContainerStyles = { border: 1, borderRadius: 1, borderColor: "divider" };
const InnerBoxStyles = { border: 1, borderRadius: 1, borderColor: "divider" };

const MARGIN_RATIO = "Margin Ratio:";
const NO_DATA_CURRENTLY = "No data currently.";
const LOGIN = "Login";
const TO_VIEW_DATA = "to view your data";
function NoAuthMarginRatio() {
  return (
    <>
      <Container id="marginRatioContainer" sx={ContainerStyles} maxWidth="xs">
        <Box sx={InnerBoxStyles}>
          <Grid item id="marginRatioLabel">
            <Typography variant="p" color="text.primary">
              {MARGIN_RATIO}
            </Typography>
          </Grid>
          <p style={notLoggedInTypography}>
            {NO_DATA_CURRENTLY}
            <br />
            <a href={GetAppURL() + "/auth"} style={{ color: "background.success.secondary" }}>
              {LOGIN}
            </a>{" "}
            {TO_VIEW_DATA}{" "}
          </p>
        </Box>
      </Container>
    </>
  );
}

export default NoAuthMarginRatio;
