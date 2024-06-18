import { Box, Grid, Link, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { INFOICONWRAPPER, USERRANKDATAWRAPPER, USERRANKFONT } from "@/pages/LeaderBoard/styles";
// import userology from "userology-sdk";
import { useNavigate } from "react-router-dom";
import { USER_SETTING_TABS } from "@/pages/UserProfile/Constants";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import { numberWithCommas } from "@/helpers/commaHelper";
// import { useNavigate } from "react-router-dom";

export const UserRankInfo = ({ userRankDetail, duration }) => {
  //   const [openUserStats, setOpenUserStats] = useState(false);
  const [durationInfo, setDurationInfo] = useState("Weekly");
  const navigate = useNavigate();
  const durationInfoFormatter = () => {
    if (duration === "week") {
      return "Weekly";
    } else if (duration === "month") {
      return "Monthly";
    } else if (duration === "day") {
      return "Daily";
    } else {
      return "Competition";
    }
  };
  const UserNickNameSection = () => {
    if (userRankDetail.nickName) {
      return (
        <Typography component={"p"} variant={"Medium_16"} color={"white"}>
          {userRankDetail?.nickName}
        </Typography>
      );
    } else {
      return (
        <Typography component={"p"} variant={"Medium_16"} color={"white"} sx={{ display: "flex", alignItems: "center" }}>
          Add Nickname{" "}
          <Link
            onClick={() =>
              navigate(USER_SETTING_TABS.PERSONAL_DETAILS.route, {
                state: { currentTab: USER_SETTING_TABS.PERSONAL_DETAILS }
              })
            }
            sx={{ cursor: "pointer", textDecoration: "none" }}
          >
            <BorderColorOutlinedIcon
              sx={{
                color: "#E2FF6F",
                fontSize: "18px",
                marginTop: 0,
                marginLeft: 0.5
              }}
            />
          </Link>
        </Typography>
      );
    }
  };

  useEffect(() => {
    setDurationInfo(() => durationInfoFormatter());
  }, [duration]);

  return (
    <Box sx={USERRANKDATAWRAPPER}>
      <Box>
        <Typography variant={"SemiBold_18"} component={"p"}>
          Your Rank
        </Typography>
        <Typography color="text.main" component={"p"} sx={USERRANKFONT}>
          {userRankDetail?.rank <= 9 && 0}
          {userRankDetail?.rank}
        </Typography>
      </Box>
      <Box sx={{ minWidth: "150px", maxWidth: "300px", height: 100 }}>
        {true && (
          <Grid
            container
            gap={3}
            sx={{
              color: "text.secondary",
              marginTop: { sm: 0.5, md: 1 }
            }}
          >
            <Grid item xs={5.5}>
              <Typography component={"p"} variant="Regular_12">
                Nickname
              </Typography>
              <Typography>{UserNickNameSection()}</Typography>
            </Grid>
            <Grid item xs={5.5}>
              <Typography component={"p"} variant="Regular_12">
                Favourite Pair:
              </Typography>
              <Box sx={{ display: "flex", gap: "5px" }}>
                <Box
                  component={"img"}
                  src={getCurrencyUrl(userRankDetail?.favPair?.replace("USDT", "").toLowerCase())}
                  alt="symbolLogo"
                  sx={{
                    height: 20,
                    width: 20,
                    borderRadius: "50%",
                    backgroundColor: "white"
                  }}
                />
                <Typography component={"span"} variant={"Medium_16"} color={"white"}>
                  {userRankDetail?.favPair}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5.5}>
              <Typography component={"p"} variant="Regular_12">
                Volume
              </Typography>
              <Typography component={"p"} variant={"Medium_16"} color={"white"}>
                {numberWithCommas(userRankDetail?.volume)}
                <Tooltip title={durationInfo} placement="top">
                  <InfoOutlinedIcon sx={INFOICONWRAPPER}></InfoOutlinedIcon>
                </Tooltip>
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

UserRankInfo.propTypes = {
  userRankDetail: PropTypes.object,
  duration: PropTypes.string
};
