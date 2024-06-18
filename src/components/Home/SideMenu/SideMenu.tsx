/* eslint-disable no-dupe-keys */
/* eslint-disable multiline-ternary */
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// actions
import { selectedSymbol } from "../../../frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
// mui components
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
import { Box } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// components and helper components
import SetSelectedSymbolHelper from "@/helpers/SetSelectedSymbolHelper";
import SideMenuTab from "./sideMenuTab";
import BGTexture from "@/assets/icons/BGTexture.svg";
import { sideMenuBox, drawerStyleSx, drawer } from "./sidemenuobject";
import { MENU_CONSTANTS } from "./style";
import { CloseDrawer, OpenDrawer } from "BL/redux/actions/Internal/SideMenu.ac";
import SideMenuSearch from "./SideMenuSearch";
import SidemenuFilters from "./SidemenuFilters";
import SideMenuALL from "./SideMenuALL";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";

const SideMenu = () => {
  const [selectedCoin, setSelectedCoin] = useState(SetSelectedSymbolHelper());
  const [tabText, setTabText] = useState("ALL");
  const [SearchSymbol, setSearchSymbol] = useState("");
  const [TabsFilter, setTabsFilter] = useState("");
  const dispatch = useDispatch<any>();
  const symbolLogo = useMemo(() => getCurrencyUrl(selectedCoin.replace("USDT", "").toLowerCase()), [selectedCoin]);
  const selectedSymbolFromReducer = useSelector((state: any) => state.selectSymbol && state.selectSymbol.selectedSymbol);
  const drawerState = useSelector((state: any) => state.DrawerState.DrawerState);
  useEffect(() => {
    setSelectedCoin(selectedSymbolFromReducer.toUpperCase());
  }, [selectedSymbolFromReducer]);
  useEffect(() => {
    dispatch(selectedSymbol(selectedCoin));
  }, []);

  const openDrawer = useCallback(() => {
    dispatch(OpenDrawer());
  }, [drawerState]);

  const SETSEARCHSYMBOL = useCallback(
    (payload: React.SetStateAction<string>) => {
      setTabsFilter("symbol");
      setSearchSymbol(payload);
    },
    [SearchSymbol]
  );

  const closeDrawer = useCallback(() => {
    setTabsFilter("");
    dispatch(CloseDrawer());
  }, [drawerState]);

  const handleTabsChange = useCallback(
    (event: any, newValue: React.SetStateAction<string> | null) => {
      if (newValue !== null) {
        setTabText(newValue);
      }
    },
    [tabText]
  );

  const handleSort = useCallback((value: React.SetStateAction<string>) => {
    setTabsFilter(value);
  }, []);

  const SideMenuContainer = () => {
    return (
      <>
        <Box sx={[sideMenuBox]}>
          <Box sx={{ backgroundImage: `url(${BGTexture})`, p: 2 }}>
            {/* <Typography id="back-button" onClick={closeDrawer} sx={{ fontSize: "32px", cursor: "pointer" }} component={"p"}>
              &#8592;
            </Typography> */}

            <Typography component="h1" variant={"Medium_22"}>
              {MENU_CONSTANTS.SELECT_MARKET}
            </Typography>
          </Box>
          <Box px={2}>
            <SideMenuSearch handleSort={handleSort} SETSEARCHSYMBOL={SETSEARCHSYMBOL} />

            <SideMenuTab tabText={tabText} handleTabsChange={handleTabsChange} />
            <SidemenuFilters handleSort={handleSort} />
          </Box>

          <Box sx={{ height: "calc(100% - 240px)", pb: 1, overflow: "auto" }}>
            <SideMenuALL tabText={tabText} closeDrawer={closeDrawer} selectedCoin={selectedCoin} SearchSymbol={SearchSymbol} TabsFilter={TabsFilter} />
          </Box>
        </Box>
      </>
    );
  };

  const renderDrawer = useMemo(
    () => (
      <Drawer BackdropProps={{ style: drawer }} transitionDuration={100} sx={drawerStyleSx} anchor={"left"} open={drawerState} onClose={closeDrawer}>
        {SideMenuContainer()}
      </Drawer>
    ),
    [drawerState, tabText, TabsFilter, SearchSymbol]
  );

  const SideMenuInfo = useMemo(
    () => (
      <React.Fragment>
        <Box
          id={"open-side-menu-btn"}
          sx={{
            display: "flex",

            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 1,
            cursor: "pointer",
            height: "100%"
          }}
          onClick={() => openDrawer()}
        >
          <Box className="productTour__step1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                display: "flex",

                alignItems: "center",
                justifyContent: "center",
                height: { sm: 28, xs: 20 },
                width: { sm: 28, xs: 20 }
              }}
            >
              <Box
                component={"img"}
                src={symbolLogo}
                alt="symbolLogo"
                sx={{
                  height: { sm: 28, xs: 20 },
                  width: { sm: 28, xs: 20 },
                  borderRadius: "50%",
                  backgroundColor: "white"
                }}
              />
            </Box>
            <Box textAlign={"left"}>
              <Typography component={"p"} variant="bold_16">
                {selectedCoin}
              </Typography>
              <Typography color={"text.regular"} component={"p"} variant="Medium_11">
                {"Perpetual"}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ pl: 0.5 }}>
            <ExpandMoreIcon sx={{ width: { sm: 24, xs: 20 }, height: { sm: 24, xs: 20 } }} />
          </Box>
        </Box>

        {renderDrawer}
      </React.Fragment>
    ),
    [selectedCoin, renderDrawer]
  );

  return SideMenuInfo;
};

export default memo(SideMenu);
