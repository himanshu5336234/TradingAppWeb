export const HOOK_PARAMS = {
  BUY_TP_ONLY_POSITIONS: {
    symbol: "BTCUSDT",
    side: "BUY",
    size: 0.003,
    entryPrice: 42990,
    costValue: "7.15",
    isSignalTrading: false
  },
  SIGNAL_TRADING: {
    symbol: "BTCUSDT",
    side: "BUY",
    size: "",
    entryPrice: 45250,
    costValue: "",
    isSignalTrading: true
  },
  SELL_TP_ONLY_POSITIONS: {
    symbol: "BTCUSDT",
    side: "SELL",
    size: 0.003,
    entryPrice: 42990,
    costValue: "7.15",
    isSignalTrading: false
  },
  SELL_MATIC: {
    entryPrice: 0.9822,
    isSignalTrading: false,
    size: 6,
    costValue: "0.07",
    symbol: "MATICUSDT",
    side: "SELL"
  },
  BUY_GALA: {
    entryPrice: 0.02661,
    isSignalTrading: false,
    size: 189,
    costValue: "0.10",
    symbol: "GALAUSDT",
    side: "BUY"
  },
  BUY_ETH: {
    entryPrice: 2249.31,
    isSignalTrading: false,
    size: 0.009,
    costValue: "0.20",
    symbol: "ETHUSDT",
    side: "BUY"
  },
  SELL_BNB: {
    entryPrice: 307.78,
    isSignalTrading: false,
    size: 1,
    costValue: "3.96",
    symbol: "BNBUSDT",
    side: "SELL"
  }
};

const SELL_PARENT_DATA_BTC = {
  symbol: "BTCUSDT",
  stopPrice: "",
  price: "45500",
  averagePrice: "",
  side: "SELL",
  type: "LIMIT",
  quantity: "0.003"
};

const BUY_PARENT_DATA_BTC = {
  symbol: "BTCUSDT",
  stopPrice: "",
  price: "45500",
  averagePrice: "",
  side: "BUY",
  type: "LIMIT",
  quantity: "0.003"
};

const BUY_PARENT_DATA_BTC_STOP = {
  symbol: "BTCUSDT",
  stopPrice: "47500",
  price: "45500",
  averagePrice: "",
  side: "BUY",
  type: "STOP",
  quantity: "0.003"
};

const SELL_PARENT_DATA_BTC_STOP = {
  symbol: "BTCUSDT",
  stopPrice: "43500",
  price: "43000",
  averagePrice: "",
  side: "SELL",
  type: "STOP",
  quantity: "0.003"
};

const BUY_PARENT_DATA_BTC_TAKE_PROFIT_MARKET = {
  symbol: "BTCUSDT",
  stopPrice: "43500",
  price: "",
  averagePrice: "",
  side: "BUY",
  type: "TAKE_PROFIT_MARKET",
  quantity: "0.003"
};

const SELL_PARENT_DATA_BTC_STOP_MARKET = {
  symbol: "BTCUSDT",
  stopPrice: "43500",
  price: "",
  averagePrice: "",
  side: "SELL",
  type: "STOP_MARKET",
  quantity: "0.003"
};

export const OTOCO_PARAMS = {
  SELL_BTC_LIMIT_TP: {
    parentData: SELL_PARENT_DATA_BTC,
    data: {
      ID: "sjagd821710792iehu12t1",
      stopPrice: "43500"
    },
    childOrderType: "TAKE_PROFIT_MARKET",
    close: () => {}
  },
  SELL_BTC_LIMIT_SL: {
    parentData: SELL_PARENT_DATA_BTC,
    data: {
      ID: "sjagd821710792iehu12t1",
      stopPrice: "46500"
    },
    childOrderType: "STOP_MARKET",
    close: () => {}
  },

  BUY_BTC_LIMIT_SL: {
    parentData: BUY_PARENT_DATA_BTC,
    data: {
      ID: "sjagd821710792iehu12t1",
      stopPrice: "41500"
    },
    childOrderType: "STOP_MARKET",
    close: () => {}
  },

  BUY_BTC_LIMIT_TP: {
    parentData: BUY_PARENT_DATA_BTC,
    data: {
      ID: "sjagd821710792iehu12t1",
      stopPrice: "47500"
    },
    childOrderType: "TAKE_PROFIT_MARKET",
    close: () => {}
  },
  BUY_BTC_STOP_TP: {
    parentData: BUY_PARENT_DATA_BTC_STOP,
    data: {
      ID: "sjagd821710792iehu12t1",
      stopPrice: "48500"
    },
    childOrderType: "TAKE_PROFIT_MARKET",
    close: () => {}
  },

  SELL_BTC_STOP_SL: {
    parentData: SELL_PARENT_DATA_BTC_STOP,
    data: {
      ID: "sjagd821710792iehu12t1",
      stopPrice: "44500"
    },
    childOrderType: "STOP_MARKET",
    close: () => {}
  },
  BUY_BTC_TAKE_PROFIT_TP: {
    parentData: BUY_PARENT_DATA_BTC_TAKE_PROFIT_MARKET,
    data: {
      ID: "sjagd821710792iehu12t1",
      stopPrice: "45000"
    },
    childOrderType: "TAKE_PROFIT_MARKET"
  },

  BUY_BTC_TAKE_PROFIT_SL: {
    parentData: BUY_PARENT_DATA_BTC_TAKE_PROFIT_MARKET,
    data: {
      ID: "sjagd821710792iehu12t1",
      stopPrice: "41500"
    },
    childOrderType: "STOP_MARKET"
  },

  SELL_BTC_STOP_MARKET_SL: {
    parentData: SELL_PARENT_DATA_BTC_STOP_MARKET,
    data: {
      ID: "sjagd821710792iehu12t1",
      stopPrice: "45000"
    },
    childOrderType: "STOP_MARKET"
  },
  SELL_BTC_STOP_MARKET_TP: {
    parentData: SELL_PARENT_DATA_BTC_STOP_MARKET,
    data: {
      ID: "sjagd821710792iehu12t1",
      stopPrice: "42500"
    },
    childOrderType: "TAKE_PROFIT_MARKET"
  }
};

export const tickerPricemock = {
  data: {
    e: "24hrTicker",
    E: 1703746041734,
    s: "BTCUSDT",
    p: "247.00",
    P: "0.576",
    w: "43141.31",
    c: "43105.30",
    Q: "0.887",
    o: "42858.30",
    h: "43674.80",
    l: "42614.60",
    v: "102662.479",
    q: "4428993585.19",
    O: 1703659620000,
    C: 1703746041729,
    F: 276675889,
    L: 276758711,
    n: 82816
  },
  stream: "btcusdt@ticker"
};
