import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import { ToggleButton } from "@mui/material";

const InrUsdtToggle = ({ currentCurrency, handleCurrencyChange }: { currentCurrency: string; handleCurrencyChange: (e: any) => void }) => {
  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      border: 0,
      "&.Mui-disabled": {
        border: 0
      },
      "&:not(:first-of-type)": {
        borderRadius: theme.shape.borderRadius
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius
      }
    }
  }));
  return (
    <>
      <StyledToggleButtonGroup
        size="small"
        exclusive
        id="orderForm-buySellToggle-button"
        value={currentCurrency}
        onChange={handleCurrencyChange}
        sx={{
          backgroundColor: "background.secondary",
          width: "100%"
        }}
        aria-label="text alignment"
      >
        <ToggleButton
          id="buyLong-btn"
          // variant="success"
          value="INR"
          sx={{ width: "50%", textTransform: "capitalize", p: 2 }}
        >
          {"INR to USDT"}
        </ToggleButton>
        <ToggleButton
          id="sellSort-btn"
          // variant="failed"
          value="USDT"
          sx={{ width: "50%", textTransform: "capitalize" }}
        >
          {"USDT to INR"}
        </ToggleButton>
      </StyledToggleButtonGroup>
    </>
  );
};

export default React.memo(InrUsdtToggle);
