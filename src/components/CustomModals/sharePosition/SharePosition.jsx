/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Box, Typography, Container } from "@mui/material";
import React, { useMemo, createRef, memo, useCallback, useState } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import densityLogo from "@/assets/images/logo.svg";
import arrow from "@/assets/images/SharePositionImages/arrow.svg";
import arrowdown from "@/assets/images/SharePositionImages/arrowdown.svg";
import EthGreenCoin from "@/assets/images/SharePositionImages/EthGreenCoin.svg";
import QRCode from "@/assets/images/QRCode.svg";
import GroupCoin from "@/assets/images/SharePositionImages/CoinGroup.svg";
import GridPattern from "@/assets/images/SharePositionImages/GridsPattern.svg";
import DownloadButton from "@/assets/images/SharePositionImages/DownloadButton.svg";
import WhatsappShare from "@/assets/images/SharePositionImages/WhatsappShare.svg";
import TwitterShare from "@/assets/images/SharePositionImages/TwitterShare.svg";
import { TwitterShareButton, WhatsappShareButton } from "react-share";
import "./Modals.scss";
import {
  DownloadWrapper,
  PositionDataBox,
  ShareActionsContainer,
  ShareCardArrow,
  ShareCardFlex,
  ShareCardQRCode,
  ShareCardROENegative,
  ShareCardROEPositive,
  ShareCardWrapper,
  SharePnlModalContainer,
  ShareQRCodeWrapper,
  ShareViaWrapper,
  WaveFormWrapper
} from "./SharePosition.styles";
import CustomModal from "../newModal/CustomModal";
import { useSelector } from "react-redux";
import WaveFormSVG from "./WaveFormSVG";
import { SymbolPrecisionHelper } from "@/helpers";
import LastTradedPrice from "@/components/LastTradedPrice/LastTradedPrice";

