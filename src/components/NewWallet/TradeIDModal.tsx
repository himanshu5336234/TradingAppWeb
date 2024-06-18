import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import { Box, Divider, Grid } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import TableCell from "@/components/SignalTrading/TableHeaderCell";
import TextView from "../UI/TextView/TextView";

const TABLE_HEADER = [
  { id: 0, name: "TRADE ID", gridSize: 4 },
  { id: 1, name: "COMMISSION(USDT)", gridSize: 4 },
  { id: 2, name: "P&L(USDT)", gridSize: 4 }
];

interface TradeData {
  tradeId: string;
  commission: string;
  realizedPnl: number;
}

interface TradeIDModal {
  symbol: string;
  orderId: string;
  tradeData: TradeData[];
}

export const TradeIDModal = ({ close, tradeIDModalData, openTradeIDModal }: { close: () => void; tradeIDModalData: TradeIDModal; openTradeIDModal: boolean }) => {
  return (
    <CustomModal isClose={true} isPrimaryAction={false} isSecondaryAction={false} IsOpen={openTradeIDModal} close={close}>
      <Box p={2}>
        <TextView variant="Medium_16">
          {"Order ID - "}
          <TextView variant="Medium_16" color={"text.regular"}>
            {tradeIDModalData.orderId}
          </TextView>
        </TextView>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            my: 2
          }}
        >
          <img width={"28px"} src={getCurrencyUrl(tradeIDModalData?.symbol?.toUpperCase()?.replace("USDT", "")?.toLowerCase())} />
          <TextView>{tradeIDModalData?.symbol}</TextView>
        </Box>

        <Divider />

        <Grid container>
          {TABLE_HEADER.map((item, ind: number) => (
            <TableCell heading={item} gridSize={item.gridSize} key={ind} />
          ))}
        </Grid>

        <Box
          sx={{
            maxHeight: "250px",
            overflow: "hidden",
            overflowY: "scroll"
          }}
        >
          {tradeIDModalData?.tradeData?.map((txn: TradeData, ind: number) => (
            <Grid item container mt={1} key={ind}>
              <Grid item container xs={4} alignItems={"center"} gap={1}>
                <TextView variant="Regular_14">{"******" + txn?.tradeId?.substr(-6)}</TextView>
                <CopyButton copyText={txn?.tradeId} />
              </Grid>
              <Grid item container xs={4} alignItems={"center"}>
                <TextView variant="Regular_14">{txn?.commission}</TextView>
              </Grid>
              <Grid item container xs={4} alignItems={"center"}>
                <TextView variant="Regular_14" color={txn?.realizedPnl > 0 ? "text.success" : txn?.realizedPnl < 0 ? "text.error" : "text.regular"}>
                  {"₹"} {txn?.realizedPnl}
                </TextView>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
    </CustomModal>
  );
};

export default TradeIDModal;

TradeIDModal.propTypes = {
  close: PropTypes.func,
  tradeIDModalData: PropTypes.object,
  openTradeIDModal: PropTypes.bool
};
