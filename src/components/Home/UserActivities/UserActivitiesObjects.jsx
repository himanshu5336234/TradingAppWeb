export const UA_HEADER = [
  {
    order: 0,
    name: "Positions({0})",
    showCsv: 0
  },
  {
    order: 1,
    name: "Open Orders({1})",
    showCsv: 0
  },
  {
    order: 2,
    name: "Order History",
    showCsv: 1
  },
  {
    order: 3,
    name: "Position History",
    showCsv: 1
  }
];

export const PositionCategoryHeader = [
  {
    id: 0,
    name: "Basic details",
    gridSize: 7.5
  },
  {
    id: 1,
    name: "Margin details",
    gridSize: 2.1
  },
  {
    id: 2,
    name: "PnL details",
    gridSize: 1.2
  },
  {
    id: 3,
    name: "Total PnL",
    gridSize: 1.2
  }
];

export const PositionColumnName = [
  {
    field: "col1",
    headerName: "Symbol",
    width: 150,
    renderCell: (params) => {
      params.row.Symbol?.toUpperCase();
    }
  },
  {
    field: "col2",
    headerName: "Side",
    width: 80
  },
  {
    field: "col3",
    headerName: "Size(In Contract)",
    width: 150
  },
  {
    field: "col4",
    headerName: "Size(In Value)",
    width: 150
  },
  {
    field: "col5",
    headerName: "Leverage",
    width: 100
  },
  {
    field: "col6",
    headerName: "Entry Price",
    width: 150
  },
  {
    field: "col7",
    headerName: "Liq. Price",
    width: 150
  },
  {
    field: "col8",
    headerName: "Last Price",
    width: 150
  },
  {
    field: "col9",
    headerName: "Margin Ratio",
    width: 150
  },
  {
    field: "col10",
    headerName: "Profit/Loss",
    width: 150
  }
];

export const PositionTableRowData = [
  {
    id: 0,
    col1: "",
    col2: "",
    col3: "",
    col4: "",
    col5: "",
    col6: "",
    col7: "",
    col8: "",
    col9: "",
    col10: ""
  }
];

export const PositionHeader = [
  {
    id: 0,
    name: "Contract",
    tooltip: "",
    gridSize: 1.5,
    align: "left"
  },
  {
    id: 1,
    name: "Side",
    tooltip: "",
    gridSize: 0.6,
    align: "left"
  },
  {
    id: 2,
    name: "Size",
    tooltip: "",
    gridSize: 1.2,
    align: "left"
  },

  {
    id: 3,
    name: "Mark Price ",
    tooltip: "",
    gridSize: 1,
    align: "left"
  },

  {
    id: 4,
    name: "Entry Price",
    // tooltip: "position taken",
    gridSize: 1,
    align: "left"
  },
  {
    id: 5,
    name: "Liq. Price",
    tooltip: "Liquidation price is the price beyond which trader can not hold the position since margin drops below maintenance margin to hold the position at the liquidation price.",
    gridSize: 1,
    align: "left"
  },

  {
    id: 6,
    name: "Margin",
    tooltip: "Margin is funds allocated to this position, However, in case of Cross Mode whole Cross Wallet is allocated as collateral.",
    gridSize: 1.2,
    align: "left"
  },
  {
    id: 7,
    name: "Margin Ratio",
    tooltip: "Margin ratio is maintenance margin divided by margin balance, in case of a 100% margin ratio position will get liquidated..",
    gridSize: 1,
    align: "left"
  },
  {
    id: 8,
    name: "P&L (USDT)",
    tooltip: "Calculated on mark price",
    gridSize: 1,
    align: "left"
  },
  {
    id: 9,
    name: "",
    tooltip: "",
    gridSize: 2.5
  }
];

