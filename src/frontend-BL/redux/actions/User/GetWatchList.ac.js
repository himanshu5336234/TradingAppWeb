import { getWatchList } from "@/frontend-api-service/Api/User/User";
import { GET_USER_WATCHLIST } from "../../../redux/constants/Constants";
import { setFavouriteSymbolFromLocalStorage } from "./SetFavouriteSymbol.ac";

export const getUserWatchList = () => (dispatch) => {
  getWatchList().then((response) => {
    const watchListArr = response?.data[0]?.watchlist;
    const watchlistID = response?.data[0]?.watchlistID;
    dispatch(setFavouriteSymbolFromLocalStorage(watchListArr, watchlistID));
    dispatch({
      type: GET_USER_WATCHLIST,
      payload: { watchListArr, watchlistID }
    });
  });
};
