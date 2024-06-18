import React, { useState } from "react";
import BalanceComponent from "../../../components/NewWallet/BalanceComponent";
import ConvertINRUSDTBtn from "@/components/NewWallet/ConvertINRUSDTBtn";
// import BalanceInfoUSDTNew from './BalanceInfoUSDTNew';
import { numberWithCommas } from "@/helpers/commaHelper";
import { useSelector } from "react-redux";
import USDTTxnHistory from "@/components/NewWallet/USDTTxnHistory";
import { useFuturesTab } from "@/frontend-BL/businessHooks";
// import CompleteVerificationNudge from "../../../components/NewWallet/CompleteVerificationNudge";
// import BackButton from '@/components/NewWallet/BackButton';
import HeaderComponent from "@/pages/UserVerification/AccountVerification/HeaderComponent";
import { CONVERT_BUTTON_BOX } from "@/components/NewWallet/styles";
import { Box } from "@mui/material";
import CompleteKycBanner from "@/components/UserVerification/KycVerification/KycNudges/CompleteKycBanner";

const USDTWalletNew = ({ IsUserVerified }: { IsUserVerified: boolean }) => {
  const {
    totalCount,
    TabsAlignment,
    // Pagination,
    SetTabsAlignment,
    // ChangePage,
    RefreshButton,
    // ChangeRowsPerPage,
    duration,
    changeDuration,
    selectCustomDateRange,
    searchSymbol,
    handleSymbolSelect,
    // loading,
    // handleHideBalanceCheckBox,
    // isHideSmallBalanceChecked,
    webPagination,
    setWebPagination,
    showCustomDurationModal,
    setShowCustomDurationModal,
    rowsPerPage
  } = useFuturesTab();
  const [showBalance, setShowBalance] = useState(false);
  const { totalWalletBalance, availableBalance, totalIsolatedWalletBalance, totalCrossWalletBalance, maxWithdrawAmount } = useSelector((state: any) => ({
    totalCrossWalletBalance: state.futures.accountInfo.totalCrossWalletBalance,
    totalIsolatedWalletBalance: state.futures.accountInfo.totalIsolatedWalletBalance,
    maxWithdrawAmount: state.futures.accountInfo.maxWithdrawAmount,
    availableBalance: state.futures.accountInfo.availableBalance,
    totalWalletBalance: state.futures.accountInfo.totalWalletBalance
  }));

  const getBalanceValue = (value: number) => {
    if (showBalance) {
      value = value && Math.trunc(value * 100) / 100;
      return numberWithCommas(value);
    } else return "XXXX";
  };
  const AccountValue = {
    availableBalance: [
      "Available Balance (USDT)",
      getBalanceValue(Number(availableBalance)),
      `Free Balance available for placing the New Orders. It is updated on real time basis, hence there might be some discrepancy.`
    ],
    crossWalletBalance: [
      "Cross Wallet Balance (USDT)",
      getBalanceValue(Number(totalCrossWalletBalance)),
      `Amount that is allocated to Cross Wallet. It is shared across all the Cross Mode positions and orders.`
    ],
    maxWithdrawAmount: [
      "Max Withdraw-able Balance (USDT)",
      getBalanceValue(Number(maxWithdrawAmount)),
      `Amount that can be withdrawn, equal to Available balance - Frozen balance (received via rewards).*There can be some discrepancy in the data shown.`
    ],
    totalIsolatedWalletBalance: ["Isolated Margin (USDT)", getBalanceValue(Number(totalIsolatedWalletBalance)), `It is the sum of all Isolated Margins of your positions`]
  };

  return (
    <>
      {/* <HeaderNoVerificationNudge IsKycVerified={IsKycVerified} IsBankVerified={IsUserVerified}/> */}
      <HeaderComponent heading={"Asset / USDT Wallet"} subHeading={"USDT Wallet"} tagLine={""} LinkButton={""} />
      {/* { (!IsKycVerified || !IsUserVerified) &&  <CompleteVerificationNudge type={!IsKycVerified ? "KYC" : "BANK"} />} */}
      <CompleteKycBanner />
      <BalanceComponent balance={totalWalletBalance} walletType={"USDT"} IsUserVerified={IsUserVerified} dataDetails={AccountValue} showBalance={showBalance} setShowBalance={setShowBalance} />
      {/* <BalanceInfoUSDTNew /> */}
      <Box sx={CONVERT_BUTTON_BOX}>
        <ConvertINRUSDTBtn IsUserVerified={IsUserVerified} />
      </Box>

      <USDTTxnHistory
        totalCount={totalCount}
        page={webPagination}
        setPage={setWebPagination}
        rowsPerPage={rowsPerPage}
        searchSymbol={searchSymbol}
        handleSelectSymbol={handleSymbolSelect}
        duration={duration}
        changeDuration={changeDuration}
        selectCustomDateRange={selectCustomDateRange}
        showCustomDurationModal={showCustomDurationModal}
        setShowCustomDurationModal={setShowCustomDurationModal}
        txnType={TabsAlignment}
        setTxnType={SetTabsAlignment}
        RefreshButton={RefreshButton}
      />
    </>
  );
};

export default USDTWalletNew;
