/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ACCODIAN, ACCORDIANHEADER, ACCORDIANGRIDITEM, ACCORDIANGRIDITEMHEADING, BORDER, ERROR, EXPANDICON, FONT12, FONT13, SECTIONHEIGHT, SUCCESS } from "@/pages/MobileView/style";
import EditSvg from "../../../../assets/images/Edit.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas } from "@/helpers/commaHelper";
import { epochToDateConvertor, truncateString } from "@/helpers";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";
import { cancelOrderApi, fetchAllOpenOrdersApi } from "API/Api";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getStrategyOrderDataByIDApi } from "../../../../frontend-api-service/Api";
// import { availableBalanceAction } from "BL/redux/actions/User/AvailableBalance.ac";
import { OPEN_ORDERS_FETCH_SUCCESS, ORDER_CREATION_FAIL, ORDER_CREATION_SUCESS } from "BL/redux/constants/Constants";
import { FILLED, NOOPENORDERS, ORDERID, PRICE, REDUCEONLY, SIZEINCONTRACT, TPSL, TRIGGERPRICE } from "@/pages/MobileView/mMagicString";
import { showSnackBar } from "BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { fetchFutureAccountDetails } from "@/frontend-BL/redux/actions/Futures/Futures.ac";
import { posthog } from "posthog-js";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
const mOpenOrder = ({ openOrdersApiData }) => {
  const dispatch = useDispatch();
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [otoCOOpen, setOtoCOOpen] = useState({
    IsOpen: false,
    activeModalData: {}
  });
  // const [strategyOrdersData, setStrategyOrdersData] = useState({});
  const openOrdersSocketData = useSelector((state) => state.OpenOrdersStream.OpenOrdersStream);
  const trueFalseMap = useCallback((val) => {
    return val === false ? "No" : "Yes";
  }, []);
  useEffect(() => {
    fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&status=SCHEDULED&status=PARTIALLY_FILLED" }).then((openOrders) => {
      dispatch({
        type: OPEN_ORDERS_FETCH_SUCCESS,
        payload: openOrders.data.data
      });
    });
  }, [openOrdersSocketData.length]);
  useEffect(() => {
    if (otoCOOpen.IsOpen === true) {
      // Disables Background Scrolling whilst the Modal is open
      if (typeof window !== "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    } else {
      // Enables scrolling when Modal is closed
      document.body.style.overflow = "unset";
    }
  }, [otoCOOpen.IsOpen]);
  const handleShowOTOCOModal = (data) => {
    setOtoCOOpen({ IsOpen: true, activeModalData: data });
  };

  function GetOpenOrderRows({ item }) {
    const [isEyeIcon, setIsEyeIcon] = useState(false);

    const handleClick = () => {
      getStrategyOrderDataByIDApi(item.ID)
        .then((res) => {
          if (res) {
            setIsEyeIcon(true);
            const orders = res.data.orders;
            const temp = {};
            const parentOrder = orders.find((order) => !order.reduceOnly);
            const TPOrder = orders.find((order) => order.type === "TAKE_PROFIT_MARKET" && order.reduceOnly);
            const SLOrder = orders.find((order) => order.type === "STOP_MARKET" && order.reduceOnly);
            if (parentOrder) temp.parentOrder = parentOrder;
            if (TPOrder) temp.TPOrder = TPOrder;
            if (SLOrder) temp.SLOrder = SLOrder;
            handleShowOTOCOModal({ parentOrder, TPOrder, SLOrder });
          }
        })
        .catch((err) => {
          // setIsEyeIcon(false);
          console.log(err);
        });
    };
    const handleAccordianClick = (item) => {
      setExpanded(!expanded);
      if (item.ID) {
        getStrategyOrderDataByIDApi(item.ID)
          .then((res) => {
            if (res) {
              setIsEyeIcon(true);
            }
          })
          .catch((err) => {
            setIsEyeIcon(false);
            console.log(err);
          });
      }
    };
    return (
      <>
        <Grid item xs={12}>
          <Accordion sx={ACCODIAN}>
            <AccordionSummary onClick={() => handleAccordianClick(item)}>
              {" "}
              <Grid container gap={1}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Typography
                        variant="Medium_12"
                        component={"p"}
                        sx={{
                          px: 1.7,
                          py: 0.4,
                          borderRadius: "2px",
                          backgroundColor: item.side === "BUY" ? "text.success" : "text.error",
                          textAlign: "center",
                          height: "fit-content"
                        }}
                      >
                        {item.side === "BUY" ? "LONG" : "SHORT"}
                      </Typography>
                      <Typography component={"p"} variant="Medium_14">
                        {item.symbol}
                      </Typography>
                      <Typography variant="Regular_11" component={"span"} sx={{ mx: "1px" }} color={"text.main"}>
                        {"|"}
                      </Typography>
                      <Typography variant="Regular_12" component={"span"}>
                        {" "}
                        {item.type}{" "}
                      </Typography>
                    </Box>
                    <Box>{expanded ? <ExpandLessIcon sx={{ color: "text.mild", fontSize: "28px" }} /> : <ExpandMoreIcon sx={{ color: "text.mild", fontSize: "28px" }} />}</Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Typography variant={"Regular_12"} sx={{ color: "text.mild" }} component={"p"}>
                      <Typography variant={"Regular_12"} component={"span"}>
                        {epochToDateConvertor(item.createdAt)}
                      </Typography>
                    </Typography>
                    <Typography variant="Regular_12">
                      {numberWithCommas(item.executedQuantity)}
                      {" /"} {numberWithCommas(Number(item.quantity))} {FILLED}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails sx={BORDER}>
              <Grid container gap={2} p={1} justifyContent={"space-between"}>
                <Grid item xs={5} sx={ACCORDIANGRIDITEM}>
                  <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                    {ORDERID}
                  </Typography>
                  <Typography varient="h5" sx={FONT12}>
                    <Grid xs={12} justifyContent="flex-start" alignItems="center" container>
                      <Grid justifyContent="flex-start" alignItems="center" item xs={10}>
                        {truncateString(item.ID, 10)}
                      </Grid>
                      <Grid justifyContent="flex-start" alignItems="center" item xs={2}>
                        <div style={{ marginTop: "3px" }}>
                          {selectedOrderId !== item.ID && (
                            <ContentCopyIcon
                              sx={{
                                width: "15px",
                                cursor: "pointer",
                                color: "text.primary"
                              }}
                              onClick={() => handleChange(item.ID)}
                            />
                          )}
                          {selectedOrderId === item.ID && (
                            <DoneAllIcon
                              sx={{
                                fontSize: "12px",
                                width: "15px",
                                cursor: "pointer",
                                color: "text.success"
                              }}
                            />
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Typography>
                </Grid>{" "}
                <Grid item xs={2.8} sx={ACCORDIANGRIDITEM}>
                  <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                    {PRICE}
                  </Typography>
                  <Typography varient="h5" sx={FONT12}>
                    {item.price}
                  </Typography>
                </Grid>
                <Grid item xs={2.8} sx={ACCORDIANGRIDITEM}>
                  <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                    {REDUCEONLY}
                  </Typography>
                  <Typography varient="h5" sx={FONT12}>
                    {trueFalseMap(item.reduceOnly)}
                  </Typography>
                </Grid>{" "}
                <Grid item xs={5} sx={ACCORDIANGRIDITEM}>
                  <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                    {SIZEINCONTRACT}
                  </Typography>

                  <Typography varient="h5" sx={FONT12}>
                    {item.quantity} | {(item.price !== 0 && item.price !== "0" ? item.quantity * item.price : item.quantity * item.stopPrice).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={2.9} sx={ACCORDIANGRIDITEM}>
                  <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                    {TRIGGERPRICE}
                  </Typography>
                  <Typography varient="h5" sx={FONT12}>
                    {Number(item.stopPrice) ? item.stopPrice : "-"}
                  </Typography>
                </Grid>
                {/* <Grid item xs={2.9} sx={ACCORDIANGRIDITEM}>
                  <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                    {TPSL}
                  </Typography>
                  <Typography varient="h5" sx={FONT12}>
                    {item.hasSiblingOrders && !item.reduceOnly ? (
                      <img
                        onClick={handleClick}
                        src={EditSvg}
                        alt="alt"
                        style={{
                          width: "14px",
                          marginLeft: "4px",
                          marginBottom: "2px",
                          cursor: "pointer"
                        }}
                      />
                    ) : (
                      "--"
                    )}
                  </Typography>
                </Grid> */}
                <Grid item xs={12} sx={ACCORDIANGRIDITEM}>
                  <CustomButton label={"    Cancel"} onClick={() => closeOrder(item.ID, item.symbol)} fullWidth />
                </Grid>{" "}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </>
    );
  }

  function closeOrder(orderId, symbol) {
    cancelOrderApi(symbol, orderId)
      .then((successResponse) => {
        dispatch(fetchFutureAccountDetails());
        dispatch(
          showSnackBar({
            src: ORDER_CREATION_SUCESS,
            message: "Your order has been cancelled successfully",
            type: "success"
          })
        );
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: ORDER_CREATION_FAIL,
            message: "Order could not be cancelled. We apologize!",
            type: "failure"
          })
        );
      });
  }
  const handleChange = (data) => {
    navigator.clipboard.writeText(data);
    setSelectedOrderId(data);
  };

  const showOpenOrderData = useMemo(() => {
    if (openOrdersApiData.length > 0) {
      return openOrdersApiData.map((item) => <GetOpenOrderRows key={item.ID} item={item} />);
    } else {
      return (
        <Box my={10}>
          <TableNoRowsOverlay message={"No data Found"} />
        </Box>
      );
    }
  }, [openOrdersApiData.length]);
  return (
    <Box sx={SECTIONHEIGHT}>
      <Grid container justifyContent={"center"} gap="10px">
        {showOpenOrderData}
      </Grid>
    </Box>
  );
};
mOpenOrder.propTypes = {
  openOrdersApiData: PropTypes.array
};

export default mOpenOrder;
