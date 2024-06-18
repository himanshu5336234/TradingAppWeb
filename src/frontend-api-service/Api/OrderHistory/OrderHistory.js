import { FETCH_ORDER_HISTORY, FETCH_TRADES_BASED_ON_ID } from "../../URI";
import { Format } from "../../../helpers";
import axiosWithApiServer from "@/frontend-api-service/Utils/axiosHelpers/axiosWithApiServer";
import { getOrderSide, getOrderStatus, getOrderType, getReduceOnly } from "@/helpers/orderHistoryApiParams";

export const fetchOrderHistory = ({ startTime = "", endTime = "", symbol = "", type = "", side = "", reduceOnly = "", status = "", start = "", size = "" }) => {
  symbol = symbol === "Symbol" ? "" : symbol;
  let ForcedOrder = type === "Liquidation" || type === "ADL" ? true : false;
  type = getOrderType(type);
  side = getOrderSide(side);
  reduceOnly = getReduceOnly(reduceOnly);
  status = getOrderStatus(status);

  let url = Format(FETCH_ORDER_HISTORY.url, 121212, startTime, endTime, symbol, type, side, reduceOnly, size, start);
  if (ForcedOrder) {
    url += `&forcedOrder=true`;
  }
  if (status) {
    url += `&status=${status}`;
  }
  return axiosWithApiServer({ url, method: FETCH_ORDER_HISTORY.reqType })
    .then((res) => {
      return res.data ?? [];
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.details);
    });
};
export const fetchTradesBasedOnOrderId = (orderId) => {
  let url = Format(FETCH_TRADES_BASED_ON_ID.url, orderId);
  return axiosWithApiServer({ url, method: FETCH_TRADES_BASED_ON_ID.reqType })
    .then((res) => {
      return res.data ?? [];
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.details);
    });
};
