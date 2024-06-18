import React from "react";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";

import { InputAdornment, Box, Typography } from "@mui/material";
import LastTradedPrice from "@/components/LastTradedPrice/LastTradedPrice";
import PropTypes from "prop-types";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
// import { useSelector } from "react-redux";
import { styles } from "./ExitLimitMarketModal.styled";

import {
  // BUY_SELL_MAP,
  EXIT_LIMIT_MARKET_CONSTANTS
} from "./ExitMarketModal.const";

import { useExitLimitMarketModal } from "../../frontend-BL/businessHooks";
import CustomModal from "./newModal/CustomModal";
import { useSelector } from "react-redux";
const ExitLimitMarketModal = ({ isOpen, close, positionEntry, orderType, symbol }) => {
  const snapltp = useSelector((state) => state.BinanceStreamData.binanceData?.[`${symbol?.toLowerCase()}@ticker`]);
  const {
    handleSizeChange,
    handleSubmit,
    handleLimitPriceChange,
    exitPositionApiResponseStatus,
    setDecimalPrecision,
    helperTextForPrice,
    toggleSize,
    maxSize,
    estimatedPnL,
    symbolPricePrecision,
    limitPrice,
    size,
    setToggleSize,
    setSize,
    helperTextForSize,
    ltp
  } = useExitLimitMarketModal({
    isOpen,
    close,
    orderType,
    positionEntry: { ...positionEntry, ltp: snapltp },
    symbol
  });
  const modalTitle = orderType === EXIT_LIMIT_MARKET_CONSTANTS.ORDER_TYPE_MARKET ? EXIT_LIMIT_MARKET_CONSTANTS.EXIT_MARKET_ORDER_TITLE : EXIT_LIMIT_MARKET_CONSTANTS.EXIT_LIMIT_ORDER_TITLE;

  return (
    <CustomModal
      isDisabled={exitPositionApiResponseStatus}
      isloading={exitPositionApiResponseStatus}
      primaryAction={handleSubmit}
      isPrimaryAction={true}
      primaryName={"confirm"}
      IsOpen={isOpen}
      close={close}
      isClose={true}
      secondaryName={EXIT_LIMIT_MARKET_CONSTANTS.CANCEL_LABEL}
      isSecondaryAction={true}
      ContainerSx={{ maxWidth: { xs: "460px" } }}
      secondaryAction={close}
    >
      <Box pt={2} px={1}>
        <Typography variant={"Medium_16"}>{modalTitle}</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "18px",
            marginBottom: "16px"
          }}
        >
          <Box>
            <Typography component={"h5"} variant={"Medium_10"} color={"text.secondary"}>
              {"LTP"}
            </Typography>
            <Box
              sx={{
                textAlign: { xs: "start" }
              }}
            >
              <Typography sx={{ marginTop: "6px" }}>
                <LastTradedPrice symbol={symbol} symbolPricePrecision={symbolPricePrecision} variant="Medium_12" convertToPrecisionValueForPrice={setDecimalPrecision} />
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography component={"h5"} variant={"Medium_10"} color={"text.secondary"}>
              {"ENTRY PRICE"}
            </Typography>
            <Typography component={"h5"} variant={"Medium_12"} sx={{ marginTop: "6px" }}>
              {setDecimalPrecision(positionEntry?.getEntryPrice, symbolPricePrecision)}
            </Typography>
          </Box>
          <Box>
            <Typography component={"h5"} variant={"Medium_10"} color={"text.secondary"}>
              {"POSITION SIDE"}
            </Typography>
            <Box
              sx={{
                height: "22",
                width: "56px",
                background: positionEntry?.getPositionSide === "BUY" ? "linear-gradient(180deg, #29B57E -234.85%, #0E0E0F 146.96%)" : "linear-gradient(180deg, #FF6554 -185.78%, #0E0E0F 138.65%)",
                borderRadius: "3px",
                display: "flex",
                justifyContent: "space-around",
                marginTop: "5px"
              }}
            >
              <Typography
                component={"p"}
                variant={"Medium_12"}
                sx={{
                  color: positionEntry?.getPositionSide === "BUY" ? "text.success" : "text.error",
                  marginBottom: "1px"
                }}
              >
                {" "}
                {positionEntry?.getPositionSide === "BUY" ? "LONG" : "SHORT"}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography component={"h5"} variant={"Medium_10"} color={"text.secondary"}>
              {"SIZE"}
            </Typography>
            <Typography component={"h5"} variant={"Medium_12"} sx={{ marginTop: "6px" }}>
              {" "}
              {maxSize}
              {"   "}
              {symbol.slice(0, -4)}{" "}
            </Typography>
          </Box>
        </Box>
        {orderType === EXIT_LIMIT_MARKET_CONSTANTS.ORDER_TYPE_LIMIT && (
          <Box sx={{ marginTop: "16px", marginBottom: "8px" }}>
            <BasicTextFields
              placeholder={"0.00"}
              type="number"
              label={EXIT_LIMIT_MARKET_CONSTANTS.ENTER_PRICE_LABEL}
              value={limitPrice}
              onChange={handleLimitPriceChange}
              // margin
              InputProps={{
                id: "positionModal-Price-In-USDT",
                endAdornment: (
                  <InputAdornment position="end" disableTypography>
                    <Typography
                      variant={"SemiBold_11"}
                      color={"text.default"}
                      id="positionModal-Last-BTN"
                      onClick={() => {
                        handleLimitPriceChange({
                          target: { value: ltp }
                        });
                      }}
                      style={styles.maxBtn}
                    >
                      {EXIT_LIMIT_MARKET_CONSTANTS.LAST_LABEL}
                    </Typography>
                  </InputAdornment>
                )
              }}
            />
            {helperTextForPrice.length > 0 && (
              <Typography color={"text.error"} variant={"Medium_12"}>
                {helperTextForPrice}
              </Typography>
            )}
          </Box>
        )}

        <Box sx={{ borderRadius: "4px", backgroundColor: "background.default" }}>
          <BasicTextFields
            InputProps={{
              id: "positionModal-Price_in-" + symbol,
              endAdornment: (
                <InputAdornment position="end" disableTypography>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    variant={"SemiBold_11"}
                    color={"text.default"}
                    id="positionModal-Max-BTN"
                    onClick={() => {
                      setSize(maxSize);
                      setToggleSize("");
                    }}
                  >
                    {EXIT_LIMIT_MARKET_CONSTANTS.MAX_LABEL}
                  </Typography>
                </InputAdornment>
              )
            }}
            styles={{ my: 0.3 }}
            label={"Size"}
            type={"number"}
            value={size}
            onChange={handleSizeChange}
            placeholder={"0.00"}
          />
          <Box p={1}>
            <ToggleGroup
              value={toggleSize}
              exclusive
              handleChange={(event, value) => {
                setToggleSize(value);

                handleSizeChange({
                  target: { value: (Number(maxSize) * value) / 100 }
                });
              }}
              variant={"primary"}
              values={[
                { name: "10%", value: 10, id: "positionModal-10-BTN" },
                { name: "25%", value: 25, id: "positionModal-25-BTN" },
                { name: "50%", value: 50, id: "positionModal-50-BTN" },
                { name: "75%", value: 75, id: "positionModal-75-BTN" },
                { name: "100%", value: 100, id: "positionModal-100-BTN" }
              ]}
            />
          </Box>
        </Box>

        {helperTextForSize.length > 0 && (
          <Typography color={"text.error"} variant={"Medium_12"}>
            {helperTextForSize}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "center",
            mt: 2
          }}
        >
          <Typography variant="Medium_11" sx={{ color: "text.regular", letterSpacing: "0.5px" }}>
            {"Estimated P&L"}
          </Typography>

          {isNaN(estimatedPnL) ? (
            "--"
          ) : (
            <Typography id="positionModal-Est-PnL" variant="Medium_11" color={[estimatedPnL > 0 ? "text.success" : "text.error"]} sx={{ letterSpacing: "0.5px" }}>
              {estimatedPnL + EXIT_LIMIT_MARKET_CONSTANTS.QUOTE_ASSET_LABEL}
            </Typography>
          )}
        </Box>
      </Box>
    </CustomModal>
  );
};

ExitLimitMarketModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  handleSubmit: PropTypes.func,
  positionEntry: PropTypes.object,
  orderType: PropTypes.string,
  secondaryActionTitle: PropTypes.string,
  secondaryAction: PropTypes.func,
  isSecondaryActionVisible: PropTypes.bool,
  symbol: PropTypes.string
};

export default ExitLimitMarketModal;
