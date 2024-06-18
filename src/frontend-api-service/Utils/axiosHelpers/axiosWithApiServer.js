import axios from "axios";
import { BASE_URL } from "../../../frontend-api-service/Base";
import { posthog } from "posthog-js";
import Session from "supertokens-web-js/recipe/session";
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL().densityBaseUrl
});
import { CANCEL_ORDER, CLOSE_ALL_POSITIONS, CLOSE_ORDER } from "../../URI";
import { increaseErrorCount, resetErrorCount } from "../../../frontend-BL/redux/actions/Internal/FallbackHandler.ac";
import configureStore from "../../../frontend-BL/redux/store/configureStore";
import { logoutApp } from "../../../frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";

axiosInstance.defaults.headers.common.accept = "*/*";
axiosInstance.defaults.headers.common.rid = "anti-csrf";

axiosInstance.interceptors.request.use((req) => {
  req.meta = req.meta || {};
  req.meta.requestStartedAt = new Date().getTime();
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    posthog.capture("API_SUCCESS", {
      url: res.config.url,
      requestBody: res.config.data,
      res: { ...res.data, status: res.status },
      event_time: new Date().toUTCString(),
      duration: new Date().getTime() - res.config.meta.requestStartedAt,
      method: res.config.method
    });
    if (res.status >= 200 && res.status < 300 && (res.config.url === CANCEL_ORDER.url || res.config.url === CLOSE_ORDER.url || res.config.url === CLOSE_ALL_POSITIONS.url)) {
      configureStore.dispatch(resetErrorCount());
    }

    return res;
  },
  (error) => {
    posthog.capture("API_FAILURE", {
      url: error.response.config.url,
      requestBody: error.response.config.data,
      res: { ...error.response.data, status: error.response.status },
      event_time: new Date().toUTCString(),
      duration: new Date().getTime() - error.response.config.meta.requestStartedAt,
      method: error.response.config.method
    });

    if (error.response.status >= 400 && (error.response.config.url === CANCEL_ORDER.url || error.response.config.url === CLOSE_ORDER.url || error.response.config.url === CLOSE_ALL_POSITIONS.url)) {
      configureStore.dispatch(increaseErrorCount());
    }
    if (error.response.headers["force-sign-out"] === "true") {
      logoutApp();
    } else {
      return Promise.reject(error);
    }
  }
);

const axiosWithApiServer = ({ url, method, body = null, headers = null, isMultiPartData = false }) => {
  const startTime = new Date();
  const requestBody = isMultiPartData === true ? body : JSON.parse(body);
  return axiosInstance[method](url, requestBody, headers);
};

export default axiosWithApiServer;
