import WebSocketModule from "@/frontend-BL/helpers/WebSocketModule";
import { setInactiveTime } from "@/frontend-BL/redux/actions/User/SetProfile.ac";
import { BASE_URL } from "@/frontend-api-service/Base";
import { useEffect, useRef, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
const useHandleBinanceSocketSubsMweb = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state: any) => state.selectSymbol.selectedSymbol).toLowerCase();
  const binanceData = useSelector((state: any) => state.BinanceStreamData.binanceData);

  const [connectionOpen, setConectionOpen] = useState<boolean>(false);

  const symbolTickerList = useSelector((state: any) => state.getPersonalDetails.ticketSymbolList);
  const activeSymbols = useSelector((state: any) => state.activeSymbolData.activeSymbols);

  const prevTickerSymbolList = useRef<string[]>([]);
  const allPositionsData = useSelector((state: any) => state.positionsDirectory.currentPositions);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleVisibility = () => {
    if (document.hidden) {
      dispatch(setInactiveTime(new Date().getTime()));
      WebSocketModule.disconnect();
    } else {
      WebSocketModule.disconnect();
      WebSocketModule.reconnect();
    }
  };

  useEffect(() => {
    if (connectionOpen) {
      // if(allPositionsData > 10) {
      //     WebSocketModule.slowFeedby(1000)
      // }
      let tickerList = [];
      if (allPositionsData?.length > 0) {
        allPositionsData.forEach((item: { sym: string }) => {
          const symName = item?.sym?.toLowerCase();
          const newArr = [`${symName}@markPrice@1s`, `${symName}@ticker`, `${symName}@miniTicker`];
          tickerList.push(...newArr);
        });
      }
      if (selectedOption) {
        const newArr = [
          `${selectedOption}@markPrice@1s`,
          `${selectedOption}@ticker`
          // `${selectedOption}@miniTicker`
        ];
        tickerList.push(...newArr);
      }
      dispatch({ type: "SET_SUBSCRIPTION_SYMBOL", payload: tickerList });
    }
  }, [allPositionsData, connectionOpen, selectedOption]);

  useEffect(() => {
    let binanceDataCopy = binanceData;
    const symbolData = activeSymbols?.find((item: { symbol: any }) => (item.symbol === selectedOption ? selectedOption.toUpperCase() : "BTCUSDT"));
    if (symbolData) {
      if (selectedOption) {
        binanceDataCopy[`${selectedOption}@markPrice@1s`] = symbolData.markPrice;
        binanceDataCopy[`${selectedOption}@ticker`] = symbolData.lp;
        binanceDataCopy[`${selectedOption}@per`] = symbolData.percentage;
      }

      const markPayload = {
        symbol: symbolData.symbol,
        markprice: symbolData.markPrice,
        indexPrice: symbolData.indexPrice
      };
      const ticketPayload = {
        symbol: symbolData?.symbol,
        ltp: symbolData?.lp,
        change24hHigh: symbolData?.high,
        change24hLow: symbolData?.low,
        volume24h: symbolData.vol,
        change24h: symbolData?.priceChange,
        change24hpercent: symbolData?.percentage
      };
      activeSymbols.forEach((item: { symbol: string; markPrice: any; lp: any; percentage: any }) => {
        binanceDataCopy[`${item.symbol?.toLowerCase()}@markPrice@1s`] = item.markPrice;
        binanceDataCopy[`${item.symbol?.toLowerCase()}@ticker`] = item.lp;
        binanceDataCopy[`${item.symbol?.toLowerCase()}@per`] = item.percentage;
      });
      batch(() => {
        dispatch({ type: "SET_BINANCE_DATA", payload: binanceDataCopy });
        dispatch({ type: "SET_TICKER_SNAPSHOT", payload: ticketPayload });
        dispatch({ type: "SET_MARKPRICE_SNAPSHOT", payload: markPayload });
      });
    }
  }, [selectedOption, activeSymbols]);

  useEffect(() => {
    WebSocketModule.on("open", () => {
      setConectionOpen(true);
      dispatch({ type: "SET_BINACE_INSTANCE", payload: WebSocketModule });
      if (symbolTickerList && symbolTickerList.length > 0) {
        const sub = {
          method: "SUBSCRIBE",
          params: [...new Set(symbolTickerList)],
          id: 2
        };
        WebSocketModule.send(JSON.stringify(sub));
      }
    });

    const baseUrl = BASE_URL().binanceWsBase;
    if (!connectionOpen) {
      WebSocketModule.connect(baseUrl);
    }

    // Clean up the event listeners when the component is unmounted
    return () => {
      WebSocketModule.removeAllListeners();
      setConectionOpen(false);
      WebSocketModule.hardDisconnect();
      dispatch({ type: "SET_BINACE_INSTANCE", payload: undefined });
    };
  }, []);

  useEffect(() => {
    WebSocketModule.on("message", (message) => {
      if (message) {
        const data = JSON.parse(message);

        if (data) {
          let bData = binanceData || {};
          bData[data?.stream] = data?.data?.c || data?.data?.p;
          if (data?.data?.P) {
            bData[`${data?.data?.s?.toLowerCase()}@per`] = data?.data?.P;
          }
          dispatch({ type: "SET_BINANCE_DATA", payload: bData });
        }
      }
    });
    // if(!isLargeScreen && window.location.pathname === "/position") {
    //     WebSocketModule.on('message', (message) => {
    //         if(message) {
    //             const data = JSON.parse(message)
    //         // console.log("Anoop events23", data)
    //             if(data) {
    //                 let bData = binanceData || {};
    //                 bData[data?.stream] = data?.data?.c || data?.data?.p;
    //                 dispatch({ type: "SET_BINANCE_DATA", payload: bData });

    //             }
    //         }
    //     })
    // } else {
    //     if(selectedOption) {
    //         WebSocketModule.on('message', (message) => {
    //             if(message) {
    //                 const data = JSON.parse(message)
    //             // console.log("Anoop events23", data)
    //                 if(data) {
    //                     let bData = binanceData || {};
    //                     bData[data?.stream] = data?.data?.c || data?.data?.p;
    //                     dispatch({ type: "SET_BINANCE_DATA", payload: bData });

    //                 }
    //             }
    //         })
    //     }
    // }
  }, [connectionOpen]);

  useEffect(() => {
    if (connectionOpen) {
      // Find added elements
      const addedElements = symbolTickerList.filter((updatedItem: string) => !prevTickerSymbolList.current.includes(updatedItem));

      // Find removed elements
      const removedElements = prevTickerSymbolList.current.filter((previousItem) => !symbolTickerList.includes(previousItem));

      let binanceDatacopy = binanceData || {};

      if (addedElements?.length > 0) {
        const sub = {
          method: "SUBSCRIBE",
          params: [...new Set(addedElements)],
          id: 2
        };
        WebSocketModule.send(JSON.stringify(sub));
        addedElements.forEach((item: string) => {
          if (!binanceDatacopy[item]) {
            binanceDatacopy[item] = "";
          }
        });
      }

      if (removedElements?.length > 0) {
        const unsub = {
          method: "UNSUBSCRIBE",
          params: [...new Set(removedElements)],
          id: 2
        };
        WebSocketModule.send(JSON.stringify(unsub));
        removedElements.forEach((item: string) => {
          if (binanceDatacopy[item]) {
            delete binanceDatacopy[item];
          }
        });
      }
      const sub = {
        method: "SUBSCRIBE",
        params: [...new Set(symbolTickerList)],
        id: 2
      };
      WebSocketModule.updateLastMessage(JSON.stringify(sub));
      prevTickerSymbolList.current = symbolTickerList;
    }
  }, [symbolTickerList, connectionOpen]);
};

export default useHandleBinanceSocketSubsMweb;
