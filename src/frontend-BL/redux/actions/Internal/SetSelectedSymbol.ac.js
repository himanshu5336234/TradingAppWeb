// import { isMobileDevice } from "../../../../frontend-api-service/Base";
import { SET_SELECTED_SYMBOL_SUCCESS } from "../../../redux/constants/Constants";

export const selectedSymbol = (value) => (dispatch) => {
  localStorage.setItem("selectedSymbolAuxiliary", value.toLowerCase());
  dispatch({
    type: SET_SELECTED_SYMBOL_SUCCESS,
    payload: { selectedSymbol: value }
  });
};
