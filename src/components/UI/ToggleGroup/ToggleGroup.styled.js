import { styled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme, styles }) => ({
  display: "flex",
  width: "100%",
  gap: 16,
  fontFamily: "Neurial-Medium",
  "& .MuiToggleButtonGroup-grouped": {
    textTransform: "none",
    padding: "0.5rem 1rem",
    "&:not(:last-of-type)": {
      // borderRadius: styles.borderRadius || "0px",
      borderRadius: styles && styles.borderRadius ? styles.borderRadius : "6px",
      border: `1px solid ${theme.palette.neutral.grey8}`
    },
    "&:not(:first-of-type)": {
      borderRadius: styles && styles.borderRadius ? styles.borderRadius : "6px",

      borderWidth: "1px",
      marginLeft: 0,
      border: `1px solid ${theme.palette.neutral.grey8}`
    },
    ...styles
  }
}));
export const StyledToggleButtonGroupPrimary = styled(ToggleButtonGroup)(({ theme, styles }) => ({
  width: "100%",
  fontFamily: "Neurial-Medium",
  justifyContent: "space-around",
  border: `1px solid ${theme.palette.borderColor.primary}`,
  borderRadius: theme.palette.borderRadius.secondary,
  "& .MuiToggleButtonGroup-grouped": {
    padding: "0px 10px",
    flex: 1,
    // margin: theme.spacing(0.5),
    border: 1,
    "&.Mui-disabled": {
      border: 0
    },
    "&:not(:first-of-type)": {},
    "&:first-of-type": {}
  },
  ...styles
}));
export const StyledToggleButtonGroupSecondary = styled(ToggleButtonGroup)(({ theme, styles }) => ({
  width: "100%",
  fontFamily: "Neurial-Medium",
  justifyContent: "space-around",
  background: theme.palette.background.tertiary,
  // border: `1px solid ${theme.palette.borderColor.primary}`,
  borderRadius: theme.palette.borderRadius.secondary,
  "& .MuiToggleButtonGroup-grouped": {
    fontWeight: 500,
    // margin: theme.spacing(0.5),
    border: 1,
    "&.Mui-disabled": {
      border: 0
    },
    "&:not(:first-of-type)": {},
    "&:first-of-type": {}
  },
  ...styles
}));
