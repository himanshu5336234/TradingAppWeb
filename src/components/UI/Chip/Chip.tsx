import React from "react";
import { Typography } from "@mui/material";
// import PropTypes from "prop-types";
import { variantNumber, variantSuccess, variantError } from "./ChipStyles";
interface ChipProps {
  value: string;
  variant: string;
}
// interface ReturnChipProps {
//   variant: string;
// }
export const Chip: React.FC<ChipProps> = ({ value, variant }) => {
  const ReturnChipBasedOnVariant = (variant: string) => {
    if (variant === "number") {
      return (
        <Typography variant="labelLarge" component={"p"} textAlign={"end"} sx={variantNumber} color={parseFloat(value) >= 0 ? "text.success" : "text.error"}>
          {parseFloat(value) >= 0 ? "+" : ""}
          {value}
          {"%"}
        </Typography>
      );
    } else if (variant === "success") {
      return (
        <Typography variant="Medium_12" component={"h6"} sx={variantSuccess}>
          {value}
        </Typography>
      );
    } else if (variant === "error") {
      return (
        <Typography variant="Medium_12" component={"h6"} sx={variantError}>
          {value}
        </Typography>
      );
    } else if (variant === "default") {
      return (
        <Typography
          component={"p"}
          color={"text.regular"}
          variant="Medium_12"
          borderRadius={"4px"}
          textTransform={"capitalize"}
          p={0.5}
          px={1}
          backgroundColor="background.secondary"
          id="orderHistory-Status"
        >
          {value}
        </Typography>
      );
    }
  };
  return <>{ReturnChipBasedOnVariant(variant)}</>;
};
