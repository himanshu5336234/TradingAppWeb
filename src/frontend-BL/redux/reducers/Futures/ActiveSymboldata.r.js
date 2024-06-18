/* eslint-disable no-case-declarations */
import { SET_ALL_TICKER_DATA, SET_MARK_PRICE_ALL_DATA, ACTIVE_SYMBOLS_MAP } from "../../../redux/constants/Constants";
const initialState = {
  activeSymbols: [],
  markPriceAll: [],
  activeSymbolsMap: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALL_TICKER_DATA:
      const symbolIndex = state.activeSymbols.findIndex((itm) => itm.symbol === payload.symbol);
      if (symbolIndex !== -1 && state.activeSymbols[symbolIndex].symbol === payload.symbol) {
        return {
          ...state,
          activeSymbols: [
            ...state.activeSymbols.slice(0, symbolIndex),
            {
              ...state.activeSymbols[symbolIndex],
              symbol: payload.symbol,
              percentage: payload.percentage,
              lp: payload.lp,
              vol: payload.vol,
              colorIndicator: payload.colorIndicator,
              markPrice: payload?.markPrice
            },
            ...state.activeSymbols.slice(symbolIndex + 1)
          ]
        };
      } else {
        return {
          ...state,
          activeSymbols: [...state.activeSymbols, payload]
        };
      }
      break;
    case ACTIVE_SYMBOLS_MAP:
      const symbolsMap = { ...state.activeSymbolsMap };
      symbolsMap[payload.symbol] = payload;
      return { ...state, activeSymbolsMap: symbolsMap };
    case SET_MARK_PRICE_ALL_DATA:
      return {
        ...state,
        markPriceAll: payload
      };
    default:
      return state;
  }
}
