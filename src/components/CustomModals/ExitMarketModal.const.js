export const BUY_SELL_MAP = {
  LONG: "BUY",
  SHORT: "SELL"
};

export const openOrderListHeaders = [
  {
    name: "Symbol",
    gridSize: 2
  },
  {
    name: "Side",
    gridSize: 2
  },
  {
    name: "Size",
    gridSize: 2
  },
  {
    name: "Price",
    gridSize: 2
  },
  {
    name: "Order ID",
    gridSize: 2
  },
  {
    name: "Close Order",
    gridSize: 2
  }
];

export const EXIT_LIMIT_MARKET_CONSTANTS = {
  ORDER_TYPE_LIMIT: "LIMIT",
  ORDER_TYPE_MARKET: "MARKET",
  EXIT_MARKET_ORDER_TITLE: "Close Position-Market Order",
  EXIT_LIMIT_ORDER_TITLE: "Close Position- Limit Order",
  CANCEL_LABEL: "Cancel",
  CLOSE_LABEL: "Close",
  QUOTE_ASSET_LABEL: " USDT",
  ENTER_PRICE_LABEL: "Price (in USDT): ",
  ENTER_SIZE_LABEL: "Size (in {0}):",
  MAX_LABEL: "Max",
  LAST_LABEL: "Last",
  MAXIMUM_SIZE_AVAILABLE_LABEL: "Maximum size available:",
  ESTIMATED_PNL_LABEL: "Estimated PnL:",
  LABEL_25X: "25%",
  LABEL_50X: "50%",
  LABEL_75X: "75%",
  LABEL_100X: "100%",
  EMPTY_SIZE_LABEL: "Empty quantity is not acceptable",
  EMPTY_PRICE_LABEL: "Empty price is not acceptable",
  SIZE_EXCEEDED_LABEL: "Quantity not available for placing the exit order. Please check if order already placed",
  INVALID_PRICE_LABEL: "Limit price must be greater than current market price in case of buy position and in case of sell it must be lower than current market price",
  EXIT_ORDER_SUCCESSFUL_SNACKBAR_LABEL: "Your exit order has been placed successfully",
  AVAILABLE_EXIT_ORDERS: "Available Exit Orders:"
};
