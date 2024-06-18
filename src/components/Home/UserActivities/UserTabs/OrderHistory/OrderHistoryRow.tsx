import React, { useState } from "react";
import PropTypes from "prop-types";

// Mui & theme
import { Grid, Typography } from "@mui/material";

// Comaponents and helper components
import { SymbolPrecisionHelper } from "@/helpers";

import { SymbolWrapper } from "@/components/UI/SymbolWrapper/SymbolWrapper";
import OrderSummaryModal from "@/components/CustomModals/newModal/OrderSummaryModal";
const OrderHistoryRow = ({ rowData, index }: { rowData: any; index: string }) => {
  const { setDecimalPrecision, symbolQuantityPrecision, symbolPricePrecision } = SymbolPrecisionHelper({ symbol: rowData?.symbol });
  const [showOrderSummaryModal, setShowOrderSummaryModal] = useState(false);
  return (
    <>
      <Grid
        id={"orderHistory-Row-" + index}
        container
        sx={{
          p: 2.5,
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Grid item xs={0.9}>
          <Typography component={"p"} letterSpacing={"0.5px"} variant="medium_12_500" id="orderHistory-rowdata-Time">
            {new Date(rowData.time).toLocaleDateString()}
          </Typography>
          <Typography color={"text.regular"} letterSpacing={"0.5px"} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-Time">
            {new Date(rowData.time).toLocaleTimeString()}
          </Typography>
        </Grid>
        <Grid container gap={0.5} justifyContent={"space-between"} item xs={1.2}>
          <Grid item xs={2} container alignItems={"center"}>
            <SymbolWrapper symbol={rowData?.symbol} />
          </Grid>
        </Grid>
        <Grid item xs={0.6}>
          <Typography
            variant="medium_12_500"
            letterSpacing={"0.5px"}
            id={"orderHistory-" + rowData.side + "-Order-Side"}
            sx={{
              color: rowData.side === "LONG" ? "text.success" : "text.error",
              textAlign: "center"
            }}
          >
            {rowData.side}
          </Typography>
        </Grid>
        <Grid item xs={1.4}>
          <Typography letterSpacing={"0.5px"} color={"text.regular"} component={"p"} variant="medium_12_500" id={"orderHistory-" + rowData?.type + "-Order-Type"}>
            {rowData?.type?.split("_").join(" ")}
          </Typography>
        </Grid>

        <Grid item xs={1.4}>
          <Typography letterSpacing={"0.5px"} component={"p"} variant="medium_12_500" id="AorderHistory-ve-Exe-Time">
            {setDecimalPrecision(rowData.avgPrice, symbolPricePrecision)}
          </Typography>
        </Grid>
        <Grid item xs={1.2}>
          <Typography letterSpacing={"0.5px"} component={"p"} variant="medium_12_500" id="orderHistory-Executed-QTY">
            {rowData.executedQtyInUSDT.toFixed(2)}
            {" USDT"}
          </Typography>
          <Typography letterSpacing={"0.5px"} component={"p"} variant="medium_12_500" color={"text.regular"} id="orderHistory-Executed-QTY">
            {setDecimalPrecision(rowData.executedQty, symbolQuantityPrecision)} {rowData?.symbol.toUpperCase().replace("USDT", "")}
          </Typography>
        </Grid>
        <Grid item xs={1.3}>
          <Typography
            letterSpacing={"0.5px"}
            component={"p"}
            color={"text.regular"}
            variant="medium_12_500"
            borderRadius={"4px"}
            textTransform={"capitalize"}
            p={0.5}
            px={1}
            backgroundColor="background.secondary"
            id="orderHistory-Status"
          >
            {rowData.status.toLowerCase()}
          </Typography>
        </Grid>
        <Grid item xs={1.2}>
          <Typography letterSpacing={"0.5px"} component={"p"} variant="medium_12_500" id="orderHistory-Reduce-Only">
            {rowData.reduceOnly}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <Typography letterSpacing={"0.5px"} component={"p"} variant="medium_12_500" id="orderHistory-updated-Time">
            <Typography component={"p"} variant="medium_12_500" id="orderHistory-rowdata-Time">
              {new Date(rowData.updatedTime).toLocaleDateString()}
            </Typography>
            <Typography letterSpacing={"0.5px"} color={"text.regular"} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-Time">
              {new Date(rowData.updatedTime).toLocaleTimeString()}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            component={"p"}
            letterSpacing={"0.5px"}
            onClick={() => {
              setShowOrderSummaryModal(true);
            }}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            variant="medium_12_500"
          >
            See Details
          </Typography>
        </Grid>
      </Grid>
      {showOrderSummaryModal && (
        <OrderSummaryModal
          IsOpen={showOrderSummaryModal}
          orderId={rowData.orderId}
          updated={rowData.updatedTime}
          secondaryAction={() => {
            setShowOrderSummaryModal(false);
          }}
        />
      )}
    </>
  );
};

OrderHistoryRow.propTypes = {
  rowData: PropTypes.object,
  index: PropTypes.string,
  isExpanded: PropTypes.bool,
  setIsExpanded: PropTypes.func
};

export default OrderHistoryRow;
