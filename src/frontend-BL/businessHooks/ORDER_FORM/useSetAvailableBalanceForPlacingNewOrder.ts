import { SET_CROSS_WALLET_BALANCE } from "../../redux/constants/Constants";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

interface OpenOrder {
  R: boolean;
  o: string;
  s: string;
  S: string;
  p: number;
  q: number;
}

interface ActiveCrossedPosition {
  sym: string;
  side: "LONG" | "BUY" | "SHORT" | "SELL";
  posAmt: number;
  initialMargin: number;
}

interface Leverage {
  sym: string;
  leverage: number;
}

function useSetAvailableBalanceForPlacingNewOrder() {
  const crossWalletBalance = useSelector((state: any) => state.futures.accountInfo.totalCrossWalletBalance);
  const openOrdersApiData = useSelector((state: any) => state.futures.openOrders);
  const activeCrossedPositions = useSelector((state: any) => state.positionsDirectory.crossWalletDetails);
  const activePositions = useSelector((state: any) => state.positionsDirectory.currentPositions);
  const openOrdersSocketData = useSelector((state: any) => state.OpenOrdersStream.OpenOrdersStream);
  const leverageDirectory = useSelector((state: any) => state.positionsDirectory.leverage);
  const binanceData = useSelector((state: any) => state.BinanceStreamData?.binanceData);
  const dispatch = useDispatch();

  const activeCrossedPositionsPnLData = useSelector((state: any) => state.positionsDirectory.unRealizedPnLForCross);

  const availableCrossWalletBalanceForPlacingNewOrder = useMemo(() => {
    const contractListWithOpenOrdersFromSocket: Record<string, Record<string, number>> = {};
    // filter only limit orders
    const LimitOrdersFromSocket = openOrdersSocketData?.filter((openOrder: OpenOrder) => openOrder.o === "LIMIT") ?? [];
    const contractListWithOpenOrdersFromApi: Record<string, Record<string, number>> = {};
    // filter only limit orders

    const LimitOrdersFromApi = openOrdersApiData?.filter((openOrder: any) => openOrder.type === "LIMIT") ?? [];

    for (const openOrder of LimitOrdersFromSocket) {
      if (contractListWithOpenOrdersFromSocket[openOrder.s]) {
        contractListWithOpenOrdersFromSocket[openOrder.s][openOrder.S]
          ? (contractListWithOpenOrdersFromSocket[openOrder.s][openOrder.S] += Number(openOrder.p * openOrder.q))
          : (contractListWithOpenOrdersFromSocket[openOrder.s][openOrder.S] = Number(openOrder.p * openOrder.q));
      } else {
        contractListWithOpenOrdersFromSocket[openOrder.s] = {};
        contractListWithOpenOrdersFromSocket[openOrder.s][openOrder.S] = Number(openOrder.p * openOrder.q);
      }
    }

    for (const openOrder of LimitOrdersFromApi) {
      if (contractListWithOpenOrdersFromApi[openOrder.symbol]) {
        contractListWithOpenOrdersFromApi[openOrder.symbol][openOrder.side]
          ? (contractListWithOpenOrdersFromApi[openOrder.symbol][openOrder.side] += Number(openOrder.notionalQuantity))
          : (contractListWithOpenOrdersFromApi[openOrder.symbol][openOrder.side] = Number(openOrder.notionalQuantity));
      } else {
        contractListWithOpenOrdersFromApi[openOrder.symbol] = {};
        contractListWithOpenOrdersFromApi[openOrder.symbol][openOrder.side] = Number(openOrder.notionalQuantity);
      }
    }

    const individualContractsWithOpenOrdersDirectory = {
      ...contractListWithOpenOrdersFromSocket,
      ...contractListWithOpenOrdersFromApi
    };
    const individualContractsWithOpenOrdersList = Object.keys(individualContractsWithOpenOrdersDirectory);
    let totalOpenOrdersMargin = 0;

    for (const contractAsset of individualContractsWithOpenOrdersList) {
      const bidNotionalQuantity = individualContractsWithOpenOrdersDirectory[contractAsset].BUY || individualContractsWithOpenOrdersDirectory[contractAsset].LONG || 0;
      const askNotionalQuantity = individualContractsWithOpenOrdersDirectory[contractAsset].SELL || individualContractsWithOpenOrdersDirectory[contractAsset].SHORT || 0;

      const activePositionWithContractAsset = activePositions.find((position: ActiveCrossedPosition) => position.sym === contractAsset);
      const MarkPriceForContractAsset = binanceData?.[`${contractAsset.toLowerCase()}@markPrice@1s`];
      const side = activePositionWithContractAsset ? (activePositionWithContractAsset.side === "LONG" || activePositionWithContractAsset.side === "BUY" ? 1 : -1) : 0;
      const positionNotionalQuantity = activePositionWithContractAsset ? Number(Math.abs(activePositionWithContractAsset.posAmt) * (MarkPriceForContractAsset || 0)) : 0;
      const positionInitialMargin = activePositionWithContractAsset
        ? Number(Math.abs(activePositionWithContractAsset.posAmt) * Number(MarkPriceForContractAsset || 0)) / activePositionWithContractAsset?.leverage
        : 0;

      const leverage = leverageDirectory.find((obj: Leverage) => obj.sym === contractAsset);
      const initialMargin =
        Math.max(Number(askNotionalQuantity) - Number(side * positionNotionalQuantity), Number(bidNotionalQuantity) + Number(side * positionNotionalQuantity)) / (leverage?.leverage || 1); // Use a default leverage val   ue if not found
      totalOpenOrdersMargin += initialMargin - positionInitialMargin;
    }
    const totalUnrealizedPnlForCrossedPositions = activeCrossedPositionsPnLData?.reduce((accumulator: any, position: any) => (Number(position.unRealisedPnl) || 0) + accumulator, 0);
    // source of initial Margin - useMarginRatio component of position row
    // Cross Position Initial Margin =  Notional Quantity/Leverage ; Notional qty. = Mark Price * size (in contract)
    const crossPositionsInitialMargin = activeCrossedPositions?.reduce((accumulator: any, position: any) => (Number(position.initialMargin) || 0) + accumulator, 0);
    const availableCrossWalletBalanceForPlacingNewOrder = Number(crossWalletBalance) + totalUnrealizedPnlForCrossedPositions - totalOpenOrdersMargin - crossPositionsInitialMargin;
    return availableCrossWalletBalanceForPlacingNewOrder;
  }, [leverageDirectory, activeCrossedPositionsPnLData, activeCrossedPositions, crossWalletBalance, openOrdersApiData, openOrdersSocketData]);

  useEffect(() => {
    dispatch({
      type: SET_CROSS_WALLET_BALANCE,
      payload: availableCrossWalletBalanceForPlacingNewOrder > 0 ? Math.trunc(availableCrossWalletBalanceForPlacingNewOrder * 100) / 100 : 0
    });
  }, [availableCrossWalletBalanceForPlacingNewOrder?.toFixed(2)]);
}

export default useSetAvailableBalanceForPlacingNewOrder;
