import { GET_PORTFOLIO_PNL_CUMULATIVE, GET_PORTFOLIO_PNL_DAILY, GET_PORTFOLIO_PNL_TOP_PERFORMERS, GET_PORTFOLIO_SUMMARY } from "@/frontend-api-service/URI";
import { Format } from "../../../helpers/index";

import axiosWithApiServer from "../../Utils/axiosHelpers/axiosWithApiServer";
import { GET_PORTFOLIO_COMMISSIONS } from "../../URI";

export const getPortfolioSummary = (payload: { startTime: number; endTime: number }) => {
  const url = Format(GET_PORTFOLIO_SUMMARY.url, payload?.startTime, payload?.endTime);
  return axiosWithApiServer({
    url,
    method: GET_PORTFOLIO_SUMMARY.reqType
  });
};

export const getPortfolioDailyPnl = (payload: { startTime: number; endTime: number }) => {
  const url = Format(GET_PORTFOLIO_PNL_DAILY.url, payload?.startTime, payload?.endTime);
  return axiosWithApiServer({
    url,
    method: GET_PORTFOLIO_PNL_DAILY.reqType
  });
};

export const getPortfolioCummulativePnl = (payload: { startTime: number; endTime: number }) => {
  const url = Format(GET_PORTFOLIO_PNL_CUMULATIVE.url, payload?.startTime, payload?.endTime);
  return axiosWithApiServer({
    url,
    method: GET_PORTFOLIO_PNL_CUMULATIVE.reqType
  });
};

export const getPortfolioTopPerformers = (payload: { startTime: number; endTime: number }) => {
  const url = Format(GET_PORTFOLIO_PNL_TOP_PERFORMERS.url, payload?.startTime, payload?.endTime);
  return axiosWithApiServer({
    url,
    method: GET_PORTFOLIO_PNL_TOP_PERFORMERS.reqType
  });
};
export const getPortfolioCommisions = (payload: { startTime: number; endTime: number }) => {
  const url = Format(GET_PORTFOLIO_COMMISSIONS.url, payload?.startTime, payload?.endTime);
  return axiosWithApiServer({
    url,
    method: GET_PORTFOLIO_COMMISSIONS.reqType
  });
};
