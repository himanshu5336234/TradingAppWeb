/* eslint-disable no-case-declarations */
import {
  POSITIONS_FETCH_FAIL,
  OPEN_ORDERS_FETCH_SUCCESS,
  OPEN_ORDERS_FETCH_FAIL,
  ORDER_HISTORY_FETCH_SUCCESS,
  ORDER_HISTORY_FETCH_FAIL,
  TRADE_HISTORY_FETCH_SUCCESS,
  TRADE_HISTORY_FETCH_FAIL,
  TRANSACTION_HISTORY_FETCH_SUCCESS,
  TRANSACTION_HISTORY_FETCH_FAIL,
  FUTURES_ACCOUNT_INFO_FETCH_SUCCESS,
  FUTURES_ACCOUNT_INFO_FETCH_FAIL,
  ORDER_CREATION_SUCESS,
  ORDER_CREATION_FAIL,
  OPEN_ORDERS_UPDATE_SIZE_REST,
  ALL_ORDER_HISTORY_FETCH_SUCCESS,
  UPDATE_OPEN_ORDER
} from "../../../redux/constants/Constants";

const initialState = {
  accountInfo: [],
  positions: [],
  openOrders: [],
  orderHistory: [],
  allOrderHistory: [],
  tradeHistory: [],
  transactionHistory: [],
  // TODO: Review and rectify
  transfer: [],
  orderBook: [],
  orderData: []
};

// TODO: Segregate all reducers and add loading state
// TODO: Error Case Handling through a common state
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case POSITIONS_FETCH_FAIL:
      return {
        ...state
      };
    case OPEN_ORDERS_FETCH_SUCCESS:
      return {
        ...state,
        openOrders: payload
      };
    case OPEN_ORDERS_UPDATE_SIZE_REST:
      return {
        ...state,
        openOrders: payload
      };
    case UPDATE_OPEN_ORDER:
      return {
        ...state,
        openOrders: [...state.openOrders, payload]
      };
    case OPEN_ORDERS_FETCH_FAIL:
      return {
        ...state
      };
    case ORDER_HISTORY_FETCH_SUCCESS:
      return {
        ...state,
        orderHistory: payload
      };
    case ALL_ORDER_HISTORY_FETCH_SUCCESS:
      return {
        ...state,
        allOrderHistory: payload
      };
    case ORDER_HISTORY_FETCH_FAIL:
      return {
        ...state
      };
    case TRADE_HISTORY_FETCH_SUCCESS:
      return {
        ...state,
        tradeHistory: payload
      };
    case TRADE_HISTORY_FETCH_FAIL:
      return {
        ...state
      };
    case TRANSACTION_HISTORY_FETCH_SUCCESS:
      return {
        ...state,
        transactionHistory: payload
      };
    case TRANSACTION_HISTORY_FETCH_FAIL:
      return {
        ...state
      };
    case FUTURES_ACCOUNT_INFO_FETCH_SUCCESS:
      return {
        ...state,
        accountInfo: payload
      };

    case FUTURES_ACCOUNT_INFO_FETCH_FAIL:
      return {
        ...state
      };
    case ORDER_CREATION_SUCESS:
      return {
        ...state,
        orderData: payload
      };
    case ORDER_CREATION_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
