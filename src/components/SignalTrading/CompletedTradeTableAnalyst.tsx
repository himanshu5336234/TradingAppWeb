import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { COMPLETED_SIGNAL_HEADERS } from "./signalTradingHeaders";
import TableCell from "./TableHeaderCell";
// import TableDataCell from "./TableDataCell";
import SymbolCell from "./TableCells/SymbolCell";
import DateCell from "./TableCells/DateCell";
import SideCell from "./TableCells/SideCell";
import TabelPagination from "./TablePagination";
import ROICell from "./TableCells/ROICell";
import ShareCell from "./Follower/ShareCell";

import { fetchSignalListForAnAnalyst } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";

import { useSelector, useDispatch } from "react-redux";

import StatusCell from "./TableCells/StatusCell";
import TableNoRowsOverlay from "../Setting/Rewards/TableNoRowsOverlay";

const CompletedTradingTable: React.FC = () => {
  const completedSignalListForAnalyst = useSelector((state) => state.SignalTrading.completedSignalsIfAnAnalyst);
  const analystId = useSelector((state) => state.SignalTrading.userPersonna?.analystId);

  const dispatch = useDispatch();

  const tableRowSize = 5;
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (analystId) {
      dispatch(fetchSignalListForAnAnalyst(null, analystId, null, page, tableRowSize, null, null, ["COMPLETED", "DELETED", "CANCELLED"], null));
    }
  }, [analystId, page]);

  return (
    <>
      <Grid container mt={3} mb={2}>
        {COMPLETED_SIGNAL_HEADERS.map((heading) => (
          <TableCell key={heading.id} heading={heading} />
        ))}
      </Grid>
      {(!completedSignalListForAnalyst.data || completedSignalListForAnalyst.data.length === 0) && <TableNoRowsOverlay message={"No Completed Signal Data Available"} />}
      {completedSignalListForAnalyst?.data?.map((data) => (
        <Grid container key={data.signalId} mb={2}>
          <DateCell value={data.createdAt} gridSize={2} />
          <SymbolCell symbol={data?.symbol} gridSize={2.3} leverage={data?.leverage} marginMode={data?.marginMode.includes("ISOLATED") ? "Isolated" : "Crossed"} />
          <SideCell side={data?.orderSide} gridSize={1.5} />
          <ROICell roi={data.roi || data.signalPerformance} gridSize={1.5} />
          <StatusCell gridSize={2.7} status={data.status} />
          {/* <Grid item container xs={2.7} alignItems={"center"} gap={3}>
                  <Typography variant="Regular_14">{data.remarks || "--"}</Typography>
                </Grid> */}
          <ShareCell gridSize={2} data={data} />
        </Grid>
      ))}
      {completedSignalListForAnalyst?.totalRecords > 0 && (
        <Grid container mt={4} justifyContent={"flex-end"}>
          <TabelPagination page={page} totalPages={Math.ceil(completedSignalListForAnalyst?.totalRecords / 5) || 1} setPage={setPage} />
        </Grid>
      )}
    </>
  );
};

export default CompletedTradingTable;
