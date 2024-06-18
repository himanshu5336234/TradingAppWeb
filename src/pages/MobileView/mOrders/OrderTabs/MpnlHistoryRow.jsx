import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography, Box, TablePagination, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { ACCODIAN, ACCORDIANGRIDITEM, ACCORDIANGRIDITEMHEADING, BORDER, FONT12, SECTIONHEIGHT } from "@/pages/MobileView/style";
import PropTypes from "prop-types";
import { ENTRY_TIME, ENTRY_PRICE, FEE_PAID, EXIT_TIME, EXIT_PRICE } from "@/pages/MobileView/mMagicString";
import { usePnLHistory } from "@/frontend-BL/businessHooks/PnL_HISTORY/usePnLHistory";
import { SymbolPrecisionHelper, epochToDateConvertor, sxColorUtility } from "@/helpers";
import { numberWithCommas } from "@/helpers/commaHelper";
import { postMetaDataApi } from "@/frontend-api-service/Api";
import { disableFreshChat, enableFreshChat } from "@/frontend-BL/services/ThirdPartyServices/FreshChat";
import usePollingServiceForDownloadHistory from "@/frontend-BL/services/PollingService/usePollingServiceForDownloadHistory";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useSelector } from "react-redux";
import DownloadHistoryModal from "@/components/CustomModals/newModal/DownloadHistoryModal";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import { SymbolWrapper } from "@/components/UI/SymbolWrapper/SymbolWrapper";
import TextView from "@/components/UI/TextView/TextView";
import PnLOrderSummaryModal from "@/components/CustomModals/newModal/PnLOrderSummaryModal";
import { FETCH_TRADES } from "@/frontend-api-service/Api/PnLHistory/PnLHistory";
const options = {
  year: "numeric",
  month: "short",
  day: "numeric"
};
const MpnlHistoryRow = ({ data, hideOtherPairs }) => {
  const { Type, DataPnl, DataCharge } = data;
  const { setDecimalPrecision, symbolQuantityPrecision, symbolPricePrecision } = SymbolPrecisionHelper({ symbol: DataPnl?.Symbol });
  const [allTrades, setAllTrades] = useState({});
  const [showOrderSummaryModal, setShowOrderSummaryModal] = useState(false);

  const handleSeeTradeDetails = (id) => {
    setShowOrderSummaryModal(true);
    FETCH_TRADES(id).then((data) => setAllTrades(data.order));
  };
  if (Type === "CHARGE") {
    if (hideOtherPairs) return null;
    const fee = DataCharge?.DisplayText.split(" ");
    return (
      <Grid
        container
        p={2}
        width={"99%"}
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
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", width: "80%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <TextView component={"p"} variant="medium_12_500">
              {fee[0] + " " + fee[1]}
            </TextView>
            <TextView component={"p"} variant="medium_12_500" color={"text.secondary"}>
              {fee[2]}
            </TextView>
          </Box>
          <TextView component={"p"} variant="medium_12_500" color={"text.secondary"}>
            |
          </TextView>
          <SymbolWrapper symbol={DataCharge?.Symbol} />
          <TextView component={"p"} variant="medium_12_500" color={"text.secondary"}>
            |
          </TextView>
          <Grid container gap={0.5} item xs={2.5}>
            <TextView component={"p"} variant="medium_12_500" id="orderHistory-rowdata-Time">
              {new Date(DataCharge?.Time).toLocaleDateString("en-IN", options)}
            </TextView>
            <TextView color={"text.regular"} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-entryTime">
              {new Date(DataCharge?.Time).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </TextView>
          </Grid>
        </Box>
        <TextView style={{ pt: "auto", mr: "2rem" }} variant="medium_12_500" color={DataCharge?.Amount > 0 ? "text.success" : "text.error"}>
          {DataCharge?.Amount}
        </TextView>
      </Grid>
    );
  }

  return (
    <>
      <Grid item xs={12}>
        <Accordion sx={ACCODIAN}>
          <AccordionSummary>
            <Grid container justifyContent={"space-between"} alignItems={"center"} gap={1}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center"
                    }}
                  >
                    <Typography
                      variant="Medium_12"
                      component={"p"}
                      sx={{
                        px: 1.7,
                        py: 0.4,
                        borderRadius: "2px",
                        textAlign: "center",
                        height: "fit-content",
                        color: DataPnl?.Side === "BUY" ? "text.success" : "text.error"
                      }}
                    >
                      {DataPnl?.Side === "BUY" ? "LONG" : "SHORT"}
                    </Typography>

                    <Grid container justifyContent={"space-between"} alignItems={"center"} item xs={1.2}>
                      <SymbolWrapper symbol={DataPnl?.Symbol} />
                    </Grid>
                  </Box>
                  <Box>
                    <ExpandMoreIcon sx={{ color: "text.mild", fontSize: "28px" }} />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Typography varient="h5" sx={FONT12}>
                  {DataPnl?.Fee?.toFixed(4)}
                </Typography>
                <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                  {FEE_PAID}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography style={{ leterSpacing: "0.5px" }} variant="medium_12_500" color={DataPnl?.realizedPnL > 0 ? "text.success" : "text.error"} id="PnLHistory-realizePnL">
                  {DataPnl?.GrossPnl.toFixed(4)}
                </Typography>
                <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                  {"GROSS P&L (USDT)"}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={BORDER}>
            <Grid container p={1} gap={2} justifyContent="space-between">
              <Grid container gap={2} justifyContent="space-between">
                <Grid item xs={3.5}>
                  <Typography variant="medium_12_700">{"Size"}</Typography>
                  <Grid gap={0.5} display={"flex"} flexDirection={"column"} item xs={5}>
                    <Typography variant="medium_12_500">{(Number(DataPnl?.ExecutedQty.toFixed(5)) * Number(DataPnl?.EntryPrice)).toFixed(2) + " USDT"}</Typography>
                    <Typography color={"text.secondary"} variant="medium_12_500">
                      {setDecimalPrecision(DataPnl?.ExecutedQty, symbolQuantityPrecision)} {DataPnl?.Symbol?.toUpperCase().replace("USDT", "")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                  <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                    {ENTRY_TIME}
                  </Typography>

                  <Grid item xs={5}>
                    <Typography style={{ leterSpacing: "0.5px" }} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-Time">
                      {new Date(DataPnl?.EntryTime).toLocaleDateString("en-IN", options)}
                    </Typography>
                    <Typography style={{ leterSpacing: "0.5px" }} color={"text.regular"} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-entryTime">
                      {new Date(DataPnl?.EntryTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                  <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                    {EXIT_TIME}
                  </Typography>
                  <Grid item xs={5}>
                    <TextView style={{ leterSpacing: "0.5px" }} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-Time">
                      {new Date(DataPnl?.ExitTime).toLocaleDateString("en-IN", options)}
                    </TextView>
                    <TextView style={{ leterSpacing: "0.5px" }} color={"text.regular"} component={"p"} variant="medium_12_500" id="orderHistory-rowdata-entryTime">
                      {new Date(DataPnl?.ExitTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </TextView>
                  </Grid>
                </Grid>{" "}
              </Grid>
              <Grid container gap={2} justifyContent="space-between">
                <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                  <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                    {ENTRY_PRICE}
                  </Typography>
                  <Typography varient="h5" sx={FONT12}>
                    {setDecimalPrecision(DataPnl?.EntryPrice, symbolPricePrecision)}
                  </Typography>
                </Grid>{" "}
                <Grid item xs={5.5} sx={ACCORDIANGRIDITEM}>
                  <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                    {EXIT_PRICE}
                  </Typography>
                  <Typography varient="h5" sx={FONT12}>
                    {setDecimalPrecision(DataPnl?.ExitPrice, symbolPricePrecision)}
                  </Typography>
                </Grid>{" "}
                <TextView
                  id={"see details"}
                  onClick={() => handleSeeTradeDetails(DataPnl.OrderID)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  variant="medium_12_500"
                  text={"See Details"}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
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

export default MpnlHistoryRow;
