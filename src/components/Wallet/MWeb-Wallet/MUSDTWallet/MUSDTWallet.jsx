import { useFuturesTab } from "@/frontend-BL/businessHooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { ONE_INR, ONE_USDT } from "@/pages/UserProfile/Wallet/Constants";
import CurrencyConverter from "../../CurrencyConverter/CurrencyConverter";
import usePollingServiceForDownloadHistory from "@/frontend-BL/services/PollingService/usePollingServiceForDownloadHistory";
import { useSelector } from "react-redux";
import { postMetaDataApi } from "@/frontend-api-service/Api";
import { disableFreshChat, enableFreshChat } from "@/frontend-BL/services/ThirdPartyServices/FreshChat";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { DOWNLOAD_ICON_BUTTON } from "../../TransactionHistory/Styled";
import DownloadHistoryModal from "@/components/CustomModals/newModal/DownloadHistoryModal";
import WalletFilter from "../WalletFilter";
import { DataGrid } from "@mui/x-data-grid";
import { M_USDT_COLUMNS } from "../MWalletColumns";
import MUSDTWalletRow from "./MUSDTWalletRow";
import PropTypes from "prop-types";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import { TABS_CONSTANTS } from "@/frontend-BL/businessHooks/WALLET/Constants/Tabs.const";
import MUSDTBalancesDashboard from "./MUSDTBalancesDashboard";
import { formatFuturesTypes } from "@/helpers/wallet/formatTransactionTypes";
import MNotVerifiedBanner from "../MNotVerifedBanner";

