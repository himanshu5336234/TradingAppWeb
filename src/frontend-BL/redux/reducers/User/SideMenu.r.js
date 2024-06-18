import { OPEN_SIDE_MENU } from "../../constants/Constants";
const initialState = {
  DrawerState: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_SIDE_MENU:
      return {
        ...state,
        DrawerState: payload
      };
    default:
      return state;
  }
}
