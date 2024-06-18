/* eslint-disable no-case-declarations */
import { SET_FAVOURITE_SYMBOL, REMOVE_FAVOURITE_SYMBOL, GET_USER_WATCHLIST, SET_FAVOURITE_SYMBOLS_IN_VIEWPORT } from "../../../redux/constants/Constants";

const initialState = {
  watchlistID: "",
  favouriteSymbols: [],
  favouriteSymbolsInViewPort: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_FAVOURITE_SYMBOL:
      return {
        ...state,
        favouriteSymbols: [...new Set([...state.favouriteSymbols, ...payload])]
      };
    case REMOVE_FAVOURITE_SYMBOL:
      return {
        ...state,
        favouriteSymbols: state.favouriteSymbols.filter((symbol) => symbol !== payload)
      };

    case GET_USER_WATCHLIST:
      return {
        ...state,
        watchlistID: payload.watchlistID,
        favouriteSymbols: payload.watchListArr
      };
    case SET_FAVOURITE_SYMBOLS_IN_VIEWPORT:
      return {
        ...state,
        favouriteSymbolsInViewPort: payload
      };
    default:
      return state;
  }
}
