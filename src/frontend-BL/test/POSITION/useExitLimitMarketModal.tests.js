/* eslint-disable no-unused-vars */
import * as configureStore from "../../redux/store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import WS from "jest-websocket-mock";
import { act, renderHook } from "@testing-library/react";
import { initiateAuthenticatedWebSocketConnection } from "../../../frontend-api-service/Api/WebSocket";
import {
  createOrder,
  get24hrPriceChange,
  getFuturesAccountDetailsApi,
  getLeverageBracketApi,
  openOrdersApi,
  positionRiskApi,
  topXTradableSymbolListApi,
  createOrderLimit
} from "../../../frontend-api-service/Api/Futures";
import { fututeAccountdetails, LEVERAGE_BRACKET_MOCK, OpenOrdersMock, OpenOrdersStreamMock, positionRiskMock, Ticker24Hr, tradablesymbolListMock } from "./Constant";
import { fetchAccountInfo } from "../../redux/actions/User/AccountInfo.ac";
import { getLeverageBracket } from "../../redux/actions/Futures/GetLeverageBracket.ac";
import { fetchOpenOrders, fetchPositions } from "../../redux/actions/Futures/Futures.ac";
import { getTradableCoins } from "../../redux/actions/Futures/GetTradableCoins.ac";
import { getTickerSnapshot } from "../../redux/actions/Futures/GetTicketSnapshot.ac";
import { useExitLimitMarketModal } from "../../businessHooks/POSITIONS/useExitLimitMarketModal";
import React from "react";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));
jest.mock("../../../frontend-api-service/Api/WebSocket", () => ({
  ...jest.requireActual("../../../frontend-api-service/Api/WebSocket"),
  initiateAuthenticatedWebSocketConnection: jest.fn()
}));
jest.mock("../../../frontend-api-service/Api/Futures", () => ({
  ...jest.requireActual("../../../frontend-api-service/Api/Futures"),
  getFuturesAccountDetailsApi: jest.fn(),
  getLeverageBracketApi: jest.fn(),
  positionRiskApi: jest.fn(),
  topXTradableSymbolListApi: jest.fn(),
  get24hrPriceChange: jest.fn(),
  createOrder: jest.fn(),
  openOrdersApi: jest.fn(),
  createOrderLimit: jest.fn()
}));
describe("useExitLimitMarket initial state", () => {
  let store;

  beforeEach(async () => {
    store = configureStore.default;
    useSelector.mockImplementation((callback) => callback(store.getState()));
    useDispatch.mockImplementation(() => () => jest.fn());
    initiateAuthenticatedWebSocketConnection.mockImplementation(() => Promise.resolve({ data: { token: "8080" } }));
    getFuturesAccountDetailsApi.mockImplementation(() => Promise.resolve({ data: fututeAccountdetails }));
    getLeverageBracketApi.mockImplementation(() => Promise.resolve({ data: LEVERAGE_BRACKET_MOCK }));
    positionRiskApi.mockImplementation(() => Promise.resolve({ data: positionRiskMock }));
    topXTradableSymbolListApi.mockImplementation(() => Promise.resolve({ data: tradablesymbolListMock }));
    get24hrPriceChange.mockImplementation(() => Promise.resolve({ data: Ticker24Hr }));
    createOrder.mockImplementation(() => Promise.resolve({ data: { data: "success" } }));
    createOrderLimit.mockImplementation(() => Promise.resolve({ data: { data: "success" } }));
    openOrdersApi.mockImplementation(() => Promise.resolve({ data: OpenOrdersMock }));
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    getLeverageBracketApi();
    getFuturesAccountDetailsApi.mockClear();
    positionRiskApi.mockClear();
    topXTradableSymbolListApi.mockClear();
    get24hrPriceChange.mockClear();
    openOrdersApi.mockClear();
    createOrderLimit.mockClear();
    WS.clean();
  });
  it(" initial states USEPOSITION CALCULATION size is empty order type LIMIT ", async () => {
    const size = "";
    const setSize = jest.fn();
    const setHelperTextForSize = jest.fn();
    const setToggleSize = jest.fn();
    const limitPrice = "";
    const setLimitPrice = jest.fn();
    const setHelperTextForPrice = jest.fn();
    const isValidationSuccessful = React.createRef();
    const maxSize = "250";
    const setMaxSize = jest.fn();
    const isOpen = "";
    const close = jest.fn();
    const orderType = "LIMIT";
    const positionEntry = "";
    const setEstimatedPnL = jest.fn();
    const contractAssetPrecision = "";
    const pricePrecisionValue = "";
    const openOrdersApiData = store.getState().futures.openOrders;
    const openOrdersSocketData = store.getState().OpenOrdersStream.OpenOrdersStream;
    const symbol = "BTCUSDT";
    const OrgSize = "";
    const setOrgSize = jest.fn();
    const server = new WS("wss://stream.binancefuture.com/stream");
    const client = new WebSocket("wss://stream.binancefuture.com/stream");

    await server.connected;
    store.dispatch({
      type: "OPEN_ORDERS_WEB_STREAM",
      payload: OpenOrdersStreamMock.o
    });
    store.dispatch({
      type: "BINANCE_WS_CONNECT"
    });
    store.dispatch({
      type: "BINANCE_WS_SUBSCRIBE",
      payload: {
        symbol,
        methods: ["markPrice@1s", "ticker"],
        source: "POSITIONS",
        res: ""
      }
    });
    store.dispatch(fetchAccountInfo());
    await act(() => getFuturesAccountDetailsApi());
    store.dispatch(getLeverageBracket(symbol));
    await act(() => getLeverageBracketApi(symbol));
    store.dispatch(fetchPositions(symbol));
    await act(() => positionRiskApi(symbol));
    store.dispatch(getTradableCoins());
    await act(() => topXTradableSymbolListApi());
    store.dispatch(getTickerSnapshot());
    await act(() => get24hrPriceChange());
    store.dispatch(fetchOpenOrders());
    await act(() => openOrdersApi());
    await store.dispatch("DENSITY_WS_CONNECT");
    // server.send(JSON.stringify(markPriceUpdateMock));
    // server.send(JSON.stringify(tickerPricemock));
    const { result } = renderHook(() =>
      useExitLimitMarketModal({
        size,
        setSize,
        setHelperTextForSize,
        setToggleSize,
        limitPrice,
        setLimitPrice,
        setHelperTextForPrice,
        isValidationSuccessful,
        maxSize,
        setMaxSize,
        isOpen,
        close,
        orderType,
        positionEntry,
        setEstimatedPnL,
        contractAssetPrecision,
        pricePrecisionValue,
        openOrdersApiData,
        openOrdersSocketData,
        symbol,
        OrgSize,
        setOrgSize
      })
    );

    act(() => result.current.handleSubmit());
  });
  it(" initial states USEPOSITION CALCULATION size is greter then max size is empty", async () => {
    const size = "300";
    const setSize = jest.fn();
    const setHelperTextForSize = jest.fn();
    const setToggleSize = jest.fn();
    const limitPrice = "";
    const setLimitPrice = jest.fn();
    const setHelperTextForPrice = jest.fn();
    const isValidationSuccessful = React.createRef();
    const maxSize = "250";
    const setMaxSize = jest.fn();
    const isOpen = "";
    const close = jest.fn();
    const orderType = "";
    const positionEntry = "";
    const setEstimatedPnL = jest.fn();
    const contractAssetPrecision = "";
    const pricePrecisionValue = "";
    const openOrdersApiData = store.getState().futures.openOrders;
    const openOrdersSocketData = store.getState().OpenOrdersStream.OpenOrdersStream;
    const symbol = "BTCUSDT";
    const OrgSize = "";
    const setOrgSize = jest.fn();
    const { result } = renderHook(() =>
      useExitLimitMarketModal({
        size,
        setSize,
        setHelperTextForSize,
        setToggleSize,
        limitPrice,
        setLimitPrice,
        setHelperTextForPrice,
        isValidationSuccessful,
        maxSize,
        setMaxSize,
        isOpen,
        close,
        orderType,
        positionEntry,
        setEstimatedPnL,
        contractAssetPrecision,
        pricePrecisionValue,
        openOrdersApiData,
        openOrdersSocketData,
        symbol,
        OrgSize,
        setOrgSize
      })
    );
    act(() => result.current.handleSizeChange({ target: { value: "4000" } }));
    act(() => result.current.handleSubmit());
  });
  it(" initial states USEPOSITION CALCULATION Limit is greater then LTP in LIMIT", async () => {
    const size = "200";
    const setSize = jest.fn();
    const setHelperTextForSize = jest.fn();
    const setToggleSize = jest.fn();
    const limitPrice = "24000";
    const setLimitPrice = jest.fn();
    const setHelperTextForPrice = jest.fn();
    const isValidationSuccessful = React.createRef();
    const maxSize = "250";
    const setMaxSize = jest.fn();
    const isOpen = "";
    const close = jest.fn();
    const orderType = "LIMIT";
    const positionEntry = { ltp: "22000" };
    const setEstimatedPnL = jest.fn();
    const contractAssetPrecision = "";
    const pricePrecisionValue = "";
    const openOrdersApiData = store.getState().futures.openOrders;
    const openOrdersSocketData = store.getState().OpenOrdersStream.OpenOrdersStream;
    const symbol = "BTCUSDT";
    const OrgSize = "";
    const setOrgSize = jest.fn();
    const { result } = renderHook(() =>
      useExitLimitMarketModal({
        size,
        setSize,
        setHelperTextForSize,
        setToggleSize,
        limitPrice,
        setLimitPrice,
        setHelperTextForPrice,
        isValidationSuccessful,
        maxSize,
        setMaxSize,
        isOpen,
        close,
        orderType,
        positionEntry,
        setEstimatedPnL,
        contractAssetPrecision,
        pricePrecisionValue,
        openOrdersApiData,
        openOrdersSocketData,
        symbol,
        OrgSize,
        setOrgSize
      })
    );
    act(() => result.current.handleSubmit());
  });
  it(" initial states USEPOSITION CALCULATION Limit is smaller then LTP in LIMIT", async () => {
    const size = "200";
    const setSize = jest.fn();
    const setHelperTextForSize = jest.fn();
    const setToggleSize = jest.fn();
    const limitPrice = "21000";
    const setLimitPrice = jest.fn();
    const setHelperTextForPrice = jest.fn();
    const isValidationSuccessful = React.createRef();
    const maxSize = "250";
    const setMaxSize = jest.fn();
    const isOpen = "";
    const close = jest.fn();
    const orderType = "LIMIT";
    const positionEntry = { ltp: "22000" };
    const setEstimatedPnL = jest.fn();
    const contractAssetPrecision = "";
    const pricePrecisionValue = "";
    const openOrdersApiData = store.getState().futures.openOrders;
    const openOrdersSocketData = store.getState().OpenOrdersStream.OpenOrdersStream;
    const symbol = "BTCUSDT";
    const OrgSize = "";
    const setOrgSize = jest.fn();
    const { result } = renderHook(() =>
      useExitLimitMarketModal({
        size,
        setSize,
        setHelperTextForSize,
        setToggleSize,
        limitPrice,
        setLimitPrice,
        setHelperTextForPrice,
        isValidationSuccessful,
        maxSize,
        setMaxSize,
        isOpen,
        close,
        orderType,
        positionEntry,
        setEstimatedPnL,
        contractAssetPrecision,
        pricePrecisionValue,
        openOrdersApiData,
        openOrdersSocketData,
        symbol,
        OrgSize,
        setOrgSize
      })
    );
    act(() => result.current.handleLimitPriceChange({ target: { value: "21000" } }));
    act(() => result.current.handleSubmit());
    await act(() => createOrderLimit());
  });
  it(" initial states USEPOSITION CALCULATION Limit is smaller then LTP in Market", async () => {
    const size = "200";
    const setSize = jest.fn();
    const setHelperTextForSize = jest.fn();
    const setToggleSize = jest.fn();
    const limitPrice = "21000";
    const setLimitPrice = jest.fn();
    const setHelperTextForPrice = jest.fn();
    const isValidationSuccessful = React.createRef();
    const maxSize = "250";
    const setMaxSize = jest.fn();
    const isOpen = "";
    const close = jest.fn();
    const orderType = "MARKET";
    const positionEntry = { ltp: "22000" };
    const setEstimatedPnL = jest.fn();
    const contractAssetPrecision = "";
    const pricePrecisionValue = "";
    const openOrdersApiData = store.getState().futures.openOrders;
    const openOrdersSocketData = store.getState().OpenOrdersStream.OpenOrdersStream;
    const symbol = "BTCUSDT";
    const OrgSize = "";
    const setOrgSize = jest.fn();
    const { result } = renderHook(() =>
      useExitLimitMarketModal({
        size,
        setSize,
        setHelperTextForSize,
        setToggleSize,
        limitPrice,
        setLimitPrice,
        setHelperTextForPrice,
        isValidationSuccessful,
        maxSize,
        setMaxSize,
        isOpen,
        close,
        orderType,
        positionEntry,
        setEstimatedPnL,
        contractAssetPrecision,
        pricePrecisionValue,
        openOrdersApiData,
        openOrdersSocketData,
        symbol,
        OrgSize,
        setOrgSize
      })
    );
    act(() => result.current.handleLimitPriceChange({ target: { value: "21000" } }));
    act(() => result.current.handleSubmit());
    await act(() => createOrderLimit());
  });
  it(" initial states USEPOSITION CALCULATION Limit is smaller then LTP in Market getPositionSide is long and limit is smaaler then position entry price", async () => {
    const size = "200";
    const setSize = jest.fn();
    const setHelperTextForSize = jest.fn();
    const setToggleSize = jest.fn();
    const limitPrice = "21000";
    const setLimitPrice = jest.fn();
    const setHelperTextForPrice = jest.fn();
    const isValidationSuccessful = React.createRef();
    const maxSize = "250";
    const setMaxSize = jest.fn();
    const isOpen = "";
    const close = jest.fn();
    const orderType = "MARKET";
    const positionEntry = { ltp: "26000", getPositionSide: "LONG" };
    const setEstimatedPnL = jest.fn();
    const contractAssetPrecision = "";
    const pricePrecisionValue = "";
    const openOrdersApiData = store.getState().futures.openOrders;
    const openOrdersSocketData = store.getState().OpenOrdersStream.OpenOrdersStream;
    const symbol = "BTCUSDT";
    const OrgSize = "";
    const setOrgSize = jest.fn();
    const { result } = renderHook(() =>
      useExitLimitMarketModal({
        size,
        setSize,
        setHelperTextForSize,
        setToggleSize,
        limitPrice,
        setLimitPrice,
        setHelperTextForPrice,
        isValidationSuccessful,
        maxSize,
        setMaxSize,
        isOpen,
        close,
        orderType,
        positionEntry,
        setEstimatedPnL,
        contractAssetPrecision,
        pricePrecisionValue,
        openOrdersApiData,
        openOrdersSocketData,
        symbol,
        OrgSize,
        setOrgSize
      })
    );
    act(() => result.current.handleLimitPriceChange({ target: { value: "29000" } }));
    act(() => result.current.handleSubmit());
    await act(() => createOrderLimit());
  });
});
