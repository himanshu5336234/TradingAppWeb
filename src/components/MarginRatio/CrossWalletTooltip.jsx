import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
export const ACCORDIANGRIDITEM = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  p: 1,
  borderRadius: "4px",
  backgroundColor: "background.secondary"
};
const CrossWalletTooltip = ({ symbol, setDecimalPrecision }) => {
  const crossWalletBalance = useSelector((state) => state.futures.accountInfo.totalCrossWalletBalance);
  const positionData = useSelector((state) => state?.positionsDirectory?.crossWalletDetails.find((item) => item?.symbol.toUpperCase() === symbol.toUpperCase()));

  return (
    <Grid container sx={{ p: 0.5, gap: 1 }}>
      <Grid item xs={4.5} sx={{ ...ACCORDIANGRIDITEM }}>
        <Typography variant="Regular_10" component={"p"} color="text.secondary">
          {"Cross Wallet"}
        </Typography>
        <Typography variant="Medium_12" component={"p"}>
          {setDecimalPrecision(crossWalletBalance, 2)}
          {" USDT"}
        </Typography>
      </Grid>
      <Grid
        item
        xs={7}
        sx={{
          ...ACCORDIANGRIDITEM
        }}
      >
        <Typography variant="Regular_10" component={"p"} color="text.secondary">
          {"Position Initial Margin"}
        </Typography>
        <Typography variant="Medium_12" component={"p"}>
          {setDecimalPrecision(positionData?.initialMargin, 2)}
          {" USDT"}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "end"
        }}
      >
        <Typography variant="Medium_11">
          <Typography variant={"Regular_11"} textAlign={{ xs: "center", md: "start" }} component={"span"} color={"text.main"}>
            {"Note : "}
          </Typography>{" "}
          Cross Wallet is shared across all the cross positions
        </Typography>
      </Grid>
    </Grid>
  );
};

CrossWalletTooltip.propTypes = {
  symbol: PropTypes.string,
  setDecimalPrecision: PropTypes.func
};

export default memo(CrossWalletTooltip);
