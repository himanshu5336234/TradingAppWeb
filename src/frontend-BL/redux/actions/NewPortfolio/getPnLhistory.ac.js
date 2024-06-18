import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { fetchPnLHistory } from "@/frontend-api-service/Api/PnLHistory/PnLHistory";
export const FETCH_PNL_HISTORY = (data) => (dispatch) => {
  return fetchPnLHistory(data)
    .then((successResponse) => {
      const { Data, Total } = successResponse;
      // const requiredData = Data.map((order) => {
      //   return {
      //     entrySide: order?.DataPnl?.Side === "BUY" ? "LONG" : "SHORT",
      //     entryTime: order?.DataPnl?.EntryTime,
      //     exitTime: order?.DataPnl?.ExitTime,
      //     entryPrice: order?.DataPnl?.EntryPrice.toFixed(5),
      //     exitPrice: order?.DataPnl?.ExitPrice.toFixed(5),
      //     symbol: order?.DataPnl?.Symbol,
      //     feePaid: order?.DataPnl?.Fee?.toFixed(5),
      //     realizedPnL: order?.DataPnl?.GrossPnl?.toFixed(5),
      //     id: order?.DataPnl?.ID,
      //     qty: order?.DataPnl?.ExecutedQty.toFixed(5),
      //     OrderID : order?.DataPnl?.OrderID,
      //   };
      // });
      return { Data, Total };
    })
    .catch((errorResponse) => {
      dispatch(
        showSnackBar({
          src: "FETCH_PNL_HISTORY_FAIL",
          message: errorResponse.response.data.details,
          type: "failure"
        })
      );
    });
};
