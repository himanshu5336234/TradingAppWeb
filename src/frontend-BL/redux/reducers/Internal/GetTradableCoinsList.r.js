import { SET_TRADABLE_SYMBOL_LIST_FAIL, SET_TRADABLE_SYMBOL_LIST_SUCCESS } from "../../../redux/constants/Constants";

const initialState = {
  tradablesymbolList: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TRADABLE_SYMBOL_LIST_SUCCESS:
      return {
        ...state,
        tradablesymbolList: payload.tradablesymbolList
      };
    case SET_TRADABLE_SYMBOL_LIST_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
