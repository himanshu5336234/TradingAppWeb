/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import AppWrapper from "./routes/AppWrapper";
import { internetUpAuxiliary, internetDownAuxiliary, onVisibilityChange } from "./helpers/ApplicationDownAuxiliary";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./assets/Theme/index";
import "./App.css";
import SuperTokensMain from "BL/services/ThirdPartyServices/SuperTokens/SuperTokens";
// import useCheckLowEndDevice from "./frontend-BL/businessHooks/UTILS/useCheckLowEndDevice";
import { useDispatch } from "react-redux";
import { getTradableCoins } from "./frontend-BL/redux/actions/Futures/GetTradableCoins.ac";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getTradableCoins());

    if (!window.onoffline) {
      window.onoffline = internetDownAuxiliary;
    }
    if (!window.ononline) {
      window.ononline = internetUpAuxiliary;
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (document.visibilityState === "hidden") {
      const intervalID = setInterval(() => window.location.reload(), 1000 * 60 * 15);
      window.localStorage.intervalID = intervalID;
    }
    SuperTokensMain();
    dispatch(getTradableCoins());
    return () => {
      if (window.navigator.onLine) {
        window.onoffline = null;
        window.onerror = null;
        document.removeEventListener("visibilitychange", onVisibilityChange);
      }
      localStorage.removeItem("orderFormData");
    };
  }, []);
  // End of check for internet status UP or Down and javascript code break

  //useCheckLowEndDevice();

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SuperTokensMain />
          <AppWrapper />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
