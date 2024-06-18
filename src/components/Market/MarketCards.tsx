import React from "react";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import MarketCardRow from "./MarketCardRow";
import TextView from "../UI/TextView/TextView";
const Card = (props: { title: string; type: string }) => {
  const { title, type } = props;

  return (
    <Grid item xs={12} md={6} lg={3.7}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <TextView text={title} variant="Medium_14" color={"text.regular"} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 24px",
            bgcolor: "background.primary",
            mt: "12px",
            position: "relative",
            borderRadius: 2,
            maxWidth: { md: 362, lg: 362, xl: 500 }
          }}
        >
          <Box sx={{ width: "100%" }}>
            <MarketCardRow type={type} primaryText={"Currency (USDT)"} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

const MarketCards = () => {
  return (
    <Grid container gap={2} justifyContent={"space-between"}>
      <Card type={"globalMarket"} title={"Global Market"} />
      <Card type={"Gainers"} title={"Top 5 Gainers"} />
      <Card type={"Losers"} title={"Top 5 Dippers"} />
    </Grid>
  );
};

export default MarketCards;

Card.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
};

MarketCards.propTypes = {
  cardData: PropTypes.object
};
