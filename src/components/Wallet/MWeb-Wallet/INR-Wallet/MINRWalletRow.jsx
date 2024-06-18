import { formatFiatTypes } from "@/helpers/wallet/formatTransactionTypes";
import { Box } from "@mui/material";
import { Typography } from "@mui/material/node";
import PropTypes from "prop-types";
import React from "react";

const MINRWalletRow = ({ row }) => {
  const createdDate = new Date(row.createdAt).toDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#25252B",
        height: 70,
        display: "flex",
        justifyContent: "space-between",
        p: 1,
        borderBottom: "0.3px solid rgba(169, 169, 169, 0.30)",
        alignItems: "center"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="Regular_12">{formatFiatTypes(row.fiatTransactionType)}</Typography>
        <Typography variant="Regular_9" color={"#A9A9A9"}>
          {createdDate}
        </Typography>
        <Typography variant="Regular_9" color={"#A9A9A9"} sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          Reference ID: {row.txnRefID ? row.txnRefID : "---"}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="SemiBold_14"
          sx={{
            ...(row.amount >= 0 ? { color: "trade.primary" } : { color: "trade.secondary" })
          }}
        >
          {parseFloat(row.amount).toFixed(2)}
        </Typography>
        <Typography
          sx={{
            ...(row.fiatTransactionStatus === "SUCCESS" ? { color: "white" } : { color: "#A9A9A9" }),
            fontSize: "9px",
            textAlign: "end"
          }}
        >
          {row.fiatTransactionStatus}
        </Typography>
      </Box>
    </Box>
  );
};

export default MINRWalletRow;
MINRWalletRow.propTypes = {
  row: PropTypes.object
};
