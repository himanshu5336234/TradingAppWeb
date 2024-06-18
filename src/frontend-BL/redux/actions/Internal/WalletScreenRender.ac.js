import { WALLET_SCREEN_RENDER_SUCCESS, WALLET_SCREEN_RENDER_FAIL } from "../../../redux/constants/Constants";

export const walletScreenRender = (successFlag, walletScreenRenderFlag) => (dispatch) => {
  if (successFlag) {
    dispatch({
      type: WALLET_SCREEN_RENDER_SUCCESS,
      payload: walletScreenRenderFlag
    });
  } else {
    dispatch({
      type: WALLET_SCREEN_RENDER_FAIL,
      payload: ""
    });
  }
};
