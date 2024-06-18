export const SETTING_LIST_ITEM_STYLE = {
  height: 50,
  px: 2,
  py: 1,
  "&:hover": { backgroundColor: "background.primary" },
  "&.Mui-selected": {
    backgroundColor: "background.secondary",
    color: "text.main",
    borderRight: "0.1px solid #C6EB3B",
    fontWeight: 700
  }
};

export const SETTING_LIST_BUTTON_STYLE = {
  pl: 0,
  "&:hover": { backgroundColor: "transparent" }
};
export const SETTING_ICON_STYLE = { fontSize: "25px", mb: 0.2 };
export const SETTING_LIST_ICON_STYLE = { color: "inherit", minWidth: "40px" };
export const SETTING_LIST_TEXT_STYLE = {
  ".MuiTypography-root": { fontSize: "14px", fontWeight: "inherit" }
};

export const REWARD_LIST_ITEM_STYLE = {
  "&:hover": { backgroundColor: "transparent" },
  "&.Mui-selected": { backgroundColor: "transparent", color: "text.main" }
};

export const USER_SETTING_WRAPPER = { maxWidth: "xl", margin: "auto" };

export const USER_SETTING_HEADER = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "50px",
  px: 2
};

export const SETTING_LIST_WRAPPER = {
  height: "96vh",
  pt: 4.5,
  pl: "16px",
  pr: "20px",
  backgroundColor: "background.primary",
  minWidth: "290px",
  overflowY: "scroll",
  "&::-webkit-scrollbar": { display: "none" },
  justifySelf: "flex-start"
};

export const SETTING_TAB_WRAPPER = {
  pt: 2,
  height: "96vh",
  overflowY: "auto",
  overflowX: "hidden",
  flexGrow: 2,
  justifySelf: "center"
};
