import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
import { ORDERFORM_CONSTANTS } from "@/frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";
import { Box, Button, ClickAwayListener, Tooltip, Typography } from "@mui/material";
import React, { useMemo } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Draggable from "react-draggable-component";
import { useSelector } from "react-redux";
import TextView from "@/components/UI/TextView/TextView";
import { SymbolPrecisionHelper } from "@/helpers";
import useQuickOrder from "@/frontend-BL/businessHooks/ORDER_FORM/useQuickOrder";
const OuickOrder = ({ SetQuickTradeActive }) => {
  const [open, setOpen] = React.useState(false);
  const {
    costPrice,
    quantityType,
    sizeInUsdt,
    showLoader,
    handleQuantityChange,
    sizeInContract,
    sizeError,
    handleSetMinSize,
    symbol,
    PlaceOrder,
    setQuantityType,
    closeQuickTrade,
    handleSizeInContractAssetChange
  } = useQuickOrder({});
  const { symbolPricePrecision, setDecimalPrecision } = SymbolPrecisionHelper({
    symbol
  });
  const OrderBook = useSelector((state) => state.OrderBook);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const showButton = useMemo(() => {
    const Bids = [...OrderBook?.bidsSnapShot];
    const asks = [...OrderBook?.asksSnapShot];
    if (asks.length > 0 && Bids.length > 0) {
      return (
        <>
          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
            <Button disabled={showLoader} onClick={() => PlaceOrder({ side: "BUY", quantity: sizeInContract })} variant="success" value="BUY" sx={{ width: "50%", textTransform: "capitalize" }}>
              <Box>
                <TextView id={"quick-order-buyLong-btn"} component={"h4"} variant={"Medium_12"} text={ORDERFORM_CONSTANTS.BUY_LONG_LABEL} />
                <Typography component={"h4"} variant={"Bold_12"} color={"#026F44"}>
                  {setDecimalPrecision(Bids[0][0], symbolPricePrecision)}
                </Typography>
              </Box>
            </Button>
            <Button disabled={showLoader} onClick={() => PlaceOrder({ side: "SELL", quantity: sizeInContract })} variant="failed" value="SELL" sx={{ width: "50%", textTransform: "capitalize" }}>
              <Box>
                <TextView id={"quick-order-sellShort-btn"} component={"h4"} variant={"Medium_12"} text={ORDERFORM_CONSTANTS.SELL_SHORT_LABEL} />
                <Typography component={"h4"} variant={"Bold_12"} color={"#9B0F00"}>
                  {setDecimalPrecision(asks[0][0], symbolPricePrecision)}
                </Typography>
              </Box>
            </Button>
          </Box>
        </>
      );
    }
  }, [OrderBook?.asks, sizeInContract]);
  return (
    <>
      {" "}
      <Draggable
        position={{
          x: 0,
          y: 0
        }}
      >
        <Box
          sx={{
            cursor: "grab",
            width: "250px",
            py: 1,
            px: 2,
            zIndex: 1300,
            position: "relative",
            borderRadius: "4px",
            backgroundColor: "background.tertiary"
          }}
        >
          <Box sx={{ display: "flex", pb: 1, justifyContent: "space-between" }}>
            <MenuIcon />
            <CloseIcon
              onClick={() => {
                closeQuickTrade, SetQuickTradeActive(false);
              }}
              sx={{ cursor: "pointer" }}
              id={"close-quick-order-modal"}
            />
          </Box>

          <Box
            sx={{
              borderColor: [sizeError.length > 0 ? "text.error" : "background.default"],
              p: 1,
              border: "0.5px solid",
              display: "flex",
              backgroundColor: "background.default",
              borderRadius: "4px",
              alignItems: "flex-start"
            }}
          >
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      p: 2,
                      width: "250px",
                      backgroundColor: "background.secondary"
                    }
                  }
                }}
                arrow
                placement="top-end"
                PopperProps={{
                  disablePortal: true
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      {" "}
                      <TextView text={"Margin used"} />
                      <TextView id={"quick-order-margin-used"} text={`${costPrice("BUY")} USDT`} />
                    </Box>
                  </Box>
                }
              >
                <Box onMouseLeave={handleTooltipClose} onClick={handleTooltipOpen}>
                  <BasicTextFields
                    label={"Size"}
                    variant="outlined"
                    type={"number"}
                    placeholder={"0.00"}
                    autoComplete="off"
                    autoFocus={true}
                    id={"quick-order-size"}
                    onChange={quantityType === "USDT" ? handleQuantityChange : handleSizeInContractAssetChange}
                    value={[quantityType === "USDT" ? sizeInUsdt : sizeInContract]}
                  />
                </Box>
              </Tooltip>
            </ClickAwayListener>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end"
              }}
            >
              <ToggleGroup
                variant="secondary"
                value={quantityType}
                handleChange={(event, value) => {
                  if (value !== null) {
                    setQuantityType(value);
                  }
                }}
                values={[
                  {
                    name: `${symbol.toUpperCase().replace("USDT", "")}`,
                    value: `${symbol.toUpperCase().replace("USDT", "")}`,
                    id: "contract-tab"
                  },
                  { name: "USDT", value: "USDT", id: "usdt-tab" }
                ]}
              />
              <Box>
                {quantityType !== "USDT" && (
                  <>
                    <Typography id={"quick-order-min"} onClick={handleSetMinSize} component="p" textAlign={"end"} variant="Bold_11" sx={{ mt: 1, cursor: "pointer" }}>
                      Min
                    </Typography>
                  </>
                )}
                {quantityType === "USDT" && (
                  <Typography id={"quick-order-min"} onClick={handleSetMinSize} component="p" textAlign={"end"} variant="Bold_11" sx={{ mt: 1, cursor: "pointer" }}>
                    Min
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          {sizeError.length > 0 && (
            <Typography component={"p"} variant="Regular_10" color={"text.error"}>
              {sizeError}
            </Typography>
          )}
          {showButton}
        </Box>
      </Draggable>
    </>
  );
};

OuickOrder.propTypes = {
  quantityFieldHook: PropTypes.object
};
export default OuickOrder;
