/* eslint-disable no-unused-vars */
import * as configureStore from "../../redux/store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { act, renderHook } from "@testing-library/react";
import WS from "jest-websocket-mock";
import { addRemoveMarginApi, availableBalanceApi, getFuturesAccountDetailsApi, positionRiskApi } from "../../../frontend-api-service/Api/Futures";
import { availableBalanceAction } from "../../redux/actions/User/AvailableBalance.ac";
import { useAddRemoveMargin } from "../../businessHooks/POSITIONS/useAddRemoveMargin";
import { fetchAccountInfo } from "../../redux/actions/User/AccountInfo.ac";
import { createPositionData, fututeAccountdetails, markPriceUpdateMock, positionRisk, tickerPricemock } from "./Constant";
import { fetchPositions } from "../../redux/actions/Futures/Futures.ac";
import { setPositionsData } from "../../redux/actions/Futures/SetCalculatedPositionsData";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));
jest.mock("../../../frontend-api-service/Api/Futures", () => ({
  ...jest.requireActual("../../../frontend-api-service/Api/Futures"),
  availableBalanceApi: jest.fn(),
  getFuturesAccountDetailsApi: jest.fn(),
  positionRiskApi: jest.fn(),
  addRemoveMarginApi: jest.fn()
}));
describe("PORFOLIO MODAL", () => {
  let store;
  beforeEach(() => {
    store = configureStore.default;
    useSelector.mockImplementation((callback) => callback(store.getState()));
    useDispatch.mockImplementation(() => () => jest.fn());
    availableBalanceApi.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            accountAlias: "oCsRsRSgoCAu",
            asset: "USDT",
            balance: "209.84203381",
            crossWalletBalance: "276.27040449",
            crossUnPnl: "0.00000000",
            availableBalance: "276.27040449",
            maxWithdrawAmount: "209.84203381",
            marginAvailable: true,
            updateTime: 1678101034057
          }
        ]
      })
    );
    getFuturesAccountDetailsApi.mockImplementation(() => Promise.resolve({ data: fututeAccountdetails }));
    positionRiskApi.mockImplementation(() => Promise.resolve({ data: positionRisk }));
    addRemoveMarginApi.mockImplementation(() => Promise.resolve({ data: { msg: "Successfully modify position margin." } }));
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    availableBalanceApi.mockClear();
    positionRiskApi.mockClear();
    getFuturesAccountDetailsApi.mockClear();
    addRemoveMarginApi.mockClear();
  });

  it("Portfolio initial state add margin", async () => {
    const symbol = "BTCUSDT";
    store.dispatch(availableBalanceAction());
    await act(() => availableBalanceApi());
    store.dispatch(fetchAccountInfo());
    await act(() => getFuturesAccountDetailsApi());
    store.dispatch(fetchPositions(symbol));
    await act(() => positionRiskApi());

    const close = jest.fn();
    const { result, rerender } = renderHook(() =>
      useAddRemoveMargin({
        symbol,
        close
      })
    );
    // when marginValue is empty
    act(() => result.current.handleSubmitForMarginChange());
    expect(result.current.helperText).toBe("Value cannot be empty");
    // when marginValue > maximumMarginPermissible
    act(() => result.current.setMarginValue(300));
    act(() => result.current.handleSubmitForMarginChange());
    expect(result.current.helperText).toBe("Value greater than the maximum permissible value");
    // when marginValue is negative
    act(() => result.current.setMarginValue(-3));
    act(() => result.current.handleSubmitForMarginChange());
    expect(result.current.helperText).toBe("Value cannot be negative");

    act(() => result.current.setMarginValue(20));
    act(() => result.current.handleSubmitForMarginChange());
    await act(() => addRemoveMarginApi());
    await store.dispatch({
      type: "GLOBAL_ERROR_ADD",
      payload: {
        src: "ADD_REMOVE_MARGIN_SUCCESS",
        errorMessage: "Margin updated successfully!",
        dialogType: "success",
        errorUi: "SNACKBAR"
      }
    });
  });
  it("Portfolio initial state Remove margin", async () => {
    const symbol = "BTCUSDT";
    const server = new WS("wss://stream.binancefuture.com/stream");
    const client = new WebSocket("wss://stream.binancefuture.com/stream");
    await server.connected;

    store.dispatch(availableBalanceAction());
    await act(() => availableBalanceApi());
    store.dispatch(fetchAccountInfo());
    await act(() => getFuturesAccountDetailsApi());
    store.dispatch(fetchPositions(symbol));
    await act(() => positionRiskApi());
    server.send(JSON.stringify(markPriceUpdateMock));
    server.send(JSON.stringify(tickerPricemock));
    const close = jest.fn();
    store.dispatch(setPositionsData(createPositionData));
    store.dispatch({
      type: "UPDATE_ISOLATED_WALLET_POS_RISK",
      payload: { sym: "BTCUSDT", isolatedWallet: "10000" }
    });
    const { result, rerender } = renderHook(() =>
      useAddRemoveMargin({
        symbol,
        close
      })
    );

    act(() => result.current.setSelectedDropDownValue("Remove margin"));
    expect(result.current.selectedDropDownValue).toBe("Remove margin");
    // when margin  'Value is empty',

    act(() => result.current.handleSubmitForMarginChange());
    expect(result.current.helperText).toBe("Value cannot be empty");

    // when margin  'Value greater than the maximum permissible value',
    act(() => result.current.setMarginValue("5657.4"));
    act(() => result.current.handleSubmitForMarginChange());
    expect(result.current.helperText).toBe("Value greater than the maximum permissible value");
    // when margin  'Value  is negative',
    act(() => result.current.setMarginValue("-5657.4"));
    act(() => result.current.handleSubmitForMarginChange());
    expect(result.current.helperText).toBe("Value cannot be negative");
    act(() => result.current.setMarginValue("657.4"));
    act(() => result.current.handleSubmitForMarginChange());
    await act(() => addRemoveMarginApi());
    await store.dispatch({
      type: "GLOBAL_ERROR_ADD",
      payload: {
        src: "ADD_REMOVE_MARGIN_SUCCESS",
        errorMessage: "Margin updated successfully!",
        dialogType: "success",
        errorUi: "SNACKBAR"
      }
    });
  });
});
