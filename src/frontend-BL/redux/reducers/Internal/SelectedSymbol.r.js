import { SET_SELECTED_SYMBOL_SUCCESS } from "../../../redux/constants/Constants";

const initialState = {
  selectedSymbol: ""
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SELECTED_SYMBOL_SUCCESS:
      return {
        ...state,
        selectedSymbol: payload.selectedSymbol
      };
    default:
      return state;
  }
}
