import PropTypes from "prop-types";
import { Box, Typography, Container, Drawer } from "@mui/material";
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
  ShareActionsMobileContainer,
  ShareCardArrow,
  ShareCardFlex,
  ShareCardQRCode,
  ShareCardROENegative,
  ShareCardROEPositive,
  ShareViaWrapper
} from "./SharePosition.styles";
import { useSelector } from "react-redux";
import WaveFormSVG from "./WaveFormSVG";
import LastTradedPrice from "@/components/LastTradedPrice/LastTradedPrice";
import { SymbolPrecisionHelper } from "@/helpers";

const textStrings = {
  ENTRYPRICE: "Entry Price",
  LASTPRICE: "Last Price",
  DOWNLOAD: "Download",
  SCANQR: "Scan QR code to know more about",
  DENSITY: "DENSITY"
};

const SharePositionDrawer = ({ symbolPricePrecision, isOpen, side, close, leverage, symbol, marginType, entryPrice }) => {
  const imageRef = createRef(null);
  const ltp = useSelector((state) => state.BinanceStreamData.binanceData?.[`${symbol?.toLowerCase()}@ticker`]);

  const crossWalletDetails = useSelector((state) => state.positionsDirectory.crossWalletDetails.find((data) => data.symbol === symbol));
  const { setDecimalPrecision } = SymbolPrecisionHelper({ symbol });
  const isolatedWallet = useSelector((state) => state.positionsDirectory.isolatedWallet.find((data) => data.sym === symbol));
  const TotalUnRealisedProfitAndLoss = useSelector((state) => state.positionsDirectory.unRealizedPnL).find((item) => item.symbol === symbol);
  const TotalUnRealisedProfitAndLossForCross = useSelector((state) => state.positionsDirectory.unRealizedPnLForCross).find((item) => item.symbol === symbol);
  const calculateIsolatedPositionROE = useMemo(
    () => (TotalUnRealisedProfitAndLoss?.unRealisedPnl / Number(isolatedWallet?.isolatedWallet)) * 100,

    [TotalUnRealisedProfitAndLoss?.unRealisedPnl]
  );
  const calculateCrossPositionROE = useMemo(
    () => (TotalUnRealisedProfitAndLossForCross?.unRealisedPnl / Number(crossWalletDetails?.initialMargin)) * 100,
    [TotalUnRealisedProfitAndLossForCross?.unRealisedPnl]
  );
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
    width: "375px",
    height: "408px"
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
  const [showPnl, setShowPnL] = useState(false);

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
    <Drawer
      open={isOpen}
      onClose={close}
      sx={{
        width: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "100%",
          backgroundColor: "#1F1F24",
          overflowY: "hidden",
          height: 552,
          backgroundImage: "none",
          display: "flex",
          alignItems: "center"
        }
      }}
      anchor="bottom"
    >
      <Box
        sx={{
          mt: 0,
          position: "relative",
          height: 480,
          width: "100%",
          backgroundColor: "#1F1F24",
          top: 10
        }}
        ref={imageRef}
      >
        <Box
          sx={{
            position: "absolute",
            right: -15,
            top: -15,
            overflow: "hidden",
            transform: "scale(0.8)"
          }}
        >
          <Box sx={{ overflow: "hidden" }}>
            <img style={{}} src={GridPattern} alt="image" />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: 30,
            top: 44,
            transform: "scale(0.9)"
          }}
        >
          <Box>
            <img style={{ maxWidth: "100px", position: "relative", left: 15 }} src={EthGreenCoin} alt="image" />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 282,
            left: -10,
            transform: "scale(0.9)"
          }}
        >
          <img style={{ maxWidth: "150px" }} src={GroupCoin} alt="image" />
        </Box>
        <Box sx={{ position: "absolute", top: 14, left: 14 }}>
          <img style={{ maxWidth: "100px" }} src={densityLogo} alt="logo" />
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: 0,
            bottom: 28,
            width: 100,
            height: 56.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5
          }}
        >
          <Box component="img" sx={ShareCardQRCode} alt="qr code" src={QRCode} />
          <Typography variant="Regular_7" component={"p"}>
            {textStrings.SCANQR} &nbsp;{" "}
            <Typography color="text.main" variant="Regular_7">
              {textStrings.DENSITY}
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: 512,
            height: 32,
            overflow: "hidden",
            left: 0,
            bottom: 0
          }}
        >
          <Box sx={{ position: "relative", left: "-11%", top: "9%" }}>
            <WaveFormSVG isGradientGreen={Boolean(TotalUnRealisedProfitAndLoss?.unRealisedPnl.unPnl > 0)} />
          </Box>
        </Box>
        <Box sx={{ position: "absolute", bottom: 23, left: 8, width: 118 }}>
          <Typography variant="Regular_12" component={"p"} color={"#A9A9A9"}>
            {"*ROE % is based on wallet balance."}
          </Typography>
        </Box>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: 70,
            left: 6
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
              {marginType}
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
                marginTop: 2
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
                <Typography component={"span"} variant="Medium_11" color={TotalUnRealisedProfitAndLoss?.unRealisedPnl > 0 ? "#00BD84" : "#F46151"} sx={{ lineHeight: 1 }}>
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
              mt: "20px"
            }}
          >
            <Box sx={PositionDataBox}>
              <Typography variant="Medium_12" color="#A9A9A9">
                Side
              </Typography>
              <Typography variant="Medium_12">{side}</Typography>
            </Box>
            <Box sx={PositionDataBox}>
              <Typography variant="Medium_12" color="#A9A9A9">
                Leverage
              </Typography>
              <Typography variant="Medium_12">
                {leverage}
                {"x"}
              </Typography>
            </Box>
            <Box sx={PositionDataBox}>
              <Typography variant="Medium_12" color="#A9A9A9">
                Entry Price
              </Typography>
              <Typography variant="Medium_12">{entryPrice}</Typography>
            </Box>
            <Box sx={PositionDataBox}>
              <Typography variant="Medium_12" color="#A9A9A9">
                Last Price
              </Typography>
              <LastTradedPrice convertToPrecisionValueForPrice={setDecimalPrecision} symbolPricePrecision={symbolPricePrecision} variant="Medium_12" symbol={symbol} />
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={ShareActionsMobileContainer}>
        <Box sx={DownloadWrapper}>
          <Typography variant="Regular_10">Download</Typography>
          <Box component={"img"} src={DownloadButton} onClick={downloadScreenshot} sx={{ cursor: "pointer" }}></Box>
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
              `${marginType === "Isolated" ? calculateIsolatedPositionROE.toFixed(2) : calculateCrossPositionROE.toFixed(2)}` +
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
              `${marginType.toUpperCase() === "ISOLATED" ? calculateIsolatedPositionROE.toFixed(2) : calculateCrossPositionROE.toFixed(2)}` +
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
    </Drawer>
  );
};

SharePositionDrawer.propTypes = {
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

export default memo(SharePositionDrawer);
