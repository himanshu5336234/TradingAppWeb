export const MuiInputBase = {
  styleOverrides: {
    input: {
      borderRadius: 0,
      ":-webkit-autofill": {
        borderRadius: "0px !important",
        WebkitBoxShadow: "0 0 0 1000px #1B1B1F inset !important"
      }
    }
  }
};
