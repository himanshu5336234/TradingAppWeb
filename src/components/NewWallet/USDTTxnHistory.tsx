import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { USDT_TXN_TABLE_HEADER } from "@/pages/UserProfile/Wallet/TableHeader";
import TableCell from "@/components/SignalTrading/TableHeaderCell";
import DateCell from "@/components/SignalTrading/TableCells/DateCell";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import { useSelector } from "react-redux";
import TradeIDcell from "./TradeIDcell";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import TablePagination from "@/components/SignalTrading/TablePagination";
import DownloadHistoryModal from "@/components/CustomModals/newModal/DownloadHistoryModal";
import usePollingServiceForDownloadHistory from "@/frontend-BL/services/PollingService/usePollingServiceForDownloadHistory";
import CustomAutoSelectTableHeader from "./CustomAutoSelectTableHeader";
import CalenderModal from "@/components/CustomModals/newModal/CalenderModal";
import { TABS_CONSTANTS } from "@/frontend-BL/businessHooks/WALLET/Constants/Tabs.const";
import { FLEX_BOX_ALIGN_CENTER_JUSTIFY_BETWEEN } from "../SignalTrading/Modals/Modals.styles";
import TextView from "../UI/TextView/TextView";
import { getSupportChat } from "@/helpers";

const USDTTxnHistory = ({
  totalCount,
  page,
  setPage,
  rowsPerPage,
  searchSymbol,
  handleSelectSymbol,
  duration,
  changeDuration,
  selectCustomDateRange,
  showCustomDurationModal,
  setShowCustomDurationModal,
  txnType,
  setTxnType,
  RefreshButton
}: {
  totalCount: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  searchSymbol: string;
  handleSelectSymbol: () => void;
  changeDuration: (val: string) => void;
  duration: any;
  selectCustomDateRange: (val: { to: string; from: string }) => void;
  showCustomDurationModal: boolean;
  setShowCustomDurationModal: (val: boolean) => void;
  txnType: any;
  setTxnType: () => void;
  RefreshButton: () => void;
}) => {
  const TransactionHistoryData = useSelector((state: any) => state.futures.transactionHistory);

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadDateRange, setDownloadDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(),
    to: new Date().getTime()
  });
  const activeSymbols = useSelector((state: any) => state.tradablesymbolList.tradablesymbolList);
  const { loaderData, getDownloadID, setLoaderData } = usePollingServiceForDownloadHistory();
  const handleDownloadCSV = () => {
    // api call
    setShowDownloadModal(false);

    getDownloadID({
      startTime: downloadDateRange.from,
      endTime: downloadDateRange.to,
      historyType: "Income History"
    });
  };

  const { openFcSupportChat } = getSupportChat();

  return (
    <>
      <Box sx={FLEX_BOX_ALIGN_CENTER_JUSTIFY_BETWEEN}>
        <TextView variant="Bold_28" text={"Transaction History"}></TextView>
        <Box display={"flex"} gap={2}>
          <TextView
            variant={"Bold_14"}
            onClick={() => RefreshButton()}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              textDecorationThickness: "3px",
              textUnderlineOffset: "4px"
            }}
            text={"Refresh"}
          ></TextView>
          <TextView
            variant={"Bold_14"}
            onClick={() => setShowDownloadModal(true)}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              textDecorationThickness: "3px",
              textUnderlineOffset: "4px"
            }}
            text={"Download"}
          ></TextView>
        </Box>
      </Box>
      <Grid container mt={4}>
        {USDT_TXN_TABLE_HEADER.map((item: any) =>
          item.name === "CONTRACT" ? (
            <Grid key={item.id} item xs={item.gridSize}>
              {" "}
              <CustomAutoSelectTableHeader value={searchSymbol} onChange={handleSelectSymbol} options={["All", ...activeSymbols.map((item: any) => item.symbol)]} label={item.name} />{" "}
            </Grid>
          ) : item.name === "DATE" ? (
            <Grid item xs={item.gridSize}>
              {" "}
              <CustomAutoSelectTableHeader
                value={duration}
                onChange={(e: any, v: any) => changeDuration(v)}
                options={["All", "1 Day", "1 Week", "1 Month", "3 Month", "Custom"]}
                label={item.name}
              />{" "}
            </Grid>
          ) : item.name === "TRANSACTION TYPE" ? (
            <Grid item xs={item.gridSize}>
              {" "}
              <CustomAutoSelectTableHeader value={txnType} onChange={setTxnType} options={[...TABS_CONSTANTS.FUTURES_FILTER_VALUES.map((item) => item.name)]} label={item.name} />{" "}
            </Grid>
          ) : (
            <TableCell heading={item} key={item.id} />
          )
        )}
      </Grid>
      {totalCount <= 0 && <TableNoRowsOverlay message={"No Transaction Data Available"} />}
      {TransactionHistoryData.map((txn: any) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <Grid container mt={2}>
            <DateCell value={txn?.createdAt} gridSize={1.5} />
            <Grid item container xs={2} alignItems={"center"} gap={2}>
              <TextView variant="Regular_14" color={"text.regular"}>
                {txn?.symbol}
              </TextView>
            </Grid>
            <Grid item container xs={2} alignItems={"center"} gap={2}>
              <TextView variant="Regular_14">{txn?.incomeType}</TextView>
            </Grid>
            <Grid item container xs={1.5} alignItems={"center"} gap={2}>
              <TextView variant="Regular_14" color={txn?.amount > 0 ? "text.success" : txn?.amount < 0 ? "text.error" : "text.regular"}>
                {Number(txn?.amount)?.toFixed(8)}
              </TextView>
            </Grid>
            <TradeIDcell tradeID={txn?.tradeUuid} gridSize={2.5} />
            <Grid item container xs={2.5} alignItems={"center"} gap={2}>
              <TextView variant="Regular_14" color={"text.regular"} text={"******" + txn?.brokerTxnId?.substr(-6)}></TextView>
              <CopyButton copyText={txn?.brokerTxnId} />
            </Grid>
          </Grid>
        );
      })}
      {totalCount > 0 && (
        <Grid container justifyContent={"flex-end"} mt={2}>
          <TablePagination page={page} totalPages={Math.ceil(totalCount / rowsPerPage)} setPage={setPage} />
        </Grid>
      )}

      <DownloadHistoryModal
        IsOpen={showDownloadModal}
        isPrimaryAction={true}
        isSecondaryAction={true}
        primaryName="Download"
        secondaryName="Cancel"
        secondaryAction={() => {
          setShowDownloadModal(false);
        }}
        primaryAction={() => {
          if (downloadDateRange.from && downloadDateRange.to) {
            handleDownloadCSV();
          }
        }}
        setDateRange={setDownloadDateRange}
        type="SET_PERIOD"
        dateRange={downloadDateRange}
        title="USDT Transaction History"
      />
      <DownloadHistoryModal
        IsOpen={loaderData.isLoadingOpen}
        title={"USDT Transaction History"}
        isSecondaryAction={false}
        isPrimaryAction={false}
        type={"REQUESTED"}
        close={() =>
          setLoaderData({
            ...loaderData,
            isLoadingOpen: false,
            isFailedOpen: false
          })
        }
        dateRange={downloadDateRange}
      />
      <DownloadHistoryModal
        IsOpen={loaderData.isFailedOpen}
        title={"USDT Transaction History"}
        type={"DOWNLOAD_FAILED"}
        isSecondaryAction={true}
        isPrimaryAction={true}
        secondaryAction={() => {
          setLoaderData({
            ...loaderData,
            isLoadingOpen: false,
            isFailedOpen: false
          });
        }}
        primaryName="Support"
        secondaryName="OK"
        close={() => {
          setLoaderData({
            ...loaderData,
            isLoadingOpen: false,
            isFailedOpen: false
          });
        }}
        dateRange={downloadDateRange}
        primaryAction={() => {
          openFcSupportChat();
          setLoaderData({
            ...loaderData,
            isLoadingOpen: false,
            isFailedOpen: false
          });
        }}
      />
      <CalenderModal setSelectDateRange={selectCustomDateRange} showCalender={showCustomDurationModal} setShowCalender={setShowCustomDurationModal} />
    </>
  );
};

export default USDTTxnHistory;
