import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material/node";
import MDeposit from "@/components/Wallet/MWeb-Wallet/MDeposit/MDeposit";
import MINRWallet from "@/components/Wallet/MWeb-Wallet/INR-Wallet/MINRWallet";
import MWithdraw from "@/components/Wallet/MWeb-Wallet/MWithdraw/MWithdraw";
import MUSDTWallet from "@/components/Wallet/MWeb-Wallet/MUSDTWallet/MUSDTWallet";
import { useSelector } from "react-redux";

const MWallet = () => {
  const [selectedWalletTab, setSelectedWalletTab] = useState("usdtWallet");
  const [IsUserVerified, setIsUserVerified] = useState(false);
  const { getBankDetails } = useSelector((state) => state.getBankDetails);
  const handleWalletTabClick = (value) => {
    setSelectedWalletTab(value);
  };
  useEffect(() => {
    if (getBankDetails?.bankAccounts?.length > 0) {
      if (getBankDetails?.bankAccounts[0]?.pennyDropStatus === "VERIFIED") {
        setIsUserVerified(true);
      } else {
        setIsUserVerified(true);
      }
    }
  }, [getBankDetails]);
  return (
    <Box>
      <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: 1.5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Box
            sx={{
              width: "70px",
              height: "70px",
              border: "1px solid white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "7px",
              backgroundColor: selectedWalletTab === "inrWallet" ? "white" : "transparent"
            }}
            onClick={() => handleWalletTabClick("inrWallet")}
          >
            {/* <Box component="img" src={MINRDeposit} sx={{ width: 27, height: 15, color: "black" }}></Box> */}
            <Typography variant="Regular_12" sx={{ textAlign: "center" }} color={selectedWalletTab === "inrWallet" ? "black" : "white"}>
              INR{" "}
              <Typography variant="Regular_12" component="p">
                Wallet
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: "70px",
              height: "70px",
              border: "1px solid white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "7px",
              backgroundColor: selectedWalletTab === "usdtWallet" ? "white" : "transparent"
            }}
            onClick={() => handleWalletTabClick("usdtWallet")}
          >
            {/* <Box component="img" src={Tether} sx={{ width: 27, height: 15 }}></Box> */}
            <Typography variant="Regular_12" sx={{ textAlign: "center" }} color={selectedWalletTab === "usdtWallet" ? "black" : "white"}>
              USDT{" "}
              <Typography variant="Regular_12" component="p">
                Wallet
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: "70px",
              height: "70px",
              border: "1px solid white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "7px",
              backgroundColor: selectedWalletTab === "inrDeposit" ? "white" : "transparent"
            }}
            onClick={() => handleWalletTabClick("inrDeposit")}
          >
            {/* <Box component="img" src={MINRDeposit} sx={{ width: 27, height: 15 }}></Box> */}
            <Typography variant="Regular_12" sx={{ textAlign: "center" }} color={selectedWalletTab === "inrDeposit" ? "black" : "white"}>
              Deposit{" "}
              <Typography variant="Regular_12" component="p">
                INR
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: "70px",
              height: "70px",
              border: "1px solid white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "7px",
              backgroundColor: selectedWalletTab === "inrWithdraw" ? "white" : "transparent"
            }}
            onClick={() => handleWalletTabClick("inrWithdraw")}
          >
            {/* <Box component="img" src={MINRDeposit} sx={{ width: 27, height: 15 }}></Box> */}
            <Typography variant="Regular_12" sx={{ textAlign: "center" }} color={selectedWalletTab === "inrWithdraw" ? "black" : "white"}>
              Withdraw{" "}
              <Typography variant="Regular_12" component="p">
                INR
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* conditionally render wallet tabs */}
      {selectedWalletTab === "inrDeposit" && <MDeposit IsUserVerified={IsUserVerified} setSelectedWalletTab={setSelectedWalletTab} />}
      {selectedWalletTab === "inrWallet" && <MINRWallet IsUserVerified={IsUserVerified} setSelectedWalletTab={setSelectedWalletTab} />}
      {selectedWalletTab === "inrWithdraw" && <MWithdraw IsUserVerified={IsUserVerified} setSelectedWalletTab={setSelectedWalletTab} />}
      {selectedWalletTab === "usdtWallet" && <MUSDTWallet IsUserVerified={IsUserVerified} setSelectedWalletTab={setSelectedWalletTab} />}
    </Box>
  );
};

export default MWallet;
