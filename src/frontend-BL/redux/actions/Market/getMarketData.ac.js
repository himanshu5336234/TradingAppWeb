import { getEconomicCalenderApi, getMarketNewsApi } from "@/frontend-api-service/Api/Market/getMarketData";

export const FETCH_MARKET_NEWS =
  ({ topic, setloader }) =>
  (dispatch) => {
    return getMarketNewsApi({ topic }, setloader);
  };

export const FETCH_ECONOMIC_CALENDER_DATA = (data) => (dispatch) => {
  return getEconomicCalenderApi(data);
};
