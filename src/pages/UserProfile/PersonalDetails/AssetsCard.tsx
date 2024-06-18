import React, { useState } from "react";
import arrow from "./ArrowIcon.svg";
import UsdtImage from "./UsdtImage.svg";

import InrBrightImage from "./InrBrightImage.svg";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useFiatTab } from "BL/businessHooks";
import { numberWithCommas } from "@/helpers/commaHelper";
import { useNavigate } from "react-router-dom";
import { Eyeicon } from "@/assets/icons";
import { Box, Grid, Typography } from "@mui/material";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import TextView from "@/components/UI/TextView/TextView";
import { USER_SETTING_TABS } from "../Constants";
const OpenWindowsNewTab = [
  `toolbar=no,
  location=no,
  status=no,
  menubar=no,
  scrollbars=yes,
  resizable=yes,
  width=0,
  height=0`
];
const AssetsCard = ({ IsUserVerified }: { IsUserVerified: boolean }) => {
  const [BalanceHiddenUSD, SetBalanceHiddenUSD] = useState(true);
  const [BalanceHiddenINR, SetBalanceHiddenINR] = useState(true);
  const { totalWalletBalance } = useSelector((state: any) => ({
    totalWalletBalance: state.futures.accountInfo.totalWalletBalance
  }));
  const { fiatbalance } = useFiatTab();
  const navigate = useNavigate();
  const BalanceVisibilityINR = () => {
    if (totalWalletBalance === 0) {
      return <Typography>{"---"}</Typography>;
    }
    if (BalanceHiddenINR) {
      return (
        <Typography component={"p"} variant="Medium_22" color="text.defualt">
          {"XXXX"}{" "}
          <Typography component={"span"} variant="Medium_14" color="text.defualt">
            INR
          </Typography>
        </Typography>
      );
    } else {
      return (
        <Typography component={"p"} variant="Medium_22" color="text.defualt">
          {numberWithCommas(fiatbalance)}{" "}
          <Typography component={"span"} variant="Medium_14" color="text.defualt">
            INR
          </Typography>
        </Typography>
      );
    }
  };
  const BalanceVisibilityUSD = () => {
    if (totalWalletBalance === 0) {
      return <Typography>{"---"}</Typography>;
    }
    if (BalanceHiddenUSD) {
      return (
        <Typography component={"p"} variant="Medium_22" color="text.defualt">
          {"XXXX"}{" "}
          <Typography component={"span"} variant="Medium_14" color="text.defualt">
            USDT
          </Typography>
        </Typography>
      );
    } else {
      return (
        <Typography component={"p"} variant="Medium_22" color="text.defualt">
          {totalWalletBalance && Math.trunc(totalWalletBalance * 100) / 100}{" "}
          <Typography component={"span"} variant="Medium_14" color="text.defualt">
            USDT
          </Typography>
        </Typography>
      );
    }
  };
  const BalanceVisibilityIconUSD = () => {
    return (
      <Box style={{ cursor: "pointer", mr: 1, paddingTop: 6 }} onClick={() => SetBalanceHiddenUSD(!BalanceHiddenUSD)}>
        {BalanceHiddenUSD ? (
          <Box
            sx={{
              background: "linear-gradient(to top right, #00000008 calc(50% - 1px), #fff , transparent calc(43% + 1px) )"
            }}
            component={"img"}
            src={Eyeicon}
          />
        ) : (
          <Box component={"img"} src={Eyeicon} />
        )}
      </Box>
    );
  };
  const BalanceVisibilityIconINR = () => {
    return (
      <Box component={"span"} style={{ cursor: "pointer", paddingTop: 6 }} onClick={() => SetBalanceHiddenINR(!BalanceHiddenINR)}>
        {BalanceHiddenINR ? (
          <Box
            sx={{
              background: "linear-gradient(to top right, #00000008 calc(50% - 1px), #fff , transparent calc(43% + 1px) )"
            }}
            component={"img"}
            src={Eyeicon}
          />
        ) : (
          <Box component={"img"} src={Eyeicon} />
        )}
      </Box>
    );
  };
  return (
    <Grid container p={3} xs={12} gap={2} sx={{ border: "1px solid", borderRadius: "8px", borderColor: "#44444D" }}>
      <Grid container item xs={12} justifyContent={"space-between"}>
        <Grid item xs={3}>
          <TextView text={"Assets"} variant="Bold_24" />
        </Grid>
        <Grid item xs={0.7}>
          <Box
            sx={{
              cursor: "pointer" // Set the cursor to pointer
            }}
            onClick={() =>
              navigate("/wallet", {
                state: {
                  currentTab: {
                    name: "USDT Wallet",
                    value: "usdtWallet"
                  }
                }
              })
            }
            component={"img"}
            src={arrow}
          />
        </Grid>
      </Grid>

      <Grid container item gap={2} justifyContent={"space-between"}>
        <Grid container item md={5.8} xs={12} px={3} justifyContent={"space-between"} sx={{ borderRadius: "8px", backgroundColor: "background.primary" }}>
          <Box component={"img"} mt={2} src={UsdtImage} maxHeight={"71px"} maxWidth={"69px"} />
          <Grid item container md={12} lg={8.8} sm={8} xs={12} ml={0} mt={2.3} justifyContent={"left"}>
            <Grid item container md={12} lg={12} justifyContent={"left"}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography component={"p"} variant="Medium_14" color="#8B8B97">
                  USDT Wallet Balance
                </Typography>

                {BalanceVisibilityIconUSD()}
              </Box>
            </Grid>
            <Grid item container md={12} lg={12} justifyContent={"left"}>
              {BalanceVisibilityUSD()}
            </Grid>
          </Grid>
          <Grid md={12} lg={12} sm={12} xs={12} mt={8} mb={3.5}>
            <CustomButton
              variant="secondary"
              label={"View Balance Distribution"}
              onClick={() =>
                navigate("/wallet", {
                  state: {
                    currentTab: {
                      name: "USDT Wallet",
                      value: "usdtWallet"
                    }
                  }
                })
              }
            />
          </Grid>
        </Grid>
        <Grid container item md={5.8} xs={12} px={3} justifyContent={"space-between"} sx={{ borderRadius: "8px", backgroundColor: "background.primary" }}>
          <Box component={"img"} mt={3.5} src={InrBrightImage} maxHeight={"71px"} maxWidth={"69px"} />
          <Grid item container md={12} lg={8.8} sm={8} xs={12} ml={0} mt={2.3} justifyContent={"left"}>
            <Grid item container md={12} lg={12} justifyContent={"left"}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextView text={"INR Wallet Balance"} component={"p"} variant="Medium_14" color="#8B8B97" />

                {BalanceVisibilityIconINR()}
              </Box>
            </Grid>
            <Grid item container md={12} lg={12} justifyContent={"left"}>
              {BalanceVisibilityINR()}
            </Grid>
          </Grid>
          <Grid container mt={8} mb={3.5} mr={1.5} justifyContent={"space-between"}>
            {IsUserVerified ? (
              <>
                <Grid item xs={5.5}>
                  <CustomButton
                    variant={"secondary"}
                    onClick={() =>
                      navigate("/wallet", {
                        state: {
                          currentTab: {
                            name: "INR Withdrawal",
                            value: "withdraw"
                          }
                        }
                      })
                    }
                    isDisabled={!IsUserVerified}
                    label={"WithDraw"}
                  />
                </Grid>
                <Grid item xs={5.5}>
                  <CustomButton
                    label={"Deposit"}
                    isDisabled={!IsUserVerified}
                    onClick={() =>
                      navigate("/wallet", {
                        state: {
                          currentTab: {
                            name: "INR Deposit",
                            value: "deposit"
                          }
                        }
                      })
                    }
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <CustomButton
                  variant={"primary"}
                  label={" Get Verified to Unlock"}
                  onClick={() =>
                    navigate("/user/account", {
                      state: {
                        currentTab: {
                          name: "bank Verification",
                          value: USER_SETTING_TABS.USER_VERIFICATION.value
                        }
                      }
                    })
                  }
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item container gap={1}>
        <Grid item>
          <TextView text={"How to deposit?"} variant="Medium_14" color={"text.regular"} />
        </Grid>
        <Grid item>
          <TextView
            text={"    Watch Tutorial"}
            variant="Bold_14"
            color={"text.primary"}
            style={{ cursor: "pointer" }}
            onClick={() => window.open("https://youtu.be/1HORr2mIQ0w", "targetWindow", OpenWindowsNewTab[0])}
          />
        </Grid>
        <Grid item>
          <TextView
            text={"     Read Blog"}
            variant="Bold_14"
            color={"text.primary"}
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => window.open("https://blogs.density.exchange/how-to-deposit-funds-on-density", "targetWindow", OpenWindowsNewTab[0])}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default AssetsCard;
