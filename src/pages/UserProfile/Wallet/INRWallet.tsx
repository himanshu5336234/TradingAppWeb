import { useFiatTab } from "@/frontend-BL/businessHooks";
import React, { useState } from "react";
import BalanceComponent from "../../../components/NewWallet/BalanceComponent";
import ConvertINRUSDTBtn from "@/components/NewWallet/ConvertINRUSDTBtn";
import FiatTransactionTable from "../../../components/NewWallet/FiatTransactionTable";
import HeaderComponent from "@/pages/UserVerification/AccountVerification/HeaderComponent";
import { Box } from "@mui/material";
import { CONVERT_BUTTON_BOX } from "@/components/NewWallet/styles";
import CompleteKycBanner from "@/components/UserVerification/KycVerification/KycNudges/CompleteKycBanner";
const INRWalletNew = ({ IsUserVerified }: { IsUserVerified: boolean }) => {
  const {
    fiatbalance,
    FiatHistory,
    TabsAlignment,
    Pagination,
    SetTabsAlignment,
    ChangePage,
    RefreshButton,
    totalCount,
    duration,
    changeDuration,
    selectCustomDateRange,
    showCustomDateModal,
    setShowCustomDateModal
  } = useFiatTab();
  const [showBalance, setShowBalance] = useState(false);
  return (
    <>
      <HeaderComponent heading={"Asset / INR Wallet"} subHeading={"INR Wallet"} tagLine={""} LinkButton={""} />
      <CompleteKycBanner marginTop={0} />
      <BalanceComponent IsUserVerified={IsUserVerified} balance={fiatbalance} walletType={"INR"} dataDetails={{}} showBalance={showBalance} setShowBalance={setShowBalance} />
      <Box sx={CONVERT_BUTTON_BOX}>
        <ConvertINRUSDTBtn IsUserVerified={IsUserVerified} />
      </Box>
      <FiatTransactionTable
        duration={duration}
        ChangeDuration={changeDuration}
        showCustomDateModal={showCustomDateModal}
        selectCustomDateRange={selectCustomDateRange}
        setShowCustomDateModal={setShowCustomDateModal}
        fiatHistory={FiatHistory}
        Pagination={Pagination}
        ChangePage={ChangePage}
        totalCount={totalCount}
        RefreshButton={RefreshButton}
        txnType={TabsAlignment}
        setTxnType={SetTabsAlignment}
      />
    </>
  );
};

export default INRWalletNew;
