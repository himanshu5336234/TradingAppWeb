import { Box } from "@mui/material";
import React, { useState } from "react";
import rupeeAmount from "../../../assets/images/Walletimages/rupeeAmount.svg";
import Timer from "../../../assets/images/Walletimages/24Hours.svg";
import StepBox from "../../../components/NewWallet/StepBox";
import WithDrawForm from "../../../components/NewWallet/WithDrawFormNew";
import { useWithdraw } from "@/frontend-BL/businessHooks/WALLET/useWithdraw";
import UserBankDetailsNew from "../../../components/NewWallet/UserBankDetails";
import OTPModal from "../../../components/NewWallet/OTPModal";
import StatusComponent from "../../../components/NewWallet/StatusComponent";
import { useNavigate } from "react-router-dom";
import { USER_SETTING_TABS } from "../Constants";
import HeaderComponent from "@/pages/UserVerification/AccountVerification/HeaderComponent";
import TextView from "@/components/UI/TextView/TextView";
import TransactionMode from "./TransactionMode";
const INRWithdraw = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const {
    helperTextForOTP,
    helperText,
    formData,
    activeStep,
    AccountInfo,
    action,
    SETFORMDATA,
    // handleMaxClickForWithdrawl,
    fiatBalance,
    cancelOTPSubmission,
    openOTPModal,
    handleResendOTP,
    handleFirstResendClick,
    resendRenderBoolean,
    loading,
    selectMode,
    setSelectMode
  } = useWithdraw(paymentMethod, paymentType);

  const navigate = useNavigate();

  const handlePrimaryClick = () => {
    navigate(USER_SETTING_TABS.INR_WALLET.route, {
      state: { currentTab: USER_SETTING_TABS.INR_WALLET }
    });
  };
  return (
    <>
      <HeaderComponent heading={"Asset / INR Wallet / INR Withdrawal"} subHeading={"INR Withdrawal"} tagLine={""} LinkButton={""} />
      {activeStep !== "success" && activeStep !== "failed" && (
        <>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "stretch"
            }}
          >
            <Box maxWidth={"200px"} alignSelf={"center"}>
              <TextView variant="Bold_28" text={"Steps to withdraw INR"}></TextView>
            </Box>

            <StepBox title={"Enter Amount"} description={"Enter your desired amount and verify bank details"} icon={rupeeAmount} stepNumber={1} />
            <StepBox title={"Enter Amount"} description={"Enter your desired amount and verify bank detailss"} icon={rupeeAmount} stepNumber={2} />
            <StepBox title={"Waiting Period"} description={"Funds will be reflected within 24-48 hours"} icon={Timer} stepNumber={3} />
          </Box>
          <Box
            mt={3}
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "space-between"
            }}
          >
            {!selectMode && <WithDrawForm helperText={helperText} formData={formData} SETFORMDATA={SETFORMDATA} action={action} fiatBalance={fiatBalance} loading={loading} />}
            {selectMode && (
              <TransactionMode paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} paymentType={paymentType} setPaymentType={setPaymentType} action={action} formData={formData} />
            )}

            {!selectMode && <UserBankDetailsNew AccountInfo={AccountInfo} />}
            {openOTPModal && (
              <OTPModal
                IsOpen={openOTPModal}
                SETFORMDATA={SETFORMDATA}
                formData={formData}
                helperTextForOTP={helperTextForOTP}
                cancelAction={cancelOTPSubmission}
                handleResendOTP={handleResendOTP}
                handleFirstResendClick={handleFirstResendClick}
                resendRenderBoolean={resendRenderBoolean}
                // loading={loading}
                action={action}
              />
            )}
          </Box>{" "}
        </>
      )}
      {activeStep === "success" && (
        <StatusComponent type={"SUCCESS"} message={"Transaction status will be updated in next 24 hours"} heading={"Withdrawal Request Successful!"} handlePrimaryClick={handlePrimaryClick} />
      )}
      {activeStep === "failed" && (
        <StatusComponent type={"FAILED"} message={"Please retry after sometime or contact support to learn more."} heading={"Withdrawal Request Failed!"} handlePrimaryClick={handlePrimaryClick} />
      )}
    </>
  );
};

export default INRWithdraw;
