import useOrderFormSubmit from "../../businessHooks/ORDER_FORM/useOrderFormSubmit";
import { renderHook } from "@testing-library/react-hooks";
import * as router from "react-router";
import { useDispatch, useSelector, useNavigate } from "react-redux";
import * as configureStore from "../../redux/store/configureStore";
import { tradablesymbolListMock } from "./Constant";
import { act } from "@testing-library/react";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
  useNavigate: jest.fn()
}));
const navigate = jest.fn();

describe("Test case for useOrderFormSubmit", () => {
  let store;
  beforeEach(async () => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    store = configureStore.default;
    useSelector.mockImplementation((callback) => callback(store.getState()));
    useDispatch.mockImplementation(() => () => jest.fn());
    useNavigate.mockImplementation(() => () => jest.fn());
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
      type: "SET_ASKS",
      payload: {
        data: {
          a: [
            ["46380.10", "0.021"],
            ["46381.90", "0.003"]
          ]
        }
      }
    });
    store.dispatch({
      type: "SET_BIDS",
      payload: {
        data: {
          b: [
            ["46380.00", "0.822"],
            ["46378.10", "0.114"]
          ]
        }
      }
    });
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  it("initial state of order form", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: false,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.side).toBe(state.side);
    expect(result.current.state.size).toBe(state.size);
    expect(result.current.state.OrderType).toBe(state.OrderType);
  });
  it("test for market order when size less then", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: false,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.hangleSubmitOrderForm());
  });
  it("test order form button disable when leverage is not confirm ", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: false,
      leverageError: "",
      size: "",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: false,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.hangleSubmitOrderForm());
  });
  it("test order form order type is market and when size field error", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: false,
      leverageError: "",
      size: "",
      sizeError: "39024923094",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: false,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.hangleSubmitOrderForm());
  });
  it("test order form order type is limit ", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 1,
      leverageDisable: false,
      leverageError: "",
      size: "1",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "",
      limitPrice: "41000",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: false,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.createOrderApiCall());
    act(() => result.current.handleGenerateSignal());
    expect(result.current.formValuesForOrderForm.current).toMatchObject({
      symbol: "BTCUSDT",
      side: "BUY",
      quantity: "1",
      type: 1,
      price: "41000"
    });
  });
  it("test order form order type is triggerPrice ", () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 2,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "39000",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: false,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.createOrderApiCall());
    act(() => result.current.handleGenerateSignal());
    expect(result.current.formValuesForOrderForm.current).toMatchObject({
      symbol: "BTCUSDT",
      side: "SELL",
      quantity: "0.11",
      type: 2,
      stopPrice: "39000"
    });
  });
  it("test order form order type is triggerPrice and limit", () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 3,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "39000",
      triggerPriceError: "",
      limitPrice: "40000",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: false,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.createOrderApiCall());
    act(() => result.current.handleGenerateSignal());
    expect(result.current.formValuesForOrderForm.current).toMatchObject({
      symbol: "BTCUSDT",
      side: "SELL",
      quantity: "0.11",
      type: 3,
      stopPrice: "39000",
      price: "40000"
    });
  });
  it("test order form order type is market  and active reduce only", () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "39000",
      triggerPriceError: "",
      limitPrice: "40000",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: true,
      isTakeProfitStopLossActive: false,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.createOrderApiCall());
    act(() => result.current.handleGenerateSignal());
    expect(result.current.formValuesForOrderForm.current).toMatchObject({
      quantity: "0.11",
      reduceOnly: true,
      side: "SELL",
      symbol: "BTCUSDT",
      type: 0
    });
  });
  it("test order form order type is market  and active tpsl active", () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "39000",
      triggerPriceError: "",
      limitPrice: "40000",
      limitPriceError: "",
      quantity: "",
      reduceOnly: true,
      stopLoss: "41000",
      takeProfit: "39000",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: true,
      isTakeProfitStopLossActive: false,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.createOrderApiCall());
    act(() => result.current.handleGenerateSignal());
    expect(result.current.formValuesForOrderForm.current).toMatchObject({
      symbol: "BTCUSDT",
      side: "SELL",
      quantity: "0.11",
      type: 0,
      reduceOnly: true,
      takeProfit: "39000",
      takeProfitEnabled: true,
      stopLoss: "41000",
      stopLossEnabled: true
    });
  });
  it("test order form order type is limit  and active tpsl active", () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 1,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "39000",
      triggerPriceError: "",
      limitPrice: "40000",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "41000",
      takeProfit: "39000",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: false,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.createOrderApiCall());
    act(() => result.current.handleGenerateSignal());
    expect(result.current.formValuesForOrderForm.current).toMatchObject({
      symbol: "BTCUSDT",
      side: "SELL",
      quantity: "0.11",
      type: 1,

      price: "40000",
      takeProfit: "39000",
      takeProfitEnabled: true,
      stopLoss: "41000",
      stopLossEnabled: true
    });
  });
  it("test order form order type is trigger  and active tpsl active", () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 2,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "39000",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "41000",
      takeProfit: "38000",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: true,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.createOrderApiCall());
    act(() => result.current.handleGenerateSignal());
    expect(result.current.formValuesForOrderForm.current).toMatchObject({
      symbol: "BTCUSDT",
      side: "SELL",
      quantity: "0.11",
      type: 2,
      stopPrice: "39000",
      takeProfit: "38000",
      takeProfitEnabled: true,
      stopLoss: "41000",
      stopLossEnabled: true
    });
    act(() => result.current.handleSubmitSignal());
  });
  it("test order form order type is trigger  and active tpsl active", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 2,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "39000",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: true,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.createOrderApiCall());
    act(() => result.current.handleGenerateSignal());
    expect(result.current.formValuesForOrderForm.current).toMatchObject({
      symbol: "BTCUSDT",
      side: "BUY",
      quantity: "0.11",
      type: 2,
      stopPrice: "39000"
    });
    act(() => result.current.handleSubmitSignal());
  });
  it("test order form tpsl validation order type is market buy  and active tpsl active", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "5000",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: true,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.hangleSubmitOrderForm());
  });
  it("test order form tpsl validation order type is market and active tpsl active", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "50000",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: true,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.hangleSubmitOrderForm());
  });
  it("test order form tpsl validation order type is market sell and active tpsl active", () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "5000",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: true,
      costValue: 0,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.hangleSubmitOrderForm());
  });
  it("test order form tpsl validation for signal trading order type is market buy and active tpsl active", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: true,
      costValue: 0,
      isSignalTrading: true,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.hangleSubmitOrderForm());
  });
  it("test order form tpsl validation for signal trading order type is LIMIT buy and active tpsl active", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 1,
      leverageDisable: false,
      leverageError: "",
      size: "0.11",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "40000",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: true,
      costValue: 0,
      isSignalTrading: true,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.hangleSubmitOrderForm());
  });
  it("test check for button is disable", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 1,
      leverageDisable: true,
      leverageError: "",
      size: "3",
      sizeError: "vf",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "vdfvdfvfdv",
      limitPrice: "",
      limitPriceError: "fvdfvfd",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: true,
      costValue: 0,
      isSignalTrading: true,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.hangleSubmitOrderForm());
  });
  it("test check for button is disable", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 2,
      leverageDisable: true,
      leverageError: "",
      size: "3",
      sizeError: "vf",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "vdfvdfvfdv",
      limitPrice: "",
      limitPriceError: "fvdfvfd",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: true,
      costValue: 0,
      isSignalTrading: true,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.hangleSubmitOrderForm());
  });
  it("test check for button is disable", () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 3,
      leverageDisable: true,
      leverageError: "",
      size: "3",
      sizeError: "vf",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "vdfvdfvfdv",
      limitPrice: "",
      limitPriceError: "fvdfvfd",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: true,
      costValue: 0,
      isSignalTrading: true,
      leverageForSignalTrading: 1
    };
    // Mock useSelector to return the appropriate state data
    const { result } = renderHook(() =>
      useOrderFormSubmit({
        setOrderConfirm: jest.fn(),
        setShowGenerateConfirm: jest.fn(),
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.hangleSubmitOrderForm());
  });
});
