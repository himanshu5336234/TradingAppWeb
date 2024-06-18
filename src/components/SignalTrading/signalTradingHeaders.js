export const LIVE_SIGNAL_HEADERS = [
  { id: 0, name: "DATE & TIME", gridSize: 1.4, isSelect: true },
  { id: 1, name: "CONTRACT", gridSize: 1.9 },
  { id: 2, name: "SIDE", gridSize: 1 },
  { id: 3, name: "TRIGGER PRICE", gridSize: 1.3 },
  { id: 4, name: "LIMIT PRICE", gridSize: 1.3 },
  { id: 5, name: "TP/SL", gridSize: 1.3 },
  { id: 6, name: "STATUS", gridSize: 1.5 },
  { id: 7, name: "ACTION", gridSize: 2.3 }
];

export const COMPLETED_SIGNAL_HEADERS = [
  { id: 0, name: "DATE & TIME", gridSize: 2 },
  { id: 1, name: "CONTRACT", gridSize: 2.3 },
  { id: 2, name: "SIDE", gridSize: 1.5 },
  { id: 3, name: "ROI %", gridSize: 1.5 },
  { id: 4, name: "STATUS", gridSize: 2.7 },
  { id: 5, name: "", gridSize: 2 }
];

export const DUMMY_LIVE_TRADING_DATA = [
  {
    id: 0,
    date: 1695627395,
    symbol: "BTCUSDT",
    side: "LONG",
    triggerPrice: "26000",
    price: "23000",
    tp: "32000",
    sl: "21000",
    status: "NEW",
    leverage: "10",
    roe: "-20",

    marginMode: "Isolated",
    completionReason: "Signal Deleted by Analyst"
  },
  {
    id: 1,
    date: 1695627395,
    symbol: "BTCUSDT",
    side: "SHORT",
    triggerPrice: "26000",
    price: "29000",
    tp: "23000",
    sl: "31000",
    status: "PUBLISHED",
    leverage: "10",
    marginMode: "Isolated",
    roe: "0",
    completionReason: "Signal Deleted by Analyst"
  },
  {
    id: 2,
    date: 1695627395,
    symbol: "BTCUSDT",
    side: "SHORT",
    triggerPrice: "26000",
    price: "29000",
    tp: "23000",
    sl: "31000",
    status: "TRIGGERED",
    leverage: "10",
    marginMode: "Isolated",
    roe: "10",
    completionReason: "TP/SL Hit"
  },
  {
    id: 2,
    date: 1695627395,
    symbol: "BTCUSDT",
    side: "SHORT",
    triggerPrice: "26000",
    price: "29000",
    tp: "23000",
    sl: "31000",
    status: "COMPLETED",
    leverage: "10",
    marginMode: "Isolated",
    roe: "10",
    completionReason: "TP/SL Hit"
  }
];

export const dummy_orders = [
  [
    {
      ID: "663c085e-9684-4d88-9001-af605ae1b309",
      userID: "42b65d95-4ffe-4da5-b2a5-db3bc33ace02",
      symbol: "BTCUSDT",
      side: "SELL",
      type: "TAKE_PROFIT_MARKET",
      status: "NEW",
      quantity: "0.001",
      executedQuantity: "0",
      price: "0",
      notionalQuantity: "0",
      averagePrice: "0",
      reduceOnly: true,
      timeInForce: "GTE_GTC",
      brokerOrderID: "3475146061",
      stopPrice: "32000",
      workingType: "",
      trades: [],
      isForcedOrder: false,
      forcedOrderType: "",
      hasSiblingOrders: true,
      createdAt: 1695724124670,
      updatedAt: 1695724125101
    },
    {
      ID: "9a67dd32-4ffd-4d9b-99a8-87fdc0aa3e28",
      userID: "42b65d95-4ffe-4da5-b2a5-db3bc33ace02",
      symbol: "BTCUSDT",
      side: "SELL",
      type: "STOP_MARKET",
      status: "NEW",
      quantity: "0.001",
      executedQuantity: "0",
      price: "0",
      notionalQuantity: "0",
      averagePrice: "0",
      reduceOnly: true,
      timeInForce: "GTE_GTC",
      brokerOrderID: "3475146062",
      stopPrice: "12000",
      workingType: "",
      trades: [],
      isForcedOrder: false,
      forcedOrderType: "",
      hasSiblingOrders: true,
      createdAt: 1695724124670,
      updatedAt: 1695724126994
    }
  ]
];

export const PRICE_SUMMARY_HEADER = [
  { id: 0, name: "EXECUTION TIME", gridSize: 2.5 },
  { id: 1, name: "CONTRACT", gridSize: 3.3 },
  { id: 2, name: "SIDE", gridSize: 1.5 },
  { id: 3, name: "ROI %", gridSize: 1.5 },
  { id: 4, name: "REASON", gridSize: 3.2 }
];

export const PRICE_SUMMARY_HEADER_COMPLETEDSIGNAL = [
  { id: 0, name: "EXECUTION TIME", gridSize: 2.5 },
  { id: 1, name: "CONTRACT", gridSize: 3.3 },
  { id: 2, name: "SIDE", gridSize: 1.5 },
  { id: 3, name: "ROI %", gridSize: 1.5 },
  { id: 4, name: "Status", gridSize: 3.2 }
];

export const USER_COMPLETED_SIGNAL_HEADERS = [
  { id: 0, name: "DATE & TIME", gridSize: 2 },
  { id: 1, name: "CONTRACT", gridSize: 2.3 },
  { id: 2, name: "SIDE", gridSize: 1 },
  { id: 3, name: "ROI %", gridSize: 1 },
  { id: 4, name: "COMPLETION REASON", gridSize: 2.7 },
  { id: 5, name: "", gridSize: 3 }
];

export const USER_LIVE_SIGNAL_HEADERS = [
  { id: 0, name: "DATE & TIME", gridSize: 2 },
  { id: 1, name: "CONTRACT", gridSize: 2.5 },
  { id: 2, name: "SIDE", gridSize: 1.5 },
  { id: 3, name: "LIMIT PRICE", gridSize: 2 },
  { id: 4, name: "TRIGGER PRICE", gridSize: 2 },
  { id: 5, name: "TP/SL", gridSize: 2 }
];

export const USER_REJECTED_SIGNAL_HEADERS = [
  { id: 0, name: "DATE & TIME", gridSize: 2 },
  { id: 1, name: "CONTRACT", gridSize: 2.3 },
  { id: 2, name: "SIDE", gridSize: 1.5 },
  { id: 3, name: "ROI %", gridSize: 1.5 },
  { id: 4, name: "REJECTED REASON", gridSize: 2.7 },
  { id: 5, name: "", gridSize: 2 }
];
