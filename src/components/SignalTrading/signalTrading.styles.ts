export const SIGNAL_HEADER: {
  width: string;
  display: string;
  justifyContent: string;
  alignItems: string;
} = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

export const TOGGLE_GROUP_STYLING = {
  "& .MuiToggleButtonGroup-grouped": {
    minWidth: "50px",
    mt: 2.5,
    mr: 3,
    "&.MuiToggleButton-root": {
      p: "6px"
    }
  }
};

export const TOGGLE_STYLES = {
  ".Mui-selected": {
    backgroundColor: "#383840",
    color: "yellow"
  }
};

export const BUY_TAB_STYLES = {
  borderRadius: "4px",
  background: "linear-gradient(180deg, #29B57E -234.85%, #0E0E0F 146.96%)",
  px: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  py: 0.3
};

export const SELL_TAB_STYLES = {
  ...BUY_TAB_STYLES,
  background: "linear-gradient(180deg, #FF6554 -185.78%, #0E0E0F 138.65%)"
};

export const SUCCESS_TAB_STYLES = {
  backgroundColor: "text.success",
  px: 3,
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  py: 0.3
};
export const PENDING_TAB_STYLES = {
  ...SUCCESS_TAB_STYLES,
  backgroundColor: "#EBB62F"
};

export const ERROR_TAB_STYLES = {
  ...SUCCESS_TAB_STYLES,
  backgroundColor: "#FF6554"
};

export const DEFAULT_TAB_STYLES = {
  ...SUCCESS_TAB_STYLES,
  backgroundColor: "background.tertiary"
};
