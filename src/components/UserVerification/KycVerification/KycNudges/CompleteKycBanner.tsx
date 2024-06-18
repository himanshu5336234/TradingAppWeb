import React from "react";
import { Grid, Box } from "@mui/material";
import GetVerifiedImage from "ASSETS/images/GetVerified.svg";
import Verified from "ASSETS/images/userSettings/ReferralTabs/Verified.svg";

import { useSelector } from "react-redux";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import TextView from "@/components/UI/TextView/TextView";

import { useNavigate } from "react-router-dom";

const CompleteKycBanner = ({ kycMessage = "Complete KYC to start trading and compete with the best of the best!", marginTop = 8 }: { kycMessage?: string; marginTop: number }) => {
  const navigate = useNavigate();

  const { profileDetails } = useSelector((state: any) => state.profile);
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

  return (
    <Box>
      {!profileDetails?.statuses?.kycVerified ? (
        <Grid
          container
          xs={12}
          p={3}
          mt={marginTop}
          mb={2}
          display={"flex"}
          flex-wrap={"wrap"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          bgcolor={"#302C1D"}
          sx={{
            borderRadius: "8px",
            border: "1.6px solid var(--get-verified-gradient, #FFB500)"
          }}
        >
          <Grid item xs={9} container>
            <Grid item xs={7}>
              <TextView variant={"Medium_16"} text={kycMessage} />
            </Grid>
            <Grid item xs={4}>
              <CustomButton
                style={{
                  maxWidth: "220px",
                  paddingX: "40px",
                  paddingY: "10px",
                  marginLeft: "60px"
                }}
                onClick={() =>
                  navigate("/user/kyc", {
                    state: {
                      currentTab: {
                        name: "KYC Verification",
                        value: USER_SETTING_TABS.USER_VERIFICATION.value
                      }
                    }
                  })
                }
                label={"Complete KYC"}
                variant={"primary"}
              />
            </Grid>
          </Grid>
          <Grid item xs={2}>
            {" "}
            <Box component="img" src={GetVerifiedImage} mt={-9} />
          </Grid>
        </Grid>
      ) : !profileDetails?.statuses?.bankVerified && profileDetails?.statuses?.kycVerified ? (
        <Grid
          container
          gap={4}
          xs={12}
          p={3}
          mt={6}
          mb={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          bgcolor={"#302C1D"}
          sx={{
            borderRadius: "8px",
            border: "1.6px solid var(--get-verified-gradient, #FFB500)"
          }}
        >
          <Grid item xs={9} container>
            <Grid item xs={6}>
              <TextView variant={"Medium_16"} text={"Link and verify your bank account to start adding Fund"} />
            </Grid>
            <Grid item xs={5}>
              <CustomButton
                style={{
                  maxWidth: "420px",
                  paddingX: "40px",
                  paddingY: "10px",
                  marginLeft: "60px"
                }}
                onClick={() =>
                  navigate("/user/account", {
                    state: {
                      currentTab: {
                        name: "Bank Verification",
                        value: USER_SETTING_TABS.USER_VERIFICATION.value
                      }
                    }
                  })
                }
                label={" Complete Bank Verification"}
                variant={"primary"}
              />
            </Grid>
          </Grid>
          <Grid item xs={2}>
            {" "}
            <Box component="img" src={Verified} mt={-9} />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default CompleteKycBanner;
