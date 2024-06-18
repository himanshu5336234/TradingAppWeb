import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import { Box, Typography, Grid, TableContainer, Table, TableFooter, TableRow, TablePagination } from "@mui/material";
// import { economicCalenderdata } from "./dummyData";
import { countryData } from "./countryData";
import { tablePaginationStyle } from "../Home/UserActivities/UserTabs/UserTabs.style";
import PropTypes from "prop-types";
import CalenderModal from "../CustomModals/newModal/CalenderModal";
import ToggleGroup from "../UI/ToggleGroup/ToggleGroup";
import { dateFormatter, timeFormatter } from "../../helpers/dateFormatter";
import TextView from "../UI/TextView/TextView";

import { useDispatch } from "react-redux";

import { FETCH_ECONOMIC_CALENDER_DATA } from "@/frontend-BL/redux/actions/Market/getMarketData.ac";

const tableCellTypography = {
  color: "neutral.grey7"
};
const EconomicCalender = () => {
  const dispatch = useDispatch();

  const [economicCalendarData, setEconomicCalendarData] = useState([]);
  const [economicCalendarPagination, setEconomicCalendarPagination] = useState({
    page: 0,
    rowsPerPage: 10
  });
  const [calendarDuration, setCalendarDuration] = useState({
    from: new Date().getTime(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)).getTime()
  });
  const [totalCalendarData, setTotalCalendarData] = useState(0);

  const economicRef = useRef();

  useEffect(() => {
    dispatch(
      FETCH_ECONOMIC_CALENDER_DATA({
        from: calendarDuration.from,
        to: calendarDuration.to,
        size: economicCalendarPagination.rowsPerPage,
        page: economicCalendarPagination.page + 1
      })
    ).then((res) => {
      setEconomicCalendarData(res.economicEvents);
      setTotalCalendarData(res.totalCount);
    });
    economicRef.current = setInterval(
      () =>
        dispatch(
          FETCH_ECONOMIC_CALENDER_DATA({
            from: calendarDuration.from,
            to: calendarDuration.to,
            size: economicCalendarPagination.rowsPerPage,
            page: economicCalendarPagination.page + 1
          })
        ).then((res) => {
          setEconomicCalendarData(res.economicEvents);
          setTotalCalendarData(res.totalCount);
        }),
      1000 * 60 * 15
    );
    return () => {
      clearInterval(economicRef.current);
    };
  }, [economicCalendarPagination.page, economicCalendarPagination.rowsPerPage, calendarDuration.from, calendarDuration.to]);

  const handleEconomicCalendarPeriodChange = useCallback(
    (_, val) => {
      const periodVal = val;
      let currentDate;
      let nextDate;
      if (periodVal === "1d") {
        currentDate = new Date();
        nextDate = new Date(new Date().setDate(new Date().getDate() + 1));
      } else if (periodVal === "1w") {
        currentDate = new Date();
        nextDate = new Date(new Date().setDate(new Date().getDate() + 7));
      } else if (periodVal === "1m") {
        currentDate = new Date();
        nextDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
      }
      setCalendarDuration({
        from: currentDate?.getTime(),
        to: nextDate?.getTime()
      });
    },
    [calendarDuration]
  );

  const [showCalender, setShowCalender] = useState(false);

  const [alignment, setAlignment] = useState("1w");

  const handleCustomChange = (e) => {
    e.stopPropagation();
    setShowCalender(true);
  };

  const getCountryName = (shortName: string) => countryData[shortName];

  const getSelectedDateRange = () => {
    const { from, to } = calendarDuration;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    // format optipns
    const optionsFromDate = { day: "numeric", month: "short" };
    const optionsToDate = { day: "numeric", month: "short", year: "numeric" };
    // Format the from and to dates
    const formattedFromDate = fromDate.toLocaleDateString("en-US", optionsFromDate);
    const formattedToDate = toDate.toLocaleDateString("en-US", optionsToDate);

    // Combine the formatted dates
    const dateRangeString = `${formattedFromDate} - ${formattedToDate}`.replace(",", "");
    return dateRangeString;
  };
  const economicCalenderHeaders = [
    {
      name: "DATE & TIME",
      key: "time",
      id: "1",
      girdSize: 0
    },
    {
      name: "COUNTRY",
      key: "country",
      id: "2",
      gridSize: 2.5
    },
    {
      name: "EVENT",
      key: "event",
      id: "3",
      gridSize: 0
    }
  ];

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "28px",
          borderWidth: "0.8px",
          borderStyle: "solid",
          borderRadius: "12px",
          borderColor: "#44444D",
          gap: "40px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TextView variant="bold_28" text={"Economic Calendar"} />

          {calendarDuration.from && calendarDuration.to && <TextView variant="Medium_14" color={"text.main"} text={getSelectedDateRange()} />}
        </Box>
        <Box>
          <ToggleGroup
            value={alignment}
            // styles={{ borderRadius: "4px" }}
            handleChange={(event, value) => {
              if (!value) return;
              setAlignment(value);
              handleEconomicCalendarPeriodChange(event, value);
            }}
            values={[
              { name: "1D", value: "1d" },
              { name: "1W", value: "1w" },
              { name: "1M", value: "1m" }
            ]}
            includesCustom={true}
            handleCustomClick={handleCustomChange}
          />
        </Box>
        <Box>
          {/* grid header */}
          <Grid container>
            {economicCalenderHeaders.map((headerData) => (
              <Grid flex={1} item key={headerData.id} xs={headerData.girdSize}>
                <TextView component={"p"} variant="Medium_12" color="text.secondary" text={headerData.name} style={{ marginLeft: "15px" }} />
              </Grid>
            ))}
          </Grid>
          <Box>
            {economicCalendarData.map(
              (
                calenderEvent: {
                  id: React.Key | null | undefined;
                  date: string;
                  country: string | undefined;
                  event: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
                },
                index: any
              ) => (
                <Grid
                  container
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: getRowColor(index),
                    paddingY: 2,
                    paddingX: 2,
                    borderRadius: 2
                  }}
                  key={calenderEvent.id}
                >
                  <Grid xs={4} item>
                    <Typography
                      sx={{
                        ...tableCellTypography,
                        paddingX: -1
                      }}
                    >
                      {`${dateFormatter(calenderEvent.date)} | ${timeFormatter(calenderEvent.date)}`}
                    </Typography>
                  </Grid>
                  <Grid item flex={1}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingX: 1,
                        width: "90%"
                      }}
                    >
                      <img
                        src={getCountryName(calenderEvent.country)?.flag}
                        alt={calenderEvent.country}
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "7px",
                          marginTop: "2px"
                          // borderRadius: "50%"
                        }}
                      />
                      <Typography
                        sx={{
                          ...tableCellTypography
                        }}
                        variant="Regular_14"
                      >
                        {getCountryName(calenderEvent.country)?.fullName ?? calenderEvent.country}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item flex={1}>
                    <Typography
                      variant="Regular_14"
                      sx={{
                        ...tableCellTypography,
                        color: "",
                        paddingX: 2
                      }}
                    >
                      {calenderEvent.event}
                    </Typography>
                  </Grid>
                </Grid>
              )
            )}
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableFooter>
              <TableRow id="tablePagination">
                <TablePagination
                  sx={tablePaginationStyle}
                  id="tablePaginationCell"
                  labelRowsPerPage="Results per view"
                  rowsPerPageOptions={[5, 10, 20]}
                  count={totalCalendarData}
                  rowsPerPage={economicCalendarPagination.rowsPerPage}
                  page={economicCalendarPagination.page}
                  onPageChange={(event, newPage) =>
                    setEconomicCalendarPagination({
                      ...economicCalendarPagination,
                      page: parseInt(newPage, 10)
                    })
                  }
                  onRowsPerPageChange={(event) => {
                    setEconomicCalendarPagination({
                      ...economicCalendarPagination,
                      rowsPerPage: parseInt(event.target.value, 10),
                      page: 0
                    });
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      <CalenderModal showCalender={showCalender} setShowCalender={setShowCalender} setSelectDateRange={setCalendarDuration} isEconomicCalendar={true} />
    </Grid>
  );
};

export const getRowColor = (index) => {
  return index % 2 === 0 ? "" : "rgba(27, 27, 31, 0.6)";
};

export default memo(EconomicCalender);
EconomicCalender.propTypes = {
  economicCalendarData: PropTypes.array,
  economicCalendarPagination: PropTypes.object,
  setEconomicCalendarPagination: PropTypes.func,
  setCalendarDuration: PropTypes.func,
  handleEconomicCalendarPeriodChange: PropTypes.func,
  totalCalendarData: PropTypes.number,
  calendarDuration: PropTypes.object
};
