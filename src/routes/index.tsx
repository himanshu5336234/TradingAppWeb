import TradeScreen from "../pages/TradeScreen/TradeScreen";
import ServerDownHelper from "../pages/ErrorHandlerAuxiliary/ServerDownHelper";
import InternetDownHelper from "../pages/ErrorHandlerAuxiliary/InternetDownHelper";
import RouteNotFoundHelper from "../pages/ErrorHandlerAuxiliary/RouteNotFoundHelper";
// import JavascriptCodeBreakHelper from "../pages/ErrorHandlerAuxiliary/JavascriptCodeBreakHelper";
import MarketScreen from "../pages/Market/MarketScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Dispatch, useEffect } from "react";
import { useCheckLoginStatus } from "BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import { APIManagement } from "@/pages/APIManagement";
//import TradingViewFullScreenChartContainer from "../pages/FullScreenChartContainer/TradingviewFullScreenContainer";
import AccountVerification from "@/pages/UserVerification/AccountVerification/AccountVerification";
import PersonalDetails from "../pages/UserProfile/PersonalDetails/PersonalDetails";
import ProtectedRouteWrapper from "@/helpers/ProtectedRouteWrapper";
import SignIn from "@/pages/Onboarding/SignIn/SignIn";
import Signup from "@/pages/Onboarding/SignUp/SignUpOnboardingScreen";
import ResetPassword from "@/pages/Onboarding/SignIn/ResetPassword";
import AuthRouter from "@/helpers/AuthRouter";
import UnprotectedRouteWrapperForFirstFactor from "@/helpers/UnprotectedRouteWrapperForFirstFactor";
import UnprotectedRouteWrapperForSecondFactor from "@/helpers/UnprotectedRouteWrapperForSecondFactor";
import MobileVerification from "@/pages/Onboarding/SignUp/MobileVerification";
import AuthorisationCallback from "@/pages/Onboarding/AuthorisationCallback";
// import MOrders from "@/pages/MobileView/mOrders/MOrders";
import Referral from "@/pages/UserProfile/Rewards/ReferralTab";
import Rebate from "@/pages/UserProfile/Rewards/RebateTab/Rebate";
import LeaderBoard from "@/pages/LeaderBoard/LeaderBoard";
import Wallet from "@/pages/UserProfile/Wallet/Wallet";
import SignalTrading from "../pages/SignalTrading";
import ReferralWeb from "@/pages/Onboarding/Referral/Referral";
import { useFeatureFlagEnabled } from "posthog-js/react";
import AnalystDashboard from "@/components/SignalTrading/AnalystDashboard";
import FollowerDashboard from "@/components/SignalTrading/Follower/FollowerDashboard";
import MarketScreenNews from "../components/Market/MarketScreenNews";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPersonna } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";
import Home from "@/pages/Home/Home";
import SignInOTPVerification from "@/pages/Onboarding/SignIn/SignInOTPVerification";
import { Box, useMediaQuery } from "@mui/material";

