import React from "react";
import { Box, Grid } from "@mui/material";
import HeaderComponent from "../AccountVerification/HeaderComponent";
import TextView from "@/components/UI/TextView/TextView";
import { KycStatusBar } from "@/components/UserVerification/KycVerification/KycDigio/KycStatusBar";
import { KycResponse } from "./helpers";
import { VerificationCard } from "@/components/UserVerification/KycVerification/KycDigio/VerificationCard";
import KycCardsWrapper from "@/components/UserVerification/KycVerification/KycDigio/KycCardsWrapper";
import { getSupportChat } from "@/helpers";

const KYCVerification = ({ kycDetails }: { kycDetails: KycResponse }) => {
  const { openFcSupportChat } = getSupportChat();
  return (
    <>
      <Box p={"2rem 6rem"} maxWidth={"1600px"} mr={"auto"}>
        <Grid container gap={3}>
          <Grid container justifyContent={"space-between"} alignItems={"center"} item xs={12}>
            <Grid item xs={5}>
              <HeaderComponent heading={"Account / KYC Verification"} subHeading={"KYC Verification"} tagLine={""} LinkButton={""} />
            </Grid>
            <Grid item xs={2}>
              <TextView
                onClick={openFcSupportChat}
                text={"Contact Support"}
                variant={"Medium_14"}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              />
            </Grid>
          </Grid>
          {(kycDetails?.status === "FAILED" || kycDetails?.status === "IN_REVIEW") && (
            <Grid item xs={12}>
              <KycStatusBar workFlowType={kycDetails?.flowData?.workFlowType} variant={kycDetails?.status} StatusText={kycDetails?.flowData?.remarks} />
            </Grid>
          )}
          {kycDetails?.status !== "IN_REVIEW" && kycDetails?.status !== "VERIFIED" && <KycCardsWrapper kycDetails={kycDetails} />}
          {kycDetails?.status === "VERIFIED" && <VerificationCard />}
        </Grid>
      </Box>
    </>
  );
};
export default KYCVerification;
