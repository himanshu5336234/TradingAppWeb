import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PropTypes from "prop-types";

import { MenuItemSx, MuiSelectSx } from "./Select.styled";

const CustomSelect = ({ id, onChangeHandler, label, values, value, setValue, margin, selectStyle, menuStyle }) => {
  const handleChange = (event) => {
    if (onChangeHandler) onChangeHandler(event);
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth margin={margin ? "normal" : "none"}>
      {label && <Typography>{label}</Typography>}
      <Select
        id={id}
        sx={{ ...selectStyle, ...MuiSelectSx }}
        value={value}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "background.primary",
              backgroundImage: "none",
              borderRadius: "4px",
              "& .Mui-selected": {
                backgroundColor: "background.primary",
                "&:hover": {
                  backgroundColor: "background.primary"
                }
              },
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "background.primary",
                color: "text.regular"
              },
              "& .MuiMenuItem-root": {
                padding: 1
              }
            }
          }
        }}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownIcon}
      >
        {values?.map(({ name, value }) => (
          <MenuItem key={value} value={value} sx={{ ...menuStyle, ...MenuItemSx }} dense="true">
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  values: PropTypes.array,
  value: PropTypes.any,
  setValue: PropTypes.any,
  margin: PropTypes.bool,
  onChangeHandler: PropTypes.func,
  selectStyle: PropTypes.obj,
  menuStyle: PropTypes.obj
};

export default CustomSelect;
