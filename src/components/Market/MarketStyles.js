export const toggleButtonStyles = {
  height: "32px",
  alignItems: "center",
  padding: "8px"
  // width: "130px"
};

export const toggleButtonStylesCalender = {
  height: "24px",
  alignItems: "center",
  padding: "8px",
  paddingRight: "16px",
  paddingLeft: "16px"
};

export const TOGGLE_BUTTON_GROUP = {
  display: "flex",
  // width: "90%",
  // justifyContent: "start",
  gap: 3,
  "& .MuiToggleButtonGroup-grouped": {
    padding: "8px 32px",
    "&:not(:last-of-type)": {
      borderRadius: "8px",
      borderWidth: "1px",
      border: "1px solid red"
    },
    "&:not(:first-of-type)": {
      borderRadius: "8px",
      marginLeft: 0
    }
  }
};
export const MarketCardContainer = {
  width: "100%",
  py: 1,
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "neutral.grey2"
  },
  display: "flex",
  flexDirection: "column",
  gap: 1,
  zIndex: 1
};
export const RowWrapper = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};
