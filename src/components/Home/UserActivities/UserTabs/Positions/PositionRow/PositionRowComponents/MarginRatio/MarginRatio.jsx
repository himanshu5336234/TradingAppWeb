import React from "react";
import PropTypes from "prop-types";
import useMarginRatio from "./useMarginRatio";
import TextView from "@/components/UI/TextView/TextView";

function MarginRatio({ symbol }) {
  const { marginRatio } = useMarginRatio({
    symbol
  });

  function fallbackForNaN(number) {
    if (isNaN(number)) {
      return "--";
    }
    return number + "%";
  }

  return (
    <TextView
      id="position-marginRatio"
      variant="medium_12_500"
      component={"p"}
      style={{
        color: marginRatio > 60 ? "text.error" : marginRatio < 40 ? "text.success" : "#ec9719"
      }}
      text={fallbackForNaN(marginRatio)}
    />
  );
}

MarginRatio.propTypes = {
  symbol: PropTypes.string,
  setDecimalPrecision: PropTypes.func,
  symbolPricePrecision: PropTypes.number
};
export default MarginRatio;
