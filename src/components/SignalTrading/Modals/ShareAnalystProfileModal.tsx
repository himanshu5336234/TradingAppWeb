import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import { Box, Typography } from "@mui/material";
import arrowUp from "@/assets/images/SharePositionImages/arrow.svg";
import arrowDown from "@/assets/images/SharePositionImages/arrowdown.svg";

import React, { useRef } from "react";
import DemoProfile from "@/assets/images/DemoProfile.svg";
import ShareModalImage from "@/assets/images/SignalTradingLandingPage/ShareModalImage.svg";
import densityLogo from "@/assets/images/logo.svg";
import QRCode from "@/assets/images/NewQRCode.svg";
import DownloadIcon from "@mui/icons-material/Download";
import WhatsappShare from "@/assets/images/SharePositionImages/WhatsappShare.svg";
import TwitterShare from "@/assets/images/OldTwitterIcon.svg";
import Line from "@/assets/images/SignalTradingLandingPage/ShareModalLine.svg";
import { FLEX_BOX_ALIGN_CENTER_JUSTIFY_BETWEEN, FLEX_BOX_ROW_ALIGN_CENTER, QR_CODE_CONTAINER } from "./Modals.styles";
import { TwitterShareButton, WhatsappShareButton } from "react-share";
import { useScreenshot, createFileName } from "use-react-screenshot";

// import { TwitterShareButton, WhatsappShareButton } from "react-share";
// import { useSelector } from 'react-redux';
interface ShareModalProps {
  IsOpen: boolean;
  setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: object;
}
const ShareAnalystProfileModal: React.FC<ShareModalProps> = ({ IsOpen, setShowShareModal, data }) => {
  const imageRef = useRef();
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
    width: "600px",
    height: "392px"
  });
  const download = (Image = image, { name = "DensityP&LShareCard", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = Image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const downloadScreenshot = () => {
    takeScreenShot(imageRef.current).then(download);
  };
  const getDateFromTimestamp = (timeStamp: number): string => {
    const dt = new Date(timeStamp).getTime();
    const currDate = new Date().getTime();

    const days = Math.floor((currDate - dt) / (1000 * 60 * 60 * 24));
    if (days < 30) {
      return `${days} Days`;
    }
    if (days >= 365) {
      return `${Math.floor(days / 365)} Years`;
    }

    return `${Math.floor(days / 30)} Months`;
  };

  return (
    <CustomModal IsOpen={IsOpen} close={() => setShowShareModal(false)} isClose={true} paddingSX={{ p: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1B1B1F"
        }}
        ref={imageRef}
      >
        <Box sx={FLEX_BOX_ALIGN_CENTER_JUSTIFY_BETWEEN} px={4} pt={2}>
          {Number(data.roi) ? (
            <Box>
              <Box sx={FLEX_BOX_ROW_ALIGN_CENTER} gap={1}>
                {Number(data.roi) >= 0 ? <img src={arrowUp} height={"30px"} style={{ marginTop: "6px" }} /> : <img src={arrowDown} height={"30px"} style={{ marginTop: "6px" }} />}

                <Typography color={Number(data.roi) >= 0 ? "text.success" : "text.error"} variant={"Medium_48"}>
                  {data.roi.toFixed(2) + "%"}
                </Typography>
              </Box>
              <Typography variant="SemiBold_12">{"Return on Investment"}</Typography>
            </Box>
          ) : (
            <React.Fragment />
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end"
            }}
          >
            <Box sx={FLEX_BOX_ROW_ALIGN_CENTER} gap={2}>
              <img width={"20px"} src={data.avatar || DemoProfile} />
              <Typography variant={"SemiBold"}>{data.nickName}</Typography>
            </Box>
            <Typography variant={"SemiBold_12"} mt={1} color={"text.secondary"}>
              {"My Stats"}
            </Typography>
          </Box>
        </Box>
        <Box
          p={4}
          pt={1}
          pb={0}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative"
          }}
        >
          <img
            src={Line}
            style={{
              position: "absolute",
              left: 0,
              width: "100%",
              top: "15px"
            }}
          />
          <Box width={"50%"} mt={2}>
            <Box width={"200px"}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} mt={2}>
                <Typography variant="SemiBold_12" color={"text.secondary"}>
                  Followers
                </Typography>
                <Typography variant="SemiBold_12">{data.followersCount}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} mt={1}>
                <Typography variant="SemiBold_12" color={"text.secondary"}>
                  Total Signals
                </Typography>
                <Typography variant="SemiBold_12">{data.signalsGenerated}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} mt={1}>
                <Typography variant="SemiBold_12" color={"text.secondary"}>
                  Win %
                </Typography>
                <Typography variant="SemiBold_12">{data.winRate?.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} mt={1}>
                <Typography variant="SemiBold_12" color={"text.secondary"}>
                  Analyst Since
                </Typography>
                <Typography variant="SemiBold_12">{getDateFromTimestamp(data.updatedAt)}</Typography>
              </Box>
            </Box>
            <Box sx={QR_CODE_CONTAINER}>
              <img src={QRCode} />
              <Typography variant="Medium_10">{"Scan to unlock the Future"}</Typography>
            </Box>
          </Box>
          <img src={ShareModalImage} height={"270px"} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#29292E"
          }}
          p={2}
        >
          <img src={densityLogo} height={"20px"} />
          <Box sx={{ ...FLEX_BOX_ROW_ALIGN_CENTER, gap: 2 }}>
            <Box sx={FLEX_BOX_ROW_ALIGN_CENTER}>
              <Typography variant={"SemiBold_11"} color={"text.secondary"}>
                {"Download"}
              </Typography>
              <DownloadIcon color={"#fff"} fontSize={"16px"} onClick={downloadScreenshot} />
            </Box>
            <Box sx={FLEX_BOX_ROW_ALIGN_CENTER}>
              <Typography variant={"SemiBold_11"} color={"text.secondary"}>
                {"Share"}
              </Typography>
              <WhatsappShareButton
                url={"https://app.density.exchange"}
                separator=""
                title={
                  `${data.nickName && `Analyst Name: ${data.nickName} \n`}` +
                  "\n" +
                  "Analyst Since: " +
                  `${getDateFromTimestamp(data.updatedAt)}` +
                  "\n" +
                  "Win %: " +
                  `${data.winRate?.toFixed(2)}` +
                  "\n" +
                  "Followers: " +
                  `${data.followersCount}` +
                  "\n" +
                  "Total Signals: " +
                  `${data.signalsGenerated}` +
                  "\n"
                }
                className="share-btn"
              >
                <img src={WhatsappShare} width={"16px"} style={{ marginLeft: "16px" }} />
              </WhatsappShareButton>
              <TwitterShareButton
                url={"https://app.density.exchange"}
                title={
                  `${data.nickName && `Analyst Name: ${data.nickName} \n`}` +
                  "\n" +
                  "Analyst Since: " +
                  `${getDateFromTimestamp(data.updatedAt)}` +
                  "\n" +
                  "Win %: " +
                  `${data.winRate?.toFixed(2)}` +
                  "\n" +
                  "Followers: " +
                  `${data.followersCount}` +
                  "\n" +
                  "Total Signals: " +
                  `${data.signalsGenerated}` +
                  "\n"
                }
                hashtag="#DensityExchange"
                className="share-btn"
              >
                <img src={TwitterShare} width={"16px"} style={{ marginLeft: "16px" }} />
              </TwitterShareButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default ShareAnalystProfileModal;
