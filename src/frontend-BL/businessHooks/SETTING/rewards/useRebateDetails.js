import { getRebateEarningsByTimeFrame, getRebateHistory } from "@/frontend-BL/redux/actions/Setting/GetRewardData.ac";
import { getTimeFrameRange, getTimeRangeForRebateHistory } from "@/helpers/getRewardTimeFrame";
import { useEffect, useState, useCallback } from "react";

export const useRebateDetails = () => {
  // Get the current Date object
  const currentDate = new Date();
  const [rebateEarnings, setRebateEarnings] = useState({
    totalRebateRate: 0,
    totalRebateReward: 0,
    totalRebateFees: 0
  });
  const [rebateHistory, setRebateHistory] = useState([]);
  const [duration, setDuration] = useState("day");
  const [totalCountRebate, setTotalCountRebate] = useState(0);
  const [rebateHistoryTablePagination, setRebateHistoryTablePagination] = useState({
    page: 1,
    rowsPerPage: 5
  });

  useEffect(() => {
    const rebateHistoryPayload = {
      ...getTimeRangeForRebateHistory(currentDate),
      page: rebateHistoryTablePagination.page,
      size: rebateHistoryTablePagination.rowsPerPage
    };
    getRebateHistory(rebateHistoryPayload).then((data) => {
      setRebateHistory(data.tableData ?? []);
      setTotalCountRebate(data.totalCount ?? 0);
    });
  }, [rebateHistoryTablePagination]);

  useEffect(() => {
    // get start and end time
    const timeRange = getTimeFrameRange(currentDate, duration);
    // earning data on first of every month will be 0
    // if (currentDate.getDate() === 1) return;
    getRebateEarningsByTimeFrame(timeRange).then((data) => setRebateEarnings(data));
  }, [duration]);

  const changeDuration = (event, selectedDuration) => {
    setDuration(selectedDuration ?? duration);
  };

  // pagination handler
  const changeRebateHistoryTablePage = useCallback(
    (pageIndex) => {
      setRebateHistoryTablePagination({
        ...rebateHistoryTablePagination,
        page: pageIndex
      });
    },
    [rebateHistoryTablePagination]
  );

  const changeRebateHistoryRows = useCallback(
    (newRowsPerPage) => {
      setRebateHistoryTablePagination({
        ...rebateHistoryTablePagination,
        rowsPerPage: newRowsPerPage
      });
    },
    [rebateHistoryTablePagination]
  );

  return {
    rebateEarnings,
    duration,
    changeDuration,
    rebateHistoryTablePagination,
    changeRebateHistoryTablePage,
    changeRebateHistoryRows,
    totalCountRebate,
    rebateHistory
  };
};
