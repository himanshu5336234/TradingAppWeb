import { BASE_URL, GetAppURL } from "../../Base/index";
import { SERVER_DOWN_HELPER } from "../../URI/index";
import axios from "axios";
import { logoutApp } from "../../../frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";

const axiosInstance = axios.create({
  baseURL: BASE_URL().binanceBaseUrl
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status >= 500) {
      window.location.href = `${GetAppURL()}${SERVER_DOWN_HELPER.url}`;
    }
    if (error.status === 401) {
      dispatch({
        type: "DESTROY_SESSION"
      });
    }
  }
);

const axiosWithBinanceServer = ({ url, method, body = null, headers = null }) => {
  return axiosInstance[method](url, JSON.parse(headers), JSON.parse(body));
};

export default axiosWithBinanceServer;
