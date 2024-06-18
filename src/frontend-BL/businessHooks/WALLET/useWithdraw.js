import { fetchFiatBalanceApi, fiatWithdrawApi, generateOTP } from "../../../frontend-api-service/Api";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WALLET_CONSTANTS } from "./Constants/WalletConstants.const";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";

export const useWithdraw = (paymentMethod, paymentType) => {
  const { getBankDetails } = useSelector((state) => state.getBankDetails);
  const dispatch = useDispatch();
  const [AccountInfo, serAccountInfo] = useState({});
  const [formData, setformData] = useState({
    WithdrawAmount: "",
    OTP: "",
    verificationIdFromServer: ""
  });
  const [openOTPModal, setOpenOTPModal] = useState(false);
  const [activeStep, setActiveStep] = useState("");
  const [fiatBalance, setFiatBalance] = useState(0);
  const [helperText, setHelperText] = useState("");
  const [loading, setLoading] = useState(false);
  const [helperTextForOTP, setHelperTextForOTP] = useState("");
  const [resendRenderBoolean, setResendRenderBoolean] = useState(true);
  const [selectMode, setSelectMode] = useState(false);
  const SETFORMDATA = useCallback(
    (payload) => {
      setHelperText("");
      setHelperTextForOTP("");
      if (payload?.WithdrawAmount < 0) return;
      setformData(payload);
      validateWithdrawAmtInput(payload?.WithdrawAmount);
    },
    [formData, fiatBalance]
  );
  useEffect(() => {
    fetchFiatBalanceApi().then((successResponse) => {
      setFiatBalance(successResponse.data.balance);
    });
    if (getBankDetails?.bankAccounts?.length > 0) {
      serAccountInfo({
        ifsc: getBankDetails?.bankAccounts[0].ifsc,
        accountNumber: getBankDetails?.bankAccounts[0].accountNumber
      });
    }
  }, [getBankDetails]);

  const validateWithdrawAmtInput = (value) => {
    if (Number(value) < WALLET_CONSTANTS.MINIMUM_INR_WITHDRAW) {
      setHelperText(WALLET_CONSTANTS.MINIMUM_WITHDRAW_AMOUNT_LABEL);
    } else if (Number(value) > Number(fiatBalance)) {
      if (Number(value) > WALLET_CONSTANTS.MAXIMUM_INR_WITHDRAW) {
        setHelperText(WALLET_CONSTANTS.MAXIMUM_WITHDRAW_AMOUNT_LABEL);
      } else {
        setHelperText(WALLET_CONSTANTS.INR_EXCEEDS_AVAILABLE_BALANCE_LABEL);
      }
    } else if (Number(value) > WALLET_CONSTANTS.MAXIMUM_INR_WITHDRAW) {
      setHelperText(WALLET_CONSTANTS.MAXIMUM_WITHDRAW_AMOUNT_LABEL);
    } else {
      setHelperText("");
    }
  };

  const SubmitFormData = () => {
    if (helperText.length > 0) return;
    if (formData?.WithdrawAmount === "") {
      setHelperText(WALLET_CONSTANTS.NOT_EMPTY_LABEL);
    } else {
      setSelectMode(true);
    }
  };
  const SubmitOtpForManual = async () => {
    try {
      const verificationIdFromServer = await generateOTP();
      setActiveStep("OTP");
      const verificationID = verificationIdFromServer.data.data.verificationID;
      SETFORMDATA({ ...formData, verificationIdFromServer: verificationID });
      setOpenOTPModal(true);
    } catch (err) {
      dispatch(
        showSnackBar({
          src: "OTP_GENERATE_FAIL",
          message: "Unable To Generate OTP Please try Again",
          type: "failure"
        })
      );
    }
  };
  const SubmitFormDataWithOtp = () => {
    if (formData?.OTP?.length > 5) {
      setHelperTextForOTP("");
      setLoading(true);
      fiatWithdrawApi(
        JSON.stringify({
          otp: formData?.OTP,
          amount: Math.trunc(parseFloat(formData?.WithdrawAmount) * 100) / 100,
          verificationID: formData?.verificationIdFromServer,
          type: paymentMethod === "manual" ? "MANUAL" : "AUTOMATIC",
          transferMode: paymentType === "IMPS" ? "IMPS" : paymentType === "NEFT" ? "NEFT" : "MANUAL"
        })
      )
        .then((successResponse) => {
          setLoading(false);
          setOpenOTPModal(false);
          setActiveStep("success");
        })
        .catch((errorResponse) => {
          dispatch(
            showSnackBar({
              src: "WITHDRAW_FIAT_FAIL",
              message: errorResponse.response.data.details,
              type: "failure"
            })
          );
          setActiveStep("failed");
          setLoading(false);
        });
    } else {
      setHelperTextForOTP(WALLET_CONSTANTS.OTP_NOT_EMPTY_LABEL);
    }
  };
  const handleResendOTP = async () => {
    try {
      const verificationIdFromServer = await generateOTP();
      const verificationID = verificationIdFromServer.data.data.verificationID;
      SETFORMDATA({ ...formData, verificationIdFromServer: verificationID });
      setResendRenderBoolean(false);
    } catch (err) {
      dispatch(
        showSnackBar({
          src: "OTP_GENERATE_FAIL",
          message: "Unable To Generate OTP Please try Again",
          type: "failure"
        })
      );
    }
  };
  const cancelOTPSubmission = () => {
    setActiveStep("");
    SETFORMDATA({ ...formData, OTP: "" });
    setOpenOTPModal(false);
    setResendRenderBoolean(true);
  };
  const handleFirstResendClick = () => setResendRenderBoolean(false);
  const handleMaxClickForWithdrawl = (value) => {
    let maxValue;
    if (Number(value) > WALLET_CONSTANTS.MAXIMUM_INR_WITHDRAW) {
      maxValue = WALLET_CONSTANTS.MAXIMUM_INR_WITHDRAW;
    } else {
      maxValue = Math.trunc(value * 100) / 100;
    }
    SETFORMDATA({ ...formData, WithdrawAmount: maxValue });
  };
  const actionText = activeStep ? WALLET_CONSTANTS.CONFIRM_LABEL : WALLET_CONSTANTS.CONTINUE_LABEL;
  const action = activeStep === "OTP" ? SubmitFormDataWithOtp : paymentMethod === "manual" ? SubmitOtpForManual : paymentMethod === "instant" ? SubmitOtpForManual : SubmitFormData;
  return {
    helperTextForOTP,
    AccountInfo,
    helperText,
    activeStep,
    formData,
    actionText,
    SubmitFormData,
    action,
    SETFORMDATA,
    handleMaxClickForWithdrawl,
    fiatBalance,
    cancelOTPSubmission,
    openOTPModal,
    handleResendOTP,
    handleFirstResendClick,
    resendRenderBoolean,
    loading,
    selectMode,
    setSelectMode
  };
};
