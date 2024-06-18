import React, { useMemo, useRef, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import moment from "moment";

const Funding = ({ symbol, styles, contextListner }) => {
  // const setMarkPrice = useSelector(
  //   (state) => state.BinanceStreamData.markPrice
  // );
  const currentTime = useRef(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      currentTime.current = moment();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const markPriceHandler = (sData) => {
    const marketSegmentData = {
      symbol: sData.s,
      markprice: sData.p,
      indexPrice: sData.i,
      fundingRate: sData.r,
      countDown: sData.T
    };
    return marketSegmentData;
  };

  const [markPrice, setMarkPrice] = useState();
  const webWorkerInstance = useSelector((state) => state.getPersonalDetails.binanceWebWorkerInstance);
  const markPriceSnapshot = useSelector((state) => state.BinanceStreamData.markPriceSnapshot);

  useEffect(() => {
    const handleMessage = (message) => {
      const data = JSON.parse(message);
      if (data?.data?.s === symbol.toUpperCase() && data?.data?.e === "markPriceUpdate") {
        const markPrice = markPriceHandler(data?.data);
        setMarkPrice(markPrice);
      }
    };
    if (webWorkerInstance) {
      webWorkerInstance.on("message", handleMessage, `${contextListner}-funding`);
    }

    return () => {
      if (webWorkerInstance) {
        // webWorkerInstance.removeAllListeners();
        webWorkerInstance.removeListener("message", handleMessage, `${contextListner}-funding`);
      }
    };
  }, [webWorkerInstance, symbol]);

  const fundingRate = useMemo(() => {
    const mpData = markPrice;
    if (mpData) {
      const targetTime = moment(mpData.countDown);
      const timeBetween = moment.duration(targetTime.diff(currentTime.current));
      return (
        (mpData.fundingRate * 100).toFixed(4) + "%" + " / " + ("0" + timeBetween.hours()).slice(-2) + ":" + ("0" + timeBetween.minutes()).slice(-2) + ":" + ("0" + timeBetween.seconds()).slice(-2)
      );
    } else {
      return "--/--";
    }
  }, [markPrice, symbol]);

  useEffect(() => {
    setMarkPrice(markPriceSnapshot);
  }, [symbol, markPriceSnapshot]);

  return (
    <Typography component="h5" variant={"Medium_12"}>
      {fundingRate}
    </Typography>
  );
};
Funding.propTypes = {
  symbol: PropTypes.string,
  contextListner: PropTypes.string,
  styles: PropTypes.object
};

export default Funding;
