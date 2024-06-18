import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Typography } from "@mui/material";
import { mobileViewActiveBlock, mobileViewActiveFlex, WebViewActiveFlex } from "../MWebStyles/MWeb.styles";
import styles from "./TabSection.styles";
const TabSection = ({ title, children }) => (
  <>
    {title && (
      <>
        {/* Web View Box */}
        <Typography sx={[WebViewActiveFlex, styles.titleTypography]} variant="h6" color="text.regular">
          {title}
        </Typography>

        {/* Mobile View Box */}
        <Typography sx={[styles.mobileTitleTypography, mobileViewActiveFlex]} variant="h6" color="text.regular">
          {title}
        </Typography>
      </>
    )}
    {/* Web View Box */}
    <Box sx={[styles.section, WebViewActiveFlex]}>{children}</Box>
    {/* Mobile View Box */}
    <Box sx={[styles.Mobsection, mobileViewActiveBlock]}>{children}</Box>
    <Divider sx={{ m: 4 }} />
  </>
);

TabSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
};

export default TabSection;
