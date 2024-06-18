import { Box, Link, Typography, Grid } from "@mui/material";
import arrow from "../../assets/images/userSettings/ReferralTabs/arrow.svg";

import React from "react";
import PropTypes from "prop-types";
import { REWARD_TNC_LIST_ITEM_WRAPPER } from "@/pages/UserProfile/Rewards/TaskRewardsTab/styles";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";

const LeaderBoardModal = ({ openLeaderBoardModal, handleClose }) => {
  // NOTE: UPDATE CONTENT
  return (
    <CustomModal IsOpen={openLeaderBoardModal} isClose={true} close={handleClose} isSecondaryAction={false} primaryAction={handleClose} ContainerSx={{ width: "660px", height: "420px" }}>
      <Grid>
        <Box>
          <Typography
            component={"span"}
            variant={"Medium_16"}
            color={"text.primary"}
            sx={{
              py: "28px",
              paddingLeft: "10px"
            }}
          >
            Know LeaderBoard
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              paddingTop: "20px",
              paddingLeft: "10px",
              columnGap: "15px",
              rowGap: "15px"
            }}
          >
            <Box sx={REWARD_TNC_LIST_ITEM_WRAPPER}>
              <Typography component={"p"} variant={"Medium_12"} color={"white"}>
                {"Live Tracking:"}{" "}
              </Typography>
              <Typography component={"p"} variant={"Regular_12"} color={"#A0A0A0"} sx={{ marginTop: "8px", lineHeight: "16px" }}>
                Our rankings are updated <br /> after every 2 minutes.
              </Typography>
            </Box>
            <Box sx={REWARD_TNC_LIST_ITEM_WRAPPER}>
              <Typography component={"p"} variant={"Medium_12"} color={"white"}>
                {"Personalised User Experience:  "}
              </Typography>
              <Typography component={"span"} variant={"Regular_12"} color={"#A0A0A0"} sx={{ marginTop: "8px" }}>
                Customise your profile with a nickname or use an anonymised email ID for privacy protection
              </Typography>
            </Box>
            <Box sx={REWARD_TNC_LIST_ITEM_WRAPPER}>
              <Typography component={"p"} variant={"Medium_12"} color={"white"}>
                {"Discover Rankings:"}{" "}
              </Typography>
              <Typography component={"span"} variant={"Regular_12"} color={"#A0A0A0"} sx={{ marginTop: "8px" }}>
                {"Our rankings are based on the trading volume within specific time frames on rolling basis."}
              </Typography>
            </Box>
            <Box sx={REWARD_TNC_LIST_ITEM_WRAPPER}>
              <Typography component={"p"} variant={"Medium_12"} color={"white"}>
                {"Identify Favourite Pairs:  "}
              </Typography>
              <Typography component={"span"} variant={"Regular_12"} color={"#A0A0A0"} sx={{ marginTop: "8px" }}>
                Uncover the most dynamic <br /> coin pairs in terms of volume <br /> in your chosen time frame <br /> for active and sought-after <br /> trading opportunities.
              </Typography>
            </Box>
            <Box sx={REWARD_TNC_LIST_ITEM_WRAPPER}>
              <Typography component={"p"} variant={"Medium_12"} color={"white"}>
                {"Flexible Data Filtering:"}{" "}
              </Typography>
              <Typography component={"span"} variant={"Regular_12"} color={"#A0A0A0"} sx={{ marginTop: "8px" }}>
                Customise analysis by <br /> filtering Rankings and Data <br />
                based on popular time frames <br />
                like 1 day, 1 week, 1 month, or
                <br /> Customised date.
              </Typography>
            </Box>
            <Box sx={REWARD_TNC_LIST_ITEM_WRAPPER}>
              <Typography component={"p"} variant={"Medium_12"} color={"white"}>
                {"Win Rate Assessment"}{" "}
              </Typography>
              <Typography component={"span"} variant={"Regular_12"} color={"#A0A0A0"} sx={{ marginTop: "8px" }}>
                {"Gauge trading performance with our win rate metric, measuring the ratio of orders with Profit to total orders with P&L in the selected time frame."}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            py: "10px",
            px: "24px",
            marginTop: "40px",
            marginLeft: "10px",
            marginRight: "10px",
            borderRadius: "4px",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography variant="Regular_12">
              {"Experience the power of our platform and elevate your trading game! "}
              <Link sx={{ textDecoration: "none", cursor: "pointer" }} target="_blank" href="https://density.exchange/trading-competition">
                <Typography variant="SemiBold_12" component={"p"} color="text.main">
                  {"Join The Live Competition Now!"}
                </Typography>
              </Link>
            </Typography>
          </Box>
          <Link sx={{ textDecoration: "none", cursor: "pointer", marginTop: "15px" }} target="_blank" href="https://density.exchange/trading-competition">
            <img src={arrow} alt="link to live competition" />
          </Link>
        </Box>
      </Grid>
    </CustomModal>
  );
};

export default LeaderBoardModal;
LeaderBoardModal.propTypes = {
  openLeaderBoardModal: PropTypes.bool,
  handleClose: PropTypes.func
};
