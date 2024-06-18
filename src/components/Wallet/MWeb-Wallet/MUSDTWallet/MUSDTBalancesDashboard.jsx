import React, { useState } from "react";
import MUSDTWalletFrame from "@/assets/images/wallet/MUSDTWalletFrame.svg";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AVAILABLE_BALANCE_INFO, CROSS_WALLET_INFO, ISOLATED_BALANCE_INFO, WITHDRAWABLE_BALANCE_INFO } from "../../USDTWallet/magicStrings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const MUSDTBalancesDashboard = () => {
  const { totalWalletBalance, availableBalance, totalIsolatedWalletBalance, totalCrossWalletBalance, maxWithdrawAmount } = useSelector((state) => ({
    totalWalletBalance: state.futures.accountInfo.totalWalletBalance,
    totalCrossWalletBalance: state.futures.accountInfo.totalCrossWalletBalance,
    totalIsolatedWalletBalance: state.futures.accountInfo.totalIsolatedWalletBalance,
    maxWithdrawAmount: state.futures.accountInfo.maxWithdrawAmount,
    availableBalance: state.futures.accountInfo.availableBalance
  }));
  const [BalanceHidden, SetBalanceHidden] = useState(true);
  const BalanceVisibilityIcon = () => {
    return BalanceHidden === true ? (
      <VisibilityOffIcon sx={{ marginTop: 1, fontSize: "15px" }} onClick={() => SetBalanceHidden(false)} />
    ) : (
      <VisibilityIcon sx={{ marginTop: 1, fontSize: "15px" }} onClick={() => SetBalanceHidden(true)} />
    );
  };
  const BalancesVisibility = (value) => {
    if (value === "0") {
      return "--";
    } else {
      return BalanceHidden === true ? (
        <Typography variant="SemiBold_16" component={"h3"}>
          {"XXXXX"}
          <Typography variant="SemiBold_14" component={"span"}>
            {" USDT"}
          </Typography>
        </Typography>
      ) : (
        <Typography variant="SemiBold_16" component={"h3"}>
          {value && Math.trunc(value * 100) / 100}
          <Typography variant="SemiBold_14" component={"span"}>
            {" USDT"}
          </Typography>
        </Typography>
      );
    }
  };
  return (
    <Box
      sx={{
        width: 325,
        height: 218,
        backgroundImage: `url(${MUSDTWalletFrame})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Box sx={{ borderBottom: "0.1px solid #3c4714", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", pb: 2 }}>
        <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <Typography component={"h3"} variant="Regular_12" color="#A9A9A9">
            {"Total USDT Wallet Balance"}
          </Typography>
          <Typography component={"p"}>{BalanceVisibilityIcon()}</Typography>
        </Box>
        <Typography sx={{ marginTop: "-5px", textAlign: "center" }} variant="Regular_20">
          {BalancesVisibility(totalWalletBalance)}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", display: "flex", borderBottom: "0.1px solid #3c4714" }}>
        <Box sx={{ width: "50%", borderRight: "0.1px solid #3c4714", px: "12px", py: "14px" }}>
          <Typography variant="Regular_12" color="#A9A9A9" component={"p"}>
            {"Available Balance"}
            <Tooltip title={AVAILABLE_BALANCE_INFO} placement="top" arrow enterTouchDelay={100}>
              <InfoOutlinedIcon
                sx={{
                  width: "12px",
                  height: "12px",
                  color: "#A9A9A9",
                  marginBottom: "-2px",
                  marginLeft: "1px"
                }}
              ></InfoOutlinedIcon>
            </Tooltip>
          </Typography>
          <Typography variant="SemiBold_16" component={"p"}>
            {BalancesVisibility(availableBalance)}
          </Typography>
        </Box>
        <Box sx={{ width: "50%", borderRight: "0.1px solid #3c4714", px: "12px", py: "15px" }}>
          <Typography variant="Regular_12" color="#A9A9A9" component={"p"}>
            Cross Wallet Balance
            <Tooltip title={CROSS_WALLET_INFO} placement="top" arrow enterTouchDelay={100}>
              <InfoOutlinedIcon
                sx={{
                  width: "12px",
                  height: "12px",
                  color: "#A9A9A9",
                  marginBottom: "-2px",
                  marginLeft: "1px"
                }}
              ></InfoOutlinedIcon>
            </Tooltip>
          </Typography>
          <Typography variant="SemiBold_16" component={"p"}>
            {BalancesVisibility(totalCrossWalletBalance)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box sx={{ width: "50%", borderRight: "0.1px solid #3c4714", px: "10px", py: "15px" }}>
          <Typography variant="Regular_12" color="#A9A9A9" component={"p"}>
            {"Withdrawable Balance"}
            <Tooltip title={WITHDRAWABLE_BALANCE_INFO} placement="top" arrow enterTouchDelay={100}>
              <InfoOutlinedIcon
                sx={{
                  width: "12px",
                  height: "12px",
                  color: "#A9A9A9",
                  marginBottom: "-2px",
                  marginLeft: "1px"
                }}
              ></InfoOutlinedIcon>
            </Tooltip>
          </Typography>
          <Typography variant="SemiBold_16" component={"p"}>
            {BalancesVisibility(maxWithdrawAmount)}
          </Typography>
        </Box>
        <Box sx={{ width: "50%", borderRight: "0.1px solid #3c4714", px: "12px", py: "15px" }}>
          <Typography variant="Regular_12" color="#A9A9A9" component={"p"}>
            Isolated Margin
            <Tooltip title={ISOLATED_BALANCE_INFO} placement="top" arrow enterTouchDelay={100}>
              <InfoOutlinedIcon
                sx={{
                  width: "12px",
                  height: "12px",
                  color: "#A9A9A9",
                  marginBottom: "-2px",
                  marginLeft: "1px"
                }}
              ></InfoOutlinedIcon>
            </Tooltip>
          </Typography>
          <Typography variant="SemiBold_16" component={"p"}>
            {BalancesVisibility(totalIsolatedWalletBalance)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MUSDTBalancesDashboard;
