import { Box, Typography } from "@mui/material";
import React from "react";
import { tradeCardGainPercent, tradeCardRowContainer, tradeCardRowSymbole, tradeCardSymbolePrice, tradeRowValue } from "./TradeNews.Style";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo.js";
import { useDispatch } from "react-redux";
import { selectedSymbol } from "@/frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
import { TradeCardData } from "./TradeNews.type";

const TradeCardRow = ({ Symbol, change, value }: TradeCardData) => {
  const dispatch = useDispatch();
  return (
    <Box sx={tradeCardRowContainer}>
      <Box
        sx={tradeCardSymbolePrice}
        onClick={() => {
          dispatch(selectedSymbol(Symbol?.toUpperCase()));
          // navigate("/");
        }}
      >
        <Box sx={tradeCardRowSymbole}>
          <Box
            component={"img"}
            src={getCurrencyUrl(Symbol.replace("USDT", "").toLowerCase())}
            alt="symbolLogo"
            sx={{
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "white"
            }}
          />
          {/* <img width={"28px"} height={"28px"} src={getCurrencyUrl(Symbol?.replace("USDT", "")?.toLowerCase())} alt={Symbol} style={{ objectFit: "cover" }} /> */}
          <Typography color={"neutral.black"} variant="bold_12">
            {Symbol?.toUpperCase()}
          </Typography>
        </Box>
        <Box sx={tradeCardGainPercent}>
          <Typography pt={"2px"} color={parseFloat(change) >= 0 ? "text.success" : "text.error"} variant="labelMedium">
            {parseFloat(change) >= 0 ? "+" : ""}
            {change}
            {"%"}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", color: "text.regular" }}>
        <Typography textAlign={"center"} variant="bold_10">
          {"Price(USDT)"}
        </Typography>
        <Typography textAlign={"center"} variant="bold_10">
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(TradeCardRow);
