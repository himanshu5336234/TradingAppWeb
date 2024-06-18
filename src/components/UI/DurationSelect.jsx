import { MenuItemSx, MuiSelectSx } from "@/components/UI/Select/Select.styled";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalenderModal from "@/components/CustomModals/newModal/CalenderModal";
import React, { useState } from "react";
import PropTypes from "prop-types";

const DurationSelect = ({ options, value, setValue, selectCustomDateRange, styleObj }) => {
  const [showCustomDurationModal, setShowCustomDurationModal] = useState(false);

  const prevDuration = value;

  const handleChange = (event) => {
    if (event.target.value === "custom") {
      setValue(prevDuration);
      return;
    }
    setValue(event.target.value);
  };

  const handleCustomDateSelect = () => {
    setShowCustomDurationModal(true);
  };

  return (
    <>
      <FormControl fullWidth>
        {/* <Typography sx={{ mb: "0.2rem" }}>{label}</Typography> */}
        <Select sx={styleObj || MuiSelectSx} value={value} onChange={handleChange} IconComponent={KeyboardArrowDownIcon}>
          {options.map(({ name, value }) => {
            if (value === "custom") {
              return (
                <MenuItem key={value} value={value} sx={MenuItemSx} dense={true} onClick={handleCustomDateSelect}>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <CalendarTodayIcon sx={{ fontSize: "18px", marginRight: "5px", marginLeft: "-2px" }} />
                    <Typography component={"span"} variant="Regular_14">
                      {name}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            } else {
              return (
                <MenuItem key={value} value={value} sx={MenuItemSx} dense={true}>
                  {name}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
      <CalenderModal setSelectDateRange={selectCustomDateRange} showCalender={showCustomDurationModal} setShowCalender={setShowCustomDurationModal} />
    </>
  );
};

export default DurationSelect;

DurationSelect.propTypes = {
  options: PropTypes.array, // options - [{name: "", value: ""}]
  value: PropTypes.any,
  setValue: PropTypes.any,
  selectCustomDateRange: PropTypes.func,
  styleObj: PropTypes.obj
};
