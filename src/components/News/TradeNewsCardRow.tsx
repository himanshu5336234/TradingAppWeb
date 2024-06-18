import React from "react";
import { allNewsContainer, newsDateandSource, newsImage, newsTradeDate, titleContainer } from "./TradeNews.Style";
import { Box, Typography } from "@mui/material";
import { TradeNewsMarketData } from "./TradeNews.type";
// import Icon from "ASSETS/images/TradeNews/Symbole.svg";
import NewsDefault from "ASSETS/images/NewsDefault.svg";
import dot from "ASSETS/images/TradeNews/Dot.svg";
import { dateFormatter } from "../../helpers/dateFormatter";

const TradeNewsCardRow = ({ image_url, source_name, date, title, news_url }: TradeNewsMarketData) => {
  const getImagUrl = () => {
    const regex = /^https|^http/i;

    return regex.test(image_url);
  };

  return (
    <Box onClick={() => window.open(news_url)} sx={allNewsContainer}>
      <Box
        component={"img"}
        src={getImagUrl() ? image_url : NewsDefault}
        sx={newsImage}
        onError={(event) => {
          if (event.type === "error") {
            event.target.src = NewsDefault;
          }
        }}
      />
      {/* <img style={newsImage} src={image_url} alt={image_url} /> */}
      <Box>
        <Box sx={newsTradeDate}>
          {/* <img src={Icon}/> */}

          <Typography variant="labelMedium" sx={newsDateandSource}>
            {source_name}
            <img src={dot} alt="dot" />
            {dateFormatter(date)}
          </Typography>
        </Box>
        <Box sx={titleContainer}>
          <Typography variant="titleSmall">{title}</Typography>
          {/* <Typography variant="titleSmall" sx={{ textDecoration: "underline" }}>
            {"Trade_ETC"}
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(TradeNewsCardRow);
