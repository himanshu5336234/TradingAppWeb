import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";

import PropTypes from "prop-types";
import { SymbolWrapper } from "../../UI/SymbolWrapper/SymbolWrapper";
// MUI
import { Box, Grid } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { noAuthRemoveFavouriteSymbol, noAuthSetFavouriteSymbol, removeFavouriteSymbol, setFavouriteSymbol } from "../../../frontend-BL/redux/actions/User/SetFavouriteSymbol.ac";
import NavigateToTradeScreenWithSelectedSymbol from "@/helpers/NavigateToTradeScreenWithSelectedSymbol";
import { useCheckLoginStatus } from "BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import SideMenuLastPrice from "./SideMenuLastPrice";
import SideMenuPercentage from "./SideMenuPercentage";
import TextView from "../../UI/TextView/TextView";
const SideMenuRow = (props) => {
  const { isLoggedIn } = useCheckLoginStatus();
  const { symbol, index } = props;
  const dispatch = useDispatch();
  const handleChangeSelect = useCallback(
    (symbol) => {
      NavigateToTradeScreenWithSelectedSymbol(symbol);
    },
    [symbol]
  );

  const isFavouriteSymbol = useSelector((state) => state.favouriteSymbols && state.favouriteSymbols.favouriteSymbols && state.favouriteSymbols.favouriteSymbols.includes(symbol));
  const watchlistID = useSelector((state) => state.favouriteSymbols && state.favouriteSymbols.watchlistID);
  const handleFavClick = () => {
    switch (isLoggedIn) {
      case true:
        if (isFavouriteSymbol !== undefined && isFavouriteSymbol) {
          dispatch(removeFavouriteSymbol(symbol, watchlistID));
        } else {
          dispatch(setFavouriteSymbol(symbol, watchlistID));
        }
        break;
      case false:
        if (isFavouriteSymbol !== undefined && isFavouriteSymbol) {
          dispatch(noAuthRemoveFavouriteSymbol(symbol));
        } else {
          dispatch(noAuthSetFavouriteSymbol(symbol));
        }
        break;
    }
  };

  const USDT = "USDT";
  // unnecessary use  memo
  const symbolLogo = useMemo(() => getCurrencyUrl(symbol.replace(USDT, "").toLowerCase()), [symbol]);

  return (
    <Grid id={`search-symbole-${symbol.toUpperCase()}`} height={"35px"} px={1} container gap={0.5} sx={{ alignItems: "center", cursor: "pointer" }}>
      <Grid onClick={handleFavClick} item xs={0.8}>
        {isFavouriteSymbol ? <StarIcon sx={{ height: "20px", color: "text.main" }} /> : <StarBorderIcon sx={{ height: "20px", color: "#F2F2F2" }} />}
      </Grid>

      <Grid onClick={() => handleChangeSelect(symbol)} sx={{ height: "100%" }} xs={11} item alignItems={"center"} justifyContent={"space-between"} container>
        <Grid item xs={5} display={"flex"} alignItems={"center"} gap={1}>
          <>
            <Box
              component={"img"}
              src={symbolLogo}
              alt="symbolLogo"
              sx={{
                height: { sm: 15, xs: 20 },
                width: { sm: 15, xs: 20 },
                borderRadius: "50%",
                backgroundColor: "white"
              }}
            />
            <TextView text={symbol.toUpperCase()} variant={"SemiBold_12"} />
          </>
        </Grid>
        <Grid item xs={3}>
          <SideMenuLastPrice symbol={symbol} />
        </Grid>
        <Grid item xs={3}>
          <Box
            textAlign={"center"}
            sx={{
              borderRadius: "4px",
              backgroundColor: [index % 2 !== 0 ? "background.default" : "background.primary"]
            }}
          >
            <SideMenuPercentage symbol={symbol} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

SideMenuRow.propTypes = {
  symbol: PropTypes.string,
  index: PropTypes.string,
  cb: PropTypes.func,
  sRefSet: PropTypes.func
};

export default memo(SideMenuRow);
