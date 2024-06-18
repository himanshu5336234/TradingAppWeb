const getStartDayForWeek = (date) => {
  if (date <= 7) {
    return 1;
  } else {
    return date - 7;
  }
};

const getStartDayforDay = (date) => {
  if (date === 1) {
    return date;
  }
  return date - 1;
};

// function to return start time and end time for API
export const getTimeFrameRange = (currentDateObj, timeFrame) => {
  const timeZoneOffsetInMilli = currentDateObj.getTimezoneOffset() * 60000;
  switch (timeFrame) {
    case "day":
      return {
        // prev day start 00: 00: 00
        startTime: new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), getStartDayforDay(currentDateObj.getDate())).getTime() - timeZoneOffsetInMilli,
        // current day start 00:00:00
        endTime: new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), currentDateObj.getDate()).getTime() - timeZoneOffsetInMilli
      };
    case "week":
      return {
        // if day <= 7 calculate time from 1st else last 7 days
        startTime: new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), getStartDayForWeek(currentDateObj.getDate())).getTime() - timeZoneOffsetInMilli,
        //  current day start 00:00:00
        endTime: new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), currentDateObj.getDate()).getTime() - timeZoneOffsetInMilli
      };
    case "month":
      return {
        // calculates start time from 1st of every month
        startTime: new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), 1).getTime() - timeZoneOffsetInMilli,
        // next month start 00:00:00
        endTime: new Date(currentDateObj.getFullYear(), currentDateObj.getMonth() + 1).getTime() - timeZoneOffsetInMilli
      };
    default:
      return {
        // return empty for default
        startTime: "",
        //  current day start 00:00:00
        endTime: new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), currentDateObj.getDate()).getTime() - timeZoneOffsetInMilli
      };
  }
};

export const getTimeRangeForRebateHistory = (currentDate) => {
  // gets the last 90 days
  return {
    startTime: new Date(currentDate.getTime() - 90 * 24 * 60 * 60 * 1000).getTime(),
    endTime: currentDate.getTime()
  };
};
