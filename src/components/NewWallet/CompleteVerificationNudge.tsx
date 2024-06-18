import React from "react";
import KYCImage from "@/assets/images/Walletimages/CompleteKYC.svg";
import BankVerificationImage from "@/assets/images/Walletimages/CompleteBankVerification.svg";
import { Box } from "@mui/material";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { USER_SETTING_TABS } from "@/pages/UserProfile/Constants";
import { VERIFICATION_NUDGE_CONTAINER } from "./styles";
import { FLEX_BOX_ROW_ALIGN_CENTER } from "../SignalTrading/Modals/Modals.styles";
import TextView from "../UI/TextView/TextView";
const CompleteVerificationNudge = ({ type = "KYC" }: { type: string }) => {
  const navigate = useNavigate();
  const handleAction = () => {
    if (type === "KYC") {
      navigate("/user/kyc", {
        state: {
          currentTab: {
            name: "KYC Verification",
            value: USER_SETTING_TABS.USER_VERIFICATION.value
          }
        }
      });
    } else {
      navigate("/user");
    }
  };
  return (
    <>
      <Box sx={VERIFICATION_NUDGE_CONTAINER}>
        <Box
          sx={{
            ...FLEX_BOX_ROW_ALIGN_CENTER,
            gap: 3,
            width: "80%"
          }}
        >
          <TextView
            variant="Medium_16"
            text={
              type === "KYC" ? "Complete your KYC and verify your bank account to start depositing funds for trading." : "Complete your Bank Verification to start trading and watch your rank soar!"
            }
          />
          <Box maxWidth={"240px"}>
            <CustomButton variant={"primary"} label={type === "KYC" ? "Complete KYC" : "Complete Bank Verification"} onClick={handleAction} />
          </Box>
        </Box>
        <img
          src={type === "KYC" ? KYCImage : BankVerificationImage}
          style={{
            position: "absolute",
            top: "-20%",
            right: "0"
          }}
        />
      </Box>
    </>
  );
};

export default CompleteVerificationNudge;
