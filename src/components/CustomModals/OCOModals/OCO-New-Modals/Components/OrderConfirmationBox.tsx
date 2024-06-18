import { Typography, Box } from "@mui/material";
import React from "react";
import BuySellTab from "../../../../SignalTrading/BuySellTab";
import { FLEX_BOX_ALIGN_CENTER_JUSTIFY_BETWEEN, ORDER_CONFIRMATION_CONTAINER } from "../../../../SignalTrading/Modals/Modals.styles";

interface OrderConfirmationBoxProps {
  leverage: number;
  side: string;
  takeProfit: string;
  stopLoss: string;
}
const OrderConfirmationBox: React.FC<OrderConfirmationBoxProps> = ({ leverage, side, takeProfit, stopLoss }) => {
  return (
    <Box sx={ORDER_CONFIRMATION_CONTAINER}>
      <Typography variant="Medium_14">{"Order Confirmation"}</Typography>
      <Box id={"oco-confirmation-value-side"} sx={FLEX_BOX_ALIGN_CENTER_JUSTIFY_BETWEEN} mt={4}>
        <Typography variant="SemiBold_12" color={"text.secondary"}>
          Side
        </Typography>
        <BuySellTab side={side} />
      </Box>

      <Box id={"oco-confirmation-value-leverage"} sx={FLEX_BOX_ALIGN_CENTER_JUSTIFY_BETWEEN} mt={2}>
        <Typography variant="SemiBold_12" color={"text.secondary"}>
          Leverage
        </Typography>
        <Typography variant="Medium_14">
          {leverage}
          {"x"}
        </Typography>
      </Box>
      <Box id={"oco-confirmation-value-tp"} sx={FLEX_BOX_ALIGN_CENTER_JUSTIFY_BETWEEN} mt={2}>
        <Typography variant="SemiBold_12" color={"text.secondary"}>
          Take Profit
        </Typography>
        <Typography variant="Medium_14">{takeProfit || "--"}</Typography>
      </Box>
      <Box id={"oco-confirmation-value-sl"} sx={FLEX_BOX_ALIGN_CENTER_JUSTIFY_BETWEEN} mt={2}>
        <Typography variant="SemiBold_12" color={"text.secondary"}>
          Stop Loss
        </Typography>
        <Typography variant="Medium_14">{stopLoss || "--"}</Typography>
      </Box>
    </Box>
  );
};

export default OrderConfirmationBox;
