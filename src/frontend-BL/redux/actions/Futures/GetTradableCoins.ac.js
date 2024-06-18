/* eslint-disable no-unused-vars */
import { get24hrPriceChange, topXTradableSymbolListApi } from "../../../../frontend-api-service/Api";
import { SET_ALL_TICKER_DATA, SET_TRADABLE_SYMBOL_LIST_FAIL, SET_TRADABLE_SYMBOL_LIST_SUCCESS } from "../../../redux/constants/Constants";
export const getTradableCoins = () => (dispatch) => {
  const list = JSON.parse(localStorage.getItem("tradablesymbolList")) ?? [];
  dispatch({
    type: SET_TRADABLE_SYMBOL_LIST_SUCCESS,
    payload: {
      tradablesymbolList: list
    }
  });
  topXTradableSymbolListApi()
    .then((res) => {
      const tradablesymbolList = res?.data?.symbols;
      localStorage.setItem("tradablesymbolList", JSON.stringify(tradablesymbolList));
      dispatch({
        type: SET_TRADABLE_SYMBOL_LIST_SUCCESS,
        payload: {
          tradablesymbolList
        }
      });
    })
    .catch((error) => {
      console.log(error, "errorerror");
      dispatch({
        type: SET_TRADABLE_SYMBOL_LIST_SUCCESS,
        payload: {
          tradablesymbolList: JSON.parse(localStorage.getItem("tradablesymbolList"))
        }
      });
      dispatch({
        type: SET_TRADABLE_SYMBOL_LIST_FAIL,
        payload: error.toString()
      });
    });
  get24hrPriceChange().then((response) => {
    const res = response?.data?.data;
    for (let i = 0; i < res.length; i++) {
      const dispatchParams = {
        symbol: res[i].symbol,
        percentage: res[i].priceChangePercent,
        lp: res[i].lastPrice,
        vol: res[i].quoteVolume,
        open: res[i].openPrice,
        high: res[i].highPrice,
        low: res[i].lowPrice,
        numberofTrades: res[i].count,
        previousLTP: (res[i] && res[i].lastPrice) || "--",
        priceChange: res[i].priceChange,
        colorIndicator: 0,
        markPrice: res[i].markPrice,
        indexPrice: res[i].indexPrice
      };
      dispatch({
        type: SET_ALL_TICKER_DATA,
        payload: dispatchParams
      });
    }
  });
};
