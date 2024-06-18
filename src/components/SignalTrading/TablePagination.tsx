import React from "react";
import { Box, Typography } from "@mui/material";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageFunction: (val: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({ page, totalPages, setPage, pageFunction }) => {
  const handlePageChange = (offset: number) => {
    if (offset === -1 && page > 1) {
      if (pageFunction) {
        pageFunction(page - 1);
        return;
      }
      setPage((prevPage) => prevPage - 1);
    } else if (offset === 1 && page < totalPages) {
      if (pageFunction) {
        pageFunction(page + 1);
        return;
      }
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "30%"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography onClick={() => handlePageChange(-1)} style={{ fontSize: "30px", cursor: "pointer", color: page === 1 && "gray" }}>
          &#8592;
        </Typography>
        <Typography mt={0.5}>
          {" "}
          {page} {" Of "} {totalPages}{" "}
        </Typography>
        <Typography onClick={() => handlePageChange(1)} style={{ fontSize: "30px", cursor: "pointer", color: page === totalPages && "gray" }}>
          &#8594;
        </Typography>
      </Box>
    </Box>
  );
};

export default TablePagination;