export const OpenOrderSubHeader = [
  {
    id: 0,
    name: "CREATED AT",
    gridSize: 1
  },
  {
    id: 2,
    name: "Contract",
    gridSize: 1.2
  },
  {
    id: 3,
    name: "Order Type",
    gridSize: 1.4
  },
  {
    id: 4,
    name: "Side",
    gridSize: 1
  },
  {
    id: 5,
    name: "LIMIT Price",
    gridSize: 1
  },
  {
    id: 6,
    name: "Trigger Price",
    gridSize: 1.2
  },
  {
    id: 7,
    name: "Notional Size",
    gridSize: 1.2
  },
  {
    id: 8,
    name: "Filled",
    gridSize: 1.2
  },
  {
    id: 9,
    name: "Reduce Only",
    gridSize: 1
  },
  {
    id: 10,
    name: "",
    gridSize: 0.8
  },
  {
    id: 11,
    name: "",
    gridSize: 0.8,
    icon: true
  }
];
export const TradeHistorySubHeader = [
  {
    id: 0,
    name: "Time",
    gridSize: 1.8
  },
  {
    id: 1,
    name: "Symbol",
    gridSize: 1.7
  },
  {
    id: 2,
    name: "Side",
    gridSize: 1.7
  },
  {
    id: 3,
    name: "Price",
    gridSize: 1.7
  },
  {
    id: 4,
    name: "Quantity",
    gridSize: 1.7
  },
  {
    id: 5,
    name: "Fee",
    gridSize: 1.7
  },
  {
    id: 6,
    name: "Realized Profit",
    gridSize: 1.7
  }
];

export const TransactionHistorySubHeader = [
  {
    id: 0,
    name: "Time",
    gridSize: 2.4
  },
  {
    id: 1,
    name: "Type",
    gridSize: 2.4
  },
  {
    id: 2,
    name: "Amount",
    gridSize: 2.4
  },
  {
    id: 3,
    name: "Asset",
    gridSize: 2.4
  },
  {
    id: 4,
    name: "Symbol",
    gridSize: 2.4
  }
];
export const AssetSubheader = [
  {
    id: 0,
    name: "Assets",
    gridSize: 2.4
  },
  {
    id: 1,
    name: "Wallet Balance",
    gridSize: 2.4
  },
  {
    id: 2,
    name: "Unrealised PNL",
    gridSize: 2.4
  },
  {
    id: 3,
    name: "Margin Balance",
    gridSize: 2.4
  },
  {
    id: 4,
    name: "Available for Order",
    gridSize: 2.4
  }
];

// constants
export const BUY_SELL_MAP = {
  BUY: "LONG",
  SELL: "SHORT"
};

export const SIDES = {
  BOTH: "BOTH",
  BUY: "BUY",
  SELL: "SELL"
};

export const ORDER_TYPE_MAP = {
  MARKET: "MARKET",
  LIMIT: "LIMIT"
};

export const CLOSE_POSITIONS = "Close";

export const EXIT_MARKET = "Market";
export const EXIT_LIMIT = "Limit";

export const nanFallback = "--";

export const OrderHistorySubHeader = [
  {
    id: 0,
    name: "TIME",
    gridSize: 0.9
  },
  {
    id: 1,
    name: "SYMBOL",
    gridSize: 1.2
  },
  {
    id: 2,
    name: "SIDE",
    gridSize: 0.6
  },
  {
    id: 3,
    name: "ORDER TYPE",
    gridSize: 1.4
  },

  {
    id: 4,
    name: "Avg Execution Price",
    gridSize: 1.4
  },
  {
    id: 5,
    name: "Executed Size",
    gridSize: 1.2
  },

  {
    id: 6,
    name: "STATUS",
    gridSize: 1.3
  },
  {
    id: 7,
    name: "REDUCE ONLY",
    gridSize: 1.2
  },
  {
    id: 8,
    name: "Updated At",
    gridSize: 1
  },
  {
    id: 9,
    name: "",
    gridSize: 1
  }
];

