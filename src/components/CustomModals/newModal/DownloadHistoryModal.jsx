import React, { useState } from "react";
import { CENTER_TEXT, STATUS_MODAL_WRAPPER_TYPE_1 } from "./Style";
import CustomModal from "./CustomModal";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";

import { Box, Grid, Typography, Switch, FormGroup, FormControlLabel, Badge, TextField } from "@mui/material";
import LoaderLogo from "ASSETS/images/gradient_loader.png";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { datePickerPopperProps, datePickerStyles, datePickerTextStyles, useDatePickerStyles } from "@/components/UI/DateFilterBar/DateFilterObject";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getSupportChat } from "@/helpers";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./Style.css";

const DownloadHistoryModal = ({ IsOpen, title, type, primaryName, secondaryAction, primaryAction, isSecondaryAction, isPrimaryAction, dateRange, setDateRange }) => {
  const [selectedValue, setSelectedValue] = useState("1 Day");
  const datePickerCustomStyle = useDatePickerStyles();
  const { openFcSupportChat, isSupportChatVisible } = getSupportChat();
  const getHumanReadableDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  };
  // const handleChangeFilter = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };
  const getMaxDate = () => {
    if (dateRange.to) {
      return Math.min(dateRange.to, new Date());
    }
    return new Date();
  };
  const getMinDate = () => {
    if (dateRange.from) {
      return dateRange.from;
    }
    return new Date(new Date().setDate(new Date().getDate() - 90));
  };
  const getMinDateForFrom = () => {
    if (dateRange.to) {
      return new Date(new Date().setDate(new Date(dateRange.to).getDate() - 90));
    }
    return new Date(new Date().setDate(new Date().getDate() - 90));
  };

  const oneDayClick = () => {
    const currentDate = new Date();
    const prevDate = new Date(new Date().setDate(new Date().getDate() - 1));
    setDateRange({ from: prevDate.getTime(), to: currentDate.getTime() });
  };

  const oneWeekClick = () => {
    const currentDate = new Date();
    const prevDate = new Date(new Date().setDate(new Date().getDate() - 7));
    setDateRange({ from: prevDate.getTime(), to: currentDate.getTime() });
  };

  const oneMonthClick = () => {
    const currentDate = new Date();
    const prevDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
    setDateRange({ from: prevDate.getTime(), to: currentDate.getTime() });
  };

  const threeMonthClick = () => {
    const currentDate = new Date();
    const prevDate = new Date(new Date().setDate(new Date().getDate() - 90));
    setDateRange({ from: prevDate.getTime(), to: currentDate.getTime() });
  };
  const PersonalDetails = useSelector((state) => state.PersonalDetails);
  const ShowContentType = (type) => {
    switch (type) {
      case "SET_PERIOD":
        return (
          <Grid
            container
            sx={{
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "27px"
            }}
          >
            <Grid item xs={12}>
              <Typography variant={"Medium_16"}>
                {"Download - "}
                <Typography variant={"Medium_16"} color={"text.secondary"}>
                  {title}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} mt={2} lg={16}>
              <ToggleGroup
                variant="chip"
                value={selectedValue}
                handleChange={(event, value) => {
                  if (value !== null) {
                    setSelectedValue(value);
                  } else {
                    setSelectedValue("1 Day");
                  }
                  if (value === "1 Day") {
                    return oneDayClick();
                  }
                  if (value === "1 Week") {
                    return oneWeekClick();
                  }
                  if (value === "1 Month") {
                    return oneMonthClick();
                  }
                  if (value === "3 Months") {
                    return threeMonthClick();
                  }
                }}
                values={[
                  { name: "1D", value: "1 Day", id: "filterBarToggles-1day" },
                  { name: "1W", value: "1 Week", id: "filterBarToggles-1week" },
                  {
                    name: "1M",
                    value: "1 Month",
                    id: "filterBarToggles-1mont"
                  },
                  {
                    name: "3M",
                    value: "3 Months",
                    id: "filterBarToggles-3months"
                  }
                ]}
              />
            </Grid>
            <Grid item xs={16} sx={{ marginTop: "-10px" }}>
              <Grid
                container
                item
                xs={12}
                md={12}
                mt={3.5}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: { xs: "space-between", md: "space-around" },
                  alignItems: "center",
                  mx: { xs: 1, sm: 1, md: 1 },
                  gap: { xs: "5px" }
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "background.default",
                    p: "8px",
                    borderRadius: "4px",
                    border: "0.5px solid",
                    borderColor: "background.default",
                    width: "186px",
                    height: "57px",
                    marginLeft: "-18px"
                  }}
                >
                  <Typography color={"text.secondary"} variant="Medium_10" sx={{ marginTop: "-4px" }}>
                    {"From"}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      InputProps={{ sx: datePickerStyles, id: "startDate" }}
                      PopperProps={{
                        sx: datePickerPopperProps
                      }}
                      value={dateRange?.from}
                      maxDate={getMaxDate()}
                      minDate={getMinDateForFrom()}
                      onChange={(newValue) => {
                        if (!newValue) {
                          setDateRange({ from: "", to: "" });
                          return;
                        }
                        newValue.setHours(0);
                        newValue.setMinutes(0);
                        newValue.setSeconds(0);
                        setDateRange({
                          ...dateRange,
                          from: newValue.getTime()
                        });
                      }}
                      renderInput={(params) => <TextField {...params} className={datePickerCustomStyle.root} sx={datePickerTextStyles} />}
                    />
                  </LocalizationProvider>
                </Box>
                <Typography variant={"Medium_12"}>{"--"}</Typography>
                <Box
                  sx={{
                    backgroundColor: "background.default",
                    p: "8px",
                    borderRadius: "4px",
                    border: "0.5px solid",
                    borderColor: "background.default",
                    width: "186px",
                    height: "57px"
                  }}
                >
                  <Typography color={"text.secondary"} variant="Medium_10">
                    {"To"}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      InputProps={{ sx: datePickerStyles, id: "End-Date" }}
                      PopperProps={{
                        sx: datePickerPopperProps
                      }}
                      value={dateRange?.to}
                      maxDate={new Date()}
                      minDate={getMinDate()}
                      onChange={(newValue) => {
                        if (!newValue) {
                          setDateRange({ from: "", to: "" });
                          return;
                        }
                        if (!newValue) return;
                        newValue.setHours(23);
                        newValue.setMinutes(59);
                        newValue.setSeconds(59);
                        setDateRange({ ...dateRange, to: newValue.getTime() });
                      }}
                      renderInput={(params) => <TextField {...params} className={datePickerCustomStyle.root} sx={datePickerTextStyles} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "30px", marginBottom: "-5px" }}>
                <Typography variant="Regular_12" component={"p"} color={"text.secondary"} sx={{ lineHeight: "18px" }}>
                  <span style={{ color: "yellow" }}>{"Note "}</span>
                  {" Large data set can take few minutes to generate. Please do not close or refresh the site while the data is downloading."}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        );
      case "REQUESTED":
        return (
          <>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid item xs={12}>
                <Typography
                  sx={[
                    CENTER_TEXT,
                    {
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "24px",
                      color: "#A6A5A5"
                    }
                  ]}
                >
                  {title} | ({getHumanReadableDate(dateRange.from)}-{getHumanReadableDate(dateRange.to)})
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent={"center"} rowSpacing={2} mt={2}>
              <Grid item xs={2}>
                <div className="rounded">
                  <img style={{ width: "100%" }} src={LoaderLogo} alt="" />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography component={"p"} sx={[CENTER_TEXT, { color: "#A6A5A5" }]}>
                  Generating...
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <Typography variant="SemiBold_28_KYC" component={"h2"} sx={[CENTER_TEXT, { color: "#A6A5A5" }]}>
                  {"Please wait while your"}
                  <Typography variant="SemiBold_28_KYC" component={"span"} sx={{ color: "" }}>
                    {` ${title} CSV`}
                  </Typography>
                  {" is being generated."}
                  {PersonalDetails?.basicDetails?.email}
                </Typography>
              </Grid>
            </Grid>
          </>
        );

      case "DOWNLOAD_FAILED":
        return (
          <>
            <Typography
              sx={[
                CENTER_TEXT,
                {
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "24px",
                  color: "#A6A5A5"
                }
              ]}
            >
              {title} | ({getHumanReadableDate(dateRange.from)}-{getHumanReadableDate(dateRange.to)})
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
                alignItems: "center",
                width: "100%"
              }}
              mt={2.5}
              mb={2.5}
            >
              <Box
                sx={{
                  ...STATUS_MODAL_WRAPPER_TYPE_1,
                  gap: "1px",
                  width: "18%"
                }}
              >
                <ReportProblemIcon sx={{ color: "#F46151", fontSize: "50px" }}></ReportProblemIcon>
                <Typography component={"p"} sx={{ color: "#F46151" }} variant="Regular_16">
                  Error
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between"
                }}
              >
                <FormGroup sx={{ width: "100%" }}>
                  <FormControlLabel
                    sx={{ cursor: "pointer", marginLeft: "0px" }}
                    control={
                      <>
                        <Typography component={"p"} variant="Regular_24">
                          {"Please try again later or contact "}
                          <Typography
                            variant="Regular_24"
                            component={"span"}
                            sx={{
                              textDecorationLine: "underline",
                              color: "text.main"
                            }}
                          >
                            {"Support"}
                          </Typography>
                        </Typography>
                        <Badge sx={{ display: "none" }}>
                          <Switch checked={isSupportChatVisible} onChange={(event) => openFcSupportChat()} />
                        </Badge>
                      </>
                    }
                  />
                </FormGroup>
                <Typography component={"p"} variant="Regular_16" sx={{ color: "text.mild" }}>
                  We are currently unable to generate the requested data
                </Typography>
              </Box>
            </Box>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <CustomModal
      IsOpen={IsOpen}
      close={secondaryAction}
      isClose={true}
      isSecondaryAction={isSecondaryAction}
      secondaryAction={secondaryAction}
      primaryAction={primaryAction}
      isPrimaryAction={isPrimaryAction}
      primaryName={primaryName}
      secondaryName={"Dismiss"}
      primaryButtonSX={{ width: "132px", height: "32px", marginRight: "18px" }}
      secondaryButtonSX={{ width: "132px", height: "32px" }}
      ContainerSx={{ width: "460px" }}
      paddingSX={{ padding: "0px" }}
    >
      {ShowContentType(type)}
    </CustomModal>
  );
};

DownloadHistoryModal.propTypes = {
  IsOpen: PropTypes.bool,
  close: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
  primaryName: PropTypes.string,
  secondaryName: PropTypes.string,
  toggleIsSupportChatVisible: PropTypes.func,
  isPrimaryAction: PropTypes.bool,
  isSecondaryAction: PropTypes.bool,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
  dateRange: PropTypes.object,
  setDateRange: PropTypes.func
};

export default React.memo(DownloadHistoryModal);
