// import { NEW_BANK_DETAILS } from "BL/redux/constants/Constants";
import { NEW_BANK_DETAILS } from "../../constants/Constants";

const initialState = {
  getBankDetails: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case NEW_BANK_DETAILS:
      return {
        ...state,
        getBankDetails: payload
      };
    default:
      return state;
  }
}
