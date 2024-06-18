import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { getUserWatchList } from "../../frontend-BL/redux/actions/User/GetWatchList.ac";
import { setProfileDetails } from "../../frontend-BL/redux/actions/User/SetProfile.ac";
import internetConnectionStatus from "../internetConnectionStatus";
import { getTradableCoins } from "@/frontend-BL/redux/actions/Futures/GetTradableCoins.ac";
function InitializeValuesForRedux() {
  const binanceWsStatus = useSelector((state) => state.wsConnection.binance.opened);
  const dispatch = useDispatch();
  const { isOnline } = internetConnectionStatus();
  useEffect(() => {
    if (isOnline && !binanceWsStatus) {
      dispatch(setProfileDetails());
      dispatch(getUserWatchList());
    }
  }, [isOnline]);
  return <React.Fragment />;
}
// TODO: Convert into a custom hook
export default InitializeValuesForRedux;
