import { Box, Button, Grid, IconButton, Link, Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import inrWalletFrameBg from "@/assets/images/wallet/inrWalletFrameBg.svg";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useFiatTab } from "@/frontend-BL/businessHooks";
import { numberWithCommas } from "@/helpers/commaHelper";
import { INR_DEPOSIT, INR_WALLET_BALANCE_MASK, INR_WITHDRAW, ONE_INR, ONE_USDT } from "@/pages/UserProfile/Wallet/Constants";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { DOWNLOAD_ICON_BUTTON } from "../../TransactionHistory/Styled";
import { disableFreshChat, enableFreshChat } from "@/frontend-BL/services/ThirdPartyServices/FreshChat";
import { postMetaDataApi } from "@/frontend-api-service/Api";
import usePollingServiceForDownloadHistory from "@/frontend-BL/services/PollingService/usePollingServiceForDownloadHistory";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useSelector } from "react-redux";
import DownloadHistoryModal from "@/components/CustomModals/newModal/DownloadHistoryModal";
import { DataGrid } from "@mui/x-data-grid";
import { M_INR_COLUMNS } from "../MWalletColumns";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import MINRWalletRow from "./MINRWalletRow";
import WalletFilter from "../WalletFilter";
import CurrencyConverter from "../../CurrencyConverter/CurrencyConverter";
import PropTypes from "prop-types";
import { TABS_CONSTANTS } from "@/frontend-BL/businessHooks/WALLET/Constants/Tabs.const";
import { formatFiatTypes } from "@/helpers/wallet/formatTransactionTypes";
import BinocsBanner from "@/assets/images/wallet/binocsMWeb.png";
import MNotVerifiedBanner from "../MNotVerifedBanner";

const MINRWallet = ({ setSelectedWalletTab, IsUserVerified }) => {
  const {
    fiatbalance,
    FiatHistory,
    TabsAlignment,
    Pagination,
    SetTabsAlignment,
    ChangeRowsPerPage,
    ChangePage,
    conversionRateforUSDT,
    RefreshButton,
    totalCount,
    duration,
    changeDuration,
    selectCustomDateRange,
    loading
  } = useFiatTab();
  const [BalanceHidden, SetBalanceHidden] = useState(true);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [openInrToUsdt, setOpenInrToUsdt] = useState(false);
  const BalanceVisibilityIcon = () => {
    return BalanceHidden === true ? (
      <VisibilityOffIcon sx={{ marginTop: 1, fontSize: "15px" }} onClick={() => SetBalanceHidden(false)} />
    ) : (
      <VisibilityIcon sx={{ marginTop: 1, fontSize: "15px" }} onClick={() => SetBalanceHidden(true)} />
    );
  };
  const BalanceVisibility = () => {
    return BalanceHidden === true ? (
      <Typography variant="SemiBold_20" component={"p"} sx={{ textAlign: "center" }}>
        &#x20B9; {INR_WALLET_BALANCE_MASK}{" "}
      </Typography>
    ) : (
      <Typography variant="SemiBold_20" component={"p"} sx={{ textAlign: "center" }}>
        &#x20B9; {numberWithCommas(fiatbalance)}{" "}
      </Typography>
    );
  };
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
    if (FiatHistory.length === 0) setDisableDownloaButton(true);
    else setDisableDownloaButton(false);
  }, [FiatHistory]);

  const handleDownloadCSV = () => {
    // api call
    setShowDownloadModal(false);

    getDownloadID({
      startTime: downloadDateRange.from,
      endTime: downloadDateRange.to,
      historyType: "Transaction History"
    });
  };
  return (
    <Grid container p={1} sx={{ position: "relative" }}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          filter: IsUserVerified ? "blur(0px)" : "blur(10px)",
          pointerEvents: IsUserVerified ? "auto" : "none"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Box
            sx={{
              // border: "0.1px solid #E2FF6F",
              minWidth: "325px",
              width: "100%",
              p: 3,
              height: 166,
              backgroundImage: `url(${inrWalletFrameBg})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Box sx={{ marginBottom: "16px" }}>
              <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <Typography component={"h3"} variant="Regular_12">
                  {"Total INR Wallet Balance"}
                </Typography>
                <Typography component={"p"}>{BalanceVisibilityIcon()}</Typography>
              </Box>
              <Typography sx={{ marginTop: "-5px" }} variant="Regular_20">
                {fiatbalance ? BalanceVisibility() : "---"}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "8px" }}>
              {/* <Typography sx={{ textDecoration: "underline", cursor: "pointer", width: "fit-content" }} variant="light_16">
              View TDS
            </Typography> */}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Button
                sx={{
                  height: "32px",
                  textTransform: "none",
                  pt: "8px",
                  pb: "6px"
                }}
                variant="primary"
                onClick={() => setSelectedWalletTab("inrDeposit")}
              >
                {INR_DEPOSIT}
              </Button>
              <Button
                variant="secondary"
                sx={{
                  height: "32px",
                  textTransform: "none",
                  pt: "8px",
                  pb: "6px"
                }}
                onClick={() => setSelectedWalletTab("inrWithdraw")}
              >
                {INR_WITHDRAW}
              </Button>
            </Box>
          </Box>
          <Box paddingY={1}>
            <Button
              variant="DensityMain"
              sx={{
                maxWidth: "325px",
                width: "100%",
                height: 31,
                textTransform: "none"
              }}
              onClick={() => setOpenInrToUsdt(true)}
            >
              Convert INR to USDT
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
        <Box mt={2}>
          <Link href={"https://l.binocs.co/jnQQWEn3"} target={"_blank"} sx={{ cursor: "pointer" }}>
            <Box component={"img"} src={BinocsBanner} alt="binocs" sx={{ height: 190, width: 325, objectFit: "contain" }} />
          </Link>
        </Box>
        <Box sx={{ paddingY: 2, display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", maxWidth: 325, mt: 2 }}>
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
        <Box sx={{ width: { xs: 327, md: 768 }, mb: 2, ml: 1 }}>
          {/* Filter Pills */}
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
                  {formatFiatTypes(TabsAlignment)}
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
            transactionFilterConstants={TABS_CONSTANTS.FIAT_FILTER_VALUES}
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
            columns={M_INR_COLUMNS}
            rows={FiatHistory}
            pageSize={Pagination.rowsPerPage}
            onPageSizeChange={ChangeRowsPerPage}
            components={{
              Row: (tableData) => <MINRWalletRow row={tableData.row} />,
              NoRowsOverlay: () => <TableNoRowsOverlay message="No Active Data" />
            }}
            loading={loading}
            rowCount={totalCount}
            page={Pagination.page}
            onPageChange={ChangePage}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row.internalId}
            paginationMode="server"
            pagination
          />
        </Box>
      </Grid>
      {<CurrencyConverter currentTab="INRTOUSDT" isOpen={openInrToUsdt} close={() => setOpenInrToUsdt(false)} setSelectedWalletTab={setSelectedWalletTab} />}
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
        isSupportChatVisible={isSupportChatVisible}
        setIsSupportChatVisible={setIsSupportChatVisible}
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
      {!IsUserVerified && <MNotVerifiedBanner />}
    </Grid>
  );
};

export default MINRWallet;

MINRWallet.propTypes = {
  setSelectedWalletTab: PropTypes.func,
  IsUserVerified: PropTypes.bool
};
