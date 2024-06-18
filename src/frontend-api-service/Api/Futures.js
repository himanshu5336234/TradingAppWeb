/* eslint-disable no-unused-vars */
import {
  POSITION_RISK,
  CHANGE_PASSWORD,
  UPDATE_PROFILE,
  SET_LEVERAGE,
  FETCH_LEVERAGE,
  SET_MARGIN,
  GET_PROFILE,
  UPLOAD_IMAGE,
  GET_FUTURES_ACCOUNT_DETAILS,
  GET_SPOT_ACCOUNT_DETAILS,
  OPEN_ORDERS,
  ORDER_HISTORY,
  TRADE_HISTORY,
  TRANSACTION_HISTORY,
  AVAILABLE_BALANCE,
  ORDER_BOOK,
  GET_24HR_TICKER,
  MARKET_TRADES,
  // GET_OPEN_INTEREST,
  GET_SYMBOL_LIST,
  USER_TRADES,
  LEVERAGE_BRACKET,
  POST_METADATA,
  GET_METADATA,
  GET_TOP_X_TRADABLE_SYMBOL_LIST,
  PLACE_ORDER,
  CANCEL_ORDER,
  ADD_REMOVE_MARGIN,
  CLOSE_ALL_POSITIONS,
  PORTFOLIO_STATISTICS_YESTERDAY,
  CURRENT_STATUS,
  TICKER_SNAPSHOT,
  ALL_ORDER_HISTORY,
  PLACE_ORDER_LIMIT,
  API_ORDER_DETAILS,
  CREATE_OTOCO_ORDER,
  GET_OTOCO_ORDER_DETAILS,
  CREATE_OCO_ORDER,
  GET_FUTURES_POSITION,
  FETCH_ALL_OPEN_ORDERS,
  SET_PROFILE,
  CLOSE_ORDER,
  GET_MARGIN_TYPE,
  CHANGE_MARGIN_TYPE,
  TRADE_ID_DATA,
  QUICK_ORDER,
  GET_STRATEGY_ORDER_DATA,
  PLACE_STRATEGY_ORDER,
  CANCEL_ALL_STRATEGY_ORDER,
  GET_STRATEGY_ORDER_DATA_BY_ID,
  UPDATE_STRATEGY_ORDER,
  CANCEL_STRATEGY_ORDER_BY_ID,
  GET_ORDER_DETAILS_BY_ID
} from "../URI";

import { Format } from "../../helpers/String";
import axiosWithApiServer from "../Utils/axiosHelpers/axiosWithApiServer";
import axiosWithBinanceServer from "../Utils/axiosHelpers/axiosWithBinanceServer";
import { symbol } from "prop-types";

export const positionRiskApi = (symbol) => {
  const url = Format(POSITION_RISK.url, symbol);
  return axiosWithApiServer({ url, method: POSITION_RISK.reqType });
};

export const fetchLeverageApi = (symbol) => {
  let url = "";
  if (symbol) {
    url = `${FETCH_LEVERAGE.url}?symbol=${symbol}`;
  } else {
    url = `${FETCH_LEVERAGE.url}`;
  }

  return axiosWithApiServer({ url, method: FETCH_LEVERAGE.reqType });
};

export const changePasswordApi = (passwordCredentials) => {
  const url = Format(CHANGE_PASSWORD.url);
  return axiosWithApiServer({
    url,
    method: CHANGE_PASSWORD.reqType,
    body: passwordCredentials
  });
};

export const updateProfileApi = (profileDetails) => {
  const url = Format(UPDATE_PROFILE.url);
  return axiosWithApiServer({
    url,
    method: UPDATE_PROFILE.reqType,
    body: profileDetails
  });
};

export const getProfileApi = () => {
  const url = Format(GET_PROFILE.url);
  return axiosWithApiServer({ url, method: GET_PROFILE.reqType });
};

