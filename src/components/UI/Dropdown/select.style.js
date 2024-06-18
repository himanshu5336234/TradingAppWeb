import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  helperText: {
    "&.MuiFormHelperText-root": {
      lineHeight: 1,
      marginLeft: theme.spacing(0)
    }
  },
  inputLabel: {
    "&.MuiInputLabel-root": {
      marginTop: theme.spacing(2.5),
      marginBottom: theme.spacing(0.6),
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.pxToRem(14),
      fontFamily: theme.typography.fontFamily
    }
  },
  labelAsterisk: {
    color: theme.palette.primary.main
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      background: theme.palette.common.inputbackground
    },
    "& .MuiOutlinedInput-input": {
      height: "1.7em",
      "min-height": "1.7em",
      lineHeight: "1.7em",
      color: theme.palette.primary.main,
      fontFamily: theme.typography.fontFamily,
      borderRadius: "5px",
      "&.Mui-disabled": {
        "-webkit-text-fill-color": theme.palette.common.disabledText
      }
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      fontSize: theme.typography.pxToRem(10),
      borderColor: theme.palette.common.inputbackground,
      borderRadius: 5
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.common.inputbackground
    },

    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.common.inputbackground
    },
    // Icon color
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main
    },
    "& .MuiOutlinedInput-notchedOutline": {
      fontSize: theme.typography.pxToRem(10),
      borderColor: theme.palette.common.inputbackground,
      borderRadius: 5,
      "&:hover": {
        borderColor: theme.palette.common.inputbackground
      }
    }
  }
}));
export default useStyle;
