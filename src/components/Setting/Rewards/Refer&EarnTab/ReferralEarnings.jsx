import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import PropTypes from "prop-types";
import { EARNINGS_WRAPPER, LEVEL_BOX, TOTAL_EARNINGS_WRAPPER, VOLUME_AND_LEVEL_BOX, VOLUME_BOX } from "@/pages/UserProfile/Rewards/styles";

const ReferralEarnings = ({ totalEarnings, totalVolume, Level }) => {
  return (
    <Box sx={EARNINGS_WRAPPER}>
      <Box sx={TOTAL_EARNINGS_WRAPPER}>
        <Typography color="text.main" variant="SemiBold_16" alignSelf="center" component="p" py={1}>
          {"My Earnings"}
          <Tooltip title={"Earning will be reflected in Wallet once proccessed"} placement="right-start">
            <InfoIcon
              sx={{
                fontSize: "small",
                color: "#A9A9A9",
                marginBottom: "-2px",
                marginLeft: 1
              }}
            ></InfoIcon>
          </Tooltip>
        </Typography>
        <Typography sx={{ alignSelf: "center" }} variant="SemiBold_22" component={"h2"}>
          {totalEarnings?.toFixed(4)} {"USDT"}
        </Typography>
      </Box>
      <Box sx={VOLUME_AND_LEVEL_BOX}>
        <Box sx={VOLUME_BOX}>
          <Typography variant={"Regular_16"} color="text.main" component={"h2"} paddingY={1} textAlign="center">
            {"Referee Volume"}
          </Typography>
          <Typography variant="SemiBold_22" component={"p"}>
            {totalVolume?.toFixed(1)}{" "}
            <Typography component={"span"} variant="SemiBold_12">
              USDT
            </Typography>
          </Typography>
        </Box>
        <Box sx={LEVEL_BOX}>
          <Typography variant={"Regular_16"} color="text.main" component={"h2"} paddingY={1} textAlign="center">
            {"Level"}
          </Typography>
          <Typography variant="SemiBold_22" component={"p"}>
            {Level ?? 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ReferralEarnings;
ReferralEarnings.propTypes = {
  totalEarnings: PropTypes.number,
  totalVolume: PropTypes.number,
  Level: PropTypes.string
};
