// React hooks
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Assets, string and constants
import { getCurrencyUrl } from "../../../helpers/CurrencyLogo";

// import { USDT } from "../../../components/WatchList/WatchListObject";
import { USDT } from "./constants/WatchListObject";
// Components and helper components
// Actions
import { removeFavouriteSymbol, noAuthRemoveFavouriteSymbol } from "../../redux/actions/User/SetFavouriteSymbol.ac";
import { fetchFutureAccountDetails } from "@/frontend-BL/redux/actions/Futures/Futures.ac";
import { selectedSymbol } from "../../redux/actions/Internal/SetSelectedSymbol.ac";

import { useCheckLoginStatus } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";

export const useWatchListRowData = ({ symbol, watchlistID }) => {
  const dispatch = useDispatch();

  const symbolTickerData = useSelector((state) => state.BinanceStreamData.ticker.find((s) => s.symbol === symbol));

  const activeSymbolData = useSelector((state) => state.activeSymbolData.activeSymbols.find((s) => s.symbol === symbol));

  const percentage = useMemo(() => {
    if (!symbolTickerData) {
      return activeSymbolData?.percentage;
    }
    if (symbolTickerData !== undefined) {
      return symbolTickerData?.change24hpercent;
    }
  }, [symbolTickerData?.change24hpercent, activeSymbolData]);

  const { isLoggedIn } = useCheckLoginStatus();

  const handleFavClick = useCallback(
    (e) => {
      isLoggedIn ? dispatch(removeFavouriteSymbol(symbol, watchlistID)) : dispatch(noAuthRemoveFavouriteSymbol(symbol));
      e.stopPropagation();
    },
    [isLoggedIn]
  );

  const symbolLogo = useMemo(() => getCurrencyUrl(symbol && symbol.replace(USDT, "").toLowerCase()), [symbol]);

  const onBoxClick = () => {
    dispatch(fetchFutureAccountDetails());
    dispatch(selectedSymbol(symbol.toLowerCase()));
  };

  return {
    symbolLogo,
    percentage,
    handleFavClick,
    onBoxClick
  };
};
