import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CloseAllPosition from "../PositionRow/PositionRowComponents/CloseAllPositionAndTotalProfitLoss/CloseAllPosition";
import ActivePositionCards from "./ActivePositionCards";
const ActivePositionQuickOrder = () => {
  const allPositionsData = useSelector((state) => state.positionsDirectory.currentPositions);
  const positionsDirectory = useMemo(() => {
    if (allPositionsData.length > 0) {
      return allPositionsData.map((item, index) => (
        <Box sx={{ width: "100%" }} key={index}>
          <ActivePositionCards data={item} />
        </Box>
      ));
    } else {
      return (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <TableNoRowsOverlay message={"No active positions"} />
        </Box>
      );
    }
  }, [allPositionsData]);
  return (
    <Box sx={{ mx: 0.5, height: "100%" }}>
      <Box sx={{ height: "calc(80vh - 100px)", mb: "20px", overflowX: "auto" }}>{positionsDirectory}</Box>

      <CloseAllPosition isDisable={allPositionsData.length === 0} variant="secondary" label={"close all position"} />
    </Box>
  );
};

export default ActivePositionQuickOrder;
