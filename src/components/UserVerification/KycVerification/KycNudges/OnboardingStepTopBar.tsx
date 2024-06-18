import React, { useCallback } from "react";

import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TextView from "../../../UI/TextView/TextView";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useCheckLoginStatus } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import CustomCheckBox from "@/components/UI/CheckBox/CustomCheckBox";
import Loader from "@/components/UI/Loader";
const OnboardingStepTopBar = () => {
  const navigate = useNavigate();
  const USER_SETTING_TABS = {
    SECURITY: {
      name: "Security",
      route: "/setting/security",
      value: "security"
    },
    USER_VERIFICATION: {
      name: "User Verification",
      route: "/user",
      value: "user-verification"
    }
  };
  // Define types for Redux state
  const { isLoggedIn } = useCheckLoginStatus();

  const { profileDetails } = useSelector((state: any) => state.profile);
  const handleLinkToKyc = () => {
    navigate("/user/kyc", {
      state: { currentTab: USER_SETTING_TABS.USER_VERIFICATION }
    });
  };

  const handleLinkToBank = () => {
    navigate("/user/account", {
      state: { currentTab: USER_SETTING_TABS.USER_VERIFICATION }
    });
  };

  const handleLinkToTrade = () => {
    navigate("/");
  };

  const getNavigateText = () => {
    if (!profileDetails?.statuses?.kycVerified) {
      return "Complete KYC";
    } else if (!profileDetails?.statuses?.bankVerified) {
      return "Complete Bank Verification";
    } else if (!profileDetails?.statuses?.anyDeposits) {
      return "Deposit Fund";
    }
    return "Trade Now";
  };

  const handleActionClick = () => {
    if (!profileDetails?.statuses?.kycVerified) {
      handleLinkToKyc();
    } else if (!profileDetails?.statuses?.bankVerified) {
      handleLinkToBank();
    } else if (!profileDetails?.statuses?.anyDeposits) {
      handleLinkToWallet();
    } else if (!profileDetails?.statuses?.anyTrades) {
      handleLinkToTrade();
    }
  };

  const handleLinkToWallet = () => {
    navigate("/wallet", {
      state: { currentTab: USER_SETTING_TABS.USER_VERIFICATION }
    });
  };
  const showUI = useCallback(
    (statuses: { kycVerified: boolean; bankVerified?: boolean; anyDeposits?: boolean; anyTrades?: boolean }, isLoggedIn: boolean) => {
      if (statuses) {
        const { kycVerified, bankVerified, anyDeposits, anyTrades } = statuses;
        if (!kycVerified || !bankVerified || !anyDeposits || !anyTrades) {
          return (
            <Grid
              container
              alignItems={"center"}
              gap={1}
              py={"5px"}
              px={"10px"}
              bgcolor={"#302C1D"}
              zIndex={100}
              sx={{
                position: "sticky",
                top: 0,
                borderRadius: "4px",
                display: { xs: "none", md: "flex" },
                border: "1px solid var(--get-verified-gradient, #FFB500)",
                borderTopWidth: "0px"
              }}
            >
              <Grid item>
                <CustomCheckBox
                  checked={isLoggedIn}
                  disabled={true}
                  label={
                    <TextView
                      variant="Medium_12"
                      text={"Create Account"}
                      onClick={() => navigate("/auth/signup")}
                      style={{
                        cursor: "pointer",
                        color: isLoggedIn ? "#EBB62F" : "text.regular"
                      }}
                    />
                  }
                  onchange={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  id={""}
                  varient={"secondary"}
                />
              </Grid>
              <Grid item>
                <TextView variant="Medium_16" component={"span"} style={{ mt: 0.2, mr: 1 }} color={isLoggedIn ? "#EBB62F" : "text.regular"} text={">"} />
              </Grid>
              <Grid item>
                <CustomCheckBox
                  checked={kycVerified}
                  disabled={true}
                  label={
                    <TextView
                      variant="Medium_12"
                      text={"Complete KYC"}
                      onClick={isLoggedIn ? handleLinkToKyc : null}
                      style={{
                        cursor: "pointer",
                        color: isLoggedIn ? "#EBB62F" : "text.regular"
                      }}
                    />
                  }
                  onchange={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  id={""}
                  varient={"secondary"}
                />
              </Grid>
              <Grid item>
                <TextView variant="Medium_16" component={"span"} style={{ mt: 0.2, mr: 1 }} color={kycVerified ? "#EBB62F" : "text.regular"} text={">"} />
              </Grid>
              <Grid item>
                <CustomCheckBox
                  checked={bankVerified}
                  disabled={true}
                  label={
                    <TextView
                      variant="Medium_12"
                      text={"Complete Bank Verification"}
                      onClick={kycVerified ? handleLinkToBank : null}
                      style={{
                        cursor: "pointer",
                        color: kycVerified ? "#EBB62F" : "text.regular"
                      }}
                    />
                  }
                  onchange={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  id={""}
                  varient={"secondary"}
                />
              </Grid>
              <Grid item>
                <TextView variant="Medium_16" component={"span"} style={{ mt: 0.2, mr: 1 }} color={bankVerified ? "#EBB62F" : "text.regular"} text={">"} />
              </Grid>
              <Grid item>
                <CustomCheckBox
                  checked={anyDeposits}
                  disabled={true}
                  label={
                    <TextView
                      variant="Medium_12"
                      text={"Deposit Funds"}
                      onClick={bankVerified ? handleLinkToWallet : null}
                      style={{
                        cursor: "pointer",
                        color: bankVerified ? "#EBB62F" : "text.regular"
                      }}
                    />
                  }
                  onchange={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  id={""}
                  varient={"secondary"}
                />
              </Grid>

              <Grid item>
                <TextView variant="Medium_16" component={"span"} style={{ mt: 0.2, mr: 1 }} color={anyDeposits ? "#EBB62F" : "text.regular"} text={">"} />
              </Grid>
              <Grid item>
                <CustomCheckBox
                  checked={anyTrades}
                  disabled={true}
                  label={
                    <TextView
                      variant="Medium_12"
                      text={"Trade"}
                      onClick={anyDeposits ? handleLinkToTrade : null}
                      style={{
                        cursor: "pointer",
                        color: anyDeposits ? "#EBB62F" : "text.regular"
                      }}
                    />
                  }
                  onchange={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  id={""}
                  varient={"secondary"}
                />
              </Grid>

              <Grid item sx={{ marginLeft: "auto", marginRight: "70px" }}>
                <TextView text={getNavigateText()} variant="Bold_12" style={{ textDecoration: "underline", cursor: "pointer" }} onClick={handleActionClick} color="#EBB62F" />
                <ArrowForwardIcon
                  onClick={handleActionClick}
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    marginLeft: "20px",
                    paddingTop: "2px"
                  }}
                />
              </Grid>
            </Grid>
          );
        } else {
          return <></>;
        }
      } else {
        return <Loader customObject={{ width: "100%", height: "2px" }} />;
      }
    },
    [profileDetails.statuses, isLoggedIn]
  );
  return <> {showUI(profileDetails?.statuses, isLoggedIn)}</>;
};

export default OnboardingStepTopBar;
