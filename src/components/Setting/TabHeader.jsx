import React from "react";
import BitcoinVector from "ASSETS/images/userSettings/ReferralTabs/bitcoinVector.svg";
import DiamondImg from "ASSETS/images/userSettings/ReferralTabs/DiamondImg.svg";
import SolanaVector from "ASSETS/images/userSettings/ReferralTabs/SolanaVector.svg";
import GiftBoxGroup1 from "ASSETS/images/userSettings/ReferralTabs/GiftBoxGroup.svg";
import { Box, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";

const TAB_HEADER_STYLE = {
  p: 2,
  justifyContent: "space-between",
  display: "flex",
  background: "#25252B",
  position: "relative",
  overflow: "hidden",
  height: { xs: "auto", sm: "auto", md: "auto", lg: "308px", xl: "308px" }
};

const TabHeader = ({ children }) => {
  const matchesLaptopWidth = useMediaQuery("(min-width:1200px)");
  return (
    <Box sx={TAB_HEADER_STYLE}>
      {children}
      <img style={{ position: "absolute", left: "300px", top: "0px" }} src={BitcoinVector} alt=""></img>
      <img style={{ position: "absolute", top: "120px", left: "-6px" }} src={DiamondImg} alt=""></img>
      <img style={{ position: "absolute", bottom: "10px", right: "0px" }} src={SolanaVector} alt=""></img>
      {matchesLaptopWidth && <img style={{ position: "absolute", right: "80px" }} src={GiftBoxGroup1} alt=""></img>}
    </Box>
  );
};

export default TabHeader;

TabHeader.propTypes = {
  children: PropTypes.element
};
