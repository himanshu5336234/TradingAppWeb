interface OrderbookState {
  symbol: string;
  bids: number[][];
  asks: number[][];
  bidsSnapShot: number[][];
  asksSnapShot: number[][];
  loading: boolean;
}

const initialState: OrderbookState = {
  bids: [],
  asks: [],
  loading: false,
  asksSnapShot: [],
  bidsSnapShot: [],
  symbol: ""
};
function findAndDelete(currentLevels: any[], orders: any[], type: string) {
  if (currentLevels) {
    const index =
      type === "BIDS"
        ? currentLevels.findIndex((item) => Number(item[0]) <= Number(orders[orders.length - 1][0]))
        : currentLevels.findIndex((item) => Number(item[0]) >= Number(orders[orders.length - 1][0]));
    return orders.concat(currentLevels.slice(index + 1));
  }
}
function addTotalSums(orders: any[]) {
  let sum = 0;
  return orders.map((item) => {
    sum += Number(item[1]);
    item[2] = sum;
    return item;
  });
}
export default function (state = initialState, action: { type: string; payload: any }) {
  const { type, payload } = action;
  switch (type) {
    /// new orderbook
    case "SET_ORDER_BOOK_LOADING":
      return { ...state, loading: true, asksSnapShot: [], asks: [], bids: [], bidsSnapShot: [], symbol: payload };
    case "SET_ORDER_BOOK_BINANCE":
      return {
        ...state,
        asksSnapShot: payload.asks,
        bidsSnapShot: payload.bids,
        loading: false
      };
    case "SET_ASKS": {
      if (payload.s === state.symbol) {
        const updatedAsksStream = addTotalSums(findAndDelete(state.asksSnapShot, payload.a, "ASKS"));

        return { ...state, asksSnapShot: updatedAsksStream };
      } else {
        return { ...state, asksSnapShot: [] };
      }
    }

    case "SET_BIDS": {
      if (state.symbol === payload.s) {
        const updatedBidsStream = addTotalSums(findAndDelete(state.bidsSnapShot, payload.b, "BIDS"));
        return { ...state, bidsSnapShot: updatedBidsStream };
      } else {
        return { ...state, bidsSnapShot: [] };
      }
    }

    default:
      return state;
  }
}
