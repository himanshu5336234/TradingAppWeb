import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { SymbolPrecisionHelper } from "@/helpers";
import TextView from "../../UI/TextView/TextView";
function SideMenuLastPrice({ symbol }) {
  const { setDecimalPrecision, symbolPricePrecision } = SymbolPrecisionHelper({
    symbol
  });
  const activeSymbolData = useSelector((state) => state.activeSymbolData.activeSymbols.find((s) => s.symbol.toLowerCase() === symbol.toLowerCase()));
  return <TextView variant={"SemiBold_12"} text={` ${setDecimalPrecision(activeSymbolData.lp, symbolPricePrecision)}`} />;
}

SideMenuLastPrice.propTypes = {
  symbol: PropTypes?.string
};

export default SideMenuLastPrice;
