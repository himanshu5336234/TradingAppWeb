import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { USER_COMPLETED_SIGNAL_HEADERS } from "../signalTradingHeaders";
import TableCell from "../TableHeaderCell";
import SymbolCell from "../TableCells/SymbolCell";
import DateCell from "../TableCells/DateCell";
import SideCell from "../TableCells/SideCell";
import TablePagination from "../TablePagination";
import ROICell from "../TableCells/ROICell";
import ShareCell from "./ShareCell";

import { fetchSignalListForFollowers } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";

import { useSelector, useDispatch } from "react-redux";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";

const CompletedTradingTable: React.FC = () => {
  const completedSignalListForFollowers = useSelector((state: any) => state.SignalTrading.completedSignalsForFollowers);
  const analystId = useSelector((state: any) => state.SignalTrading.analystIdIfAFollower);

  const dispatch = useDispatch();

  const tableRowSize = 5;
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (analystId) {
      dispatch(fetchSignalListForFollowers(analystId, null, page, tableRowSize, null, null, "COMPLETED", null));
    }
  }, [analystId, page]);

  return (
    <>
      <Grid container mt={3} mb={2}>
        {USER_COMPLETED_SIGNAL_HEADERS.map((heading) => (
          <TableCell key={heading.id} heading={heading} />
        ))}
      </Grid>
      {!completedSignalListForFollowers.data || completedSignalListForFollowers.data?.length === 0 ? (
        <TableNoRowsOverlay message={"No Completed Signal Data Available"} />
      ) : (
        completedSignalListForFollowers?.data?.map((data: any) => (
          <Grid container key={data.signalId} mb={2}>
            <DateCell value={data.createdAt} gridSize={2} />
            <SymbolCell symbol={data?.signalData.symbol} gridSize={2.3} leverage={data?.signalData.leverage} marginMode={data?.signalData.marginMode.includes("ISOLATED") ? "Isolated" : "Crossed"} />
            <SideCell side={data?.signalData.orderSide} gridSize={1} />
            <ROICell roi={data.roi || data.signalPerformance} gridSize={1} />
            <Grid item container xs={2.7} alignItems={"center"} gap={3}>
              <Typography variant="Regular_14">{data.remarks.split("_").join(" ") || "--"}</Typography>
            </Grid>
            <ShareCell showShareIcon={true} gridSize={3} data={data} />
          </Grid>
        ))
      )}
      {completedSignalListForFollowers?.totalRecords > 0 && (
        <Grid container mt={4} justifyContent={"flex-end"}>
          <TablePagination page={page} totalPages={Math.ceil(completedSignalListForFollowers?.totalRecords / 5) || 1} setPage={setPage} />
        </Grid>
      )}
    </>
  );
};

export default CompletedTradingTable;
