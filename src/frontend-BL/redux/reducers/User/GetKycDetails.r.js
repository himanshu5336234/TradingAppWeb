import { NEW_KYC_DETAILS } from "../../constants/Constants";

const initialState = {
  getKycDetails: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case NEW_KYC_DETAILS:
      return {
        ...state,
        getKycDetails: payload
      };
    default:
      return state;
  }
}
