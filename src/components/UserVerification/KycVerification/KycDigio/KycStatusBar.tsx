import React from "react";
import { Box } from "@mui/material";
import NoAttemptsImage from "@/assets/images/KycDigio/NoAttemptsImage.svg";
import UnderReviewIcon from "@/assets/images/KycDigio/UnderReviewIcon.svg";
import TextView from "../../../UI/TextView/TextView";
export const KycStatusBar = ({ workFlowType, StatusText, variant }: { workFlowType: string; StatusText: string; variant: string }) => {
  return (
    <Box
      display={"flex"}
      bgcolor={variant === "FAILED" ? "#301D1D" : "#302C1D"}
      paddingY={"12px"}
      paddingX={"35px"}
      sx={{
        borderLeft: "4px solid",
        borderRadius: "0px 4px 4px 0px",
        borderColor: variant === "FAILED" ? "#FF6554" : "#EBB624"
      }}
    >
      <Box component="img" src={variant === "FAILED" ? NoAttemptsImage : UnderReviewIcon} />
      {variant === "FAILED" && (
        <>
          <TextView text={` ${workFlowType === "QUICK_KYC_FLOW" ? "Express KYC" : "Manual KYC"}  Failed`} variant={"Bold_14"} style={{ marginLeft: "12px", mt: "3px" }} color={"#FF6554"} />
          <TextView text={StatusText} variant={"Medium_14"} style={{ marginLeft: "12px", mt: "3px" }} color={"#FF6554"} />
        </>
      )}
      {variant === "IN_REVIEW" && (
        <>
          <TextView text={` KYC Under Review `} variant={"Bold_14"} style={{ marginLeft: "12px", mt: "3px" }} color={"#EBB62F"} />
          <TextView
            text={"Documents Captured Successfully. Your KYC  is under review and can take up to 24 hours to get verified."}
            variant={"Medium_14"}
            style={{ marginLeft: "12px", mt: "3px" }}
            color={"#EBB62F"}
          />
        </>
      )}
    </Box>
  );
};
