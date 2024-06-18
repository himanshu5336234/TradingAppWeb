import React, { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetDateRange, updateDateRange } from "../../../frontend-BL/redux/actions/Internal/DateRange.ac";
import { buttonStyles, buttonGroupStyles, selectButtonStyles, datePickerStyles, datePickerTextStyles } from "./DateFilterObject";
// import { Grid } from "@mui/material/node";

const DateFilterBar = (onActionClick, onResetClick) => {
  const [alignment, setAlignment] = React.useState("1 Day");

  const handleChangeFilter = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const dispatch = useDispatch();
  const { from, to } = useSelector((state) => state.dateSelection);
  const [datePickerRange, setDatePickerRange] = useState({ from, to });

  const dateRangeUpdate = useCallback((from, to) => {
    dispatch(updateDateRange(from, to));
  }, []);

  const dateRangeReset = useCallback(() => {
    dispatch(resetDateRange());
    oneDayClick();
  }, []);

  const oneDayClick = useCallback(() => {
    const currentDate = new Date();
    const prevDate = new Date(new Date().setDate(new Date().getDate() - 1));
    dateRangeUpdate(prevDate.getTime(), currentDate.getTime());
    setDatePickerRange({ from: prevDate.getTime(), to: currentDate.getTime() });
  }, []);

  const oneWeekClick = useCallback(() => {
    const currentDate = new Date();
    const prevDate = new Date(new Date().setDate(new Date().getDate() - 7));
    dateRangeUpdate(prevDate.getTime(), currentDate.getTime());
    setDatePickerRange({ from: prevDate.getTime(), to: currentDate.getTime() });
  }, []);

  const oneMonthClick = useCallback(() => {
    const currentDate = new Date();
    const prevDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
    dateRangeUpdate(prevDate.getTime(), currentDate.getTime());
    setDatePickerRange({ from: prevDate.getTime(), to: currentDate.getTime() });
  }, []);

  const threeMonthClick = useCallback(() => {
    const currentDate = new Date();
    const prevDate = new Date(new Date().setMonth(new Date().getMonth() - 3));
    dateRangeUpdate(prevDate.getTime(), currentDate.getTime());
    setDatePickerRange({ from: prevDate.getTime(), to: currentDate.getTime() });
  }, []);

  const onDatePickerSearch = useCallback(() => {
    dateRangeUpdate(datePickerRange.from, datePickerRange.to);
  }, [datePickerRange]);

  useEffect(() => {
    oneDayClick();
  }, []);

  return (
    <>
      <ToggleButtonGroup variant="text" sx={buttonGroupStyles} exclusive value={alignment} onChange={handleChangeFilter}>
        <ToggleButton onClick={oneDayClick} sx={buttonStyles} value="1 Day" id="filterBarToggles">
          1 Day
        </ToggleButton>
        <ToggleButton onClick={oneWeekClick} sx={buttonStyles} value="1 Week" id="filterBarToggles">
          1 Week
        </ToggleButton>
        <ToggleButton onClick={oneMonthClick} sx={buttonStyles} value="1 Month" id="filterBarToggles">
          1 Month
        </ToggleButton>
        <ToggleButton onClick={threeMonthClick} sx={buttonStyles} value="3 Months" id="filterBarToggles">
          3 Months
        </ToggleButton>
        <ToggleButton sx={buttonStyles}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              InputProps={{ sx: datePickerStyles }}
              value={datePickerRange.from}
              onChange={(newValue) => {
                setAlignment("");
                setDatePickerRange({ ...datePickerRange, from: newValue.getTime() });
              }}
              renderInput={(params) => <TextField {...params} sx={datePickerTextStyles} />}
            />
          </LocalizationProvider>
        </ToggleButton>
        <ToggleButton sx={buttonStyles}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              InputProps={{ sx: datePickerStyles }}
              sx={buttonStyles}
              value={datePickerRange.to}
              onChange={(newValue) => {
                setAlignment("");
                setDatePickerRange({ ...datePickerRange, to: newValue.getTime() });
              }}
              renderInput={(params) => <TextField {...params} sx={datePickerTextStyles} />}
            />
          </LocalizationProvider>
        </ToggleButton>
        <ToggleButton sx={selectButtonStyles} onClick={onDatePickerSearch} id="filterBarToggles">
          Search
        </ToggleButton>
        <ToggleButton sx={buttonStyles} onClick={dateRangeReset} id="filterBarToggles">
          Reset
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default DateFilterBar;
