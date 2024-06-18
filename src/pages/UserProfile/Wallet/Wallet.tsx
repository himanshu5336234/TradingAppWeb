import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { INR_WALLET, USDT_WALLET } from "./Constants";
import UsdWallet from "./USDTWallet";
import INRWalletNew from "./INRWallet";
import INRDeposite from "./INRDeposit";
import Withdraw from "./INRWithdraw";
// import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
import WalletNew from "@/components/NewWallet/WalletNew";

const Wallet = () => {
  const { state } = useLocation();
  const [selectedToggle, setSelectedToggle] = useState("usdtWallet");
  const { profileDetails } = useSelector((state: any) => state.profile);
  useEffect(() => {
    if (state === null) {
      setSelectedToggle("usdtWallet");
    } else {
      setSelectedToggle(state?.currentTab.value);
    }
  }, [state]);

  const ShowWalletTabs = (currentTab: string) => {
    if (currentTab === "usdtWallet") {
      return <UsdWallet IsUserVerified={profileDetails?.statuses?.bankVerified} />;
    } else if (currentTab === "inrWallet") {
      return <INRWalletNew IsUserVerified={profileDetails?.statuses?.bankVerified} />;
    } else if (currentTab === "deposit") {
      return <INRDeposite />;
    } else if (currentTab === "withdraw") {
      return <Withdraw />;
    } else {
      return <WalletNew IsUserVerified={profileDetails?.statuses?.bankVerified} IsKycVerified={profileDetails?.statuses?.kycVerified} />;
    }
  };

  return (
    <Box sx={{ p: { xs: "2rem", md: "2rem 6rem" } }}>
      <Box maxWidth="xl" sx={{ pt: 0, mr: "auto" }}>
        {ShowWalletTabs(selectedToggle)}
      </Box>
    </Box>
  );
};

export default Wallet;
