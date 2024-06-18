import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { sxColorUtility } from "@/helpers";
import { useSelector } from "react-redux";
import { Typography } from "./sidemenuobject";
import TextView from "../../UI/TextView/TextView";

function SideMenuPercentage({ symbol }) {
  const activeSymbolData = useSelector((state) => state.activeSymbolData.activeSymbols.find((s) => s.symbol === symbol));
  const getSign = useCallback((val) => (Math.sign(val) === 1 ? "+" : ""), []);
  return (
    <TextView
      text={`${getSign(Number(activeSymbolData?.percentage))}${activeSymbolData?.percentage} %`}
      style={{ textAlign: "center" }}
      variant={"Medium_12"}
      color={sxColorUtility(Number(activeSymbolData?.percentage), {})}
    />
  );
}

SideMenuPercentage.propTypes = {
  symbol: PropTypes?.string
};

export default SideMenuPercentage;
