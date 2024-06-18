import { renderHook } from "@testing-library/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import useMarketBestPricehandler from "../../businessHooks/ORDER_FORM/useMarketBestPricehandler";
import * as configureStore from "../../redux/store/configureStore";
import { tradablesymbolListMock } from "./Constant";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe("Test case for useMarketBestPricehandler when orderBook connected", () => {
  let store;
  beforeEach(() => {
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
    store.dispatch({ type: "SET_ORDER_BOOK_LOADING", payload: "BTCUSDT" });
    store.dispatch({
      type: "SET_ASKS",
      payload: {
        s: "BTCUSDT",
        a: [
          ["46380.10", "0.021"],
          ["46381.90", "0.003"]
        ]
      }
    });
    store.dispatch({
      type: "SET_BIDS",
      payload: {
        s: "BTCUSDT",
        b: [
          ["46380.00", "0.822"],
          ["46378.10", "0.114"]
        ]
      }
    });
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    store.dispatch({
      type: "SET_SELECTED_SYMBOL_SUCCESS",
      payload: { selectedSymbol: "" }
    });
  });

  it("calculates assumingPrice for BUY side then  assuming price should be asks[0][0] * 1.0005 ", () => {
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() => useMarketBestPricehandler({ side: "BUY", symbol: "BTCUSDT" }));
    expect(result.current.assumingPrice).toBe(Number(store.getState().OrderBook.asksSnapShot[0][0]) * (1 + 0.0005));
  });

  it("calculates assumingPrice for SELL side then assuming price should be bids[0][0]", () => {
    const { result } = renderHook(() => useMarketBestPricehandler({ side: "SELL" }));
    expect(result.current.assumingPrice).toBe(Number(store.getState().OrderBook.bidsSnapShot[0][0]));
  });
});
