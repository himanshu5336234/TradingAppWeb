import React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import { TableStyles } from "./TableData.styled";

const TableData = ({ columns, rows, rowAction, isColored, select, filterLabel }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {select ? (
        <>
          <Typography sx={{ m: 1 }} variant="h7" color="text.regular">
            {filterLabel}
          </Typography>
          {select}
        </>
      ) : (
        <></>
      )}
      <TableContainer component="div">
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                <TableCell key={index} sx={TableStyles.tableHeadCell}>
                  {column}
                </TableCell>
              ))}
              {rowAction && <TableCell sx={TableStyles.tableHeadCell}>{""}</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    background: "#666673"
                  }
                }}
              >
                {row?.map((cell, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      ...TableStyles.tableBodyCell,
                      ...(typeof cell === "number" && isColored && (cell > 0 ? { color: "trade.primary" } : parseFloat(cell) === 0 ? { color: "text.regular" } : { color: "error.primary" }))
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
                {rowAction && <TableCell sx={TableStyles.tableBodyCell}>{rowAction}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ color: "text.regular" }}
        rowsPerPageOptions={[15]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

TableData.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  rowAction: PropTypes.any,
  isColored: PropTypes.bool,
  select: PropTypes.any,
  filterLabel: PropTypes.string
};

export default TableData;
