import * as configureStore from "../../redux/store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { renderHook } from "@testing-library/react";
import { tickerPricemock } from "./OCOConstants";
import { tradablesymbolListMock } from "./Constant";
import useTakeProfitStopLoss from "../../businessHooks/ORDER_FORM/useTakeProfitStopLoss";
import { act } from "react-dom/test-utils";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));
const convertToPrecisionValueInPrecisionUnit = (value, Precision) => {
  let numStr = value.toString();
  numStr = numStr.replace(/-/g, "");
  if (numStr.startsWith(".")) {
    numStr = `0${numStr}`; // Add a leading zero
  }

  // Find the index of the decimal point
  const decimalIndex = numStr.indexOf(".");

  // If there is a decimal point, remove the portion before it
  if (decimalIndex !== -1) {
    return (numStr = numStr.substr(0, Precision + decimalIndex + 1));
  } else {
    return numStr;
  }
};
describe("TakeProfit stopLoss order for orderForm", () => {
  let store;
  beforeEach(() => {
    store = configureStore.default;
    useSelector.mockImplementation((callback) => callback(store.getState()));
    useDispatch.mockImplementation(() => () => jest.fn());
    const binanceDataCopy = {};
    binanceDataCopy[`btcusdt@ticker`] = tickerPricemock.data.c;
    binanceDataCopy[`maticusdt@ticker`] = "0.85610";
    binanceDataCopy[`galausdt@ticker`] = "0.03661";
    binanceDataCopy[`ethusdt@ticker`] = "2149.31";
    binanceDataCopy[`bnbusdt@ticker`] = "317.780";
    store.dispatch({ type: "SET_BINANCE_DATA", payload: binanceDataCopy });
    store.dispatch({
      type: "SET_TRADABLE_SYMBOL_LIST_SUCCESS",
      payload: { tradablesymbolList: tradablesymbolListMock.symbols }
    });
    store.dispatch({
      type: "SET_SELECTED_SYMBOL_SUCCESS",
      payload: { selectedSymbol: "BTCUSDT" }
    });
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });
  it("initial state test", async () => {
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
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.dropDownValueForStoploss).toBe("price");
  });
  it("take profit price for market order side Buy", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
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
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.dropDownValueForStoploss).toBe("price");
    act(() => result.current.handleTakeProfit({ target: { value: "45105.30" } }));
    expect(result.current.takeProfit).toBe("45105.3");
    const pnl = Number(state.size) * (45105.3 - Number(store.getState().BinanceStreamData.binanceData["btcusdt@ticker"]));
    console.log(pnl);
    expect(result.current.estimateProfitForTakeProfit).toBe(pnl.toString());
    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
    expect(result.current.takeProfit).toBe("");
  });

  it("take profit price for market order side SELL", async () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
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
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.dropDownValueForStoploss).toBe("price");
    act(() => result.current.handleTakeProfit({ target: { value: "40105.30" } }));
    expect(result.current.takeProfit).toBe("40105.3");
    const pnl = Number(state.size) * (Number(store.getState().BinanceStreamData.binanceData["btcusdt@ticker"]) - 40105.3);
    expect(result.current.estimateProfitForTakeProfit).toBe(pnl.toString());
    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
    expect(result.current.takeProfit).toBe("");
  });
  it("stop Loss price for market order side Buy", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
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
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.dropDownValueForStoploss).toBe("price");
    act(() => result.current.handleStopLoss({ target: { value: "40105.30" } }));
    expect(result.current.stopLoss).toBe("40105.3");

    const pnl = Number(state.size) * (Number(store.getState().BinanceStreamData.binanceData["btcusdt@ticker"]) - 40105.3);
    expect(result.current.estimateProfitForStopLoss).toBe(pnl.toString());
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
    expect(result.current.takeProfit).toBe("");
  });

  it("stop Loss  price for market order side SELL", async () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
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
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.dropDownValueForStoploss).toBe("price");
    act(() => result.current.handleStopLoss({ target: { value: "44105.30" } }));

    expect(result.current.stopLoss).toBe("44105.3");
    const pnl = Number(state.size) * (44105.3 - Number(store.getState().BinanceStreamData.binanceData["btcusdt@ticker"]));
    expect(result.current.estimateProfitForStopLoss).toBe(pnl.toString());
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
    expect(result.current.takeProfit).toBe("");
  });

  it("take profit amount for market order side BUY ", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
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
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("amount"));
    expect(result.current.dropDownValueForStoploss).toBe("amount");
    act(() => result.current.handleTakeProfit({ target: { value: "2" } }));

    const AmountToPice = Number(store.getState().BinanceStreamData.binanceData["btcusdt@ticker"]) + 2 / Number(state.size);
    expect(result.current.takeProfit).toBe("2");
    expect(result.current.estimateProfitForTakeProfit).toBe(convertToPrecisionValueInPrecisionUnit(AmountToPice, 2));
  });
  it("take profit amount for market order side SELL ", async () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
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
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("amount"));
    expect(result.current.dropDownValueForStoploss).toBe("amount");
    act(() => result.current.handleTakeProfit({ target: { value: "2" } }));

    const AmountToPice = Number(store.getState().BinanceStreamData.binanceData["btcusdt@ticker"]) - 2 / Number(state.size);
    expect(result.current.takeProfit).toBe("2");
    expect(result.current.estimateProfitForTakeProfit).toBe(convertToPrecisionValueInPrecisionUnit(AmountToPice, 2));
    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
  });
  it("stop loss amount for market order side BUY ", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
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
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("amount"));
    expect(result.current.dropDownValueForStoploss).toBe("amount");
    act(() => result.current.handleStopLoss({ target: { value: "2" } }));

    const AmountToPice = Number(store.getState().BinanceStreamData.binanceData["btcusdt@ticker"]) - 2 / Number(state.size);
    expect(result.current.stopLoss).toBe("2");
    expect(result.current.estimateProfitForStopLoss).toBe(convertToPrecisionValueInPrecisionUnit(AmountToPice, 2));
  });
  it("stop loss amount for market order side SELL ", async () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
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
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("amount"));
    expect(result.current.dropDownValueForStoploss).toBe("amount");
    act(() => result.current.handleStopLoss({ target: { value: "2" } }));

    const AmountToPice = Number(store.getState().BinanceStreamData.binanceData["btcusdt@ticker"]) + 2 / Number(state.size);
    expect(result.current.stopLoss).toBe("2");
    expect(result.current.estimateProfitForStopLoss).toBe(convertToPrecisionValueInPrecisionUnit(AmountToPice, 2));
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
  });
  it("take profit ROE for market order side SELL ", async () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
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
      costValue: 10,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("ROE"));
    expect(result.current.dropDownValueForStoploss).toBe("ROE");
    act(() => result.current.handleTakeProfit({ target: { value: "20" } }));
    const marginGainAfterROE = (Number(state.costValue) * 20) / 100;
    expect(result.current.estimateProfitForTakeProfit).toBe(marginGainAfterROE.toString());
    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
  });
  it("take profit ROE for market order side BUY ", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
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
      costValue: 10,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("ROE"));
    expect(result.current.dropDownValueForStoploss).toBe("ROE");
    act(() => result.current.handleTakeProfit({ target: { value: "20" } }));
    const marginGainAfterROE = (Number(state.costValue) * 20) / 100;
    expect(result.current.estimateProfitForTakeProfit).toBe(marginGainAfterROE.toString());
    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
  });
  it("take profit ROE for market order side SELL ", async () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 0,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
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
      costValue: 10,
      isSignalTrading: false,
      leverageForSignalTrading: 1
    };
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("ROE"));
    expect(result.current.dropDownValueForStoploss).toBe("ROE");
    act(() => result.current.handleTakeProfit({ target: { value: "20" } }));
    const marginGainAfterROE = (Number(state.costValue) * 20) / 100;
    expect(result.current.estimateProfitForTakeProfit).toBe(marginGainAfterROE.toString());
    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
  });
  it("stop loss ROE for market order side SELL ", async () => {
    const state = {
      side: "SELL",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 1,
      leverageDisable: true,
      leverageError: "",
      size: "0.003",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "",
      triggerPriceError: "",
      limitPrice: "",
      limitPriceError: "",
      quantity: "",
      reduceOnly: false,
      stopLoss: "",
      takeProfit: "50000",
      takeProfitError: "",
      stopLossError: "",
      isReduceOnly: false,
      isTakeProfitStopLossActive: false,
      costValue: 10,
      isSignalTrading: true,
      leverageForSignalTrading: 1
    };
    const { result } = renderHook(() =>
      useTakeProfitStopLoss({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("ROE"));
    expect(result.current.dropDownValueForStoploss).toBe("ROE");
    act(() => result.current.handleStopLoss({ target: { value: "20" } }));

    const marginGainAfterROE = (Number(state.costValue) * 20) / 100;
    expect(result.current.estimateProfitForStopLoss).toBe(marginGainAfterROE.toString());
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
  });
});
