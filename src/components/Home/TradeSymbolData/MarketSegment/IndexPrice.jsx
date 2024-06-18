import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
const IndexPrice = ({ setDecimalPrecision, symbol, styles, contextListner }) => {
  const [indexPrice, setIndexPrice] = useState();
  const webWorkerInstance = useSelector((state) => state.getPersonalDetails.binanceWebWorkerInstance);
  const markPriceSnapshot = useSelector((state) => state.BinanceStreamData.markPriceSnapshot);

  useEffect(() => {
    const handleMessage = (message) => {
      const data = JSON.parse(message);
      if (data?.data?.s === symbol.toUpperCase() && data?.data?.e === "markPriceUpdate") {
        const indexPrice = data?.data?.i;
        setIndexPrice(indexPrice);
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
    setIndexPrice(markPriceSnapshot?.indexPrice || undefined);
  }, [symbol, markPriceSnapshot]);

  return (
    <Typography component="h5" variant="Medium_12">
      {setDecimalPrecision(indexPrice)}
    </Typography>
  );
};
IndexPrice.propTypes = {
  setDecimalPrecision: PropTypes.func,
  symbol: PropTypes.string,
  styles: PropTypes.object,
  contextListner: PropTypes.string
};

export default IndexPrice;
