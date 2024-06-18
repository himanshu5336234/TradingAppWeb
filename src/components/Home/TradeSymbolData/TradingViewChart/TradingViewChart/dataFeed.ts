import { topXTradableSymbolListApi } from "@/frontend-api-service/Api";
import { BASE_URL } from "@/frontend-api-service/Base";
import axios from "axios";
import { configurationData } from "./helpers";
import chartWS from "./streaming";
const { binanceBaseUrl } = BASE_URL();
const lastBarsCache = new Map();
let allSymbols = JSON.parse((window as any).localStorage.getItem("tradablesymbolList"));
let lastStartTime: any;
const getBinanceKlines = (symbol: string, interval: any, startTime: any, endTime: any, limit: number) => {
  if (lastStartTime && startTime === lastStartTime) {
    return [];
  }
  lastStartTime = startTime;
  const url = `${binanceBaseUrl}/fapi/v1/continuousKlines?pair=${symbol}&contractType=PERPETUAL&interval=${interval}${startTime ? `&startTime=${startTime}` : ""}${
    endTime ? `&endTime=${endTime}` : ""
  }${limit ? `&limit=${limit}` : ""}`;
  return axios
    .get(url)
    .then((res: { data: any }) => {
      return res.data;
    })
    .then((json: any) => {
      return json;
    });
};
function pricescale(symbol: string) {
  const symbolPrecisionData = allSymbols.find((data: { symbol: string }) => data.symbol.toLowerCase() === symbol.toLowerCase());
  symbolPrecisionData.pricePrecision;
  return Math.pow(10, Number(symbolPrecisionData.pricePrecision));
}

async function getKlines(from: any, to: any, symbolInfo: { name: string }, interval: any) {
  let totalKlines: any[] = [];
  const kLinesLimit = 1500;
  try {
    let data = await getBinanceKlines(symbolInfo.name, interval, from, to, kLinesLimit);
    totalKlines = [...totalKlines, ...data];
    while (data.length === kLinesLimit) {
      data = await getBinanceKlines(symbolInfo.name, interval, from, to, kLinesLimit);
      totalKlines = [...totalKlines, ...data];
    }
    const historyCBArray = totalKlines.map((kline) => ({
      time: kline[0],
      open: Number(kline[1]),
      high: Number(kline[2]),
      low: Number(kline[3]),
      close: Number(kline[4]),
      volume: Number(kline[5])
    }));
    return historyCBArray;
  } catch (err) {
    throw new Error("Error in getting klines");
  }
}
const { subscribeOnStream, unsubscribeFromStream, tvIntervals } = chartWS();

const dataFeed = {
  onReady: (callback: (arg0: { supports_marks: boolean; supports_timescale_marks: boolean; supports_time: boolean; supported_resolutions: string[] }) => void) => {
    if (allSymbols && allSymbols.length > 0) {
      setTimeout(() => {
        callback(configurationData);
      });
    } else {
      try {
        topXTradableSymbolListApi().then((res: { data: { symbols: string } }) => {
          const tradablesymbolList = res?.data?.symbols;
          localStorage.setItem("tradablesymbolList", JSON.stringify(tradablesymbolList));
          allSymbols = tradablesymbolList;
          callback(configurationData);
        });
      } catch (error) {
        console.log(error);
      }
    }
  },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (arg0: {
      name: any;
      description: string;
      ticker: any;
      exchange: string;
      listed_exchange: string;
      type: string;
      timezone: string;
      session: string;
      minmov: number;
      pricescale: number;
      has_intraday: boolean;
      has_daily: boolean;
      has_weekly_and_monthly: boolean;
      currency_code: string;
    }) => void,
    onResolveErrorCallback: (arg0: string) => void,
    _extension: any
  ) => {
    const comp = symbolName.split(":");
    symbolName = (comp.length > 1 ? comp[1] : symbolName).toUpperCase();
    if (symbolName) {
      onSymbolResolvedCallback({
        name: symbolName,
        description: symbolName.replace("USDT", "") + " / " + "USDT",
        ticker: symbolName,
        exchange: "Density",
        listed_exchange: "Density",
        type: "crypto",
        timezone: "UTC",
        session: "24x7",
        minmov: 1,
        pricescale: pricescale(symbolName),
        has_intraday: true,
        has_daily: true,
        has_weekly_and_monthly: true,
        currency_code: "USDT"
      });
      return;
    }
    onResolveErrorCallback("not Found");
  },

  getBars: (
    symbolInfo: any,
    resolution: string | number,
    periodParams: { from: any; to: any },
    onHistoryCallback: (
      arg0: {
        time: any;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
      }[],
      arg1: { noData: boolean }
    ) => void,
    onErrorCallback: (arg0: string) => void
  ) => {
    let { from, to } = periodParams;
    const interval = tvIntervals[resolution];
    if (!interval) onErrorCallback("Invalid Interval");
    from *= 1000;
    to *= 1000;
    getKlines(from, to, symbolInfo, interval)
      .then((res) => {
        if (res.length === 0) {
          onHistoryCallback([], { noData: true });
        } else {
          onHistoryCallback(res, { noData: false });
        }
      })
      .catch(() => onErrorCallback(`Error in 'getKlines' func`));
  },

  subscribeBars: (
    symbolInfo: { full_name: any },
    resolution: any,
    onRealtimeCallback: (arg0: { time: any; close: number; open: number; high: number; low: number; volume: number; closeTime: any; openTime: any }) => void,
    subscriberUID: string,
    onResetCacheNeededCallback: any
  ) => {
    subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback, lastBarsCache.get(symbolInfo.full_name));
  },

  unsubscribeBars: (subscriberUID: string) => {
    unsubscribeFromStream(subscriberUID);
  }
};

export default dataFeed;
