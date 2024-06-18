import React, { useEffect, useMemo, useState } from "react";
import { PropTypes } from "prop-types";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
const COLOR_INDICATOR = {
  green: "#28b67e",
  red: "#f46251"
};
const DayLow = ({
  symbol,

  styles,
  type,
  contextListner
}) => {
  const webWorkerInstance = useSelector((state) => state.getPersonalDetails.binanceWebWorkerInstance);
  const tickerSnapshot = useSelector((state) => state.BinanceStreamData.tickerSnapshot);
  const [tickerData, setTickerData] = useState();
  const tickerHandler = (sData) => {
    const tickerData = {
      symbol: sData.s,
      ltp: sData.c,
      change24hHigh: sData.h,
      change24hLow: sData.l,
      volume24h: sData.q,
      countDown: sData.T,
      change24h: sData.p,
      change24hpercent: sData.P
    };
    return tickerData;
  };

  useEffect(() => {
    const handleMessage = (message) => {
      const data = JSON.parse(message);
      if (data?.data?.s === symbol.toUpperCase() && data?.data?.e === "24hrTicker") {
        const ticketData = tickerHandler(data?.data);
        setTickerData(ticketData);
      }
    };
    if (webWorkerInstance) {
      webWorkerInstance.on("message", handleMessage, `${contextListner}-change-24`);
    }

    return () => {
      if (webWorkerInstance) {
        // webWorkerInstance.removeAllListeners();
        webWorkerInstance.removeListener("message", handleMessage, `${contextListner}-change-24`);
      }
    };
  }, [webWorkerInstance, symbol]);

  useEffect(() => {
    setTickerData(tickerSnapshot);
  }, [symbol, tickerSnapshot]);

  const changemarketSegment = useMemo(() => {
    const data = tickerData;
    if (!tickerData) {
      return {
        indicator: COLOR_INDICATOR.red,
        priceChange: "--",
        percentageChange: "--"
      };
    }
    if (data.change24hpercent?.toString().charAt(0) === "-") {
      return {
        indicator: COLOR_INDICATOR.red,
        priceChange: data.change24h,
        percentageChange: data.change24hpercent
      };
    } else {
      return {
        indicator: COLOR_INDICATOR.green,
        priceChange: data.change24h,
        percentageChange: data.change24hpercent
      };
    }
  }, [tickerData]);

  return (
    // <Typography component={"p"} sx={styles}>
    <Typography variant={"Medium_12"} component={"h5"} sx={{ ...styles, color: changemarketSegment?.indicator ?? "#2FDAAF" }}>
      {/* {changemarketSegment?.priceChange ?? "--"} */}
      {/* <span style={{ color: "#A9A9A9" }}>{" / "}</span>{" "} */}
      {changemarketSegment?.percentageChange !== undefined ? changemarketSegment?.percentageChange + "%" : "--"}
    </Typography>
    // </Typography>
  );
};
DayLow.propTypes = {
  setDecimalPrecision: PropTypes.func,
  symbol: PropTypes.string,
  styles: PropTypes.object,
  type: PropTypes.string,
  contextListner: PropTypes.string
};
export default DayLow;
