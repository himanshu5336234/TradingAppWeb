import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FETCH_ORDER_HISTORY } from "@/frontend-BL/redux/actions/Futures/getOrderHistory.ac";

export const useOrderHistory = ({ page, rowsPerPage }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [period, setPeriod] = useState("Entry Time");
  const [selectedSymbol, setSelectedSymbol] = useState("Symbol");
  const [orderType, setOrderType] = useState("Order Type");
  const [orderSide, setOrderSide] = useState("Side");
  const [reduceOnly, setReduceOnly] = useState("Reduce Only");
  const [orderStatus, setOrderStatus] = useState("Status");
  const [selectedDateRange, setSelectDateRange] = useState({
    from: "",
    to: ""
  });
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  const handlePeriodChange = (e) => {
    const periodVal = e;
    let startTime, endTime;

    if (periodVal === "1D" || periodVal === "1 Day") {
      const currentDate = new Date();
      const prevDate = new Date(new Date().setDate(new Date().getDate() - 1));
      startTime = prevDate.getTime();
      endTime = currentDate.getTime();
    } else if (periodVal === "1W" || periodVal === "1 Week") {
      const currentDate = new Date();
      const prevDate = new Date(new Date().setDate(new Date().getDate() - 7));
      startTime = prevDate.getTime();
      endTime = currentDate.getTime();
    } else if (periodVal === "1M" || periodVal === "1 Month") {
      const currentDate = new Date();
      const prevDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
      startTime = prevDate.getTime();
      endTime = currentDate.getTime();
    } else if (periodVal === "3M" || periodVal === "3 Months") {
      const currentDate = new Date();
      const prevDate = new Date(new Date().setMonth(new Date().getMonth() - 3));
      startTime = prevDate.getTime();
      endTime = currentDate.getTime();
    }
    setPeriod(periodVal);
    setSelectDateRange({ from: startTime, to: endTime });
  };
  // call api
  useEffect(() => {
    const { from, to } = selectedDateRange;
    const data = dispatch(
      FETCH_ORDER_HISTORY({
        startTime: from,
        endTime: to,
        symbol: selectedSymbol,
        type: orderType,
        side: orderSide,
        reduceOnly,
        status: orderStatus,
        size: rowsPerPage,
        start: page + 1
      })
    );
    data.then((response) => {
      if (!response) return;
      const { requiredData, total } = response;

      setOrderHistory(requiredData);
      setTotalPages(total);
    });
  }, [selectedSymbol, orderType, orderSide, reduceOnly, orderStatus, selectedDateRange, page, rowsPerPage]);
  return {
    orderHistory,
    period,
    setPeriod,
    selectedSymbol,
    setSelectedSymbol,
    orderSide,
    setOrderSide,
    orderType,
    setOrderType,
    orderStatus,
    setOrderStatus,
    reduceOnly,
    setReduceOnly,
    selectedDateRange,
    setSelectDateRange,
    handlePeriodChange,
    totalPages
  };
};
