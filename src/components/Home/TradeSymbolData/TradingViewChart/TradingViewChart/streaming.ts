import createStore from "@/frontend-BL/redux/store/configureStore";
const chartWS = () => {
  const streams = {};
  const tvIntervals = {
    "1s": "1s",
    1: "1m",
    3: "3m",
    5: "5m",
    15: "15m",
    30: "30m",
    60: "1h",
    120: "2h",
    240: "4h",
    360: "6h",
    480: "8h",
    720: "12h",
    D: "1d",
    "1D": "1d",
    "3D": "3d",
    W: "1w",
    "1W": "1w",
    M: "1M",
    "1M": "1M"
  };

  const generateSubscriptionParamFromUID = function (subscriberUID: string) {
    const id = subscriberUID.split("_#_");
    localStorage.setItem("user_pc_resolution_chart_density", JSON.stringify({ resolution: id[2] }));
    const paramStr = `${id[0].toLowerCase()}@kline_${tvIntervals[id[2]]}`;
    return paramStr;
  };

  function helperOnMessage(
    msg: string,
    paramStr: string,
    onRealtimeCallback: (arg0: { time: any; close: number; open: number; high: number; low: number; volume: number; closeTime: any; openTime: any }) => void
  ) {
    const sData = JSON.parse(msg);
    // const streamId = subscriptionMap.get(sData?.stream);
    try {
      if (sData.stream === paramStr && sData.data.k) {
        const { o, h, l, v, c, T, t } = sData.data.k;
        const lastSocketData = {
          time: t,
          close: Number(c),
          open: Number(o),
          high: Number(h),
          low: Number(l),
          volume: Number(v),
          closeTime: T,
          openTime: t
        };
        onRealtimeCallback(lastSocketData);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return {
    tvIntervals,

    subscribeOnStream: function (
      _symbolInfo: any,
      _resolution: any,
      onRealtimeCallback: (arg0: { time: any; close: number; open: number; high: number; low: number; volume: number; closeTime: any; openTime: any }) => void,
      subscribeUID: string,
      _onResetCacheNeededCallback: any,
      _lastDailyBar: any
    ) {
      try {
        const WebWorkerInstance = createStore.getState().getPersonalDetails.binanceWebWorkerInstance;
        const paramStr = generateSubscriptionParamFromUID(subscribeUID);
        // subscriptionMap.set(paramStr, subscribeUID);
        // activeSubscriptionStr.push(paramStr);
        const obj = {
          method: "SUBSCRIBE",
          params: [paramStr],
          id: 2
        };
        streams[subscribeUID] = {
          paramStr,
          listener: onRealtimeCallback
        };
        WebWorkerInstance.send(JSON.stringify(obj));

        WebWorkerInstance.on("message", (message: string) => {
          if (message) {
            helperOnMessage(message, paramStr, onRealtimeCallback);
          }
        });
      } catch (e) {
        console.error(e, "cslkdfmvlsfknvklfsvlkdsnvldksnv");
      }
    },

    unsubscribeFromStream: function (subscriberUID: string) {
      try {
        const WebWorkerInstance = createStore.getState().getPersonalDetails.binanceWebWorkerInstance;
        const subscriptionParams = generateSubscriptionParamFromUID(subscriberUID);
        const obj = {
          method: "UNSUBSCRIBE",
          params: [subscriptionParams],
          id: 1
        };
        WebWorkerInstance.send(JSON.stringify(obj));
        // delete streams[subscriberUID];
      } catch (e) {
        console.error(e);
      }
    }
  };
};

export default chartWS;
