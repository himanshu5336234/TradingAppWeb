import { BASE_URL } from "../../Base/index";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL().densityBaseUrl
});

const axiosWithBinanceServerSpot = ({ url, method, body = null, headers = null }) => {
  return axiosInstance[method](url, JSON.parse(headers), JSON.parse(body));
};

export default axiosWithBinanceServerSpot;
