/* eslint-disable no-unused-vars */
import { saveOrderDetails } from "../../../redux/actions/Futures/saveOrderDetails.ac";
import axiosWithApiServer from "../../../../frontend-api-service/Utils/axiosHelpers/axiosWithApiServer";
import {
  GLOBAL_ERROR_REMOVE,
  GLOBAL_ERROR_ADD,
  ORDER_CREATION_SUCESS,
  ORDER_CREATION_FAIL,
  ORDER_CREATION_TP_SL_SUCESS,
  ORDER_CREATION_TP_SL_FAIL,
  DENSITY_WS_SUBSCRIBE_CREATE_ORDER
} from "../../../../frontend-BL/redux/constants/Constants";
import { getMetaDataApi, postMetaDataApi, placeOCOOrderApi } from "../../../../frontend-api-service/Api";
import { showSnackBar } from "../../../../frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
const MapOrder = {
  LIMIT: "Limit",
  MARKET: "Market",
  STOP_MARKET: "Stop Market",
  STOP: "Stop",
  TAKE_PROFIT: "Take Profit",
  TAKE_PROFIT_MARKET: "Take Profit Market"
};
// const saveMetaData = (params) => {
//   getMetaDataApi().then((data) => {
//     const ResponeData = data.data?.metadata;
//     const symbol = params.symbol;
//     const reqBody = {
//       ...ResponeData,
//       orderFormData: {
//         ...ResponeData?.orderFormData
//       }
//     };
//     reqBody.orderFormData[symbol] = params;
//     postMetaDataApi(JSON.stringify(reqBody));
//   });
// };
const placeStrategyOrders = (orderDetails, dispatch, navigationCallback, setShowLoader, setOrderConfirm, setOrderStatus, setOrderErrors) => {
  placeOCOOrderApi({ type: "STRATEGY_ORDER_TYPE_OTOCO", orders: orderDetails })
    .then((response) => {
      if (response?.data?.errors && response?.data?.errors?.length > 0) {
        setOrderStatus("failed");
        const errrorArr = [];
        response.data?.errors.map((err) => {
          errrorArr.push(err.message);
          dispatch(
            showSnackBar({
              src: ORDER_CREATION_TP_SL_FAIL,
              message: err.message,
              type: "failure"
            })
          );
        });
        setOrderErrors(errrorArr);

        // setIsOrderConfirmedModal(false);
      }
      if (response?.data?.data?.length > 0) {
        setOrderStatus("success");
        response.data.data.map(({ order }) => {
          dispatch(
            showSnackBar({
              src: ORDER_CREATION_TP_SL_SUCESS,
              message: `Your ${MapOrder[order?.type]} order has been created successfully`,
              type: "success"
            })
          );
        });

        setShowLoader(false);
        setOrderConfirm(false);
        navigationCallback(1);
        dispatch({
          type: DENSITY_WS_SUBSCRIBE_CREATE_ORDER,
          payload: {
            data: [response.data.data[0].order],
            type: response.data.data[0].order.type,
            eventType: "CREATE_ORDER"
          }
        });

        // saveMetaData(orderFormMetaData);
        // setIsOrderConfirmedModal(false);
      }
    })
    .catch(({ response }) => {
      dispatch(
        showSnackBar({
          src: ORDER_CREATION_TP_SL_FAIL,
          message: response.data.message,
          type: "failure"
        })
      );
      setOrderStatus("failed");
      setShowLoader(false);
      // setIsOrderConfirmedModal(false);
    });
};

