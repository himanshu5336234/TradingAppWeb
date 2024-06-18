import { CHANGE_LAYOUT } from "../../constants/Constants";
const initialState = {
  Layout: {},
  Components: []
};

export default function (state = initialState, action: { type: string; payload: any }) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_LAYOUT:
      const { Layout, breakpoint } = payload;
      (window as any).localStorage.setItem("layout", JSON.stringify(Layout));
      return {
        ...state,
        Layout,
        breakpoint
      };
    case "CHANGE_COMPONENT":
      (window as any).localStorage.setItem("Components", JSON.stringify(payload));
      return {
        ...state,
        Components: payload
      };
    default:
      return state;
  }
}
