import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Thether from "../../assets/images/Walletimages/Thether.svg";
import INR from "../../assets/images/Walletimages/INR.svg";
import ArrowIcon from "../../assets/images/Walletimages/ArrowIcon.svg";
import Eye from "@/assets/images/Walletimages/Eye.svg";
import EyesHideIcon from "@/assets/images/Walletimages/EyesHideIcon.svg";
import CustomButton from "../UI/CustomButton/CustomButton";
import { fetchFiatBalanceApi } from "../../frontend-api-service/Api";
import { useSelector, useDispatch } from "react-redux";
import { showSnackBar } from "../../frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import ConvertINRUSDTBtn from "./ConvertINRUSDTBtn";
// import CompleteVerificationNudge from "@/components/NewWallet/CompleteVerificationNudge";
import { useNavigate } from "react-router-dom";
import { USER_SETTING_TABS } from "@/pages/UserProfile/Constants";
import { CONVERT_BUTTON_WALLET_PAGE, CURRENCY_CARD_MAIN_CONTAINER, IMAGE_CONTAINER_CURRENCY_CARD } from "./styles";
import TextView from "../UI/TextView/TextView";
import CompleteKycBanner from "../UserVerification/KycVerification/KycNudges/CompleteKycBanner";
interface State {
  futures: {
    accountInfo: {
      totalWalletBalance: string;
    };
  };
}
interface WalletReducer {
  walletScreenRender: {
    walletScreenRenderFlag: boolean;
  };
}
interface SuccessResponse {
  data: {
    balance: number;
  };
}
const WalletNew = ({ IsKycVerified, IsUserVerified }: { IsKycVerified: boolean; IsUserVerified: boolean }) => {
  const navigate = useNavigate();
  const totalBalance = useSelector((state: State) => state.futures.accountInfo.totalWalletBalance);
  const [fiatBalance, setFiatBalance] = useState(0);
  const [showFiatBalance, setShowFiatBalance] = useState(false);
  const [showUSDTBalance, setShowUSDTBalance] = useState(false);
  const walletScreenRenderBoolean = useSelector((state: WalletReducer) => state.walletScreenRender.walletScreenRenderFlag);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchFiatBalanceApi()
      .then((successResponse: SuccessResponse) => {
        setFiatBalance(Math.trunc(successResponse.data.balance * 100) / 100);
      })
      .catch((errorResponse: any) => {
        dispatch(
          showSnackBar({
            src: "FETCHING_FIAT_BALANCE_FAILED",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
  }, [walletScreenRenderBoolean]);
  return (
    <>
      <CompleteKycBanner marginTop={8} kycMessage={"Complete your KYC and verify your bank account to start Withdrawing funds from wallet."} />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between"
        }}
      >
        <Box sx={CURRENCY_CARD_MAIN_CONTAINER}>
          <Box sx={IMAGE_CONTAINER_CURRENCY_CARD}>
            <img src={Thether} />
            <Box
              sx={{ height: "36px" }}
              mt={2}
              component={"img"}
              src={ArrowIcon}
              onClick={() =>
                navigate(USER_SETTING_TABS.USDT_WALLET.route, {
                  state: {
                    currentTab: {
                      name: USER_SETTING_TABS.USDT_WALLET.name,
                      value: USER_SETTING_TABS.USDT_WALLET.value
                    }
                  }
                })
              }
            />
          </Box>
          <Grid container mt={2}>
            <Grid container gap={1} item xs={12}>
              <TextView variant="Medium_16" color={"text.regular"} text={"USDT Wallet Balance"}></TextView>
              {showUSDTBalance ? (
                <img src={Eye} onClick={() => setShowUSDTBalance(false)} style={{ cursor: "pointer" }} />
              ) : (
                <img src={EyesHideIcon} onClick={() => setShowUSDTBalance(true)} style={{ cursor: "pointer" }} />
              )}
            </Grid>
            <Grid item>
              <TextView variant="Bold_32">
                {showUSDTBalance ? (totalBalance ? Number(totalBalance)?.toFixed(2) : "--") : "XXXX"}
                <TextView component={"span"} style={{ ml: 1 }} variant="Medium_22" text={"USDT"}></TextView>
              </TextView>
            </Grid>
          </Grid>

          <CustomButton
            label={"View Balance Distribution"}
            variant={"secondary"}
            onClick={() => {
              navigate(USER_SETTING_TABS.USDT_WALLET.route, {
                state: { currentTab: USER_SETTING_TABS.USDT_WALLET }
              });
            }}
            style={{
              mt: 4
            }}
          />

          <Box></Box>
        </Box>

        <Box sx={CURRENCY_CARD_MAIN_CONTAINER}>
          <Box sx={IMAGE_CONTAINER_CURRENCY_CARD}>
            <img src={INR} />
            <Box
              sx={{ height: "36px" }}
              mt={2}
              component={"img"}
              src={ArrowIcon}
              onClick={() => {
                navigate(USER_SETTING_TABS.INR_WALLET.route, {
                  state: { currentTab: USER_SETTING_TABS.INR_WALLET }
                });
              }}
            />
          </Box>
          <Grid container mt={2}>
            <Grid container gap={1} item xs={12}>
              <TextView variant="Medium_16" color={"text.regular"} text={"INR Wallet Balance"}></TextView>
              {showFiatBalance ? (
                <img src={Eye} onClick={() => setShowFiatBalance(false)} style={{ cursor: "pointer" }} />
              ) : (
                <img src={EyesHideIcon} onClick={() => setShowFiatBalance(true)} style={{ cursor: "pointer" }} />
              )}
            </Grid>
            <Grid item>
              <TextView variant="Bold_32">
                {showFiatBalance ? (fiatBalance ? Number(fiatBalance)?.toFixed(2) : "--") : "XXXX"}
                <TextView component={"span"} style={{ ml: 1 }} variant="Medium_22" text={"INR"}></TextView>
              </TextView>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 4
            }}
          >
            <CustomButton
              label={"Withdraw"}
              variant={"secondary"}
              isDisabled={!IsUserVerified}
              onClick={() => {
                navigate(USER_SETTING_TABS.WITHDRAW_WALLET.route, {
                  state: { currentTab: USER_SETTING_TABS.WITHDRAW_WALLET }
                });
              }}
            />
            <CustomButton
              label={"Deposit"}
              variant={"primary"}
              isDisabled={!IsUserVerified}
              onClick={() => {
                navigate(USER_SETTING_TABS.DEPOSIT_WALLET.route, {
                  state: { currentTab: USER_SETTING_TABS.DEPOSIT_WALLET }
                });
              }}
            />
          </Box>

          <Box></Box>
        </Box>
      </Box>

      <Box sx={CONVERT_BUTTON_WALLET_PAGE}>
        <ConvertINRUSDTBtn IsUserVerified={IsUserVerified} />
      </Box>
    </>
  );
};

export default WalletNew;
