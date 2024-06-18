// import { UPDATE_DATE_RANGE_SUCCESS, RESET_DATE_RANGE_SUCCESS } from "redux/constants/Constants";

// import { AllSYMBOLS } from "@/frontend-BL/services/BinanceWebSocketService/Constants";

import { OPEN_SIDE_MENU, SET_ALL_TICKER_DATA } from "../../../redux/constants/Constants";
import { get24hrPriceChange } from "@/frontend-api-service/Api";
// import { AllSYMBOLS } from "services/BinanceWebSocketService/Constants";

export const OpenDrawer = () => (dispatch) => {
  dispatch({ type: OPEN_SIDE_MENU, payload: true });
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

export const CloseDrawer = () => (dispatch) => {
  dispatch({ type: OPEN_SIDE_MENU, payload: false });
};
