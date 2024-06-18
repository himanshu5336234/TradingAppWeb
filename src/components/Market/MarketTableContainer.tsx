import React, { useEffect, useState } from "react";
import { Grid, Box, TableContainer, Table, TableFooter, TableRow, TablePagination, InputAdornment } from "@mui/material";
import MarketTableRow from "./MarketTableRow";
import { useSelector } from "react-redux";
import { marketTableHearder } from "./TableHeaders";
import { tablePaginationStyle } from "../Home/UserActivities/UserTabs/UserTabs.style";
import TextView from "../UI/TextView/TextView";
import BasicSearchFields from "../UI/CustomInput/BasicSearchFields";
import ToggleGroup from "../UI/ToggleGroup/ToggleGroup";
import Search from "@mui/icons-material/Search";

function MarketTableContainer() {
  const isFavouriteSymbol = useSelector((state: any) => state.favouriteSymbols.favouriteSymbols);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterParam, setFilterParam] = useState("all");
  const tradableSymbolList = useSelector((state: any) => state.tradablesymbolList.tradablesymbolList);
  const [searchParam, setSearchParam] = useState("");

  const handleChangeFilter = (_event: any, newVal: string) => {
    if (newVal !== null) {
      setFilterParam(newVal);
    }
  };

  const SETSEARCHSYMBOL = (val: string) => {
    setSearchParam(val);
    setPage(0);
    setFilterParam("search");
  };

  const filterAllSymbol = () => {
    switch (filterParam) {
      case "favourite": {
        const tableR = tradableSymbolList.filter((sym: any) => isFavouriteSymbol.some((fsym: string) => fsym === sym.symbol));
        return tableR;
      }
      case "search":
        return tradableSymbolList.filter((item: any) => item.symbol.includes(searchParam.toUpperCase()));
      default:
        return tradableSymbolList;
    }
  };

  useEffect(() => {
    const marketTableRows = filterAllSymbol();
    setRows(marketTableRows);
  }, [filterParam, tradableSymbolList, searchParam]);

  return (
    <>
      <Grid container alignItems={"center"} justifyContent={"space-between"} item>
        <Grid item>
          <ToggleGroup
            value={filterParam.toUpperCase()}
            handleChange={handleChangeFilter}
            values={[
              { name: "All", value: "all", id: "filterBarToggles" },
              {
                name: "Favourites",
                value: "favourite",
                id: "filterBarToggles"
              }
            ]}
          />
        </Grid>

        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Box
            sx={{
              borderRadius: "8px",
              borderStyle: "solid",
              borderWidth: "0.5px",
              borderColor: "text.secondary",
              maxWidth: "375px"
            }}
          >
            <BasicSearchFields
              styles={{
                ".MuiInputBase-input": {
                  padding: "2px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "400"
                }
              }}
              variant="outlined"
              type="search"
              onChange={(event) => SETSEARCHSYMBOL(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "white" }} />
                  </InputAdornment>
                )
              }}
              id="searched-coin"
              placeholder="Search Coins"
              name="search"
            />
          </Box>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sx={{
          width: "98%",
          margin: "auto",
          justifyContent: "center"
        }}
        p={1}
      >
        {marketTableHearder.map((headerData, index) => (
          <Grid
            key={index}
            sx={
              headerData.styles ?? {
                justifyContent: "center",
                textAlign: "-webkit-center"
              }
            }
            xs={headerData?.gridSize}
          >
            <TextView text={headerData.name} variant="Regular_12" />
          </Grid>
        ))}
        <Box
          sx={{
            height: "500px",
            background: "",
            overflowY: "scroll",
            width: "100%",
            margin: "auto",
            mt: "8px"
          }}
        >
          {rows.length > 0 &&
            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
              <Box key={row.id}>
                <MarketTableRow symbol={row.symbol} />
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
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(_event, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default MarketTableContainer;
