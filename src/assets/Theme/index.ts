import { createTheme, Theme } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { MuiToggleButton } from "./CustomComponents/ToggleButton";
import { MuiButton } from "./CustomComponents/MenuButton";
import { MuiCheckbox } from "./CustomComponents/Checkbox";
import { MuiInputBase } from "./CustomComponents/Input";
import { MuiOutlinedInput } from "./CustomComponents/OutlinedInput";
import { MuiStep } from "./CustomComponents/StepIcon";
import { MuiAlert } from "./CustomComponents/Alert";
import { MuiSwitch } from "./CustomComponents/MuiSwitch";
import { MuiTabs } from "./CustomComponents/Tabs";

const theme: Theme = createTheme({
  palette,
  typography,
  components: {
    MuiButton,
    MuiToggleButton,
    MuiInputBase,
    MuiOutlinedInput,
    MuiStep,
    MuiAlert,
    MuiSwitch,
    MuiTabs,
    MuiCheckbox
  }
});

export default theme;
