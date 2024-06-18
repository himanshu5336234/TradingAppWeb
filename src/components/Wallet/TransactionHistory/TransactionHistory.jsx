import React, { useCallback, useEffect, useRef, useState } from "react";

import RefreshIcon from "@mui/icons-material/Refresh";
import { Autocomplete, Box, Checkbox, FormControlLabel, MenuItem, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { TRANSACTION_HISTORY } from "./magicStrings";
import { autoCompeleteWalletFilterStyle, DOWNLOAD_ICON_BUTTON, REFRESH_ICON_STYLE, TABLE_ACTIONS_WRAPPER, TABLE_WRAPPER_STYLE, TRANSACTION_HISTORY_HEADER_WRAPPER } from "./Styled";
import { TABS_CONSTANTS } from "@/frontend-BL/businessHooks/WALLET/Constants/Tabs.const";
import { Select } from "@/components/UI/Select";
import DurationSelect from "@/components/UI/DurationSelect";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DownloadHistoryModal from "@/components/CustomModals/newModal/DownloadHistoryModal";
import { IconButton } from "@mui/material/node";
import usePollingServiceForDownloadHistory from "@/frontend-BL/services/PollingService/usePollingServiceForDownloadHistory";
import { disableFreshChat, enableFreshChat } from "@/frontend-BL/services/ThirdPartyServices/FreshChat";
import { postMetaDataApi } from "API/Api/Futures";
import { useSelector } from "react-redux";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { typographyGridSubHeader } from "@/components/Home/UserActivities/UserTabs/UserTabs.style";
import { muiWalletSelectSx, walletMenuSx } from "@/components/UI/Select/Select.styled";

export default function TransactionHistory({
  Pagination,
  TotalCount,
  TabsAlignment,
  ChangePage,
  ChangeRowsPerPage,
  SetTabsAlignment,
  RefreshButton,
  column,
  duration,
  changeDuration,
  selectCustomDateRange,
  searchSymbol,
  handleSymbolSelect,
  loading,
  handleHideBalanceCheckBox,
  isHideSmallBalanceChecked
}) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const { profileDetails } = useSelector((state) => state.profile);
  const [disableDownloadButton, setDisableDownloaButton] = useState(false);
  const [downloadDateRange, setDownloadDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(),
    to: new Date().getTime()
  });
  const TransactionHistoryData = useSelector((state) => state.futures.transactionHistory);

  const [isSupportChatVisible, setIsSupportChatVisible] = useState(false);
  const { loaderData, getDownloadID, setLoaderData } = usePollingServiceForDownloadHistory();
  const supertokensMetadata = useRef({});
  const activeSymbols = useSelector((state) => state.tradablesymbolList.tradablesymbolList);

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
    if (TransactionHistoryData?.length === 0) setDisableDownloaButton(true);
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
    <>
      <Box>
        <Box>
          <Box sx={TRANSACTION_HISTORY_HEADER_WRAPPER}>
            <Box sx={TABLE_ACTIONS_WRAPPER}>
              <Typography variant="SemiBold_28" component={"h2"}>
                {TRANSACTION_HISTORY}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  sx={{ color: "white", marginTop: -0.5 }}
                  label={"Hide Balances less than 0.01"}
                  checked={isHideSmallBalanceChecked}
                  onChange={handleHideBalanceCheckBox}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Hide Balances less than 0.01 USDT"
              labelPlacement="end"
              sx={{ "& .MuiTypography-root": { fontSize: "14px", fontWeight: 400 } }}
            />
          </Box>
          <Box
            sx={{
              marginTop: 1,
              pb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box sx={{ width: "200px", display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="Regular_16" component={"p"}>
                  {"Contract"}
                </Typography>
                <Autocomplete
                  disableClearable
                  options={["All", ...activeSymbols.map((item) => item.symbol)]}
                  renderOption={(props, symbol) => (
                    <MenuItem key={symbol} sx={{ ...typographyGridSubHeader, backgroundColor: "#2e2e2e", fontSize: "14px" }} value={symbol === "Symbol" || symbol === "All" ? "" : symbol} {...props}>
                      {symbol}
                    </MenuItem>
                  )}
                  renderInput={(params) => {
                    return (
                      <TextField
                        sx={{
                          ".MuiInputBase-input": {
                            fontSize: "14px",
                            fontWeight: "600",
                            textAlign: "start",
                            width: "50% !important",
                            height: "20px !important",
                            padding: "0px !important",
                            maxHeight: "32px"
                          }
                        }}
                        size="small"
                        {...params}
                      />
                    );
                  }}
                  value={searchSymbol}
                  onChange={handleSymbolSelect}
                  size="large"
                  popupIcon={<KeyboardArrowDownIcon />}
                  sx={autoCompeleteWalletFilterStyle}
                ></Autocomplete>
              </Box>
              <Box sx={{ width: "200px", display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="Regular_16" component={"p"}>
                  {"Type"}
                </Typography>
                <Select
                  selectStyleObj={muiWalletSelectSx}
                  menuStyleObj={walletMenuSx}
                  sx={{ marginTop: -2 }}
                  values={TABS_CONSTANTS.FUTURES_FILTER_VALUES}
                  value={TabsAlignment}
                  setValue={(value) => SetTabsAlignment("", value)}
                />
              </Box>
              <Box sx={{ width: "200px", display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="Regular_16" component={"p"}>
                  {"Date"}
                </Typography>
                <DurationSelect
                  styleObj={muiWalletSelectSx}
                  options={TABS_CONSTANTS.TABLE_DURATION_FILTER_VALUE}
                  value={duration}
                  setValue={(value) => changeDuration(value)}
                  selectCustomDateRange={selectCustomDateRange}
                />
              </Box>
            </Box>
            <Box sx={TABLE_ACTIONS_WRAPPER}>
              <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 0.2 }}>
                <IconButton onClick={() => setShowDownloadModal(true)} sx={DOWNLOAD_ICON_BUTTON} disabled={disableDownloadButton}>
                  <SaveAltIcon sx={{ fontSize: "20px", marginTop: -0.5 }} />
                </IconButton>
                <Typography variant="Regular_12" component={"p"}>
                  {"Download"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 0.5 }}>
                <RefreshIcon onClick={() => RefreshButton()} sx={REFRESH_ICON_STYLE} />
                <Typography variant="Regular_12" component={"p"}>
                  {"Refresh"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Select margin values={TABS_CONSTANTS.FUTURES_FILTER_VALUES} value={TabsAlignment} setValue={(value) => SetTabsAlignment("", value)} />
        </Box>

        <Box
          sx={{
            ...TABLE_WRAPPER_STYLE,
            width: "100%",
            height: "400px",
            display: { xs: "none", md: "block" }
          }}
        >
          {/* <DataGrid
            components={{
              NoRowsOverlay: () => <TableNoRowsOverlay message="No Active Data" />,
              NoResultsOverlay: () => <TableNoRowsOverlay message="No Active Data" />
            }}
            disableSelectionOnClick
            disableColumnMenu
            loading={loading}
            rowCount={TotalCount}
            columns={column}
            rows={TransactionHistoryData}
            page={Pagination.page}
            onPageChange={ChangePage}
            pageSize={Pagination.rowsPerPage}
            onPageSizeChange={ChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row.internalId}
            getRowClassName={(params) => {
              if (params.row.internalId % 2 === 0) {
                return "data-grid-even-rows";
              }
              return "data-grid-odd-rows";
            }}
            paginationMode="server"
            pagination
          /> */}
        </Box>
      </Box>
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
    </>
  );
}
TransactionHistory.propTypes = {
  TabsAlignment: PropTypes.string,
  TotalCount: PropTypes.number,
  onSelectChangeForWeb: PropTypes.func,
  TransactionHistoryData: PropTypes.array,
  RefreshButton: PropTypes.func,
  column: PropTypes.array,
  ChangeRowsPerPage: PropTypes.func,
  ChangePage: PropTypes.func,
  SetTabsAlignment: PropTypes.func,
  Pagination: PropTypes.object,
  changeMWebPage: PropTypes.func,
  changeMWebRowsPerPage: PropTypes.func,
  duration: PropTypes.string,
  changeDuration: PropTypes.func,
  laoding: PropTypes.bool,
  selectCustomDateRange: PropTypes.func,
  searchSymbol: PropTypes.string,
  handleSymbolSelect: PropTypes.func,
  loading: PropTypes.bool,
  handleHideBalanceCheckBox: PropTypes.bool,
  isHideSmallBalanceChecked: PropTypes.func
};
