import { GENERATE_WS_TOKEN } from "../URI";
import { Format } from "../../helpers/String";
import axiosWithApiServer from "../Utils/axiosHelpers/axiosWithApiServer";
import { BASE_URL } from "../Base";

export const initiateAuthenticatedWebSocketConnection = () => {
  const url = GENERATE_WS_TOKEN.url;
  return axiosWithApiServer({ url, method: GENERATE_WS_TOKEN.reqType });
};

export const generateAuthenticatedWebSocketUrl = (token) => {
  const url = BASE_URL().densityWsBase;
  return Format(url, token);
};
