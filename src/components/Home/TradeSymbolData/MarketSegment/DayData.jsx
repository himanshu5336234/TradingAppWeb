import React, { useEffect, useMemo, useState } from "react";
import { PropTypes } from "prop-types";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
const DayLow = ({ symbol, setDecimalPrecision, color, symbolPricePrecision, type, contextListner }) => {
  // const setTickerData = useSelector((state) => state.BinanceStreamData.ticker);
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
      webWorkerInstance.on("message", handleMessage, `${contextListner}-daydate`);
    }

    return () => {
      if (webWorkerInstance) {
        // webWorkerInstance.removeAllListeners();
        webWorkerInstance.removeListener("message", handleMessage, `${contextListner}-daydate`);
      }
    };
  }, [webWorkerInstance, symbol]);
  const changemarketSegment = useMemo(() => {
    const data = tickerData;
    if (!tickerData) {
      return "--";
    }
    switch (type) {
      case "DAY_LOW":
        return data && data.change24hLow;
      case "DAY_HIGH":
        return data && data.change24hHigh;
      case "DAY_VOLUME":
        return data && (data.volume24h ? parseFloat(data.volume24h) : 0);
      default:
        return 0;
    }
  }, [tickerData]);

  useEffect(() => {
    setTickerData(tickerSnapshot);
  }, [symbol, tickerSnapshot]);
  return (
    <Typography color={color} component={"h5"} variant={"Medium_12"}>
      {setDecimalPrecision(changemarketSegment, symbolPricePrecision)}
    </Typography>
  );
};
DayLow.propTypes = {
  setDecimalPrecision: PropTypes.func,
  symbolPricePrecision: PropTypes.string,
  symbol: PropTypes.string,
  color: PropTypes.string,
  contextListner: PropTypes.string,
  type: PropTypes.string
};
export default DayLow;
