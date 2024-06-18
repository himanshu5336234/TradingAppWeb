/* eslint-disable no-case-declarations */

import { GET_LEVERAGE_BRACKET_SUCCESS, GET_LEVERAGE_BRACKET_FAIL } from "../../../redux/constants/Constants";

const initialState = {
  leverageBracket: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LEVERAGE_BRACKET_SUCCESS:
      const bracketDataIndex = state.leverageBracket.findIndex((data) => data.symbol === payload.symbol);
      if (bracketDataIndex === -1) {
        return {
          ...state,
          leverageBracket: [...state.leverageBracket, payload]
        };
      } else {
        return {
          ...state,
          leverageBracket: [
            ...state.leverageBracket.slice(0, bracketDataIndex),
            {
              symbol: payload.symbol,
              brackets: payload.brackets
            },
            ...state.leverageBracket.slice(bracketDataIndex + 1)
          ]
        };
      }

    case GET_LEVERAGE_BRACKET_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
