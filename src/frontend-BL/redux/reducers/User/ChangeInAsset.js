import { CHANGE_IN_ASSETS__STATE } from "../../constants/Constants";
const initialState = {
  ChangeInAsset: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_IN_ASSETS__STATE:
      return {
        ...state,
        ChangeInAsset: payload
      };
    default:
      return state;
  }
}
