export default function SetSelectedSymbolHelper() {
  const symbol = "btcusdt";
  if (window.localStorage.selectedSymbolAuxiliary) {
    const symbol = window.localStorage.selectedSymbolAuxiliary;
    return symbol.toUpperCase();
  }
  window.localStorage.selectedSymbolAuxiliary = symbol;
  return symbol.toUpperCase();
}
