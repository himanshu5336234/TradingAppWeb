import React, { memo, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import OuickOrder from "@/components/Home/OrderForm/QuickOrder/OuickOrder";
import { getQuickOrderDataApi } from "@/frontend-api-service/Api";
import TextView from "@/components/UI/TextView/TextView";

const BidAskRatio = () => {
  const [ratio, SetRatio] = useState({ ask: "", bid: "" });
  const [QuickTradeActive, SetQuickTradeActive] = useState(false);
  const symbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  useEffect(() => {
    if (symbol) {
      getQuickOrderDataApi(symbol.toUpperCase())
        .then((response: { data: any[] }) => {
          const data = response.data[0];
          SetRatio({
            bid: Number(data.longAccount * 100).toFixed(2),
            ask: Number(data.shortAccount * 100).toFixed(2)
          });
        })
        .catch((error: any) => {
          console.log(error, "market sentiment api error");
        });
    }
  }, [symbol]);
  return (
    <>
      {QuickTradeActive && <OuickOrder SetQuickTradeActive={SetQuickTradeActive} />}
      <Box sx={{ mr: 2, height: "100%", display: { sm: "flex", xs: "none" }, alignItems: "center", gap: 1 }}>
        <TextView
          component={"h6"}
          id={"quick-order"}
          onClick={() => SetQuickTradeActive(!QuickTradeActive)}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            display: { xs: "none", md: "block" }
          }}
          text={"Quick Trade"}
          variant="Medium_12"
        />

        <Box
          sx={{
            display: "flex",
            backgroundColor: "background.primary",
            p: 1,
            gap: 1,
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px"
          }}
        >
          <TextView component={"p"} variant="Medium_11" text={"Market Sentiment"} />

          <Box sx={{ display: "flex", flex: 1 }}>
            <TextView />

            <TextView
              variant="Medium_11"
              component={"p"}
              style={{
                px: 1,
                color: "text.success",
                minWidth: "80px",

                textAlign: "left",
                background: "linear-gradient(90deg, #29B57E -234.85%, #0E0E0F 146.96%)"
              }}
              text={`${ratio.bid}%`}
            />
            <TextView
              component={"p"}
              variant="Medium_11"
              text={`${ratio.ask}%`}
              style={{
                px: 1,
                minWidth: "80px",
                textAlign: "right",
                background: "linear-gradient(90deg, rgba(244, 95, 95, 0) -35.92%, rgba(244, 95, 95, 0.3) 100%)",
                color: "text.error"
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(BidAskRatio);
