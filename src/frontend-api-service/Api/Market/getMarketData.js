import { GET_ECONOMIC_CALENDER_DATA, GET_MARKET_NEWS } from "@/frontend-api-service/URI";
import axiosWithApiServer from "@/frontend-api-service/Utils/axiosHelpers/axiosWithApiServer";
import { Format } from "@/helpers";

export const getMarketNewsApi = ({ topic = "" }, setloader) => {
  const url = Format(GET_MARKET_NEWS.url, topic);
  return axiosWithApiServer({ url, method: GET_MARKET_NEWS.reqType })
    .then((res) => {
      setloader(true);
      return res.data ?? [];
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.details);
    });
};

export const getEconomicCalenderApi = ({ from = "", to = "", size = 5, page = 1 }) => {
  const url = Format(GET_ECONOMIC_CALENDER_DATA.url, from, to, size, page);
  return axiosWithApiServer({ url, method: GET_ECONOMIC_CALENDER_DATA.reqType })
    .then((res) => {
      return res.data ?? [];
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.details);
    });
};
