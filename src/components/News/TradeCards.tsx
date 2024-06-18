import { Box } from "@mui/material";
import React from "react";
import TradeCardRow from "./TradeCardRow";
import { TradeCardData, TradeCardLabel } from "./TradeNews.type";
import TextView from "../UI/TextView/TextView";

const TradeCards = ({ data, label }: TradeCardLabel) => {
  return (
    <Box>
      <TextView color={"text.regular"} variant="Medium_12" text={label} />
      <Box>
        {data.map((el: TradeCardData) => (
          <TradeCardRow key={el?.id} {...el} />
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(TradeCards);
