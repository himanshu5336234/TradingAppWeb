import { SET_SHOW_PROFIT_LOSS_BASED_ON, SET_SHOW_PROFIT_LOSS_FEES_ADJUSTED } from "../../constants/Constants";
const initialState = {
  TotalProfitLossBasedOn: "LTP",
  FeesAdjustedPnl: false
};

export default function (state = initialState, action: { type: string; payload: any }) {
  const { type, payload } = action;
  switch (type) {
    case SET_SHOW_PROFIT_LOSS_BASED_ON:
      return {
        ...state,
        TotalProfitLossBasedOn: payload
      };
    case SET_SHOW_PROFIT_LOSS_FEES_ADJUSTED:
      return {
        ...state,
        FeesAdjustedPnl: payload
      };
    default:
      return state;
  }
}
