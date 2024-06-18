/* eslint-disable no-undef */
import { combineReducers } from "redux";
import getKycDetails from "./User/GetKycDetails.r";
import getBankDetails from "./User/GetBankDetails.r";
// import AggTradeStatus from "./User/ProfileLoaders.r";
import DrawerState from "./User/SideMenu.r";
import ChangeInAsset from "./User/ChangeInAsset";
// import leverage from "./Futures/SetLeverage.r";
import profile from "./User/SetProfile.r";
import futures from "./Futures/Futures.r";
import dateSelection from "./Internal/DateRange.r";
import wsConnection from "./Internal/WebSocket.r";
import internetConnection from "./Internal/InternetConnection.r";
// import openInterest from "./Futures/GetOpenInterest.r";
import tradablesymbolList from "./Internal/GetTradableCoinsList.r";
import selectSymbol from "./Internal/SelectedSymbol.r";
import availableBalance from "./User/AvailableBalance.r";
import allSymbolData from "./Futures/SetAllSymbolData.r";
import userRecentTrades from "./Futures/GetRecentUserTrades.r";
import leverageBracket from "./Futures/LeverageBracket.r.js";
import selectedWallet from "./Internal/SelectedWallet.r";
import walletScreenRender from "./Internal/WalletScreenRender.r";
import currentPositions from "./Futures/CalculatedPositions.r";
import OpenOrdersStream from "./Futures/OpenOrders.r";
import BinanceStreamData from "./Middleware/PublicStream.r";
import GlobalErrorHandler from "./Internal/GlobalErrorHandler.r";
import activeSymbolData from "./Futures/ActiveSymboldata.r";
import favouriteSymbols from "./Internal/SetFavouriteSymbol.r";
import GetApiTableData from "./Setting/GetApiTableData.r";
import GetUserPreferences from "./Setting/GetUserPreferences.r";
import positionsDirectory from "./Futures/CurrentPositions.r";
import orderFormHelper from "./Internal/OrderFormHelper.r";
import saveOrderDetails from "./Futures/saveOrderDetails.r";
import getPersonalDetails from "./Setting/GetPersonalDetails.r";
import profileDetails from "./User/GetProfile.r";
import TotalProfitLossBasedOn from "./User/TotalProfitLossBasedOn.r";
import OrderBook from "./Internal/OrderBook.r";
import SignalTrading from "./SignalTrading/SignalTrading.r";
import FallbackHandler from "./Internal/FallbackHandler.r";
import Layout from "./User/Layout.r";

const appReducer = combineReducers({
  futures,
  dateSelection,
  wsConnection,
  internetConnection,
  // leverage,
  profile,
  // openInterest,
  tradablesymbolList,
  allSymbolData,
  selectSymbol,
  availableBalance,
  userRecentTrades,
  leverageBracket,
  selectedWallet,
  walletScreenRender,
  currentPositions,
  OpenOrdersStream,
  BinanceStreamData,
  GlobalErrorHandler,
  activeSymbolData,
  favouriteSymbols,
  positionsDirectory,
  orderFormHelper,
  // AggTradeStatus,
  GetApiTableData,
  GetUserPreferences,
  getPersonalDetails,
  getKycDetails,
  getBankDetails,
  saveOrderDetails,
  profileDetails,
  OrderBook,
  SignalTrading,
  FallbackHandler,
  ChangeInAsset,
  DrawerState,
  TotalProfitLossBasedOn,
  Layout
});

const rootReducer = (state: any, action: any) => {
  // Clear all data in redux store to initial.
  if (action.type === "DESTROY_SESSION") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
