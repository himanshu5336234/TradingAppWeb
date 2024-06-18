/* eslint-disable react/react-in-jsx-scope */

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
    name: "Trade History",
    showCsv: 1
  },
  {
    order: 4,
    name: "Transaction History",
    showCsv: 1
  },
  {
    order: 5,
    name: "assets",
    showCsv: 1
  }
  // {
  //   order: 6,
  //   name: "Transfers",
  //   showCsv: 0
  // }
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
      <>{params.row.Symbol?.toUpperCase()}</>;
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
    name: "Symbol",
    tooltip: "",
    gridSize: 1.3
  },
  {
    id: 1,
    name: "Side",
    tooltip: "",
    gridSize: 0.5
  },
  {
    id: 2,
    name: "Size (In Contract)",
    tooltip: "",
    gridSize: 1
  },
  {
    id: 3,
    name: "Size (In USDT)",
    tooltip: "",
    gridSize: 1.1
  },
  {
    id: 4,
    name: "Lev.",
    tooltip: "Leverage",
    gridSize: 0.6
  },
  {
    id: 5,
    name: "Entry Price",
    tooltip: "position taken",
    gridSize: 1.1
  },
  {
    id: 6,
    name: "Liq. Price",
    tooltip: "Liquidation price is the price beyond which trader can not hold the position since margin drops to zero to hold the position at the liquidation price.",
    gridSize: 1
  },
  {
    id: 7,
    name: "Last Price",
    tooltip: "",
    gridSize: 0.9
  },
  {
    id: 8,
    name: "Margin Ratio",
    tooltip: "Margin ratio is maintenance margin divided by margin balance, in case of a 100% margin ratio position will get liquidated.",
    gridSize: 1
  },
  {
    id: 9,
    name: "Margin Used",
    tooltip: "Fund required to execute this order, reducing/exiting position does not cost any margin.",
    gridSize: 1.1
  },
  {
    id: 10,
    name: "Profit/Loss",
    tooltip: "",
    gridSize: 1.2
  }
];

export const OpenOrderSubHeader = [
  {
    id: 0,
    name: "Time",
    gridSize: 1
  },
  {
    id: 1,
    name: "OrderID",
    gridSize: 1
  },
  {
    id: 2,
    name: "Symbol",
    gridSize: 1
  },
  {
    id: 3,
    name: "Type",
    gridSize: 1
  },
  {
    id: 4,
    name: "Side",
    gridSize: 1
  },
  {
    id: 5,
    name: "Price",
    gridSize: 1
  },
  {
    id: 6,
    name: "Size (In Contract)",
    gridSize: 1
  },
  {
    id: 7,
    name: "Size (in USDT)",
    gridSize: 1
  },
  {
    id: 8,
    name: "Filled",
    gridSize: 1
  },
  {
    id: 9,
    name: "Reduce Only",
    gridSize: 1
  },
  {
    id: 10,
    name: "Trigger Price",
    gridSize: 1
  },
  {
    id: 11,
    name: "Cancel order",
    gridSize: 1,
    icon: true
  }
];

export const OrderHistorySubHeader = [
  {
    id: 0,
    name: "Time",
    gridSize: 1.5
  },
  {
    id: 1,
    name: "OrderID",
    gridSize: 1.25
  },
  {
    id: 2,
    name: "Symbol",
    gridSize: 1
  },
  {
    id: 3,
    name: "Type",
    gridSize: 1
  },
  {
    id: 4,
    name: "Side",
    gridSize: 1
  },
  {
    id: 5,
    name: "Average",
    gridSize: 1
  },
  {
    id: 6,
    name: "Price",
    gridSize: 1.3125
  },
  {
    id: 7,
    name: "Executed (Contract)",
    gridSize: 1.3125
  },
  {
    id: 8,
    name: "Executed (In USDT)",
    gridSize: 1.3125
  },
  {
    id: 9,
    name: "Status",
    gridSize: 1.3125
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
    name: "@/asset",
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
    name: "@/assets",
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
