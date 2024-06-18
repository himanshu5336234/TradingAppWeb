export const SWITCH_STYLE = {
  // TODO: add to custom components
  width: "65px",
  height: "auto",
  ".MuiSwitch-switchBase:hover": {
    background: "none"
  },
  " .MuiSwitch-root": {
    display: "inline-block",
    height: "auto"
  },
  ".MuiSwitch-thumb": {
    height: "13.6px",
    width: "13.6px",
    margin: "5px"
  },
  ".Mui-checked .MuiSwitch-thumb": {
    backgroundColor: "background.mild",
    "& :hover": {
      backgroundColor: "none"
    }
  },
  "&.MuiSwitch-thumb": {
    backgroundColor: "background.mild"
  },
  ".MuiSwitch-track": {
    height: "18.14px",
    width: "36px",
    borderRadius: "9px"
  },
  ".MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "background.mindaro",
    opacity: 1
  }
};

export const FORM_LABEL_STYLE = { margin: 0, height: 35 };
