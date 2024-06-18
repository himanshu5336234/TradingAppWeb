import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { internetOffline, internetOnline } from "../frontend-BL/redux/actions/Internal/InternetConnection.ac";

const internetConnectionStatus = () => {
  const dispatchAction = useDispatch();
  const isOnline = useSelector((state) => state.internetConnection.internet.isOnline);

  useEffect(() => {
    const handleOnline = () => {
      dispatchAction(internetOnline());
    };
    const handleOffline = () => {
      dispatchAction(internetOffline());
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return function cleanup() {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatchAction]);
  // Invokes the redux dispatchers when there is a change in the online status of the browser
  useEffect(() => {
    if (window.navigator.onLine && !isOnline) {
      dispatchAction(internetOnline());
    } else if (!window.navigator.onLine && isOnline) {
      dispatchAction(internetOffline());
    }
  }, [dispatchAction, isOnline]);
  return {
    isOnline
  };
};

export default internetConnectionStatus;
