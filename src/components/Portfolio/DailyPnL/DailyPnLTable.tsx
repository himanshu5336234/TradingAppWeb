import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DAILY_PNL_TABLE_HEADER } from "./TableObjects";
import HeaderTableCell from "./HeaderTableCell";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import TextView from "@/components/UI/TextView/TextView";
import TablePagination from "@/components/SignalTrading/TablePagination";
import { epochToDateShortFormat } from "@/helpers";
import { numberWithCommas } from "@/helpers/commaHelper";
export interface PortfolioPnlObjectInterface {
  avgLeverage: number;
  commission: number;
  endTime: number;
  netPNL: number;
  orderCount: number;
  realisedPNL: number;
  startTime: number;
}
const DailyPnLTable = ({ tableData, loader }: { tableData: PortfolioPnlObjectInterface[]; loader: boolean }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const lastRowIndex = currentPage * pageSize;
  const firstRowIndex = Math.abs(pageSize - lastRowIndex);
  const totalPages = Math.ceil(tableData.length / pageSize);
  const currentRows = tableData.slice(firstRowIndex, lastRowIndex);
  useEffect(() => {
    setCurrentPage(1);
  }, [tableData]);

  return (
    <>
      <Grid container justifyContent={"space-between"} rowSpacing={2} alignContent={"flex-start"}>
        {DAILY_PNL_TABLE_HEADER.map((item) => (
          <Grid item xs={item.gridSize} key={item.id}>
            <HeaderTableCell Header={item.name} enableTooltip={item.tooltip} tooltipText={item.tooltipText} />
          </Grid>
        ))}

        {loader ? (
          <Box height={290} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <CircularProgress color="success" />
          </Box>
        ) : tableData.length === 0 ? (
          <Box height={290} width={"100%"}>
            <TableNoRowsOverlay message={"No Active Data"} />
          </Box>
        ) : (
          <>
            {currentRows.map((item, index) => (
              <Grid container item xs={12} justifyContent={"space-between"} key={index + item.startTime} mb={2} alignItems={"center"}>
                {/* Date */}
                <Grid item xs={1.5}>
                  <TextView component="p" variant="Medium_12" text={epochToDateShortFormat(item.startTime)} />
                </Grid>
                {/* Gross P&L */}
                <Grid item xs={2}>
                  <TextView component="p" textAlign="center" variant="Medium_12" text={numberWithCommas(item.realisedPNL.toFixed(2))} color={item.realisedPNL < 0 ? "text.error" : "text.success"} />
                </Grid>
                <Grid item xs={2}>
                  <TextView component="p" textAlign="center" variant="Medium_12" text={numberWithCommas(item.commission.toFixed(2))} />
                </Grid>
                <Grid item xs={2}>
                  <TextView component="p" textAlign="center" variant="Medium_12" text={numberWithCommas(item.netPNL.toFixed(2))} color={item.netPNL < 0 ? "text.error" : "text.success"} />
                </Grid>
                <Grid item xs={2}>
                  <TextView textAlign="center" component="p" variant="Medium_12" text={item.orderCount} />
                </Grid>
                <Grid item xs={2}>
                  <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {item.avgLeverage === 0 ? (
                      <TextView
                        textAlign="center"
                        component="p"
                        variant="Medium_12"
                        text={`--`}
                        color={getLeverageTextColor(0)}
                        style={{ backgroundColor: getLeverageBackgroundColor(0), padding: "2px 12px", border: `1px solid ${getLeverageBorderColor(0)}`, borderRadius: 0.5 }}
                      />
                    ) : (
                      <TextView
                        textAlign="center"
                        component="p"
                        variant="Medium_12"
                        text={`${item.avgLeverage}x`}
                        color={getLeverageTextColor(item.avgLeverage)}
                        style={{
                          backgroundColor: getLeverageBackgroundColor(item.avgLeverage),
                          padding: "2px 12px",
                          border: `1px solid ${getLeverageBorderColor(item.avgLeverage)}`,
                          borderRadius: 0.5
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            ))}
          </>
        )}
      </Grid>
      {tableData.length !== 0 && (
        <Grid container item xs={12} justifyContent={"flex-end"} mt={1}>
          <TablePagination page={currentPage} totalPages={totalPages} setPage={setCurrentPage} />
        </Grid>
      )}

      {loader ? (
        <Box height={290} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <CircularProgress color="success" />
        </Box>
      ) : tableData.length === 0 ? (
        <Box height={290} width={"100%"}>
          <TableNoRowsOverlay message={"No Active Data"} />
        </Box>
      ) : (
        <>
          {currentRows.map((item, index) => (
            <Grid container item xs={12} justifyContent={"space-between"} key={index + item.startTime} mb={2} alignItems={"center"}>
              {/* Date */}
              <Grid item xs={1.5}>
                <TextView component="p" variant="Medium_12" text={epochToDateShortFormat(item.startTime)} />
              </Grid>
              {/* Gross P&L */}
              <Grid item xs={2}>
                <TextView component="p" textAlign="center" variant="Medium_12" text={numberWithCommas(item.realisedPNL.toFixed(2))} color={item.realisedPNL < 0 ? "text.error" : "text.success"} />
              </Grid>
              <Grid item xs={2}>
                <TextView component="p" textAlign="center" variant="Medium_12" text={numberWithCommas(item?.commission > 0 ? "+" + item.commission.toFixed(2) : item.commission.toFixed(2))} />
              </Grid>
              <Grid item xs={2}>
                <TextView component="p" textAlign="center" variant="Medium_12" text={numberWithCommas(item.netPNL.toFixed(2))} color={item.netPNL < 0 ? "text.error" : "text.success"} />
              </Grid>
              <Grid item xs={2}>
                <TextView textAlign="center" component="p" variant="Medium_12" text={item.orderCount} />
              </Grid>
              <Grid item xs={2}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                  {item.avgLeverage === 0 ? (
                    <TextView
                      textAlign="center"
                      component="p"
                      variant="Medium_12"
                      text={`--`}
                      color={getLeverageTextColor(0)}
                      style={{ backgroundColor: getLeverageBackgroundColor(0), padding: "2px 12px", border: `1px solid ${getLeverageBorderColor(0)}`, borderRadius: 0.5 }}
                    />
                  ) : (
                    <TextView
                      textAlign="center"
                      component="p"
                      variant="Medium_12"
                      text={`${item.avgLeverage}x`}
                      color={getLeverageTextColor(item.avgLeverage)}
                      style={{ backgroundColor: getLeverageBackgroundColor(item.avgLeverage), padding: "2px 12px", border: `1px solid ${getLeverageBorderColor(item.avgLeverage)}`, borderRadius: 0.5 }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </>
  );
};

export default DailyPnLTable;

const getLeverageBackgroundColor = (value: number) => {
  if (value <= 10) {
    return "#11221C";
  } else if (value <= 25) {
    return "#292213";
  } else {
    return "#2B1817";
  }
};
const getLeverageBorderColor = (value: number) => {
  if (value <= 10) {
    return "#1D6C4D";
  } else if (value <= 25) {
    return "#6B551D";
  } else {
    return "#953F36";
  }
};
const getLeverageTextColor = (value: number) => {
  if (value <= 10) {
    return "text.success";
  } else if (value <= 25) {
    return "text.warning";
  } else {
    return "text.error";
  }
};
