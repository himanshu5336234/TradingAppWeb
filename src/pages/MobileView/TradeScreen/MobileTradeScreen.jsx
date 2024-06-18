import { ORDERFORM_CONSTANTS } from "@/frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

import PropTypes from "prop-types";
import MobileOrderForm from "./MobileOrderFrom/mobileOrderForm";
const MobileTradeScreen = () => {
  const [openOrderForm, setOpenOrderForm] = useState({
    open: false,
    side: "BUY"
  });
  const handleForm = (Side) => {
    setOpenOrderForm({ open: true, side: Side });
  };
  return (
    <>
      <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <Button onClick={() => handleForm("BUY")} variant="success" value="BUY" sx={{ width: "50%", textTransform: "capitalize" }}>
          {ORDERFORM_CONSTANTS.BUY_LONG_LABEL}
        </Button>
        <Button onClick={() => handleForm("SELL")} variant="failed" value="SELL" sx={{ width: "50%", textTransform: "capitalize" }}>
          {ORDERFORM_CONSTANTS.SELL_SHORT_LABEL}
        </Button>
        <MobileOrderForm isOpen={openOrderForm?.open} side={openOrderForm.side} close={() => setOpenOrderForm({ ...openOrderForm, open: false })} />
      </Box>
    </>
  );
};
MobileTradeScreen.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default MobileTradeScreen;
