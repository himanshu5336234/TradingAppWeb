import React from "react";
import { Box } from "@mui/material";
import TextView from "@/components/UI/TextView/TextView";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
interface OrderBookRowProps {
  setDecimalPrecision: Function;
  Max: number;
  rowType: string;
  symbolQuantityPrecision: number;
  symbolPricePrecision: number;
  items: string[];
}
const OrderBookRow = ({ setDecimalPrecision, Max, rowType, symbolQuantityPrecision, symbolPricePrecision, items }: OrderBookRowProps) => {
  const { ChangeInAsset } = useSelector((state: any) => state.ChangeInAsset);
  return (
    <Box
      sx={{
        display: "flex",
        height: "25px",
        // gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative"
      }}
    >
      <TextView
        style={{ flex: 1 }}
        component={"h4"}
        variant="SemiBold_11"
        color={rowType === "bidsSnapShot" ? "text.success" : "text.error"}
        text={setDecimalPrecision(Number(items[0]), symbolPricePrecision)}
      />

      <TextView
        style={{ flex: 1 }}
        component={"h4"}
        textAlign={"center"}
        color={"text.quaternary"}
        variant="Regular_11"
        text={ChangeInAsset ? setDecimalPrecision(items[1], symbolQuantityPrecision) : setDecimalPrecision(items[1] * items[0], symbolPricePrecision)}
      />

      <TextView
        style={{ flex: 1 }}
        component={"h4"}
        textAlign={"end"}
        variant="Regular_11"
        color={"text.quaternary"}
        text={ChangeInAsset ? setDecimalPrecision(items[2], symbolQuantityPrecision) : setDecimalPrecision(items[2] * items[0], symbolPricePrecision)}
      />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "2px",
          right: "2px"
        }}
      >
        <Box
          sx={{
            float: "right",
            transitionProperty: "all",
            transitionDuration: ".3s",
            transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
            width: `${(items[2] / Max) * 100}%`,
            height: "100%",
            background:
              rowType === "bidsSnapShot"
                ? "linear-gradient(90deg, rgba(41, 181, 126, 0.18) -20%, rgba(41, 181, 126, 0) 113.33%)"
                : "linear-gradient(90deg, rgba(255, 101, 84, 0.18) -20%, rgba(255, 101, 84, 0) 113.33%)"
          }}
        ></Box>
      </Box>
    </Box>
  );
};
OrderBookRow.propTypes = {
  setDecimalPrecision: PropTypes.func,
  Max: PropTypes.number,
  rowType: PropTypes.string,
  symbolQuantityPrecision: PropTypes.number,
  symbolPricePrecision: PropTypes.number,
  items: PropTypes.any
};
export default OrderBookRow;
