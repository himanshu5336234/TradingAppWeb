import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomModal from "../CustomModals/newModal/CustomModal";
import { Box, Grid, Typography } from "@mui/material";
import { numberWithCommas } from "@/helpers/commaHelper";

const WalletBalanceModal = ({ showWallet, setShowWallet }: { showWallet: boolean; setShowWallet: Function }) => {
  const navigate = useNavigate();
  const { totalWalletBalance, availableBalance } = useSelector((state: any) => ({
    availableBalance: state.futures.accountInfo.availableBalance,
    totalWalletBalance: state.futures.accountInfo.totalWalletBalance
  }));
  return (
    <CustomModal
      IsOpen={showWallet}
      isPrimaryAction={true}
      isSecondaryAction={true}
      primaryName={"Add Funds"}
      secondaryName={"Dismiss"}
      primaryAction={() => {
        navigate("/wallet", {
          state: { currentTab: { value: "deposit" } }
        });
      }}
      secondaryAction={() => setShowWallet(false)}
      close={() => setShowWallet(false)}
      isClose={true}
      title={"Your USDT Wallet"}
      ContainerSx={{ maxWidth: { xs: "480px" } }}
    >
      <Box px={1} pt={3}>
        <Grid container mb={10}>
          <Grid item sx={{ backgroundColor: "background.default" }} xs={6} border={"1px solid #29292E"} py={2} px={1.8} gap={0.5}>
            <Typography variant="Medium_11" color={"text.secondary"}>
              {"Total Balance (USDT)"}
            </Typography>
            <Typography color={"#fff"} component={"div"} variant="Medium_12">
              {numberWithCommas(Number(totalWalletBalance)?.toFixed(2))}
            </Typography>
          </Grid>
          <Grid item sx={{ backgroundColor: "background.default" }} xs={6} border={"1px solid #29292E"} py={2} px={1.8} gap={0.5}>
            <Typography variant="Medium_11" color={"text.secondary"}>
              {"Available Balance (USDT)"}
            </Typography>
            <Typography color={"#fff"} component={"div"} variant="Medium_12">
              {numberWithCommas(Number(availableBalance)?.toFixed(2))}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CustomModal>
  );
};

export default WalletBalanceModal;
