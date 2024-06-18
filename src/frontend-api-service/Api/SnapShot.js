import { Format } from "@/helpers";
import { GET_LTP_SNAPSHOT, GET_ORDER_BOOK_SNAPSHOT, GET_MARK_PRICE_SANPSHOT } from "../URI";
import axiosWithBinanceServer from "../Utils/axiosHelpers/axiosWithBinanceServer";

export const getMarkPrice = (payload) => {
  const url = Format(GET_MARK_PRICE_SANPSHOT.url, payload);
  return axiosWithBinanceServer({
    url,
    method: GET_MARK_PRICE_SANPSHOT.reqType
  });
};
export const getLastTradedPrice = (payload) => {
  const url = Format(GET_LTP_SNAPSHOT.url, payload);
  return axiosWithBinanceServer({
    url,
    method: GET_LTP_SNAPSHOT.reqType
  });
};
export const getOrderBook = (payload) => {
  const url = Format(GET_ORDER_BOOK_SNAPSHOT.url, payload, 1000);
  return axiosWithBinanceServer({
    url,
    method: GET_ORDER_BOOK_SNAPSHOT.reqType
  });
};

export const getKlinesSnapShot = ({ symbol, interval, from, to, limit }) => {
  const url = `/fapi/v1/continuousKlines?pair=${symbol}&contractType=PERPETUAL&interval=${interval}${from ? `&startTime=${from}` : ""}${to ? `&endTime=${to}` : ""}${limit ? `&limit=${limit}` : ""}`;
  return axiosWithBinanceServer({
    url,
    method: GET_ORDER_BOOK_SNAPSHOT.reqType
  });
};
