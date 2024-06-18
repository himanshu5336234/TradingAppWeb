import {
  Box,
  Grid,
  Tabs,
  Tab,
  TabProps
  // Tooltip
} from "@mui/material";
import React, { Dispatch, useEffect, useMemo, useState } from "react";
import { UA_HEADER } from "./UserActivitiesObjects";
import { OpenOrders, Positions, OrderHistory, PnLHistory } from "./UserTabs";
import { Format } from "../../../helpers/String";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_ORDERS_FETCH_SUCCESS, OPEN_ORDERS_UPDATE_SIZE_STREAM, ERASE_POSITION_DIRECTORY, CLEAR_UNREALISED_PROFITLOSS } from "../../../frontend-BL/redux/constants/Constants";
import { styled } from "@mui/material/styles";
import { fetchAllOpenOrdersApi } from "../../../frontend-api-service/Api/Futures";
// import CustomModal from "../CustomModals/newModal/CustomModal";
import DownloadHistoryModal from "../../CustomModals/newModal/DownloadHistoryModal";
import usePollingServiceForDownloadHistory from "@/frontend-BL/services/PollingService/usePollingServiceForDownloadHistory";
import { fetchAccountPositionInfo } from "@/frontend-BL/redux/actions/User/AccountInfo.ac";
import CustomDivider from "../../UI/Divider/CustomDivider";
import { useCheckLoginStatus } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import TextView from "../../UI/TextView/TextView";
import { useNavigate } from "react-router-dom";
import TotalProfitAndLossWrapper from "./TotalProfitAndLossBox/TotalProfitAndLossWrapper";
import CustomCheckBox from "@/components/UI/CheckBox/CustomCheckBox";
import { fetchFutureAccountDetails } from "@/frontend-BL/redux/actions/Futures/Futures.ac";
const UserActivities = () => {
  const [hideOtherPairs, setHideOtherPairs] = useState(false);
  const [hideTradingFee, setHideTradingFee] = useState(false);
  const [currentView, setCurrentView] = useState(0);
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const allPositionsData = useSelector((state: any) => state.positionsDirectory.currentPositions);

  // remove this state
  const [clearFilters, setClearFilters] = useState(false);
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(),
    to: new Date().getTime()
  });
  const [showDownloadCSVModal, setShowDownloadCSVModal] = useState(false);
  // remove this state
  const positionsCount = useMemo(() => {
    if (allPositionsData !== undefined) {
      return allPositionsData.filter((item: { positionAmt: any }) => Number(item.positionAmt) !== 0).length;
    }
  }, [allPositionsData]);

  const openOrdersApiData = useSelector((state: any) => state.futures.openOrders);
  const openOrdersSocketData = useSelector((state: any) => state.OpenOrdersStream.OpenOrdersStream);
  const openOrdersCount = openOrdersApiData?.length + openOrdersSocketData?.length;
  const TABSINDEX = useMemo(() => currentView, [currentView]);
  const { isLoggedIn } = useCheckLoginStatus();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchAccountPositionInfo());
      fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&&status=PARTIALLY_FILLED" }).then((openOrders: { data: { data: any } }) => {
        dispatch({
          type: OPEN_ORDERS_UPDATE_SIZE_STREAM,
          payload: []
        });
        dispatch({
          type: OPEN_ORDERS_FETCH_SUCCESS,
          payload: openOrders.data.data.map((item: any) => {
            return { ...item, notionalQuantity: Number(item.price) * Number(item.quantity) };
          })
        });
      });
      window.localStorage.removeItem("socialLoginEmail");
    }
  }, [isLoggedIn]);

  const ToggleView = () => {
    switch (TABSINDEX) {
      case 1:
        return <OpenOrders />;
      case 2:
        return <OrderHistory clearFilters={clearFilters} setClearFilters={setClearFilters} setIsDownloadDisabled={setIsDownloadDisabled} />;
      case 3:
        return <PnLHistory clearFilters={clearFilters} setClearFilters={setClearFilters} setIsDownloadDisabled={setIsDownloadDisabled} hideTradingFee={hideTradingFee} />;
      default:
        return <Positions hideOtherPairs={hideOtherPairs} />;
    }
  };

  const handleRefreshPositionsAndOpenOrders = () => {
    dispatch({ type: CLEAR_UNREALISED_PROFITLOSS });
    dispatch({
      type: ERASE_POSITION_DIRECTORY,
      payload: null
    });
    dispatch(fetchAccountPositionInfo());
    fetchAllOpenOrdersApi({ status: "NEW&status=PENDING&&status=PARTIALLY_FILLED" }).then((openOrders: { data: any }) => {
      dispatch({
        type: OPEN_ORDERS_UPDATE_SIZE_STREAM,
        payload: []
      });
      dispatch({
        type: OPEN_ORDERS_FETCH_SUCCESS,
        payload: openOrders.data.data.map((item: any) => {
          return { ...item, notionalQuantity: Number(item.price) * Number(item.quantity) };
        })
      });
    });
  };

  const handleChange = (e) => {
    const attributeValue = e.target.attributes.order.nodeValue;
    if (attributeValue === 1) {
      dispatch(fetchFutureAccountDetails());
    }
    e.stopPropagation();
    setCurrentView(Number(attributeValue));
  };
  const getDownloadModalName = () => {
    if (currentView === 2) return "Order History";
    else if (currentView === 3) return "P&L History";
  };
  const { loaderData, getDownloadID, setLoaderData } = usePollingServiceForDownloadHistory({
    historyType: getDownloadModalName(),
    dateRange
  });
  const handleDownloadCSV = () => {
    // api call
    setShowDownloadCSVModal(false);

    getDownloadID({
      startTime: dateRange.from,
      endTime: dateRange.to,
      historyType: getDownloadModalName()
    });
    // setShowDownloadProgressModal(true)
  };
  const TabPrimary = styled(Tab)<TabProps>(() => ({
    padding: "8px",
    textTransform: "none",
    margin: "0px 10px 0px 0px",
    justifyContent: "flex-end",
    alignItems: "center",
    fontFamily: "Neurial-Medium",
    fontSize: "14px",
    minHeight: "35px",
    "&:not(Mui-selected)": {
      color: "text.regular"
    },
    "&.Mui-selected": {
      color: "white"
    }
  }));

  return (
    <Box>
      <Grid
        container
        sx={{
          height: "60px",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Grid height={"100%"} item xs={currentView === 0 ? 5 : 8}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Tabs value={currentView} onChange={(e) => handleChange(e)} variant="scrollable" scrollButtons={false}>
              {UA_HEADER.map((data, index) => (
                <TabPrimary id="userActivitiesTabs" label={Format(data.name, positionsCount, openOrdersCount)} key={index} order={Number(data.order)} />
              ))}
            </Tabs>
          </Box>
        </Grid>
        {isLoggedIn && (
          <Grid height={"100%"} container alignItems={"center"} flex={1} justifyContent={"flex-end"} item>
            {currentView === 0 && (
              <>
                <Box
                  sx={{
                    display: { md: "flex", xs: "none" },
                    alignItems: "center",
                    px: 2
                  }}
                >
                  <CustomCheckBox
                    varient="primary"
                    label="  Hide Other Pairs"
                    id="don't-show-me-checkbox"
                    checked={hideOtherPairs}
                    onchange={(e) => {
                      setHideOtherPairs(e?.target.checked);
                    }}
                  />

                  <TextView onClick={handleRefreshPositionsAndOpenOrders} style={{ textDecoration: "underline", cursor: "pointer" }} variant="SemiBold_14" text={" Refresh "} />
                </Box>
                <Box
                  sx={{
                    minWidth: "310px",
                    height: "100%",

                    p: 1,
                    mr: 2,
                    borderTopRightRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <TotalProfitAndLossWrapper />
                </Box>
              </>
            )}
            {(currentView === 2 || currentView === 3) && (
              <Box
                sx={{
                  display: "flex",

                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  height: "100%",
                  gap: "24px",
                  pr: "24px"
                }}
              >
                {currentView === 3 && (
                  <CustomCheckBox
                    varient="primary"
                    label="  Hide Trading Fees"
                    id="don't-show-me-checkbox"
                    checked={hideTradingFee}
                    onchange={(e) => {
                      setHideTradingFee(e?.target.checked);
                    }}
                  />
                )}
                {currentView === 2 && (
                  <TextView
                    id={"Download-btn"}
                    onClick={() => {
                      if (isDownloadDisabled) {
                        return;
                      } else {
                        setShowDownloadCSVModal(true);
                      }
                    }}
                    color={isDownloadDisabled && "text.regular"}
                    style={{ textDecoration: "underline", cursor: isDownloadDisabled ? "not-allowed" : "pointer" }}
                    variant="SemiBold_14"
                    text={" Download "}
                  />
                )}
                {/* <Button id="Download-btn" variant="secondary" sx={{ border: "0px" }} onClick={() => setShowDownloadCSVModal(true)} disabled={isDownloadDisabled}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // width: "100%",
                      fontSize: "12px"
                    }}
                  >
                    <SaveAltIcon
                      sx={{
                        fontSize: "24px"
                      }}
                    />
                  </Box>
                </Button> */}
              </Box>
            )}
          </Grid>
        )}
        <CustomDivider alignment={""} />
      </Grid>

      {isLoggedIn && <>{ToggleView()}</>}
      {!isLoggedIn && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px"
          }}
        >
          <TextView variant={"Medium_14"}>
            <TextView style={{ cursor: "pointer", textDecoration: "undeline" }} onClick={() => navigate("/auth/signin")} color={"text.main"} text={"Log In"} />
            {" or "}
            <TextView style={{ cursor: "pointer", textDecoration: "undeline" }} onClick={() => navigate("/auth/signup")} color={"text.main"} text={" Register Now "} />
            {"to trade"}
          </TextView>
        </Box>
      )}
      <DownloadHistoryModal
        IsOpen={showDownloadCSVModal}
        isPrimaryAction={true}
        isSecondaryAction={true}
        primaryName="Confirm"
        secondaryName="Cancel"
        secondaryAction={() => {
          setShowDownloadCSVModal(false);
        }}
        primaryAction={() => {
          if (dateRange.from && dateRange.to) {
            handleDownloadCSV();
          }
        }}
        setDateRange={setDateRange}
        type="SET_PERIOD"
        dateRange={dateRange}
      />

      <DownloadHistoryModal
        IsOpen={loaderData.isFailedOpen}
        title={getDownloadModalName()}
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
        dateRange={dateRange}
        primaryAction={() => {
          setLoaderData({
            ...loaderData,
            isLoadingOpen: false,
            isFailedOpen: false
          });
        }}
      />

      <DownloadHistoryModal IsOpen={loaderData.isLoadingOpen} title={getDownloadModalName()} isSecondaryAction={false} isPrimaryAction={false} type={"REQUESTED"} dateRange={dateRange} />
    </Box>
  );
};

export default UserActivities;
