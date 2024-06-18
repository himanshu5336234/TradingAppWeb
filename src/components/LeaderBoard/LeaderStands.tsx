import { Box, Typography } from "@mui/material";
import CrownImg from "ASSETS/images/SignalTradingLandingPage/Crown.svg";
import PropTypes from "prop-types";
import React from "react";
import {
  CROWNIMGSTYLE,
  LEADER1AVATARSTYLE,
  LEADER2AVATARPOS,
  LEADER2AVATARSTYLE,
  LEADER3AVATARPOS,
  LEADER3AVATARSTYLE,
  LEFTRIBBONSTYLE,
  RANK1BOXSTYLE,
  RANK1DETAILSBOX,
  RANK1TEXTSTYLE,
  RANK2BOXSTYLE,
  RANK2DETAILSBOX1,
  RANK2TEXTSTYLE,
  RANK3BOXSTYLE,
  RANK3DETAILSBOX,
  RANK3TEXTSTYLE,
  RANKDETAILSBOX2,
  RANKNAME,
  RANKVOL,
  RANKVOLTEXT,
  RIGHTRIBBONSTYLE,
  STAND1BOX,
  STAND2BOX,
  STAND3BOX,
  STANDINGSWRAPPER1,
  STANDINGSWRAPPER2
} from "@/pages/LeaderBoard/styles";
import { numberWithCommas } from "@/helpers/commaHelper";

interface LeaderStandsProps {
  leaders: {
    firstRank: {
      name: string;
      volume: number;
    };
    secondRank: {
      name: string;
      volume: number;
    };
    thirdRank: {
      name: string;
      volume: number;
    };
  };
}

const LeaderStands: React.FC<LeaderStandsProps> = ({ leaders }) => {
  return (
    <Box sx={STANDINGSWRAPPER1}>
      <Box sx={STANDINGSWRAPPER2}>
        <Box sx={STAND2BOX}>
          <Box sx={LEADER2AVATARPOS}>
            <Box sx={{ ...LEADER2AVATARSTYLE, backgroundImage: `url("https://static-dev.density.exchange/avatar/User%2005a.svg")` }}>
              {/* <img src={LeaderAvatar} style={{ position: "relative", objectFit: "contain" }}/> */}
            </Box>
            <Box sx={RANK2BOXSTYLE}>
              <Typography sx={RANK2TEXTSTYLE}>2</Typography>
            </Box>
          </Box>
          <Box sx={RANK2DETAILSBOX1}>
            <Box sx={RANKDETAILSBOX2}>
              <Typography sx={RANKNAME}>{leaders?.secondRank?.name}</Typography>
              <Typography sx={RANKVOL} color="text.main">
                {numberWithCommas(leaders?.secondRank?.volume)}
              </Typography>
              <Typography sx={RANKVOLTEXT} color="#B7B3B3">
                Volume (in USDT)
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={STAND1BOX}>
          <Box sx={{ position: "absolute", top: "-44%", left: "50%", transform: "translate(-50%,15%)", zIndex: 3 }}>
            <Box
              sx={{
                ...LEADER1AVATARSTYLE,
                backgroundImage: `url("https://static-dev.density.exchange/avatar/User%2005b.svg")`
              }}
            >
              {/* <img src={LeaderAvatar} style={{ position: "relative", objectFit: "contain" }}/> */}
            </Box>
            <Box sx={RANK1BOXSTYLE}>
              <Typography sx={RANK1TEXTSTYLE}>1</Typography>
            </Box>
          </Box>
          {/* ribbons */}
          <Box sx={{ position: "absolute", top: { xs: -85, sm: -100, md: -112 } }}>
            <Box component={"img"} src={CrownImg} alt="crown" sx={CROWNIMGSTYLE} />
          </Box>
          <Box sx={LEFTRIBBONSTYLE} />
          <Box sx={RIGHTRIBBONSTYLE} />
          <Box sx={RANK1DETAILSBOX}>
            <Box sx={RANKDETAILSBOX2}>
              <Typography sx={RANKNAME}>{leaders?.firstRank?.name}</Typography>
              <Typography sx={RANKVOL} color="text.main">
                {numberWithCommas(leaders?.firstRank?.volume)}
              </Typography>
              <Typography sx={RANKVOLTEXT} color="#B7B3B3">
                Volume (in USDT)
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={STAND3BOX}>
          <Box sx={LEADER3AVATARPOS}>
            <Box sx={{ ...LEADER3AVATARSTYLE, backgroundImage: `url("https://static-dev.density.exchange/avatar/User%2001b.svg")` }}></Box>
            <Box sx={RANK3BOXSTYLE}>
              <Typography sx={RANK3TEXTSTYLE}>3</Typography>
            </Box>
          </Box>
          <Box sx={RANK3DETAILSBOX}>
            <Box sx={RANKDETAILSBOX2}>
              <Typography sx={RANKNAME}>{leaders?.thirdRank?.name}</Typography>
              <Typography sx={RANKVOL} color="text.main">
                {numberWithCommas(leaders?.thirdRank?.volume)}
              </Typography>
              <Typography sx={RANKVOLTEXT} color="#B7B3B3">
                Volume (in USDT)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

LeaderStands.propTypes = {
  leaders: PropTypes.shape({
    firstRank: PropTypes.shape({
      name: PropTypes.string.isRequired,
      volume: PropTypes.number.isRequired
    }).isRequired,
    secondRank: PropTypes.shape({
      name: PropTypes.string.isRequired,
      volume: PropTypes.number.isRequired
    }).isRequired,
    thirdRank: PropTypes.shape({
      name: PropTypes.string.isRequired,
      volume: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};
export default LeaderStands;