export const createOrder = (params, lastTradedPrice, dispatch, setShowLoader, setOrderConfirm, navigationCallback, setOrderStatus, setOrderErrors) => {
  setShowLoader(true);
  if (!params.takeProfitEnabled && !params.stopLossEnabled) {
    const axiosWithApiServerPromise = axiosWithApiServer({
      method: "post",
      url: "/v2/futures/orders",
      body: JSON.stringify({
        ...params,
        type: `${returnOrderType(params, lastTradedPrice)}`
      }),
      headers: JSON.stringify({ accept: "*/*" })
    });
    axiosWithApiServerPromise
      .then((response) => {
        setShowLoader(false);
        setOrderConfirm(false);
        setOrderStatus("success");
        navigationCallback(params.type);
        dispatch(
          showSnackBar({
            src: ORDER_CREATION_SUCESS,
            message: "Your order has been created successfully",
            type: "success"
          })
        );
        dispatch({
          type: DENSITY_WS_SUBSCRIBE_CREATE_ORDER,
          payload: {
            data: [response?.data?.order],
            type: params.type === 0 ? "MARKET" : "LIMIT",
            eventType: "CREATE_ORDER"
          }
        });
      })
      .catch((err) => {
        setOrderStatus("failed");
        setOrderErrors(err.response?.data.message.split(":")[1]);
        dispatch(
          showSnackBar({
            src: ORDER_CREATION_FAIL,
            message: err.response?.data.message.split(":")[1],
            type: "failure"
          })
        );
        setShowLoader(false);
        setOrderConfirm(false);
      });
  } else if (params.takeProfitEnabled && params.stopLossEnabled) {
    const orderDetails = [];
    orderDetails.push({
      order: [
        {
          symbol: params.symbol,
          type: returnOrderType(params),
          side: params.side,
          price: params.price,
          reduceOnly: false,
          quantity: params.quantity
        }
      ]
    });
    if (params.stopPrice) {
      orderDetails[0].order[0].stopPrice = params.stopPrice;
    }
    orderDetails.push({
      order: [
        {
          symbol: params.symbol,
          side: params.side === "BUY" ? "SELL" : "BUY",
          type: "TAKE_PROFIT_MARKET",
          quantity: String(params.quantity),
          timeInForce: "GTE_GTC",
          reduceOnly: true,
          stopPrice: String(params.takeProfit)
        },
        {
          symbol: params.symbol,
          side: params.side === "BUY" ? "SELL" : "BUY",
          type: "STOP_MARKET",
          quantity: String(params.quantity),
          timeInForce: "GTE_GTC",
          reduceOnly: true,
          stopPrice: String(params.stopLoss)
        }
      ]
    });
    // orderDetails.push({
    //   order: []
    // });
    placeStrategyOrders(orderDetails, dispatch, navigationCallback, setShowLoader, setOrderConfirm, setOrderStatus, setOrderErrors);
  } else {
    const orderDetails = [];
    orderDetails.push({
      order: [
        {
          symbol: params.symbol,
          type: `${returnOrderType(params)}`,
          side: params.side === "BUY" ? "SELL" : "BUY",
          price: params.price,
          reduceOnly: false,
          quantity: params.quantity
        }
      ]
    });
    if (params.stopPrice) {
      orderDetails[0].order[0].stopPrice = params.stopPrice;
    }
    orderDetails.push({
      order: [
        {
          symbol: params.symbol,
          side: params.side === "BUY" ? "SELL" : "BUY",
          type: params.takeProfitEnabled ? "TAKE_PROFIT_MARKET" : "STOP_MARKET",
          quantity: String(params.quantity),
          timeInForce: "GTE_GTC",
          reduceOnly: true,
          stopPrice: params.takeProfitEnabled ? String(params.takeProfit) : String(params.stopLoss)
        }
      ]
    });
    placeStrategyOrders(orderDetails, dispatch, navigationCallback, setShowLoader, setOrderConfirm, setOrderStatus, setOrderErrors);
  }
};

const returnOrderType = (params, lastTradedPrice) => {
  if (params.type === 0) return "MARKET";
  if (params.type === 1) return "LIMIT";
  // Stop Market
  if (params.type === 2) {
    if (params.side === "BUY") {
      if (Number(params.stopPrice) < Number(lastTradedPrice)) {
        return "TAKE_PROFIT_MARKET";
      } else {
        return "STOP_MARKET";
      }
    } else if (params.side === "SELL") {
      if (Number(params.stopPrice) > Number(lastTradedPrice)) {
        return "TAKE_PROFIT_MARKET";
      } else {
        return "STOP_MARKET";
      }
    }
  }
  // Stop Limit
  if (params.type === 3) {
    if (params.side === "BUY") {
      if (Number(params.stopPrice) < Number(lastTradedPrice)) {
        return "TAKE_PROFIT";
      } else {
        return "STOP";
      }
    } else if (params.side === "SELL") {
      if (Number(params.stopPrice) > Number(lastTradedPrice)) {
        return "TAKE_PROFIT";
      } else {
        return "STOP";
      }
    }
  }
};
