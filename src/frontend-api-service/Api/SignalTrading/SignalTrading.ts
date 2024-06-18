import { Format, FormatWithOptionalArguments } from "../../../helpers";
import axiosWithApiServer from "../../Utils/axiosHelpers/axiosWithApiServer";
import {
  GET_ANALYST_LIST,
  BECOME_AN_ANALYST,
  FOLLOW_AN_ANALYST,
  GET_LIST_OF_SIGNALS_FOR_AN_ANALYST,
  UPDATE_SIGNAL_CREATED_BY_AN_ANALYST,
  CREATE_NEW_SIGNAL,
  DELETE_A_SIGNAL,
  UNFOLLOW_AN_ANALYST,
  UPDATE_RISK_FOR_A_FOLLOWER,
  PUBLISH_A_LIVE_SIGNAL,
  GET_OVERALL_SIGNAL_TRADING_STATS_IN_PLATFORM,
  GET_USER_PERSONNA,
  FOLLOWER_PERFORMANCE,
  FOLLOWER_DETAILS,
  GET_LIST_OF_SIGNALS_FOR_FOLLOWERS,
  CANCEL_PUBLISHED_SIGNAL,
  ALL_SIGNALS_OF_AN_ANALAYST_ADMIN,
  DELETE_ANALYST_REQUEST
} from "../../URI";

// Analyst Stimuli
export const getAnalystList = ({
  analystId,
  fromDate,
  status,
  ToDate,
  pageNumber,
  size,
  statsTimeWindow
}: {
  analystId: string;
  fromDate: string;
  status: string;
  ToDate: string;
  pageNumber: number;
  size: number;
  statsTimeWindow: string;
}) => {
  const url = FormatWithOptionalArguments(GET_ANALYST_LIST.url, {
    analystId,
    fromDate,
    status,
    ToDate,
    pageNumber,
    pageSize: size,
    statsTimeWindow
  });
  return axiosWithApiServer({ url, method: GET_ANALYST_LIST.reqType });
};

export const becomeAnAnalyst = () => {
  const url = Format(BECOME_AN_ANALYST.url);
  return axiosWithApiServer({ url, method: BECOME_AN_ANALYST.reqType });
};

export const getSignalListForAnalyst = ({
  endTime,
  analystId,
  orderSide,
  pageNumber,
  pageSize,
  signalId,
  startTime,
  status,
  symbol
}: {
  endTime: string;
  analystId: string;
  orderSide: string;
  pageNumber: number;
  pageSize: number;
  signalId: string;
  startTime: string;
  status: string;
  symbol: string;
}) => {
  const url = FormatWithOptionalArguments(GET_LIST_OF_SIGNALS_FOR_AN_ANALYST.url, {
    endTime,
    analystId,
    orderSide,
    pageNumber,
    pageSize,
    signalId,
    startTime,
    status,
    symbol
  });
  return axiosWithApiServer({
    url,
    method: GET_LIST_OF_SIGNALS_FOR_AN_ANALYST.reqType
  });
};

// Follower Stimuli
export const getSignalListForFollower = ({
  analystId,
  endTime,
  pageNumber,
  pageSize,
  signalId,
  startTime,
  status,
  symbol
}: {
  analystId: string;
  endTime: string;
  pageNumber: number;
  pageSize: number;
  signalId: string;
  startTime: string;
  status: string;
  symbol: string;
}) => {
  const url = FormatWithOptionalArguments(GET_LIST_OF_SIGNALS_FOR_FOLLOWERS.url, {
    analystId,
    endTime,
    pageNumber,
    pageSize,
    signalId,
    startTime,
    status,
    symbol
  });
  return axiosWithApiServer({
    url,
    method: GET_LIST_OF_SIGNALS_FOR_FOLLOWERS.reqType
  });
};

export const followAnAnalyst = (analystDetails: any) => {
  const url = Format(FOLLOW_AN_ANALYST.url);
  return axiosWithApiServer({
    url,
    method: FOLLOW_AN_ANALYST.reqType,
    body: JSON.stringify(analystDetails)
  });
};

