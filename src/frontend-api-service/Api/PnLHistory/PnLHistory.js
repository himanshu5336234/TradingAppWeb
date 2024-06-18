import { FETCH_PNL_HISTORY, FETCH_PNL_TRADES } from "@/frontend-api-service/URI";
import { Format } from "@/helpers";
import axiosWithApiServer from "@/frontend-api-service/Utils/axiosHelpers/axiosWithApiServer";
import { getOrderSide } from "@/helpers/orderHistoryApiParams";
import { useCallback } from "react";

export const fetchPnLHistory = ({ start, size, symbol = "", startTime = "", endTime = "", side = "" }) => {
  symbol = symbol === "Symbol" ? "" : symbol;
  side = getOrderSide(side);

  const url = Format(FETCH_PNL_HISTORY.url, start, size, symbol, startTime, endTime, side);

  return axiosWithApiServer({ url, method: FETCH_PNL_HISTORY.reqType })
    .then((res) => {
      return res.data ?? [];
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.details);
    });
};

export const FETCH_TRADES = (id) => {
  const url = `${FETCH_PNL_TRADES.url}/${id}`;
  return axiosWithApiServer({ url, method: FETCH_PNL_TRADES.reqType })
    .then((res) => {
      return res.data ?? [];
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.details);
    });
};
