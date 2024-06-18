// /* eslint-disable prefer-const */
// import { BASE_URL } from "../../../frontend-api-service/Base";
// import { BINANCE_WEBSOCKET_CONNECTION, BINANCE_WEBSOCKET_SUBSCRIPTION, BINANCE_WS_OPENED, GLOBAL_ERROR_ADD, GLOBAL_ERROR_REMOVE } from "../../redux/constants/Constants";
// import createStore from "../../redux/store/configureStore";
// import { AllSYMBOLS, WS_STATE } from "./Constants";

// import SubscriptionManager from "./SubscriptionManager";

// /* eslint-disable no-unused-vars */

// class BinanceWebSocketService {
//   constructor() {
//     this.baseUrl = BASE_URL().binanceWsBase;
//     this.unsubQueue = [];
//     this.subQueue = [];
//     this.missedQueue = [];
//     this.subscriptionId = 1;
//     this.setState(WS_STATE.IDLE);
//   }

//   setState(state) {
//     this.state = state;
//   }

//   resendActiveSubscriptions() {
//     let resendInterval;
//     console.warn("Binance WS Closed");
//     this._ws = new WebSocket(this.baseUrl);
//     resendInterval = setTimeout(() => {
//       const previousSubs = SubscriptionManager.resendSubscriptions();
//       this._ws.send(JSON.stringify(previousSubs));
//       clearTimeout(resendInterval);
//     }, 3000);
//   }

//   createSocket() {
//     let heartBeat;
//     const socketStateHandler = (param) => {
//       if (param === WS_STATE.CONNECTING) {
//         this.setState(WS_STATE.CONNECTING);
//         createStore.dispatch({
//           type: BINANCE_WS_OPENED,
//           payload: { connecting: true, opened: false }
//         });
//       }
//       if (param === WS_STATE.CONNECTED) {
//         heartBeat = setInterval(() => {
//           const ping = {
//             id: 999,
//             method: "SUBSCRIBE",
//             params: ["ping"]
//           };
//           this._ws.send(JSON.stringify(ping));
//         }, 180000);
//         this.setState(WS_STATE.CONNECTING);
//         createStore.dispatch({
//           type: BINANCE_WS_OPENED,
//           payload: { connecting: false, opened: true }
//         });
//       }
//     };

//     if (this.state === WS_STATE.IDLE || this.state === WS_STATE.DISCONNECTED) {
//       socketStateHandler(WS_STATE.CONNECTING);
//       this._ws = new WebSocket(this.baseUrl);

//       this._ws.onopen = () => {
//         socketStateHandler(WS_STATE.CONNECTED);
//         if (this.missedQueue.length > 0) {
//           const count = this.missedQueue.length;
//           for (let i = 0; i < count; i++) {
//             const obj = this.generateSubscribeObject(this.missedQueue.method, this.missedQueue.params);
//             this._ws.send(obj);
//           }
//         }
//       };

//       this._ws.onclose = () => {
//         console.warn("Binance WS Closed");
//         clearInterval(heartBeat);
//         this.resendActiveSubscriptions();
//       };

//       this._ws.onerror = (err) => {
//         console.warn("WS Error", err);
//         clearInterval(heartBeat);
//         this.resendActiveSubscriptions();
//       };

//       this._ws.onmessage = (msg) => {
//         if (!msg?.data) return;
//         const streamData = JSON.parse(msg.data);
//         try {
//           const stopRender = createStore.getState()?.getPersonalDetails?.renderingStop;

//           // if (streamData && streamData.data && !stopRender) {
//           //   if (streamData.stream === BINANCE_RESPONSE_MAP.markPriceAll) {
//           //     markPriceAllHandler(streamData.data);
//           //   }
//           //   if (streamData.stream === BINANCE_RESPONSE_MAP.allticker) {
//           //     allTickerHandler(streamData.data);
//           //   } else {
//           //     const { e } = streamData.data;
//           //     if (e === BINANCE_RESPONSE_MAP.ltp) {
//           //       ltpHandler(streamData.data);
//           //     }
//           //     if (e === BINANCE_RESPONSE_MAP.markPrice) {
//           //       markPriceHandler(streamData.data);
//           //     }
//           //     if (e === BINANCE_RESPONSE_MAP.ticker) {
//           //       tickerHandler(streamData.data);
//           //     }
//           //     if (e === BINANCE_RESPONSE_MAP.depth) {
//           //       depthUpdateHandler(streamData.data);
//           //     }
//           //     // if (e === BINANCE_RESPONSE_MAP.kline) {
//           //     //   klinesHandler(streamData.data.k);
//           //     // }
//           //   }
//           // }
//         } catch (e) {
//           createStore.dispatch({
//             type: GLOBAL_ERROR_ADD,
//             payload: {
//               src: BINANCE_WEBSOCKET_CONNECTION,
//               errorMessage: `Our server is facing some issues - ${e}`,
//               dialogType: "failure",
//               errorUi: "SNACKBAR",
//               errorHandlerForReduxStateUpdation: () =>
//                 createStore.dispatch({
//                   type: GLOBAL_ERROR_REMOVE,
//                   payload: { src: BINANCE_WEBSOCKET_CONNECTION }
//                 })
//             }
//           });
//         }
//       };
//     }
//   }

