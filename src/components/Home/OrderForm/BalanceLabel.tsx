import React, { useState } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { numberWithCommas } from "@/helpers/commaHelper";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ORDERFORM_CONSTANTS } from "../../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderFormCalculatorModal from "./OrderFormCalculator";
import Calculator from "./Calculator.svg";
import CalculatorHover from "./CalculatorHover.svg";

const BalanceLabel = () => {
  const navigate = useNavigate();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const availableCrossWalletBalanceForPlacingNewOrder = useSelector((state: any) => state.currentPositions.crossWalletBalance);
  return (
    <>
      <Box>
        <Typography variant="Medium_12" component={"h6"} color={"text.quaternary"} id="orderForm-availableBal-text">
          {ORDERFORM_CONSTANTS.AVAILABLE_BALANCE_LABEL}
        </Typography>
      </Box>
      {isCalculatorOpen && <OrderFormCalculatorModal isCalculatorOpen={isCalculatorOpen} setIsCalculatorOpen={setIsCalculatorOpen} />}
      <Box sx={{ display: "flex", mt: 1 }}>
        <Typography variant="Medium_12" component={"h6"} id="orderForm-availableBalance">
          {availableCrossWalletBalanceForPlacingNewOrder === 0 ? "--" : numberWithCommas(Math.trunc(availableCrossWalletBalanceForPlacingNewOrder * 100) / 100)}
          {" USDT"}
        </Typography>
        <Typography
          component={"span"}
          id="orderForm-addBalance-btn"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/wallet", {
              state: { currentTab: { value: "deposit" } }
            });
          }}
        >
          <AddBoxIcon
            sx={{
              fontSize: "12px",
              ml: 1,
              mr: 1,
              color: "background.default",
              background: "#ffffff"
            }}
          />
        </Typography>
        <Tooltip title={"P&L and Fee Calculator"} placement="top">
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            component="img"
            id={"calculator-btn"}
            onClick={() => setIsCalculatorOpen(true)}
            src={!isHovered ? Calculator : CalculatorHover}
            sx={{ height: "20px", width: "20px", cursor: "pointer" }}
          />
        </Tooltip>
      </Box>
    </>
  );
};

export default BalanceLabel;
