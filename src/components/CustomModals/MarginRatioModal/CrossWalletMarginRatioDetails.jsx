import { Box, Grid, Tooltip, Typography } from "@mui/material";
import React, { memo, useEffect, useMemo } from "react";
import CustomModal from "../newModal/CustomModal";
import PropTypes from "prop-types";
import "./CrossWalletMarginRatioDetails.css";
import { useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import useMarginRatio from "@/components/Home/UserActivities/UserTabs/Positions/PositionRow/PositionRowComponents/MarginRatio/useMarginRatio";
import { recordCleverTapEvent } from "@/utils/recordCleverTapEvent";
const CrossWalletMarginRatioDetails = ({ close, showCrossWalletMarginRationModal }) => {
  const { isOpen, symbol, getIsolatedWallet, isIsolated } = showCrossWalletMarginRationModal;
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

  useEffect(() => {
    recordCleverTapEvent("OPEN_MARGIN_RATIO_SHEET", {
      Margin: getIsolatedWallet,
      MarginRatio: marginRatio,
      MarginBalance: marginBalance,
      TotalMaintenanceMargin: totalMaintMargin
    });
  }, [isOpen]);
  return (
    <>
      <CustomModal
        ContainerSx={{
          maxWidth: { xs: "460px" }
        }}
        isClose={true}
        TitleSx={{
          textAlign: "center",
          width: "100%",
          fontSize: "16px",
          fontWeight: 600
        }}
        title={symbol}
        titleChild={!isIsolated ? "cross" : "Isolated"}
        IsOpen={isOpen}
        close={close}
      >
        <Grid container alignItems={"center"} gap={3} justifyContent={"space-between"}>
          <Grid item xs={5}>
            <Box>
              <Typography variant="Medium_10" color={"text.regular"} component={"p"}>
                {"Margin Ratio"}
              </Typography>

              <Typography id="Margin-Ratio" sx={{ fontSize: "32px", fontWeight: 700 }} color={marginRatio > 60 ? "text.error" : marginRatio < 40 ? "text.success" : "#ec9719"} component={"p"}>
                {marginRatio}
                <Typography variant={"Bold_32"} component={"span"}>
                  {" %"}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box>
              <div id="main-div">
                <div className="layout-align">
                  <div id="score-meter-1" className="layout-align">
                    <div id="scorer-1-inner-div">
                      <div id="scorer-1-inner-div-5">
                        <div
                          className="scorer-1-tick"
                          style={{
                            transform: `rotate(${1.8 * Number(marginRatio)}deg)`
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

          <Grid item xs={5}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Typography variant="Medium_10" color={"text.regular"} component={"p"}>
                  {"Margin Balance "}
                  <Typography variant="Regular_9" component={"span"}>
                    {"(P&L adjusted)"}
                  </Typography>
                </Typography>
                <Tooltip title={"Wallet balance (cross/isolated) + Unrealised P&L"} placement="top">
                  <InfoIcon
                    sx={{
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#A9A9A9"
                    }}
                  ></InfoIcon>
                </Tooltip>
              </Box>

              <Typography id="Margin-bal" variant="Medium_12" component={"p"}>
                {marginBalance?.toFixed(4) || "--"}
                <Typography variant="SemiBold_12" component={"span"}>
                  {" USDT"}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5.5}>
            <Box>
              <Typography variant="Medium_10" color={"text.regular"} component={"p"}>
                {isIsolated ? "Isolated Wallet Balance" : "Cross wallet Balance"}
              </Typography>
              <Typography id="Wallet-Bal" variant="Medium_12" component={"p"}>
                {isIsolated ? getIsolatedWallet : Number(crossWalletBalance).toFixed(4)}
                <Typography variant="SemiBold_12" component={"span"}>
                  {" USDT"}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          {!isIsolated && (
            <Grid item xs={5.5}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Typography variant="Medium_10" color={"text.regular"} component={"p"}>
                    {"Total Maintenance Margin"}
                  </Typography>
                  <Tooltip title={"Minimum Margin balance (P&L adjusted) required to avoid all the cross positions from being liquidated"} placement="top">
                    <InfoIcon
                      sx={{
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#A9A9A9"
                      }}
                    ></InfoIcon>
                  </Tooltip>
                </Box>

                <Typography variant="SemiBold_12" component={"p"}>
                  {totalMaintMargin?.toFixed(4) || "--"}
                  <Typography variant="SemiBold_12" component={"span"}>
                    {" USDT"}
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid item xs={5.5}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Typography variant="Medium_10" color={"text.regular"} component={"p"}>
                  {"Position Maintenance Margin"}
                </Typography>
                <Tooltip title={" Minimum Margin balance(P&L adjusted) required to avoid position from being liquidated"} placement="top">
                  <InfoIcon
                    sx={{
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#A9A9A9"
                    }}
                  ></InfoIcon>
                </Tooltip>
              </Box>

              <Typography id="Position-Maintenance-margin" variant="Medium_12" component={"p"}>
                {maintMargin?.toFixed(4)}
                <Typography variant="SemiBold_12" component={"span"}>
                  {" USDT"}
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
};

CrossWalletMarginRatioDetails.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  showCrossWalletMarginRationModal: PropTypes.object
};

export default memo(CrossWalletMarginRatioDetails);
