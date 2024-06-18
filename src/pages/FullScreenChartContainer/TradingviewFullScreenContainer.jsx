// import React, { useEffect } from "react";

// import { Box, useMediaQuery } from "@mui/material";
// import TradingViewChart from "@/components/Home/TradeSymbolData/TradingViewChart/TradingViewChartWrapper";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { selectedSymbol } from "BL/redux/actions/Internal/SetSelectedSymbol.ac";
// import { getTradableCoins } from "BL/redux/actions/Futures/GetTradableCoins.ac";
// import useHandleBinanceSocketSubs from "@/frontend-BL/businessHooks/BINANCE_WORKER/useHandleBinanceSocketSubs";
// export default function TradingViewFullScreenChartContainer() {
//   const dispatch = useDispatch();
//   const mobile = useMediaQuery("(max-width:900px)");
//   const { symbol } = useParams();
//   useHandleBinanceSocketSubs({ tradeScreen: false });
//   useEffect(() => {
//     dispatch(selectedSymbol(symbol.toLowerCase()));
//   }, [symbol]);
//   return (
//     <Box sx={{ height: "100vh" }}>
//       <TradingViewChart fullscreen={true} />
//     </Box>
//   );
// }
