import WebSocketModule from "@/frontend-BL/helpers/WebSocketModule";
import { BASE_URL } from "@/frontend-api-service/Base";
import { Dispatch, useEffect, useRef, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
const useHandleBinanceSocketSubs = ({ tradeScreen }: { tradeScreen: boolean }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const [connectionOpen, setConectionOpen] = useState<boolean>(false);
  const prevTickerSymbolList = useRef<string[]>([]);
  const watchlistData = useSelector((state: any) => state.favouriteSymbols.favouriteSymbolsInViewPort);
  const symbolTickerList = useSelector((state: any) => state.getPersonalDetails.ticketSymbolList);
  const activeSymbols = useSelector((state: any) => state.activeSymbolData.activeSymbols);
  const selectedOption = useSelector((state: any) => state.selectSymbol.selectedSymbol).toLowerCase();
  const allPositionsData = useSelector((state: any) => state.positionsDirectory.currentPositions);
  const liveSignalListForAnalyst = useSelector((state: any) => state.SignalTrading.liveSignalsIssuedIfAnAnalyst);
  const binanceData = useSelector((state: any) => state.BinanceStreamData.binanceData);
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);
  useEffect(() => {
    const baseUrl = BASE_URL().binanceWsBase;
    if (!connectionOpen) {
      WebSocketModule.connect(baseUrl);
    }
  }, [connectionOpen]);
  const handleVisibility = () => {
    if (document.hidden) {
      WebSocketModule.windowTabChange({ payload: "inactive" });
    } else {
      WebSocketModule.windowTabChange({ payload: "active" });
    }
  };

  useEffect(() => {
    if (connectionOpen && tradeScreen) {
      let tickerList = [];
      if (allPositionsData?.length > 0) {
        allPositionsData.forEach((item: { sym: string }) => {
          const symbolName = item?.sym?.toLowerCase();
          const ListOfActivePositonSymbols = [
            `${symbolName.toLowerCase()}@markPrice@1s`,
            `${symbolName.toLowerCase()}@ticker`
            // `MARK_PRICE.${symbolName.toLowerCase()}.FUTURES.BINANCE`,
            // `TICKER_PRICE.${symbolName.toLowerCase()}.FUTURES.BINANCE`,
          ];
          tickerList.push(...ListOfActivePositonSymbols);
        });
      }
      if (selectedOption) {
        const newArr = [
          `${selectedOption.toLowerCase()}@markPrice@1s`,
          `${selectedOption.toLowerCase()}@ticker`,
          `${selectedOption.toLowerCase()}@depth20`

          // `MARK_PRICE.${selectedOption.toUpperCase()}.FUTURES.BINANCE`,
          // `TICKER_PRICE.${selectedOption.toUpperCase()}.FUTURES.BINANCE`
        ];

        tickerList.push(...newArr);
      }
      if (liveSignalListForAnalyst?.data?.length > 0) {
        liveSignalListForAnalyst.data.forEach((item: { symbol: string }) => {
          const symbolName = item?.symbol?.toLowerCase();
          const ListOfActivePositonSymbols = [
            `${symbolName.toLowerCase()}@ticker`
            // `TICKER_PRICE.${symbolName.toUpperCase()}.FUTURES.BINANCE`,
          ];
          tickerList.push(...ListOfActivePositonSymbols);
        });
      }
      dispatch({ type: "SET_SUBSCRIPTION_SYMBOL", payload: tickerList });
    }
  }, [allPositionsData, connectionOpen, selectedOption, liveSignalListForAnalyst]);

  useEffect(() => {
    let binanceDataCopy = binanceData;
    const symbolData = activeSymbols?.find((item: { symbol: any }) => item.symbol === selectedOption.toUpperCase());
    if (symbolData && tradeScreen) {
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
  }, [selectedOption, activeSymbols, liveSignalListForAnalyst]);

  useEffect(() => {
    WebSocketModule.on("open", () => {
      setConectionOpen(true);
      dispatch({
        type: "BINANCE_WS_OPENED",
        payload: {
          connecting: true,
          opened: true
        }
      });
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

    // Clean up the event listeners when the component is unmounted
    return () => {
      WebSocketModule.removeAllListeners();
      setConectionOpen(false);

      WebSocketModule.hardDisconnect();
      dispatch({ type: "SET_BINACE_INSTANCE", payload: undefined });
    };
  }, []);

  // think again
  useEffect(() => {
    if (selectedOption || liveSignalListForAnalyst?.data?.length > 0) {
      WebSocketModule.on("message", (message) => {
        if (message) {
          const data = JSON.parse(message);
          if (data) {
            let bData = binanceData || {};
            if (data?.data?.e === "markPriceUpdate") {
              bData[`${data?.data?.s?.toLowerCase()}@markPrice@1s`] = data?.data?.p;
            }
            if (data?.data?.e === "24hrTicker") {
              bData[`${data?.data?.s?.toLowerCase()}@per`] = data?.data?.P;
              bData[`${data?.data?.s?.toLowerCase()}@ticker`] = data?.data?.c;
            }
            if (data?.data?.e === "depthUpdate") {
              if (data.data.a.length > 0) {
                dispatch({ type: "SET_ASKS", payload: data.data });
              }
              if (data.data.b.length > 0) {
                dispatch({ type: "SET_BIDS", payload: data.data });
              }
            }
            if (data?.data?.e === "RE_CONNECT") {
              setConectionOpen(false);
              prevTickerSymbolList.current = [];
              dispatch({
                type: "BINANCE_WS_OPENED",
                payload: {
                  connecting: false,
                  opened: false
                }
              });
            }

            // why the whole object save again and again
            dispatch({ type: "SET_BINANCE_DATA", payload: bData });
          }
        }
      });
    }
  }, [selectedOption]);

  useEffect(() => {
    if (connectionOpen) {
      const watchlistdata = watchlistData || [];
      const newSymbolTicker = [...symbolTickerList, ...watchlistdata];
      const addedElements = newSymbolTicker.filter((updatedItem: string) => !prevTickerSymbolList.current.includes(updatedItem));

      // Find removed elements
      const removedElements = prevTickerSymbolList.current.filter((previousItem) => !newSymbolTicker.includes(previousItem));
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
        params: [...new Set(newSymbolTicker)],
        id: 2
      };
      WebSocketModule.updateLastMessage(JSON.stringify(sub));
      prevTickerSymbolList.current = newSymbolTicker;
    }
  }, [symbolTickerList, connectionOpen, watchlistData]);
};

export default useHandleBinanceSocketSubs;
