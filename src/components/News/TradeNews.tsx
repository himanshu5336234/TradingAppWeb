import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { newContainer, newContainerHeading, tradeCards } from "./TradeNews.Style";
import Loader from "@/components/UI/Loader";

import { LinkButton } from "../UI/LinkButton";
import TradeCards from "./TradeCards";
import TradeNewsCardRow from "./TradeNewsCardRow";
import { TradeNewsMarketData } from "./TradeNews.type";

import { getTradableCoins } from "@/frontend-BL/redux/actions/Futures/GetTradableCoins.ac";
import { FETCH_MARKET_NEWS } from "@/frontend-BL/redux/actions/Market/getMarketData.ac";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextView from "../UI/TextView/TextView";

const TradeNews = () => {
  const [topic, setTopic] = useState("all");
  const [marketNewsData, setMarketNewsData] = useState([]);

  const [loader, setloader] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const newsTopic = topic === "all" ? "" : topic;
    dispatch(FETCH_MARKET_NEWS({ topic: newsTopic, setloader })).then((res: { data: React.SetStateAction<never[]> }) => {
      setMarketNewsData(res.data);
    });
  }, [topic]);

  const [cardData, setCardData] = useState({
    topFiveGainers: [],
    topFiveLosers: []
  });

  const activeSymbolsData = useSelector((state: any) => state.activeSymbolData);
  const { activeSymbols } = activeSymbolsData;

  useEffect(() => {
    getTradableCoins();
  }, []);

  useEffect(() => {
    if (activeSymbols.length !== 0) {
      const copiedActiveSymbols = JSON.parse(JSON.stringify(activeSymbols));
      const sortedActiveSymbols = copiedActiveSymbols.sort((a: any, b: any) => a.percentage - b.percentage);
      setCardData({
        topFiveLosers: sortedActiveSymbols.slice(0, 5).map((coinData: any) => ({
          Symbol: coinData?.symbol,
          id: coinData?.symbol,
          change: coinData?.percentage,
          value: coinData?.vol
        })),
        topFiveGainers: sortedActiveSymbols
          .reverse()
          .slice(0, 5)
          .map((coinData: any) => ({
            Symbol: coinData?.symbol,
            id: coinData?.symbol,
            change: coinData?.percentage,
            value: coinData?.vol
          }))
      });
    }
  }, [activeSymbols]);

  return (
    <Grid container height={"100%"} gap={1} p={2} justifyContent={"space-between"}>
      <Grid height={"100%"} item xs={4}>
        <Box sx={tradeCards}>
          <TradeCards data={cardData.topFiveGainers} label={"Top 5 Gainers"} />
          <TradeCards data={cardData.topFiveLosers} label={"Top 5 Dippers"} />
        </Box>
      </Grid>
      <Grid height={"100%"} xs={7.8}>
        <Box sx={newContainer}>
          <TextView variant="Bold_16" text={"            AROUND THE CRYPTO WORLD"} style={newContainerHeading} />

          {loader && (
            <Box sx={{ mt: 5, height: "calc(100% - 120px)", overflow: "auto" }}>
              {marketNewsData &&
                (() => {
                  const newsItems = [];
                  for (let i = 0; i < 10 && i < marketNewsData.length; i++) {
                    const el: TradeNewsMarketData = marketNewsData[i];
                    newsItems.push(<TradeNewsCardRow key={el?.title} {...el} />);
                  }
                  return newsItems;
                })()}
            </Box>
          )}
          {!loader && (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Loader />
            </Box>
          )}

          <LinkButton isDisabled={false} color="neutral.black" onClick={() => navigate("/market/all-news")} label={"View All News"} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default React.memo(TradeNews);
