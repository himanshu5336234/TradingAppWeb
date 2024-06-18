import React, { memo, useEffect, useMemo, useState, useContext } from "react";
import IsolatedToCrossWallet from "../../CustomModals/Isolated-Cross-Modal/IsolatedToCrossWallet";
import { useDispatch, useSelector } from "react-redux";
import MIsolatedToCrossWallet from "../../CustomModals/Isolated-Cross-Modal/MIsolatedToCrossWallet";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { GET_MARGIN_TYPE } from "@/frontend-BL/redux/actions/Futures/Futures.ac";
import OrderFormContext from "./OrderFormNewWrapper";
const MarginTypeButton = () => {
  const isMWeb = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();
  const { state } = useContext(OrderFormContext);
  const [isIsolatedToCrossModalOpen, setIsIsolatedToCrossModalOpen] = useState(false);
  const selectedSymbol = useSelector((state) => state.selectSymbol.selectedSymbol).toUpperCase();
  const marginTypeData = useSelector((state) => state.positionsDirectory.marginType.find((data) => data.sym === selectedSymbol.toUpperCase()));
  const RenderMarginTypeModal = useMemo(() => {
    return (
      isIsolatedToCrossModalOpen &&
      (isMWeb ? (
        <MIsolatedToCrossWallet symbol={selectedSymbol} marginType={marginTypeData?.marginType.toUpperCase()} IsOpen={isIsolatedToCrossModalOpen} close={() => setIsIsolatedToCrossModalOpen(false)} />
      ) : (
        <IsolatedToCrossWallet symbol={selectedSymbol} marginType={marginTypeData?.marginType.toUpperCase()} IsOpen={isIsolatedToCrossModalOpen} close={() => setIsIsolatedToCrossModalOpen(false)} />
      ))
    );
  }, [selectedSymbol, marginTypeData, isIsolatedToCrossModalOpen, isMWeb]);
  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          boxShadow: " 0px  0px 1px 0.1px #b1b1ba",

          borderRadius: "2.5px"
        }}
        id="orderForm-marginTypeChange-button"
        onClick={() => !state.isSignalTrading && setIsIsolatedToCrossModalOpen(!isIsolatedToCrossModalOpen)}
      >
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item xs={12}>
            <Typography variant="Regular_11" component={"h6"} m={0.6} sx={{ textTransform: "capitalize" }} textAlign="center">
              {state.isSignalTrading ? "ISOLATED" : marginTypeData?.marginType.toLowerCase() ?? "Isolated"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {RenderMarginTypeModal}
    </>
  );
};

export default memo(MarginTypeButton);