export const NTradeHistorySubHeader = [
  {
    id: 0,
    name: "Execution Time",
    gridSize: 1.8
  },
  {
    id: 1,
    name: "Trade ID",
    gridSize: 1.5
  },
  {
    id: 2,
    name: "Execution Price",
    gridSize: 1.5
  },
  {
    id: 3,
    name: "Executed Qty",
    gridSize: 3.1
  },
  {
    id: 4,
    name: "P&L",
    gridSize: 1.5
  },
  {
    id: 5,
    name: "Role",
    gridSize: 0.9
  },
  {
    id: 6,
    name: "Trading Fee",
    gridSize: 1.7
  }
  // {
  //   id: 7,
  //   name: "Rebate",
  //   gridSize: 1.6
  // }
];

export const selectBoxMenuItems = {
  period: [
    {
      value: "1D",
      name: "1 Day"
    },
    {
      value: "1W",
      name: "1 Week"
    },
    {
      value: "1M",
      name: "1 Month"
    },
    {
      value: "3M",
      name: "3 Months"
    },
    {
      value: "Custom",
      name: "Custom"
    }
  ],
  orderType: [
    {
      name: "Order Type",
      value: "*"
    },
    {
      name: "Market",
      value: "MARKET"
    },
    {
      name: "Limit",
      value: "LIMIT"
    },
    {
      name: "Stop Market",
      value: "STOP_MARKET"
    },
    {
      name: "Stop Limit",
      value: "STOP"
    },
    {
      name: "Take Profit Market",
      value: "TAKE_PROFIT_MARKET"
    },
    {
      name: "Liquidation",
      value: "LIQUIDATION"
    }
  ],

  orderSide: [
    {
      value: "BUY",
      name: "Long"
    },
    {
      value: "SELL",
      name: "Short"
    }
  ],

  reduceOnly: [
    {
      value: "*",
      name: "Reduce Only"
    },
    {
      value: "true",
      name: "Yes"
    },
    {
      value: "false",
      name: "No"
    }
  ],

  status: [
    {
      value: "*",
      name: "Status"
    },
    {
      value: "FILLED",
      name: "Filled"
    },
    {
      value: "PARTIALLY_FILLED",
      name: "Partially Filled"
    },
    {
      value: "EXPIRED",
      name: "Expired"
    },
    {
      value: "CANCELLED",
      name: "Cancelled"
    },
    {
      value: "REJECTED",
      name: "Rejected"
    }
  ]
};
export const PnLHistorySubHeader = [
  {
    id: 0,
    name: "ENTRY TIME",
    gridSize: 1
  },
  {
    id: 1,
    name: "CONTRACT",
    gridSize: 1.2
  },
  {
    id: 2,
    name: "SIDE",
    gridSize: 0.6
  },
  {
    id: 3,
    name: "SIZE",
    gridSize: 0.6
  },

  {
    id: 4,
    name: "Entry Price",
    gridSize: 0.6
  },
  {
    id: 5,
    name: "Exit Price",
    gridSize: 0.6
  },
  {
    id: 6,
    name: "Exit Time",
    gridSize: 1.5
  },
  {
    id: 7,
    name: "Realised P&L (USDT)",
    gridSize: 1.4
  },
  {
    id: 8,
    name: "Fee Paid (USDT)",
    gridSize: 1.2
  }
];
export const NewPnLHistorySubHeader = [
  {
    id: 0,
    name: "Contract",
    gridSize: 1.5
  },
  {
    id: 1,
    name: "SIDE",
    gridSize: 1
  },
  {
    id: 2,
    name: "SIZE",
    gridSize: 1
  },
  {
    id: 3,
    name: "Entry Price(USDT)",
    gridSize: 1.5
  },

  {
    id: 4,
    name: "Exit Price(USDT)",
    gridSize: 1
  },
  {
    id: 5,
    name: "Entry Time",
    gridSize: 1
  },
  {
    id: 6,
    name: "Exit Time",
    gridSize: 1
  },
  {
    id: 7,
    name: "GROSS P&L (USDT)",
    gridSize: 1.2
  },
  {
    id: 8,
    name: "FEE (USDT)",
    gridSize: 1
  },
  {
    id: 9,
    name: "",
    gridSize: 1
  }
];
