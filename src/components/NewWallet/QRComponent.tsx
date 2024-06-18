import TextView from "@/components/UI/TextView/TextView";
import { Box } from "@mui/material";
import React from "react";
import QR from "../../assets/images/Walletimages/PagarpayQR.svg";
import DownloadForQR from "../../assets/images/Walletimages/DensityQRForDownload.jpg";
import CopyButton from "../UI/CopyButton/CopyButton";
import DownloadIcon from "../../assets/images/Walletimages/DownloadIcon.svg";
const QRComponent = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = DownloadForQR;
    link.download = "Density-QR.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const downloadQR = async (e: {target: {href: string, download: string, click: () => void}}) => {
  //   const element = e.target;
  //   const file = new Blob(
  //     [
  //       "../../assets/images/Walletimages/PagarpayQR.svg"
  //     ],
  //     { type: "image/svg" }
  //   );
  //   element.href = await URL.createObjectURL(file);
  //   element.download = "density-QR.jpg";
  //   element.click();
  //   };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: "50%"
      }}
    >
      <TextView text={"yap124071@equitas"} variant={"Bold_12"} />
      <img src={QR} />

      <Box
        sx={{
          display: "flex",
          gap: 2
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          <img src={DownloadIcon} width={"24px"} height={"24px"} />
          <TextView
            variant={"Bold_14"}
            onClick={handleDownload}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              textDecorationThickness: "3px",
              textUnderlineOffset: "4px"
            }}
            text={"Download QR Code"}
          ></TextView>
        </Box>

        <Box>
          <CopyButton copyText={"yap124071@equitas"} sideText={"Copy UPI ID"} />
        </Box>
      </Box>
    </Box>
  );
};

export default QRComponent;
