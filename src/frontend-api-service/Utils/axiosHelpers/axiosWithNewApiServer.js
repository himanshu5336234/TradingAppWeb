import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://api-dev2.density.exchange"
});

axiosInstance.defaults.headers.common.accept = "*/*";
axiosInstance.defaults.headers.common.rid = "anti-csrf";

const axiosWithNewApiServer = ({ url, method, body = null, headers = null, isMultiPartData = false }) => {
  const requestBody = isMultiPartData === true ? body : JSON.parse(body);
  return axiosInstance[method](url, requestBody, headers);
};

export default axiosWithNewApiServer;
