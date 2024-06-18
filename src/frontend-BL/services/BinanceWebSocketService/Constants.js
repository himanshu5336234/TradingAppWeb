export const WS_TYPE = {
  MARKET: "MARKET",
  TRADE: "TRADE"
  // Others
};

export const WS_STATE = {
  IDLE: "IDLE",
  CONNECTING: "CONNECTING",
  CONNECTED: "CONNECTED",
  RECONNECTING: "RECONNECTING",
  DISCONNECTED: "DISCONNECTED"
};

export const BINANCE_METHODS = {
  SUBSCRIBE: "SUBSCRIBE",
  UNSUBSCRIBE: "UNSUBSCRIBE"
};

export const BINANCE_SUBSCRIBTION_SERVICE = {
  markPrice: "markPrice@1s",
  ticker: "ticker",
  ltp: "aggTrade",
  depth: "depth",
  klines: "kline",
  tickerAll: "!ticker@arr",
  markPriceAll: "!markPrice@arr"
};

export const SUB_SRC_MAP = {
  POS: "POSITIONS",
  MS: "MARKET_SEGMENT",
  OB: "ORDER_BOOK",
  RT: "RECENT_TRADES",
  CT: "CHARTS",
  SM: "SIDE_MENU",
  WL: "WATCH_LIST"
};

export const BINANCE_RESPONSE_MAP = {
  ltp: "aggTrade",
  markPrice: "markPriceUpdate",
  ticker: "24hrTicker",
  depth: "depthUpdate",
  kline: "kline",
  allticker: "!ticker@arr",
  markPriceAll: "!markPrice@arr"
};

export const AllSYMBOLS = "AllSYMBOLS";
