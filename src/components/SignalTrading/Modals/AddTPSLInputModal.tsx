import React from "react";
import { Box, Typography } from "@mui/material";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
// import TakeProfit from "@/components/OrderForm/TakeProfitStopLoss/TakeProfit";
// import StopLoss from "@/components/OrderForm/TakeProfitStopLoss/StopLoss";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
interface AddTPSLInputModalProps {
  TakeProfitStopLossEventHook: any;
}

const AddTPSLInputModal: React.FC<AddTPSLInputModalProps> = ({ TakeProfitStopLossEventHook }) => {
  const { takeProfitValue, stopLossValue, takeProfitValidationError, stopLossValidaionError, handleTakeProfit, handleStopLoss } = TakeProfitStopLossEventHook;
  return (
    <Box>
      <Box maxWidth={"100px"}>
        <ToggleGroup
          variant="secondary"
          value={"price"}
          // handleChange={(_: any, value: string) => {
          //   TakeProfitStopLossEventHook.handleStopLossAndTakeProfitDropDownValue(value);
          // }}
          values={[
            {
              name: "Price",
              value: "price"
            }
          ]}
        />
      </Box>
      <Box mt={1}>
        <BasicTextFields
          Error={takeProfitValidationError.length > 0}
          label={"Take Profit"}
          backgroundColor={"background.default"}
          type={"number"}
          value={takeProfitValue}
          placeholder={"0.00"}
          onChange={handleTakeProfit}
        />
        {/* </Grid> */}
        <Typography variant="Regular_10" color="text.error">
          {takeProfitValidationError}
        </Typography>
      </Box>
      <Box mt={1}>
        <BasicTextFields
          Error={stopLossValidaionError.length > 0}
          label={"Stop Loss"}
          backgroundColor={"background.default"}
          type={"number"}
          value={stopLossValue}
          placeholder={"0.00"}
          onChange={handleStopLoss}
        />
        {/* </Grid> */}
        <Typography variant="Regular_10" color="text.error">
          {stopLossValidaionError}
        </Typography>
      </Box>
    </Box>
  );
};

export default AddTPSLInputModal;
