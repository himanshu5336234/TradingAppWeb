import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Mui & theme
import { Table, TableContainer, TableFooter, TablePagination, TableRow, Box, Grid, Typography, MenuItem, Autocomplete, TextField } from "@mui/material";
import CalenderModal from "@/components/CustomModals/newModal/CalenderModal";

// Assets, strings, constants
import { OrderHistorySubHeader, selectBoxMenuItems } from "../../UserActivitiesObjects";
import { tablePaginationStyle, typographyGridSubHeader, autoCompeleteBoxStyles } from "../UserTabs.style";

// Comaponents and helper components

import PropTypes from "prop-types";
import { useOrderHistory } from "@/frontend-BL/businessHooks";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import OrderHistoryRow from "./OrderHistoryRow";

const OrderHistory = ({ clearFilters, setClearFilters, setIsDownloadDisabled }) => {
  const NO_ORDER_HISTORY_TEXT = "No orders  so far";

  const activeSymbols = useSelector((state) => state.tradablesymbolList.tradablesymbolList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showCalender, setShowCalender] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const {
    orderHistory,
    period,
    setPeriod,
    selectedSymbol,
    setSelectedSymbol,
    orderSide,
    setOrderSide,
    orderType,
    setOrderType,
    orderStatus,
    setOrderStatus,
    reduceOnly,
    setReduceOnly,
    // selectedDateRange,
    setSelectDateRange,
    handlePeriodChange,
    totalPages
  } = useOrderHistory({ page, rowsPerPage });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    if (orderHistory.length === 0) setIsDownloadDisabled(true);
    else setIsDownloadDisabled(false);
  }, [orderHistory]);

  useEffect(() => {
    if (clearFilters) {
      setPeriod("Entry Time");
      setSelectDateRange({ from: "", to: "" });
      setOrderSide("Side");
      setOrderType("Order Type");
      setOrderStatus("Status");
      setReduceOnly("Reduce Only");
      setSelectedSymbol("Symbol");
      setClearFilters(false);
    }
  }, [clearFilters]);

  const getSelectBox = (name) => {
    if (name === "TIME") {
      return (
        <Autocomplete
          id="Entry-Time"
          disableClearable
          options={["Entry Time", ...selectBoxMenuItems?.period?.map((item) => item.name)]}
          renderOption={(props, et) =>
            // eslint-disable-next-line multiline-ternary
            et === "Custom" ? (
              <MenuItem
                value={et}
                sx={{ ...typographyGridSubHeader, alignItems: "center" }}
                onClick={() => {
                  setShowCalender(true);
                  setPeriod("Custom");
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  {et}
                  <CalendarTodayIcon sx={{ marginLeft: "4px", fontSize: "14px" }} />
                </Box>
              </MenuItem>
            ) : (
              <MenuItem key={et} sx={typographyGridSubHeader} value={et === "Entry Time" ? "All" : et} {...props}>
                {et === "Entry Time" ? "All" : et}
              </MenuItem>
            )
          }
          renderInput={(params) => {
            return (
              <TextField
                sx={{
                  ".MuiInputBase-input": {
                    textTransform: "uppercase",
                    fontSize: "11px",
                    color: "text.regular",
                    width: "50% !important",
                    height: "18px !important",
                    padding: "0px !important"
                  }
                }}
                size="small"
                {...params}
              />
            );
          }}
          value={period}
          onChange={(event, newValue) => {
            setPage(0);
            handlePeriodChange(newValue);
          }}
          size="small"
          sx={autoCompeleteBoxStyles}
        />
      );
    }
    if (name === "SYMBOL") {
      return (
        <Autocomplete
          disableClearable
          options={["Symbol", ...activeSymbols.map((item) => item.symbol)]}
          renderOption={(props, symbol) => (
            <MenuItem key={symbol} sx={typographyGridSubHeader} value={symbol === "Symbol" ? "All" : symbol} {...props}>
              {symbol === "Symbol" ? "All" : symbol}
            </MenuItem>
          )}
          renderInput={(params) => {
            return (
              <TextField
                sx={{
                  ".MuiInputBase-input": {
                    textTransform: "uppercase",
                    fontSize: "11px",
                    color: "text.regular",
                    width: "50% !important",
                    height: "18px !important",
                    padding: "0px !important"
                  }
                }}
                size="small"
                {...params}
              />
            );
          }}
          value={selectedSymbol}
          onChange={(event, newValue) => {
            setPage(0);
            setSelectedSymbol(newValue);
          }}
          size="small"
          sx={autoCompeleteBoxStyles}
        ></Autocomplete>
      );
    } else if (name === "ORDER TYPE") {
      return (
        <Autocomplete
          disableClearable
          options={[...selectBoxMenuItems?.orderType?.map((item) => item.name)]}
          renderOption={(props, type) => (
            <MenuItem key={type} sx={typographyGridSubHeader} value={type === "Order Type" ? "All" : type} {...props}>
              {type === "Order Type" ? "All" : type}
            </MenuItem>
          )}
          renderInput={(params) => {
            return (
              <TextField
                sx={{
                  ".MuiInputBase-input": {
                    textTransform: "uppercase",
                    fontSize: "11px",
                    color: "text.regular",
                    width: "50% !important",
                    height: "18px !important",
                    padding: "0px !important"
                  }
                }}
                size="small"
                {...params}
              />
            );
          }}
          value={orderType}
          onChange={(event, newValue) => {
            setPage(0);
            setOrderType(newValue);
          }}
          size="small"
          sx={autoCompeleteBoxStyles}
        ></Autocomplete>
      );
    } else if (name === "SIDE") {
      return (
        <Autocomplete
          disableClearable
          options={["Side", ...selectBoxMenuItems?.orderSide?.map((item) => item.name)]}
          renderOption={(props, side) => (
            <MenuItem key={side} sx={typographyGridSubHeader} value={side === "Side" ? "All" : side} {...props}>
              {side === "Side" ? "All" : side}
            </MenuItem>
          )}
          renderInput={(params) => {
            return (
              <TextField
                sx={{
                  ".MuiInputBase-input": {
                    textTransform: "uppercase",
                    fontSize: "11px",
                    color: "text.regular",
                    width: "80% !important",
                    height: "18px !important",
                    padding: "0px !important"
                  }
                }}
                size="small"
                {...params}
                // inputProps={ { ...params.inputProps, value: getOrderSide(params.inputProps.value, true).val }}
              />
            );
          }}
          value={orderSide}
          onChange={(event, newValue) => {
            setPage(0);
            setOrderSide(newValue);
          }}
          size="small"
          sx={autoCompeleteBoxStyles}
        ></Autocomplete>
      );
    } else if (name === "REDUCE ONLY") {
      return (
        <Autocomplete
          disableClearable
          options={[...selectBoxMenuItems?.reduceOnly?.map((item) => item.name)]}
          renderOption={(props, ro) => (
            <MenuItem key={ro} sx={typographyGridSubHeader} value={ro === "Reduce Only" ? "All" : ro} {...props}>
              {ro === "Reduce Only" ? "All" : ro}
            </MenuItem>
          )}
          renderInput={(params) => {
            return (
              <TextField
                sx={{
                  ".MuiInputBase-input": {
                    textTransform: "uppercase",
                    fontSize: "11px",
                    color: "text.regular",
                    width: "50% !important",
                    height: "18px !important",
                    padding: "0px !important"
                  }
                }}
                size="small"
                {...params}
              />
            );
          }}
          value={reduceOnly}
          onChange={(event, newValue) => {
            setPage(0);
            setReduceOnly(newValue);
          }}
          size="small"
          sx={{
            ...autoCompeleteBoxStyles
          }}
        ></Autocomplete>
      );
    } else if (name === "STATUS") {
      return (
        <Autocomplete
          disableClearable
          options={[...selectBoxMenuItems?.status?.map((item) => item.name)]}
          renderOption={(props, status) => (
            <MenuItem key={status} sx={typographyGridSubHeader} value={status === "Status" ? "All" : status} {...props}>
              {status === "Status" ? "All" : status}
            </MenuItem>
          )}
          renderInput={(params) => {
            return (
              <TextField
                sx={{
                  width: "100px",
                  ".MuiInputBase-input": {
                    textTransform: "uppercase",
                    fontSize: "11px",
                    color: "text.regular",
                    width: "50% !important",
                    height: "18px !important",
                    padding: "0px !important"
                  }
                }}
                size="small"
                {...params}
              />
            );
          }}
          value={orderStatus}
          onChange={(event, newValue) => {
            setPage(0);
            setOrderStatus(newValue);
          }}
          size="small"
          sx={autoCompeleteBoxStyles}
        ></Autocomplete>
      );
    } else {
      return (
        <Box sx={{ textTransform: "uppercase", display: "flex", height: "100%", alignItems: "center" }}>
          <Typography color="text.regular" variant="medium_12_700">
            {name}
          </Typography>
        </Box>
      );
    }
  };
  return (
    <Box pl={0.8}>
      <CalenderModal setSelectDateRange={setSelectDateRange} showCalender={showCalender} setShowCalender={setShowCalender} />
      <Grid container pt={3} px={2.5} justifyContent={"space-between"} alignItems={"center"}>
        {OrderHistorySubHeader.map((headerData, idx) => (
          <Grid item key={idx} id={`orderHistory"+${idx}`} xs={headerData.gridSize}>
            {getSelectBox(headerData.name)}
          </Grid>
        ))}
      </Grid>
      {orderHistory.length === 0 && (
        <>
          <Grid my={2}>
            <TableNoRowsOverlay message={NO_ORDER_HISTORY_TEXT} />
          </Grid>
        </>
      )}
      <Box
        sx={{
          maxHeight: "250px",
          overflow: "hidden",
          overflowY: "scroll"
        }}
      >
        {(rowsPerPage > 0 && orderHistory)?.map((rowData, index) => (
          <Box key={index}>
            <OrderHistoryRow rowData={rowData} key={rowData.orderId} index={index} />
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
                count={totalPages}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

OrderHistory.propTypes = {
  clearFilters: PropTypes.bool,
  setClearFilters: PropTypes.func,
  setIsDownloadDisabled: PropTypes.func
};
export default OrderHistory;
