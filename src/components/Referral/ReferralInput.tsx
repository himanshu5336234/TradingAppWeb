import React, { useEffect, useState, ChangeEvent } from "react";
import BasicTextFields from "../UI/CustomInput/BasicTextFields";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import CustomButton from "../UI/CustomButton/CustomButton";
import ErrorMessageReferral from "./ErrorMessageReferral";
import { GetAppURL } from "@/frontend-api-service/Base";
import TextView from "../UI/TextView/TextView";
// import { useNavigate } from "react-router-dom";

interface ReferralInputProps {
  isReferred: {
    isCode: boolean;
    code: string;
  };
  applyReferralCode: (referralCode: string, setLoading: (loading: boolean) => void) => void;
  VerifyReferralCode: (referralCode: string) => void;
  isReferralVerified: boolean;
  setIsReferralVerified: (isVerified: boolean) => void;
  referralInputTextMessage: {
    type: string;
    message: string;
  };
  setReferralInputTextMessage: (message: { type: string; message: string }) => void;
}

const ReferralInput: React.FC<ReferralInputProps> = ({
  isReferred,
  applyReferralCode,
  VerifyReferralCode,
  isReferralVerified,
  setIsReferralVerified,
  referralInputTextMessage,
  setReferralInputTextMessage
}) => {
  const [isVerifyActive, setIsVerifyActive] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    if (isReferred.isCode) {
      setReferralCode(isReferred.code);
      setIsInputDisabled(true);
    } else {
      setReferralCode("");
      setReferralInputTextMessage({
        type: "",
        message: ""
      });
      setIsInputDisabled(false);
      localStorage.removeItem("referralCode");
    }
  }, [isReferred, setReferralInputTextMessage]);

  const handleApplyCode = () => {
    if (!isReferralVerified) return;
    setLoading(true);
    applyReferralCode(referralCode, setLoading);
  };

  const handleVerifyClick = () => {
    if (!isVerifyActive) return;
    VerifyReferralCode(referralCode);
  };

  const handleReferralCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setReferralInputTextMessage({
      type: "",
      message: "fe"
    });
    setIsReferralVerified(false);

    if (!val) setIsVerifyActive(false);
    else setIsVerifyActive(true);
    setReferralCode(val);
  };

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          minHeight: "50vh",
          mt: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <Grid container gap={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <BasicTextFields
                backgroundColor={"background.primary"}
                label={"Referral Code"}
                placeholder={"ABCX 5667 YZ"}
                variant={"outlined"}
                value={referralCode}
                disabled={isInputDisabled}
                onChange={handleReferralCodeChange}
                styles={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: referralInputTextMessage.type === "success" ? "#29B57E" : referralInputTextMessage.type === "error" ? "#F46151" : ""
                    }
                  }
                }}
              />{" "}
              <Box>
                {!isReferred.isCode && (
                  <TextView onClick={handleVerifyClick} style={{ cursor: "pointer", textDecoration: "underline" }} color={"text.quaternary"} text={"Verify"} variant={"Medium_16"} />
                )}
              </Box>
            </Box>
          </Grid>
          {!isReferred.isCode && <ErrorMessageReferral type={referralInputTextMessage?.type} message={referralInputTextMessage?.message} />}
        </Grid>
      </Box>

      <CustomButton
        style={{ mb: 2 }}
        isDisabled={!isReferralVerified || referralInputTextMessage.type !== "success"}
        label={"Continue"}
        variant={"DensityMainFill"}
        onClick={handleApplyCode}
        isloading={loading}
      />
      {!isReferred.isCode && (
        <CustomButton
          variant={"secondary"}
          onClick={() => {
            if (isReferralVerified) return;
            localStorage.removeItem("isReferralDone");
            window.location.href = GetAppURL() + "/auth";
          }}
          label={"Continue without Referral"}
        />
      )}
    </Grid>
  );
};

export default ReferralInput;
