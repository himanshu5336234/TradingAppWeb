import React from "react";
import PropTypes from "prop-types";
import { InputAdornment, Typography } from "@mui/material";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
const TakeProfit = ({
  TakeProfitStopLossEventHook,
  bg,
  isOCOModal = false,
  handleLastPriceClick
}: {
  TakeProfitStopLossEventHook: any;
  bg: string;
  isOCOModal: boolean;
  handleLastPriceClick: () => void;
}) => {
  const { estimateProfitForTakeProfit, takeProfitValidationError, takeProfit, handleTakeProfit, dropDownValueForStoploss } = TakeProfitStopLossEventHook;
  const handlAdormentClick = () => {
    if (isOCOModal && dropDownValueForStoploss === "price") {
      handleLastPriceClick("TAKE_PROFIT");
    }
  };
  return (
    <>
      <BasicTextFields
        id={"take-profit-input"}
        Error={takeProfitValidationError.length > 0}
        label={"Take Profit"}
        backgroundColor={bg ?? "background.default"}
        type={"number"}
        value={takeProfit}
        placeholder={"0.00"}
        onChange={handleTakeProfit}
        inputProps={{
          // Optionally limit the input length
          pattern: ".[0-9]{1,2}", // Pattern for browsers that support HTML5 validation
          title: "Please enter a valid number (up to 2 decimal places)" // Title for HTML5 validation
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <>
                <Typography onClick={handlAdormentClick} component="p" variant="Bold_12" sx={{ cursor: "pointer" }}>
                  {dropDownValueForStoploss === "ROE" && "%"}
                  {dropDownValueForStoploss === "amount" && "USDT"}
                  {isOCOModal && dropDownValueForStoploss === "price" && "Last"}
                </Typography>
              </>
            </InputAdornment>
          )
        }}
      />
      {/* </Grid> */}
      <Typography variant="Regular_10" color="text.error">
        {takeProfitValidationError}
      </Typography>
      {estimateProfitForTakeProfit.length > 0 && !takeProfitValidationError.length > 0 && (
        <Typography variant="Regular_10" color={"text.secondary"}>
          {dropDownValueForStoploss === "amount" ? "Take Profit Price: " : "Est Profit: "}
          <Typography variant="SemiBold_11" color="text.success">
            {estimateProfitForTakeProfit}
            {" USDT"}
          </Typography>
        </Typography>
      )}
    </>
  );
};
TakeProfit.propTypes = {
  TakeProfitStopLossEventHook: PropTypes.object,
  bg: PropTypes.string,
  isOCOModal: PropTypes.bool,
  handleLastPriceClick: PropTypes.func
};
export default TakeProfit;
