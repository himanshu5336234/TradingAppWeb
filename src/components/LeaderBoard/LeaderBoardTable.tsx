import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

import PropTypes from "prop-types";
import MAccordionRow from "./MAccordionRow";

import { LEADER_BOARD_TABLE_WRAPPER_STYLE, LEADER_BOARD_MWEBTABLE_WRAPPER_STYLE } from "@/pages/LeaderBoard/styles";
import { LEADERBOARD_MWEBTABLE_COLUMN, LEADERBOARD_TABLE_COLUMN } from "./constant";
import TableNoRowsOverlay from "../Setting/Rewards/TableNoRowsOverlay";
// import LinearProgress from "@mui/material/LinearProgress";

const LeaderBoardTable = ({ tableData, pageSize, changePageSize, loading }) => {
  return (
    <>
      <Box sx={LEADER_BOARD_TABLE_WRAPPER_STYLE}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-iconSeparator": {
              display: "none"
            }
          }}
          disableSelectionOnClick
          disableColumnMenu
          columns={LEADERBOARD_TABLE_COLUMN}
          rows={tableData}
          pageSize={pageSize}
          onPageSizeChange={changePageSize}
          getRowId={(row) => row.userId}
          getRowClassName={(params) => {
            if (params.row.internalId % 2 === 0) {
              return "data-grid-even-rows";
            }
            return "data-grid-odd-rows";
          }}
          components={{
            NoRowsOverlay: () => <TableNoRowsOverlay message="No Users Found" />
            // LoadingOverlay: LinearProgress
          }}
          loading={loading}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
      <Box sx={LEADER_BOARD_MWEBTABLE_WRAPPER_STYLE}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-iconSeparator": {
              display: "none"
            }
          }}
          disableSelectionOnClick
          disableColumnMenu
          columns={LEADERBOARD_MWEBTABLE_COLUMN}
          rows={tableData}
          pageSize={pageSize}
          onPageSizeChange={changePageSize}
          components={{
            Row: (tableData) => <MAccordionRow row={tableData.row} />,
            NoRowsOverlay: () => <TableNoRowsOverlay message="No Users Found" />
          }}
          loading={loading}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.userId}
        />
      </Box>
    </>
  );
};

export default LeaderBoardTable;

LeaderBoardTable.propTypes = {
  pageSize: PropTypes.number,
  tableData: PropTypes.array,
  changePageSize: PropTypes.func,
  loading: PropTypes.bool
};
