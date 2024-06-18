import React from "react";
import PropTypes from "prop-types";
import { useLiquidationPrice } from "./useLiquidationPrice";

const LiquidationPrice = ({ symbol }: { symbol: string }) => {
  const { liquidationPrice } = useLiquidationPrice({ symbol });
  return <>{liquidationPrice}</>;
};
LiquidationPrice.propTypes = {
  symbol: PropTypes.string,
  setDecimalPrecision: PropTypes.func,
  symbolPricePrecision: PropTypes.number
};
export default LiquidationPrice;
