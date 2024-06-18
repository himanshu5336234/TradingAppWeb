import { Box, Button } from "@mui/material";
import { Grid, Typography } from "@mui/material";
// import BlockChainImg from "ASSETS/images/LeaderBoard/blockchain.webp";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
// import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import BannerFormat from "../PagesTopDataBanner/BannerFormat";
import PropTypes from "prop-types";

import React, { useState } from "react";
import { SIGNINBUTTON, USERSIGNINWRAPPER } from "@/pages/LeaderBoard/styles";
import { useNavigate } from "react-router-dom";
import LeaderBoardModal from "./LeaderBoardModal";

import TextView from "../UI/TextView/TextView";
import LeaderStands from "./LeaderStands";
import { useCheckLoginStatus } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
const LeaderBoardBanner = ({ userRankDetail, leaders, duration }) => {
  const { isLoggedIn } = useCheckLoginStatus();
  const navigate = useNavigate();
  const [openLeaderBoardModal, setOpenLeaderBoardModal] = useState(false);
  const handleModalClose = () => setOpenLeaderBoardModal(false);
  const SignInInfo = () => {
    return (
      <Box sx={USERSIGNINWRAPPER}>
        <Typography component="p" variant="SemiBold_20" sx={{ marginBottom: { xs: "5px", md: "20px" } }}>
          To Know Your Rank
        </Typography>
        <Button onClick={() => navigate("/auth/signin")} variant="primary" sx={SIGNINBUTTON}>
          Sign In
        </Button>
        <Typography variant="Regular_16" color="#BDBDBD">
          or not registered yet?{" "}
          <Typography component="span" variant="SemiBold_16" sx={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/auth/signup")} color="text.main">
            Sign Up
          </Typography>
        </Typography>
      </Box>
    );
  };

  const FavouritePair = (
    <>
      {userRankDetail.favPair && userRankDetail.favPair !== "--" ? (
        <>
          <Box
            component={"img"}
            src={getCurrencyUrl(userRankDetail.favPair.replace("USDT", "").toLowerCase())}
            alt="symbolLogo"
            sx={{
              height: 16,
              width: 16,
              marginBottom: "-4px",
              borderRadius: "50%",
              backgroundColor: "white"
            }}
          />
          <Typography variant={"Medium_12"} ml={1}>
            {userRankDetail.favPair}
          </Typography>
        </>
      ) : (
        <>
          {" "}
          <Typography variant={"Medium_12"} ml={1}>
            {userRankDetail.favPair}
          </Typography>
        </>
      )}
    </>
  );
  const dataDetails = {
    nickname: ["Your Nickname", userRankDetail.nickName],
    favPair: ["Favourite Pair", FavouritePair],
    Volume: ["Volume", userRankDetail.volume]
  };
  const child = (
    <Grid justifyContent={"space-between"}>
      <Grid
        item
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}

        // ml={4}
      >
        <TextView text={"Your Rank"} variant={"Medium_20"} />
        <TextView text={userRankDetail.rank} variant={"Medium_56"} color={"text.main"} />

        <span
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "18px",
            fontWeight: 400,
            color: "text.main"
          }}
          onClick={() => setOpenLeaderBoardModal(true)}
        >
          Know More
        </span>
        <LeaderBoardModal openLeaderBoardModal={openLeaderBoardModal} handleClose={handleModalClose} />
      </Grid>
    </Grid>
  );
  return (
    <>
      {isLoggedIn && (
        <Box>
          <BannerFormat
            image={""}
            child2={
              <Grid>
                <LeaderStands leaders={leaders} />
              </Grid>
            }
            dataDetails={dataDetails}
            child={child}
          />
        </Box>
      )}
      {!isLoggedIn && <SignInInfo />}
    </>
  );
};

export default LeaderBoardBanner;

LeaderBoardBanner.propTypes = {
  userRankDetail: PropTypes.object,
  leaders: PropTypes.object,
  loggedIn: PropTypes.bool,
  duration: PropTypes.string
};