const textStrings = {
  ENTRYPRICE: "Entry Price",
  LASTPRICE: "Last Price",
  DOWNLOAD: "Download",
  SCANQR: "Scan QR code to know more about",
  DENSITY: "DENSITY"
};
const SharePositionModal = ({ symbolPricePrecision, isOpen, side, close, leverage, symbol, marginType, entryPrice }) => {
  const { setDecimalPrecision } = SymbolPrecisionHelper({ symbol });
  const imageRef = createRef(null);
  const ltp = useSelector((state) => state.BinanceStreamData.binanceData?.[`${symbol?.toLowerCase()}@ticker`]);

  const TotalUnRealisedProfitAndLoss = useSelector((state) => state.positionsDirectory.unRealizedPnL).find((item) => item.symbol === symbol);

  const TotalUnRealisedProfitAndLossForCross = useSelector((state) => state.positionsDirectory.unRealizedPnLForCross).find((item) => item.symbol === symbol);

  const [showPnl, setShowPnL] = useState(false);

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

  const ShowPositionROE = useCallback(
    ({ ROE }) => {
      return (
        <Box
          sx={ShareCardFlex}
          onClick={() => {
            setShowPnL(!showPnl);
          }}
        >
          {isNaN(ROE?.ratio) && (
            <>
              <Typography sx={ShareCardROEPositive}>--</Typography>
            </>
          )}{" "}
          {ROE?.ratio >= 0 && !isNaN(ROE?.ratio) && (
            <>
              <img style={ShareCardArrow} src={arrow} alt="arrow" />
              <Typography id="positionModal-ROE-Percent" sx={ShareCardROEPositive}>
                {"+"}
                {ROE?.ratio.toFixed(2)}%
              </Typography>
            </>
          )}
          {ROE?.ratio < 0 && !isNaN(ROE?.ratio) && (
            <>
              <img style={ShareCardArrow} src={arrowdown} alt="arrow" />
              <Typography sx={ShareCardROENegative}>{Number(ROE?.ratio)?.toFixed(2)}%</Typography>
            </>
          )}
        </Box>
      );
    },
    [showPnl]
  );
  return (
    <CustomModal IsOpen={isOpen} close={close} isClose={false} disableConfirm={true} ContainerSx={SharePnlModalContainer}>
      <Box sx={ShareCardWrapper} ref={imageRef}>
        <Box sx={{ position: "absolute", left: 384, top: 0, overflow: "hidden" }}>
          <Box sx={{ overflow: "hidden" }}>
            <img style={{}} src={GridPattern} alt="image" />
          </Box>
        </Box>
        <Box sx={{ position: "absolute", left: 420, top: 64 }}>
          <Box>
            <img style={{ maxWidth: "100px", position: "relative", left: 15 }} src={EthGreenCoin} alt="image" />
          </Box>
        </Box>
        <Box sx={{ position: "absolute", top: 100, left: 0 }}>
          <img style={{ maxWidth: "150px" }} src={GroupCoin} alt="image" />
        </Box>
        <Box sx={{ position: "absolute", top: 14, left: 14 }}>
          <img style={{ maxWidth: "100px" }} src={densityLogo} alt="logo" />
        </Box>
        <Box sx={ShareQRCodeWrapper}>
          <Box component="img" sx={ShareCardQRCode} alt="qr code" src={QRCode} />
          <Typography variant="Regular_7" component={"p"}>
            {textStrings.SCANQR} &nbsp;{" "}
            <Typography color="text.main" variant="Regular_7">
              {textStrings.DENSITY}
            </Typography>
          </Typography>
        </Box>
        <Box sx={WaveFormWrapper}>
          <Box sx={{ position: "relative", left: "-11%", top: "9%" }}>
            <WaveFormSVG isGradientGreen={Boolean(TotalUnRealisedProfitAndLoss?.unRealisedPnl > 0)} />
          </Box>
        </Box>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: 32
          }}
        >
          <Typography
            component={"p"}
            variant="SemiBold_18"
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px 16px 5px",
              borderRadius: "4px",
              backgroundColor: "#2C2C34",
              gap: "8px"
            }}
          >
            {symbol}{" "}
            <Typography sx={{ width: "fit-content", marginTop: 0.5 }} component="span" variant="Regular_11">
              {marginType?.toUpperCase()}
            </Typography>
          </Typography>
          {marginType?.toUpperCase() === "ISOLATED" ? <ShowPositionROE ROE={TotalUnRealisedProfitAndLoss} /> : <ShowPositionROE ROE={TotalUnRealisedProfitAndLossForCross} />}
          {showPnl && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "18px",
                marginTop: 0
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  height: "fit-content"
                }}
              >
                <Typography component={"p"} variant="Medium_11" sx={{ lineHeight: 1 }} color="#A9A9A9">
                  Position P&L: &nbsp;
                </Typography>
                <Typography id="positionModal-PnL" component={"span"} variant="Medium_11" color={TotalUnRealisedProfitAndLoss?.unRealisedPnl > 0 ? "#00BD84" : "#F46151"} sx={{ lineHeight: 1 }}>
                  {marginType?.toUpperCase() === "ISOLATED" ? TotalUnRealisedProfitAndLoss?.unRealisedPnl.toFixed(4) : TotalUnRealisedProfitAndLossForCross?.unRealisedPnl.toFixed(4)}
                  {" USDT"}
                </Typography>
              </Box>
            </Box>
          )}
          <Box
            sx={{
              width: "237px",
              padding: "10px 28px",
              borderWidth: "1px",
              borderStyle: "dashed",
              borderColor: TotalUnRealisedProfitAndLoss?.unRealisedPnl >= 0 ? "#2E4037" : "#402E2E",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              mt: "18px"
            }}
          >
            <Box sx={PositionDataBox}>
              <Typography variant="Medium_10" color="#A9A9A9">
                Side
              </Typography>
              <Typography id={"positionModal-" + side + "-side"} variant="Medium_10">
                {side}
              </Typography>
            </Box>
            <Box sx={PositionDataBox}>
              <Typography variant="Medium_10" color="#A9A9A9">
                Leverage
              </Typography>
              <Typography id="positionModal-leverage" variant="Medium_10">
                {leverage}
                {"x"}
              </Typography>
            </Box>
            <Box sx={PositionDataBox}>
              <Typography variant="Medium_10" color="#A9A9A9">
                Entry Price
              </Typography>
              <Typography id="positionModal-Entry-Price" variant="Medium_10">
                {entryPrice}
              </Typography>
            </Box>
            <Box sx={PositionDataBox}>
              <Typography variant="Medium_10" color="#A9A9A9">
                Last Price
              </Typography>
              <LastTradedPrice convertToPrecisionValueForPrice={setDecimalPrecision} symbolPricePrecision={symbolPricePrecision} variant="Medium_12" symbol={symbol} />
            </Box>
          </Box>
        </Container>
        <Box sx={ShareActionsContainer}>
          <Box sx={DownloadWrapper}>
            <Typography variant="Regular_10">Download</Typography>
            <Box id="positionModal-download-btn" component={"img"} src={DownloadButton} onClick={downloadScreenshot} sx={{ cursor: "pointer" }}></Box>
          </Box>
          <Box sx={ShareViaWrapper}>
            <Typography variant="Regular_10">Share Via</Typography>
            <WhatsappShareButton
              url={"https://app.density.exchange"}
              separator=""
              title={
                "Coin: " +
                symbol +
                "\n" +
                "Margin Type: " +
                marginType +
                "\n" +
                "Position Side: " +
                side +
                "\n" +
                "Leverage: " +
                leverage +
                "x" +
                "\n" +
                "ROE: " +
                `${marginType?.toUpperCase() === "ISOLATED" ? TotalUnRealisedProfitAndLoss?.ratio?.toFixed(4) : TotalUnRealisedProfitAndLossForCross?.ratio.toFixed(4)}` +
                "%" +
                "\n" +
                "Entry Price: " +
                entryPrice +
                "USDT" +
                "\n" +
                "Last Price: " +
                ltp +
                "USDT" +
                "\n"
              }
              className="share-btn"
            >
              <img src={WhatsappShare} alt="whatsapp" />
            </WhatsappShareButton>
            <TwitterShareButton
              url={"https://app.density.exchange"}
              title={
                "Coin: " +
                symbol +
                "\n" +
                "Margin Type: " +
                marginType +
                "\n" +
                "Position Side: " +
                side +
                "\n" +
                "Leverage: " +
                leverage +
                "X" +
                "\n" +
                "ROE : " +
                `${marginType?.toUpperCase() === "ISOLATED" ? TotalUnRealisedProfitAndLoss?.ratio.toFixed(4) : TotalUnRealisedProfitAndLossForCross?.ratio.toFixed(4)}` +
                "%" +
                "\n" +
                "Entry Price: " +
                entryPrice +
                "USDT" +
                "\n" +
                "Last Price: " +
                ltp +
                "USDT" +
                "\n"
              }
              hashtag="#DensityExchange"
              className="share-btn"
            >
              <img src={TwitterShare} alt="twitter" style={{}} />
            </TwitterShareButton>
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

SharePositionModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  getPositionSide: PropTypes.string,
  getLeverage: PropTypes.string,
  getEntryPrice: PropTypes.string,
  ltp: PropTypes.string,
  getIsolatedWallet: PropTypes.string,
  disableConfirm: PropTypes.bool,
  symbol: PropTypes.string,
  getPositionSize: PropTypes.string,
  getPositionAmount: PropTypes.string,
  getPositionUnrealizedProfit: PropTypes.number
};

export default memo(SharePositionModal);
