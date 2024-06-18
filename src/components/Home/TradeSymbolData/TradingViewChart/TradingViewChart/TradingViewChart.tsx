import { useCheckLoginStatus } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import Loader from "@/components/UI/Loader";
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import dataFeed from "./dataFeed";
import { widgetContainer } from "./helpers";
import save_load_adapter from "./saveLoadAdapter";
import { widget } from "/public/charting_library";
export const TradingViewChart = ({ ID, res }: { ID: number; res: string }) => {
  const { isLoggedIn } = useCheckLoginStatus();
  const { opened } = useSelector((state: any) => state.wsConnection.binance);
  const selectedSymbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    const resolution = JSON.parse((window as any).localStorage.getItem("user_pc_resolution_chart_density"))?.resolution ?? 60;
    const TradingViewWidget = new widget({
      ...widgetContainer,
      container: chartContainerRef.current,
      interval: res ?? resolution,
      datafeed: dataFeed,
      symbol: selectedSymbol || "BTCUSDT",
      save_load_adapter: isLoggedIn && save_load_adapter,
      client_id: "density.exchange" + { ID },
      header_widget_buttons_mode: "fullscreen",
      LegendMode: "horizontal"
    });
    if (opened) {
      TradingViewWidget.onChartReady(() => {
        TradingViewWidget.subscribe("onAutoSaveNeeded", () => {
          TradingViewWidget.saveChartToServer(
            () => console.log("Saved"),
            () => console.log("failed to save"),
            {
              defaultChartName: "unnamed"
            }
          );
        });
        TradingViewWidget.chart();
      });
    } else {
      TradingViewWidget.remove();
    }

    return () => {
      TradingViewWidget.remove();
    };
  }, [selectedSymbol, ID, opened, isLoggedIn, res]);

  return (
    <>
      {!opened && (
        <Box bgcolor={"background.primary"} mx={"1px"} sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Loader customObject={{ width: "30px", margin: "auto" }} circular={true} />
        </Box>
      )}
      <div style={{ height: "100%" }} ref={chartContainerRef}></div>
    </>
  );
};
