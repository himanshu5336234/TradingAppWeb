// import { makeStyles } from "@mui/styles";

export const exitMarketLimitStyle = {
  color: "text.main",
  cursor: "pointer"
};

export const tableHeadStyle = {
  height: "13px",
  width: "20px",
  fontWeight: "300",
  textAlign: "center",
  padding: "14px",
  fontSize: "13px",
  lineHeight: "18px",
  color: "#FFFFFF"
};

export const tableHeadStyle1 = {
  height: "13px",
  width: "20px",
  fontWeight: "300",
  textAlign: "center",
  borderRight: "1px solid #5b5b5b",
  padding: "14px",
  fontSize: "13px",
  lineHeight: "18px",

  color: "#FFFFFF"
};

export const CategoryStyle1 = {
  borderBottom: "1px solid #5b5b5b",
  marginTop: "0px",
  marginLeft: "0px"
};

export const tablePositionCategoryStyle = {
  borderBottom: "0px solid rgba(224, 224, 224, 1)",
  "font-size": "1rem",
  textAlign: "center",
  "font-weight": "600",
  "line-height": "10px",
  color: "#ffffff",
  height: "13px"
};
export const positionSymbol = {
  borderBottom: "0px solid rgba(224, 224, 224, 1)",
  "font-size": "12px",
  "font-weight": "600",
  pointer: "cursor",
  color: "#FFFFFF",
  padding: "6.5px",
  "&:hover": {
    cursor: "pointer",
    color: "#E2FF6F",
    fontWeight: "900"
  }
};

export const tradeDateFilter = {
  marginTop: "0px",
  marginLeft: "0px",
  marginBottom: "8px"
};

export const tablePositionCategoryStyle2 = {
  borderBottom: "0px solid rgba(224, 224, 224, 1)",
  "font-weight": "400",
  textAlign: "center",
  "font-size": "12px",
  color: "#fff",
  padding: "3px",
  alignItems: "center"
};

export const tableRowStyle = {
  padding: "10px",
  "font-weight": "400",
  "font-size": "12px",
  "line-height": "13px",
  color: "#FFFFFF",
  textTransform: "none"
};

export const buttonRowStyle = {
  "border-bottom": "0.5px solid #333333",
  "border-top": "0.5px solid #333333",
  textTransform: "none"
};

export const tableButtonStyle = {
  height: "13px",
  "font-style": "normal",
  "font-weight": "600",
  "font-size": "10px",
  "line-height": "13px",
  color: "#5B86E5",
  "border-top": "none",
  "border-bottom": "none"
};

export const tablePaginationStyle = {
  "&.MuiTablePagination-selectLabel": {
    color: "#BDBDBD"
  },
  "&.MuiTablePagination-selectRoot": {
    color: "#BDBDBD"
  },
  "MuiTablePagination-toolbar": {
    "align-content": "end"
  },
  color: "#BDBDBD",
  width: "max-content",
  "border-top": "1px solid #333333",
  "border-bottom": "none"
};

export const addmarginiconstyle = {
  marginBottom: "-3%",
  fontSize: "1rem",
  "&:hover": {
    cursor: "pointer",
    color: "#E2FF6F",
    fontWeight: "900"
  }
};

export const singleGrid = {
  // borderRight: "1px solid #2c2c2c",
  // borderBottom: "1px solid #2c2c2c",
  // borderLeft: "1px solid #2c2c2c",
  // textAlign: "-webkit-center"
};

export const singleGrid1 = {
  // border: "0.5px solid #2c2c2c",
  textAlign: "left",
  alignItems: "flex-start",
  justifyContent: "center"
};

export const CLOSE_POSITIONS_SX = {
  fontSize: "0.555rem",
  padding: "3px 11px",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  marginTop: "8%",
  textTransform: "none",
  backgroundColor: "#ffffff",
  color: "black",
  "&:hover": {
    background: "#4d4d4c",
    color: "white"
  }
};
export const closeButtonWrapper = {
  padding: "0px 0px",
  minWidth: "30px",
  "&:hover": {
    backgroundColor: "background.secondary"
  },
  "&:click": {
    backgroundColor: "background.secondary"
  },
  "&:active": {
    backgroundColor: "background.secondary"
  }
};

export const closebutton = {
  color: "#ffffff",
  cursor: "pointer",
  marginLeft: "3px",
  marginBottom: "-9px"
};

export const unRealisedTotalPnL = {
  marginTop: "6%",

  fontSize: "13px",
  fontWeight: "600"
};

export const GRIDHOVER = {
  backgroundColor: "#2C2C34",
  "&:hover": {
    backgroundColor: "background.regular"
  }
};

export const typographyGridSubHeader = {
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: "14.06px"
};

// export const tablePositionCategoryStyle2 ={

// }

export const boldTableCell = {
  fontWeight: "500",
  fontSize: "12px",
  lineHeight: "16.41px"
};

export const orderHistroryBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  paddingTop: "8px",
  paddingLeft: "24px",
  paddingRight: "24px"
};

export const orderHistoryTableBox = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  alignItems: "start",
  backgroundColor: "background.secondary",
  borderRight: "2px solid #1F1F24",
  borderTop: "2px solid #1F1F24",
  borderBottom: "none"
};
export const tableCellLight = {
  ...boldTableCell,

  fontWeight: "500"
};

export const tradeHistoryTableRow = {
  backgroundColor: "#3F3F46",
  height: "40px",
  alignItems: "center",
  borderBottom: "1px #1F1F24 solid",
  "&:last-child": { borderBottom: "none" }
};

export const selectBoxStyles = {
  fontWeight: "400",
  height: "30px",
  paddingTop: "1px",
  fontSize: "12px"
};

// export const useSelectBoxClasses = makeStyles((theme) => ({
//   root: {
//     "& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select": {
//       minHeight: 0
//     },
//     "& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
//       fontSize: "8px"
//     },
//     "&. MuiInputBase-input": {
//       fontSize: "8px !important"
//     }
//   }

// }));

export const autoCompeleteBoxStyles = {
  "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
    paddingRight: "2rem",
    paddingLeft: "0px"
  },
  fontSize: "12px",
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: "0px",
    padding: "1px"
  },
  "& .MuiAutocomplete-inputRoot": {
    margin: "0px",
    width: "100%"
  },
  "& .MuiAutocomplete-inputRoot .MuiAutocomplete-input": {
    width: "20% !important"
  }
};
