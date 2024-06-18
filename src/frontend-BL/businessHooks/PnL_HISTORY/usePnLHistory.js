import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FETCH_PNL_HISTORY } from "@/frontend-BL/redux/actions/NewPortfolio/getPnLhistory.ac";

export const usePnLHistory = ({ page, rowsPerPage }) => {
  const [PnLHistory, setPnLHistory] = useState([]);
  const [totalPageData, setTotalPageData] = useState(0);
  const [stateData, setStateData] = useState({
    side: "Entry Side",
    period: "Entry Time",
    selectedSymbol: "Symbol"
  });
  const [selectedDateRange, setSelectDateRange] = useState({
    from: "",
    to: ""
  });
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
    setStateData({ ...stateData, period: e });
    setSelectDateRange({ from: startTime, to: endTime });
  };
  // call api
  useEffect(() => {
    const { from, to } = selectedDateRange;
    const { side, selectedSymbol } = stateData;
    const data = dispatch(
      FETCH_PNL_HISTORY({
        start: page + 1,
        size: rowsPerPage,
        symbol: selectedSymbol,
        startTime: from,
        endTime: to,
        side
      })
    );
    data.then((response) => {
      if (!response) return;
      const { Data, Total } = response;
      setPnLHistory(Data);
      setTotalPageData(Total);
    });
  }, [selectedDateRange.from, selectedDateRange.to, stateData.side, stateData.selectedSymbol, page, rowsPerPage]);
  return {
    PnLHistory,
    stateData,
    setStateData,
    setSelectDateRange,
    handlePeriodChange,
    selectedDateRange,
    totalPageData
  };
};
