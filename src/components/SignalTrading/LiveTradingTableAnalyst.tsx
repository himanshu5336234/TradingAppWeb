import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { LIVE_SIGNAL_HEADERS } from "./signalTradingHeaders";
import TableCell from "./TableHeaderCell";
// import TableDataCell from "./TableDataCell";
import TabelPagination from "./TablePagination";
import LiveSignalRow from "./LiveSignalRow";

import { fetchSignalListForAnAnalyst } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";

import { useSelector, useDispatch } from "react-redux";
import TableNoRowsOverlay from "../Setting/Rewards/TableNoRowsOverlay";
const LiveTradingTable: React.FC = () => {
  const liveSignalListForAnalyst = useSelector((state: any) => state.SignalTrading.liveSignalsIssuedIfAnAnalyst);
  const analystId = useSelector((state: any) => state.SignalTrading.userPersonna?.analystId);

  const dispatch = useDispatch();

  const tableRowSize = 5;
  const [page, setPage] = useState(1);

  function dispatchLatestListOfSignalsForAnalyst() {
    dispatch(fetchSignalListForAnAnalyst(null, analystId, null, page, tableRowSize, null, null, ["NEW", "PUBLISHED", "TRIGGERED"], null));
  }

  useEffect(() => {
    if (analystId) {
      dispatchLatestListOfSignalsForAnalyst();
    }
  }, [analystId, page]);

  return (
    <>
      <Grid container mt={3} mb={2}>
        {LIVE_SIGNAL_HEADERS.map((heading) => (
          <TableCell key={heading.id} heading={heading} />
        ))}
      </Grid>
      {(!liveSignalListForAnalyst.data || liveSignalListForAnalyst.data.length === 0) && <TableNoRowsOverlay message={"No Live Signals Data Availale"} />}
      {liveSignalListForAnalyst?.data?.map((data: any) => (
        <LiveSignalRow dispatchLatestListOfSignalsForAnalyst={dispatchLatestListOfSignalsForAnalyst} data={data} />
      ))}
      {liveSignalListForAnalyst?.totalRecords > 0 && (
        <Grid container mt={4} justifyContent={"flex-end"}>
          <TabelPagination page={page} totalPages={Math.ceil(liveSignalListForAnalyst?.totalRecords / 5) || 1} setPage={setPage} />
        </Grid>
      )}
    </>
  );
};

export default LiveTradingTable;
