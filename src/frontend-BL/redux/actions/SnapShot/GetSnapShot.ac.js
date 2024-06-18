import { getLastTradedPrice, getMarkPrice, getOrderBook } from "@/frontend-api-service/Api/SnapShot";

import { SET_MARK_PRICE_DATA, SET_TICKER_DATA } from "../../constants/Constants";

export const getMarkPriceSnapShot = (symbol) => (dispatch) => {
  getMarkPrice(symbol).then((response) => {
    const sData = response.data;
    const markPriceDataModal = {
      symbol: sData.symbol,
      markprice: sData.markPrice,
      indexPrice: sData.indexPrice,
      fundingRate: sData.lastFundingRate,
      countDown: sData.time
    };
    dispatch({
      type: SET_MARK_PRICE_DATA,
      payload: markPriceDataModal
    });
  });
};
export const getLastTradedPriceSnapShot = (symbol) => (dispatch) => {
  getLastTradedPrice(symbol).then((response) => {
    const sData = response.data;
    const ltp = {
      change24hHigh: "",
      change24hLow: "",
      volume24h: "",
      change24h: "",
      change24hpercent: "",
      symbol: sData.symbol,
      ltp: sData.price
    };
    dispatch({ type: SET_TICKER_DATA, payload: ltp });
  });
};

export const getOrderBookSnapShot = (symbol) => (dispatch) => {
  dispatch({
    type: "SET_ORDER_BOOK_LOADING",
    payload: symbol
  });
  getOrderBook(symbol).then((res) => {
    const asks = addTotalSums(findAndDelete(res.data.asks, res.data.asks, "ASKS"));
    const bids = addTotalSums(findAndDelete(res.data.bids, res.data.bids, "BIDS"));
    dispatch({
      type: "SET_ORDER_BOOK_BINANCE",
      payload: { ...res.data, asks, bids, symbol }
    });
  });
};
function findAndDelete(currentLevels, orders, type) {
  if (currentLevels) {
    const index =
      type === "BIDS"
        ? currentLevels.findIndex((item) => Number(item[0]) <= Number(orders[orders.length - 1][0]))
        : currentLevels.findIndex((item) => Number(item[0]) >= Number(orders[orders.length - 1][0]));
    return orders.concat(currentLevels.slice(index + 1));
  }
}
function addTotalSums(orders) {
  let sum = 0;
  return orders.map((item) => {
    sum += Number(item[1]);
    item[2] = sum;
    return item;
  });
}
