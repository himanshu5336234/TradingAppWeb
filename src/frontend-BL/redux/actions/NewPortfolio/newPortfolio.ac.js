import {
  getPnlHistoryPortfolio,
  getPortfolioSummary,
  getRebateBarChart,
  getVolumeSummaryBarChart,
  getVolumeSummaryDoghnutChart,
  getPnlGraph,
  getPnLDashboadrdData
} from "../../../../frontend-api-service/Api/NewPortfolio/Portfolio";
import { showSnackBar } from "../Internal/GlobalErrorHandler.ac";

const UNIX_TIME_TO_DATES = (para) => {
  const date = new Date(para);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const FETCH_PORTFOLIO_SUMMARY =
  ({ startTime, endTime }) =>
  (dispatch) => {
    const portfolioSummary_data = getPortfolioSummary({ startTime, endTime })
      .then((response) => {
        return {
          summary: [
            {
              heading: "Total Balance",
              value: response?.data.totalBalance,
              unit: "USDT",
              color: "white",
              link: false
            },
            {
              heading: "Margin Usage",
              value: response?.data.marginUsed,
              unit: "USDT",
              color: "white",
              link: false
            },
            {
              heading: "Free Balance",
              value: response?.data.freeBalance,
              unit: "USDT",
              color: "white",
              link: false
            },
            {
              heading: "Un-Realized Pnl",
              value: response?.data.unRealizedPnl,
              unit: "USDT",
              color: response?.data.unRealizedPnl > 0 ? "#00BD84" : "#F46151",
              link: false
            },
            {
              heading: "Open Positions",
              value: response?.data.openPositionCount,
              unit: "",
              color: "white",
              link: true
            },
            {
              heading: "Open Orders",
              value: response?.data.openOrdersCount,
              unit: "",
              color: "white",
              link: true
            }
          ],
          weeklyPct: response?.data.portfolioChangeWeeklyPct
        };
      })
      .catch((errorResponse) => {
        // console.log(errorRespons);
        dispatch(
          showSnackBar({
            src: "FETCH_PORTFOLIO_SUMMARY_FAIL",
            message: errorResponse.message,
            type: "failure"
          })
        );
        return null;
      });
    return portfolioSummary_data;
  };

export const FETCH_PnL_GRAPH =
  ({ startTime, endTime }) =>
  (dispatch) => {
    const pnlGraphData = getPnlGraph({ startTime, endTime })
      .then((response) => {
        return [
          {
            heading: "Total PnL",
            value: response?.data.totalPnl,
            unit: "USDT"
          },
          {
            heading: "Realized PnL",
            value: response?.data.realizedPnl,
            unit: "USDT"
          },
          {
            heading: "Total Fee",
            value: response?.data.totalFee,
            unit: "USDT"
          },
          {
            heading: "Total Volume Traded",
            value: response?.data.totalVolume,
            unit: ""
          },
          {
            heading: "Total No Of Trades",
            value: response?.data.totalTrades,
            unit: ""
          },
          {
            heading: "Win Ratio",
            value: response?.data.winRatio * 100,
            unit: "%"
          },
          {
            heading: "Average Holding Period",
            value: response?.data.avgHoldingPeriodSecs,
            unit: "secs"
          }
        ];
      })
      .catch((errorResponse) => {
        // console.log(errorRespons);
        dispatch(
          showSnackBar({
            src: "FETCH_PORTFOLIO_SUMMARY_FAIL",
            message: errorResponse.message,
            type: "failure"
          })
        );
        return null;
      });
    return pnlGraphData;
  };

export const FETCH_PNL_HISTORY_PORTFOLIO =
  ({ startTime = "", endTime = "" }) =>
  (dispatch) => {
    const pnlHistoryPortfolio = getPnlHistoryPortfolio({ startTime, endTime })
      .then((response) => {
        let last = 0;
        const historyData = response?.data?.reverse();
        const tableData = historyData.map((value, index) => {
          const formatDate = new Date(value.time).toDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          });
          const pnl = value?.Pnl - value?.fee;
          last += pnl;
          return {
            id: historyData?.length - 1 - index,
            date: formatDate,
            realizedPnl: value?.Pnl.toFixed(2),
            feepaid: value?.fee.toFixed(2),
            cummPnl: last?.toFixed(2),
            totalTrades: value?.tradeCount,
            winRatio: value?.winRatio.toFixed(2)
          };
        });
        // return forChart ? tableData : tableData?.reverse();
        return tableData;
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: "FETCH_PNL_HISTORY_PORTFOLIO",
            message: errorResponse.message,
            type: "failure"
          })
        );
        return null;
      });
    return pnlHistoryPortfolio;
  };

