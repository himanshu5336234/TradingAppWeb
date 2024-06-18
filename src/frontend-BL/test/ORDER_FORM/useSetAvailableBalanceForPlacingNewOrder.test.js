import { renderHook, act } from "@testing-library/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import useSetAvailableBalanceForPlacingNewOrder from "../../businessHooks/ORDER_FORM/useSetAvailableBalanceForPlacingNewOrder";
import * as configureStore from "../../redux/store/configureStore";
import { tradablesymbolListMock } from "./Constant";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

describe("useSetAvailableBalanceForPlacingNewOrder", () => {
  let store;
  beforeEach(async () => {
    store = configureStore.default;
    useSelector.mockImplementation((callback) => callback(store.getState()));
    useDispatch.mockImplementation(() => () => jest.fn());
    const binanceDataCopy = {};
    binanceDataCopy[`btcusdt@ticker`] = 46554.4;
    store.dispatch({ type: "SET_BINANCE_DATA", payload: binanceDataCopy });
    store.dispatch({
      type: "SET_TRADABLE_SYMBOL_LIST_SUCCESS",
      payload: { tradablesymbolList: tradablesymbolListMock.symbols }
    });
    store.dispatch({
      type: "SET_SELECTED_SYMBOL_SUCCESS",
      payload: { selectedSymbol: "BTCUSDT" }
    });
    store.dispatch({
      type: "FUTURES_ACCOUNT_INFO_FETCH_SUCCESS",
      payload: { totalCrossWalletBalance: 8 }
    });
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  it("dispatches SET_CROSS_WALLET_BALANCE action with the correct payload", async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    await act(async () => {
      renderHook(() => useSetAvailableBalanceForPlacingNewOrder());
    });

    const expectedPayload = 8;
    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_CROSS_WALLET_BALANCE",
      payload: expectedPayload
    });
  });

  it("dispatches SET_CROSS_WALLET_BALANCE action with the correct payload when exisitng position", async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    await store.dispatch({
      type: "SET_LEVERAGE_POS_RISK",
      payload: {
        sym: "BTCUSDT",
        leverage: 10
      }
    });
    await store.dispatch({
      type: "SET_CROSS_WALLET_DETAILS",
      payload: {
        symbol: "BTCUSDT",
        posAmt: "0.001",
        maintMargin: "0.5615",
        marginBalance: "15008.8381",
        initialMargin: "1",
        unPnl: 2.2187,
        cum: 0,
        mmr: 0.004
      }
    });

    await store.dispatch({
      type: "SET_UNREALISED_PROFITLOSS_CROSS",
      payload: {
        unRealisedPnl: 2.2187,
        symbol: "BTCUSDT",
        ratio: 0
      }
    });

    await store.dispatch({
      type: "CREATE_POSIITON_ACCOUNT_INFO",
      payload: {
        symbol: "BTCUSDT",
        posAmt: "0.001",
        side: "BUY",
        leverage: 5
      }
    });
    await act(async () => {
      renderHook(() => useSetAvailableBalanceForPlacingNewOrder());
    });

    const expectedPayload = 9.21;
    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_CROSS_WALLET_BALANCE",
      payload: expectedPayload
    });
  });

  it("dispatches SET_CROSS_WALLET_BALANCE action with the correct payload when exisitng position & open Order", async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    await store.dispatch({
      type: "SET_LEVERAGE_POS_RISK",
      payload: {
        sym: "BTCUSDT",
        leverage: 10
      }
    });

    await store.dispatch({
      type: "SET_CROSS_WALLET_DETAILS",
      payload: {
        symbol: "BTCUSDT",
        posAmt: "0.001",
        maintMargin: "0.5615",
        marginBalance: "15008.8381",
        initialMargin: "1",
        unPnl: 2.2187,
        cum: 0,
        mmr: 0.004
      }
    });

    await store.dispatch({
      type: "SET_UNREALISED_PROFITLOSS_CROSS",
      payload: {
        unRealisedPnl: 2.2187,
        symbol: "BTCUSDT",
        ratio: 0
      }
    });

    await store.dispatch({
      type: "OPEN_ORDERS_WEB_STREAM",
      payload: {
        AP: "",
        L: "0",
        N: "USDT",
        R: false,
        S: "BUY",
        T: 1704823605955,
        X: "NEW",
        a: "0",
        ap: "0",
        b: "129",
        c: "72cc6e4f-a1a7-41ae-9ab8-24a1d0c6fa71",
        cp: false,
        cr: "",
        f: "GTC",
        i: 3630616443,
        l: "0",
        m: false,
        n: "0",
        o: "LIMIT",
        ot: "LIMIT",
        p: "43000",
        pP: false,
        ps: "BOTH",
        q: "0.001",
        rp: "0",
        s: "BTCUSDT",
        si: 0,
        sp: "0",
        ss: 0,
        t: 0,
        wt: "CONTRACT_PRICE",
        x: "NEW",
        z: "0"
      }
    });

    await store.dispatch({
      type: "CREATE_POSIITON_ACCOUNT_INFO",
      payload: {
        sym: "BTCUSDT",
        posAmt: "0.005",
        side: "BUY",
        leverage: 5
      }
    });

    await store.dispatch({
      type: "OPEN_ORDERS_FETCH_SUCCESS",
      payload: [
        {
          ID: "72cc6e4f-a1a7-41ae-9ab8-24a1d0c6fa71",
          userID: "ee1de40a-e555-4877-8bc7-4052ac784c27",
          symbol: "BTCUSDT",
          side: "BUY",
          type: "LIMIT",
          status: "NEW",
          quantity: "0.003",
          executedQuantity: "0",
          price: "43000",
          notionalQuantity: "129",
          averagePrice: "0",
          reduceOnly: false,
          timeInForce: "GTC",
          brokerOrderID: "3630616443",
          clientOrderID: "",
          stopPrice: "0",
          workingType: "",
          trades: [],
          isForcedOrder: false,
          forcedOrderType: "",
          hasSiblingOrders: false,
          createdAt: 1704823605955,
          updatedAt: 1704824992817
        }
      ]
    });
    await act(async () => {
      renderHook(() => useSetAvailableBalanceForPlacingNewOrder());
    });

    const expectedPayload = 0;
    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_CROSS_WALLET_BALANCE",
      payload: expectedPayload
    });
  });
});
