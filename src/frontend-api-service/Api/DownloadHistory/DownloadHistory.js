import axiosWithApiServer from "@/frontend-api-service/Utils/axiosHelpers/axiosWithApiServer";
import { REQUEST_DOWNLOAD_HISTORY, GET_HISTORY_DOWNLOADLINK } from "@/frontend-api-service/URI";
import { Format } from "../../../helpers/index";

export const getDownloadHistoryApi = (fileID) => {
  const url = Format(GET_HISTORY_DOWNLOADLINK.url, fileID);
  return axiosWithApiServer({ url, method: GET_HISTORY_DOWNLOADLINK.reqType });
};

export const requestDownLoadHistory = (body) => {
  return axiosWithApiServer({
    url: REQUEST_DOWNLOAD_HISTORY.url,
    method: REQUEST_DOWNLOAD_HISTORY.reqType,
    body: JSON.stringify(body)
  });
};
