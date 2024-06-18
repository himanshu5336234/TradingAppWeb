/* eslint-disable multiline-ternary */
import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import SideMenuRow from "./sideMenuRow";
import { Box } from "@mui/material";
import TableNoRowsOverlay from "../../Setting/Rewards/TableNoRowsOverlay";
const SideMenuALL = ({ tabText, TabsFilter, selectedCoin, SearchSymbol, closeDrawer }) => {
  const activeSymbols = useSelector((state) => [
    ...state.activeSymbolData.activeSymbols.sort((a, b) => {
      const symA = a.symbol.toUpperCase(); // Convert symbols to uppercase for case-insensitive sorting
      const symB = b.symbol.toUpperCase();

      if (symA < symB) {
        return -1;
      }
      if (symA > symB) {
        return 1;
      }
      return 0;
    })
  ]);

  const isFavouriteSymbol = useSelector((state) => state.favouriteSymbols.favouriteSymbols);
  const searchArray = (arr, searchTerm) => {
    // Escape special characters in the search term
    const term = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Filter the array to find matching elements
    const matchElements = arr.filter((element) => element.symbol.toUpperCase().startsWith(term.toUpperCase()));
    return matchElements;
  };
  const sortOrder = useMemo(() => {
    switch (TabsFilter) {
      case "lp":
        return activeSymbols.sort((a, b) => b[TabsFilter] - a[TabsFilter]);
      case "LP":
        return activeSymbols.sort((a, b) => a[TabsFilter.toLowerCase()] - b[TabsFilter.toLowerCase()]);
      case "percentage":
        return activeSymbols.sort((a, b) => b[TabsFilter] - a[TabsFilter]);
      case "PERCENTAGE":
        return activeSymbols.sort((a, b) => a[TabsFilter.toLowerCase()] - b[TabsFilter.toLowerCase()]);
      case "symbol":
        return searchArray(activeSymbols, SearchSymbol);
      default:
        return activeSymbols;
    }
  }, [activeSymbols, TabsFilter, SearchSymbol]);

  const ShowTabsUI = useMemo(() => {
    if (tabText === "ALL") {
      return (
        <>
          {sortOrder.length > 0 ? (
            sortOrder.map((data, index) => (
              <Box
                key={index}
                sx={{
                  m: 1,
                  borderRadius: "4px",
                  backgroundColor: [index % 2 === 0 ? "rgba(14, 14, 15, 0.5)" : "background.primary"]
                }}
              >
                <SideMenuRow symbol={data.symbol} cb={closeDrawer} />
              </Box>
            ))
          ) : (
            <TableNoRowsOverlay />
          )}
        </>
      );
    } else {
      return sortOrder.filter((f) => isFavouriteSymbol.some((item) => item === f.symbol)).length > 0 ? (
        sortOrder
          .filter((f) => isFavouriteSymbol.some((item) => item === f.symbol))
          .map((data, index) => (
            <Box
              key={index}
              sx={{
                height: "50px",
                m: 1,
                borderRadius: "4px",
                backgroundColor: [index % 2 === 0 ? "rgba(14, 14, 15, 0.5)" : "background.primary"]
              }}
            >
              <SideMenuRow cb={closeDrawer} symbol={data.symbol} />
            </Box>
          ))
      ) : (
        <TableNoRowsOverlay message={"No Data Found"} />
      );
    }
  }, [tabText, TabsFilter, sortOrder, activeSymbols, SearchSymbol, isFavouriteSymbol]);
  return <>{ShowTabsUI}</>;
};
SideMenuALL.propTypes = {
  closeDrawer: PropTypes.func,
  setSelectedCoin: PropTypes.func,
  selectedCoin: PropTypes.string,
  SearchSymbol: PropTypes.string,
  tabText: PropTypes.string,
  TabsFilter: PropTypes.string
};
export default memo(SideMenuALL);
