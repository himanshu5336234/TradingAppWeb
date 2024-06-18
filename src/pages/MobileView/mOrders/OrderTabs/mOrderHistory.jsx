import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography, Box, TablePagination, Tooltip, TextField, MenuItem, Autocomplete } from "@mui/material";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ACCODIAN, ACCORDIANGRIDITEM, ACCORDIANGRIDITEMHEADING, BORDER, FONT12, SECTIONHEIGHT } from "@/pages/MobileView/style";
import { selectBoxMenuItems } from "@/components/Home/UserActivities/UserActivitiesObjects";
import PropTypes from "prop-types";
import { useOrderHistory } from "@/frontend-BL/businessHooks";
import { EXECUTED, TOTAL_PL, AVERAGE, REDUCE_ONLY, ORDERID, TOTAL_FEE } from "@/pages/MobileView/mMagicString";
import { epochToDateConvertor, sxColorUtility } from "@/helpers";
import { numberWithCommas } from "@/helpers/commaHelper";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { IconButton } from "@mui/material/node";
import { useSelector } from "react-redux";
import { postMetaDataApi } from "@/frontend-api-service/Api";
import { disableFreshChat, enableFreshChat } from "@/frontend-BL/services/ThirdPartyServices/FreshChat";
import usePollingServiceForDownloadHistory from "@/frontend-BL/services/PollingService/usePollingServiceForDownloadHistory";
import DownloadHistoryModal from "@/components/CustomModals/newModal/DownloadHistoryModal";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
// import { getSdkMetadataForEnvelopeHeader } from "@sentry/utils";
const mOrderHistory = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { orderHistory, totalPages, orderStatus, orderType, setOrderType, setOrderStatus } = useOrderHistory({ page, rowsPerPage });
  const [disableDownloadButton, setDisableDownloaButton] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
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
      historyType: "Order History"
    });
  };

  window.fcWidget.on("widget:closed", function (resp) {
    toggleIsSupportChatVisible({ target: { checked: false } });
  });
  useEffect(() => {
    if (orderHistory.length === 0) setDisableDownloaButton(true);
    else setDisableDownloaButton(false);
  }, [orderHistory]);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const showOrderHistoryData = () => {
    if (orderHistory?.length > 0) {
      return (
        <>
          {orderHistory.map((item, index) => {
            return (
              <>
                <Grid key={item.time} item xs={12}>
                  <Accordion sx={ACCODIAN}>
                    <AccordionSummary>
                      <Grid container gap={1}>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center"
                              }}
                            >
                              <Typography
                                variant="Medium_12"
                                component={"p"}
                                sx={{
                                  px: 1.7,
                                  py: 0.4,
                                  borderRadius: "2px",
                                  backgroundColor: item.side === "LONG" ? "text.success" : "text.error",
                                  textAlign: "center",
                                  height: "fit-content"
                                }}
                              >
                                {item.side}
                              </Typography>

                              <Typography component={"p"} variant="Medium_14">
                                {item.symbol}
                              </Typography>
                              <Typography variant="Regular_11" component={"span"} sx={{ mx: "1px" }} color={"text.main"}>
                                {"|"}
                              </Typography>
                              <Typography variant="Regular_9" component={"span"}>
                                {" "}
                                {item.type}{" "}
                              </Typography>
                            </Box>
                            <Box>
                              <ExpandMoreIcon sx={{ color: "text.mild", fontSize: "28px" }} />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <Typography variant={"Regular_12"} color={"text.mild"} component={"h6"}>
                              {epochToDateConvertor(item.time)}
                            </Typography>

                            <Typography
                              sx={{
                                borderRadius: "2px",
                                backgroundColor: "rgba(130, 130, 130, 0.4)",
                                px: 1.3,
                                py: 0.3
                              }}
                              variant="Regular_10"
                            >
                              {item.status}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails sx={BORDER}>
                      <Grid container p={1} gap={2} justifyContent="space-between">
                        <Grid item xs={6} sx={ACCORDIANGRIDITEM}>
                          <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                            {ORDERID}
                          </Typography>

                          <Typography varient="h5" sx={FONT12}>
                            {`****${item?.orderId?.slice(-6)}`}
                            <Tooltip title="click here to copy orderID" placement="right-end">
                              <CopyButton copyText={item.orderId} fontSize="12px" />
                            </Tooltip>
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                          <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                            {AVERAGE}
                          </Typography>

                          <Typography varient="h5" sx={FONT12}>
                            {item.avgPrice}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={ACCORDIANGRIDITEM}>
                          <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                            {EXECUTED}
                          </Typography>
                          <Typography varient="h5" sx={FONT12}>
                            {item.executedQty}
                          </Typography>
                        </Grid>{" "}
                        <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                          <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                            {TOTAL_PL}
                          </Typography>
                          <Typography varient="h5" sx={sxColorUtility(parseFloat(item.totalPnL), { fontSize: "12px" }, "openOrder")}>
                            {parseFloat(item.totalPnL) === 0.0 ? "--" : `${numberWithCommas(item.totalPnL)}`}
                          </Typography>
                        </Grid>{" "}
                        <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                          <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                            {TOTAL_FEE}
                          </Typography>
                          <Typography varient="h5" sx={FONT12}>
                            {item.totalFee}
                          </Typography>
                        </Grid>{" "}
                        <Grid item xs={4} sx={ACCORDIANGRIDITEM}>
                          <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                            {REDUCE_ONLY}
                          </Typography>
                          <Typography varient="h5" sx={FONT12}>
                            {item.reduceOnly}
                          </Typography>
                        </Grid>{" "}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          <Box my={10}>
            <TableNoRowsOverlay message={"No data Found"} />
          </Box>
        </>
      );
    }
  };

  return (
    <>
      <Box sx={SECTIONHEIGHT}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            paddingX: 0.5,
            mb: 2
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Autocomplete
              disableClearable
              options={[...selectBoxMenuItems?.orderType?.map((item) => item.name)]}
              renderOption={(props, type) => (
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    textAlign: "center"
                  }}
                  key={type}
                  value={type === "Order Type" ? "All" : type}
                  {...props}
                >
                  {type === "Order Type" ? "All" : type}
                </MenuItem>
              )}
              renderInput={(params) => {
                return (
                  <TextField
                    sx={{
                      ".MuiInputBase-input": {
                        fontSize: "12.5px",
                        fontWeight: "600",
                        textAlign: "center",
                        width: "50% !important",
                        height: "18px !important",
                        padding: "0px !important"
                      }
                    }}
                    size="small"
                    {...params}
                  />
                );
              }}
              value={orderType}
              onChange={(event, newValue) => {
                setPage(0);
                setOrderType(newValue);
              }}
              sx={{
                width: "150px",
                "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                  paddingRight: "1rem"
                }
              }}
              size="small"
            />
            <Autocomplete
              disableClearable
              options={[...selectBoxMenuItems?.status?.map((item) => item.name)]}
              renderOption={(props, status) => (
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    textAlign: "center"
                  }}
                  key={status}
                  value={status === "Status" ? "All" : status}
                  {...props}
                >
                  {status === "Status" ? "All" : status}
                </MenuItem>
              )}
              renderInput={(params) => {
                return (
                  <TextField
                    sx={{
                      ".MuiInputBase-input": {
                        fontSize: "12.5px",
                        fontWeight: "600",
                        textAlign: "center",
                        width: "50% !important",
                        height: "18px !important",
                        padding: "0px !important"
                      }
                    }}
                    size="small"
                    {...params}
                  />
                );
              }}
              value={orderStatus}
              onChange={(event, newValue) => {
                setPage(0);
                setOrderStatus(newValue);
              }}
              size="small"
              sx={{
                width: "130px",
                "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                  paddingRight: "1rem"
                }
              }}
            />
          </Box>
          <IconButton onClick={() => setShowDownloadModal(true)} disabled={disableDownloadButton}>
            <SaveAltIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>
        <Grid container justifyContent={"center"} gap="10px" p={1}>
          {showOrderHistoryData()}
        </Grid>
        <TablePagination
          sx={{
            color: "#FCFCFC",
            width: "100vw",
            ".MuiTablePagination-toolbar": {
              padding: "0px !important"
            }
          }}
          rowsPerPageOptions={[5, 10, 20]}
          count={totalPages}
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
        title="Order History"
      />
      <DownloadHistoryModal
        IsOpen={loaderData.isLoadingOpen}
        title={"Order History"}
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
        title={"Order History"}
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
