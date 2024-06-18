import { fetchAllOpenOrdersApi, generateAuthenticatedWebSocketUrl } from "../../../../frontend-api-service/Api";
import {
  DENSITY_WS_CONNECT,
  DENSITY_WS_CLOSED,
  DENSITY_WS_DISCONNECT,
  DENSITY_WS_OPENED,
  OPEN_ORDERS_WEB_STREAM,
  GLOBAL_ERROR_ADD,
  GLOBAL_ERROR_REMOVE,
  DENSITY_WEBSOCKET_CONNECTION,
  WS_ORDER_TRIGGER,
  DENSITY_WS_SUBSCRIBE_CREATE_ORDER,
  DENSITY_WS_SUBSCRIBE_CLOSE_ORDER,
  ERASE_POSITION_DIRECTORY,
  OPEN_ORDERS_UPDATE_SIZE_STREAM,
  OPEN_ORDERS_FETCH_SUCCESS,
  CLEAR_UNREALISED_PROFITLOSS
} from "../../../redux/constants/Constants";
import {
  accountUpdateHandler,
  checkForPositions,
  checkForCancelledOrExpiredOrFilledOrders,
  checkForExistingOrderId,
  checkForLiquidatedPosition,
  checkForOpenOrders,
  checkForPartiallyFilledOrders,
  positionsHandler,
  removeOrderFromSnapshot,
  removeOrderFromStream,
  updateFilledSizeForSnapshot,
  updateFilledSizeForStream
} from "../../../services/DensityWebSocketService/PositionHelpers";
import { deleteApiOrderIdFromStore } from "../../../redux/actions/Futures/saveOrderDetails.ac";
import { GENERATE_TOKEN } from "../../actions/User/GenerateToken.ac";
import { fetchFutureAccountDetails } from "../../actions/Futures/Futures.ac";
import { fetchAccountPositionInfo } from "../../actions/User/AccountInfo.ac";
import { posthog } from "posthog-js";
import { mergeArraysWithoutCommonElements } from "./DensityWebSocketHelper";

