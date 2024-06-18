import React, { memo } from "react";
import { useSelector } from "react-redux";
import TextView from "@/components/UI/TextView/TextView";
import PropTypes from "prop-types";
interface MarkPriceProps {
  symbolPricePrecision: number;
  setDecimalPrecision: (value: string, precision: number) => string;
  variant: string;
  symbol: string;
  styles: object;
}

const MarkPrice = ({ symbolPricePrecision, setDecimalPrecision, variant, symbol, styles }: MarkPriceProps) => {
  const markPriceSnapshot = useSelector((state: { BinanceStreamData: { binanceData: any } }) => state.BinanceStreamData.binanceData?.[`${symbol?.toLowerCase()}@markPrice@1s`]);
  return <TextView id={"market-seg-mark-price"} variant={variant} component="p" style={{ ...styles }} text={String(setDecimalPrecision(markPriceSnapshot, symbolPricePrecision))} />;
};

MarkPrice.propTypes = {
  setDecimalPrecision: PropTypes.func,
  symbol: PropTypes.string,
  contextListener: PropTypes.string,
  symbolPricePrecision: PropTypes.number,
  variant: PropTypes.string,
  styles: PropTypes.object
};

export default memo(MarkPrice);
