import * as configureStore from "../../redux/store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { renderHook } from "@testing-library/react";
import { tickerPricemock } from "./OCOConstants";
import { tradablesymbolListMock, LEVERAGE_BRACKET_MOCK } from "./Constant";
import useQuantityFieldhandler from "../../businessHooks/ORDER_FORM/useQuantityFieldhandler";
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
    store.dispatch({
      type: "GET_LEVERAGE_BRACKET_SUCCESS",
      payload: LEVERAGE_BRACKET_MOCK[0] //
    });
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
      type: "SET_LEVERAGE_POS_RISK",
      payload: {
        sym: "BTCUSDT",
        leverage: 20
      }
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.quantityType).toBe("USDT");
    expect(result.current.quantityValueInPercent).toBe(1);
    expect(result.current.OrderType).toBe(0);
  });
  it("SizeField state test when quantity will change", async () => {
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.quantityType).toBe("USDT");
    expect(result.current.quantityValueInPercent).toBe(1);
    expect(result.current.OrderType).toBe(0);
    act(() => result.current.handleQuantityChange({ target: { value: "50" } }));
    expect(result.current.quantityValue).toBe("50");
  });
  it("SizeField state test when quantity will change", async () => {
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.quantityType).toBe("USDT");
    expect(result.current.quantityValueInPercent).toBe(1);
    expect(result.current.OrderType).toBe(0);
    act(() => result.current.handleQuantityChange({ target: { value: "50" } }));
    expect(result.current.quantityValue).toBe("50");
  });
  it("SizeField state test when quantity usdt will change", async () => {
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.quantityType).toBe("USDT");
    expect(result.current.quantityValueInPercent).toBe(1);
    expect(result.current.OrderType).toBe(0);
    act(() => result.current.handleQuantityChange({ target: { value: "50" } }));
    expect(result.current.quantityValue).toBe("50");
  });
  it("SizeField state order type market test when quantity in contract  will change", async () => {
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.setQuantityType("BTC"));
    expect(result.current.quantityType).toBe("BTC");
    act(() =>
      result.current.handleSizeInContractAssetChange({
        target: { value: "0.003" }
      })
    );
    expect(result.current.quantityValue).toBe(convertToPrecisionValueInPrecisionUnit(Number(store.getState().OrderBook.asksSnapShot[0][0]) * (1 + 0.0005) * 0.003, 1));
  });
  it("SizeField state order type limit price test when quantity in contract  will change", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 1,
      leverageDisable: true,
      leverageError: "",
      size: "",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "",
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
    const { result } = renderHook(() =>
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.setQuantityType("BTC"));
    expect(result.current.quantityType).toBe("BTC");
    act(() =>
      result.current.handleSizeInContractAssetChange({
        target: { value: "0.003" }
      })
    );
    expect(result.current.quantityValue).toBe(convertToPrecisionValueInPrecisionUnit(state.limitPrice * 0.003, 1));
  });
  it("SizeField state order type trigger price test when quantity in contract  will change", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 2,
      leverageDisable: true,
      leverageError: "",
      size: "",
      sizeError: "",
      quantityPercentage: 1,
      triggerPrice: "41000",
      triggerPriceError: "",
      triggerPricelimitPrice: "",
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.setQuantityType("BTC"));
    expect(result.current.quantityType).toBe("BTC");
    act(() =>
      result.current.handleSizeInContractAssetChange({
        target: { value: "0.003" }
      })
    );
    expect(result.current.quantityValue).toBe(convertToPrecisionValueInPrecisionUnit(state.triggerPrice * 0.003, 1));
  });

  it("SizeField state test set min quantity ordertype market and quantity type is usdt will change", async () => {
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.quantityType).toBe("USDT");
    expect(result.current.quantityValueInPercent).toBe(1);
    expect(result.current.OrderType).toBe(0);
    act(() => result.current.handleSetMinSize());
    const tradablesymbolListforContract = store.getState().tradablesymbolList.tradablesymbolList.find((item) => item.symbol === "BTCUSDT");
    const stepSize = tradablesymbolListforContract?.filters.find((item) => item.filterType === "MARKET_LOT_SIZE").stepSize;
    const minQTY = tradablesymbolListforContract?.filters.find((item) => item.filterType === "MARKET_LOT_SIZE").minQty;
    const notionValue = tradablesymbolListforContract?.filters.find((item) => item.filterType === "MIN_NOTIONAL").notional;
    const precision = tradablesymbolListforContract.quantityPrecision;

    expect(result.current.minQantityForContract).toBe(
      Math.max(
        minQTY,
        Number(convertToPrecisionValueInPrecisionUnit((Number(notionValue) / Number(store.getState().OrderBook.asksSnapShot[0][0])) * (1 + 0.0005), Number(precision))) + Number(stepSize)
      )
    );
  });
  it("SizeField state test set min quantity ordertype market and quantity type is usdt will change", async () => {
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    expect(result.current.quantityType).toBe("USDT");
    expect(result.current.quantityValueInPercent).toBe(1);
    expect(result.current.OrderType).toBe(0);
    act(() => result.current.setQuantityType("BTC"));
    expect(result.current.quantityType).toBe("BTC");
    act(() => result.current.handleSetMinSize());
    const tradablesymbolListforContract = store.getState().tradablesymbolList.tradablesymbolList.find((item) => item.symbol === "BTCUSDT");
    const stepSize = tradablesymbolListforContract?.filters.find((item) => item.filterType === "MARKET_LOT_SIZE").stepSize;
    const minQTY = tradablesymbolListforContract?.filters.find((item) => item.filterType === "MARKET_LOT_SIZE").minQty;
    const notionValue = tradablesymbolListforContract?.filters.find((item) => item.filterType === "MIN_NOTIONAL").notional;
    const precision = tradablesymbolListforContract.quantityPrecision;

    expect(result.current.minQantityForContract).toBe(
      Math.max(
        minQTY,
        Number(convertToPrecisionValueInPrecisionUnit((Number(notionValue) / Number(store.getState().OrderBook.asksSnapShot[0][0])) * (1 + 0.0005), Number(precision))) + Number(stepSize)
      )
    );
  });

  it("SizeField state order type limit when limit price  will change", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 1,
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() =>
      result.current.handleLimitPriceChange({
        target: { value: "10" }
      })
    );
    act(() =>
      result.current.handleLimitPriceChange({
        target: { value: "" }
      })
    );
  });

  it("SizeField state order type limit when limit price last button will change", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 1,
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );

    act(() => result.current.handleLastPrice());
  });
  it("SizeField state order type trigger when trigger price last button will change", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 2,
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleLastPrice());
  });
  it("SizeField state order type market  check size  change by %", async () => {
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleQuantityPercentageChange({ target: { value: "30" } }));
  });

  it("SizeField state order type Limit  check size  change by %", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 1,
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleQuantityPercentageChange({ target: { value: "30" } }));
  });
  it("SizeField state order type Tigger  check size  change by %", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 2,
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleQuantityPercentageChange({ target: { value: "30" } }));
  });

  it("SizeField state order type Tigger  check Trigger price   change by ", async () => {
    const state = {
      side: "BUY",
      maxLeverage: 0,
      maxLeverageSize: 0,
      OrderType: 2,
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
      useQuantityFieldhandler({
        state,
        dispatchOrderEvent: jest.fn()
      })
    );
    act(() => result.current.handleTriggerPriceChange({ target: { value: "39900" } }));
    act(() => result.current.handleTriggerPriceChange({ target: { value: "" } }));
  });
});
