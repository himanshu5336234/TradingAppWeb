import { Box, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import Trophy from "ASSETS/images/userSettings/ReferralTabs/Trophy.svg";
import rewardCup from "ASSETS/images/userSettings/ReferralTabs/rewardCup.svg";
import KYCReward from "ASSETS/images/userSettings/ReferralTabs/volumeReward.svg";
import PropTypes from "prop-types";
import {
  REWARD_AMT_STYLE,
  REWARD_CARD_BG,
  REWARD_CARD_BOX,
  REWARD_CONTENT_WRAPPER,
  REWARD_IMG_STYLE,
  REWARD_NAME_STYLE,
  REWARD_STATUS_INDICATOR
} from "@/pages/UserProfile/Rewards/TaskRewardsTab/styles";
import RewardTnCModal from "./RewardTnCModal";
import { TASK_REWARD_STATUS } from "@/pages/UserProfile/Rewards/TaskRewardsTab/Constants";

const RewardImageSelector = (rewardName) => {
  switch (rewardName) {
    case "KYC":
      return KYCReward;
    case "Sign Up":
      return Trophy;
    case "1M volume":
      return rewardCup;
    default:
      return Trophy;
  }
};

const RewardCard = ({ rewardName, expiryDate, rewardAmount, rewardStatus }) => {
  const [openRewardTnC, setOpenRewardTnC] = useState(false);
  const handleRewardTnCClose = () => setOpenRewardTnC(false);

  const cardStatus = () => {
    switch (rewardStatus) {
      case TASK_REWARD_STATUS.ACTIVE:
        return (
          <Box sx={REWARD_STATUS_INDICATOR}>
            <Typography variant="SemiBold_14" color={"#29B57E"}>
              {rewardStatus.toUpperCase()}
            </Typography>
          </Box>
        );
      case TASK_REWARD_STATUS.EXPIRED:
        return (
          <Box sx={REWARD_STATUS_INDICATOR}>
            <Typography variant="SemiBold_14" color={"#A9A9A9"}>
              {rewardStatus.toUpperCase()}
            </Typography>
          </Box>
        );
      case TASK_REWARD_STATUS.REWARDED:
        return (
          <Box sx={REWARD_STATUS_INDICATOR}>
            <Typography variant="SemiBold_14" color={"#FFCB45"}>
              {rewardStatus.toUpperCase()}
            </Typography>
          </Box>
        );
      case TASK_REWARD_STATUS.NOT_ACTIVE:
        return (
          <Box sx={REWARD_STATUS_INDICATOR}>
            <Typography variant="SemiBold_14" color={"#ffffff"}>
              {"NOT ACTIVATED"}
            </Typography>
          </Box>
        );
      default:
        return <></>;
    }
  };
  return (
    <>
      <Box sx={REWARD_CARD_BOX}>
        <Box sx={REWARD_CARD_BG}>
          <Typography color="text.main" variant="Bold_20" sx={REWARD_NAME_STYLE}>
            {rewardName}
          </Typography>
          <Typography variant="Bold_24" sx={REWARD_AMT_STYLE}>
            {rewardAmount} {"USDT"}
          </Typography>
          <Box variant="Bold_24" sx={REWARD_IMG_STYLE}>
            <img src={RewardImageSelector(rewardName)} style={{ width: 120, heigth: 120 }}></img>
          </Box>
        </Box>
        <Box sx={REWARD_CONTENT_WRAPPER}>
          {!(rewardStatus === "rewarded") ? (
            <Box sx={{ marginTop: "-5px", width: "180px" }}>
              {rewardName === "KYC" ? (
                <Typography variant="Regular_12">
                  {"Reward might expire 7 days after kyc verification"}
                  {"  "}
                  <Link sx={{ cursor: "pointer" }}>
                    <Typography variant="Medium_12" onClick={() => setOpenRewardTnC(true)}>
                      Learn more
                    </Typography>
                  </Link>
                </Typography>
              ) : (
                <Typography variant="Regular_12">
                  {"Reward might expire 7 days after sign up"}
                  {"  "}
                  <Link sx={{ cursor: "pointer" }}>
                    <Typography variant="Medium_12" onClick={() => setOpenRewardTnC(true)}>
                      Learn more
                    </Typography>
                  </Link>
                </Typography>
              )}
            </Box>
          ) : (
            <Box></Box>
          )}
          {cardStatus()}
        </Box>
      </Box>
      <RewardTnCModal openRewardTnC={openRewardTnC} handleClose={handleRewardTnCClose} />
    </>
  );
};

export default RewardCard;
RewardCard.propTypes = {
  rewardName: PropTypes.string,
  expiryDate: PropTypes.string,
  rewardAmount: PropTypes.number,
  rewardDuration: PropTypes.number,
  rewardStatus: PropTypes.string
};
