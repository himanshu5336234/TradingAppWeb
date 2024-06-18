import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { FIAT_TABLE_HEADER } from "../../pages/UserProfile/Wallet/TableHeader";
import TableCell from "@/components/SignalTrading/TableHeaderCell";
import DateCell from "@/components/SignalTrading/TableCells/DateCell";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import StatusTab from "@/components/SignalTrading/StatusTab";
import TablePagination from "@/components/SignalTrading/TablePagination";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import usePollingServiceForDownloadHistory from "@/frontend-BL/services/PollingService/usePollingServiceForDownloadHistory";
import DownloadHistoryModal from "@/components/CustomModals/newModal/DownloadHistoryModal";
import CustomAutoSelectTableHeader from "./CustomAutoSelectTableHeader";
import CalenderModal from "@/components/CustomModals/newModal/CalenderModal";
import { TABS_CONSTANTS } from "@/frontend-BL/businessHooks/WALLET/Constants/Tabs.const";
import { numberWithCommas } from "@/helpers/commaHelper";
import TextView from "@/components/UI/TextView/TextView";
import { getSupportChat } from "@/helpers";
interface ComponentProps {
  fiatHistory: any;
  Pagination: any;
  ChangePage: (val: number) => void;
  totalCount: number;
  RefreshButton: () => void;
  ChangeDuration: (val: string) => void;
  duration: string;
  selectCustomDateRange: (val: { to: string; from: string }) => void;
  showCustomDateModal: boolean;
  setShowCustomDateModal: (val: boolean) => void;
  txnType: string;
  setTxnType: (val: string) => void;
}

const FiatTransactionTable: React.FC<ComponentProps> = ({
  fiatHistory,
  Pagination,
  ChangePage,
  totalCount,
  RefreshButton,
  ChangeDuration,
  duration,
  selectCustomDateRange,
  showCustomDateModal,
  setShowCustomDateModal,
  txnType,
  setTxnType
}) => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadDateRange, setDownloadDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(),
    to: new Date().getTime()
  });

  const { loaderData, getDownloadID, setLoaderData } = usePollingServiceForDownloadHistory();
  const { openFcSupportChat } = getSupportChat();
  const handleDownloadCSV = () => {
    // api call
    setShowDownloadModal(false);

    getDownloadID({
      startTime: downloadDateRange.from,
      endTime: downloadDateRange.to,
      historyType: "Transaction History"
    });
  };

  const getType = (val: string) => {
    switch (val) {
      case "STARTED":
      case "PENDING":
        return "PENDING";
      case "SUCCESS":
        return "SUCCESS";
      case "FAILED":
        return "ERROR";
      default:
        return "";
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
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
        {FIAT_TABLE_HEADER.map((item: any) =>
          item.name === "DATE" ? (
            <Grid item key={item.name} xs={item.gridSize}>
              {" "}
              <CustomAutoSelectTableHeader value={duration} onChange={ChangeDuration} options={["All", "1 Day", "1 Week", "1 Month", "3 Month", "Custom"]} label={item.name} />{" "}
            </Grid>
          ) : item.name === "TRANSACTION TYPE" ? (
            <Grid item xs={item.gridSize}>
              {" "}
              <CustomAutoSelectTableHeader value={txnType} onChange={setTxnType} options={[...TABS_CONSTANTS.FIAT_FILTER_VALUES.map((item) => item.name)]} label={item.name} />{" "}
            </Grid>
          ) : (
            <TableCell heading={item} key={item.id} />
          )
        )}
      </Grid>
      {totalCount <= 0 && <TableNoRowsOverlay message={"No Transaction Data Available"} />}
      {fiatHistory.map((txn: any, ind: number) => {
        return (
          <Grid container mt={2} key={ind}>
            <DateCell value={txn?.createdAt} gridSize={2} />
            <Grid item container xs={3} alignItems={"center"} gap={2}>
              <TextView variant="Regular_14" color={"text.regular"}>
                {txn?.fiatTransactionType}
              </TextView>
            </Grid>
            <Grid item container xs={2} alignItems={"center"} gap={2}>
              <TextView variant="Regular_14">
                {"₹"} {numberWithCommas(txn?.amount?.toFixed(3))}
              </TextView>
            </Grid>
            <Grid item container xs={2.5} alignItems={"center"}>
              {txn?.txnRefID?.length > 0 ? (
                <>
                  <TextView variant="Regular_14" color={"text.regular"}>
                    {"******"}
                    {txn?.txnRefID.substr(-6)}
                  </TextView>
                  <CopyButton copyText={txn?.txnRefID} />
                </>
              ) : (
                <TextView variant="Regular_14" color={"text.regular"} text={"--"}></TextView>
              )}
            </Grid>
            <Grid item container xs={2.5} alignItems={"center"} gap={2}>
              <StatusTab type={getType(txn?.fiatTransactionStatus)} text={txn?.fiatTransactionStatus} />
            </Grid>
          </Grid>
        );
      })}
      {totalCount > 0 && (
        <Grid container justifyContent={"flex-end"} mt={2}>
          <TablePagination page={Pagination.page} totalPages={Math.ceil(totalCount / Pagination.rowsPerPage)} pageFunction={ChangePage} />
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
        title="Transaction History"
      />
      <DownloadHistoryModal
        IsOpen={loaderData.isLoadingOpen}
        title={"Transaction History"}
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
        title={"Transaction History"}
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

      <CalenderModal setSelectDateRange={selectCustomDateRange} showCalender={showCustomDateModal} setShowCalender={setShowCustomDateModal} />
    </>
  );
};

export default FiatTransactionTable;
