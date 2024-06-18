import configureStore from "@/frontend-BL/redux/store/configureStore";
import { selectedSymbol } from "BL/redux/actions/Internal/SetSelectedSymbol.ac";

const NavigateToTradeScreenWithSelectedSymbol = (symbol) => {
  const dispatch = configureStore.dispatch;
  dispatch(selectedSymbol(symbol.toLowerCase()));
  window.localStorage.selectedSymbolAuxiliary = symbol.toLocaleLowerCase();
};

export default NavigateToTradeScreenWithSelectedSymbol;
