import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { EXIT_LIMIT, EXIT_MARKET } from "@/components/Home/UserActivities/UserActivitiesObjects";
import ExitLimitMarketModal from "@/components/CustomModals/ExitLimitMarketModal";

const ExitLimitMarketOrder = ({ id, posAmt, entryPrice, side, symbolBaseAsset, symbol, marginType }) => {
  const [closePositionLimitOrMarket, setClosePositionLimitOrMarket] = useState({
    isOpen: false,
    exitWithLimitOrMarket: ""
  });

  return (
    <>
      {" "}
      <Grid item xs={3}>
        <Typography
          onClick={() =>
            setClosePositionLimitOrMarket({
              isOpen: true,
              orderType: "MARKET",
              positionEntry: {
                getPositionAmount: posAmt,
                getPositionSide: side,
                getEntryPrice: entryPrice,
                symbolBaseAsset,
                marginType
              },
              symbol
            })
          }
          id="position-marketClose-button"
          variant={"Bold_12"}
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            textDecorationThickness: "3px"
          }}
        >
          {EXIT_MARKET}
        </Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography
          onClick={() =>
            setClosePositionLimitOrMarket({
              isOpen: true,
              orderType: "LIMIT",
              positionEntry: {
                getPositionAmount: posAmt,
                getPositionSide: side,
                getEntryPrice: entryPrice,
                symbolBaseAsset
              },
              symbol
            })
          }
          id="position-setLimit-button"
          variant={"Bold_12"}
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            textDecorationThickness: "3px"
          }}
        >
          {EXIT_LIMIT}
        </Typography>
      </Grid>
      {closePositionLimitOrMarket.isOpen === true && (
        <ExitLimitMarketModal
          isOpen={closePositionLimitOrMarket.isOpen}
          close={() =>
            setClosePositionLimitOrMarket({
              isOpen: false
            })
          }
          secondaryAction={() =>
            setClosePositionLimitOrMarket({
              isOpen: false
            })
          }
          orderType={closePositionLimitOrMarket.orderType}
          positionEntry={closePositionLimitOrMarket.positionEntry}
          symbol={closePositionLimitOrMarket.symbol}
        />
      )}
    </>
  );
};

ExitLimitMarketOrder.propTypes = {
  id: PropTypes.string,
  posAmt: PropTypes.number,
  entryPrice: PropTypes.number,
  side: PropTypes.string,
  symbolBaseAsset: PropTypes.string,
  symbol: PropTypes.string,
  marginType: PropTypes.string
};

export default ExitLimitMarketOrder;
