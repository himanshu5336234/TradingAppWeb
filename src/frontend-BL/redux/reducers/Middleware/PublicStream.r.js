/* eslint-disable no-case-declarations */
import { SET_LTP_DATA, SET_MARK_PRICE_DATA, SET_TICKER_DATA, SET_DEPTH_UPDATE, SET_KLINES_DATA, UPDATE_KLINES_DATA } from "../../constants/Constants";

const initialState = {
  ltp: [],
  markPrice: [],
  ticker: [],
  depth: {},
  klines: {},
  binanceData: {},
  tickerSnapshot: {},
  markPriceSnapshot: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_DEPTH_UPDATE:
      return { ...state, depth: payload };
    case SET_LTP_DATA:
      const ifLtpExist = state.ltp.findIndex((ltp) => ltp.symbol === payload.symbol);
      if (ifLtpExist !== -1 && state.ltp[ifLtpExist].symbol === payload.symbol) {
        return {
          ...state,
          ltp: state.ltp.map((contract) => (contract.symbol === payload.symbol ? payload : contract))
        };
      } else {
        return {
          ...state,
          ltp: [...state.ltp, payload]
        };
      }

    case SET_MARK_PRICE_DATA:
      const ifMarkPriceExist = state.markPrice.findIndex((mp) => mp.symbol === payload.symbol);
      if (ifMarkPriceExist !== -1 && state.markPrice[ifMarkPriceExist].symbol === payload.symbol) {
        return {
          ...state,
          markPrice: [
            ...state.markPrice.slice(0, ifMarkPriceExist),
            {
              ...state.markPrice[ifMarkPriceExist],
              markprice: payload.markprice,
              indexPrice: payload.indexPrice,
              fundingRate: payload.fundingRate,
              countDown: payload.countDown
            },
            ...state.markPrice.slice(ifMarkPriceExist + 1)
          ],
          ltp: [...state.ltp],
          ticker: [...state.ticker],
          klines: { ...state.klines }
        };
      } else {
        return {
          ...state,
          markPrice: [...state.markPrice, payload],
          ltp: [...state.ltp],
          ticker: [...state.ticker]
        };
      }

    case SET_TICKER_DATA:
      const ifTickerExist = state.ticker.findIndex((ticker) => ticker.symbol === payload.symbol);
      if (ifTickerExist !== -1 && state.ticker[ifTickerExist].symbol === payload.symbol) {
        return {
          ...state,
          ticker: [
            ...state.ticker.slice(0, ifTickerExist),
            {
              ...state.ticker[ifTickerExist],
              ltp: payload.ltp,
              change24hHigh: payload.change24hHigh,
              change24hLow: payload.change24hLow,
              volume24h: payload.volume24h,
              countDown: payload.countDown,
              change24h: payload.change24h,
              change24hpercent: payload.change24hpercent
            },
            ...state.ticker.slice(ifTickerExist + 1)
          ],
          ltp: [...state.ltp],
          markPrice: [...state.markPrice]
        };
      } else {
        return {
          ...state,
          ticker: [...state.ticker, payload],
          ltp: [...state.ltp],
          markPrice: [...state.markPrice]
        };
      }

    case SET_KLINES_DATA:
      return {
        ...state,
        klines: payload
      };

    case UPDATE_KLINES_DATA:
      return {
        ...state,
        klines: {}
      };
    case "SET_BINANCE_DATA":
      return {
        ...state,
        binanceData: payload
      };

    case "SET_TICKER_SNAPSHOT":
      return {
        ...state,
        tickerSnapshot: payload
      };

    case "SET_MARKPRICE_SNAPSHOT":
      return {
        ...state,
        markPriceSnapshot: payload
      };

    default:
      return state;
  }
}
