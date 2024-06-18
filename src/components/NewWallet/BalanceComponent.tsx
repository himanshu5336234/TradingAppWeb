import { Box } from "@mui/material";
import React from "react";
import Thether from "../../assets/images/Walletimages/Thether.svg";
import INR from "../../assets/images/Walletimages/INR.svg";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import { numberWithCommas } from "@/helpers/commaHelper";
import { useNavigate } from "react-router-dom";
import { USER_SETTING_TABS } from "../../pages/UserProfile/Constants";
// import BannerFormat  from "@/components/LeaderBoard/BannerFormat";
import BannerFormat from "@/components/PagesTopDataBanner/BannerFormat";
import TextView from "@/components/UI/TextView/TextView";
import Eye from "@/assets/images/Walletimages/Eye.svg";
import EyesHideIcon from "@/assets/images/Walletimages/EyesHideIcon.svg";
interface ComponentProps {
  walletType: "INR" | "USDT";
  balance: string;
  IsUserVerified: boolean;
  dataDetails: object;
  showBalance: boolean;
  setShowBalance: (val: boolean) => void;
}
const BalanceComponent: React.FC<ComponentProps> = ({ walletType, balance, IsUserVerified, dataDetails, showBalance, setShowBalance }) => {
  const child = () => {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextView variant={"Medium_14"} color={"text.regular"}>
            {walletType} {" Wallet Balance"}
          </TextView>
          {showBalance ? (
            <img src={Eye} onClick={() => setShowBalance(false)} style={{ cursor: "pointer" }} />
          ) : (
            <img src={EyesHideIcon} onClick={() => setShowBalance(true)} style={{ cursor: "pointer" }} />
          )}
        </Box>
        <TextView variant={"Bold_32"}>
          {showBalance ? numberWithCommas(Number(balance)?.toFixed(2)) : "XXXX"} <TextView variant={"Medium_22"} component={"span"} text={walletType}></TextView>
        </TextView>
        {walletType === "INR" && (
          <Box
            sx={{
              display: "flex",
              maxWidth: "400px",
              gap: 2
            }}
          >
            <CustomButton
              label={"Withdraw"}
              variant={"secondary"}
              isDisabled={!IsUserVerified}
              onClick={() => {
                navigate(USER_SETTING_TABS.WITHDRAW_WALLET.route, {
                  state: { currentTab: USER_SETTING_TABS.WITHDRAW_WALLET }
                });
              }}
            />
            <CustomButton
              label={"Deposit"}
              variant={"primary"}
              isDisabled={!IsUserVerified}
              onClick={() => {
                navigate(USER_SETTING_TABS.DEPOSIT_WALLET.route, {
                  state: { currentTab: USER_SETTING_TABS.DEPOSIT_WALLET }
                });
              }}
            />
          </Box>
        )}
      </Box>
    );
  };
  const navigate = useNavigate();
  return <BannerFormat child={child()} image={walletType === "USDT" ? Thether : INR} dataDetails={dataDetails ?? {}} />;
};

export default BalanceComponent;
