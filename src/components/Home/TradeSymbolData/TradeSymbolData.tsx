import React, { useState, SyntheticEvent } from "react";
import { Box, Tab, TabProps, Tabs, useMediaQuery } from "@mui/material";
import BidAskRatio from "./OrderBookAndDepthBookChartContainer/OrderBook/BidAskRatio/BidAskRatio";
import { styled } from "@mui/material/styles";
import TradingViewChart from "./TradingViewChart/TradingViewChartWrapper";
import TradeNews from "../../News/TradeNews";
import MultiChartLayout from "./MultiChartLayout/MultiChartLayout";
import DepthBookChart from "./OrderBookAndDepthBookChartContainer/DepthBookChart/DepthBookChart";
const TabPrimary = styled(Tab)<TabProps>(({ theme }) => ({
  padding: "8px 16px",
  textTransform: "none",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  color: "text.tertiary",
  fontSize: "12px",
  minHeight: "32px",
  minWidth: "30px",
  fontFamily: "Neurial-Medium",
  letterSpacing: "0.2px",
  opacity: "unset",

  "&:not(Mui-selected)": {
    color: theme.palette.neutral.grey7
  },
  "&.Mui-selected": {
    color: theme.palette.neutral.black
  }
}));

const TradeSymbolData: React.FC = () => {
  const isLargeScreen = useMediaQuery("(min-width:768px)");
  const [tradeSymbolTabValue, setTradeSymbolTabValue] = useState<string>("chart");
  const tradeSymbolTabs = [
    { id: "1", value: "chart", label: "Chart" },
    { id: "2", value: "depth", label: "Depth" },
    { id: "3", value: "news", label: "News" },
    { id: "4", value: "Multi", label: "Advance" }
  ];

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTradeSymbolTabValue(newValue);
  };

  const renderTabsContent = () => {
    if (tradeSymbolTabValue === "chart") {
      return <TradingViewChart />;
    } else if (tradeSymbolTabValue === "depth") {
      return <DepthBookChart />;
    } else if (tradeSymbolTabValue === "Multi") {
      return <MultiChartLayout />;
    } else {
      return <TradeNews />;
    }
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          height: "32px",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Tabs
          sx={{
            minHeight: "32px"
          }}
          value={tradeSymbolTabValue}
          onChange={handleChange}
          id="tradeSymbolTabs"
        >
          {tradeSymbolTabs.map((data) => (
            <TabPrimary id={data.value} value={data.value} label={data.label} key={data.id} />
          ))}
        </Tabs>
        <BidAskRatio />
      </Box>

      <Box
        sx={{
          p: 0.5,
          height: `calc(100% - 32px)`
        }}
      >
        {renderTabsContent()}
      </Box>

      {/* {!isLargeScreen && (
        <Box
          sx={{
            backgroundColor: "background.primary",
            height: [tradeSymbolTabValue === "news" ? "fit-content" : "100%"]
          }}
        >
          {renderTabsContent()}
        </Box>
      )} */}
    </Box>
  );
};

export default TradeSymbolData;