export const unfollowAnAnalyst = (analystDetails: any) => {
  const url = Format(UNFOLLOW_AN_ANALYST.url);
  return axiosWithApiServer({
    url,
    method: UNFOLLOW_AN_ANALYST.reqType,
    body: JSON.stringify(analystDetails)
  });
};

export const editRiskForAFollower = (riskDetails: any) => {
  const url = Format(UPDATE_RISK_FOR_A_FOLLOWER.url);
  return axiosWithApiServer({
    url,
    method: UPDATE_RISK_FOR_A_FOLLOWER.reqType,
    body: JSON.stringify(riskDetails)
  });
};

export const followerDetails = (status: string) => {
  const url = Format(FOLLOWER_DETAILS.url, status);
  return axiosWithApiServer({ url, method: FOLLOWER_DETAILS.reqType });
};

// Overall Stats
export const getOverallSignalTradingStatisticsInThePlatform = () => {
  const url = Format(GET_OVERALL_SIGNAL_TRADING_STATS_IN_PLATFORM.url);
  return axiosWithApiServer({
    url,
    method: GET_OVERALL_SIGNAL_TRADING_STATS_IN_PLATFORM.reqType
  });
};

export const getUserPersonnaForSignalTrading = () => {
  const url = Format(GET_USER_PERSONNA.url);
  return axiosWithApiServer({ url, method: GET_USER_PERSONNA.reqType });
};

// Signal Actions
export const createNewSignal = (signalParams: any) => {
  const url = Format(CREATE_NEW_SIGNAL.url);
  return axiosWithApiServer({
    url,
    method: CREATE_NEW_SIGNAL.reqType,
    body: JSON.stringify(signalParams)
  });
};

export const editASignal = (signalParams: any) => {
  const url = Format(UPDATE_SIGNAL_CREATED_BY_AN_ANALYST.url);
  return axiosWithApiServer({
    url,
    method: UPDATE_SIGNAL_CREATED_BY_AN_ANALYST.reqType,
    body: JSON.stringify(signalParams)
  });
};

export const deleteASignal = (signalId: string) => {
  const url = DELETE_A_SIGNAL.url + signalId;
  return axiosWithApiServer({ url, method: DELETE_A_SIGNAL.reqType });
};

export const publishALiveSignal = (signalParams: any) => {
  const url = Format(PUBLISH_A_LIVE_SIGNAL.url);
  return axiosWithApiServer({
    url,
    method: PUBLISH_A_LIVE_SIGNAL.reqType,
    body: JSON.stringify(signalParams)
  });
};

// Follower/Analyst Performance Stats
export const getFollowerPerformance = ({ analystId, startTime, endTime, statusTimeWindow }: { analystId: string; startTime: string; endTime: string; statusTimeWindow: string }) => {
  const url = FormatWithOptionalArguments(FOLLOWER_PERFORMANCE.url, {
    analystId,
    startTime,
    endTime,
    statusTimeWindow
  });
  return axiosWithApiServer({ url, method: FOLLOWER_PERFORMANCE.reqType });
};

export const cancelPublishedSignal = (body: Object) => {
  return axiosWithApiServer({
    url: CANCEL_PUBLISHED_SIGNAL.url,
    method: CANCEL_PUBLISHED_SIGNAL.reqType,
    body: JSON.stringify(body)
  });
};
export const getAlltheSignalsAsAdmin = ({ analystId, pageNumber, pageSize }: { analystId: string; pageNumber: number; pageSize: number }) => {
  const url = FormatWithOptionalArguments(ALL_SIGNALS_OF_AN_ANALAYST_ADMIN.url, { analystId, pageNumber, pageSize });
  return axiosWithApiServer({
    url,
    method: ALL_SIGNALS_OF_AN_ANALAYST_ADMIN.reqType
  });
};

export const deleteAnalystRequest = () => {
  const url = Format(DELETE_ANALYST_REQUEST.url);
  return axiosWithApiServer({ url, method: DELETE_ANALYST_REQUEST.reqType });
};
