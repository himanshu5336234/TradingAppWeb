import axiosWithApiServer from "@/frontend-api-service/Utils/axiosHelpers/axiosWithApiServer";
import { Format } from "../../../helpers/index";
import { GET_WATCH_LIST, REMOVE_WATCH_LIST, SET_WATCH_LIST } from "./URL";

export const getWatchList = () => {
  const url = Format(GET_WATCH_LIST.url);
  return axiosWithApiServer({
    url,
    method: GET_WATCH_LIST.reqType
  });
};

export const setWatchList = (payload) => {
  const url = Format(SET_WATCH_LIST.url);
  return axiosWithApiServer({
    url,
    method: SET_WATCH_LIST.reqType,
    body: payload
  });
};

export const removeWatchList = (payload) => {
  const url = Format(REMOVE_WATCH_LIST.url);
  return axiosWithApiServer({
    url,
    method: REMOVE_WATCH_LIST.reqType,
    body: payload
  });
};
