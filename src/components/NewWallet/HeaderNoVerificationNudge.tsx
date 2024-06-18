import { Box, Checkbox } from "@mui/material";
import React from "react";
import EastIcon from "@mui/icons-material/East";
import { HEADER_NUDGE_CONTAINER } from "./styles";
import { FLEX_BOX_ROW_ALIGN_CENTER } from "../SignalTrading/Modals/Modals.styles";
import { USER_SETTING_TABS } from "@/pages/UserProfile/Constants";
import { useNavigate } from "react-router-dom";
import TextView from "../UI/TextView/TextView";
const HeaderNoVerificationNudge = ({ IsKycVerified, IsBankVerified }: { IsKycVerified: boolean; IsBankVerified: boolean }) => {
  const navigate = useNavigate();
  const handleAction = () => {
    if (!IsKycVerified) {
      navigate("/user/kyc", {
        state: {
          currentTab: {
            name: "KYC Verification",
            value: USER_SETTING_TABS.USER_VERIFICATION.value
          }
        }
      });
    } else if (!IsBankVerified) {
      navigate("/user");
    }
  };
  const GetStep = ({ label, isChecked, isNext }: { label: string; isChecked: boolean; isNext: boolean }) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignContent: "center"
        }}
      >
        <Checkbox
          checked={isChecked}
          sx={{
            color: isChecked || isNext ? "#EBB62F" : "text.regular",
            height: "14px",
            "&.Mui-checked": {
              color: "#EBB62F"
            },
            "& .MuiSvgIcon-root": { fontSize: 14 }
          }}
        />
        <TextView component={"p"} variant="Medium_12" text={label} color={isChecked || isNext ? "#EBB62F" : "text.regular"}></TextView>
      </Box>
    );
  };
  return (
    <>
      {(!IsKycVerified || !IsBankVerified) && (
        <Box sx={HEADER_NUDGE_CONTAINER}>
          <Box sx={{ ...FLEX_BOX_ROW_ALIGN_CENTER, gap: 1 }}>
            <GetStep label={"Create an Account"} isChecked={true} isNext={false} />
            <TextView variant="Medium_12" color={"text.regular"} text={">"}></TextView>
            <GetStep label={"Compeleted KYC"} isChecked={IsKycVerified} isNext={true} />
            <TextView variant="Medium_12" color={"text.regular"} text={">"}></TextView>
            <GetStep label={"Compeleted Bank Verification"} isChecked={IsBankVerified} isNext={IsKycVerified} />
            <TextView variant="Medium_12" color={"text.regular"} text={">"}></TextView>
            <GetStep label={"Deposit Funds"} isChecked={false} isNext={false} />
          </Box>
          <Box
            sx={{
              ...FLEX_BOX_ROW_ALIGN_CENTER,
              gap: 3
            }}
          >
            <TextView
              variant={"Bold_12"}
              color={"#EBB62F"}
              onClick={handleAction}
              text={"Get Verified"}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                textDecorationThickness: "3px",
                textUnderlineOffset: "2px"
              }}
            ></TextView>
            <EastIcon sx={{ cursor: "pointer", color: "#fff" }} onClick={handleAction} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default HeaderNoVerificationNudge;
