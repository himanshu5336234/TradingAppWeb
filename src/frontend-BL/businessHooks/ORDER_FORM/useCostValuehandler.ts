// export default useCostValuehandler;
import { useEffect, useMemo, useRef, useState } from "react";
import useMarketBestPricehandler from "./useMarketBestPricehandler";
import { useSelector } from "react-redux";
interface OpenOrder {
  R: boolean;
  o: string;
  s: string;
  S: string;
  p: number;
  q: number;
}

interface OrderDetails {
  symbol: string;
  reduceOnly: boolean;
  side: string;
  status: string;
  ID: string;
  quantity: number;
  executedQuantity: number;
  price: number | "N/A";
  stopPrice: number | undefined;
  type: string;
  createdAt: number;
  notionalQuantity: number;
}

const BUY = "BUY";
const SHORT = "SHORT";
const LONG = "LONG";
const SELL = "SELL";

const useCostValuehandler = ({ state, dispatchOrderEvent, symbol }: { state: any; dispatchOrderEvent: () => void; symbol: string }) => {
  // const { state, dispatchOrderEvent } = useContext(OrderFormContext);
  const { side, OrderType, size, isReduceOnly, limitPrice, triggerPrice, costValue } = state as {
    side: string;
    OrderType: number;
    size: number;
    isReduceOnly: boolean;
    limitPrice: number;
    triggerPrice: number;
    costValue: number;
  };
  const { assumingPrice } = useMarketBestPricehandler({
    side,
    symbol
  });
  const selectedSymbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  const leverageFromServer = useSelector((state: any) => state.positionsDirectory.leverage).find((item: any) => item.sym === selectedSymbol?.toUpperCase());
  const fetchMarkPrice = useSelector((state: any) => state.BinanceStreamData?.binanceData?.[`${selectedSymbol.toLowerCase()}@markPrice@1s`]);

  const openLossHandlerValue = useMemo(() => {
    if (fetchMarkPrice && assumingPrice) {
      const priceDifference = side === "BUY" ? 1 : -1;

      let calculatedLoss = 0;

      switch (OrderType) {
        case 0:
          calculatedLoss = size * Math.abs(Math.min(0, priceDifference * (Number(fetchMarkPrice) - Number(assumingPrice))));
          break;
        case 2:
          calculatedLoss = size * Math.abs(Math.min(0, priceDifference * (Number(fetchMarkPrice) - Number(triggerPrice))));
          break;
        default:
          calculatedLoss = size * Math.abs(Math.min(0, priceDifference * (Number(fetchMarkPrice) - Number(limitPrice))));
          break;
      }

      return calculatedLoss;
    } else {
      return 0;
    }
  }, [fetchMarkPrice, side, assumingPrice, triggerPrice, OrderType, size]);

  let priceMultiplier = 0;
  // changes 231123 start

  const LimitOrdersFromSocket =
    useSelector((state: any) => state.OpenOrdersStream?.OpenOrdersStream?.filter((openOrder: OpenOrder) => openOrder.o === "LIMIT" && openOrder.s.toUpperCase() === selectedSymbol?.toUpperCase())) ??
    [];
  // filter only limit orders
  const LimitOrdersFromApi: [] =
    useSelector((state: any) => state.futures?.openOrders?.filter((openOrder: any) => openOrder.type === "LIMIT" && openOrder.symbol.toUpperCase() === selectedSymbol?.toUpperCase())) ?? [];
  // changes 231123 start
  const selectedPositionAuxiliary = useSelector((state: any) => state.positionsDirectory.currentPositions.find((position: any) => position.sym?.toUpperCase() === selectedSymbol?.toUpperCase()));

  const totalOpenOrdersForSymbolRef = useRef<OrderDetails[]>([]);

  useEffect(() => {
    const uniqueIdsSet = new Set(); // Memoize the set creation
    const openOrdersWebsocketMap: OrderDetails[] = LimitOrdersFromSocket.map((order: any) => {
      const uniqueId = order.c;
      if (!uniqueIdsSet.has(uniqueId)) {
        uniqueIdsSet.add(uniqueId);
        return {
          symbol: order.s,
          reduceOnly: order.R,
          side: order.S,
          status: order.X,
          ID: uniqueId,
          quantity: order.q,
          executedQuantity: order.z,
          price: Number(order.p) || "N/A",
          stopPrice: order.sp,
          type: order.o,
          createdAt: order.T,
          notionalQuantity: Number(order.q) * Number(order.p)
        };
      } else {
        return null;
      }
    }).filter((order: any) => order !== null);

    const openOrdersApiFiltered = LimitOrdersFromApi.filter((order: any) => !uniqueIdsSet.has(order.ID));

    totalOpenOrdersForSymbolRef.current = [...openOrdersWebsocketMap, ...openOrdersApiFiltered];

    // Cleanup function remains unchanged
    return () => {
      // No need to reset the ref here
    };
  }, [LimitOrdersFromApi, LimitOrdersFromSocket]);

  const CheckForWillItOpenPosition = useMemo(() => {
    if (selectedPositionAuxiliary && side === selectedPositionAuxiliary.side) {
      return true;
    } else if (
      // if sides are different then add a check for checking if the net quantity is positive or not
      selectedPositionAuxiliary &&
      side !== selectedPositionAuxiliary.side
    ) {
      if (side === BUY && selectedPositionAuxiliary.side === SELL) {
        const totalOpenOrderBuyQuantity = totalOpenOrdersForSymbolRef?.current?.reduce((accumulator, order) => (order.side === LONG ? accumulator + Number(order.quantity) : accumulator), 0);

        //New Order Quantity (contract) > Abs (Short position quantity) - Open Buy Order Quantity(Only LIMIT Order)
        if (Number(size) > Math.abs(Number(selectedPositionAuxiliary.posAmt) - totalOpenOrderBuyQuantity)) {
          return true;
        } else {
          return false;
        }
      } else if (side === SELL && selectedPositionAuxiliary.side === BUY) {
        const totalOpenOrderBuyQuantity = totalOpenOrdersForSymbolRef?.current?.reduce((accumulator, order) => (order.side === SELL ? accumulator + Number(order.quantity) : accumulator), 0);
        //New Order Quantity (contract) > Abs (Short position quantity) - Open Buy Order Quantity(Only LIMIT Order)
        if (Number(size) > Math.abs(Number(selectedPositionAuxiliary.posAmt) - totalOpenOrderBuyQuantity)) {
          return true;
        } else {
          // if exisiting position is not there, then it will obviously open a new position
          return false;
        }
      }
    } else {
      return true;
    }
  }, [selectedPositionAuxiliary, size, openLossHandlerValue]);

  useEffect(() => {
    switch (OrderType) {
      case 0: {
        priceMultiplier = Number(assumingPrice);
        break;
      }
      case 1:
      case 3:
        priceMultiplier = Number(limitPrice);
        break;
      case 2:
        priceMultiplier = Number(triggerPrice);
        break;
      default:
        break;
    }
    if (!isReduceOnly && CheckForWillItOpenPosition) {
      if (!selectedPositionAuxiliary && LimitOrdersFromApi?.length === 0 && LimitOrdersFromSocket?.length === 0) {
        const initialMargin = (Number(size) * priceMultiplier) / Number(leverageFromServer?.leverage);
        const costToOpenPosition = Math.trunc(initialMargin * 1000) / 1000 + Math.trunc(openLossHandlerValue * 1000) / 1000;
        dispatchOrderEvent({
          type: "UPDATE_COST",
          payload: Number(costToOpenPosition)
        });
      } else {
        const positionNotionalQuantity = selectedPositionAuxiliary ? Number(selectedPositionAuxiliary.posAmt) * Number(fetchMarkPrice || 0) : 0;

        const bidNotionalQuantity = totalOpenOrdersForSymbolRef?.current?.reduce(
          (accumulator, order) => (order.side === BUY ? accumulator + Math.abs(Number(order.notionalQuantity)) : accumulator),
          0
        );
        const askNotionalQuantity = totalOpenOrdersForSymbolRef?.current?.reduce(
          (accumulator, order) => (order.side === SELL ? accumulator + Math.abs(Number(order.notionalQuantity)) : accumulator),
          0
        );
        // - Initial Margin for new order = max(0, after order initialMargin for that symbol - current initialMargin for that symbol)
        // - after order initialMargin = after order Notional / leverage
        // - after order Notional= max(bidNotional + positionNotional + order notional, askNotional - positionNotional) for BUY
        // - after order Notional= max(bidNotional + positionNotional, askNotional - positionNotional + order notional) for SELL
        // - current initialMargin = max(bidNotional + positionNotional , askNotional - positionNotional) / leverage
        const currentInitialMargin = Number(Math.max(bidNotionalQuantity + positionNotionalQuantity, askNotionalQuantity - positionNotionalQuantity) / Number(leverageFromServer?.leverage));
        let afterOrderNotionalQuantity = 0;
        const orderNotionalQuantity = Number(size) * priceMultiplier;
        if (side === BUY) {
          afterOrderNotionalQuantity = Math.max(bidNotionalQuantity + positionNotionalQuantity + orderNotionalQuantity, askNotionalQuantity - positionNotionalQuantity);
        } else {
          afterOrderNotionalQuantity = Math.max(bidNotionalQuantity + positionNotionalQuantity, askNotionalQuantity - positionNotionalQuantity + orderNotionalQuantity);
        }
        const afterOrderInitialMargin = afterOrderNotionalQuantity / Number(leverageFromServer?.leverage);

        const InitialMarginforNewOrder = Math.max(0, afterOrderInitialMargin - currentInitialMargin);
        dispatchOrderEvent({
          type: "UPDATE_COST",
          payload: Math.trunc((InitialMarginforNewOrder + openLossHandlerValue) * 1000) / 1000
        });
      }
    } else {
      if (costValue !== 0) {
        dispatchOrderEvent({
          type: "UPDATE_COST",
          payload: 0
        });
      }
    }
  }, [leverageFromServer?.leverage, isReduceOnly, assumingPrice, size, side, limitPrice, triggerPrice, openLossHandlerValue]);
  return {
    // Return any values as needed
  };
};

export default useCostValuehandler;
