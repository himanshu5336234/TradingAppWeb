import EarningsFrame from "ASSETS/images/userSettings/ReferralTabs/EarningsFrame.svg";
export const TOGGLE_BUTTON_GROUP = {
  width: "100%",
  justifyContent: "center",
  gap: "20px",
  py: "20px",
  "& .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
    borderLeft: "1px solid"
  },
  "& .MuiButtonBase-root": {
    px: 1,
    py: 0.5
  }
};

export const REWARD_IMAGE_CONTAINER = { width: "140px", height: "159px", background: "#666673", padding: 1 };

export const GET_VERIFIED_BANNER_STYLE = {
  position: "absolute",
  display: {
    xs: "none",
    sm: "none",
    md: "flex",
    lg: "flex",
    xl: "flex"
  },
  zIndex: 2,
  top: "50px",
  left: 0,
  width: "100%",
  height: "45px",
  backgroundColor: "#F8FFDC",
  justifyContent: "space-between",
  alignItems: "center",
  px: 1
};

export const GET_VERIFIED_BUTTON_STYLE = {
  backgroundColor: "background.ultradark",
  display: "block",
  maxWidth: "300px",
  width: "100%",
  height: "35px",
  mx: "auto",
  color: "text.regular",
  textTransform: "none",
  "&:hover": { backgroundColor: "background.ultradark" }
};

export const REWARD_GUIDE_BOX = { display: "flex", justifyContent: "space-between", alignItems: "center", paddingY: 2 };

export const REWARD_GUIDE_STYLE = { backgroundColor: "#25252A", minHeight: "235px", overflowY: "scroll", padding: 2, maxHeight: "215px" };

export const TAB_HEADER_CONTENT_WRAPPER = { display: "flex", flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" }, justifyContent: "space-between", width: "100%" };
export const TAB_HEADER_TITLE_WRAPPER = { display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "20px", marginBottom: "30px", maxWidth: "45%", zIndex: 2, gap: 2 };
export const KYC_CTA_BUTTON = { backgroundColor: "background.mindaro", marginTop: "20px", width: "200px", cursor: "pointer", "&:hover": { backgroundColor: "background.mindaro" } };
export const HEADER_REFERRAL_CODE_CARD_WRAPPER = {
  zIndex: 2,
  display: { sm: "none", md: "none", lg: "block", xl: "block" },
  width: "330px",
  backgroundColor: "#25252B",
  position: "relative",
  right: "120px"
};

export const HOW_IT_WORKS_WRAPPER = { display: "flex", justifyContent: "space-between", alignItems: "center", px: 0.5, py: 2, flexWrap: "wrap" };
export const INSTRUCTION_CARD_FLEX = { display: "flex", justifyContent: "center" };
export const DATA_GRID_WRAPPER = {
  backgroundColor: "#2C2C34",
  height: "350px",
  "& .data-grid-header": {
    backgroundColor: "background.primary"
  },
  "& .data-grid-rows": {
    backgroundColor: "#2C2C34"
  }
};
export const INSTRUCTION_CARD_STYLE = { p: 2, backgroundColor: "background.secondary", display: "flex", width: "350px" };
export const INSTRUCTION_CARD_TEXT_FLEX = { display: "flex", flexDirection: "column", gap: 1 };
export const REFERRAL_CODE_BOX = {
  p: 2,
  background: "linear-gradient(307.31deg, rgba(135, 146, 47, 0.1) 14.85%, rgba(255, 255, 255, 0) 84.14%)",
  display: "flex",
  height: "100%",
  gap: "20px",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "start",
  borderRadius: 0,
  paddingTop: "20px",
  position: "relative",
  border: "0.1px solid #E2FF6F"
};
export const NO_ROWS_GRID_STYLE = { display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: "30px" };
export const REFERRAL_CODE_DISPLAY_STYLE = { display: "flex", justifyContent: "start", gap: "4px" };
export const REFERRAL_URL_BOX_STYLE = { display: "flex", justifyContent: "space-between", gap: "4px", width: "100%", border: "0.5px solid white" };
export const REFERRAL_MEDIA_SHARE_ICON_STYLE = { width: "30px", height: "30px", display: "flex", alignItems: "center" };
export const EMAIL_ICON = { height: "30px", width: "30px", color: "white", marginTop: "10px" };
export const DASHBOARD_CARD = {
  p: 1,
  backgroundImage: `url(${EarningsFrame})`,
  backgroundSize: "cover",
  backgroundRepeat: "repeat-x",
  backgroundColor: "transparent",
  display: "flex",
  minHeight: "235px",
  flexDirection: "column",
  borderRadius: 0
};
export const EARNINGS_WRAPPER = { position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" };
export const TOTAL_EARNINGS_WRAPPER = { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "80%" };
export const VOLUME_AND_LEVEL_BOX = { display: "flex", position: "relative", height: "50%", borderTop: "1px solid rgba(226, 255, 111, 0.47)", width: "80%" };
export const VOLUME_BOX = { width: "50%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", borderRight: "1px solid rgba(226, 255, 111, 0.47)" };
export const LEVEL_BOX = { width: "50%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" };
export const BANNER_WARNING_WRAPPER = { backgroundColor: "black", borderRadius: "50%", width: "20px", height: "20px" };
export const BANNER_WARNING_ICON_STYLE = { color: "text.main", fontSize: "29px", marginLeft: "-5px", marginTop: "-5px" };
export const GET_VERIFIED_CTA_WRAPPER = { display: "flex", gap: "30px", alignItems: "center" };
export const BANNER_CLOSE_WRAPPER = { backgroundColor: "#342D2C", width: "18px", height: "18px", cursor: "pointer" };
