import React from "react";
import { Grid, Typography } from "@mui/material";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
import TakeProfit from "@/components/Home/OrderForm/TakeProfitStopLoss/TakeProfit";
import StopLoss from "@/components/Home/OrderForm/TakeProfitStopLoss/StopLoss";

interface AddTPSLInputModalProps {
  TakeProfitStopLossEventHook: {
    dropDownValueForStoploss: string;
    handleStopLossAndTakeProfitDropDownValue: (value: string) => void;
    handleLastClick: (value: "TAKE_PROFIT" | "STOP_LOSS") => void;
  };
}

const AddTPSLInputModal: React.FC<AddTPSLInputModalProps> = ({ TakeProfitStopLossEventHook }) => {
  return (
    <Grid container gap={1}>
      <Grid item xs={3}>
        <ToggleGroup
          id="toggle-button-tp-sl"
          variant="secondary"
          value={TakeProfitStopLossEventHook.dropDownValueForStoploss}
          handleChange={(e: any) => {
            TakeProfitStopLossEventHook.handleStopLossAndTakeProfitDropDownValue(e.target.value);
          }}
          values={[
            {
              name: "Price",
              value: "price"
            },
            {
              name: "Amount",
              value: "amount"
            },
            {
              name: "ROE",
              value: "ROE"
            }
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <TakeProfit TakeProfitStopLossEventHook={TakeProfitStopLossEventHook} isOCOModal={true} handleLastPriceClick={TakeProfitStopLossEventHook.handleLastClick} />
      </Grid>
      <Grid item xs={12}>
        {" "}
        <StopLoss TakeProfitStopLossEventHook={TakeProfitStopLossEventHook} isOCOModal={true} handleLastPriceClick={TakeProfitStopLossEventHook.handleLastClick} />
      </Grid>
      <Grid item xs={12}>
        <Typography component={"p"} variant="Regular_12" color={"#EBB62F"}>
          {"Please take into consideration Liquidation price while placing SL"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AddTPSLInputModal;
