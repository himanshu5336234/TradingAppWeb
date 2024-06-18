import React from "react";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { AUTOCOMPLETE_TYPOGRAPHY, autoCompeleteBoxStyles, typographyGridSubHeader } from "./styles";
interface ComponentProps {
  options: any[];
  onChange: Function;
  value: any;
  label: any;
}

const CustomAutoSelectTableHeader: React.FC<ComponentProps> = ({ options, onChange, value, label }) => {
  return (
    <Autocomplete
      disableClearable
      options={options}
      renderOption={(props, item) => (
        <MenuItem key={item} sx={typographyGridSubHeader} value={item === label ? "All" : item} {...props}>
          {item === label ? "All" : item}
        </MenuItem>
      )}
      renderInput={(params) => {
        return (
          <TextField
            sx={AUTOCOMPLETE_TYPOGRAPHY}
            // size = {"small"}
            {...params}
          />
        );
      }}
      value={value}
      onChange={(e, val: string) => onChange(e, val)}
      size="small"
      sx={autoCompeleteBoxStyles}
    ></Autocomplete>
  );
};

export default CustomAutoSelectTableHeader;
