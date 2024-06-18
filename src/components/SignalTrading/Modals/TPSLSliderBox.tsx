import React, { useRef, useState, useCallback } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ChildOrdersForFollowerTPSL from "./ChildOrdersForFollowerTPSL";
import { useSelector } from "react-redux";
interface ComponentProps {
  TPSLData: any[];
  // isFollower: boolean;
  entryPrice: number;
  side: string;
  symbol: string;
}
const TPSLSliderBox: React.FC<ComponentProps> = ({
  TPSLData,
  // isFollower= false,
  side,
  entryPrice,
  symbol
}) => {
  const [index, setIndex] = useState<number>(1);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setIndex(newIndex + 1);
    }
  };
  const tradableSymbolList = useSelector((state: any) => state.tradablesymbolList.tradablesymbolList);
  const selectedSymbolDetails = tradableSymbolList?.filter((listedSymbol: any) => listedSymbol.symbol.toUpperCase() === symbol?.toUpperCase());
  const pricePrecisionValue = selectedSymbolDetails[0]?.pricePrecision;

  const convertToPrecisionValueInPricePrecisionUnit = useCallback(
    (value: string) => {
      return Math.round(parseFloat(value) * Math.pow(10, pricePrecisionValue)) / Math.pow(10, pricePrecisionValue);
    },
    [pricePrecisionValue]
  );

  return (
    <>
      <Tabs
        textColor="white"
        TabIndicatorProps={{ style: { backgroundColor: "white" } }}
        selectionFollowsFocus
        value={"tpsl"}
        aria-label="Tabs where each tab needs to be selected manually"
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between"
        }}
      >
        <Tab sx={{ fontSize: "16px", fontWeight: "500", textTransform: "none" }} label={`TP/SL Pairs (${index}/${TPSLData.length})`} value={"tpsl"} />
      </Tabs>
      <Box mt={2}>
        <Slider {...settings} ref={sliderRef}>
          {TPSLData?.map((orders: any[], idx: number) => (
            <ChildOrdersForFollowerTPSL
              key={idx}
              entryPrice={entryPrice} // Updated to a number
              order={orders}
              convertToPrecisionValueForPrice={convertToPrecisionValueInPricePrecisionUnit}
              side={side === "BUY" ? "SELL" : "BUY"}
            />
          ))}
        </Slider>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"}>
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
            color: index === TPSLData.length ? "grey" : "white",
            cursor: "pointer"
          }}
          onClick={() => {
            if (index < TPSLData.length) {
              setIndex(index + 1);
              sliderRef.current?.slickNext();
            }
          }}
        />
      </Box>
    </>
  );
};

export default TPSLSliderBox;
