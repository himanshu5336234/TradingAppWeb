import { Box, ListItem, Typography } from "@mui/material";
import React from "react";
// import SignupRewardIcon from "ASSETS/images/userSettings/ReferralTabs/TrophySmall.svg";
import KYCRewardIcon from "ASSETS/images/userSettings/ReferralTabs/KYCSmallImg.svg";
import PropTypes from "prop-types";
import { REWARD_LISTITEM_STYLE, REWARD_TNC_LIST_ITEM_WRAPPER } from "@/pages/UserProfile/Rewards/TaskRewardsTab/styles";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";

const RewardTnCModal = ({ openRewardTnC, handleClose }) => {
  return (
    <CustomModal IsOpen={openRewardTnC} primaryName="Close" isClose={true} close={handleClose} isPrimaryAction={true} isSecondaryAction={false} primaryAction={handleClose}>
      <Box>
        {/* <Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", paddingBottom: 1.5 }}>
              <Typography component={"span"}>
                <img src={SignupRewardIcon} style={{ marginTop: "-2px" }}></img>
              </Typography>
              <Typography component={"span"} variant={"SemiBold_20"} color={"text.main"}>
                5 USDT on Sign Up{" "}
              </Typography>
            </Box>
            <Box sx={REWARD_TNC_LIST_ITEM_WRAPPER}>
              <ListItem sx={REWARD_LISTITEM_STYLE}></ListItem>
              <Typography component={"p"} variant={"Regular_14"} color={"#A0A0A0"}>
                {"The reward gets"}{" "}
                <Typography component={"span"} variant={"Regular_14"} color={"white"}>
                  {" expired after 7 Days "}
                </Typography>
                {"from the Sign Up date if no trade is done within those 7 days."}
              </Typography>
            </Box>
            <Box sx={REWARD_TNC_LIST_ITEM_WRAPPER}>
              <ListItem sx={REWARD_LISTITEM_STYLE}></ListItem>
              <Typography component={"p"} variant={"Regular_14"} color={"#A0A0A0"}>
                {"5 USDT remains active in the wallet for the first 7 Days after the Sign Up date. In order to get rewarded 5 USDT,"}
                <Typography component={"span"} variant={"Regular_14"} color={"white"}>
                  {" user needs to place minimum of 1 trade "}
                </Typography>
                {"before the expiration date."}
              </Typography>
            </Box>
          </Box> */}
        <Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", paddingBottom: 1.5 }}>
            <Typography component={"span"} paddingTop={1}>
              <img src={KYCRewardIcon} style={{ marginTop: "2px", marginLeft: "-5px" }}></img>
            </Typography>
            <Typography component={"span"} variant={"SemiBold_20"} color={"text.main"}>
              5 USDT on KYC Verification{" "}
            </Typography>
          </Box>
          <Box sx={REWARD_TNC_LIST_ITEM_WRAPPER}>
            <ListItem sx={REWARD_LISTITEM_STYLE}></ListItem>
            <Typography component={"p"} variant={"Regular_14"} color={"#A0A0A0"}>
              {"The reward gets"}{" "}
              <Typography component={"span"} variant={"Regular_14"} color={"white"}>
                {" expired after 7 Days "}
              </Typography>
              {"from the KYC Verification date if no trade is done within those 7 days."}
            </Typography>
          </Box>
          <Box sx={REWARD_TNC_LIST_ITEM_WRAPPER}>
            <ListItem sx={REWARD_LISTITEM_STYLE}></ListItem>
            <Typography component={"p"} variant={"Regular_14"} color={"#A0A0A0"}>
              {"5 USDT remains active in the wallet for the first 7 Days after the KYC Verification date. In order to get rewarded 5 USDT,"}
              <Typography component={"span"} variant={"Regular_14"} color={"white"}>
                {" user needs to place minimum of 2 trade "}
              </Typography>
              {"before the expiration date."}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default RewardTnCModal;
RewardTnCModal.propTypes = {
  openRewardTnC: PropTypes.bool,
  handleClose: PropTypes.func
};
