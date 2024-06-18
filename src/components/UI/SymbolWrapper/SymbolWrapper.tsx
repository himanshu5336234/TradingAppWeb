import React from "react";
import { Box, Typography } from "@mui/material";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo.js";
// import PropTypes from "prop-types";
import { WrapperCard, ImageStyles, SymbolStyles } from "./SymbolWrapperStyles";
interface SymbolWrapperProps {
  symbol: string;
  symbolText?: string;
}

export const SymbolWrapper: React.FC<SymbolWrapperProps> = ({ symbol, symbolText }) => {
  return (
    <Box sx={WrapperCard}>
      {<Box component={"img"} onError={(event) => (event.target.style.display = "none")} src={getCurrencyUrl(symbol.replace("USDT", "").toLowerCase())} alt="symbolLogo" sx={ImageStyles} />}
      <Box sx={SymbolStyles}>
        <Typography variant={"bold_14"} color={"neutral.black"} component={"p"}>
          {symbol?.toUpperCase()}
        </Typography>
        {symbolText && (
          <Typography color={"text.regular"} style={{ textTransform: "capitalize" }} component={"span"} variant="Medium_12">
            {symbolText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
