import {
  FETCH_PNL_DASHBOARD_DATA,
  // FETCH_ACCOUNT_VALUE_PERCENTAGE,
  FETCH_PNL_HISTORY_PORTFOLIO,
  FETCH_PORTFOLIO_SUMMARY
  // FETCH_Rebate_Bar_Chart,
  // FETCH_VOLUMESUMMARY_BAR_CHART,
  // FETCH_VolumeSummary_DOGHNUT_CHART
} from "../../redux/actions/NewPortfolio/newPortfolio.ac";
// import { getTimeFrameRange } from "@/helpers/getRewardTimeFrame";
import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";

export const usePorfolio = () => {
  const dispatch = useDispatch();
  const [selectDateRange, setSelectDateRange] = useState({ from: "", to: "" });
  const [showCalender, setShowCalender] = useState(false);
  const [Pagination, SetPagination] = useState({
    page: 0,
    rowsPerPage: 5
  });

  const [filter, setFilter] = useState("week");
  useEffect(() => {
    handlePeriodChange("", "week");
  }, []);
  const handlePeriodChange = (e, value) => {
    const periodVal = value;
    let startTime, endTime;
    SetPagination({ ...Pagination, page: 0 });
    if (periodVal === "week") {
      const currentDate = new Date();
      const prevDate = new Date(new Date().setDate(new Date().getDate() - 7));
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      prevDate.setHours(0);
      prevDate.setMinutes(0);
      prevDate.setSeconds(0);
      prevDate.setMilliseconds(0);
      currentDate.setMilliseconds(0);
      startTime = (prevDate.getTime() / 1000) * 1000;
      endTime = (currentDate.getTime() / 1000) * 1000;
    } else if (periodVal === "month") {
      const currentDate = new Date();
      const prevDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      prevDate.setHours(0);
      prevDate.setMinutes(0);
      prevDate.setSeconds(0);
      prevDate.setMilliseconds(0);
      currentDate.setMilliseconds(0);
      startTime = prevDate.getTime();
      endTime = currentDate.getTime();
    } else if (periodVal === "year") {
      const currentDate = new Date();
      const prevDate = new Date(new Date().setMonth(new Date().getMonth() - 12));
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      prevDate.setHours(0);
      prevDate.setMinutes(0);
      prevDate.setSeconds(0);
      prevDate.setMilliseconds(0);
      currentDate.setMilliseconds(0);
      startTime = prevDate.getTime();
      endTime = currentDate.getTime();
    } else if (periodVal === "all") {
      // const currentDate = new Date();
      // const prevDate = new Date(new Date().setDate(new Date().getMonth() - 3));
      startTime = "";
      endTime = "";
    } else if (periodVal === "custom") {
      setShowCalender(true);
      setFilter(periodVal);
      return;
    }
    setFilter(periodVal);
    setSelectDateRange({ from: startTime, to: endTime });
  };

  const [portfolioSummaryData, setPortfolioSummaryData] = useState([
    { heading: "Total Balance", value: "--", unit: "USDT", color: "white" },
    { heading: "Margin Usage", value: "--", unit: "USDT", color: "white" },
    { heading: "Free Balance", value: "--", unit: "USDT", color: "white" },
    { heading: "Un-Realized Pnl", value: "--", unit: "USDT", color: "white" },
    { heading: "Open Positions", value: "--", unit: "", color: "white" },
    { heading: "Open Orders", value: "--", unit: "", color: "white" }
  ]);
  const [pnlGraphData, setPnlGraphData] = useState([
    { heading: "Total PnL", value: "--", unit: "USDT" },
    { heading: "Realized PnL", value: "--", unit: "USDT" },
    { heading: "Total Fee", value: "--", unit: "USDT" },
    { heading: "Total Volume Traded", value: "--", unit: "" },
    { heading: "Total No Of Trades", value: "--", unit: "" },
    { heading: "Win Ratio", value: "--", unit: "%" },
    { heading: "Average Holding Period", value: "--", unit: "secs" }
  ]);
  const [pnlHistoryData, setPnlHistoryData] = useState([]);
  const [pnlLineChartData, setPNLLineChartData] = useState({
    data: [],
    date: []
  });
  const [accountValue, setAccountValue] = useState("--");
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    dispatch(
      FETCH_PNL_DASHBOARD_DATA({
        startTime: selectDateRange.from,
        endTime: selectDateRange.to
      })
    ).then((response) => {
      if (response !== null) {
        setPnlGraphData(response);
      }
    });

    dispatch(
      FETCH_PNL_HISTORY_PORTFOLIO({
        startTime: selectDateRange.from,
        endTime: selectDateRange.to
      })
    ).then((res) => {
      if (!res) return;
      setPNLLineChartData({
        ...pnlLineChartData,
        data: [...res?.map((item) => Number(item?.cummPnl))],
        date: [...res?.map((item) => item.date)]
      });
      setPnlHistoryData(res.reverse().filter((hd) => hd.totalTrades !== 0));
    });
  }, [selectDateRange]);

  useEffect(() => {
    dispatch(
      FETCH_PORTFOLIO_SUMMARY({
        startTime: selectDateRange.from,
        endTime: selectDateRange.to
      })
    ).then((response) => {
      if (!response) return;
      const { summary, weeklyPct } = response;
      setPortfolioSummaryData(summary);
      setAccountValue(summary[0]?.value);
      setPercentage(Number(weeklyPct));
    });
  }, [selectDateRange]);
  return {
    accountValue,
    portfolioSummaryData,
    pnlGraphData,
    pnlHistoryData,
    // volumeSummaryDoughnutChartData,
    // volumeSummaryDoughnutCharttradedCoins,
    // volumeSummaryBarChartData,
    // volumeSummaryBarChartDate,
    // rebateChartData,
    // rebateChartDate,
    percentage,
    selectDateRange,
    setSelectDateRange,
    handlePeriodChange,
    filter,
    showCalender,
    setShowCalender,
    setFilter,
    pnlLineChartData,
    Pagination,
    SetPagination
  };
};
