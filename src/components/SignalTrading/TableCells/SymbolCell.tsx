import { Grid, Typography } from "@mui/material";
import React from "react";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";

interface SymbolCellProps {
  symbol: string;
  gridSize: number;
  marginMode: string;
  leverage: number;
}

const SymbolCell: React.FC<SymbolCellProps> = ({ symbol, gridSize, leverage, marginMode }) => {
  return (
    <Grid container item xs={gridSize} alignItems={"center"} gap={2}>
      <img src={getCurrencyUrl(symbol.toUpperCase().replace("USDT", "").toLowerCase())} width={"24px"} />
      <Grid item>
        <Typography variant={"Medium_14"}>
          {symbol}
          {(leverage || marginMode) && (
            <Typography component={"div"} variant={"Medium_14"} color={"text.secondary"}>
              {marginMode}
              {" | "}
              {leverage}
              {"x"}
            </Typography>
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SymbolCell;
