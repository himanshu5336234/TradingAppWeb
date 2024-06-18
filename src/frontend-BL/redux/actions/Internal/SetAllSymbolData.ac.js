import { SET_ALL_SYMBOL_DATA_SUCCESS } from "../../../redux/constants/Constants";

export const setAllSymbolData = (value) => (dispatch) => {
  dispatch({
    type: SET_ALL_SYMBOL_DATA_SUCCESS,
    payload: { allSymbolData: value }
  });
};
