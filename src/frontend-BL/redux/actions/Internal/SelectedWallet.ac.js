import { SET_SELECTED_WALLET_SUCCESS, SET_SELECTED_WALLET_FAIL } from "../../../redux/constants/Constants";

export const setSelectedWallet = (successFlag, selectedWallet) => (dispatch) => {
  if (successFlag) {
    dispatch({
      type: SET_SELECTED_WALLET_SUCCESS,
      payload: selectedWallet
    });
  } else {
    dispatch({
      type: SET_SELECTED_WALLET_FAIL,
      payload: ""
    });
  }
};
