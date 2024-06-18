import { Box, IconButton, Link, ListItemText, Menu, MenuItem, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCheckLoginStatus } from "BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import internetConnectionStatus from "@/hooks/internetConnectionStatus";
import { DENSITY_WS_CONNECT, DENSITY_WS_DISCONNECT, SET_TICKER_DATA } from "@/frontend-BL/redux/constants/Constants";
import { batch, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TradePageIcons from "./TradePageIcons";

import { getMarkPriceSnapShot, getOrderBookSnapShot } from "@/frontend-BL/redux/actions/SnapShot/GetSnapShot.ac";
import {
  getProfileApi,
  _24hrTicker
  // openInterestApi
} from "@/frontend-api-service/Api";
// import { getOpenInterest } from "@/frontend-BL/redux/actions/Futures/GetOpenInterest.ac";
import SetSelectedSymbolHelper from "@/helpers/SetSelectedSymbolHelper";
import UserPageIcons from "./UserPageIcons";
import CustomSnackbarNew from "../../UI/Snackbar/CustomSnackbarNew";
import RiskWarningModal from "../../CustomModals/newModal/RiskModalOnSignUp";
import { getBankDetail, getKyc } from "BL/redux/actions/User/UserKyc.ac";
import { fetchFutureAccountDetails, GET_MARGIN_TYPE } from "@/frontend-BL/redux/actions/Futures/Futures.ac";
import { getLeverageBracket } from "@/frontend-BL/redux/actions/Futures/GetLeverageBracket.ac";
import { selectedSymbol } from "@/frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
import SupportIcon from "@/assets/icons/SideBar/SupportIcon";
import { posthog } from "posthog-js";
import { Steps } from "intro.js-react";
import { BRANCH_IO_KEY } from "@/utils/constants";

import { emailFormat, textStrings } from "./strings";
import { getSupportChat } from "../../../helpers";
import { HELP_LIST_ITEM_STYLE, HELP_LIST_LINK } from "./SideBar.styles";
import { getLeverage } from "@/frontend-BL/redux/actions/Futures/GetLeverage.ac";
import { Logo } from "../../UI/Logo";
import Topbar from "./TopBar/Topbar";
import { getUserWatchList } from "@/frontend-BL/redux/actions/User/GetWatchList.ac";
import { setProfileDetails } from "@/frontend-BL/redux/actions/User/SetProfile.ac";
import clevertap from "clevertap-web-sdk";
import Branch from "branch-sdk";
import Settings from "./Settings";
import "intro.js/introjs.css";
const SideBar = () => {
  const { isLoggedIn } = useCheckLoginStatus();
  const { isOnline } = internetConnectionStatus();
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  //Support popup menu state and handlers
  const [anchorElHelp, setAnchorElHelp] = useState(null);
  const openHelpMenu = Boolean(anchorElHelp);
  const handleOpenHelpMenu = (event: { currentTarget: React.SetStateAction<null> }) => {
    setAnchorElHelp(event.currentTarget);
  };
  const handleCloseHelpMenu = () => {
    setAnchorElHelp(null);
  };
  const leaveHelpMenu = () => {
    setTimeout(() => setAnchorElHelp(null), 300);
  };
  const { openFcSupportChat } = getSupportChat();

  const location = useLocation();
  const { profileDetails } = useSelector((state: any) => state.profile);

  // SYMBOL Snapshots and values
  const currentSymbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  const dispatch = useDispatch<any>();

  const userBankDetails = useSelector((state: any) => state.getBankDetails?.getBankDetails?.bankAccounts);
  const KycVerifiedStatus = useSelector((state: any) => state.getKycDetails?.getKycDetails?.status);

  const get24HrTickerValue = (selectValue: any) => {
    _24hrTicker(selectValue)
      .then(
        (successResponse: {
          data: {
            highPrice: any;
            lowPrice: any;
            volume: any;
            priceChange: any;
            priceChangePercent: any;
            symbol: any;
            lastPrice: any;
          };
        }) => {
          const ltp = {
            change24hHigh: successResponse.data.highPrice,
            change24hLow: successResponse.data.lowPrice,
            volume24h: successResponse.data.volume,
            change24h: successResponse.data.priceChange,
            change24hpercent: successResponse.data.priceChangePercent,
            symbol: successResponse.data.symbol,
            ltp: successResponse.data.lastPrice
          };
          dispatch({ type: SET_TICKER_DATA, payload: ltp });
        }
      )
      .catch((error: any) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (currentSymbol) {
      batch(() => {
        dispatch(getMarkPriceSnapShot(currentSymbol));
        dispatch(getOrderBookSnapShot(currentSymbol.toUpperCase()));
      });

      // getOpenInterestValue(currentSymbol || SetSelectedSymbolHelper());
      get24HrTickerValue(currentSymbol || SetSelectedSymbolHelper());

      if (isLoggedIn) {
        batch(() => {
          dispatch(GET_MARGIN_TYPE(currentSymbol));
          dispatch(getLeverage(currentSymbol.toUpperCase()));
        });
      }
    }
  }, [currentSymbol, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      batch(() => {
        dispatch(getUserWatchList());
        dispatch(setProfileDetails());
      });
    }
  }, [isLoggedIn]);

  // Global Error Handler render
  const globalErrorHandler = useSelector((state: any) => state.GlobalErrorHandler.errorDirectory);

  useEffect(() => setDoesErrorExist(true), [globalErrorHandler]);
  const RenderError = () => {
    return globalErrorHandler.map(
      (error: { errorTime: React.Key | null | undefined; errorDialogType: string | undefined; errorMessage: string | undefined; errorHandlerForReduxStateUpdation: (...args: any[]) => any }) => (
        <CustomSnackbarNew
          key={error.errorTime}
          snackbarType={error.errorDialogType}
          isSnackbarOpen={doesErrorExist}
          handleIsSnackbarOpen={setDoesErrorExist}
          snackbarTitle={error.errorMessage}
          snackbarActionDefault={error.errorHandlerForReduxStateUpdation}
        />
      )
    );
  };

  // Modal States
  // const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [doesErrorExist, setDoesErrorExist] = useState(false);
  // const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [isRiskWarningModalOpen, setisRiskWarningModalOpen] = useState(false);

  // Handle WS CONNECTION based on CONNECTION & AUTHENTICATED STATUS
  const densityWsStatus = useSelector((state: any) => state.wsConnection.density.opened);
  useEffect(() => {
    if (isLoggedIn) {
      if (isOnline && !densityWsStatus) {
        return dispatch({ type: DENSITY_WS_CONNECT });
      }
      if (!isOnline) {
        return dispatch({ type: DENSITY_WS_DISCONNECT });
      }
    }
    return () => {
      return dispatch({ type: DENSITY_WS_DISCONNECT });
    };
  }, [isLoggedIn, isOnline, densityWsStatus]);

  useEffect(() => {
    if (isLoggedIn) {
      const isSignedUp = (window as any).localStorage.getItem("isSignedUp");
      const isReferralDone = window.localStorage.getItem("isReferralDone");
      const pathname = location.pathname;
      if ((isSignedUp === true || isSignedUp === "true") && pathname === "/") {
        setisRiskWarningModalOpen(true);
        window.localStorage.removeItem("isReferralDone");
      }
      dispatch(getKyc());
      dispatch(getBankDetail());
      dispatch(getLeverageBracket());
      if (isReferralDone === null) {
        dispatch(fetchFutureAccountDetails());
      }
      getProfileApi()
        .then((successResponse: { data: any }) => {
          const loggedInUser = successResponse.data;

          const basicDetails = {
            firstName: loggedInUser?.firstName,
            lastName: loggedInUser?.lastName,
            nameAsPerPAN: loggedInUser?.nameAsPerPAN,
            lastActive: loggedInUser?.lastLogin,
            mobile_number: loggedInUser?.mobileNumber,
            email: loggedInUser?.email
          };
          clevertap.onUserLogin.push({
            Site: {
              Identity: String(loggedInUser?.email),
              Email: loggedInUser?.email,
              KycStatus: KycVerifiedStatus,
              BankStatus: userBankDetails?.length > 0 ? userBankDetails[0]?.pennyDropStatus : "",
              TradeStatus: loggedInUser?.statuses?.anyTrades,
              AnyDeposit: loggedInUser?.statuses?.anyDeposits,
              Phone: loggedInUser?.mobileNumber,
              Name: loggedInUser?.firstName + " " + loggedInUser?.lastName
            }
          });
          if (posthog.get_distinct_id() !== loggedInUser?.email) {
            posthog.identify(loggedInUser?.email, {
              phoneNumber: loggedInUser?.mobileNumber
            });
          }
          posthog.setPersonPropertiesForFlags({
            phoneNumber: loggedInUser?.mobileNumber
          });
          dispatch({ type: "GET_BASIC_DETAILS", payload: basicDetails });
        })
        .catch();
    } else {
      if (posthog.get_distinct_id()?.match(emailFormat) != null) {
        posthog.reset();
      }
    }

    const symbol = JSON.parse((window as any).localStorage.getItem("orderFormData"))?.selectedSymbol;
    symbol?.length > 0 && (window.localStorage.selectedSymbolAuxiliary = symbol);
  }, [isLoggedIn]);

  //BranchIO Deeplinking
  useEffect(() => {
    // deeplink listener
    Branch.init(
      BRANCH_IO_KEY,
      (
        err: any,
        data: {
          data_parsed: { referralCode: any; type: null; selectedSymbol: any };
        }
      ) => {
        if (err) {
          console.log("referral data errr", err);
          return;
        }
        // for referral code
        if (data && data?.data_parsed?.referralCode) {
          // Handle the deep link data here
          const deepLinkData = data.data_parsed;
          localStorage.getItem("referralCode") === null && localStorage.setItem("referralCode", deepLinkData.referralCode);
        }

        // for order form data
        if (typeof data?.data_parsed !== "undefined" && typeof data?.data_parsed !== null) {
          // Handle the deep link data here
          const orderFormData = JSON.parse(localStorage.getItem("orderFormData"));

          (!orderFormData || Object.keys(orderFormData).length === 0) && localStorage.setItem("orderFormData", JSON.stringify(data.data_parsed));

          (!orderFormData || Object.keys(orderFormData).length === 0) && localStorage.setItem("orderFormData", JSON.stringify(data.data_parsed));

          isLoggedIn && dispatch(selectedSymbol(data.data_parsed.symbol));
        }
      }
    );
  }, [isLoggedIn, profileDetails?.email]);
  const [showSteps, setShowSteps] = useState(false);
  const initialStep = 0;

  const steps = [
    {
      element: ".productTour__step1",
      intro: textStrings.STEP1TEXT,
      position: "right",
      // tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass"
    },
    {
      element: ".productTour__step2",
      position: "left",
      intro: textStrings.STEP2TEXT,
      tooltipClass: "myTooltipClass"
    },
    {
      element: ".productTour__step3",
      position: "left",
      intro: textStrings.STEP3TEXT,
      tooltipClass: "myTooltipClass"
    },
    {
      element: ".productTour__step4",
      position: "left",
      intro: textStrings.STEP4TEXT,
      tooltipClass: "myTooltipClass"
    },
    {
      element: ".productTour__step5",
      position: "left",
      intro: textStrings.STEP5TEXT,
      tooltipClass: "myTooltipClass"
    },
    {
      element: ".productTour__step6",
      position: "left",
      intro: textStrings.STEP6TEXT,
      tooltipClass: "myTooltipClass"
    },
    {
      element: ".productTour__step7",
      position: "left",
      intro: textStrings.STEP7TEXT,
      tooltipClass: "myTooltipClass"
    },
    {
      element: ".productTour__step8",
      position: "left",
      intro: textStrings.STEP8TEXT,
      tooltipClass: "myTooltipClass"
    }
  ];

  const renderOnboardingModals = () => {
    return (
      <>
        {isRiskWarningModalOpen && (
          <RiskWarningModal
            IsOpen={isRiskWarningModalOpen}
            isClose={true}
            primaryAction={() => {
              setisRiskWarningModalOpen(false);
              localStorage.removeItem("isSignedUp");
              if (isLargeScreen) {
                setShowSteps(true);
              }
            }}
          />
        )}
        {showSteps && (
          <Steps
            enabled={showSteps}
            steps={steps}
            options={{
              showStepNumbers: true,
              showBullets: false,
              exitOnOverlayClick: false,
              doneLabel: "Finish",
              nextLabel: "Next",
              prevLabel: "Previous",
              hideNext: false,
              showProgress: false,
              tooltipClass: "myTooltipClass"
            }}
            initialStep={initialStep}
            onExit={() => {
              setShowSteps(false);
            }}
          />
        )}
      </>
    );
  };

  // support menu
  const renderSupportMenu = () => {
    return (
      <Menu
        sx={{
          "& .MuiMenu-list": { backgroundColor: "neutral.grey2" },
          "& .MuiMenu-paper": {
            marginLeft: 3.5
          }
        }}
        anchorEl={anchorElHelp}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={openHelpMenu}
        onClose={handleCloseHelpMenu}
        MenuListProps={{
          onMouseLeave: leaveHelpMenu
        }}
      >
        {isLoggedIn && !window.location.href.includes("auth") && (
          <MenuItem sx={HELP_LIST_ITEM_STYLE} onClick={() => openFcSupportChat()}>
            <ListItemText primary="Contact Support" />
          </MenuItem>
        )}
        <MenuItem sx={HELP_LIST_ITEM_STYLE}>
          <Link sx={HELP_LIST_LINK} target="_blank" href="https://densityexchange.freshdesk.com/a/dashboard/omnichannel/default">
            <ListItemText primary="Report a Ticket" />
          </Link>
        </MenuItem>
        <MenuItem sx={HELP_LIST_ITEM_STYLE} onClick={() => null}>
          <Link sx={HELP_LIST_LINK} target="_blank" href="https://t.me/DensityCommunityOfficial">
            <ListItemText primary="Join Telegram Community" />
          </Link>
        </MenuItem>
      </Menu>
    );
  };

  return (
    <Box sx={{ height: { md: "100%", xs: "40px" }, position: "relative" }}>
      {RenderError()}
      {renderOnboardingModals()}
      {!isLargeScreen && <Topbar />}
      {isLargeScreen && (
        <Box
          sx={{
            display: "flex",
            // position: "fixed",
            width: "60px",
            py: "15px",
            px: 0.5,
            backgroundColor: "neutral.grey2",
            // marginBottom: "30px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            zIndex: 100
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2
            }}
          >
            <Box
              sx={{
                // p: 1,
                border: "0.5px solid #383840",
                height: "40px",
                width: "40px",
                borderRadius: "8px",
                backgroundColor: "neutral.grey1"
              }}
            >
              <Logo
                withName={false}
                style={{
                  margin: " 7px auto",
                  width: "23px"
                }}
              />
            </Box>
            <TradePageIcons />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px"
            }}
          >
            {isLoggedIn && <UserPageIcons />}
            <Box aria-controls={openHelpMenu ? "dropdown-menu" : undefined} aria-haspopup="true" aria-expanded={openHelpMenu ? "true" : undefined} onClick={handleOpenHelpMenu}>
              <SupportIcon />
              {renderSupportMenu()}
            </Box>
            <Settings />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SideBar;
