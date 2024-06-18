import { removeWatchList, setWatchList } from "@/frontend-api-service/Api/User/User";

import { REMOVE_FAVOURITE_SYMBOL, SET_FAVOURITE_SYMBOL } from "../../constants/Constants";

export const setFavouriteSymbol = (symbol, watchlistID) => (dispatch) => {
  setWatchList(
    JSON.stringify({
      addSymbols: [symbol],
      watchlistID
    })
  )
    .then((response) => {
      dispatch({
        type: SET_FAVOURITE_SYMBOL,
        payload: [symbol]
      });
    })
    .catch((err) => console.log("mt", err));
};
export const setFavouriteSymbolFromLocalStorage = (FavouriteSymbols, watchlistID) => async (dispatch) => {
  const WatchListSymbols = localStorage.getItem("WatchListSymbols") === null ? [] : JSON.parse(localStorage.getItem("WatchListSymbols"));
  if (WatchListSymbols.length > 0) {
    const newList = [...new Set([...FavouriteSymbols, ...WatchListSymbols])];
    setWatchList(JSON.stringify({ addSymbols: newList, watchlistID }))
      .then((res) => {
        dispatch({
          type: SET_FAVOURITE_SYMBOL,
          payload: newList
        });
        localStorage.removeItem("WatchListSymbols");
      })
      .catch((err) => console.log(err));
  }
};

export const noAuthSetFavouriteSymbol = (symbol) => (dispatch) => {
  const WatchListSymbols = localStorage.getItem("WatchListSymbols") === null ? [] : JSON.parse(localStorage.getItem("WatchListSymbols"));
  localStorage.setItem("WatchListSymbols", JSON.stringify([...new Set([...WatchListSymbols, symbol])]));
  dispatch({
    type: SET_FAVOURITE_SYMBOL,
    payload: [symbol]
  });
};

export const removeFavouriteSymbol = (symbol, watchlistID) => (dispatch) => {
  removeWatchList(
    JSON.stringify({
      watchlistID,
      removeSymbols: [symbol]
    })
  )
    .then((res) => {
      dispatch({
        type: REMOVE_FAVOURITE_SYMBOL,
        payload: symbol
      });
    })
    .catch((err) => console.log(err));
};
export const noAuthRemoveFavouriteSymbol = (symbol) => (dispatch) => {
  const WatchListSymbols = JSON.parse(localStorage.getItem("WatchListSymbols"));
  const productIndex = WatchListSymbols.findIndex((item) => item === symbol);
  WatchListSymbols.splice(productIndex, productIndex + 1);
  localStorage.setItem("WatchListSymbols", JSON.stringify([...WatchListSymbols]));
  dispatch({
    type: REMOVE_FAVOURITE_SYMBOL,
    payload: symbol
  });
};
