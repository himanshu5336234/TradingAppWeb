import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Grid, Typography } from "@mui/material";
import ClosePosition from "../PositionRow/PositionRowComponents/ClosePosition/ClosePosition";
import MarginRatio from "../PositionRow/PositionRowComponents/MarginRatio/MarginRatio";
import PositionPnL from "../PositionRow/PositionRowComponents/PositionPnl/PositionPnL";
import { useDispatch } from "react-redux";
import { selectedSymbol } from "@/frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
import LeverageCell from "../PositionRow/PositionRowComponents/LeverageCell/leverageCell";

const ActivePositionCards = ({ data }) => {
  const dispatch = useDispatch();
  const { sym: symbol, marginType, posAmt, side, entryPrice, unRealizedPnL } = data;

  return (
    <>
      <Grid container gap={1} justifyContent={"space-evenly"} py={1.5}>
        <Grid item xs={8}>
          {" "}
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Typography
              variant="Medium_10"
              component={"p"}
              sx={{
                px: 1,
                py: 0.4,
                borderRadius: "2px",
                backgroundColor: side === "BUY" ? "text.success" : "text.error",
                textAlign: "center",
                height: "fit-content"
              }}
            >
              {side === "BUY" ? "LONG" : "SHORT"}
            </Typography>
            <Typography
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: "text.main"
                }
              }}
              onClick={() => dispatch(selectedSymbol(symbol.toLowerCase()))}
              component={"p"}
              variant="Medium_12"
            >
              {symbol}
              <Typography variant="Regular_9" component={"span"} sx={{ mx: "4px" }} color={"text.mild"}>
                {"|"}
              </Typography>
              <Typography variant="Regular_12" component={"span"} color={"text.main"}>
                <LeverageCell symbol={symbol} />
              </Typography>
            </Typography>
          </Box>{" "}
        </Grid>
        <Grid item xs={3}>
          <ClosePosition textVariant={"Regular_10"} symbol={symbol} variant="secondary" />
        </Grid>
        <Grid item xs={8}>
          <PositionPnL variant={"Medium_12"} isRoE={true} symbol={symbol} posAmt={posAmt} entryPrice={entryPrice} initialVal={unRealizedPnL} marginType={marginType} />

          <Typography variant="Regular_11" component={"p"} color={"#828282"}>
            {"P&L"}
            <Typography variant="Regular_7" component={"span"} sx={{ mx: "4px" }} color={"text.mild"}>
              {"|"}
            </Typography>{" "}
            {"          ROI "}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <MarginRatio symbol={symbol} />
          <Typography variant="Regular_11" component={"p"} color={"#828282"}>
            {"Margin Ratio"}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

ActivePositionCards.propTypes = {
  data: PropTypes.object
};

export default ActivePositionCards;
