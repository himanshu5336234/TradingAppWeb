/* eslint-disable no-case-declarations */
import { SET_POSITIONS_DATA, REMOVE_POSITIONS_QUANT, SET_CROSS_WALLET_BALANCE } from "../../../redux/constants/Constants";

const initialState = {
  currentPositions: [],
  crossWalletBalance: 0
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_POSITIONS_DATA:
      const findSymbol = state.currentPositions.findIndex((pos) => pos.sym === payload.sym);
      if (findSymbol !== -1 && state.currentPositions[findSymbol].sym === payload.sym) {
        return {
          ...state,
          currentPositions: [
            ...state.currentPositions.slice(0, findSymbol),
            {
              ...state.currentPositions[findSymbol],
              sym: payload.sym,
              size: payload.size,
              side: payload.side,
              entryPrice: payload.entryPrice,
              markPrice: payload.markPrice,
              liqPrice: payload.liqPrice,
              marginRatio: payload.marginRatio,
              margin: payload.margin,
              unPnl: payload.unPnl,
              marginBalance: payload.marginBalance,
              maintMargin: payload.maintMargin,
              mmr: payload.mmr,
              cum: payload.cum,
              marginType: payload.marginType,
              initialMargin: payload.initialMargin,
              unPnlWithLTP: payload.unPnlWithLTP
            },
            ...state.currentPositions.slice(findSymbol + 1)
          ]
        };
      } else {
        return {
          ...state,
          currentPositions: [...state.currentPositions, payload]
        };
      }

    case SET_CROSS_WALLET_BALANCE:
      return { ...state, crossWalletBalance: payload };

    case REMOVE_POSITIONS_QUANT:
      const existingSymbol = state.currentPositions.find((pos) => pos.sym === payload);
      if (existingSymbol !== undefined) {
        return {
          currentPositions: [...state.currentPositions.filter((data) => data.sym !== payload)]
        };
      } else {
        return {
          ...state
        };
      }

    default:
      return state;
  }
}
