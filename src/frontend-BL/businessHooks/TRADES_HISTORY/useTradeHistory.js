// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTradeHistory } from "../../redux/actions/Futures/Futures.ac";

// export const useTradeHistory = () => {
//   const dispatch = useDispatch();
//   const symbol = useSelector((state) => state.selectSymbol.selectedSymbol);
//   const tradeHistoryData = useSelector((state) => state.futures.tradeHistory);
//   const getSymbolList = useSelector((state) => state.tradablesymbolList.tradablesymbolList);

//   useEffect(() => {
//     dispatch(fetchTradeHistory(symbol));
//   }, [symbol]);

//   return {
//     symbol,
//     tradeHistoryData,
//     getSymbolList
//   };
// };
