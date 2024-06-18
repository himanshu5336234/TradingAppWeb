import { typography } from "@/assets/Theme/typography";

import { PORTFOLIO_CONSTANTS } from "../../../frontend-BL/businessHooks/PORTFOLIO/Constants/Portfolio.const";
// import { TABS_CONSTANTS } from "frontend-BL/WALLET/Constants/Tabs.const";
import { TABS_CONSTANTS } from "../../../frontend-BL/businessHooks/WALLET/Constants/Tabs.const";

export const styles = {
  statistic: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1
  },
  Mobstatistic: {
    display: "none",
    justifyContent: "space-between",
    alignItems: "space-between",
    gap: 1
  },
  statisticTop: { ...typography.SemiBold_16, color: "text.mild" },
  MobstatisticTop: { ...typography.SemiBold_14, color: "text.mild" },
  statisticBtm: { ...typography.SemiBold_16, color: "text.regular" },
  MobstatisticBtm: { ...typography.SemiBold_14, color: "text.regular", py: 0.2 }
};

export const returnSxProp = (sourceComponent) => {
  if (sourceComponent === PORTFOLIO_CONSTANTS.PORTFOLIO_LABEL) {
    return styles.statistic;
  } else if (sourceComponent === TABS_CONSTANTS.FIAT_WALLET) {
    return styles.Mobstatistic;
  } else if (sourceComponent === TABS_CONSTANTS.FUTURES_WALLET) {
    return styles.Mobstatistic;
  }
  return styles.statistic;
};
