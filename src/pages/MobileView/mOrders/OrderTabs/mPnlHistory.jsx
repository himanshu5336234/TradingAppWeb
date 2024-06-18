import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography, Box, TablePagination, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { ACCODIAN, ACCORDIANGRIDITEM, ACCORDIANGRIDITEMHEADING, BORDER, FONT12, SECTIONHEIGHT } from "@/pages/MobileView/style";
import PropTypes from "prop-types";
import { ENTRY_TIME, ENTRY_PRICE, FEE_PAID, EXIT_TIME, EXIT_PRICE } from "@/pages/MobileView/mMagicString";
import { usePnLHistory } from "@/frontend-BL/businessHooks/PnL_HISTORY/usePnLHistory";
import { epochToDateConvertor, sxColorUtility } from "@/helpers";
import { numberWithCommas } from "@/helpers/commaHelper";
import { postMetaDataApi } from "@/frontend-api-service/Api";
import { disableFreshChat, enableFreshChat } from "@/frontend-BL/services/ThirdPartyServices/FreshChat";
import usePollingServiceForDownloadHistory from "@/frontend-BL/services/PollingService/usePollingServiceForDownloadHistory";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useSelector } from "react-redux";
import DownloadHistoryModal from "@/components/CustomModals/newModal/DownloadHistoryModal";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import MpnlHistoryRow from "./MpnlHistoryRow";
import CustomCheckBox from "@/components/UI/CheckBox/CustomCheckBox";
const mOrderHistory = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { PnLHistory, totalPageData } = usePnLHistory({ page, rowsPerPage });
  const [disableDownloadButton, setDisableDownloaButton] = useState(false);
  const { profileDetails } = useSelector((state) => state.profile);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
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

  const handleDownloadCSV = () => {
    // api call
    setShowDownloadModal(false);

    getDownloadID({
      startTime: downloadDateRange.from,
      endTime: downloadDateRange.to,
      historyType: "P&L History"
    });
  };

  window.fcWidget.on("widget:closed", function (resp) {
    toggleIsSupportChatVisible({ target: { checked: false } });
  });
  useEffect(() => {
    if (PnLHistory.length === 0) setDisableDownloaButton(true);
    else setDisableDownloaButton(false);
  }, [PnLHistory]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const showPnlHistoryData = () => {
    return (
      <>
        {PnLHistory?.length === 0 && (
          <Box my={10}>
            <TableNoRowsOverlay message={"No data Found"} />
          </Box>
        )}
        {PnLHistory.map((item, index) => {
          return <MpnlHistoryRow key={index} data={item} hideOtherPairs={hideOtherPairs} />;
        })}
      </>
    );
  };
  const [hideOtherPairs, setHideOtherPairs] = useState(false);

  return (
    <>
      <Box sx={SECTIONHEIGHT}>
        <Grid container justifyContent={"center"} gap="10px">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              paddingX: 0.5,
              gap: "10px",
              alignItems: "center"
            }}
          >
            <Box>
              <CustomCheckBox
                varient="primary"
                label="  Hide Other Pairs"
                id="don't-show-me-checkbox"
                checked={hideOtherPairs}
                onchange={(e) => {
                  setHideOtherPairs(e?.target.checked);
                }}
              />
            </Box>
            <IconButton onClick={() => setShowDownloadModal(true)} disabled={disableDownloadButton}>
              <SaveAltIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
          {showPnlHistoryData()}
        </Grid>
        <TablePagination
          sx={{ color: "#FCFCFC", width: "100vw" }}
          rowsPerPageOptions={[5, 10, 20]}
          count={totalPageData}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
        title="P&L History"
      />
      <DownloadHistoryModal
        IsOpen={loaderData.isLoadingOpen}
        title={"P&L History"}
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
        title={"P&L History"}
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
};
mOrderHistory.propTypes = {
  index: PropTypes.number
};
export default memo(mOrderHistory);
