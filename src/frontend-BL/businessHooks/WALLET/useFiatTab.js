/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fiatExchangeRateApi, fetchFiatBalanceApi, fetchFiatTransactionHistoryApi } from "../../../frontend-api-service/Api/FiatTransaction";

import { FETCH_FIAT_BALANCE_FAIL, FETCH_FIAT_TRANSACTION_HISTORY_HISTORY_FAIL } from "../../redux/constants/Constants";

import { setSelectedWallet } from "../../redux/actions/Internal/SelectedWallet.ac";

import { TABS_CONSTANTS } from "./Constants/Tabs.const";
import { walletScreenRender } from "../../../frontend-BL/redux/actions/Internal/WalletScreenRender.ac";
import { showSnackBar } from "../../../frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import getDurationRange from "../../../helpers/getDurationRange";
import { formatFiatTypes } from "@/helpers/wallet/formatTransactionTypes";

export const useFiatTab = () => {
  const dispatch = useDispatch();
  const [conversionRateforUSDT, setConversionRateForUSDT] = useState(0);
  const [fiatbalance, setFiatBalance] = useState("");
  const [FiatHistory, setFiatHistory] = useState([]);
  const [Pagination, SetPagination] = useState({
    page: 1,
    rowsPerPage: 5
  });
  const [TabsAlignment, setAlignment] = useState("TRANSACTION TYPE");
  const [totalCount, setTotalCount] = useState(0);
  const [duration, setDuration] = useState("DATE");
  const [dateRange, setDateRange] = useState(() => {
    const initialState = getDurationRange("all");
    return initialState;
  });
  const [loading, setLoading] = useState(false);
  const walletScreenRenderBoolean = useSelector((state) => state.walletScreenRender.walletScreenRenderFlag);
  const [showCustomDateModal, setShowCustomDateModal] = useState(false);
  const RefreshButton = () => {
    setAlignment("TRANSACTION TYPE");
    changeDuration("All");
    dispatch(walletScreenRender(true, !walletScreenRenderBoolean));
  };
  useEffect(() => {
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
    dispatch(setSelectedWallet(true, { wallet: TABS_CONSTANTS.FIAT_WALLET }));
    fetchFiatBalanceApi()
      .then((successResponse) => {
        setFiatBalance(Math.trunc(successResponse.data.balance * 100) / 100);
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: FETCH_FIAT_BALANCE_FAIL,
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
    changeDuration("all");
  }, [walletScreenRenderBoolean]);

  useEffect(() => {
    setLoading(true);
    fetchFiatTransactionHistoryApi({
      endTime: dateRange.to,
      startTime: dateRange.from,
      page: (Pagination.page - 1) * Pagination.rowsPerPage,
      size: Pagination.rowsPerPage,
      type:
        TabsAlignment === "ALL" || TabsAlignment === "TRANSACTION TYPE"
          ? ""
          : TabsAlignment.split(" ")
              .map((char) => char.toUpperCase())
              .join("_")
    })
      .then((successResponse) => {
        const data = successResponse?.data?.data.map((element, index) => ({
          ...element,
          internalId: index,
          time: element.createdAt,
          fiatTransactionType: formatFiatTypes(element.fiatTransactionType)
        }));
        setLoading(false);
        setFiatHistory(data);
        setTotalCount(successResponse?.data.total);
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: FETCH_FIAT_TRANSACTION_HISTORY_HISTORY_FAIL,
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
        setLoading(false);
      });
  }, [walletScreenRenderBoolean, TabsAlignment, Pagination, dateRange]);

  // Tabs handler

  const SetTabsAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      SetPagination({ ...Pagination, page: 1 });
      if (newAlignment.toUpperCase() === "ALL") {
        SetTabsAlignment("TRANSACTION TYPE");
      } else setAlignment(newAlignment);
    }
  };

  // handler for standard duration options - day, week, month, 3 months
  const changeDuration = (value) => {
    if (value.toUpperCase() === "ALL") {
      setDuration("DATE");
    } else setDuration(value);
    if (value !== "Custom") {
      const newDateRange = getDurationRange(value);
      setDateRange(newDateRange);
    } else {
      setShowCustomDateModal(true);
    }
  };

  // handler for custom duration select
  const selectCustomDateRange = (dateRange) => {
    // condition handles "cancel" button of Calendar Modal
    if (dateRange?.to === "" && dateRange?.from === "") return;
    setDuration("custom");
    setDateRange(dateRange);
  };

  // web pagination handler
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

  return {
    Pagination,
    conversionRateforUSDT,
    FiatHistory,
    totalCount,
    fiatbalance,
    TabsAlignment,
    loading,
    ChangePage,
    SetTabsAlignment,
    ChangeRowsPerPage,
    changeMWebPage,
    changeMWebRowsPerPage,
    RefreshButton,
    duration,
    changeDuration,
    selectCustomDateRange,
    showCustomDateModal,
    setShowCustomDateModal
  };
};
