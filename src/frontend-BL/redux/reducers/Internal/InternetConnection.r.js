// import { INTERNET_ONLINE, INTERNET_OFFLINE } from "../actions";
import { INTERNET_ONLINE, INTERNET_OFFLINE } from "../../../redux/constants/Constants";

const initialState = {
  internet: {
    isOnline: true
  }
};
export default function (state = initialState, action) {
  switch (action.type) {
    case INTERNET_ONLINE:
      return { ...state, internet: { ...state.internet, isOnline: true } };
    case INTERNET_OFFLINE:
      return { ...state, internet: { ...state.internet, isOnline: false } };
    default:
      return state;
  }
}
