import React from "react";
import TextView from "@/components/UI/TextView/TextView";
import { useSelector } from "react-redux";
const PercentageChange = ({ symbol }: { symbol: string }) => {
  const COLOR_INDICATOR = {
    green: "#28b67e",
    red: "#f46251"
  };
  const percentage = useSelector((state: any) => state.BinanceStreamData?.binanceData[symbol.toLocaleLowerCase() + "@per"]);
  return (
    <TextView
      style={{
        color: percentage > 0 ? COLOR_INDICATOR.green : COLOR_INDICATOR.red,
        marginRight: "10px",
        marginLeft: "10px"
      }}
      variant="Medium_10"
      text={parseFloat(percentage)?.toFixed(3) + "%"}
    ></TextView>
  );
};

export default PercentageChange;
