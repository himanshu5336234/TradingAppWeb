import { Box } from "@mui/material";
import React from "react";
import GPAY from "../../assets/images/Walletimages/GooglePay.svg";
import PhonePe from "../../assets/images/Walletimages/PhonePe.svg";
import Paytm from "../../assets/images/Walletimages/Paytm.svg";
import AmazonPay from "../../assets/images/Walletimages/AmazonPay.svg";

const UpiAppsIcons = () => {
  const getImgSRC = (platform: string) => {
    switch (platform) {
      case "GPAY":
        return GPAY;
      case "PHONEPE":
        return PhonePe;
      case "PAYTM":
        return Paytm;
      default:
        return AmazonPay;
    }
  };
  const GetUpiImageComponent = ({ platform }: { platform: string }) => {
    return <img src={getImgSRC(platform)} />;
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignContent: "center"
      }}
    >
      <GetUpiImageComponent platform={"PHONEPE"} />
      <GetUpiImageComponent platform={"GPAY"} />
      <GetUpiImageComponent platform={"PAYTM"} />
      <GetUpiImageComponent platform={"AMAZONPAY"} />
    </Box>
  );
};

export default UpiAppsIcons;
