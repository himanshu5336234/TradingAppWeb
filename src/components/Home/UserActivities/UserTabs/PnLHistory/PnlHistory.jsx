import React, { useEffect, useState } from "react";
import { Table, TableContainer, TableFooter, TablePagination, TableRow, Box, Grid, Typography, MenuItem, Autocomplete, TextField, Tooltip } from "@mui/material";
import { NewPnLHistorySubHeader, PnLHistorySubHeader, selectBoxMenuItems } from "../../UserActivitiesObjects";
import { typographyGridSubHeader, tablePaginationStyle, autoCompeleteBoxStyles } from "../UserTabs.style";
import { usePnLHistory } from "@/frontend-BL/businessHooks/PnL_HISTORY/usePnLHistory";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalenderModal from "@/components/CustomModals/newModal/CalenderModal";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";

import PnlHistoryRow from "./PnlHistoryRow";
import TextView from "@/components/UI/TextView/TextView";
const PnLHistory = ({ clearFilters, setClearFilters, setIsDownloadDisabled, hideTradingFee }) => {
  const [showCalender, setShowCalender] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const { PnLHistory, selectedDateRange, setSelectDateRange, setStateData, stateData, handlePeriodChange, totalPageData } = usePnLHistory({ page, rowsPerPage });
  useEffect(() => {
    if (clearFilters) {
      setStateData({
        selectedSymbol: "",
        side: "Entry Side",
        period: "Entry Time"
      });
      setClearFilters(false);
    }
  }, [clearFilters]);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { period, side, selectedSymbol } = stateData;
  useEffect(() => {
    if (PnLHistory?.length === 0) setIsDownloadDisabled(true);
    else setIsDownloadDisabled(false);
  }, [PnLHistory]);
  const activeSymbols = useSelector((state) => state.tradablesymbolList.tradablesymbolList);
  const getTextViewByName = (name) => {
    switch (name) {
      case "SIZE":
        return <TextView text={"It is executed size for closed position"} />;
      case "Entry Price(USDT)":
        return <TextView text={"Average Price in which position was entered"} />;
      case "Exit Price(USDT)":
        return <TextView text={"Average price via which position was exited"} />;
      case "Entry Time":
        return <TextView text={"Entry Time"} />;
      case "Exit Time":
        return <TextView text={"Exit Time"} />;
      case "GROSS P&L (USDT)":
        return <TextView text={"GROSS P&L (USDT)"} />;
      case "FEE (USDT)":
        return <TextView text={"FEE (USDT)"} />;
      default:
        return;
    }
  };
  const getSelectBox = (name) => {
    if (name === "Contract") {
      return (
        <Autocomplete
          disableClearable
          options={["Symbol", ...activeSymbols.map((item) => item.symbol)]}
          renderOption={(props, symbol) => (
            <MenuItem key={symbol} id={symbol} sx={typographyGridSubHeader} value={symbol === "Symbol" ? "ALL" : symbol} {...props}>
              {symbol === "Symbol" ? "ALL" : symbol}
            </MenuItem>
          )}
          renderInput={(params) => (
            <TextField
              sx={{
                ".MuiInputBase-input": {
                  fontSize: "11px",
                  color: "text.regular",
                  textTransform: "uppercase",
                  width: "50% !important",
                  fontWeight: 700,
                  height: "18px !important",
                  padding: "0px !important",
                  letterSpacing: "0.5px !important"
                }
              }}
              size="small"
              {...params}
            />
          )}
          value={selectedSymbol}
          onChange={(event, newValue) => {
            setPage(0);
            setStateData({ ...stateData, selectedSymbol: newValue });
          }}
          size="small"
          sx={autoCompeleteBoxStyles}
        ></Autocomplete>
      );
    } else {
      return (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            textTransform: "uppercase",
            alignItems: "left"
          }}
        >
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  color: "#ffff",
                  fontSize: "11px",
                  backgroundColor: "background.tertiary",
                  fontWeight: 600,
                  p: "10px",
                  maxWidth: "150px"
                }
              }
            }}
            arrow
            placement="top"
            title={getTextViewByName(name)}
          >
            <Typography letterSpacing={"0.5px"} sx={{ "&:hover": { color: name !== "SIDE" && "rgba(192, 223, 90, 1)" } }} color={"text.regular"} variant="medium_12_700" component={"span"}>
              {name}
            </Typography>
          </Tooltip>
        </Box>
      );
    }
  };

  return (
    <Box pl={0.8}>
      <Grid container justifyContent={"space-between"} alignItems={"center"} pt={3} px={2.5}>
        {NewPnLHistorySubHeader.map((headerData, idx) => (
          <Grid key={idx} id={`Pnl-${idx}`} xs={headerData.gridSize}>
            {getSelectBox(headerData.name)}
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          maxHeight: "300px",
          overflow: "hidden",
          overflowY: "scroll"
        }}
      >
        {(rowsPerPage > 0 && PnLHistory)?.map((item, index) => (
          <Box key={index}>
            <PnlHistoryRow hideTradingFee={hideTradingFee} rowData={item} index={index} />
          </Box>
        ))}
      </Box>
      <TableContainer>
        <Table>
          <TableFooter>
            <TableRow id="tablePagination">
              <TablePagination
                sx={tablePaginationStyle}
                id="tablePaginationCell"
                labelRowsPerPage="Results per view"
                rowsPerPageOptions={[5, 10, 20]}
                count={totalPageData}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {PnLHistory?.length === 0 && (
        <>
          <Grid my={2}>
            <TableNoRowsOverlay message={"No data found"} />
          </Grid>
        </>
      )}
      <CalenderModal selectedDateRange={selectedDateRange} setSelectDateRange={setSelectDateRange} showCalender={showCalender} setShowCalender={setShowCalender} />
    </Box>
  );
};

PnLHistory.propTypes = {
  clearFilters: PropTypes.bool,
  setClearFilters: PropTypes.func,
  setIsDownloadDisabled: PropTypes.func,
  hideTradingFee: PropTypes.bool
};

export default PnLHistory;
