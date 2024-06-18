import WebSocketModule from "@/frontend-BL/helpers/WebSocketModule";
import { setInactiveTime } from "@/frontend-BL/redux/actions/User/SetProfile.ac";
import configureStore from "@/frontend-BL/redux/store/configureStore";
import { BINANCE_RESPONSE_MAP } from "@/frontend-BL/services/BinanceWebSocketService/Constants";
import { allTickerHandler } from "@/frontend-BL/services/BinanceWebSocketService/ResponseHandlers";
import { BASE_URL } from "@/frontend-api-service/Base";
import { isTimeDifferenceMoreThanThreshold } from "@/helpers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useHandleAlltickerSocketSubs = () => {
  const [connectionOpen, setConectionOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  let taskTimeout: string | number | NodeJS.Timeout | null | undefined = null;
  useEffect(() => {
    WebSocketModule.on(
      "open",
      () => {
        setConectionOpen(true);
        subscribeAndUnsubscribe("SUBSCRIBE");
      },
      []
    );

    document.addEventListener("visibilitychange", handleVisibility);

    const baseUrl = BASE_URL().binanceWsBase;
    if (!connectionOpen) {
      WebSocketModule.connect(baseUrl);
    }

    WebSocketModule.on("message", handleMessage);

    // Clean up the event listeners when the component is unmounted
    return () => {
      WebSocketModule.removeAllListeners();
      setConectionOpen(false);
      WebSocketModule.hardDisconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleVisibility = () => {
    if (document.hidden) {
      dispatch(setInactiveTime(new Date().getTime()));
      const delayInMilliseconds = 1 * 60 * 1000;
      taskTimeout = setTimeout(() => {
        WebSocketModule.disconnect();
      }, delayInMilliseconds);
    } else {
      clearTimeout(taskTimeout);
      const date1 = new Date().getTime();
      const date2 = configureStore.getState()?.profile?.inactiveTimestamp;
      if (isTimeDifferenceMoreThanThreshold(date1, date2, 1)) {
        WebSocketModule.disconnect();
        WebSocketModule.reconnect();
      }
    }
  };

  const handleMessage = (event: string) => {
    const streamData = JSON.parse(event);
    if (streamData.stream === BINANCE_RESPONSE_MAP.allticker) {
      allTickerHandler(streamData.data);
    }
  };

  const subscribeAndUnsubscribe = (method: string) => {
    const sub = {
      method: method,
      params: ["!ticker@arr", "!markPrice@arr"],
      id: 2
    };
    WebSocketModule.send(JSON.stringify(sub));
  };
};

export default useHandleAlltickerSocketSubs;