import { UserReferralAndRebate } from "@/pages/UserProfile/ReferralAndRebate/UserReferralAndRebate";
import KYCHome from "@/pages/UserVerification/KYCVerification/KYCHome";
import RouteNotFound from "@/pages/ErrorHandlerAuxiliary/RouteNotFound";
import Portfolio from "@/pages/Portfolio/Portfolio";
export default function AppRouter() {
  const mobile = useMediaQuery("(max-width:768px)");
  const { isLoggedIn } = useCheckLoginStatus();
  const showReferral = useFeatureFlagEnabled("referral-rebate");
  const showSignalTrading = useFeatureFlagEnabled("signal-trading");

  const { userType } = useSelector((state: any) => state.SignalTrading.userPersonna);
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserPersonna());
    }
  }, [isLoggedIn]);
  const isLargeScreen = useMediaQuery("(min-width:768px)");
  const isReferral = () => window.localStorage.getItem("isReferralDone");
  return (
    <>
      <Router>
        {isLargeScreen ? (
          <Routes>
            <Route
              path="/auth"
              element={
                <>
                  <AuthRouter />
                </>
              }
            />
            <Route
              path="/auth/signin"
              element={
                <UnprotectedRouteWrapperForFirstFactor>
                  <SignIn />
                </UnprotectedRouteWrapperForFirstFactor>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <UnprotectedRouteWrapperForFirstFactor>
                  <Signup />
                </UnprotectedRouteWrapperForFirstFactor>
              }
            />
            <Route path="/auth/callback/google" element={<AuthorisationCallback />} />
            <Route
              path="/auth/signup/second-factor"
              element={
                <UnprotectedRouteWrapperForSecondFactor>
                  <MobileVerification />
                </UnprotectedRouteWrapperForSecondFactor>
              }
            />
            <Route
              path="/auth/second-factor"
              element={
                <UnprotectedRouteWrapperForSecondFactor>
                  <SignInOTPVerification />
                </UnprotectedRouteWrapperForSecondFactor>
              }
            />
            <Route
              path="/auth/signin/reset-password"
              element={
                <UnprotectedRouteWrapperForFirstFactor>
                  <ResetPassword />
                </UnprotectedRouteWrapperForFirstFactor>
              }
            />
            <Route path="/" element={<Home />}>
              <Route path="/" element={<TradeScreen />} />
              <Route path="/market" element={<MarketScreen />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route
                path="/portfolio"
                element={
                  <>
                    {" "}
                    <ProtectedRouteWrapper>
                      <Portfolio />
                    </ProtectedRouteWrapper>
                  </>
                }
              />
              {showSignalTrading && (
                <Route
                  path="/signal-trading"
                  element={
                    <>
                      <ProtectedRouteWrapper>
                        <SignalTrading />
                      </ProtectedRouteWrapper>
                    </>
                  }
                />
              )}
              {/* Remove this route ank redirect to the market screen with states  */}
              <Route path="/market/all-news" element={<MarketScreenNews />} />

              {/* <Route
              path="/orders"
              element={
                <ProtectedRouteWrapper>
                  <MOrders />
                </ProtectedRouteWrapper>
              }
            /> */}

              <Route
                path="/api_management"
                element={
                  <ProtectedRouteWrapper>
                    <APIManagement />
                  </ProtectedRouteWrapper>
                }
              />

              {showSignalTrading && userType === "ANALYST" && (
                <Route
                  path="/signal-trading/analyst"
                  element={
                    <>
                      <ProtectedRouteWrapper>
                        <AnalystDashboard />
                      </ProtectedRouteWrapper>
                    </>
                  }
                />
              )}

              {showSignalTrading && userType === "FOLLOWER" && (
                <Route
                  path="/signal-trading/user"
                  element={
                    <>
                      <ProtectedRouteWrapper>
                        <FollowerDashboard />
                      </ProtectedRouteWrapper>
                    </>
                  }
                />
              )}

              {isReferral() && (
                <Route
                  path="/referral"
                  element={
                    <>
                      <ProtectedRouteWrapper>
                        <ReferralWeb />
                      </ProtectedRouteWrapper>
                    </>
                  }
                />
              )}

              <Route
                path="/wallet"
                element={
                  <ProtectedRouteWrapper>
                    <Wallet />
                  </ProtectedRouteWrapper>
                }
              />
              {showReferral && (
                <>
                  <Route path="/reward/referral" element={<Referral />} />
                  <Route path="/reward/rebate" element={<Rebate />} />
                </>
              )}
              <Route
                path="/referral_rebate"
                element={
                  <ProtectedRouteWrapper>
                    <UserReferralAndRebate />
                  </ProtectedRouteWrapper>
                }
              />
              <Route path="/user" element={<ProtectedRouteWrapper>{!mobile ? <PersonalDetails /> : <RouteNotFound />}</ProtectedRouteWrapper>} />
              <Route path="/user/account" element={<ProtectedRouteWrapper>{!mobile ? <AccountVerification /> : <RouteNotFound />}</ProtectedRouteWrapper>} />
              <Route path="/user/kyc" element={<ProtectedRouteWrapper>{!mobile ? <KYCHome /> : <RouteNotFound />}</ProtectedRouteWrapper>} />
            </Route>

            <Route path="/server-down-helper" element={<ServerDownHelper />} />
            <Route path="/internet-down-helper" element={<InternetDownHelper />} />
            {/* <Route path="/javascript-break-helper" element={<JavascriptCodeBreakHelper />} /> */}

            <Route path="*" element={<RouteNotFoundHelper />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Box sx={{ height: "100vh" }}>
                  <RouteNotFound />
                </Box>
              }
            />
            <Route path="*" element={<RouteNotFoundHelper />} />
          </Routes>
        )}
      </Router>
    </>
  );
}
