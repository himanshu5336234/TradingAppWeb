import React, { Dispatch, useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { SymbolPrecisionHelper } from "@/helpers";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { REMOVE_CROSS_WALLET_DETAILS, REMOVE_POSITIONS_QUANT, REMOVE_UNREALISED_PROFITLOSS } from "@/frontend-BL/redux/constants/Constants";
import { useDispatch, useSelector } from "react-redux";

import CrossWalletTooltip from "@/components/MarginRatio/CrossWalletTooltip";

import { selectedSymbol } from "@/frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
import LeverageCell from "./PositionRowComponents/LeverageCell/leverageCell";
import LiquidationPrice from "./PositionRowComponents/LiquidationPrice/LiquidationPrice";
import OcoCell from "./PositionRowComponents/OCOCELL/OcoCell";
import PositionPnL from "./PositionRowComponents/PositionPnl/PositionPnL";
import Margin from "./PositionRowComponents/Margin/Margin";
import AddMarginCell from "./PositionRowComponents/AddMarginCell/AddMarginCell";
import MarginRatioCell from "./PositionRowComponents/MarginRatioCell/MarginRatioCell";
import MarginRatio from "./PositionRowComponents/MarginRatio/MarginRatio";
import ExitLimitMarketOrder from "./PositionRowComponents/ExitLimitMarketOrder/ExitLimitMarketOrder";
import ClosePosition from "./PositionRowComponents/ClosePosition/ClosePosition";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import MarkPrice from "@/components/Home/TradeSymbolData/MarketSegment/MarkPrice";
import TextView from "@/components/UI/TextView/TextView";

import SharePositionCell from "./PositionRowComponents/SharePositionCell/SharePositionCell";
interface PositionRowProps {
  sym: string;
  leverage: number;
  marginType: string;
  posAmt: number;
  side: string;
  entryPrice: string;
  unRealizedPnL: string;
}
const PositionRow = ({
  data,
  index
}: {
  data: PositionRowProps;

  index: number;
}) => {
  const { sym: symbol, leverage, marginType, posAmt, side, entryPrice, unRealizedPnL } = data;
  const dispatch: Dispatch<any> = useDispatch();
  if (posAmt === 0) {
    dispatch({ type: REMOVE_POSITIONS_QUANT, payload: symbol });
    dispatch({ type: REMOVE_UNREALISED_PROFITLOSS, payload: { symbol } });
    if (marginType?.toUpperCase() !== "ISOLATED") {
      dispatch({ type: REMOVE_CROSS_WALLET_DETAILS, payload: { symbol } });
    }
    return;
  }
  const { setDecimalPrecision, symbolQuantityPrecision, symbolPricePrecision } = SymbolPrecisionHelper({ symbol });
  const symbolPrecisionData = useSelector((state: any) => state.tradablesymbolList.tradablesymbolList.find((data: { symbol: string }) => data.symbol === symbol));

  const symbolBaseAsset = useMemo(() => {
    if (symbolPrecisionData !== undefined) return symbolPrecisionData.baseAsset;
  }, [symbolPrecisionData]);
  const isIsolated = () => marginType?.toUpperCase() === "ISOLATED";
  return (
    <Grid id={"Position-row-" + index} container p={"20px 10px 20px 20px"} alignItems={"center"}>
      <Grid item xs={1.5}>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Box
            component={"img"}
            src={getCurrencyUrl(symbol.replace("USDT", "").toLowerCase())}
            // alt="symbolLogo"
            sx={{
              height: "28px",
              width: "28px",
              borderRadius: "50%",
              backgroundColor: "white"
            }}
          />
          <Box>
            <TextView
              onClick={() => {
                dispatch(selectedSymbol(symbol.toLowerCase()));
              }}
              id="position-symbol"
              variant="medium_12_500"
              component={"h6"}
              style={{
                "&:hover": {
                  cursor: "pointer",
                  color: "text.main"
                }
              }}
              text={symbol}
            />

            <Box>
              <TextView id="position-marginType" color={"text.regular"} style={{ textTransform: "capitalize" }} component={"span"} variant="medium_12_500" text={marginType.toLowerCase()} />
              <TextView color={"text.regular"} variant="medium_12_500" component={"span"} style={{ mx: "2px" }} text={" | "} /> <LeverageCell symbol={symbol} />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={0.6} container>
        <TextView
          variant="medium_12_500"
          component={"h6"}
          id="position-side"
          text={side === "BUY" ? "Long" : "Short"}
          style={{
            textTransform: "uppercase",
            // py: 0.5,
            // px: 1,
            color: side === "BUY" ? "text.success" : "text.error",
            textAlign: "center"
          }}
        />
      </Grid>

      <Grid xs={1.2} item textAlign={"center"}>
        <Typography id="position-size-Contract" textAlign={"left"} component={"p"} variant="medium_12_500">
          {setDecimalPrecision(String(Math.abs(Number(posAmt))), symbolQuantityPrecision) ?? "--"} {symbol.replace("USDT", "").toUpperCase()}
        </Typography>
        <Typography textAlign={"left"} id="position-size-Usdt" variant="medium_12_500" component={"p"} color={"text.regular"}>
          {setDecimalPrecision(String(Math.abs(Number(posAmt) * Number(entryPrice))), 2)}
          {" USDT"}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <MarkPrice symbolPricePrecision={symbolPricePrecision} variant="medium_12_500" setDecimalPrecision={setDecimalPrecision} symbol={symbol} styles={{}} />
      </Grid>
      <Grid xs={1} item>
        <TextView id="position-entryPrice" textAlign={"left"} component={"p"} text={setDecimalPrecision(String(entryPrice), symbolPricePrecision)} variant="medium_12_500" />
      </Grid>
      <Grid xs={1} item>
        <TextView textAlign={"left"} color={"text.regular"} component={"p"} id="position-liquidationPrice" variant="medium_12_500">
          <LiquidationPrice symbol={symbol} />
        </TextView>
      </Grid>

      <Grid item container gap={2} xs={1.2} pl={0.6}>
        <Grid item>
          <Margin symbol={symbol} setDecimalPrecision={setDecimalPrecision} isIsolated={isIsolated()} />
        </Grid>
        <Grid item xs={2}>
          {isIsolated() && <AddMarginCell symbol={symbol} />}
          {!isIsolated() && (
            <Tooltip
              componentsProps={{
                tooltip: {
                  sx: {
                    color: "#ffff",
                    fontSize: "11px",
                    backgroundColor: "background.tertiary",
                    fontWeight: 600,
                    p: "10px"
                  }
                }
              }}
              arrow
              placement="top"
              title={<CrossWalletTooltip setDecimalPrecision={setDecimalPrecision} symbol={symbol} />}
            >
              <InfoOutlinedIcon sx={{ fontSize: "15px" }} />
            </Tooltip>
          )}
        </Grid>
      </Grid>
      <Grid container item gap={2} alignItems={"flex-start"} xs={1} pl={1}>
        <Grid item>
          <MarginRatio symbol={symbol} />
        </Grid>
        <Grid item xs={2}>
          <MarginRatioCell setDecimalPrecision={setDecimalPrecision} symbol={symbol} isIsolated={isIsolated()} />
        </Grid>
      </Grid>

      <Grid item xs={0.7} alignItems={"center"}>
        <TextView textAlign={"left"}>
          <PositionPnL variant={"medium_12_500"} symbol={symbol} posAmt={posAmt} entryPrice={Number(entryPrice)} marginType={marginType} isRoE={false} />
        </TextView>
      </Grid>

      <Grid item xs={2.8} container justifyContent="space-between" alignItems="center">
        <Grid item xs={1}>
          {" "}
          <SharePositionCell
            symbol={symbol}
            posAmt={posAmt}
            leverage={leverage}
            side={side}
            symbolPricePrecision={symbolPricePrecision}
            entryPrice={setDecimalPrecision(entryPrice, symbolPricePrecision)}
            initialVal={unRealizedPnL}
            marginType={marginType}
          />
        </Grid>
        <Grid item xs={2.5}>
          <OcoCell
            symbol={symbol}
            leverage={leverage}
            isIsolated={isIsolated()}
            entryPrice={entryPrice}
            side={side}
            sizeInContractAsset={Number(Math.abs(posAmt))}
            quantityValue={setDecimalPrecision(String(Math.abs(posAmt)), symbolQuantityPrecision)}
          />
        </Grid>
        <ExitLimitMarketOrder symbol={symbol} posAmt={posAmt} entryPrice={entryPrice} side={side} marginType={marginType} symbolBaseAsset={symbolBaseAsset} />
        <Grid item xs={2.5}>
          <ClosePosition variant={"closePositionfailed"} symbol={symbol} />
        </Grid>
      </Grid>
    </Grid>
  );
};

PositionRow.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number
};

export default PositionRow;