//   generateSubscribeObject(subMethod, subParams) {
//     if (subParams !== undefined && subParams.length !== 0) {
//       const subBatch = subParams.filter((d) => d.length > 0);
//       return {
//         method: subMethod,
//         params: subBatch,
//         id: ++this.subscriptionId
//       };
//     }
//   }

//   subscribe(payload, type) {
//     const { symbol, methods, source, res } = payload;
//     try {
//       if (symbol === AllSYMBOLS) {
//         const allSybolsSub = SubscriptionManager.multipleSymbolSubHandler(type);
//         if (this._ws.readyState === 1) {
//           this._ws.send(JSON.stringify(allSybolsSub));
//         } else {
//           this.queue.push(JSON.stringify(allSybolsSub));
//         }
//       } else {
//         let subscribtionInterval;
//         const activeSubs = SubscriptionManager.activeSubscriptionHandler(symbol, methods, source, type, res);
//         if (typeof activeSubs === "object") {
//           this.subQueue = [...activeSubs, ...this.subQueue];
//         }

//         if (this._ws.readyState === 1) {
//           if (this.subQueue.length !== 0) {
//             subscribtionInterval = setInterval(() => {
//               const finalObj = this.generateSubscribeObject(type, this.subQueue);
//               if (finalObj !== undefined && finalObj.params.length > 0) {
//                 this._ws.send(JSON.stringify(finalObj));
//                 this.subQueue.length = 0;
//                 clearInterval(subscribtionInterval);
//               }
//             }, 300);
//           }
//         } else {
//           this.missedQueue.push({ method: type, params: activeSubs });
//         }
//       }
//       // TODO - Do we need to add resiliency here? Perhaps add symbol to queue?
//     } catch (e) {
//       createStore.dispatch({
//         type: GLOBAL_ERROR_ADD,
//         payload: {
//           src: BINANCE_WEBSOCKET_SUBSCRIPTION,
//           errorMessage: `Error Processing your subscription - ${e}`,
//           dialogType: "failure",
//           errorUi: "SNACKBAR",
//           errorHandlerForReduxStateUpdation: () =>
//             createStore.dispatch({
//               type: GLOBAL_ERROR_REMOVE,
//               payload: { src: BINANCE_WEBSOCKET_SUBSCRIPTION }
//             })
//         }
//       });
//     }
//   }

//   unsubscribe(payload, type) {
//     const { symbol, methods, source, res } = payload;
//     try {
//       if (symbol === AllSYMBOLS) {
//         const allSybolsSub = SubscriptionManager.multipleSymbolSubHandler(type);
//         if (this._ws.readyState === 1) {
//           this._ws.send(JSON.stringify(allSybolsSub));
//         } else {
//           this.missedQueue.push(JSON.stringify(allSybolsSub));
//         }
//       } else {
//         let subscribtionInterval;
//         const activeUnSubs = SubscriptionManager.activeSubscriptionHandler(symbol, methods, source, type, res);
//         this.unsubQueue = [...this.unsubQueue, ...activeUnSubs];
//         if (this._ws.readyState === 1) {
//           if (this.unsubQueue.length !== 0) {
//             subscribtionInterval = setInterval(() => {
//               const finalObj = this.generateSubscribeObject(type, this.unsubQueue);
//               if (finalObj !== undefined && finalObj.params.length > 0) {
//                 this._ws.send(JSON.stringify(finalObj));
//                 this.unsubQueue = [];
//                 clearInterval(subscribtionInterval);
//               }
//             }, 300);
//           }
//         } else {
//           this.missedQueue.push({ method: type, params: activeUnSubs });
//         }
//       }
//       // TODO - Do we need to add resiliency here? Perhaps add symbol to queue?
//     } catch (e) {
//       createStore.dispatch({
//         type: GLOBAL_ERROR_ADD,
//         payload: {
//           src: BINANCE_WEBSOCKET_SUBSCRIPTION,
//           errorMessage: `Error Processing your unsubscription - ${e}`,
//           dialogType: "failure",
//           errorUi: "SNACKBAR",
//           errorHandlerForReduxStateUpdation: () =>
//             createStore.dispatch({
//               type: GLOBAL_ERROR_REMOVE,
//               payload: { src: BINANCE_WEBSOCKET_SUBSCRIPTION }
//             })
//         }
//       });
//     }
//   }

//   disconnect() {
//     // TODO - To be used when the app goes in background / when Socket type is changed
//     // TODO - Ensure cleanup of all callback
//     this._ws.close();
//     this.setState(WS_STATE.DISCONNECTED);
//   }
// }

// export default new BinanceWebSocketService();
