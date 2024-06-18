import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { mobileViewActiveFlex, WebViewActiveFlex } from "../MWebStyles/MWeb.styles";
import { returnSxProp, styles } from "./TabStatistic.style";
// import { PORTFOLIO_CONSTANTS } from "frontend-BL/businessHooks/PORTFOLIO/Constants/Portfolio.const";
// import { TABS_CONSTANTS } from "frontend-BL/businessHooks/WALLET/Constants/Tabs.const";

const TabStatisticMobile = ({ name, value, colorIndicator, sourceComponent }) => (
  <>
    <Box sx={[mobileViewActiveFlex, returnSxProp(sourceComponent)]}>
      <Box>
        <Typography sx={styles.MobstatisticTop}>{name}</Typography>
      </Box>
      <Box sx={mobileViewActiveFlex}>
        <Typography
          sx={{
            ...styles.MobstatisticBtm,
            ...(colorIndicator === true && (value > 0 ? { color: "trade.primary" } : parseFloat(value) === 0 ? { color: "text.regular" } : { color: "trade.secondary" }))
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  </>
);

const TabStatistic = ({ name, value, colorIndicator, sourceComponent }) => (
  <>
    {/* Web Tab Statistics */}
    <Box sx={[styles.statistic, WebViewActiveFlex]}>
      <Typography sx={styles.statisticTop}>{name}</Typography>
      <Typography
        sx={{ ...styles.statisticBtm, ...(colorIndicator === true && (value > 0 ? { color: "trade.primary" } : parseFloat(value) === 0 ? { color: "text.regular" } : { color: "trade.secondary" })) }}
      >
        {value}
      </Typography>
    </Box>
    {/* Mobile Tab Statistics */}
    <TabStatisticMobile name={name} value={value} colorIndicator={colorIndicator} sourceComponent={sourceComponent} />
  </>
);

TabStatistic.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  colorIndicator: PropTypes.bool,
  sourceComponent: PropTypes.any
};
TabStatisticMobile.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  colorIndicator: PropTypes.bool,
  sourceComponent: PropTypes.any
};

export default TabStatistic;
