export const getOrderSide = (side) => {
  switch (side) {
    case "BUY":
    case "Long":
      return "BUY";
    case "SELL":
    case "Short":
      return "SELL";
    default:
      return "";
  }
};

export const getReduceOnly = (ro) => {
  switch (ro) {
    case "true":
    case "Yes":
      return "true";
    case "false":
    case "No":
      return "false";
    default:
      return "";
  }
};

export const getOrderStatus = (status) => {
  switch (status) {
    case "FILLED":
    case "Filled":
      return "FILLED";
    case "PARTIALLY_FILLED":
    case "Partially Filled":
      return "PARTIALLY_FILLED";
    case "EXPIRED":
    case "Expired":
      return "EXPIRED";
    case "CANCELLED":
    case "Cancelled":
      return "CANCELED";
    case "REJECTED":
    case "Rejected":
      return "REJECTED";
    default:
      return null;
  }
};

export const getOrderType = (type) => {
  switch (type) {
    case "Market":
    case "MARKET":
      return "MARKET";
    case "STOP_MARKET":
    case "Stop Market":
      return "STOP_MARKET";
    case "STOP":
    case "Stop Limit":
      return "STOP";
    case "LIMIT":
    case "Limit":
      return "LIMIT";
    case "TAKE_PROFIT_MARKET":
    case "Take Profit Market":
      return "TAKE_PROFIT_MARKET";
    case "TAKE_PROFIT":
    case "Take Profit":
      return "TAKE_PROFIT";
    default:
      return "OT_UNSPECIFIED";
  }
};
