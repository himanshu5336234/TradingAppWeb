import { useEffect, useState } from "react";
import { getDownloadHistoryApi, requestDownLoadHistory } from "@/frontend-api-service/Api/DownloadHistory/DownloadHistory";

const usePollingServiceForDownloadHistory = () => {
  const [loaderData, setLoaderData] = useState({
    status: "",
    id: null,
    isLoadingOpen: false,
    isFailedOpen: false
  });
  const { id } = loaderData;
  const getDownloadID = ({ historyType, startTime, endTime }) => {
    // call Api
    switch (historyType) {
      case "Order History":
        requestDownLoadHistory({
          startTime,
          endTime,
          actionType: "ORDER_HISTORY"
        }).then(({ data, status }) => {
          if (status === 200) {
            setLoaderData({
              ...loaderData,
              isLoadingOpen: true,
              isFailedOpen: false,
              id: data.fileID,
              status: "LOADING"
            });
          } else {
            setLoaderData({
              ...loaderData,
              id: "",
              isFailedOpen: true,
              isLoadingOpen: false,
              status: "FAILED"
            });
          }
        });
        break;
      case "P&L History":
        requestDownLoadHistory({
          startTime,
          endTime,
          actionType: "PNL_HISTORY"
        }).then(({ data, status }) => {
          if (status === 200) {
            setLoaderData({
              ...loaderData,
              isLoadingOpen: true,
              isFailedOpen: false,
              id: data.fileID,
              status: "LOADING"
            });
          } else {
            setLoaderData({
              ...loaderData,
              id: "",
              isFailedOpen: true,
              isLoadingOpen: false,
              status: "FAILED"
            });
          }
        });
        break;
      case "Portfolio_PNL":
        requestDownLoadHistory({
          startTime,
          endTime,
          actionType: "DAILY_PNL_HISTORY"
        }).then(({ data, status }) => {
          if (status === 200) {
            setLoaderData({
              ...loaderData,
              isLoadingOpen: true,
              isFailedOpen: false,
              id: data.fileID,
              status: "LOADING"
            });
          } else {
            setLoaderData({
              ...loaderData,
              id: "",
              isFailedOpen: true,
              isLoadingOpen: false,
              status: "FAILED"
            });
          }
        });
        break;
      case "Income History":
        requestDownLoadHistory({
          startTime,
          endTime,
          actionType: "INCOME_HISTORY"
        }).then(({ data, status }) => {
          if (status === 200) {
            setLoaderData({
              ...loaderData,
              isLoadingOpen: true,
              isFailedOpen: false,
              id: data.fileID,
              status: "LOADING"
            });
          } else {
            setLoaderData({
              ...loaderData,
              id: "",
              isFailedOpen: true,
              isLoadingOpen: false,
              status: "FAILED"
            });
          }
        });
        break;
      case "Transaction History":
        requestDownLoadHistory({
          startTime,
          endTime,
          actionType: "FIAT_HISTORY"
        }).then(({ data, status }) => {
          if (status === 200) {
            setLoaderData({
              ...loaderData,
              isLoadingOpen: true,
              isFailedOpen: false,
              id: data.fileID,
              status: "LOADING"
            });
          } else {
            setLoaderData({
              ...loaderData,
              id: "",
              isFailedOpen: true,
              isLoadingOpen: false,
              status: "FAILED"
            });
          }
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    let interval = null;
    let pullCount = 0;

    if (id && loaderData.isLoadingOpen) {
      interval = setInterval(function () {
        pullCount += 1;
        if (pullCount <= 8) {
          getDownloadHistoryApi(id)
            .then((res) => {
              if (res.data.link) {
                setLoaderData({
                  ...loaderData,
                  status: "SUCCESS",
                  isLoadingOpen: false,
                  isFailedOpen: false
                });
                window.location.replace(res.data.link);
                clearInterval(interval);
              } else {
                setLoaderData({
                  ...loaderData,
                  status: "LOADING",
                  isLoadingOpen: true,
                  isFailedOpen: false
                });
              }
            })
            // eslint-disable-next-line n/handle-callback-err
            .catch((err) => {
              setLoaderData({
                ...loaderData,
                isLoadingOpen: false,
                isFailedOpen: true,
                status: "FAILED"
              });
              clearInterval(interval);
            });
        } else {
          setLoaderData({
            ...loaderData,
            isLoadingOpen: false,
            isFailedOpen: true,
            status: "FAILED"
          });
          clearInterval(interval);
        }
      }, 2000);
    } else if (interval && loaderData.isLoadingOpen) {
      clearInterval(interval);
    }
  }, [id, loaderData.isLoadingOpen]);

  return {
    loaderData,
    getDownloadID,
    setLoaderData
  };
};

export default usePollingServiceForDownloadHistory;
