import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { dateFormatter } from "../../helpers/dateFormatter";
import DecryptImage from "ASSETS/images/DecryptImage.svg";
import NewsDefault from "ASSETS/images/NewsDefault.svg";

const NewsCard = ({ news, addBackgroundColor = false }) => {
  const getImagUrl = () => {
    const regex = /^https|^http/i;
    return regex.test(news.image_url);
  };

  return (
    <Box
      key={news.title}
      sx={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "16px",
        ":hover": {
          cursor: "pointer"
        },
        backgroundColor: addBackgroundColor ? "rgba(27,27,31,0.6)" : "transparent",
        borderRadius: 2,
        height: 200
      }}
      py={2.5}
      gap={2.25}
      onClick={() => window.open(news.news_url)}
    >
      <Box
        component={"img"}
        onError={(event) => {
          if (event.type === "error") {
            event.target.src = NewsDefault;
          }
        }}
        src={getImagUrl() ? news?.image_url : NewsDefault}
        sx={{
          height: "127px",
          width: "134px",
          objectFit: "cover",
          borderRadius: 3,
          borderWidth: 1,
          borderStyle: "solid"
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1,
          pr: 1
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            // width: "100%",
            gap: "0px",
            paddingTop: "15px"
          }}
        >
          <Box component={"img"} src={DecryptImage} />
          <Typography variant="Medium_12" color="text.regular" component={"p"} sx={{ marginLeft: "12px" }}>
            {/* {news.source_name.toUpperCase()} */}
            {"Decrypt "}
          </Typography>
          <Typography
            variant="Medium_12"
            color="text.regular"
            component={"p"}
            sx={{
              fontWeight: "bold",
              fontSize: "22px",
              marginTop: "-15px",
              marginBottom: "10px",
              px: "5px"
            }}
          >
            {" .  "}
          </Typography>
          <Typography variant="Medium_12" color="text.regular" component={"p"}>
            {dateFormatter(news?.date)}
          </Typography>
        </Box>
        <Typography variant="Medium_14" sx={{ width: "100%" }}>
          {news?.title}
        </Typography>
        <Typography
          variant="Regular_12"
          color="text.regular"
          sx={{
            maxHeight: "3.1rem",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {news?.text}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start"
          }}
          mt={1}
        >
          {news?.topic?.map((item) => (
            <Typography
              key={item}
              variant="Regular_10"
              color="text.mild"
              sx={{
                border: "1px solid",
                borderColor: "text.mild",
                p: "12px",
                py: "1px",
                mr: "8px"
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NewsCard;
NewsCard.propTypes = {
  news: PropTypes.object,
  addBackgroundColor: PropTypes.bool
};
