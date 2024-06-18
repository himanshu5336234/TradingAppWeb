import { ITEMS_REQUESTED, ITEMS_RECEIVED } from "../../constants/Constants";

const initialState = {
  profileDetails: {},
  itemsRequested: false
};

export default function (state = initialState, action) {
  // const { type, payload } = action;
  switch (action.type) {
    case ITEMS_REQUESTED:
      return { ...state, itemsRequested: true };

    case ITEMS_RECEIVED:
      return { ...state, itemsRequested: false, items: action.payload };
    default:
      return state;
  }
}
