// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFuturesTransactionHistory } from "../../redux/actions/Futures/Futures.ac";

// export const useTransactionHistory = () => {
//   const dispatch = useDispatch();
//   const symbol = useSelector((state) => state.selectSymbol.selectedSymbol);
//   const transHistoryData = useSelector((state) => state.futures.transactionHistory);

//   useEffect(() => {
//     dispatch(
//       fetchFuturesTransactionHistory({
//         page: 1,
//         incomeType: "",
//         symbol: ""
//       })
//     );
//   }, [symbol]);

//   return {
//     symbol,
//     transHistoryData
//   };
// };
