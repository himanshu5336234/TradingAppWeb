import React from "react";
import { Grid, Box } from "@mui/material";
import VerificationBannerImage from "@/assets/images/KycDigio/VerificationBannerImage.svg";
import TextView from "../../../UI/TextView/TextView";
import CustomButton from "../../../UI/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const VerificationCard = () => {
  const navigate = useNavigate();
  const { profileDetails } = useSelector((state: any) => state.profile);
  return (
    <Grid
      container
      py={4}
      px={7}
      justifyContent={"space-between"}
      gap={2}
      bgcolor={"background.primary"}
      sx={{
        borderRadius: "8px 8px 0px 0px"
      }}
    >
      <Grid item container xs={8}>
        <Grid item xs={12}>
          <TextView text={"KYC Verification Successful"} component={"p"} variant={"Medium_22"} />
          {!profileDetails?.statuses?.bankVerified && <TextView text={"Please Add your Bank Account Details"} variant={"Regular_16"} color={"text.quaternary"} />}
          {profileDetails?.statuses?.bankVerified && <TextView text={"Add Deposits and Start Trading Now"} variant={"Regular_16"} color={"text.quaternary"} />}
        </Grid>
        <Grid xs={12} md={8} lg={4} mt={4}>
          {!profileDetails?.statuses?.bankVerified && <CustomButton onClick={() => navigate("/user/account")} label={"Continue to Bank Verification"} style={{ p: 1.5 }} />}
          {profileDetails?.statuses?.bankVerified && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <CustomButton
                label={"Deposit"}
                variant="secondary"
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
              <CustomButton onClick={() => navigate("/")} label={"Trade Now"} style={{ p: 1.5 }} />
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid item xs={1.5}>
        <Box component="img" src={VerificationBannerImage} />
      </Grid>
    </Grid>
  );
};
