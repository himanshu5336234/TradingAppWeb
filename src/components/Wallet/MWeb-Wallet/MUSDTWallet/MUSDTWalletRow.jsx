import { formatFuturesTypes } from "@/helpers/wallet/formatTransactionTypes";
import { Box } from "@mui/material";
import { Typography } from "@mui/material/node";
import PropTypes from "prop-types";
import React from "react";

const MUSDTWalletRow = ({ row }) => {
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
        px: 1,
        py: 2,
        borderBottom: "0.3px solid rgba(169, 169, 169, 0.30)",
        alignItems: "center"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="Regular_12">{formatFuturesTypes(row.incomeType)}</Typography>
        <Typography variant="Regular_9" color={"#A9A9A9"}>
          {createdDate}
        </Typography>
        <Typography variant="Regular_9" color={"#A9A9A9"}>
          Reference ID: {row.transactionID ? row.transactionID : "---"}
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
        {/* <Typography
            sx={{
              ...(row.fiatTransactionStatus === "SUCCESS"
                ? { color: "white" }
                : { color: "#A9A9A9" }),
              fontSize: "9px",
              textAlign: "end"
            }}
          >
            {row.fiatTransactionStatus}
          </Typography> */}
      </Box>
    </Box>
  );
};

export default MUSDTWalletRow;
MUSDTWalletRow.propTypes = {
  row: PropTypes.object
};