const MUSDTWallet = ({ setSelectedWalletTab, IsUserVerified }) => {
  const { totalCount, conversionRateforUSDT, TabsAlignment, Pagination, SetTabsAlignment, ChangePage, RefreshButton, ChangeRowsPerPage, duration, changeDuration, selectCustomDateRange, loading } =
    useFuturesTab();
  const [openUsdtToInr, setOpenUsdtToInr] = useState(false);
  const [openVerificationAlert, setOpenVerificationAlert] = useState(false);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const TransactionHistoryData = useSelector((state) => state.futures.transactionHistory);

  // download states and functions
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const { profileDetails } = useSelector((state) => state.profile);
  const [disableDownloadButton, setDisableDownloaButton] = useState(false);
  const [downloadDateRange, setDownloadDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(),
    to: new Date().getTime()
  });
  const [isSupportChatVisible, setIsSupportChatVisible] = useState(false);
  const { loaderData, getDownloadID, setLoaderData } = usePollingServiceForDownloadHistory();
  const supertokensMetadata = useRef({});

  const handleCurrecyConverstionButton = () => {
    if (IsUserVerified) {
      setOpenUsdtToInr(true);
    } else {
      setOpenVerificationAlert(true);
    }
  };

  const toggleIsSupportChatVisible = useCallback(
    (event) => {
      postMetaDataApi(
        JSON.stringify({
          ...supertokensMetadata.current,
          isSupportChatEnabled: event.target.checked
        })
      );
      setIsSupportChatVisible(event.target.checked);
      if (event.target.checked) {
        enableFreshChat(supertokensMetadata.current.restoreId, profileDetails);
      } else {
        disableFreshChat();
      }
    },
    [isSupportChatVisible]
  );

  window.fcWidget.on("widget:closed", function (resp) {
    toggleIsSupportChatVisible({ target: { checked: false } });
  });
  useEffect(() => {
    if (TransactionHistoryData.length === 0) setDisableDownloaButton(true);
    else setDisableDownloaButton(false);
  }, [TransactionHistoryData]);

  const handleDownloadCSV = () => {
    // api call
    setShowDownloadModal(false);

    getDownloadID({
      startTime: downloadDateRange.from,
      endTime: downloadDateRange.to,
      historyType: "Income History"
    });
  };
  return (
    <Grid container p={1} sx={{ position: "relative" }}>
      <Grid container justifyContent={"space-between"} alignItems={"center"} item xs={12}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <MUSDTBalancesDashboard />
            <Box paddingY={1}>
              <Button
                variant="DensityMain"
                sx={{
                  maxWidth: "325px",
                  width: "100%",
                  height: 31,
                  textTransform: "none"
                }}
                onClick={handleCurrecyConverstionButton}
              >
                Convert USDT to INR
              </Button>
              <Box sx={{ width: "100%", mt: 1, textAlign: "center" }}>
                <Typography variant={"Medium_12"} component={"p"} color="text.main">
                  {ONE_USDT}={" "}
                  <Typography color="text.main" component={"span"} variant="Medium_12">
                    {" "}
                    {Math.trunc(conversionRateforUSDT * 100) / 100}
                  </Typography>
                  {ONE_INR}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              paddingY: 2,
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              alignItems: "center",
              maxWidth: 325
            }}
          >
            <Box>
              <Typography variant="SemiBold_18" component={"p"}>
                Transaction History
              </Typography>
            </Box>
            <Box>
              <Box sx={{ display: "flex", gap: "15px" }}>
                <IconButton onClick={() => setShowDownloadModal(true)} sx={DOWNLOAD_ICON_BUTTON} disabled={disableDownloadButton}>
                  <SaveAltIcon sx={{ fontSize: "20px", marginTop: -0.5 }} />
                </IconButton>
                <RefreshIcon onClick={() => RefreshButton()} sx={{ fontSize: "20px", marginTop: 0.5 }} />
                <FilterAltOutlinedIcon sx={{ fontSize: "20px", marginTop: 0.5 }} onClick={() => setOpenFilterMenu(true)} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: { xs: 327, md: 768 }, maxWidth: 768, mb: 2, ml: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "10px"
              }}
            >
              {duration !== "all" && (
                <Box sx={{ height: 25, p: "4px", border: "0.2px solid #A9A9A9" }}>
                  <Typography variant="light_10" component={"p"} color="#A9A9A9">
                    {duration.toLocaleUpperCase()}
                  </Typography>
                </Box>
              )}
              {TabsAlignment !== "ALL" && (
                <Box sx={{ height: 25, p: "4px", border: "0.2px solid #A9A9A9" }}>
                  <Typography component={"p"} variant="light_10" color="#A9A9A9">
                    {formatFuturesTypes(TabsAlignment)}
                  </Typography>
                </Box>
              )}
            </Box>
            <WalletFilter
              openFilterMenu={openFilterMenu}
              setOpenFilterMenu={setOpenFilterMenu}
              transactionFilter={TabsAlignment}
              setTransactionFitler={SetTabsAlignment}
              duration={duration}
              setDuration={changeDuration}
              selectCustomDateRange={selectCustomDateRange}
              transactionFilterConstants={TABS_CONSTANTS.FUTURES_FILTER_VALUES}
            />
          </Box>
          <Box
            sx={{
              height: 450,
              width: "100%",
              maxWidth: { xs: 327, md: 768 },
              "& .MuiDataGrid-root": {
                border: "none",
                "& .MuiDataGrid-cell": {
                  border: "none"
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "transparent"
                }
              },
              "& .MuiDataGrid-root .MuiDataGrid-cell": {
                border: "none" // Remove borders from all rows
              },
              "& .data-grid-header": {
                backgroundColor: "#2C2C34",
                fontSize: "10px",
                textTransform: "uppercase",
                fontWeight: 300,
                color: "#A9A9A9"
              },
              "& .MuiDataGrid-columnHeader": {
                height: "48px !important" // Add bottom border to the column header row
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "none" // Add bottom border to the column header row
              },
              "& .MuiDataGrid-virtualScrollerRenderZone": {
                width: "100%"
              }
            }}
          >
            <DataGrid
              disableSelectionOnClick
              disableColumnMenu
              columns={M_USDT_COLUMNS}
              rows={TransactionHistoryData}
              pageSize={Pagination.rowsPerPage}
              onPageSizeChange={ChangeRowsPerPage}
              components={{
                Row: (tableData) => <MUSDTWalletRow row={tableData.row} />,
                NoRowsOverlay: () => <TableNoRowsOverlay message="No Active Data" />,
                NoResultsOverlay: () => <TableNoRowsOverlay message="No Active Data" />
              }}
              rowCount={totalCount}
              page={Pagination.page}
              onPageChange={ChangePage}
              rowsPerPageOptions={[5, 10, 20]}
              getRowId={(row) => row.internalId}
              paginationMode="server"
              loading={loading}
              pagination
            />
          </Box>
        </Grid>
      </Grid>
      {<CurrencyConverter currentTab="USDTTOINR" isOpen={openUsdtToInr} close={() => setOpenUsdtToInr(false)} setSelectedWalletTab={setSelectedWalletTab} />}
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
        title="Income History"
      />
      <DownloadHistoryModal
        IsOpen={loaderData.isLoadingOpen}
        title={"Income History"}
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
        isSupportChatVisible={isSupportChatVisible}
        setIsSupportChatVisible={setIsSupportChatVisible}
      />
      <DownloadHistoryModal
        IsOpen={loaderData.isFailedOpen}
        title={"Income History"}
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
        isSupportChatVisible={isSupportChatVisible}
        setIsSupportChatVisible={setIsSupportChatVisible}
        primaryAction={() => {
          toggleIsSupportChatVisible({ target: { checked: true } });
          setLoaderData({
            ...loaderData,
            isLoadingOpen: false,
            isFailedOpen: false
          });
        }}
        toggleIsSupportChatVisible={toggleIsSupportChatVisible}
      />
      {openVerificationAlert && <MNotVerifiedBanner pageTitle={"USDT Conversion"} />}
    </Grid>
  );
};

export default MUSDTWallet;

MUSDTWallet.propTypes = {
  setSelectedWalletTab: PropTypes.func,
  IsUserVerified: PropTypes.bool
};
