import { Box, Drawer, Grid, Typography } from "@mui/material";
import React, { memo, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import "./CrossWalletMarginRatioDetails.css";
import { SymbolPrecisionHelper } from "@/helpers";
import { useSelector } from "react-redux";
import { CLOSE_BUTTON_WRAPPER, DRAWER_CLOSE_BUTTON, MARGIN_DRAWER } from "./Styles";
import useMarginRatio from "@/components/Home/UserActivities/UserTabs/Positions/PositionRow/PositionRowComponents/MarginRatio/useMarginRatio";
const MCrossWalletMarginRatioDetails = ({ close, showCrossWalletMarginRationModal }) => {
  const { isOpen, symbol, isIsolated, getIsolatedWallet } = showCrossWalletMarginRationModal;

  const { setDecimalPrecision } = SymbolPrecisionHelper({ symbol });
  const allCrossPositionsData = useSelector((state) => state.positionsDirectory?.crossWalletDetails);
  const crossWalletBalance = useSelector((state) => state.futures.accountInfo.totalCrossWalletBalance);

  const totalMaintMargin = useMemo(() => {
    let totalMaintMarginValue = 0;
    if (allCrossPositionsData.length > 0) {
      allCrossPositionsData.forEach((position) => {
        totalMaintMarginValue += Number(position.maintMargin);
      });
      return totalMaintMarginValue;
    }
  }, [allCrossPositionsData]);

  const { maintMargin, marginBalance, marginRatio } = useMarginRatio({
    symbol
  });

  const handleClose = () => close();
  return (
    <>
      <Drawer sx={MARGIN_DRAWER} anchor="bottom" open={isOpen} onClose={handleClose}>
        <Box sx={{ ml: "20px", mt: "28px" }}>
          <Typography component={"h1"} variant="Bold_24">
            {symbol}
            <Typography component={"span"} variant={"Regular_16"}>
              {!isIsolated ? "cross" : "Isolated"}
            </Typography>
          </Typography>
        </Box>
        <Grid container alignItems={"center"} rowGap={1.5} justifyContent={"flex-start"} py={2}>
          <Grid item xs={6}>
            <Box>
              <div id="main-div">
                <div className="layout-align">
                  <div id="score-meter-1" className="layout-align">
                    <div id="scorer-1-inner-div-mweb">
                      <div id="scorer-1-inner-div-5">
                        <div
                          className="scorer-1-tick"
                          style={{
                            // setDecimalPrecision(margin[0].marginRatio)
                            transform: `rotate(${1.8 * setDecimalPrecision(marginRatio)}deg)`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div id="scorer-1-inner-div-2"></div>
                    <div id="scorer-1-inner-div-3"></div>
                    <div id="scorer-1-inner-div-4"></div>
                  </div>
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ marginTop: 4 }}>
            <Box>
              <Typography variant="Regular_12" color={"text.mild"} component={"p"}>
                {"Margin Ratio"}
              </Typography>
              <Typography
                sx={{ fontSize: "32px", fontWeight: 700 }}
                color={setDecimalPrecision(marginRatio) > 60 ? "text.error" : setDecimalPrecision(marginRatio) < 40 ? "text.success" : "#ec9719"}
                component={"p"}
              >
                {Number(marginRatio).toFixed(2)}
                <Typography variant={"SemiBold_20"} component={"span"} sx={{ marginBottom: 0.5, display: "inline-block" }}>
                  {" %"}
                </Typography>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box>
              <Typography variant="Regular_12" color={"text.mild"} component={"p"}>
                {"Margin Balance"}
              </Typography>
              <Typography variant="SemiBold_18" component={"p"}>
                {marginBalance?.toFixed(4) || "--"}

                <Typography variant="SemiBold_12" component={"span"}>
                  {" USDT"}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography variant="Regular_14" color={"text.mild"} component={"p"}>
                {isIsolated ? "Isolated Wallet Balance" : "Cross wallet Balance"}
              </Typography>
              <Typography variant="SemiBold_18" component={"p"}>
                {isIsolated ? getIsolatedWallet : Number(crossWalletBalance).toFixed(4)}
                <Typography variant="SemiBold_12" component={"span"}>
                  {" USDT"}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          {!isIsolated && (
            <Grid item xs={6}>
              <Box>
                <Typography variant="Regular_12" color={"text.mild"} component={"p"}>
                  {"Total Maintenance Margin"}
                </Typography>
                <Typography variant="SemiBold_18" component={"p"}>
                  {totalMaintMargin?.toFixed(4) || "--"}
                  <Typography variant="SemiBold_12" component={"span"}>
                    {" USDT"}
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid item xs={6}>
            <Box>
              <Typography variant="Regular_12" color={"text.mild"} component={"p"}>
                {"Position Maintenance Margin"}
              </Typography>
              <Typography variant="SemiBold_18" component={"p"}>
                {maintMargin?.toFixed(4)}
                <Typography variant="SemiBold_11" component={"span"}>
                  {" USDT"}
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={CLOSE_BUTTON_WRAPPER}>
          <Box sx={DRAWER_CLOSE_BUTTON} onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 24 }} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

MCrossWalletMarginRatioDetails.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  showCrossWalletMarginRationModal: PropTypes.object
};

export default memo(MCrossWalletMarginRatioDetails);
