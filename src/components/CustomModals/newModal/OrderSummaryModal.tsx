import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import { Grid, Typography } from "@mui/material";
import CopyButton from "@/components/UI/CopyButton/CopyButton";

import PropTypes from "prop-types";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import { fetchTradesBasedOnOrderId } from "@/frontend-api-service/Api/OrderHistory/OrderHistory";
const TimestampConversion = (t) => {
  const d = new Date(t);
  // alert(d.toLocaleString());
  const options = { hour12: false };
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return d.toLocaleString(undefined, options).slice(0, -3) + ":" + seconds;
};
const formatData = (inputString) => {
  if (typeof inputString === "string") {
    return "****" + inputString.slice(-6);
  }
  return inputString;
};
const OrderSummaryModal = ({ IsOpen, secondaryAction, updated, orderId }) => {
  const [trades, setTrades] = useState([]);
  useEffect(() => {
    if (orderId) {
      fetchTradesBasedOnOrderId(orderId).then(({ trades }) => {
        setTrades(trades);
      });
    }
  }, [orderId]);

  const TotalPL = trades?.reduce((agg, trade) => agg + trade?.realizedPnl, 0);
  const totalFee = trades?.reduce((agg, trade) => agg + parseFloat(trade.commission), 0);
  const ShowContentType = () => {
    return (
      <>
        <Grid sx={{ marginLeft: "28px", marginTop: "15px" }}>
          <Typography variant={"Medium_16"} component={"span"}>
            Order Summary
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "22px",
            marginRight: "28px",
            marginTop: "14px"
          }}
        >
          <Grid
            item
            sx={{
              px: "14px",
              paddingTop: "14px",
              width: "125px",
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
              {formatData(orderId)}
              <CopyButton fontSize={"14px"} copyText={formatData()} />
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              px: "14px",
              py: "14px",
              width: "auto",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.default"
            }}
          >
            <Typography variant={"Medium_11"} color={"text.secondary"} sx={{}}>
              Updated At
            </Typography>
            <Typography variant={"Medium_12"} color={"text.primary"} sx={{}}>
              {TimestampConversion(updated)}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              px: "14px",
              py: "14px",
              width: "auto",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.default",
              paddingRight: "28px"
            }}
          >
            <Typography variant={"Medium_11"} color={"text.secondary"} sx={{}}>
              Total Fee (USDT)
            </Typography>
            <Typography variant={"Medium_12"} color={"text.primary"} sx={{}}>
              {totalFee}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              px: "14px",
              py: "14px",
              width: "auto",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.default",
              paddingRight: "28px"
            }}
          >
            <Typography variant={"Medium_11"} color={"text.secondary"} sx={{}}>
              Total P&L (USDT){" "}
            </Typography>
            <Typography variant={"Medium_12"} color={TotalPL > 0 ? "text.success" : "text.error"} sx={{}}>
              {TotalPL}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ marginTop: "25px", marginLeft: "28px" }}>
          <Typography variant={"Medium_16"}>Trades</Typography>
        </Grid>
        <Grid
          item
          sx={{
            marginTop: "15px",
            marginLeft: "28px",
            marginRight: "32px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Grid sx={{ width: "145px" }}>
            <Typography variant={"Medium_10"} color={"text.secondary"}>
              {"EXECUTION TIME"}
            </Typography>
          </Grid>
          <Grid sx={{ width: "127px" }}>
            <Typography variant={"Medium_10"} color={"text.secondary"}>
              {"TRADE ID"}
            </Typography>
          </Grid>
          <Grid sx={{ width: "120px" }}>
            <Typography variant={"Medium_10"} color={"text.secondary"}>
              {"EXECUTED SIZE"}
            </Typography>
          </Grid>
          <Grid sx={{ width: "95px" }}>
            <Typography variant={"Medium_10"} color={"text.secondary"}>
              {"P&L (USDT)"}
            </Typography>
          </Grid>
          <Grid sx={{ width: "90px" }}>
            <Typography variant={"Medium_10"} color={"text.secondary"}>
              {"ROLE"}
            </Typography>
          </Grid>
          <Grid sx={{ width: "85px" }}>
            <Typography variant={"Medium_10"} color={"text.secondary"}>
              {"TRADING FEE"}
            </Typography>
          </Grid>
        </Grid>

        {trades?.length === 0 && <TableNoRowsOverlay message={"No Trades Data Available"} />}

        {trades?.map((item: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <Grid
                item
                sx={{
                  marginTop: "10px",
                  marginLeft: "28px",
                  marginRight: "18px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Grid sx={{ width: "145px" }}>
                  <Typography component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                    {new Date(item.tradeTime).toLocaleDateString()}
                  </Typography>
                  <Typography color={"text.regular"} component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                    {new Date(item.tradeTime).toLocaleTimeString()}
                  </Typography>
                </Grid>
                <Grid sx={{ width: "127px", marginTop: "4px" }}>
                  <Typography component={"p"} variant={"Regular_12"} color={"text.default"}>
                    {formatData(item.idUuid)}
                    <CopyButton fontSize={"14px"} copyText={formatData(item.idUuid)} sideText={undefined} />
                  </Typography>
                </Grid>
                <Grid sx={{ width: "120px" }}>
                  <Typography component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                    {item.price + " USDT"}
                  </Typography>
                  <Typography color={"text.regular"} component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                    {item.qty} {item.symbol.replace("USDT", "")}
                  </Typography>
                </Grid>
                <Grid sx={{ width: "95px", marginTop: "5px" }}>
                  <Typography variant={"Regular_12"} color={item.realizedPnl > 0 ? "text.success" : "text.error"}>
                    {item.realizedPnl}
                  </Typography>
                </Grid>
                <Grid sx={{ width: "90px", marginTop: "5px" }}>
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
                      {item.maker ? "MAKER" : "TAKER"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid sx={{ width: "100px" }}>
                  <Typography component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                    {item.commission + " USDT"}
                  </Typography>
                  <Typography color={"text.regular"} component={"p"} variant="Medium_12" id="orderHistory-rowdata-Time">
                    {item.tradingFee}
                  </Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
      </>
    );
  };
  return (
    <CustomModal
      IsOpen={IsOpen}
      close={secondaryAction}
      isClose={true}
      secondaryAction={secondaryAction}
      primaryButtonSX={{ width: "132px", height: "32px", marginRight: "18px" }}
      secondaryButtonSX={{ width: "132px", height: "32px" }}
      ContainerSx={{ width: "716px" }}
      // paddingSX={{ padding: "0px" }}
    >
      {ShowContentType()}
    </CustomModal>
  );
};

OrderSummaryModal.propTypes = {
  IsOpen: PropTypes.bool,
  secondaryAction: PropTypes.func
};
export default React.memo(OrderSummaryModal);
