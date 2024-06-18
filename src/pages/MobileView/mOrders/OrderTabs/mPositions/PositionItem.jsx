import React, { useState } from "react";
import PropTypes from "prop-types";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Tooltip, Typography } from "@mui/material";
import { ENTRYPRICE, LIQUDATIONPRICE, MARGINRATIO, MARGINUSED, SIZE } from "@/pages/MobileView/mMagicString";
import { ACCORDIANGRIDITEM } from "@/pages/MobileView/style";
import { SymbolPrecisionHelper } from "@/helpers";
import CrossWalletTooltip from "@/components/MarginRatio/CrossWalletTooltip";
import LiquidationPrice from "@/components/Home/UserActivities/UserTabs/Positions/PositionRow/PositionRowComponents/LiquidationPrice/LiquidationPrice";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MarginRatio from "@/components/Home/UserActivities/UserTabs/Positions/PositionRow/PositionRowComponents/MarginRatio/MarginRatio";
import MarginRatioCell from "@/components/Home/UserActivities/UserTabs/Positions/PositionRow/PositionRowComponents/MarginRatioCell/MarginRatioCell";
import OcoCell from "@/components/Home/UserActivities/UserTabs/Positions/PositionRow/PositionRowComponents/OCOCELL/OcoCell";
import SharePositionCell from "@/components/Home/UserActivities/UserTabs/Positions/PositionRow/PositionRowComponents/SharePositionCell/SharePositionCell";
import ClosePosition from "@/components/Home/UserActivities/UserTabs/Positions/PositionRow/PositionRowComponents/ClosePosition/ClosePosition";
import { REMOVE_POSITIONS_QUANT } from "@/frontend-BL/redux/constants/Constants";
import { useDispatch } from "react-redux";
import Margin from "@/components/Home/UserActivities/UserTabs/Positions/PositionRow/PositionRowComponents/Margin/Margin";
import AddMarginCell from "@/components/Home/UserActivities/UserTabs/Positions/PositionRow/PositionRowComponents/AddMarginCell/AddMarginCell";
import PositionPnL from "@/components/Home/UserActivities/UserTabs/Positions/PositionRow/PositionRowComponents/PositionPnl/PositionPnL";
const PositionItem = ({ data }) => {
  const { sym: symbol, leverage, marginType, posAmt, side, entryPrice, unRealizedPnL } = data;
  const { setDecimalPrecision, symbolPricePrecision } = SymbolPrecisionHelper({ symbol });
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const isIsolated = () => marginType?.toUpperCase() === "ISOLATED";
  if (posAmt !== undefined) {
    if (posAmt === 0) {
      dispatch({
        type: REMOVE_POSITIONS_QUANT,
        payload: symbol
      });
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <Accordion
          sx={{
            backgroundColor: "background.primary",
            backgroundImage: "none",
            borderRadius: "2px !important",
            width: "100%",
            height: "100%",
            px: 1.5,
            "&:last-of-type": {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0
            },
            "&:first-of-type": {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0
            }
          }}
          expanded={expanded}
        >
          <AccordionSummary
            onClick={() => setExpanded(!expanded)}
            sx={{
              width: "100%",
              position: "relative",
              "& .MuiAccordionSummary-content.Mui-expanded": { my: 0 },
              "& .MuiAccordionSummary-content": { my: 0 },
              alignItems: "center",
              px: 0
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                my: "5px",
                width: "100%"
              }}
            >
              <Grid
                container
                m={0}
                gap={"6px"}
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Grid item sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Typography
                    variant="Medium_12"
                    component={"p"}
                    sx={{
                      p: 0.5,
                      px: 1,
                      borderRadius: "2px",
                      backgroundColor: side === "BUY" ? "text.success" : "text.error",
                      textAlign: "center",
                      height: "fit-content"
                    }}
                  >
                    {side === "BUY" ? "LONG" : "SHORT"}
                  </Typography>
                  <Typography component={"p"} variant="Medium_14">
                    {symbol}
                    <Typography variant="Regular_11" component={"span"} sx={{ mx: "7px" }} color={"text.mild"}>
                      {"|"}
                    </Typography>
                    <Typography variant="Regular_12" component={"span"} color={"text.main"}>
                      {leverage}
                      {"x"}
                    </Typography>
                    <Typography variant="Regular_10" component={"span"} color={"text.mild"} sx={{ ml: "4px" }}>
                      {isIsolated() === true ? "Isolated" : "Cross"}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item onClick={() => setExpanded(!expanded)}>
                  {expanded ? <ExpandLessIcon sx={{ color: "text.mild", fontSize: "28px" }} /> : <ExpandMoreIcon sx={{ color: "text.mild", fontSize: "28px" }} />}
                </Grid>
              </Grid>
              <Grid
                container
                m={0}
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Grid item xs={6}>
                  <PositionPnL variant={"Regular_12"} isRoE={true} symbol={symbol} posAmt={posAmt} entryPrice={entryPrice} initialVal={unRealizedPnL} marginType={marginType} />

                  <Typography variant="Regular_10" component={"span"} color={"text.mild"}>
                    {"P&L (USDT) | ROE"}
                  </Typography>
                </Grid>
                <Grid item xs={4} gap={"3px"}>
                  <Box
                    sx={{
                      textAlign: "center",
                      px: 1,
                      py: 0.5,
                      gap: "5px",

                      backgroundColor: "rgba(130, 130, 130, 0.4)",
                      borderRadius: "2px",
                      mb: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <MarginRatio symbol={symbol} />
                    <MarginRatioCell setDecimalPrecision={setDecimalPrecision} isMobile={true} symbol={symbol} isIsolated={isIsolated()} />
                  </Box>
                  <Typography variant="Regular_10" color={"#828282"}>
                    {MARGINRATIO}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </AccordionSummary>

          {expanded && (
            <AccordionDetails sx={{ width: "100%", borderTop: "0.5px solid #5A5A66", px: 0 }}>
              <Grid container alignItems={"center"} justifyContent="space-between" gap={"10px"} rowSpacing={1}>
                <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                  <Typography variant="Regular_10" color={"#A9A9A9"}>
                    {ENTRYPRICE}
                  </Typography>
                  <Typography variant="Medium_14">{setDecimalPrecision(entryPrice)}</Typography>
                </Grid>
                <Grid item xs={4} sx={[ACCORDIANGRIDITEM, { alignItems: "center" }]}>
                  <Typography variant="Regular_10" component={"p"} color={"#A9A9A9"}>
                    {LIQUDATIONPRICE}
                  </Typography>
                  <LiquidationPrice symbol={symbol} setDecimalPrecision={setDecimalPrecision} symbolPricePrecision={symbolPricePrecision} />
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end"
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="Regular_11" component={"span"} color={"#A9A9A9"}>
                      {MARGINUSED}
                    </Typography>
                    {!isIsolated() && (
                      <Tooltip
                        componentsProps={{
                          tooltip: {
                            sx: {
                              color: "#ffff",
                              fontSize: "11px",
                              backgroundColor: "#5A5A66",
                              fontWeight: 600,
                              p: "10px"
                            }
                          }
                        }}
                        arrow
                        placement="top"
                        title={<CrossWalletTooltip symbol={symbol} />}
                        enterTouchDelay={100}
                      >
                        <InfoOutlinedIcon sx={{ fontSize: "14px", mb: 0.2, ml: 0.5 }} />
                      </Tooltip>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Margin symbol={symbol} setDecimalPrecision={setDecimalPrecision} isIsolated={isIsolated()} />
                    {/* {isIsolated() && <AddMarginCell isMobile={true} symbol={symbol} />} */}
                  </Box>
                </Grid>
                <Grid item xs={5} sx={ACCORDIANGRIDITEM}>
                  <Box>
                    <Typography variant="Regular_11" component={"p"} color={"#A9A9A9"}>
                      {SIZE}
                    </Typography>
                    <Typography variant="Medium_12" component={"p"}>
                      {Math.abs(posAmt) ?? "--"}
                      {" | "} {Math.abs(posAmt * entryPrice)?.toFixed(symbolPricePrecision)}
                    </Typography>
                  </Box>
                </Grid>
                {/* <Grid item xs={3} sx={[ACCORDIANGRIDITEM, { alignItems: "center" }]}>
                  <Typography variant="Regular_11" textAlign={"end"} component={"p"} color={"#A9A9A9"}>
                    {"TP/SL"}
                  </Typography>
                  <OcoCell
                    isMobile={true}
                    symbol={symbol}
                    leverage={leverage}
                    isIsolated={isIsolated()}
                    entryPrice={Number(entryPrice)}
                    side={side}
                    sizeInContractAsset={Number(Math.abs(posAmt))}
                    quantityValue={setDecimalPrecision(Math.abs(posAmt * entryPrice))}
                  />
                </Grid>{" "} */}
                <Grid
                  item
                  container
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 1,
                    gap: "12px"
                  }}
                >
                  <Grid xs={1}>
                    <SharePositionCell isMobile={true} symbol={symbol} posAmt={posAmt} leverage={leverage} side={side} entryPrice={entryPrice} initialVal={unRealizedPnL} marginType={marginType} />
                  </Grid>

                  <Grid xs={10}>
                    <ClosePosition symbol={symbol} />
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          )}
        </Accordion>
      </Grid>
    </>
  );
};

PositionItem.propTypes = {
  data: PropTypes.object
};

export default PositionItem;
