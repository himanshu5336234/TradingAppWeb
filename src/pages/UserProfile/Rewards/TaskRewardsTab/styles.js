import RewardBG from "ASSETS/images/userSettings/ReferralTabs/RewardBG.svg";

export const RADIO_BUTTONGROUP_WRAPPER = { display: "flex", justifyContent: "flex-start", ml: 3, p: 2 };

export const REWARDCARD_GRID_CONTAINER_STYLE = { ml: 3, pl: 2, position: "relative", overflowY: "scroll", "&::-webkit-scrollbar": { display: "none" }, maxHeight: "750px" };

// REWARD CARD STYLES
export const REWARD_CARD_BOX = { width: 350, height: 297, backgroundColor: "inherit", borderRadius: "18px", overflow: "hidden" };
export const REWARD_CARD_BG = { width: "100%", height: "71%", backgroundImage: `url(${RewardBG})`, objectFit: "contain", position: "relative" };
export const REWARD_NAME_STYLE = { position: "absolute", top: 5, left: 10, py: 1 };
export const REWARD_AMT_STYLE = { position: "absolute", top: 100, left: 50, py: 1 };
export const REWARD_IMG_STYLE = { position: "absolute", width: 120, height: 120, backgroundColor: "inherit", top: 70, right: 60, display: "flex", justifyContent: "center" };
export const REWARD_CONTENT_WRAPPER = {
  width: "100%",
  height: "33.63%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#2C2C34",
  marginTop: "-5px",
  paddingInline: "20px"
};
export const REWARD_TNC_LIST_ITEM_WRAPPER = { display: "flex", flexDirection: "column", alignItems: "start", width: "auto" };
export const REWARD_LISTITEM_STYLE = { display: "list-item", width: "5%", paddingTop: "0px ", "::marker": { color: "#A9A9A9" } };
export const REWARD_CONTENT_TEXT_ALIGNMENT = { display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "-5px" };
export const REWARD_STATUS_INDICATOR = {
  height: "30px",
  maxWidth: "150px",
  minWidth: "82px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  padding: "8px 14px",
  backgroundColor: "#4C4C57"
};
