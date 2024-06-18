import React from "react";
import CustomModal from "./CustomModal";
import { Box, Grid, Typography } from "@mui/material";
import CopyButton from "@/components/UI/CopyButton/CopyButton";

import PropTypes from "prop-types";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import { SymbolPrecisionHelper } from "@/helpers";
const TimestampConversion = (t) => {
  const d = new Date(t);
  // alert(d.toLocaleString());
  const options = { hour12: false };
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return d.toLocaleString(undefined, options).slice(0, -3) + ":" + seconds;
};
const PnLOrderSummaryModal = ({
  IsOpen,
  title,
  type,
  primaryName,
  secondaryAction,
  secondaryName,
  isSecondaryAction,
  isPrimaryAction,
  dataOrderId,
  updated,
  TotalFee,
  TotalPL,
  trades,
  allTrades,
  ExitTradeIds
}) => {
  const { setDecimalPrecision, symbolQuantityPrecision, symbolPricePrecision } = SymbolPrecisionHelper({ symbol: allTrades?.symbol });

  const formatData = (inputString) => {
    if (typeof inputString === "string") {
      return "****" + inputString.slice(-6);
    }
    return inputString;
  };
  const first = (inputString) => {
    const index = inputString.indexOf("|");

    if (index !== -1) {
      return inputString.substring(0, index);
    } else {
      return inputString;
    }
  };

  const second = (inputString) => {
    const index = inputString.split("|");

    if (index.length > 1) {
      return index[1].trim();
    }
    return " ";
  };
  const ShowContentType = (type) => {
    switch (type) {
      case "DISPLAY":
        return (
          <>
            <Grid sx={{ marginTop: "15px" }}>
              <Typography variant={"Medium_16"} component={"span"}>
                Exit Order Summary
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",

                marginRight: "28px",
                marginTop: "14px",
                gap: "2px"
              }}
            >
              <Grid
                item
                sx={{
                  px: "14px",
                  paddingTop: "14px",
                  width: "155px",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "background.default",
                  paddingRight: "0px"
                }}
              >
                <Typography variant={"Medium_11"} color={"text.secondary"} sx={{}}>
                  Order ID
                </Typography>
                <Typography component={"p"} variant={"Medium_12"} color={"text.primary"}>
                  {formatData(dataOrderId) || "NA"}
                  <CopyButton fontSize={"14px"} copyText={dataOrderId} />
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  px: "14px",
                  paddingTop: "14px",
                  width: "155px",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "background.default",
                  paddingRight: "0px"
                }}
              >
                <Typography variant={"Medium_11"} color={"text.secondary"} sx={{}}>
                  Created At
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
                  <Typography variant={"Medium_12"} color={"text.primary"} sx={{ mt: "6px" }}>
                    {new Date(allTrades?.createdAt).toLocaleString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                  </Typography>
                  <Typography variant={"Medium_12"} color={"text.secondary"} sx={{ mt: "6px" }}>
                    {new Date(allTrades?.createdAt).toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                sx={{
                  px: "14px",
                  py: "14px",
                  minWidth: "155px",
                  width: "auto",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "background.default"
                }}
              >
                <Typography variant={"Medium_11"} color={"text.secondary"} sx={{}}>
                  Updated At
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
                  <Typography variant={"Medium_12"} color={"text.primary"} sx={{ mt: "6px" }}>
                    {new Date(allTrades?.updatedAt).toLocaleString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                  </Typography>
                  <Typography variant={"Medium_12"} color={"text.secondary"} sx={{ mt: "6px" }}>
                    {new Date(allTrades?.updatedAt).toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item sx={{ marginTop: "25px" }}>
              <Typography variant={"Medium_16"}>Exit Trades</Typography>
            </Grid>
            <Grid
              item
              sx={{
                marginTop: "15px",
                // marginLeft: "28px",
                // marginRight: "32px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // p:1,
                alignItems: "center"
              }}
            >
              <Grid sx={{ width: "130px" }}>
                <Typography variant={"Medium_10"} color={"text.secondary"}>
                  {"TRADE ID"}
                </Typography>
              </Grid>
              <Grid sx={{ width: "138px" }}>
                <Typography variant={"Medium_10"} color={"text.secondary"}>
                  {"EXECUTION TIME"}
                </Typography>
              </Grid>
              <Grid sx={{ width: "160px" }}>
                <Typography variant={"Medium_10"} color={"text.secondary"}>
                  {"EXECUTED SIZE"}
                </Typography>
              </Grid>
              <Grid sx={{ width: "150px" }}>
                <Typography textTransform={"uppercase"} variant={"Medium_10"} color={"text.secondary"}>
                  {"gross P&L (USDT)"}
                </Typography>
              </Grid>
              <Grid sx={{ width: "100px" }}>
                <Typography variant={"Medium_10"} color={"text.secondary"}>
                  {"ROLE"}
                </Typography>
              </Grid>
              <Grid sx={{ width: "150px" }}>
                <Typography textTransform={"uppercase"} variant={"Medium_10"} color={"text.secondary"}>
                  {"exit fee (USDT)"}
                </Typography>
              </Grid>
            </Grid>

            {allTrades?.trades?.length === 0 && <TableNoRowsOverlay message={"No Trades Data Available"} />}

            {allTrades?.trades?.map((item, index) => (
              <React.Fragment key={index}>
                <Grid
                  item
                  sx={{
                    marginTop: "10px",
                    // marginLeft: "28px",
                    // marginRight: "18px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    background: ExitTradeIds.includes(item?.tradeID.toString()) && "#29292E",
                    border: ExitTradeIds.includes(item?.tradeID.toString()) && "1px solid #1B1B1F",
                    p: ExitTradeIds.includes(item?.tradeID.toString()) && 0.5,
                    borderRadius: "4px",
                    alignItems: "center"
                  }}
                >
                  <Grid sx={{ width: "130px", marginBottom: "auto" }}>
                    <Typography display={"flex"} alignItems={"center"} component={"p"} variant={"Regular_12"} color={"text.default"}>
                      {formatData(item?.tradeID.toString())}
                      <CopyButton fontSize={"14px"} copyText={formatData(item.tradeID)} />
                    </Typography>
                  </Grid>
                  <Grid sx={{ width: "138px", marginTop: "0px" }}>
                    <Typography component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                      {new Date(item?.tradeTime).toLocaleDateString()}
                    </Typography>
                    <Typography color={"text.regular"} component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                      {new Date(item?.tradeTime).toLocaleTimeString()}
                    </Typography>
                  </Grid>
                  <Grid sx={{ width: "160px" }}>
                    <Typography component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                      {item?.notionalQty.toFixed(4)} USDT
                    </Typography>
                    <Typography color={"text.regular"} component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                      {setDecimalPrecision(item?.qty, symbolQuantityPrecision)} {item.symbol?.toUpperCase().replace("USDT", "")}
                    </Typography>
                  </Grid>
                  <Grid sx={{ width: "150px", marginBottom: "auto" }}>
                    <Typography variant={"Regular_12"} color={item?.realizedPnl > 0 ? "text.success" : "text.error"}>
                      {item?.realizedPnl.toFixed(4)}
                    </Typography>
                  </Grid>
                  <Grid sx={{ width: "95px", marginBottom: "auto", marginTop: "5px" }}>
                    <Grid
                      item
                      sx={{
                        height: "22px",
                        width: "51px",
                        backgroundColor: "background.tertiary",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center"
                      }}
                    >
                      <Typography variant={"Regular_11"} color={"text.default"}>
                        {item?.maker ? "Maker" : "Taker"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid sx={{ width: "150px", marginBottom: "auto" }}>
                    <Typography component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                      {item?.commission.toFixed(4) + " " + "USDT"}
                    </Typography>
                    {/* <Typography color={"text.regular"} component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                      {item?.commission.toFixed(4)}
                    </Typography> */}
                  </Grid>
                </Grid>
              </React.Fragment>
            ))}
          </>
        );
    }
  };
  return (
    <CustomModal
      IsOpen={IsOpen}
      close={secondaryAction}
      isClose={true}
      // label={"Order History"}
      // isSecondaryAction={isSecondaryAction}
      // secondaryAction={secondaryAction}
      // // primaryAction={primaryAction}
      // isPrimaryAction={isPrimaryAction}
      // primaryButtonSX={{ width: "132px", height: "32px", marginRight: "18px" }}
      // secondaryButtonSX={{ width: "132px", height: "32px" }}
      ContainerSx={{ maxWidth: { lg: "680px", sm: "600px", xs: "350px" } }}
      // paddingSX={{ padding: "0px" }}
    >
      {ShowContentType(type)}
    </CustomModal>
  );
};

PnLOrderSummaryModal.propTypes = {
  trades: PropTypes.array,
  IsOpen: PropTypes.bool,
  close: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
  primaryName: PropTypes.string,
  secondaryName: PropTypes.string,
  toggleIsSupportChatVisible: PropTypes.func,
  isSupportChatVisible: PropTypes.bool,
  isPrimaryAction: PropTypes.bool,
  isSecondaryAction: PropTypes.bool,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
  dateRange: PropTypes.object,
  setDateRange: PropTypes.func,
  dataOrderId: PropTypes.string,
  updated: PropTypes.string,
  TotalFee: PropTypes.string,
  TotalPL: PropTypes.string,
  allTrades: PropTypes.object,
  ExitTradeIds: PropTypes.array
};
export default React.memo(PnLOrderSummaryModal);