export const FETCH_VolumeSummary_DOGHNUT_CHART = (startTime, endTime) => (dispatch) => {
  const volumeSummaryDoghnutChart_data = getVolumeSummaryDoghnutChart(startTime, endTime)
    .then((response) => {
      const lastCoinsTraded = [];
      const lastVolume = [];
      response?.data?.topCoinVolumeList.forEach((item) => {
        lastVolume.push(item?.value);
        lastCoinsTraded.push(item?.symbol);
      });
      return { lastCoinsTraded, lastVolume };
    })
    .catch((errorResponse) => {
      dispatch(
        showSnackBar({
          src: "FETCH_VolumeSummary_DOGHNUT_CHART_FAIL",
          message: errorResponse.message,
          type: "failure"
        })
      );
      return null;
    });
  return volumeSummaryDoghnutChart_data;
};
export const FETCH_VOLUMESUMMARY_BAR_CHART = (startTime, endTime) => (dispatch) => {
  const volumeSummaryBarChart_data = getVolumeSummaryBarChart(startTime, endTime)
    .then((response) => {
      const lastDaysVolume = [];
      const lastDates = [];
      response?.data.forEach((item) => {
        const formatDate_ = UNIX_TIME_TO_DATES(item.time);
        lastDates.push(formatDate_);
        lastDaysVolume.push(item.volume);
      });
      return { lastDates, lastDaysVolume };
    })
    .catch((errorResponse) => {
      dispatch(
        showSnackBar({
          src: "FETCH_VOLUMESUMMARY_BAR_CHART_FAIL",
          message: errorResponse.message,
          type: "failure"
        })
      );
      return null;
    });
  return volumeSummaryBarChart_data;
};

export const FETCH_Rebate_Bar_Chart = (startTime, endTime) => (dispatch) => {
  const rebateBarChart_data = getRebateBarChart(startTime, endTime)
    .then((response) => {
      const lastDaysRebate = [];
      const lastDates_ = [];
      response?.data?.forEach((item) => {
        const formatDate_ = UNIX_TIME_TO_DATES(item?.time);
        lastDates_.push(formatDate_);
        lastDaysRebate.push(item?.rebate);
      });
      return { lastDates_, lastDaysRebate };
    })
    .catch((errorResponse) => {
      dispatch(
        showSnackBar({
          src: "FETCH_Rebate_Bar_Chart_FAIL",
          message: errorResponse.message,
          type: "failure"
        })
      );
      return null;
    });
  return rebateBarChart_data;
};
export const FETCH_PNL_DASHBOARD_DATA =
  ({ startTime, endTime }) =>
  (dispatch) => {
    return getPnLDashboadrdData(startTime, endTime)
      .then((response) => {
        return [
          {
            heading: "Total PnL",
            value: response?.data.totalPnl,
            unit: "USDT"
          },
          {
            heading: "Realized PnL",
            value: response?.data.realizedPnl,
            unit: "USDT"
          },
          {
            heading: "Total Fee",
            value: response?.data.totalFee,
            unit: "USDT"
          },
          {
            heading: "Total Volume Traded",
            value: response?.data.totalVolume,
            unit: ""
          },
          {
            heading: "Total No Of Trades",
            value: response?.data.totalTrades,
            unit: ""
          },
          {
            heading: "Win Ratio",
            value: response?.data.winRatio * 100,
            unit: "%"
          },
          {
            heading: "Average Holding Period",
            value: response?.data.avgHoldingPeriodSecs,
            unit: "secs"
          }
        ];
      })
      .catch((errorResponse) => {
        // console.log(errorRespons);
        dispatch(
          showSnackBar({
            src: "FETCH_PORTFOLIO_SUMMARY_FAIL",
            message: errorResponse.message,
            type: "failure"
          })
        );
        return [];
      });
  };
