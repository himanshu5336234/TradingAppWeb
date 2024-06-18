export const TOGGLE_BUTTON_GROUP = {
  "& .MuiToggleButtonGroup-grouped": {
    minWidth: "138px",
    height: "30px",
    mr: 5,
    display: "flex",
    justifyContent: "center",
    "&.MuiToggleButton-root": {
      p: "6px",
      m: 0,
      mr: 1,
      ml: 0.5
    }
  },
  "&:not(:first-of-type)": {
    border: "1px solid",
    borderColor: "text.main"
  }
};

export const CONVERSION_TOGGLE_BUTTON_GROUP = {
  "& .MuiToggleButtonGroup-grouped": {
    minWidth: "138px",
    height: "40px",
    mr: 0,
    display: "flex",
    justifyContent: "center",
    "&.MuiToggleButton-root": {
      p: "6px",
      m: 0,
      mr: 1.5,
      ml: 0.5
    }
  },
  "&:not(:first-of-type)": {
    border: "1px solid",
    borderColor: "text.main"
  }
};
export const TOGGLE_BUTTON = {
  outlineColor: "#E2FF6F",
  outlineWidth: "1px",
  outlineStyle: "solid",
  "&.Mui-selected": {
    color: "black",
    backgroundColor: "#E2FF6F",
    "&:hover": {
      backgroundColor: "#E2FF6F"
    }
  }
};
export const TOGGLE_BUTTON_HEADER = {
  outlineWidth: "none",
  border: 0,
  color: "white",
  outlineStyle: "none",
  "&.Mui-selected": {
    color: "black",
    outlineStyle: "none",
    backgroundColor: "#E2FF6F",
    "&:hover": {
      backgroundColor: "#E2FF6F"
    }
  }
};

export const TOGGLE_BUTTON_GROUP_WRAPPER = {
  mb: "20px",
  overflow: "auto",
  py: "20px",
  display: { xs: "none", md: "block" }
};
export const TRANSACTION_HISTORY_HEADER_WRAPPER = {
  display: "flex",
  mb: "20px",
  alignItems: "start",
  justifyContent: "start"
};
export const REFRESH_ICON_STYLE = {
  fontSize: "20px",
  cursor: "pointer",
  marginTop: "7px"
};

export const DOWNLOAD_ICON_BUTTON = {
  mt: 0.5,
  height: "25px",
  width: "25px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "inherit"
  }
};

export const TABLE_ACTIONS_WRAPPER = { display: "flex", gap: 2, alignItems: "center" };

export const TABLE_WRAPPER_STYLE = {
  height: 450,
  display: { xs: "none", sm: "block" },
  "& .MuiDataGrid-root": {
    border: "none",
    "& .MuiDataGrid-cell": {
      border: "none"
    }
  },
  "& .MuiDataGrid-root .MuiDataGrid-cell": {
    border: "none" // Remove borders from all rows
  },
  "& .data-grid-header": {
    backgroundColor: "#2C2C34",
    fontSize: "16px",
    fontWeight: 300,
    color: "#A9A9A9"
  },
  "& .MuiDataGrid-columnHeader": {
    height: "48px !important" // Add bottom border to the column header row
  },
  "& .MuiDataGrid-columnHeaders": {
    borderBottom: "none" // Add bottom border to the column header row
  },
  "& .data-grid-even-rows": {
    background: "#1C1C1E",
    "&:hover": { backgroundColor: "#1C1C1E", PointerEvents: "none" }
  },
  "& .data-grid-odd-rows": {
    backgroundColor: "transparent",
    "&:hover": { backgroundColor: "transparent", PointerEvents: "none" }
  }
};

export const autoCompeleteWalletFilterStyle = {
  maxHeight: "32px",
  fontWeight: "600",
  fontSize: "14px",
  maxWidth: 170,
  "& .MuiOutlinedInput-root": {
    paddingY: "7px",
    paddingLeft: 1.5,
    maxHeight: "38px"
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #4F4F4F",
    backgroundColor: "rgba(79, 79, 79, 0.25)",
    padding: "1px"
  },
  "& .MuiAutocomplete-inputRoot": {
    margin: "0px",
    width: "100%"
  },
  "& .MuiAutocomplete-inputRoot .MuiAutocomplete-input": {
    width: "20% !important"
  },
  "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
    paddingRight: "2rem"
  }
};
