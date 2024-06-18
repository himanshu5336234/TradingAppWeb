import { REQUEST_TYPE } from "../../Base/index";

export const GET_WATCH_LIST = {
  url: "/v1/watchlists",
  reqType: REQUEST_TYPE.GET
};

export const SET_WATCH_LIST = {
  url: "/v1/watchlists/extend",
  reqType: REQUEST_TYPE.PATCH
};

export const REMOVE_WATCH_LIST = {
  url: "/v1/watchlists/shrink",
  reqType: REQUEST_TYPE.PATCH
};
