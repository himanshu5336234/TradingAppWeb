import { GET_AGGTRADE_SUCCESS } from "../../constants/Constants";
const initialState = {
  AggTradeStatus: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_AGGTRADE_SUCCESS:
      return {
        ...state,
        AggTradeStatus: payload
      };
    default:
      return state;
  }
}
