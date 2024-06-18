import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { fetchOrderHistory } from "@/frontend-api-service/Api/OrderHistory/OrderHistory";
// import { SymbolPrecisionHelper } from "@/helpers";
import store from "../../store/configureStore";
const getFormatedTrade = (trade, symbolBaseAsset) => {
  let executionTime = trade?.tradeTime;
  executionTime = new Date(executionTime).getTime();
  const exeQty = parseFloat(trade?.qty) * parseFloat(trade?.price);
  const tradeFeePercentage = (trade.commission.toFixed(5) / exeQty.toFixed(5)) * 100;
  return {
    tradeID: trade?.ID,
    executionTime,
    executionPrice: trade?.price,
    executedQuantity: `${exeQty?.toFixed(3)} USDT | ${trade?.qty?.toFixed(3)} ${symbolBaseAsset}`,
    PnL: trade?.realizedPnl?.toFixed(4),
    role: trade?.maker ? "MAKER" : "TAKER",
    tradingFee: `${trade?.commission.toFixed(4)} | ${tradeFeePercentage?.toFixed(2)}%`
  };
};

export const FETCH_ORDER_HISTORY = (data) => (dispatch) => {
  const allowedShowTriggerCondtions = ["STOP_LIMIT", "STOP_MARKET", "TAKE_PROFIT"];
  const symbolPrecisionList = store.getState().tradablesymbolList.tradablesymbolList;
  return fetchOrderHistory(data)
    .then((successResponse) => {
      const { data: orderData, totalCount: total } = successResponse;

      const requiredData = orderData?.map((order) => {
        const totalFee = order?.trades?.reduce((agg, trade) => agg + parseFloat(trade.commission), 0) ?? 0;
        const totalPnL = order?.trades?.reduce((agg, trade) => agg + trade?.realizedPnl, 0) ?? 0;
        const priceToTake = parseFloat(order?.price) === 0 ? order?.averagePrice : order?.price;
        const eqty = order.executedQuantity * priceToTake;
        const totalFeePercentage = (totalFee / eqty) * 100;
        const symbolPrecisiondata = symbolPrecisionList.find((data) => data.symbol === order?.symbol);
        const symbolBaseAsset = symbolPrecisiondata && symbolPrecisiondata.baseAsset ? symbolPrecisiondata.baseAsset : "--";
        let executionTime = order?.createdAt;
        executionTime = new Date(executionTime).getTime();
        const trades = order?.trades?.map((trade) => getFormatedTrade(trade, symbolBaseAsset)) ?? [];
        return {
          orderId: order["idUuid"],
          time: executionTime,
          updatedTime: new Date(order?.updatedAt).getTime(),
          symbol: order?.symbol,
          type: order?.type,
          side: order?.side === "BUY" ? "LONG" : "SHORT",
          avgPrice: order?.averagePrice || order?.price,
          reduceOnly: order?.reduceOnly ? "YES" : "NO",
          status: order?.status,
          executedQtyInUSDT: eqty,
          executedQty: order?.executedQuantity,
          totalPnL: totalPnL.toFixed(4),
          trades,
          showOrderTriggerCondition: allowedShowTriggerCondtions.find((type) => order?.type === type),
          stopPrice: order?.stopPrice,
          totalFee: totalFee.toFixed(4),
          totalFeePercentage: totalFeePercentage.toFixed(2),
          isForcedOrder: data?.type === "Liquidation",
          forcedOrderType: order["isForcedOrder"]
        };
      });
      requiredData.sort((a, b) => b.updatedTime - a.updatedTime);
      return { requiredData, total: 10 };
    })
    .catch((errorResponse) => {
      dispatch(
        showSnackBar({
          src: "FETCH_ORDER_HISTORY_FAIL",
          message: errorResponse.response.message,
          type: "failure"
        })
      );
    });
};
