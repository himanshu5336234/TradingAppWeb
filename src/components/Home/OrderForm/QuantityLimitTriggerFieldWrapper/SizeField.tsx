/* eslint-disable array-callback-return */
import React from "react";
// eslint-disable-next-line no-unused-vars
import PropTypes from "prop-types";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { Grid, Typography, Box, Tooltip, ClickAwayListener } from "@mui/material";
import MaximumBuyingPower from "../LeverageContainer/MaximumBuyingPower";
import { useSelector, useDispatch } from "react-redux";

import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
import TextView from "@/components/UI/TextView/TextView";
import { SymbolPrecisionHelper } from "@/helpers";
const QuantityField = ({ quantityFieldHook }: { quantityFieldHook: any }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const selectedSymbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  const { convertToPrecisionValueInContractAssetUnit, setDecimalPrecision, symbolQuantityPrecision } = SymbolPrecisionHelper({ symbol: selectedSymbol });
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const leverageFromServer = useSelector((state: any) => state.positionsDirectory.leverage).find((item: { sym: any }) => item.sym === selectedSymbol.toUpperCase());

  const {
    quantityType,
    quantityValue,
    handleQuantityChange,
    size,
    sizeError,
    handleSetMinSize,
    handleQuantityPercentageChange,
    symbol,
    setQuantityType,
    OrderType,
    handleSizeInContractAssetChange,
    ContactSizeToPrice,
    IsSizeFieldDisabled,
    minQantityForContract
    // MaxBuyingPowerInContractSize
  } = quantityFieldHook;
  return (
    <>
      <Grid
        className="productTour__step6"
        container
        alignItems={"flex-start"}
        border={"0.5px solid"}
        justifyContent={"space-between"}
        borderRadius={"4px"}
        p={"8px 8px 8px 0px"}
        gap={0.5}
        borderColor={sizeError.length > 0 ? "text.error" : "background.default"}
        bgcolor={"background.default"}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}
        >
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "background.tertiary"
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
                <Box>
                  <TextView component={"span"} variant={"Medium_11"} text={`Min Qty : `}>
                    <TextView component={"span"} variant={"Medium_12"} text={`${setDecimalPrecision(minQantityForContract, symbolQuantityPrecision)} `} />

                    <TextView component={"span"} variant={"Medium_11"} color={"text.quaternary"} text={`                   ${symbol.toUpperCase().replace("USDT", "")} `} />
                  </TextView>
                  <TextView component={"h4"} variant={"Medium_12"} text={ContactSizeToPrice(minQantityForContract, 2).toString()}>
                    <TextView component={"span"} variant={"Medium_11"} color={"text.quaternary"} text={" USDT"} />
                  </TextView>
                </Box>
              }
            >
              <Box onMouseLeave={handleTooltipClose} onClick={handleTooltipOpen}>
                <BasicTextFields
                  id="size-quantity-field"
                  label={"Size"}
                  variant="outlined"
                  type={"number"}
                  placeholder={"0.00"}
                  autoComplete="off"
                  autoFocus={true}
                  inputProps={{
                    // Optionally limit the input length
                    pattern: ".[0-9]{1,2}", // Pattern for browsers that support HTML5 validation
                    title: "Please enter a valid number (up to 2 decimal places)" // Title for HTML5 validation
                  }}
                  disabled={IsSizeFieldDisabled(OrderType)}
                  onChange={quantityType === "USDT" ? handleQuantityChange : handleSizeInContractAssetChange}
                  value={[quantityType === "USDT" ? quantityValue : convertToPrecisionValueInContractAssetUnit(size, symbolQuantityPrecision)]}
                />
              </Box>
            </Tooltip>
          </ClickAwayListener>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end"
            }}
          >
            <ToggleGroup
              disabled={IsSizeFieldDisabled(OrderType)}
              variant="secondary"
              value={quantityType}
              handleChange={(_event, value) => {
                if (value !== null) {
                  setQuantityType(value);
                  dispatch({
                    type: "UPDATE_SIZE_TOGGLE",
                    payload: value
                  });
                  dispatch({
                    type: "CHANGE_IN_ASSETS__STATE",
                    payload: value === "USDT" ? false : true
                  });
                }
              }}
              values={[
                {
                  name: `${symbol.toUpperCase().replace("USDT", "")}`,
                  value: `${symbol.toUpperCase().replace("USDT", "")}`
                },
                { name: "USDT", value: "USDT" }
              ]}
            />
            <Box>
              {quantityType !== "USDT" && (
                <>
                  <Typography onClick={handleSetMinSize} textAlign={"end"} variant="Bold_11" sx={{ mt: 1, cursor: "pointer" }}>
                    Min
                  </Typography>
                </>
              )}
              {quantityType === "USDT" && (
                <Typography onClick={handleSetMinSize} textAlign={"end"} variant="Bold_11" sx={{ mt: 1, cursor: "pointer" }}>
                  Min
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Grid pl={1} item xs={12}>
          <ToggleGroup
            disabled={IsSizeFieldDisabled(OrderType)}
            value={quantityType}
            handleChange={(event, _value) => {
              handleQuantityPercentageChange({
                target: { value: event.target.value }
              });
            }}
            variant={"primary"}
            values={[
              { name: "10%", value: "10", id: "10-per" },
              { name: "25%", value: "25", id: "20-per" },
              { name: "50%", value: "50", id: "30-per" },
              { name: "75%", value: "75", id: "40-per" },
              { name: "100%", value: "100", id: "50-per" }
            ]}
          />
        </Grid>

        <MaximumBuyingPower id="maximum-buying-power-SizeField" leverage={leverageFromServer?.leverage} alignment={""} />
      </Grid>
      <Grid item xs={12}>
        {sizeError.length > 0 && (
          <Typography component={"p"} variant="Regular_10" color={"text.error"}>
            {sizeError}
          </Typography>
        )}
      </Grid>
    </>
  );
};

QuantityField.propTypes = {
  dispatchOrderEvent: PropTypes.func,
  quantityFieldHook: PropTypes.object
};

export default QuantityField;
