import React, { useState, useEffect, useRef } from "react";
import {
  Box
  // InputAdornment
} from "@mui/material";
import PropTypes from "prop-types";
import TableNoRowsOverlay from "../Setting/Rewards/TableNoRowsOverlay";
import ToggleGroup from "../UI/ToggleGroup/ToggleGroup";
import NewsCard from "./NewsCard";
import { useNavigate } from "react-router-dom";
import CustomButton from "../UI/CustomButton/CustomButton";
import TextView from "../UI/TextView/TextView";

import { FETCH_MARKET_NEWS } from "@/frontend-BL/redux/actions/Market/getMarketData.ac";

import { useDispatch } from "react-redux";

const NewsBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [marketNewsData, setMarketNewsData] = useState([]);
  const [topic, setTopic] = useState("all");
  const [alignment, setAlignment] = useState("trending");
  const [marketNewsPagination, setMarketNewsPagination] = useState({
    page: 1,
    rowsPerPage: 10
  });
  const [loader, setloader] = useState(false);

  const newsRef = useRef();

  useEffect(() => {
    const newsTopic = topic === "all" ? "" : topic;
    dispatch(FETCH_MARKET_NEWS({ topic: newsTopic, setloader })).then((res) => {
      setMarketNewsData(res.data);
    });
    newsRef.current = setInterval(
      () =>
        dispatch(FETCH_MARKET_NEWS({ topic: newsTopic })).then((res) => {
          setMarketNewsData(res.data);
        }),
      1000 * 60 * 5
    );
    return () => {
      clearInterval(newsRef.current);
    };
  }, [topic]);

  const renderNewsCard = () => {
    if (marketNewsData && marketNewsData.length > 0) {
      return marketNewsData.map((news: { title: string }, index: number) => {
        if (index < 4) {
          return <NewsCard key={news.title} news={news} addBackgroundColor={(index + 1) % 2 === 0} />;
        }
      });
    } else {
      return <TableNoRowsOverlay message={"no data found"} />;
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 3
        }}
      >
        <TextView text={"Around the Crypto World"} variant="Bold_28" style={{ marginTop: "1.625rem" }} />
        <Box
          sx={{
            marginTop: "8px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <ToggleGroup
            variant={"chip"}
            value={alignment}
            handleChange={(e, val) => {
              if (!val) return;
              setAlignment(val);
              setMarketNewsPagination({ ...marketNewsPagination, page: 0 });
              setTopic(val);
            }}
            values={[
              { name: "Trending", value: "trending" },
              { name: "BTC", value: "BTC" },
              { name: "ETH", value: "ETH" }
            ]}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            marginTop: "16px",
            height: "650px",
            overflow: "hidden"
          }}
        >
          {renderNewsCard()}
        </Box>
      </Box>
      <Box sx={{ p: 2, maxWidth: "200px" }}>
        <CustomButton variant="primary" onClick={() => navigate("/market/all-news")} label={"View All"} />
      </Box>
    </>
  );
};

export default NewsBox;
NewsBox.propTypes = {
  setTopic: PropTypes.func,
  marketNewsData: PropTypes.array
};
