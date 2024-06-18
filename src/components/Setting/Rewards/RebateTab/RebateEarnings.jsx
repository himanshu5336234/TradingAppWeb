import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { EARNINGS_WRAPPER, LEVEL_BOX, TOTAL_EARNINGS_WRAPPER, VOLUME_AND_LEVEL_BOX, VOLUME_BOX } from "@/pages/UserProfile/Rewards/styles";

const RebateEarnings = ({ totalEarnings, fees, rebatePercentage }) => {
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
          <Tooltip title={"in USDT"} placement="left-start">
            <Typography variant={"Regular_16"} color="text.main" component={"h2"} paddingY={1} textAlign="center">
              {"Fees"}
            </Typography>
          </Tooltip>
          <Typography variant="SemiBold_22" component={"p"}>
            {fees?.toFixed(4)}{" "}
            <Typography component={"span"} variant="SemiBold_12">
              USDT
            </Typography>
          </Typography>
        </Box>
        <Box sx={LEVEL_BOX}>
          <Typography variant={"Regular_16"} color="text.main" component={"h2"} paddingY={1} textAlign="center">
            {"Rebate %"}
          </Typography>
          <Typography variant="SemiBold_22" component={"p"}>
            {rebatePercentage}
            {"%"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RebateEarnings;
RebateEarnings.propTypes = {
  totalEarnings: PropTypes.number,
  fees: PropTypes.number,
  rebatePercentage: PropTypes.number
};
