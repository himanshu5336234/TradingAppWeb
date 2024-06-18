import React from "react";
import { Grid, Box } from "@mui/material";
import arrow from "./ArrowIcon.svg";
import bankVerificatonImage from "./BankVerificationImage.svg";
import KYCVerificatonImage from "./KYCVerificationImage.svg";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { USER_SETTING_TABS } from "@/pages/UserProfile/Constants";
import VerifiedIcon from "./VerifiedIcon.svg";
import FailedIcon from "./Failed.svg";
import InReviewIcon from "./InReview.svg";
import NotVerifiedIcon from "./NotVerified.svg";
import TextView from "@/components/UI/TextView/TextView";
const VerificationCard = ({ IsUserKycVerified, IsUserBankVerified }: { IsUserKycVerified: boolean; IsUserBankVerified: boolean }) => {
  const navigate = useNavigate();
  const { getKycDetails } = useSelector((state: any) => state.getKycDetails);
  const { getBankDetails } = useSelector((state: any) => state.getBankDetails);

  const bankStatusTag = getBankDetails?.bankAccounts?.length > 0 && getBankDetails?.bankAccounts[0]?.pennyDropStatus;
  const verifiedBox = (
    <Grid>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "text.success",
          borderRadius: "4px"
        }}
        bgcolor={"rgba(41, 181, 126, 0.20)"}
        px={2}
        py={0.4}
      >
        <Box component={"img"} src={VerifiedIcon} mr={1} mb={-0.4} />
        <TextView text={"Verified"} variant={"Medium_12"} color={"text.success"} />
      </Box>
    </Grid>
  );
  const failedBox = (
    <Grid>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "text.error",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        bgcolor={"rgba(255, 101, 84, 0.20)"}
        px={2}
        py={0.4}
      >
        <Box component={"img"} src={FailedIcon} px={1} py={0.1} />

        <TextView text={"        Failed"} variant={"Medium_14"} color={"text.error"} />
      </Box>
    </Grid>
  );
  const pendingBox = (
    <Grid>
      <Box
        px={2}
        py={0.4}
        sx={{
          border: "1px solid",
          borderColor: "#EBB62F",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        bgcolor={"rgba(235, 182, 47, 0.20)"}
      >
        <Box component={"img"} src={InReviewIcon} px={1} py={0.1} />
        <TextView text={"In Review"} variant={"Medium_14"} color={"#EBB62F"} />
      </Box>
    </Grid>
  );
  const NotVerifiedBox = (
    <Grid>
      <Box
        px={2}
        py={0.4}
        sx={{
          border: "1px solid",
          borderColor: "text.error",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        bgcolor={"rgba(255, 101, 84, 0.20)"}
      >
        <Box component={"img"} src={NotVerifiedIcon} px={1} py={0.1} />
        <TextView text={"Not Verified"} variant={"Medium_14"} color={"text.error"} />
      </Box>
    </Grid>
  );
  return (
    <>
      <Grid
        container
        p={2}
        gap={2}
        justifyContent={"space-between"}
        sx={{
          border: "0.5px solid",
          borderRadius: "8px",
          borderColor: "#44444D"
        }}
      >
        <Grid item xs={12}>
          <TextView variant="Bold_24" text={"Verification"} />
        </Grid>
        <Grid item lg={12} md={12} xs={12} sm={12} mt={1}>
          <TextView text={"In order to Initiate Bank Verification please complete your KYC Verification first"} variant="Regular_16" color="text.quaternary" />
        </Grid>
        <Grid item py={3} px={3.5} container lg={5.8} xs={12} alignItems={"center"} justifyContent={"space-between"} sx={{ backgroundColor: "background.primary", borderRadius: "8px" }}>
          <Grid item alignItems={"center"} container md={6} xs={12}>
            <Grid>
              <Box component={"img"} src={KYCVerificatonImage} pr={2} />
            </Grid>

            <Grid md={8} xs={12} justifyContent={"center"} alignItems={"center"}>
              {" "}
              <TextView component={"h4"} variant="Medium_16" text={"KYC Verification"} />
            </Grid>
          </Grid>

          {getKycDetails?.status === "VERIFIED" && verifiedBox}
          {getKycDetails?.status === "FAILED" && failedBox}
          {getKycDetails?.status === "IN_REVIEW" && pendingBox}
          {getKycDetails?.status === "NOT_VERIFIED" && NotVerifiedBox}
          <Box
            sx={{
              height: "36px",
              cursor: "pointer" // Set the cursor to pointer
              /* Other styles for the image */
            }}
            component={"img"}
            src={arrow}
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
          />
          <Grid xs={12} item>
            <TextView color={"text.error"} component={"h4"} variant="Medium_11" text={getKycDetails?.flowData?.remarks} />
          </Grid>
        </Grid>

        <Grid item py={3} px={3.5} container lg={5.8} alignItems={"center"} xs={12} justifyContent={"space-between"} sx={{ backgroundColor: "background.primary", borderRadius: "8px" }}>
          <Grid item alignItems={"center"} container md={6} lg={6} sm={12} xs={12}>
            <Grid item>
              <Box sx={{ cursor: "pointer" }} component={"img"} src={bankVerificatonImage} pr={2} maxWidth={"79px"} />
            </Grid>

            <Grid lg={8} md={8} xs={12} justifyContent={"center"} alignItems={"center"}>
              <TextView text={"Bank Verification"} variant="Medium_16" />
            </Grid>
          </Grid>
          {bankStatusTag === "VERIFIED" && verifiedBox}
          {bankStatusTag === "FAILED" && failedBox}
          {bankStatusTag === "PENDING" && pendingBox}
          {(!bankStatusTag || bankStatusTag === "NOT_VERIFIED") && NotVerifiedBox}

          <Box
            sx={{
              height: "36px",
              cursor: "pointer"
            }}
            component={"img"}
            src={arrow}
            onClick={() => {
              if (IsUserBankVerified || IsUserKycVerified) {
                navigate("/user/account");
              }
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default VerificationCard;
