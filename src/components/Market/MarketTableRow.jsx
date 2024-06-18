import React from "react";
import { Grid, Typography, Box, ListItemIcon, Link } from "@mui/material";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo.js";
import {} from "../Home/UserActivities/UserTabs/UserTabs.style";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedSymbol } from "BL/redux/actions/Internal/SetSelectedSymbol.ac";
import { useCheckLoginStatus } from "BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import { SymbolWrapper } from "../UI/SymbolWrapper/SymbolWrapper";
import { noAuthRemoveFavouriteSymbol, noAuthSetFavouriteSymbol, removeFavouriteSymbol, setFavouriteSymbol } from "@/frontend-BL/redux/actions/User/SetFavouriteSymbol.ac";
import TextView from "../UI/TextView/TextView";
import { MarketTableRowValues } from "./MarketTableRowValues";

const MarketTableRow = ({ symbol }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRowClick = () => {
    dispatch(selectedSymbol(tableRow.Symbol));
    navigate("/");
  };
  const { isLoggedIn } = useCheckLoginStatus();

  const isFavouriteSymbol = useSelector((state) => state.favouriteSymbols && state.favouriteSymbols.favouriteSymbols && state.favouriteSymbols.favouriteSymbols.includes(symbol));
  const watchlistID = useSelector((state) => state.favouriteSymbols && state.favouriteSymbols.watchlistID);
  const handleFavClick = (e) => {
    e.stopPropagation();
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

        // code block
        break;
      // code block
    }
  };
  return (
    <Grid
      key={symbol}
      onClick={handleRowClick}
      container
      sx={{
        minHeight: "72px",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "getRowColor(index)",
        "&:hover": {
          cursor: "pointer"
        }
      }}
    >
      <Grid item xs={3}>
        <Box
          sx={{
            gap: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%"
          }}
        >
          <ListItemIcon sx={{ minWidth: "20px" }} onClick={handleFavClick}>
            {isFavouriteSymbol ? <StarIcon sx={{ color: "text.main" }} /> : <StarBorderIcon sx={{ color: "#F2F2F2" }} />}
          </ListItemIcon>
          {/* <Box
            component={"img"}
            onError={(event) => (event.target.style.display = "none")}
            src={getCurrencyUrl(
              tableRow.Symbol.replace("USDT", "").toLowerCase()
            )}
            alt="symbolLogo"
            sx={{
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "white"
            }}
          />

          <Typography variant={"bold_14"}>
            {tableRow.Symbol?.toUpperCase()}
          </Typography> */}
          <SymbolWrapper symbol={symbol} />
        </Box>
      </Grid>
      <MarketTableRowValues symbol={symbol} />
      <Grid item xs={1.5}>
        <Link>
          <Typography variant="Bold_14" color="white">
            Trade Now
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default React.memo(MarketTableRow);
