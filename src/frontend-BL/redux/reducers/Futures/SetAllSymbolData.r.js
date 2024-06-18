import { SET_ALL_SYMBOL_DATA_SUCCESS, SET_ALL_SYMBOL_DATA_FAIL } from "../../../redux/constants/Constants";

const initialState = {
  allSymbolData: ""
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALL_SYMBOL_DATA_SUCCESS:
      return {
        ...state,
        allSymbolData: payload.allSymbolData
      };
    case SET_ALL_SYMBOL_DATA_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
