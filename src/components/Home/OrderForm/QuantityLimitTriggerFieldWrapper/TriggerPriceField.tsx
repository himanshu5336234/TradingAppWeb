import React from "react";
import PropTypes from "prop-types";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { InputAdornment } from "@mui/material";
import TextView from "@/components/UI/TextView/TextView";

const TriggerPriceField = ({ quantityFieldHook }: { quantityFieldHook: any }) => {
  const { triggerPrice, triggerPriceError, handleTriggerPriceChange, handleLastPrice } = quantityFieldHook;
  return (
    <>
      <BasicTextFields
        id="trigger-price"
        label={"Trigger Price"}
        value={triggerPrice}
        type="number"
        placeholder={"0.00"}
        onChange={handleTriggerPriceChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <TextView text={"Last"} onClick={() => handleLastPrice("TRIGGER")} component="p" style={{ cursor: "pointer" }} variant="Bold_12" />
            </InputAdornment>
          )
        }}
      />
      <TextView text={triggerPriceError} variant="Regular_11" color={"text.error"} />
    </>
  );
};

TriggerPriceField.propTypes = {
  dispatchOrderEvent: PropTypes.func,
  quantityFieldHook: PropTypes.object
};

export default TriggerPriceField;
