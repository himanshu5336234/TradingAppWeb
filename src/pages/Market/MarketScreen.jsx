import React, { useEffect } from "react";
// import MarketTable from "@/components/Market/MarketTable/MarketTable";
import MarketTable from "../../components/Market/MarketTable";
import { useDispatch } from "react-redux";
import useHandleAlltickerSocketSubs from "@/frontend-BL/businessHooks/BINANCE_WORKER/useHandleAlltickerSocketSubs";

function MarketScreen(props) {
  useHandleAlltickerSocketSubs();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "RESUME_RENDERING" });
  }, []);
  return (
    <>
      <MarketTable />
    </>
  );
}

export default MarketScreen;
