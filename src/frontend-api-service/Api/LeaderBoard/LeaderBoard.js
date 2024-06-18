import { Format } from "@/helpers/String";
import axiosWithApiServer from "API/Utils/axiosHelpers/axiosWithApiServer";
import { GET_ALL_LEADERBOARD_INFO_AUTHENTICATED, GET_ALL_LEADERBOARD_INFO_UNAUTHENTICATED, GET_COMPETITION_DETAILS, GET_RANK_BY_TYPE } from "./URI";

export const GET_LEADERBOARD_AUTHENTICATED_DETAILS = (payload) => {
  const url = Format(GET_ALL_LEADERBOARD_INFO_AUTHENTICATED.url, payload.count, payload.filter);
  return axiosWithApiServer({
    url,
    method: GET_ALL_LEADERBOARD_INFO_AUTHENTICATED.reqType
  });
};

export const GET_LEADERBOARD_UNAUTHENTICATED_DETAILS = (payload) => {
  const url = Format(GET_ALL_LEADERBOARD_INFO_UNAUTHENTICATED.url, payload.count, payload.filter);
  return axiosWithApiServer({
    url,
    method: GET_ALL_LEADERBOARD_INFO_UNAUTHENTICATED.reqType
  });
};

export const GET_RANK_BY_NICK_NAME = (payload) => {
  const url = Format(GET_RANK_BY_TYPE.url, "nick_name", payload.name, payload.filter);
  return axiosWithApiServer({ url, method: GET_RANK_BY_TYPE.reqType });
};

export const GET_COMPETION_INFO = () => {
  const url = GET_COMPETITION_DETAILS.url;
  return axiosWithApiServer({ url, method: GET_COMPETITION_DETAILS.reqType });
};