export const setProfileApi = (payload) => {
  const url = Format(SET_PROFILE.url);
  return axiosWithApiServer({
    url,
    method: SET_PROFILE.reqType,
    body: payload
  });
};

export const uploadImageApi = (imageData) => {
  const url = Format(UPLOAD_IMAGE.url);
  const headers = { "Content-Type": "multipart/form-data" };
  const isMultiPartData = true;
  return axiosWithApiServer({
    url,
    method: UPLOAD_IMAGE.reqType,
    body: imageData,
    headers,
    isMultiPartData
  });
};

export const setLeverageApi = (symbol, leverage) => {
  const url = Format(SET_LEVERAGE.url, symbol, leverage);
  return axiosWithApiServer({
    url,
    method: SET_LEVERAGE.reqType,
    body: JSON.stringify({ symbol, leverage })
  });
};

export const fetchAllOpenOrdersApi = ({ status }) => {
  const url = Format(FETCH_ALL_OPEN_ORDERS.url, 1212, status);
  return axiosWithApiServer({ url, method: FETCH_ALL_OPEN_ORDERS.reqType });
};

export const setMarginApi = (symbol, marginType) => {
  const url = Format(SET_MARGIN.url, symbol, marginType);
  return axiosWithApiServer({ url, method: SET_MARGIN.reqType });
};

export const getFuturesAccountDetailsApi = () => {
  const url = Format(GET_FUTURES_ACCOUNT_DETAILS.url);
  return axiosWithApiServer({
    url,
    method: GET_FUTURES_ACCOUNT_DETAILS.reqType
  });
};

export const getFuturesPosition = () => {
  const url = Format(GET_FUTURES_POSITION.url);
  return axiosWithApiServer({
    url,
    method: GET_FUTURES_POSITION.reqType
  });
};
export const getSpotAccountDetailsApi = () => {
  const url = Format(GET_SPOT_ACCOUNT_DETAILS.url);
  return axiosWithApiServer({ url, method: GET_SPOT_ACCOUNT_DETAILS.reqType });
};

export const openOrdersApi = (symbol) => {
  const url = OPEN_ORDERS.url;
  return axiosWithApiServer({
    url,
    method: OPEN_ORDERS.reqType,
    body: JSON.stringify({ Symbol: symbol })
  });
};

export const orderHistoryApi = (symbol) => {
  const url = Format(ORDER_HISTORY.url, symbol);
  return axiosWithApiServer({ url, method: ORDER_HISTORY.reqType });
};

export const allOrderHistoryApi = () => {
  const url = Format(ALL_ORDER_HISTORY.url);
  return axiosWithApiServer({ url, method: ALL_ORDER_HISTORY.reqType });
};

export const tradeHistoryApi = (symbol) => {
  const url = Format(TRADE_HISTORY.url);
  return axiosWithApiServer({ url, method: TRADE_HISTORY.reqType });
};

export const getfuturesTransactionhistory = (payload) => {
  const { incomeType, symbol, size, page, startTime, endTime } = payload;
  let url = Format(TRANSACTION_HISTORY.url, incomeType, symbol, size, page);
  if (endTime) {
    url += `&endTime=${endTime}`;
  }
  if (startTime) {
    url += `&startTime=${startTime}`;
  }
  return axiosWithApiServer({
    url: `${url}`,
    method: TRANSACTION_HISTORY.reqType
  });
};
// export const openInterestApi = (symbol) => {
//   const url = Format(GET_OPEN_INTEREST.url, symbol.toLowerCase());
//   return axiosWithBinanceServer({ url, method: GET_OPEN_INTEREST.reqType });
// };

export const tradeIdDataApi = (tradeID) => {
  const url = Format(TRADE_ID_DATA.url, tradeID);
  return axiosWithApiServer({ url, method: TRADE_ID_DATA.reqType });
};

export const _24hrTicker = (symbol) => {
  const url = Format(GET_24HR_TICKER.url, symbol.toLowerCase());
  return axiosWithBinanceServer({ url, method: GET_24HR_TICKER.reqType });
};

