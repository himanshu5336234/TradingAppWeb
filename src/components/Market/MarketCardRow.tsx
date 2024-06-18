import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedSymbol } from "@/frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
import { useSelector } from "react-redux";
import { SymbolWrapper } from "../UI/SymbolWrapper/SymbolWrapper";
import { Chip } from "../UI/Chip/Chip";
import { MarketCardContainer, RowWrapper } from "./MarketStyles";
interface MarketCardRowProps {
  primaryText: string;
  type: string;
}

const MarketCardRow: React.FC<MarketCardRowProps> = ({ primaryText, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  const activeSymbolsData = useSelector((state: any) => state.activeSymbolData);
  const { activeSymbols } = activeSymbolsData;

  useEffect(() => {
    if (activeSymbols.length !== 0) {
      const global_coins: string[] = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "XRPUSDT", "DOGEUSDT"];
      let global_coin_data = global_coins.map((sym) => activeSymbols.find((fsm: any) => fsm.symbol === sym));
      global_coin_data = global_coin_data.map((coinData) => ({
        Symbol: coinData?.symbol,
        id: coinData?.symbol,
        change: coinData?.percentage,
        value: coinData?.vol
      }));
      const copiedActiveSymbols = JSON.parse(JSON.stringify(activeSymbols));
      const sortedActiveSymbols = copiedActiveSymbols.sort((a: any, b: any) => a.percentage - b.percentage);
      switch (type) {
        case "globalMarket":
          setRows(global_coin_data);
          break;
        case "Losers":
          setRows(
            sortedActiveSymbols.slice(0, 5).map((coinData: any) => ({
              Symbol: coinData?.symbol,
              id: coinData?.symbol,
              change: coinData?.percentage,
              value: coinData?.vol
            }))
          );
          break;
        case "Gainers":
          setRows(
            sortedActiveSymbols
              .reverse()
              .slice(0, 5)
              .map((coinData: any) => ({
                Symbol: coinData?.symbol,
                id: coinData?.symbol,
                change: coinData?.percentage,
                value: coinData?.vol
              }))
          );
          break;
        default:
          break;
      }
    }
  }, [activeSymbols]);

  return (
    <>
      {rows.map((item: any) => (
        <Box
          sx={MarketCardContainer}
          onClick={() => {
            dispatch(selectedSymbol(item.Symbol.toUpperCase()));
            navigate("/");
          }}
        >
          <Box sx={RowWrapper}>
            <SymbolWrapper symbol={item.Symbol} />
            <Chip variant={"number"} value={item.change} />
          </Box>
          <Box sx={RowWrapper}>
            <Typography variant="labelSmall" component={"p"} textAlign={"start"} color="neutral.grey7">
              {primaryText}
            </Typography>
            <Typography variant="labelSmall" component={"p"} textAlign={"end"} color="neutral.grey7">
              {item.value}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default React.memo(MarketCardRow);
