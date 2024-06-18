import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import { PRICE_SUMMARY_HEADER } from "../signalTradingHeaders";
import TableCell from "../TableHeaderCell";
import SymbolCell from "../TableCells/SymbolCell";
import DateCell from "../TableCells/DateCell";
import SideCell from "../TableCells/SideCell";
// import StatusCell from "../TableCells/StatusCell";
import ROICell from "../TableCells/ROICell";
import { SEE_DETAILS_CELL } from "./Modals.styles";

interface Data {
  roi: string;
  signalId: string;
  createdAt: string;
  side: string;
  orderSide: string;
  symbol: string;
  leverage: number;
  marginMode: string;
  remarks: string;
}
interface PriceSummaryWithTPSLProps {
  IsOpen: boolean;
  setShowPriceSummaryModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data;
}

const PriceSummaryWithTPSLModal: React.FC<PriceSummaryWithTPSLProps> = ({ IsOpen, setShowPriceSummaryModal, data }) => {
  const GetCell: React.FC<{ heading: string; value: string; gridSize: number }> = ({ heading, value, gridSize }) => {
    return (
      <Grid item sx={SEE_DETAILS_CELL} xs={gridSize}>
        <Typography variant="SemiBold_11">
          {heading}
          <Typography component={"div"} variant="SemiBold_12" color={"fff"}>
            {value}
          </Typography>
        </Typography>
      </Grid>
    );
  };

  return (
    <CustomModal IsOpen={IsOpen} close={() => setShowPriceSummaryModal(false)} isClose={true}>
      <Box p={2}>
        <Typography variant={"Medium_16"}>{"See details"}</Typography>

        <Grid container mt={3} mb={2} justifyContent={"space-between"}>
          {PRICE_SUMMARY_HEADER.map((heading) => (
            <TableCell key={heading.id} heading={heading} />
          ))}
        </Grid>
        {
          <Grid container key={data.signalId} mb={2} justifyContent={"space-between"}>
            <DateCell value={data?.createdAt} gridSize={2.5} />
            <SymbolCell symbol={data?.symbol} gridSize={3.3} leverage={data?.leverage} marginMode={data?.marginMode?.toLowerCase().includes("isolated") ? "Isolated" : "Crossed"} />
            <SideCell side={data?.orderSide} gridSize={1.5} />
            <ROICell roi={data.roi ?? data.signalPerformance} gridSize={1.5} />
            <Grid item container alignItems={"center"} xs={3.2} gap={1}>
              <Typography variant="Medium_12" width={"100%"}>
                {data?.remarks.split("_").join(" ")}
              </Typography>
            </Grid>
          </Grid>
        }

        <Grid container width={"100%"} justifyContent={"space-between"} my={2}>
          <GetCell heading={"Trigger Price"} value={data?.orderStopPrice || "--"} gridSize={3} />
          <GetCell heading={"Limit Price"} value={data?.orderPrice || "--"} gridSize={3} />
          <GetCell heading={"Take Profit"} value={data?.takeProfitStopPrice || "--"} gridSize={3} />
          <GetCell heading={"Stop Loss"} value={data?.stopLossStopPrice || "--"} gridSize={3} />
        </Grid>
      </Box>
    </CustomModal>
  );
};

export default PriceSummaryWithTPSLModal;