export const symbolListApi = () => {
  const url = Format(GET_SYMBOL_LIST.url);
  return axiosWithBinanceServer({ url, method: GET_SYMBOL_LIST.reqType });
};

export const topXTradableSymbolListApi = () => {
  const url = Format(GET_TOP_X_TRADABLE_SYMBOL_LIST.url);

  return axiosWithApiServer({
    url,
    method: GET_TOP_X_TRADABLE_SYMBOL_LIST.reqType
  });
};

export const get24hrPriceChange = (symbol) => {
  const url = Format(TICKER_SNAPSHOT.url, symbol);
  return axiosWithApiServer({ url, method: TICKER_SNAPSHOT.reqType });
};

export const availableBalanceApi = () => {
  const url = Format(AVAILABLE_BALANCE.url);
  return axiosWithApiServer({ url, method: AVAILABLE_BALANCE.reqType });
};

export const orderBookApi = (symbol, limit) => {
  const url = Format(ORDER_BOOK.url, symbol, limit);
  return axiosWithBinanceServer({ url, method: ORDER_BOOK.reqType });
};

export const tradesApi = (symbol) => {
  const url = Format(MARKET_TRADES.url, symbol);
  return axiosWithBinanceServer({ url, method: MARKET_TRADES.reqType });
};

export const userTradesApi = (symbol) => {
  const url = Format(USER_TRADES.url, symbol);
  return axiosWithApiServer({ url, method: USER_TRADES.reqType });
};

export const getLeverageBracketApi = () => {
  const url = Format(LEVERAGE_BRACKET.url);
  return axiosWithApiServer({ url, method: LEVERAGE_BRACKET.reqType });
};

export const postMetaDataApi = (content) => {
  const url = Format(POST_METADATA.url);
  return axiosWithApiServer({
    url,
    method: POST_METADATA.reqType,
    body: content,
    headers: "rid=anti-csrf"
  });
};

export const getMetaDataApi = () => {
  const url = GET_METADATA.url;
  return axiosWithApiServer({ url, method: GET_METADATA.reqType });
};

export const createOrder = (payload) => {
  const url = PLACE_ORDER.url;
  return axiosWithApiServer({
    url,
    method: PLACE_ORDER.reqType,
    body: JSON.stringify(payload)
  });
};

export const closePositionApi = ({ symbol }) => {
  const url = CLOSE_ORDER.url + "/" + symbol;
  return axiosWithApiServer({
    url,
    method: CLOSE_ORDER.reqType
  });
};
export const createOrderLimit = (symbol, side, type, quantity, price) => {
  const url = Format(PLACE_ORDER_LIMIT.url, symbol, side, type, quantity, price);
  return axiosWithApiServer({ url, method: PLACE_ORDER.reqType });
};

export const cancelOrderApi = (orderId) => {
  const url = Format(CANCEL_ORDER.url, orderId);
  return axiosWithApiServer({
    url,
    method: CANCEL_ORDER.reqType
  });
};

export const addRemoveMarginApi = (payload) => {
  const url = Format(ADD_REMOVE_MARGIN.url);
  return axiosWithApiServer({
    url,
    method: ADD_REMOVE_MARGIN.reqType,
    body: JSON.stringify(payload)
  });
};

export const closeAllActivePositions = () => {
  const url = CLOSE_ALL_POSITIONS.url;
  return axiosWithApiServer({ url, method: CLOSE_ALL_POSITIONS.reqType });
};

export const fetchPortfolioStatisticsYesterdayApi = (startTime, endTime) => {
  const url = Format(PORTFOLIO_STATISTICS_YESTERDAY.url, startTime, endTime);
  return axiosWithApiServer({
    url,
    method: PORTFOLIO_STATISTICS_YESTERDAY.reqType
  });
};

