import React, { memo, useCallback, useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import useHandleBinanceSocketSubs from "@/frontend-BL/businessHooks/BINANCE_WORKER/useHandleBinanceSocketSubs";
import OrderFormWrapper from "@/components/Home/OrderForm/OrderFormWrapper";
import MarketSegment from "@/components/Home/TradeSymbolData/MarketSegment/MarketSegment";
import OrderBook from "@/components/Home/TradeSymbolData/OrderBookAndDepthBookChartContainer/OrderBook/OrderBook";
import TradeSymbolData from "@/components/Home/TradeSymbolData/TradeSymbolData";
import { UserActivities } from "@/components/Home/UserActivities";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);
function TradeScreen() {
  useHandleBinanceSocketSubs({ tradeScreen: true });
  const { Layout, Components } = useSelector((state: any) => state.Layout);

  const [breakpoint, setBreakpoint] = useState("lg");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "RESUME_RENDERING" });
  }, []);

  const handleBreakPointChange = (breakpoint: React.SetStateAction<string>) => setBreakpoint(breakpoint);
  const handleLayoutChange = (newLayout: React.SetStateAction<{}>) => {
    (window as any).localStorage.setItem("layout", JSON.stringify({ ...Layout, [breakpoint]: newLayout }));
    // dispatch({ type: "CHANGE_LAYOUT", payload: { Layout: { ...Layout, [breakpoint]: newLayout } } });
  };
  const showComponent = (item: any) => {
    switch (item) {
      case "marketSegment":
        return <MarketSegment />;
      case "orderForm":
        return <OrderFormWrapper />;
      case "chart":
        return <TradeSymbolData />;
      case "orderBook":
        return <OrderBook />;
      case "userActivities":
        return <UserActivities />;

      default:
        break;
    }
  };
  const removeChartData = (payload: string) => {
    const newlayout = JSON.parse((window as any).localStorage.getItem("layout"));
    // Loop through each layout size (lg, md, sm, xs)
    for (const size in newlayout) {
      // Filter out chart data from the current size layout
      newlayout[size] = newlayout[size].filter((item: { i: string }) => item.i !== payload);
    }

    return newlayout;
  };
  const removeComponentFromLayout = (compomentName: string) => {
    let payload = Components.filter((item: string) => item !== compomentName);
    dispatch({ type: "CHANGE_COMPONENT", payload });
    const modifiedLayouts = removeChartData(compomentName);
    dispatch({ type: "CHANGE_LAYOUT", payload: { Layout: modifiedLayouts } });
  };
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const showOrderForm = JSON.parse(localStorage.getItem("showOrderForm"));
  //   const referralDone = localStorage.getItem("isReferralDone");
  //   if (
  //     referralDone !== null ||
  //     referralDone === true ||
  //     referralDone === "true"
  //   ) {
  //     navigate("/referral");
  //   }
  //   if (!showOrderForm) {
  //     setShowOrderForm({ expand: false, side: "BUY" });
  //   }
  // }, []);
  const showLayoutComponent = useCallback(() => {
    return Components.map((item: any) => (
      <Box key={item} bgcolor={"background.primary"} className={`grid-item`}>
        {item !== "marketSegment" && (
          <Box sx={{ position: "absolute", display: "flex", height: "12px", right: 0, left: 9 }}>
            <Box sx={{ width: "98%" }} className="grid-item__title" />
            <CancelIcon className="grid-item_close" onClick={() => removeComponentFromLayout(item)} sx={{ color: "#44444D", position: "absolute", right: 0, fontSize: "12px", cursor: "pointer" }} />
          </Box>
        )}

        <Box className="grid-item__graph">{showComponent(item)}</Box>
      </Box>
    ));
  }, [Components]);
  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={Layout}
        onBreakpointChange={handleBreakPointChange}
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={true}
        autoSize
        rowHeight={10}
        isRearrangeable={true}
        draggableHandle=".grid-item__title"
        margin={[1, 2.1]}
        breakpoints={{ lg: 1440, md: 990, sm: 650, xs: 575 }}
        cols={{ lg: 14 * 10, md: 12 * 10, sm: 10 * 10, xs: 6 * 10 }}
      >
        {showLayoutComponent()}
      </ResponsiveGridLayout>
    </>
  );
}

export default memo(TradeScreen);
