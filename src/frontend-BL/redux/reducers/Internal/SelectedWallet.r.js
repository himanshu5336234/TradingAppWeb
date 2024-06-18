import { SET_SELECTED_WALLET_SUCCESS, SET_SELECTED_WALLET_FAIL } from "../../../redux/constants/Constants";

const initialState = {
  selectedWallet: ""
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SELECTED_WALLET_SUCCESS:
      return {
        ...state,
        selectedWallet: payload.wallet
      };
    case SET_SELECTED_WALLET_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
