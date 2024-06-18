import { REQUEST_TYPE } from "@/frontend-api-service/Base";

export const GET_ALL_LEADERBOARD_INFO_AUTHENTICATED = {
  url: "/v1/leaderboard/leaders?count={0}&filter={1}",
  reqType: REQUEST_TYPE.GET
};

export const GET_ALL_LEADERBOARD_INFO_UNAUTHENTICATED = {
  url: "/v1/leaderboard/leaders-logged-out?count={0}&filter={1}",
  reqType: REQUEST_TYPE.GET
};
export const GET_RANK_BY_TYPE = {
  url: "/v1/leaderboard/rank?type={0}&value={1}&filter={2}",
  reqType: REQUEST_TYPE.GET
};

export const GET_COMPETITION_DETAILS = {
  url: "/v1/leaderboard/competition-data",
  reqType: REQUEST_TYPE.GET
};
