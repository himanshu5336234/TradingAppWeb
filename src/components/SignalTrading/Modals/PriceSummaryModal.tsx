// import CustomModal from '@/components/UI/Molecules/Modal/Modal';
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import { PRICE_SUMMARY_HEADER, PRICE_SUMMARY_HEADER_COMPLETEDSIGNAL } from "../signalTradingHeaders";
import TableCell from "../TableHeaderCell";
import SymbolCell from "../TableCells/SymbolCell";
import DateCell from "../TableCells/DateCell";
import SideCell from "../TableCells/SideCell";
import ROICell from "../TableCells/ROICell";
import { SEE_DETAILS_CELL } from "./Modals.styles";
import StatusCell from "../TableCells/StatusCell";

interface Data {
  roi: string;
  signalId: string;
  createdAt: string;
  status: string;
  remarks: string;
  side: string;
  orderSide: string;
  symbol: string;
  leverage: number;
  marginMode: string;
  stopLossStopPrice: number;
  takeProfitStopPrice: number;
  orderPrice: number;
  signalPerformance: number;
}
interface PriceSummaryModalProps {
  IsOpen: boolean;
  setShowPriceSummaryModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data;
}

const PriceSummaryModal: React.FC<PriceSummaryModalProps> = ({ IsOpen, setShowPriceSummaryModal, data }) => {
  const GetCell = ({ heading, value, gridSize }) => {
    return (
      <Grid item sx={SEE_DETAILS_CELL} xs={gridSize}>
        <Typography variant="SemiBold_11">
          {heading}
          <Typography component={"div"} variant="Medium_12" color={"fff"}>
            {value ?? "--"}
          </Typography>
        </Typography>
      </Grid>
    );
  };
  return (
    <CustomModal
      IsOpen={IsOpen}
      close={() => setShowPriceSummaryModal(false)}
      isClose={true}
      ContainerSx={{
        maxWidth: { lg: "720px", sm: "700px", xs: "350px" }
      }}
    >
      <Box p={2}>
        <Typography variant={"Medium_16"}>{"See Details"}</Typography>

        <Grid container mt={3} mb={2} justifyContent={"space-between"}>
          {(data.remarks ? PRICE_SUMMARY_HEADER : PRICE_SUMMARY_HEADER_COMPLETEDSIGNAL).map((heading) => (
            <TableCell key={heading.id} heading={heading} />
          ))}
        </Grid>

        {
          <Grid container key={data?.signalId} mb={2} justifyContent={"space-between"}>
            <DateCell value={data?.createdAt} gridSize={2.5} />
            <SymbolCell symbol={data?.symbol} gridSize={3.3} leverage={data?.leverage} marginMode={data?.marginMode} />
            <SideCell side={data?.orderSide} gridSize={1.5} />
            <ROICell roi={data?.signalPerformance} gridSize={1.5} />
            {data.remarks ? (
              <Grid item container alignItems={"center"} xs={3.2} gap={1}>
                <Typography variant="Medium_12" width={"100%"}>
                  {data?.remarks.split("_").join(" ")}
                </Typography>
              </Grid>
            ) : (
              <StatusCell gridSize={3.2} status={data.status} />
            )}
          </Grid>
        }

        <Grid container width={"100%"} justifyContent={"space-between"} my={2}>
          <GetCell heading={"Trigger Price"} value={data?.orderStopPrice} gridSize={4} />
          <GetCell heading={"Limit Price"} value={data.orderPrice} gridSize={4} />
          <GetCell heading={"Exit Price"} value={data.signalPerformance > 0 ? data.takeProfitStopPrice : data.stopLossStopPrice} gridSize={4} />
        </Grid>
      </Box>
    </CustomModal>
  );
};

export default PriceSummaryModal;
