import { SET_LIMIT_PRICE_HANDLER } from "../../../redux/constants/Constants";

const initialState = {
  limitPriceHandler: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LIMIT_PRICE_HANDLER:
      return {
        ...state,
        limitPriceHandler: payload
      };
    default:
      return state;
  }
}
