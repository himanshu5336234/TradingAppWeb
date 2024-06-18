import React, { Dispatch, useEffect, useState, useRef } from "react";
import { WatchListRowRevamped } from "./WatchListRowRevamped";
import { useSelector, useDispatch } from "react-redux";
import AddToWatchlist from "@/assets/icons/SideBar/AddToWatchlist.svg";
import RightArrow from "@/assets/icons/SideBar/Arrow_Right.svg";
import LeftArrow from "@/assets/icons/SideBar/Arrow_Left.svg";
import { ToggleButton } from "@mui/material";
import { OpenDrawer } from "@/frontend-BL/redux/actions/Internal/SideMenu.ac";
import { removeFavouriteSymbol, noAuthRemoveFavouriteSymbol } from "@/frontend-BL/redux/actions/User/SetFavouriteSymbol.ac";
import { useCheckLoginStatus } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
// import { getUserWatchList } from "@/frontend-BL/redux/actions/User/GetWatchList.ac";

import { Box } from "@mui/material";

import { SET_FAVOURITE_SYMBOLS_IN_VIEWPORT } from "@/frontend-BL/redux/constants/Constants";

export const WatchListRevamped = () => {
  const favouriteSymbols = useSelector((state: any) => state.favouriteSymbols.favouriteSymbols);
  const watchlistID = useSelector((state: any) => state.favouriteSymbols.watchlistID);

  const [favouriteSymbolsInViewPort, setFavouriteSymbolsInViewPort] = useState([]);

  const [sliceIndex, setSliceIndex] = useState(0);
  const dispatch: Dispatch<any> = useDispatch();
  const [maxCount, setMaxCount] = useState(4);

  const { isLoggedIn } = useCheckLoginStatus();

  const handleFavClick = (e: React.MouseEvent<HTMLElement>, symbol: string) => {
    isLoggedIn ? dispatch(removeFavouriteSymbol(symbol, watchlistID)) : dispatch(noAuthRemoveFavouriteSymbol(symbol));
    e.stopPropagation();
    if (favouriteSymbolsInViewPort.length === 1 && sliceIndex > 0) {
      setSliceIndex((sliceIndex) => Math.max(sliceIndex - maxCount, 0));
    }
  };

  const favRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      // Update the width when the container size changes
      if (favRef.current) {
        const c = Math.floor(sliceIndex === 0 ? (favRef?.current?.offsetWidth - 30) / 220 : favRef?.current?.offsetWidth / 220);
        setMaxCount(c);
      }
    };

    // Attach the event listener
    if (favRef.current) {
      window.removeEventListener("resize", handleResize);
    }
    window.addEventListener("resize", handleResize);

    // Initial width calculation
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [favRef.current]);

  useEffect(() => {
    const favouriteSymbolsAfterSlice = favouriteSymbols?.slice(sliceIndex, sliceIndex + maxCount);

    const symbolParamsFromStream = favouriteSymbolsAfterSlice?.map((item: string) => {
      return `${item.toLowerCase()}@ticker`;
    });
    dispatch({
      type: SET_FAVOURITE_SYMBOLS_IN_VIEWPORT,
      payload: symbolParamsFromStream
    });
    setFavouriteSymbolsInViewPort(favouriteSymbolsAfterSlice);
  }, [favouriteSymbols, sliceIndex, maxCount]);

  const ActionChipStyles = {
    borderRadius: "2px",
    padding: "6px ",
    mx: 0.2,
    border: "none",
    backgroundColor: "#0E0E0F"
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {sliceIndex > 1 && (
        <ToggleButton sx={ActionChipStyles} onClick={() => setSliceIndex((sliceIndex) => Math.max(0, sliceIndex - maxCount))}>
          <img width="10px" src={LeftArrow} alt="Extend Less" />
        </ToggleButton>
      )}
      {favouriteSymbolsInViewPort && favouriteSymbolsInViewPort.length > 0 && (
        <Box sx={{ width: "calc(100% - 30px)", height: "30px", overflow: "hidden", display: "flex" }} ref={favRef}>
          {favouriteSymbolsInViewPort.map((s: string) => (
            <WatchListRowRevamped handleFavClick={handleFavClick} watchlistID={watchlistID} key={s} symbol={s} />
          ))}
        </Box>
      )}
      {favouriteSymbols?.length > maxCount + sliceIndex && (
        <ToggleButton variant="chip" sx={ActionChipStyles} onClick={() => setSliceIndex((sliceIndex) => sliceIndex + maxCount)}>
          <img width="10px" src={RightArrow} alt="Extend More" />
        </ToggleButton>
      )}

      <ToggleButton variant="chip" sx={ActionChipStyles} onClick={() => dispatch(OpenDrawer())}>
        <img width="10px" src={AddToWatchlist} alt="Add to Watchlist" />
      </ToggleButton>
    </Box>
  );
};

export default WatchListRevamped;
