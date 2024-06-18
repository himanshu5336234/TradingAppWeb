import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { REWARD_GUIDE_BOX, REWARD_GUIDE_STYLE } from "@/pages/UserProfile/Rewards/styles";

const RewardGuide = ({ guideList }) => {
  return (
    <>
      <Box sx={REWARD_GUIDE_BOX}>
        <Typography variant={"SemiBold_28"} component={"h2"}>
          {"How it Works ?"}
        </Typography>
        {/* <Typography color={"text.main"} variant="SemiBold_18" component={"h4"} sx={{ textDecoration: "underline" }}>
          {"Learn More"}
        </Typography> */}
      </Box>
      <Box sx={REWARD_GUIDE_STYLE}>
        <ol style={{ marginTop: 1 }}>
          {guideList.map((guide, index) => (
            <li key={index} style={{ paddingBottom: "15px" }}>
              <Typography variant="Regular_18">{guide}</Typography>
            </li>
          ))}
        </ol>
      </Box>
    </>
  );
};

export default RewardGuide;

RewardGuide.propTypes = {
  guideList: PropTypes.array
};
