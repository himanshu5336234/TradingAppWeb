/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedWallet } from "../../redux/actions/Internal/SelectedWallet.ac";
import { TABS_CONSTANTS } from "./Constants/Tabs.const";
import { fiatExchangeRateApi, getFuturesAccountDetailsApi, getfuturesTransactionhistory } from "../../../frontend-api-service/Api";
import { walletScreenRender } from "../../../frontend-BL/redux/actions/Internal/WalletScreenRender.ac";
import { showSnackBar } from "../../../frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { fetchFutureAccountDetails, fetchFuturesTransactionHistory, getTradeIdData } from "../../../frontend-BL/redux/actions/Futures/Futures.ac";
import { TRANSACTION_HISTORY_FETCH_FAIL } from "../../../frontend-BL/redux/constants/Constants";
import getDurationRange from "../../../helpers/getDurationRange";

export const useFuturesTab = () => {
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const [TabsAlignment, setAlignment] = useState("TRANSACTION TYPE");
  const [searchSymbol, setSearchSymbol] = useState("CONTRACT");
  const [duration, setDuration] = useState("DATE");
  const [showCustomDurationModal, setShowCustomDurationModal] = useState(false);
  const [dateRange, setDateRange] = useState(() => {
    const initialState = getDurationRange("All");
    return initialState;
  });
  const [conversionRateforUSDT, setConversionRateForUSDT] = useState(0);
  // const [realisedPnl24h, setRealisedPnl24h] = useState(0);
  const [Pagination, SetPagination] = useState({
    page: 0,
    rowsPerPage: 5
  });
  const [webPagination, setWebPagination] = useState(1);
  const [isHideSmallBalanceChecked, setIsHideSmallBlanceChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletScreenRenderBoolean, setwalletScreenRenderBoolean] = useState(false);
  // const getRealisedPnl24h = () => {
  //   getfuturesTransactionhistory({
  //     endTime: new Date().getTime(),
  //     startTime: new Date().getTime() - 24 * 60 * 60 * 1000,
  //     page: "",
  //     size: "",
  //     incomeType: "REALIZED_PNL"
  //   }).then(
  //     (result) => {
  //
  //       const data = result?.data?.transactions;
  //       const realizedPnlToday = data.reduce((accumulator, transaction) => {
  //         return parseFloat(accumulator) + parseFloat(transaction.amount);
  //       }, 0);
  //       setRealisedPnl24h(realizedPnlToday);
  //     },
  //     (error) => {
  //       const message = error.toString();
  //       dispatch({
  //         type: TRANSACTION_HISTORY_FETCH_FAIL,
  //         payload: message
  //       });
  //       return null;
  //     }
  //   );
  // };

  const RefreshButton = () => {
    setAlignment("TRANSACTION TYPE");
    changeDuration("All");
    setSearchSymbol("CONTRACT");
    setwalletScreenRenderBoolean(!walletScreenRenderBoolean);
  };

  const handleSymbolSelect = (event, newSymbol) => {
    SetPagination({ ...Pagination, page: 0 });
    if (newSymbol === "All") {
      setSearchSymbol("CONTRACT");
    } else setSearchSymbol(newSymbol);
  };

  const SetTabsAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      SetPagination({ ...Pagination, page: 0 });
      if (newAlignment === "ALL") {
        setAlignment("TRANSACTION TYPE");
      } else setAlignment(newAlignment);
    }
  };

  // handler for standard duration options - day, week, month etc
  const changeDuration = (value) => {
    if (value === "All") {
      setDuration("DATE");
    } else setDuration(value);
    if (value !== "Custom") {
      // setDuration(value);
      const newDateRange = getDurationRange(value);
      setDateRange(newDateRange);
    } else {
      setShowCustomDurationModal(true);
    }
  };

  // handler for custom duration range
  const selectCustomDateRange = (dateRange) => {
    // condition handles "cancel" button of Calendar Modal
    if (dateRange?.to === "" && dateRange?.from === "") return;
    setDuration("custom");
    setDateRange(dateRange);
  };

  // pagination handler
  const ChangePage = useCallback(
    (pageIndex) => {
      SetPagination({ ...Pagination, page: pageIndex });
    },
    [Pagination]
  );

  const ChangeRowsPerPage = useCallback(
    (newRowsPerPage) => {
      SetPagination({ ...Pagination, rowsPerPage: newRowsPerPage });
    },
    [Pagination]
  );

  // mweb pagination handlers
  const changeMWebPage = (event, pageIndex) => {
    SetPagination({ ...Pagination, page: pageIndex });
  };

  const changeMWebRowsPerPage = (event) => {
    SetPagination({
      ...Pagination,
      rowsPerPage: parseInt(event.target.value, 10)
    });
  };
  useEffect(() => {
    dispatch(fetchFutureAccountDetails());
  }, [walletScreenRenderBoolean]);

  const handleHideBalanceCheckBox = (event) => {
    setLoading(true);
    dispatch(
      fetchFuturesTransactionHistory({
        endTime: dateRange.to,
        startTime: dateRange.from,
        incomeType:
          TabsAlignment === "ALL" || TabsAlignment === "TRANSACTION TYPE"
            ? ""
            : TabsAlignment?.split(" ")
                .map((item) => item.toUpperCase())
                .join("_"),
        page: Pagination.page + 1,
        size: Pagination.rowsPerPage,
        symbol: searchSymbol === "All" || searchSymbol === "CONTRACT" ? "" : searchSymbol,
        hideSmallBalances: event.target.checked
      })
    )
      .then((totalCount) => {
        setTotalCount(totalCount);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    setIsHideSmallBlanceChecked(event.target.checked);
  };

  // web
  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchFuturesTransactionHistory({
        endTime: dateRange.to,
        startTime: dateRange.from,
        incomeType:
          TabsAlignment === "ALL" || TabsAlignment === "TRANSACTION TYPE"
            ? ""
            : TabsAlignment?.split(" ")
                .map((item) => item.toUpperCase())
                .join("_"),
        page: webPagination,
        size: Pagination.rowsPerPage,
        symbol: searchSymbol === "All" || searchSymbol === "CONTRACT" ? "" : searchSymbol,
        hideSmallBalances: isHideSmallBalanceChecked
      })
    )
      .then((totalCount) => {
        setTotalCount(totalCount);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fiatExchangeRateApi()
      .then((successResponse) => {
        setConversionRateForUSDT(successResponse.data.inr);
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: "FETCH_FIAT_EXCHANGE_RATE_FAIL",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
  }, [Pagination, TabsAlignment, dateRange, webPagination]);
  useEffect(() => {
    dispatch(setSelectedWallet(true, { wallet: TABS_CONSTANTS.FUTURES_WALLET }));
    // getRealisedPnl24h();
  }, []);
  return {
    // totalWalletBalance,
    // totalCrossWalletBalance,
    // availableBalance,
    // totalIsolatedWalletBalance,
    // maxWithdrawAmount,
    // realisedPnl24h,
    Pagination,
    totalCount,
    TabsAlignment,
    // transactionHistoryFromServer,
    conversionRateforUSDT,
    RefreshButton,
    ChangePage,
    ChangeRowsPerPage,
    changeMWebPage,
    changeMWebRowsPerPage,
    SetTabsAlignment,
    duration,
    changeDuration,
    selectCustomDateRange,
    searchSymbol,
    handleSymbolSelect,
    loading,
    handleHideBalanceCheckBox,
    isHideSmallBalanceChecked,
    webPagination,
    setWebPagination,
    rowsPerPage: Pagination.rowsPerPage,
    showCustomDurationModal,
    setShowCustomDurationModal
  };
};
