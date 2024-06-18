// MyContext.js
import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
// Define the initial state
const initialState = {
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
  leverageForSignalTrading: 1,
  sizeToggle: "USDT"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SIDE":
      return { ...state, side: action.payload };
    case "UPDATE_ORDER_TYPE":
      return { ...state, OrderType: action.payload };
    case "UPDATE_TRIGGER_PRICE":
      return { ...state, triggerPrice: action.payload };
    case "UPDATE_TRIGGER_PRICE_ERROR":
      return { ...state, triggerPriceError: action.payload };
    case "UPDATE_LIMIT_PRICE":
      return { ...state, limitPrice: action.payload };
    case "UPDATE_LIMIT_PRICE_ERROR":
      return { ...state, limitPriceError: action.payload };
    case "UPDATE_SIZE":
      return { ...state, size: action.payload };
    case "UPDATE_TAKE_PROFIT":
      return { ...state, takeProfit: action.payload };
    case "UPDATE_STOP_LOSS":
      return { ...state, stopLoss: action.payload };
    case "UPDATE_SIZE_ERROR":
      return { ...state, sizeError: action.payload };
    case "UPDATE_TAKE_PROFIT_ERROR":
      return { ...state, takeProfitError: action.payload };
    case "UPDATE_STOP_LOSS_ERROR":
      return { ...state, stopLossError: action.payload };
    case "UPDATE_QUANTITY_PERCENTAGE":
      return { ...state, quantityPercentage: action.payload };
    case "UPDATE_MAX_LEVERAGE_SIZE":
      return { ...state, maxLeverageSize: action.payload };
    case "UPDATE_MAX_LEVERAGE":
      return { ...state, maxLeverage: action.payload };
    case "UPDATE_LEVERAGE_DISABLE":
      return { ...state, leverageDisable: action.payload };
    case "UPDATE_LEVERAGE_ERROR":
      return { ...state, leverageError: action.payload };
    case "UPDATE_REDUCE_ONLY":
      return { ...state, isReduceOnly: action.payload };
    case "UPDATE_TAKE_PROFIT_STOP_LOSS_ACYIVE":
      return { ...state, isTakeProfitStopLossActive: action.payload };
    case "UPDATE_COST":
      return { ...state, costValue: action.payload };
    case "UPDATE_SIGNAL_TRADING_STATE":
      return { ...state, isSignalTrading: action.payload };
    case "UPDATE_LEVERAGE_FOR_SIGNAL_TRADING":
      return { ...state, leverageForSignalTrading: action.payload.leverage };
    case "UPDATE_SIZE_TOGGLE":
      return { ...state, sizeToggle: action.payload };
    default:
      return state;
  }
};

// Create the context
const OrderFormContext = createContext();

// Create a custom provider component
// eslint-disable-next-line react/prop-types
export const OrderFormNewWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OrderFormContext.Provider
      value={{
        state,
        dispatchOrderEvent: dispatch
      }}
    >
      {children}
    </OrderFormContext.Provider>
  );
};
OrderFormContext.PropTypes = {
  children: PropTypes.object
};
export default OrderFormContext;
