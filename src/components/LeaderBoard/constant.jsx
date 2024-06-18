import { numberWithCommas } from "@/helpers/commaHelper";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import { Box, Typography } from "@mui/material";
import React from "react";
export const LEADERBOARD_TABLE_COLUMN = [
  {
    field: "rank",
    headerName: "Rank",
    type: "number",
    headerAlign: "left",
    align: "left",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    renderCell: (params) => (
      <Typography variant="Regular_14" color={"text.main"}>
        {params.row.rank <= 9 && 0}
        {params.row.rank}
      </Typography>
    ),
    sortable: false
  },
  {
    field: "nickname",
    type: "string",
    headerName: "Nickname",
    headerAlign: "left",
    minWidth: 150,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "left",
    renderCell: (params) => <Typography variant="Regular_14">{params.row.nickname}</Typography>,
    sortable: false
  },
  {
    field: "volume",
    headerName: "Volume (in USDT)",
    headerAlign: "left",
    type: "number",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "left",
    renderCell: (params) => <Typography variant="Regular_14">{numberWithCommas(params?.row?.volume)}</Typography>,
    sortable: false
  },
  {
    field: "favouritePair",
    headerName: "Favourite Pair",
    headerAlign: "left",
    type: "number",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "left",
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
        <img src={getCurrencyUrl(params.row?.favouritePair.replace("USDT", "").toLowerCase())} alt={""} style={{ borderRadius: "50%", backgroundColor: "white", width: "16px", height: "16px" }} />
        <Typography variant="Regular_14" sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
          {params.row?.favouritePair}
        </Typography>
      </Box>
    ),
    sortable: false
  }
];

export const LEADERBOARD_MWEBTABLE_COLUMN = [
  {
    field: "nickname",
    type: "string",
    headerName: "Nickname",
    headerAlign: "center",
    minWidth: 150,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "center",
    sortable: false
  },
  {
    field: "volume",
    headerName: "Volume (in USDT)",
    headerAlign: "center",
    type: "number",
    minWidth: 120,
    flex: 1.5,
    headerClassName: "data-grid-header",
    align: "center",
    sortable: false
  }
];