const densitySocketMiddleware = () => {
  let socket = null;
  let PongRecived = false;
  let ReConnectWhenWsconnectionBreak = 0;
  let ApiPollingLimit = 0;
  let socketConnectionCount = 0;
  let ApiPollingPongRecived = false;
  let symbolList = [];
  let OrderIdList = [];
  let OrderIdListFromStream = [];
  let EventType = "";

  const getWebSocketUrl = () =>
    GENERATE_TOKEN("websocket")
      .then(
        (result) => {
          return Promise.resolve(result);
        },
        (error) => {
          const message = error.toString();
          return Promise.reject(message);
        }
      )
      .then((userToken) => generateAuthenticatedWebSocketUrl(userToken));
  // fallback functions when ws_connection break;
  const TracePositionDatabySymbol = (payload, store) => {
    RemoveSymbolFromOrderIdListWhenEventReceived_MarketOrder(payload, store);
  };

  const TraceOrderDatabyId = (payload, store) => {
    const isOrderNew = payload.filter((item) => item.ID === OrderIdList[0]);
    if (isOrderNew.length > 0) {
      OrderIdList.shift();
      fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&&status=PARTIALLY_FILLED" }).then((openOrders) => {
        store.dispatch({
          type: OPEN_ORDERS_UPDATE_SIZE_STREAM,
          payload: []
        });
        store.dispatch({
          type: OPEN_ORDERS_FETCH_SUCCESS,
          payload: openOrders.data.data.map((item) => {
            return { ...item, notionalQuantity: Number(item.price) * Number(item.quantity) };
          })
        });
      });
    }
  };
  function startApiPollingWhenStreamNotConnected(store, callback) {
    // sending ping before creating a new order  for check stream is connected or not
    socket.send(JSON.stringify({ type: "ping" }));
    // wait for pong  if recievied then wait for a stream event else disconnect ws stream and start polling;

    const ApiPollingPongTimer = setTimeout(() => {
      if (OrderIdList.length > 0) {
        OrderIdList = mergeArraysWithoutCommonElements(OrderIdListFromStream, OrderIdList);
      }
      if (OrderIdList.length > 0 || symbolList.length > 0 || ApiPollingPongRecived !== true) {
        OrderIdListFromStream = [];
        store.dispatch({ type: DENSITY_WS_DISCONNECT });
        callback(store);
      } else {
        OrderIdListFromStream = [];
        OrderIdList = [];
        symbolList = [];
        EventType = "";
        clearTimeout(ApiPollingPongTimer);
      }
    }, 5000);
  }
  function handleCreateMarketOrderEvent(store) {
    const PongTimer = setInterval(() => {
      if (ApiPollingLimit < 5) {
        ApiPollingLimit++;
        if (symbolList.length !== 0) {
          store.dispatch(fetchAccountPositionInfo(TracePositionDatabySymbol, store));
          fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&&status=PARTIALLY_FILLED" }).then((openOrders) => {
            store.dispatch({
              type: OPEN_ORDERS_UPDATE_SIZE_STREAM,
              payload: []
            });
            store.dispatch({ type: CLEAR_UNREALISED_PROFITLOSS });
            store.dispatch({
              type: OPEN_ORDERS_FETCH_SUCCESS,
              payload: openOrders.data.data.map((item) => {
                return { ...item, notionalQuantity: Number(item.price) * Number(item.quantity) };
              })
            });
          });
          store.dispatch(fetchFutureAccountDetails());
        } else {
          clearInterval(PongTimer);
          store.dispatch({ type: DENSITY_WS_CONNECT });
          ApiPollingPongRecived = false;
          ApiPollingLimit = 0;
        }
      } else {
        clearInterval(PongTimer);
        store.dispatch({ type: DENSITY_WS_CONNECT });
        ApiPollingPongRecived = false;
        ApiPollingLimit = 0;
        symbolList = [];
        store.dispatch({
          type: ERASE_POSITION_DIRECTORY,
          payload: null
        });
        store.dispatch({ type: CLEAR_UNREALISED_PROFITLOSS });
        store.dispatch(fetchAccountPositionInfo());
        fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&&status=PARTIALLY_FILLED" }).then((openOrders) => {
          store.dispatch({
            type: OPEN_ORDERS_UPDATE_SIZE_STREAM,
            payload: []
          });
          store.dispatch({
            type: OPEN_ORDERS_FETCH_SUCCESS,
            payload: openOrders.data.data.map((item) => {
              return { ...item, notionalQuantity: Number(item.price) * Number(item.quantity) };
            })
          });
        });
      }
    }, 1000);
  }

  function handleCreateLimitsOrderEvent(store) {
    const PongTimer = setInterval(() => {
      if (ApiPollingLimit < 5) {
        ApiPollingLimit++;
        if (OrderIdList.length !== 0) {
          fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&&status=PARTIALLY_FILLED" }).then((openOrders) => {
            TraceOrderDatabyId(openOrders.data.data, store);
          });
          store.dispatch(fetchAccountPositionInfo());
          store.dispatch(fetchFutureAccountDetails());
        } else {
          clearInterval(PongTimer);
          store.dispatch({ type: DENSITY_WS_CONNECT });
          ApiPollingPongRecived = false;
          ApiPollingLimit = 0;
        }
      } else {
        clearInterval(PongTimer);
        store.dispatch({ type: DENSITY_WS_CONNECT });
        ApiPollingPongRecived = false;
        ApiPollingLimit = 0;
        OrderIdList = [];
        store.dispatch({
          type: ERASE_POSITION_DIRECTORY,
          payload: null
        });
        store.dispatch(fetchAccountPositionInfo());
        store.dispatch({ type: CLEAR_UNREALISED_PROFITLOSS });
        fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&&status=PARTIALLY_FILLED" }).then((openOrders) => {
          store.dispatch({
            type: OPEN_ORDERS_UPDATE_SIZE_STREAM,
            payload: []
          });
          store.dispatch({
            type: OPEN_ORDERS_FETCH_SUCCESS,
            payload: openOrders.data.data.map((item) => {
              return { ...item, notionalQuantity: Number(item.price) * Number(item.quantity) };
            })
          });
        });
      }
    }, 1000);
  }

  function RemoveSymbolFromOrderIdListWhenEventReceived_MarketOrder(payload, store) {
    if (EventType === "CLOSE_ORDER") {
      const SET = new Set([...symbolList]);
      symbolList = payload.filter((item) => SET.has(item.symbol));
      if (symbolList.length === 0) {
        store.dispatch({
          type: ERASE_POSITION_DIRECTORY,
          payload: null
        });
        store.dispatch({ type: CLEAR_UNREALISED_PROFITLOSS });
        store.dispatch(fetchAccountPositionInfo());
        EventType = "";
      }
    } else {
      const isOrderFullFill = payload.filter((item) => item.symbol === symbolList[0]);

      if (isOrderFullFill.length > 0) {
        symbolList.shift();
      }
    }
  }

  const onOpen = (store) => () => {
    posthog?.capture("WEBSCOKET_OPEN", {
      event_time: new Date().toUTCString()
    });
    startPongTimer(store);
    store.dispatch({
      type: DENSITY_WS_OPENED,
      payload: { connecting: false, opened: true }
    });
  };

  function startPongTimer(store) {
    if (ReConnectWhenWsconnectionBreak < 10) {
      socket.send(JSON.stringify({ type: "ping" }));
      // Initial ping
      // eslint-disable-next-line no-unused-vars
      const pingTimer = setInterval(() => {
        socket.send(JSON.stringify({ type: "ping" }));

        const PongTimer = setTimeout(() => {
          if (PongRecived !== true) {
            store.dispatch({ type: DENSITY_WS_DISCONNECT });

            store.dispatch(fetchAccountPositionInfo());
            store.dispatch(fetchFutureAccountDetails());
            fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&&status=PARTIALLY_FILLED" }).then((openOrders) => {
              store.dispatch({
                type: OPEN_ORDERS_UPDATE_SIZE_STREAM,
                payload: []
              });
              store.dispatch({ type: CLEAR_UNREALISED_PROFITLOSS });
              store.dispatch({
                type: OPEN_ORDERS_FETCH_SUCCESS,
                payload: openOrders.data.data.map((item) => {
                  return { ...item, notionalQuantity: Number(item.price) * Number(item.quantity) };
                })
              });
            });
            store.dispatch({ type: DENSITY_WS_CONNECT });
          } else {
            clearTimeout(PongTimer);
          }
        }, 1000);
      }, 15000);
    } else {
      // window.location.reload();
      store.dispatch({ type: DENSITY_WS_DISCONNECT });
      ReConnectWhenWsconnectionBreak = 0;
    }
  }

  const onError = (store) => (e) => {
    posthog?.capture("WEBSCOKET_ERROR", {
      event_time: new Date().toUTCString()
    });
    if (ReConnectWhenWsconnectionBreak < 5) {
      // eslint-disable-next-line no-unused-vars
      const PongTimer = setTimeout(() => {
        store.dispatch({ type: DENSITY_WS_DISCONNECT });
        store.dispatch(fetchAccountPositionInfo());
        store.dispatch(fetchFutureAccountDetails());
        fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&&status=PARTIALLY_FILLED" }).then((openOrders) => {
          store.dispatch({
            type: OPEN_ORDERS_UPDATE_SIZE_STREAM,
            payload: []
          });
          store.dispatch({ type: CLEAR_UNREALISED_PROFITLOSS });
          store.dispatch({
            type: OPEN_ORDERS_FETCH_SUCCESS,
            payload: openOrders.data.data.map((item) => {
              return { ...item, notionalQuantity: Number(item.price) * Number(item.quantity) };
            })
          });
        });
        store.dispatch({ type: DENSITY_WS_CONNECT });
      }, 3000 * ReConnectWhenWsconnectionBreak);
    } else {
      store.dispatch({ type: DENSITY_WS_DISCONNECT });
      ReConnectWhenWsconnectionBreak = 0;
      // window.location.reload();
    }
    store.dispatch({
      type: GLOBAL_ERROR_ADD,
      payload: {
        src: DENSITY_WEBSOCKET_CONNECTION,
        errorMessage: `Our server is facing some issues `,
        dialogType: "failure",
        errorUi: "SNACKBAR",
        errorHandlerForReduxStateUpdation: () =>
          store.dispatch({
            type: GLOBAL_ERROR_REMOVE,
            payload: { src: DENSITY_WEBSOCKET_CONNECTION }
          })
      }
    });
  };

  const onClose = (store) => (e) => {
    posthog?.capture("WEBSCOKET_CLOSE", {
      event_time: new Date().toUTCString()
    });
    store.dispatch({ type: DENSITY_WS_DISCONNECT });
  };

  const WS_MESSAGESS = {
    ORDER_TRADE_UPDATE: "ORDER_TRADE_UPDATE",
    ACCOUNT_UPDATE: "ACCOUNT_UPDATE"
  };

  const onMessage = (store) => (event) => {
    if (JSON.parse(event.data).type === "pong") {
      PongRecived = true;
      ApiPollingPongRecived = true;
    }
    const payload = JSON.parse(event.data).eventData;
    const eventType = JSON.parse(event.data).eventType;

    JSON.parse(event.data).type !== "pong" &&
      posthog?.capture("WEBSCOKET_MESSAGE", {
        event_type: eventType,
        event_time: new Date().toUTCString()
      });

    switch (eventType) {
      case WS_MESSAGESS.ORDER_TRADE_UPDATE:
        if (checkForLiquidatedPosition(payload, store)) break;
        if (checkForOpenOrders(payload)) {
          OrderIdListFromStream.push(payload.c);
          if (OrderIdList[0] === payload.c) {
            OrderIdList.shift();
          }
          store.dispatch({ type: OPEN_ORDERS_WEB_STREAM, payload });
        }
        if (checkForPartiallyFilledOrders(payload)) {
          const clientOrderId = payload.c;
          store.dispatch(deleteApiOrderIdFromStore(clientOrderId));
          updateFilledSizeForSnapshot(payload, store);
          updateFilledSizeForStream(payload, store);
        }
        if (checkForCancelledOrExpiredOrFilledOrders(payload)) {
          const openOrderId = JSON.parse(event.data);
          removeOrderFromSnapshot(openOrderId.orderID, store);
          removeOrderFromStream(openOrderId.eventData.c, store);
        }
        if (checkForPositions(payload)) {
          if (symbolList[0] === payload.s) {
            symbolList.shift();
          }
          const clientOrderId = payload.c;
          if (checkForExistingOrderId(store, clientOrderId)) return;
          store.dispatch({ type: WS_ORDER_TRIGGER });
          store.dispatch(deleteApiOrderIdFromStore(clientOrderId));
          positionsHandler(payload, store);
        }
        break;

      case WS_MESSAGESS.ACCOUNT_UPDATE:
        accountUpdateHandler(payload.positions[0], store);
        store.dispatch(fetchFutureAccountDetails());
        break;
      default:
    }
  };

  // the middleware part of this function
  return (store) => (next) => (action) => {
    const { type, payload } = action;
    switch (type) {
      case DENSITY_WS_CONNECT:
        socketConnectionCount++;
        if (socket !== null) {
          socket.close();
          // socket.terminate();
        }
        // connect to the remote host
        // TODO : Optimize this approach
        if (socketConnectionCount === 1) {
          getWebSocketUrl().then((url) => {
            socket = new WebSocket(url);
            // const webWorker = new CreateWebWorker();
            // socket = webWorker?.worker;

            socket.addEventListener("message", function (event) {
              const { type, action } = event.data;
              if (type === "websocket") {
                // Handle WebSocket messages received from the web worker
                switch (action) {
                  case "open":
                    onOpen(store)();
                    break;
                  case "onmessage":
                    onMessage(store)(event?.data);
                    break;
                  case "onerror":
                    onError(store)(event?.data?.error);
                    break;
                  case "onclose":
                    onClose(store)();
                    break;
                }
              }
            });

            // socket.postMessage({ type: "websocket", payload: { url } });

            // websocket handlers
            socket.onmessage = onMessage(store);
            socket.onclose = onClose(store);
            socket.onopen = onOpen(store);
            socket.onerror = onError(store);
            return Promise.resolve();
          });
        }
        break;

      case DENSITY_WS_DISCONNECT:
        if (socket !== null) {
          ReConnectWhenWsconnectionBreak++;
          socket.close();
          store.dispatch({
            type: DENSITY_WS_CLOSED,
            payload: { connecting: false, opened: false }
          });
          //  socket.terminate();
          socketConnectionCount = 0;
          PongRecived = false;
        }
        socket = null;
        break;
      case DENSITY_WS_SUBSCRIBE_CREATE_ORDER: {
        if (payload?.type === "MARKET") {
          const symbolList3 = payload.data.map((item) => item?.symbol);
          symbolList = [...new Set([...symbolList3])];
          startApiPollingWhenStreamNotConnected(store, handleCreateMarketOrderEvent);
        } else {
          OrderIdList = payload.data.map((item) => item?.idUuid);
          startApiPollingWhenStreamNotConnected(store, handleCreateLimitsOrderEvent);
        }

        break;
      }
      case DENSITY_WS_SUBSCRIBE_CLOSE_ORDER: {
        EventType = payload.eventType;
        symbolList = payload.data.map((item) => item.symbol);
        startApiPollingWhenStreamNotConnected(store, handleCreateMarketOrderEvent);
        break;
      }
      default:
        return next(action);
    }
  };
};

export default densitySocketMiddleware();
