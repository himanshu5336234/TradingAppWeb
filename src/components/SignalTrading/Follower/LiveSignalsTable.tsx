import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { USER_LIVE_SIGNAL_HEADERS } from "../signalTradingHeaders";
import TableCell from "../TableHeaderCell";
import SymbolCell from "../TableCells/SymbolCell";
import DateCell from "../TableCells/DateCell";
import SideCell from "../TableCells/SideCell";
import TablePagination from "../TablePagination";
import PriceCell from "../TableCells/PriceCell";
import MultipleTPSLCell from "../TableCells/MultipleTpSL";

import { fetchSignalListForFollowers } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";

import { useSelector, useDispatch } from "react-redux";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";

const LiveSignalsTable: React.FC = () => {
  const liveSignalListForFollowers = useSelector((state: any) => state.SignalTrading.liveSignalsForFollowers);
  const analystId = useSelector((state: any) => state.SignalTrading.analystIdIfAFollower);

  const dispatch = useDispatch();

  const tableRowSize = 5;
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (analystId) {
      dispatch(fetchSignalListForFollowers(analystId, null, page, tableRowSize, null, null, "LIVE", null));
    }
  }, [analystId, page]);

  return (
    <>
      <Grid container mt={3} mb={2}>
        {USER_LIVE_SIGNAL_HEADERS.map((heading: any) => (
          <TableCell key={heading.id} heading={heading} />
        ))}
      </Grid>
      {!liveSignalListForFollowers.data || liveSignalListForFollowers.data?.length === 0 ? (
        <TableNoRowsOverlay message={"No Live Signal Data Available"} />
      ) : (
        liveSignalListForFollowers?.data?.map((data: any) => (
          <Grid container key={data.signalId} mb={2}>
            <DateCell value={data.createdAt} gridSize={2} />
            <SymbolCell
              symbol={data?.signalData.symbol?.toUpperCase()}
              gridSize={2.5}
              leverage={data?.signalData.leverage}
              marginMode={data?.signalData.marginMode.includes("ISOLATED") ? "Isolated" : "Crossed"}
            />
            <SideCell side={data?.signalData.orderSide} gridSize={1.5} />
            <PriceCell price={data?.signalData.orderPrice || "--"} gridSize={2} showEdit={false} status={""} />
            <PriceCell price={data?.signalData.orderStopPrice || "--"} gridSize={2} showEdit={false} status={""} />
            <MultipleTPSLCell data={data} gridSize={2} />
          </Grid>
        ))
      )}
      {liveSignalListForFollowers?.totalRecords > 0 && (
        <Grid container mt={4} justifyContent={"flex-end"}>
          <TablePagination page={page} totalPages={Math.ceil(liveSignalListForFollowers?.totalRecords / 5) || 1} setPage={setPage} />
        </Grid>
      )}
    </>
  );
};

export default LiveSignalsTable;
