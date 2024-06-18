import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { datePickerPopperProps, datePickerStyles, datePickerTextStyles, useDatePickerStyles } from "@/components/UI/DateFilterBar/DateFilterObject";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import { CENTER_TEXT } from "@/components/CustomModals/newModal/Style";
import PropTypes from "prop-types";

const CalenderModal = ({ showCalender, setShowCalender, setSelectDateRange, isEconomicCalendar = false }) => {
  const datePickerCustomStyle = useDatePickerStyles();
  const handleCancleDatePicker = () => {
    if (isEconomicCalendar) {
      setSelectDateRange({ from: new Date().getTime(), to: new Date(new Date().setDate(new Date().getDate() + 7)).getTime() });
    } else setSelectDateRange({ from: "", to: "" });
    setShowCalender(false);
  };
  const [dateRange, setDateRange] = useState({
    from: "",
    to: ""
  });
  useEffect(() => {
    if (!isEconomicCalendar) {
      setDateRange({ from: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(), to: new Date().getTime() });
    } else {
      setDateRange({ from: new Date().getTime(), to: new Date(new Date().setDate(new Date().getDate() + 7)).getTime() });
    }
  }, []);
  const getMaxDate = () => {
    if (dateRange.to) {
      if (isEconomicCalendar) return dateRange.to;
      return Math.min(dateRange.to, new Date());
    }
    if (!isEconomicCalendar) {
      return new Date();
    }
  };
  const getMinDate = () => {
    if (dateRange.from) {
      return dateRange.from;
    }
  };
  const getmaxDateForTo = () => {
    if (isEconomicCalendar) {
      return new Date(new Date().setDate(new Date().getDate() + 90));
    }
    return new Date();
  };
  const getMinDateForFrom = () => {
    if (isEconomicCalendar) {
      return new Date();
    }
  };

  return (
    <CustomModal
      IsOpen={showCalender}
      ContainerSx={{
        maxWidth: { sm: "400px", xs: "350px" }
      }}
      primaryName="Submit"
      secondaryName="Cancel"
      primaryAction={() => {
        if (dateRange.from && dateRange.to) {
          setSelectDateRange({ from: dateRange.from, to: dateRange.to });
        }
        setShowCalender(false);
      }}
      secondaryAction={handleCancleDatePicker}
      isSecondaryAction={true}
      isPrimaryAction={true}
    >
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sx={{ alignItems: "center" }}>
          <Typography variant="SemiBold_28_KYC" component={"h1"} sx={[CENTER_TEXT]} mb={2}>
            Select Date Range
          </Typography>
        </Grid>
        <Grid container sx={{ justifyContent: "center", alignItems: "center", mx: 2, gap: "20px" }}>
          <Grid item xs={12} sm={5.5}>
            <Typography variant="SemiBold_14" component={"p"} mb={1}>
              {"From"}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                InputProps={{ sx: datePickerStyles }}
                value={dateRange.from}
                maxDate={getMaxDate()}
                minDate={getMinDateForFrom()}
                PopperProps={{ sx: datePickerPopperProps }}
                onChange={(newValue) => {
                  if (!newValue) {
                    setDateRange({ from: "", to: "" });
                    return;
                  }
                  newValue.setHours(0);
                  newValue.setMinutes(0);
                  newValue.setSeconds(0);
                  newValue.setMilliseconds(0);
                  setDateRange({ ...dateRange, from: newValue.getTime() });
                }}
                renderInput={(params) => <TextField {...params} className={datePickerCustomStyle.root} sx={datePickerTextStyles} />}
                inputFormat="dd/MM/yyyy"
                sx={{ height: { md: "35px" } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <Typography variant="SemiBold_14" component={"p"} mb={1}>
              {"To"}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                InputProps={{ sx: datePickerStyles }}
                value={dateRange.to}
                maxDate={getmaxDateForTo()}
                minDate={getMinDate()}
                PopperProps={{ sx: datePickerPopperProps }}
                onChange={(newValue) => {
                  if (!newValue) {
                    setDateRange({ from: "", to: "" });
                    return;
                  }
                  if (!newValue) return;
                  newValue.setHours(23);
                  newValue.setMinutes(59);
                  newValue.setSeconds(59);
                  newValue.setMilliseconds(0);
                  setDateRange({ ...dateRange, to: newValue.getTime() });
                }}
                renderInput={(params) => <TextField {...params} className={datePickerCustomStyle.root} sx={datePickerTextStyles} />}
                inputFormat="dd/MM/yyyy"
                sx={{ height: { md: "35px" } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
    </CustomModal>
  );
};
CalenderModal.propTypes = {
  // selectedDateRange: PropTypes.object,
  setSelectDateRange: PropTypes.func,
  showCalender: PropTypes.bool,
  setShowCalender: PropTypes.func,
  confirmDateChange: PropTypes.func,
  isEconomicCalendar: PropTypes.bool
};

export default CalenderModal;
