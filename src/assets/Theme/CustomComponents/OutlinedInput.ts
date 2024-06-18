export const MuiOutlinedInput = {
  styleOverrides: {
    root: {
      border: "0px solid  #0E0E0F !important",
      paddingRight: "0px",
      // borderRadius: "2px !important",
      "&.Mui-focused fieldset": {
        border: "0px solid  !important",
        borderColor: "#0E0E0F !important"
      },
      "&:hover fieldset": {
        borderColor: "#E2FF6F !important"
      }
    }
  }
};
