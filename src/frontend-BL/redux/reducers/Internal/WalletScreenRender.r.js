import { WALLET_SCREEN_RENDER_SUCCESS, WALLET_SCREEN_RENDER_FAIL } from "../../../redux/constants/Constants";

const initialState = {
  walletScreenRenderFlag: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case WALLET_SCREEN_RENDER_SUCCESS:
      return {
        ...state,
        walletScreenRenderFlag: payload
      };
    case WALLET_SCREEN_RENDER_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
