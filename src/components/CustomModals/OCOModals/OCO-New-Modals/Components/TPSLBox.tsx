import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import ChildOrders from "./ChildOrders";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { SymbolPrecisionHelper } from "@/helpers";
import { FLEX_BOX_ALIGN_CENTER_JUSTIFY_BETWEEN } from "@/components/SignalTrading/Modals/Modals.styles";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";

interface TPSLBoxProps {
  strategyOrders: object[];
  index: number;
  setIndex: (val: boolean) => void;
  symbol: string;
  entryPrice: number;
  setActiveStep: (val: boolean) => void;
  side: "BUY" | "SELL";
}

const TPSLBox: React.FC<TPSLBoxProps> = ({ strategyOrders, index, setIndex, symbol, entryPrice, setActiveStep, side }) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setIndex(newIndex + 1);
    }
  };
  const { setDecimalPrecision } = SymbolPrecisionHelper({ symbol });

  return (
    <>
      {strategyOrders.length === 0 && <TableNoRowsOverlay message={"No OCO orders Data Availale"} />}
      {strategyOrders.length !== 0 && (
        <>
          <Slider {...settings} ref={sliderRef}>
            {strategyOrders.map((orders: any, idx: number) => (
              <ChildOrders
                key={idx}
                orders={orders}
                convertToPrecisionValueForPrice={setDecimalPrecision}
                entryPrice={entryPrice} // Updated to a number
                isSignal={false}
                side={side}
              />
            ))}
          </Slider>
          <Box sx={FLEX_BOX_ALIGN_CENTER_JUSTIFY_BETWEEN}>
            <Box>
              <Typography
                onClick={() => setActiveStep(4)}
                id="position-close-button"
                color={"text.error"}
                variant={"Bold_12"}
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  textDecorationThickness: "3px"
                }}
              >
                {"Cancel"}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              // justifyContent={"flex-end"}
            >
              <NavigateBeforeRoundedIcon
                id="positionOCOModal-Prev-Navigation"
                sx={{
                  fontSize: "40px",
                  p: 1,
                  color: index === 1 ? "grey" : "white",
                  cursor: "pointer"
                }}
                onClick={() => {
                  if (index > 1) {
                    sliderRef.current?.slickPrev();
                  }
                }}
              />
              <NavigateNextRoundedIcon
                id="positionOCOModal-Next-Navigation"
                sx={{
                  fontSize: "40px",
                  ml: 1,
                  p: 1,
                  color: index === strategyOrders.length ? "grey" : "white",
                  cursor: "pointer"
                }}
                onClick={() => {
                  if (index < strategyOrders.length) {
                    setIndex(index + 1);
                    sliderRef.current?.slickNext();
                  }
                }}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default TPSLBox;
