import { Box, Grid, Tooltip } from "@mui/material";
import React, { useCallback, useState } from "react";
import { SymbolPrecisionHelper } from "@/helpers";
import TextView from "@/components/UI/TextView/TextView";
import PnLOrderSummaryModal from "@/components/CustomModals/newModal/PnLOrderSummaryModal";
import { FETCH_TRADES } from "@/frontend-api-service/Api/PnLHistory/PnLHistory";
import { SymbolWrapper } from "@/components/UI/SymbolWrapper/SymbolWrapper";

const options: Object = {
  year: "numeric",
  month: "short",
  day: "numeric"
};
const PnlHistoryRow = ({ hideTradingFee, rowData, index }: { rowData: any; index: string; hideTradingFee: Boolean }) => {
  const { Type, DataPnl, DataCharge } = rowData;
  const { setDecimalPrecision, symbolQuantityPrecision, symbolPricePrecision } = SymbolPrecisionHelper({ symbol: DataPnl?.Symbol });
  const [showOrderSummaryModal, setShowOrderSummaryModal] = useState<boolean>(false);
  const [allTrades, setAllTrades] = useState([]);

  const handleSeeTradeDetails = useCallback(
    (id: string) => {
      setShowOrderSummaryModal(true);
      FETCH_TRADES(id).then((data: any) => setAllTrades(data.order));
    },
    [DataPnl?.OrderID]
  );
  if (Type === "CHARGE") {
    if (hideTradingFee) return null;
    const fee = DataCharge?.DisplayText.split(" ");
    return (
      <Grid
        id={"PnLHistory-Row-" + index}
        key={rowData.id}
        container
        p={1}
        width={"100%"}
        m={"auto"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          background: "#29292E",
          border: "1px solid #1B1B1F",
          borderRadius: "4px",
          marginTop: "15px"
        }}
      >
        {/* <Box sx={{display:"flex", alignItems:"center" , gap:"10px", width:"80%"}}> */}
        <Grid container justifyContent={DataCharge?.Symbol ? "space-between" : "center"} alignItems={"center"} item xs={1.5}>
          {DataCharge?.Symbol ? <SymbolWrapper symbol={DataCharge?.Symbol} /> : <TextView variant="medium_12_500">---</TextView>}
        </Grid>
        <Grid item xs={0.9}>
          <TextView component={"p"} variant="medium_12_500">
            {fee[0] + " " + fee[1]}
          </TextView>
        </Grid>
        <Grid item xs={1}>
          <TextView style={{ textTransform: "capitalize" }} component={"p"} variant="medium_12_500">
            {fee[2] || "---"}
          </TextView>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}>
          <TextView component={"p"} variant="medium_12_500" id="orderHistory-rowdata-Time">
            {new Date(DataCharge?.Time).toLocaleDateString("en-IN", options)}
          </TextView>
          <TextView color={"text.regular"} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-entryTime">
            {new Date(DataCharge?.Time).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </TextView>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}>
          <TextView style={{ pt: "auto", mr: "2rem" }} variant="medium_12_500" color={DataCharge?.Amount > 0 ? "text.success" : "text.error"}>
            {DataCharge?.Amount?.toFixed(4)}
          </TextView>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    );
  }
  return (
    <>
      <Grid
        id={"PnLHistory-Row-" + index}
        key={rowData.id}
        container
        p={2.5}
        sx={{
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Grid container justifyContent={"space-between"} alignItems={"center"} item xs={1.5}>
          <SymbolWrapper symbol={DataPnl?.Symbol} />
        </Grid>
        <Grid item xs={1}>
          <TextView
            variant="medium_12_500"
            id={`PnLHistory-${DataPnl?.Side}-side`}
            style={{
              color: DataPnl?.Side === "BUY" ? "text.success" : "text.error",
              textAlign: "center",
              leterSpacing: "0.5px"
            }}
            text={DataPnl?.Side === "BUY" ? "LONG" : "SHORT"}
          />
        </Grid>
        <Grid item xs={1}>
          <TextView
            style={{ leterSpacing: "0.5px" }}
            text={(Number(DataPnl?.ExecutedQty.toFixed(5)) * Number(DataPnl?.EntryPrice)).toFixed(2) + " USDT"}
            component={"p"}
            variant="medium_12_500"
            id="PnLHistory-QtyInUsdt"
          />
          <TextView style={{ leterSpacing: "0.5px" }} component={"p"} variant="medium_12_500" color={"text.secondary"} id="PnLHistory-Qty">
            {setDecimalPrecision(DataPnl?.ExecutedQty, symbolQuantityPrecision)} {DataPnl?.Symbol?.toUpperCase().replace("USDT", "")}
          </TextView>
        </Grid>

        <Grid item xs={1.5}>
          <TextView style={{ leterSpacing: "0.5px" }} variant="medium_12_500" id="PnLHistory-EntryPrice">
            {setDecimalPrecision(DataPnl?.EntryPrice?.toString(), symbolPricePrecision)}
          </TextView>
        </Grid>
        <Grid item xs={1}>
          <TextView style={{ leterSpacing: "0.5px" }} variant="medium_12_500" id="PnLHistory-ExitPrice">
            {setDecimalPrecision(DataPnl?.ExitPrice?.toString(), symbolPricePrecision)}
          </TextView>
        </Grid>
        <Grid item xs={1}>
          <TextView style={{ leterSpacing: "0.5px" }} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-Time">
            {new Date(DataPnl?.EntryTime).toLocaleDateString("en-IN", options)}
          </TextView>
          <TextView style={{ leterSpacing: "0.5px" }} color={"text.regular"} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-entryTime">
            {new Date(DataPnl?.EntryTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </TextView>
        </Grid>
        <Grid item xs={1}>
          <TextView style={{ leterSpacing: "0.5px" }} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-Time">
            {new Date(DataPnl?.ExitTime).toLocaleDateString("en-IN", options)}
          </TextView>
          <TextView style={{ leterSpacing: "0.5px" }} color={"text.regular"} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-entryTime">
            {new Date(DataPnl?.ExitTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </TextView>
        </Grid>
        <Grid item xs={1.2}>
          <TextView
            style={{ leterSpacing: "0.5px" }}
            variant="medium_12_500"
            color={DataPnl?.GrossPnl > 0 ? "text.success" : DataPnl?.GrossPnl === 0 ? "text.white" : "text.error"}
            id="PnLHistory-realizePnL"
          >
            {DataPnl?.GrossPnl.toFixed(4)}
          </TextView>
        </Grid>
        <Grid item xs={1}>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  color: "#ffff",
                  fontSize: "11px",
                  backgroundColor: "background.tertiary",
                  fontWeight: 600,
                  p: "10px",
                  maxWidth: "200px",
                  ml: "40px"
                }
              }
            }}
            arrow
            placement="top"
            title={
              <Grid container>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <TextView style={{ leterSpacing: "0.5px" }} color={"text.quaternary"} variant={"medium_12_500"}>
                    Entry Fee
                  </TextView>
                  <TextView style={{ leterSpacing: "0.5px" }} color={"text.black"} variant={"medium_12_500"}>
                    {DataPnl?.EntryFee.toFixed(4)} USDT
                  </TextView>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <TextView style={{ leterSpacing: "0.5px" }} color={"text.quaternary"} variant={"medium_12_500"}>
                    Exit Fee
                  </TextView>
                  <TextView style={{ leterSpacing: "0.5px" }} color={"text.black"} variant={"medium_12_500"}>
                    {DataPnl?.ExitFee.toFixed(4)} USDT
                  </TextView>
                </Box>
              </Grid>
            }
          >
            <Grid p={1} item xs={1}>
              <TextView
                variant="medium_12_500"
                id="PnLHistory-FeePaid"
                style={{
                  borderRadius: "4px",
                  "&:hover": {
                    color: "text.main"
                  },
                  letterSpacing: "0.5px"
                }}
              >
                {DataPnl?.Fee?.toFixed(4)}
              </TextView>
            </Grid>
          </Tooltip>
        </Grid>
        <Grid textAlign={"right"} item xs={1}>
          <TextView id={"see details"} onClick={() => handleSeeTradeDetails(DataPnl.OrderID)} style={{ textDecoration: "underline", cursor: "pointer" }} variant="medium_12_500" text={"See Details"} />
        </Grid>
      </Grid>
      <PnLOrderSummaryModal
        IsOpen={showOrderSummaryModal}
        type="DISPLAY"
        dataOrderId={DataPnl?.OrderID}
        ExitTradeIds={DataPnl?.ExitTradeIds}
        allTrades={allTrades || {}}
        secondaryAction={() => {
          setShowOrderSummaryModal(false);
        }}
      />
    </>
  );
};

export default PnlHistoryRow;
