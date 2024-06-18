import React from "react";
import PropTypes from "prop-types";
import { InputAdornment, Typography } from "@mui/material";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
const StopLoss = ({
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
  const { dropDownValueForStoploss, estimateProfitForStopLoss, stopLossValidaionError, stopLoss, handleStopLoss } = TakeProfitStopLossEventHook;
  const handlAdormentClick = () => {
    if (isOCOModal && dropDownValueForStoploss === "price") {
      handleLastPriceClick("STOP_LOSS");
    }
  };
  return (
    <>
      <BasicTextFields
        id="stop-loss"
        Error={stopLossValidaionError.length > 0}
        type={"number"}
        label={"Stop Loss"}
        backgroundColor={bg ?? "background.default"}
        placeholder={"0.00"}
        value={stopLoss}
        onChange={handleStopLoss}
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
      <Typography variant="Regular_10" color="text.error">
        {stopLossValidaionError}
      </Typography>
      {estimateProfitForStopLoss.length > 0 && !stopLossValidaionError.length > 0 && (
        <Typography variant="Regular_10" color={"text.secondary"}>
          {dropDownValueForStoploss === "amount" ? "Stop Loss Price: " : "Est Loss: "}

          <Typography variant="SemiBold_11" color="text.error">
            {estimateProfitForStopLoss}
            {" USDT"}
          </Typography>
        </Typography>
      )}
      {/* </Grid> */}
    </>
  );
};
StopLoss.propTypes = {
  TakeProfitStopLossEventHook: PropTypes.object,
  bg: PropTypes.string,
  isOCOModal: PropTypes.bool,
  handleLastPriceClick: PropTypes.func
};
export default StopLoss;