export const fetchCurrentStatusApi = () => {
  const url = Format(CURRENT_STATUS.url);
  return axiosWithApiServer({ url, method: CURRENT_STATUS.reqType });
};

export const fetchOrderDetailsByClientId = (clientId) => {
  const url = Format(API_ORDER_DETAILS.url, clientId);
  return axiosWithApiServer({ url, method: API_ORDER_DETAILS.reqType });
};

export const createOTOCOOrder = (parentOrders, childOrders) => {
  const url = Format(CREATE_OTOCO_ORDER.url, parentOrders, childOrders);
  return axiosWithApiServer({ url, method: CREATE_OTOCO_ORDER.reqType });
};

export const createOCOOrder = (childOrders) => {
  const url = Format(CREATE_OCO_ORDER.url, childOrders);
  return axiosWithApiServer({ url, method: CREATE_OCO_ORDER.reqType });
};

export const getOTOCOOrderDetails = (symbol, orderId) => {
  const url = Format(GET_OTOCO_ORDER_DETAILS.url, symbol, orderId);
  return axiosWithApiServer({ url, method: GET_OTOCO_ORDER_DETAILS.reqType });
};

export const getMarginTypeApi = (symbol) => {
  const url = Format(GET_MARGIN_TYPE.url, symbol);
  return axiosWithApiServer({ url, method: GET_MARGIN_TYPE.reqType });
};

export const changeMarginTypeApi = (payload) => {
  const url = Format(CHANGE_MARGIN_TYPE.url);
  return axiosWithApiServer({
    url,
    method: CHANGE_MARGIN_TYPE.reqType,
    body: JSON.stringify(payload)
  });
};

export const getQuickOrderDataApi = (symbol = "") => {
  const url = Format(QUICK_ORDER.url, symbol);
  return axiosWithBinanceServer({
    url,
    method: QUICK_ORDER.reqType
  });
};

export const getStrategyOrderDataApi = (symbol) => {
  const url = Format(GET_STRATEGY_ORDER_DATA.url, symbol);
  return axiosWithApiServer({ url, method: GET_STRATEGY_ORDER_DATA.reqType });
};

export const placeOCOOrderApi = (payload) => {
  const url = Format(PLACE_STRATEGY_ORDER.url);
  return axiosWithApiServer({
    url,
    method: PLACE_STRATEGY_ORDER.reqType,
    body: JSON.stringify(payload)
  });
};

export const cancelAllStrategyOrdersApi = (symbol) => {
  const url = Format(CANCEL_ALL_STRATEGY_ORDER.url);
  return axiosWithApiServer({ url, method: CANCEL_ALL_STRATEGY_ORDER.reqType, body: JSON.stringify({ idsUuid: symbol, type: "CANCEL_ORDER_TYPE_IDS" }) });
};
export const getStrategyOrderDataByIDApi = (ID) => {
  const url = Format(GET_STRATEGY_ORDER_DATA_BY_ID.url, ID);
  return axiosWithApiServer({
    url,
    method: GET_STRATEGY_ORDER_DATA_BY_ID.reqType
  });
};
export const updateOCOOrder = (payload) => {
  const url = Format(UPDATE_STRATEGY_ORDER.url);
  return axiosWithApiServer({
    url,
    method: UPDATE_STRATEGY_ORDER.reqType,
    body: JSON.stringify(payload)
  });
};

export const deleteStrategyOrderByID = (symbol, orderID) => {
  const url = Format(CANCEL_STRATEGY_ORDER_BY_ID.url, symbol, orderID);
  return axiosWithApiServer({
    url,
    method: CANCEL_STRATEGY_ORDER_BY_ID.reqType
  });
};

export const fetchOrderDetailsByID = (payload) => {
  const url = Format(GET_ORDER_DETAILS_BY_ID.url);
  return axiosWithApiServer({
    url: `${url}/${payload.toString()}`,
    method: GET_ORDER_DETAILS_BY_ID.reqType
  });
};
