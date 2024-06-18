/* eslint-disable no-unused-vars */
import * as configureStore from "../../redux/store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { act, renderHook } from "@testing-library/react";
// import { useState } from "react";
import { HOOK_PARAMS, tickerPricemock } from "./OCOConstants";
import { tradablesymbolListMock } from "./Constant";
import WS from "jest-websocket-mock";
import { getTradableCoins } from "../../redux/actions/Futures/GetTradableCoins.ac";
import useTPSLForOCOOrders from "../../businessHooks/ORDER_FORM/useTPSLForOCOOrders";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

const setShowModal = jest.fn();

describe("OCO Orders", () => {
  let store;
  beforeEach(async () => {
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
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });
  it("initial state test", async () => {
    const { result } = renderHook(() =>
      useTPSLForOCOOrders({
        symbol: "BTCUSDT",
        side: "BUY",
        size: 0.003,
        entryPrice: 42990,
        costValue: "7.15",
        isSignalTrading: false,
        close: () => {}
      })
    );
    expect(result.current.dropDownValueForStoploss).toBe("price");
    expect(result.current.dropDownValueForTakeProfit).toBe("price");
  });
  it("OCO Order Parent Order BUY TP ONLY", async () => {
    const { result } = renderHook(() =>
      useTPSLForOCOOrders({
        symbol: "BTCUSDT",
        side: "BUY",
        size: 0.003,
        entryPrice: 42990,
        costValue: "6.41",
        isSignalTrading: false,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("price"));
    expect(result.current.dropDownValueForStoploss).toBe("price");
    expect(result.current.dropDownValueForTakeProfit).toBe("price");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.stopLossValidaionError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.estimateProfitForTakeProfit).toBe("");
    act(() => result.current.handleTakeProfit({ target: { value: "41000" } }));
    expect(result.current.estimateProfitForTakeProfit).toBe("");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Take Profit should be greater than the Last Traded Price`);
    act(() => result.current.handleTakeProfit({ target: { value: "45990" } }));
    expect(result.current.estimateProfitForTakeProfit).toBe("9");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe("");
    act(() => result.current.placeOCOOrder());
  });
  it("OCO Order Parent Order BUY SL ONLY", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.BUY_TP_ONLY_POSITIONS,
        close: () => {}
      })
    );
    // act(() => result.current.handleStopLossAndTakeProfitDropDownValue("price"));
    expect(result.current.dropDownValueForStoploss).toBe("price");
    expect(result.current.dropDownValueForTakeProfit).toBe("price");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.stopLossValidaionError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.estimateProfitForStopLoss).toBe("");
    act(() => result.current.handleStopLoss({ target: { value: "47000" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss should be less than the Last Traded Price`);
    act(() => result.current.handleStopLoss({ target: { value: "39990" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("9");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe("");
    act(() => result.current.placeOCOOrder());
  });
  it("OCO Order Parent Order BUY with TP and SL", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.BUY_TP_ONLY_POSITIONS,
        close: () => {}
      })
    );
    // act(() => result.current.handleStopLossAndTakeProfitDropDownValue("price"));
    expect(result.current.dropDownValueForStoploss).toBe("price");
    expect(result.current.dropDownValueForTakeProfit).toBe("price");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.stopLossValidaionError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.estimateProfitForStopLoss).toBe("");

    // Both TP ans SL are invalid
    act(() => result.current.handleStopLoss({ target: { value: "47000" } }));
    act(() => result.current.handleTakeProfit({ target: { value: "41000" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("");
    expect(result.current.estimateProfitForTakeProfit).toBe("");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss should be less than the Last Traded Price`);
    expect(result.current.takeProfitValidationError).toBe(`Take Profit should be greater than the Last Traded Price`);

    // SL valid but not TP
    act(() => result.current.handleStopLoss({ target: { value: "39990" } }));
    act(() => result.current.handleTakeProfit({ target: { value: "41000" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("9");
    expect(result.current.estimateProfitForTakeProfit).toBe("");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe(`Take Profit should be greater than the Last Traded Price`);

    // valid TP, invalid SL

    act(() => result.current.handleTakeProfit({ target: { value: "45990" } }));
    expect(result.current.estimateProfitForTakeProfit).toBe("9");
    act(() => result.current.handleStopLoss({ target: { value: "47000" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss should be less than the Last Traded Price`);
    expect(result.current.takeProfitValidationError).toBe("");

    // Both Valid
    act(() => result.current.handleTakeProfit({ target: { value: "45990" } }));
    expect(result.current.estimateProfitForTakeProfit).toBe("9");
    act(() => result.current.handleStopLoss({ target: { value: "39990" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("9");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe("");
    act(() => result.current.placeOCOOrder());
  });

  it("OCO Order Parent Order BUY with amount dropdown", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.BUY_TP_ONLY_POSITIONS,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("amount"));
    expect(result.current.dropDownValueForStoploss).toBe("amount");
    expect(result.current.dropDownValueForTakeProfit).toBe("amount");

    act(() => result.current.handleTakeProfit({ target: { value: "9" } }));
    expect(result.current.takeProfitValue).toBe("45990");
    act(() => result.current.handleStopLoss({ target: { value: "9" } }));
    expect(result.current.stopLossValue).toBe("39990");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe("");
  });

  it("OCO Order Parent Order BUY with ROE dropdown", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.BUY_TP_ONLY_POSITIONS,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("ROE"));
    expect(result.current.dropDownValueForStoploss).toBe("ROE");
    expect(result.current.dropDownValueForTakeProfit).toBe("ROE");

    act(() => result.current.handleTakeProfit({ target: { value: "20" } }));
    expect(result.current.takeProfitValue).toBe("43466.6");
    expect(result.current.estimateProfitForTakeProfit).toBe("1.4");
    act(() => result.current.handleStopLoss({ target: { value: "20" } }));
    expect(result.current.stopLossValue).toBe("42513.3");
    expect(result.current.estimateProfitForStopLoss).toBe("1.4");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe("");
  });

  it("OCO Order Parent Order SELL TP ONLY", async () => {
    const { result } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SELL_TP_ONLY_POSITIONS,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("price"));
    expect(result.current.dropDownValueForStoploss).toBe("price");
    expect(result.current.dropDownValueForTakeProfit).toBe("price");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.stopLossValidaionError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.estimateProfitForTakeProfit).toBe("");
    act(() => result.current.handleTakeProfit({ target: { value: "48800" } }));
    expect(result.current.estimateProfitForTakeProfit).toBe("");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Take Profit should be less than the Last Traded Price`);

    act(() => result.current.handleTakeProfit({ target: { value: "41990" } }));
    expect(result.current.estimateProfitForTakeProfit).toBe("3");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe("");
    act(() => result.current.placeOCOOrder());
  });

  it("OCO Order Parent Order SELL SL ONLY", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SELL_TP_ONLY_POSITIONS,
        close: () => {}
      })
    );
    // act(() => result.current.handleStopLossAndTakeProfitDropDownValue("price"));
    expect(result.current.dropDownValueForStoploss).toBe("price");
    expect(result.current.dropDownValueForTakeProfit).toBe("price");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.stopLossValidaionError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.estimateProfitForStopLoss).toBe("");
    act(() => result.current.handleStopLoss({ target: { value: "40000" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss should be greater than the Last Traded Price`);
    act(() => result.current.handleStopLoss({ target: { value: "43990" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("3");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe("");
    act(() => result.current.placeOCOOrder());
  });

  it("OCO Order Parent Order SELL with TP and SL", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SELL_TP_ONLY_POSITIONS,
        close: () => {}
      })
    );
    // act(() => result.current.handleStopLossAndTakeProfitDropDownValue("price"));
    expect(result.current.dropDownValueForStoploss).toBe("price");
    expect(result.current.dropDownValueForTakeProfit).toBe("price");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.stopLossValidaionError).toBe(`Both Take Profit and Stop Loss Value can not be empty`);
    expect(result.current.estimateProfitForStopLoss).toBe("");

    // Both TP ans SL are invalid
    act(() => result.current.handleStopLoss({ target: { value: "41000" } }));
    act(() => result.current.handleTakeProfit({ target: { value: "47000" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("");
    expect(result.current.estimateProfitForTakeProfit).toBe("");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss should be greater than the Last Traded Price`);
    expect(result.current.takeProfitValidationError).toBe(`Take Profit should be less than the Last Traded Price`);

    // SL valid but not TP
    act(() => result.current.handleStopLoss({ target: { value: "43990" } }));
    act(() => result.current.handleTakeProfit({ target: { value: "47000" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("3");
    expect(result.current.estimateProfitForTakeProfit).toBe("");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe(`Take Profit should be less than the Last Traded Price`);

    // valid TP, invalid SL

    act(() => result.current.handleTakeProfit({ target: { value: "41990" } }));
    expect(result.current.estimateProfitForTakeProfit).toBe("3");
    act(() => result.current.handleStopLoss({ target: { value: "40000" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss should be greater than the Last Traded Price`);
    expect(result.current.takeProfitValidationError).toBe("");

    // Both Valid
    act(() => result.current.handleTakeProfit({ target: { value: "41990" } }));
    expect(result.current.estimateProfitForTakeProfit).toBe("3");
    act(() => result.current.handleStopLoss({ target: { value: "43990" } }));
    expect(result.current.estimateProfitForStopLoss).toBe("3");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe("");
    act(() => result.current.placeOCOOrder());
  });

  it("OCO Order Parent Order SELL with amount dropdown", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SELL_TP_ONLY_POSITIONS,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("amount"));
    expect(result.current.dropDownValueForStoploss).toBe("amount");
    expect(result.current.dropDownValueForTakeProfit).toBe("amount");

    act(() => result.current.handleTakeProfit({ target: { value: "3" } }));
    expect(result.current.takeProfitValue).toBe("41990");
    act(() => result.current.handleStopLoss({ target: { value: "3" } }));
    expect(result.current.stopLossValue).toBe("43990");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe("");
  });

  it("OCO Order Parent Order SELL with ROE dropdown", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SELL_TP_ONLY_POSITIONS,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("ROE"));
    expect(result.current.dropDownValueForStoploss).toBe("ROE");
    expect(result.current.dropDownValueForTakeProfit).toBe("ROE");

    act(() => result.current.handleTakeProfit({ target: { value: "20" } }));
    expect(result.current.takeProfitValue).toBe("42513.3");
    expect(result.current.estimateProfitForTakeProfit).toBe("1.4");
    act(() => result.current.handleStopLoss({ target: { value: "20" } }));
    expect(result.current.stopLossValue).toBe("43466.6");
    expect(result.current.estimateProfitForStopLoss).toBe("1.4");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe("");
  });

  it("OCO Order Parent Order SELL with ROE dropdown MATIC", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SELL_MATIC,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("ROE"));
    expect(result.current.dropDownValueForStoploss).toBe("ROE");
    expect(result.current.dropDownValueForTakeProfit).toBe("ROE");

    act(() => result.current.handleTakeProfit({ target: { value: "10" } }));
    expect(result.current.takeProfitValue).toBe("0.9810");
    expect(result.current.estimateProfitForTakeProfit).toBe("0.0070");
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Value can not be lesser than 1080.71 for Last Traded Price: ${result.current.lastTradedPrice}`);
    act(() => result.current.handleTakeProfit({ target: { value: "1080.71" } }));
    expect(result.current.takeProfitValidationError).toBe("");
  });
  it("OCO Order Parent Order SELL with Amount dropdown MATIC", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SELL_MATIC,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("amount"));
    expect(result.current.dropDownValueForStoploss).toBe("amount");
    expect(result.current.dropDownValueForTakeProfit).toBe("amount");

    act(() => result.current.handleTakeProfit({ target: { value: "0.7312" } }));
    expect(result.current.takeProfitValue).toBe("0.8603");
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Amount value can not be lesser than 0.7565 for Last Traded Price: ${result.current.lastTradedPrice}`);
    act(() => result.current.handleTakeProfit({ target: { value: "0.7567" } }));
    expect(result.current.takeProfitValidationError).toBe("");
  });

  it("OCO Order Parent Order BUY with Amount dropdown GALA", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.BUY_GALA,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("amount"));
    expect(result.current.dropDownValueForStoploss).toBe("amount");
    expect(result.current.dropDownValueForTakeProfit).toBe("amount");

    act(() => result.current.handleTakeProfit({ target: { value: "1.7" } }));
    expect(result.current.takeProfitValue).toBe("0.03560");
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Amount value can not be lesser than 1.88999 for Last Traded Price: ${result.current.lastTradedPrice}`);
    act(() => result.current.handleTakeProfit({ target: { value: "0.7567" } }));
    expect(result.current.takeProfitValidationError).toBe("");
  });
  it("OCO Order Parent Order BUY with ROE dropdown BTC", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.BUY_TP_ONLY_POSITIONS,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("ROE"));
    expect(result.current.dropDownValueForStoploss).toBe("ROE");
    expect(result.current.dropDownValueForTakeProfit).toBe("ROE");

    act(() => result.current.handleTakeProfit({ target: { value: "3" } }));
    expect(result.current.takeProfitValue).toBe("43061.5");
    expect(result.current.estimateProfitForTakeProfit).toBe("0.2");
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Value can not be lesser than 4.19 for Last Traded Price: ${result.current.lastTradedPrice}`);
    act(() => result.current.handleTakeProfit({ target: { value: "5" } }));
    expect(result.current.takeProfitValidationError).toBe("");
  });
  it("OCO Order Parent Order BUY with Amount dropdown ETH", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.BUY_ETH,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("amount"));
    expect(result.current.dropDownValueForStoploss).toBe("amount");
    expect(result.current.dropDownValueForTakeProfit).toBe("amount");

    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
    act(() => result.current.handleStopLoss({ target: { value: "0.7" } }));
    expect(result.current.stopLossValue).toBe("2171.53");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe(`Amount value can not be lesser than 0.89 for Last Traded Price: ${result.current.lastTradedPrice}`);
    act(() => result.current.handleStopLoss({ target: { value: "1" } }));
    expect(result.current.stopLossValidaionError).toBe("");
  });

  it("OCO Order Parent Order BUY with roe dropdown ETH", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.BUY_ETH,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("ROE"));
    expect(result.current.dropDownValueForStoploss).toBe("ROE");
    expect(result.current.dropDownValueForTakeProfit).toBe("ROE");

    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
    act(() => result.current.handleStopLoss({ target: { value: "100" } }));
    expect(result.current.stopLossValue).toBe("2227.08");
    expect(result.current.estimateProfitForStopLoss).toBe("0.2");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe(`Value can not be lesser than 445 for Last Traded Price: ${result.current.lastTradedPrice}`);
    act(() => result.current.handleStopLoss({ target: { value: "450" } }));
    expect(result.current.stopLossValidaionError).toBe("");
  });

  it("OCO Order Parent Order SELL with Amount dropdown BNB", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SELL_BNB,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("amount"));
    expect(result.current.dropDownValueForStoploss).toBe("amount");
    expect(result.current.dropDownValueForTakeProfit).toBe("amount");

    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
    act(() => result.current.handleStopLoss({ target: { value: "9" } }));
    expect(result.current.stopLossValue).toBe("316.78");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe(`Amount value can not be lesser than 10 for Last Traded Price: ${result.current.lastTradedPrice}`);
    act(() => result.current.handleStopLoss({ target: { value: "11" } }));
    expect(result.current.stopLossValidaionError).toBe("");
  });

  it("OCO Order Parent Order SELL with roe dropdown BNB", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SELL_BNB,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("ROE"));
    expect(result.current.dropDownValueForStoploss).toBe("ROE");
    expect(result.current.dropDownValueForTakeProfit).toBe("ROE");

    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
    act(() => result.current.handleStopLoss({ target: { value: "100" } }));
    expect(result.current.stopLossValue).toBe("311.73");
    expect(result.current.estimateProfitForStopLoss).toBe("3.96");
    act(() => result.current.handleContinue());
    expect(result.current.stopLossValidaionError).toBe(`Value can not be lesser than 252.52 for Last Traded Price: ${result.current.lastTradedPrice}`);
    act(() => result.current.handleStopLoss({ target: { value: "253" } }));
    expect(result.current.stopLossValidaionError).toBe("");
  });

  it("OCO order empty field check", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SELL_BNB,
        close: () => {}
      })
    );
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("amount"));
    expect(result.current.dropDownValueForStoploss).toBe("amount");
    expect(result.current.dropDownValueForTakeProfit).toBe("amount");
    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
    expect(result.current.takeProfitValue).toBe("");
    expect(result.current.takeProfit).toBe("");
    expect(result.current.estimateProfitForTakeProfit).toBe("");
    expect(result.current.stopLossValue).toBe("");
    expect(result.current.stopLoss).toBe("");
    expect(result.current.estimateProfitForStopLoss).toBe("");
    act(() => result.current.handleStopLossAndTakeProfitDropDownValue("ROE"));
    expect(result.current.dropDownValueForStoploss).toBe("ROE");
    expect(result.current.dropDownValueForTakeProfit).toBe("ROE");
    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
    expect(result.current.takeProfitValue).toBe("");
    expect(result.current.takeProfit).toBe("");
    expect(result.current.estimateProfitForTakeProfit).toBe("");
    expect(result.current.stopLossValue).toBe("");
    expect(result.current.stopLoss).toBe("");
    expect(result.current.estimateProfitForStopLoss).toBe("");
  });

  it("OCO Order Parent Order BUY Signal Trading", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SIGNAL_TRADING,
        close: () => {}
      })
    );
    // act(() => result.current.handleStopLossAndTakeProfitDropDownValue("price"));
    expect(result.current.dropDownValueForStoploss).toBe("price");
    expect(result.current.dropDownValueForTakeProfit).toBe("price");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Take Profit value can not be empty`);
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss value can not be empty`);
    expect(result.current.estimateProfitForStopLoss).toBe("");

    // only SL
    act(() => result.current.handleStopLoss({ target: { value: "39250" } }));
    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.takeProfitValidationError).toBe(`Take Profit value can not be empty`);
    // only TP

    act(() => result.current.handleTakeProfit({ target: { value: "48250" } }));
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss value can not be empty`);

    // Both TP ans SL are invalid
    act(() => result.current.handleStopLoss({ target: { value: "47000" } }));
    act(() => result.current.handleTakeProfit({ target: { value: "41000" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss should be less than the Last Traded Price`);
    expect(result.current.takeProfitValidationError).toBe(`Take Profit should be greater than the Last Traded Price`);

    // SL valid but not TP
    act(() => result.current.handleStopLoss({ target: { value: "39250" } }));
    act(() => result.current.handleTakeProfit({ target: { value: "41000" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe(`Take Profit should be greater than the Last Traded Price`);

    // valid TP, invalid SL

    act(() => result.current.handleTakeProfit({ target: { value: "48250" } }));
    act(() => result.current.handleStopLoss({ target: { value: "47000" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss should be less than the Last Traded Price`);
    expect(result.current.takeProfitValidationError).toBe("");

    // Both Valid
    act(() => result.current.handleTakeProfit({ target: { value: "48250" } }));
    act(() => result.current.handleStopLoss({ target: { value: "39250" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe("");
  });

  it("OCO Order Parent Order SELL Signal Trading", async () => {
    const { result, rerender } = renderHook(() =>
      useTPSLForOCOOrders({
        ...HOOK_PARAMS.SIGNAL_TRADING,
        side: "SELL",
        close: () => {}
      })
    );
    // act(() => result.current.handleStopLossAndTakeProfitDropDownValue("price"));
    expect(result.current.dropDownValueForStoploss).toBe("price");
    expect(result.current.dropDownValueForTakeProfit).toBe("price");
    act(() => result.current.handleContinue());
    expect(result.current.takeProfitValidationError).toBe(`Take Profit value can not be empty`);
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss value can not be empty`);
    expect(result.current.estimateProfitForStopLoss).toBe("");

    // only SL
    act(() => result.current.handleStopLoss({ target: { value: "45250" } }));
    act(() => result.current.handleTakeProfit({ target: { value: "" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.takeProfitValidationError).toBe(`Take Profit value can not be empty`);
    // only TP

    act(() => result.current.handleTakeProfit({ target: { value: "38250" } }));
    act(() => result.current.handleStopLoss({ target: { value: "" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss value can not be empty`);

    // Both TP ans SL are invalid
    act(() => result.current.handleStopLoss({ target: { value: "40000" } }));
    act(() => result.current.handleTakeProfit({ target: { value: "48000" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss should be greater than the Last Traded Price`);
    expect(result.current.takeProfitValidationError).toBe(`Take Profit should be less than the Last Traded Price`);

    // SL valid but not TP
    act(() => result.current.handleStopLoss({ target: { value: "48250" } }));
    act(() => result.current.handleTakeProfit({ target: { value: "46700" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe(`Take Profit should be less than the Last Traded Price`);

    // valid TP, invalid SL

    act(() => result.current.handleTakeProfit({ target: { value: "40250" } }));
    act(() => result.current.handleStopLoss({ target: { value: "40000" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.stopLossValidaionError).toBe(`Stop Loss should be greater than the Last Traded Price`);
    expect(result.current.takeProfitValidationError).toBe("");

    // Both Valid
    act(() => result.current.handleTakeProfit({ target: { value: "40250" } }));
    act(() => result.current.handleStopLoss({ target: { value: "48250" } }));
    act(() => result.current.addNewTPSL());
    expect(result.current.stopLossValidaionError).toBe("");
    expect(result.current.takeProfitValidationError).toBe("");
  });
});
