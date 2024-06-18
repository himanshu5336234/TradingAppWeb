import { epochToDateShortFormat } from "./Dates";

export const displayDateRange = (dateRange: { from: any; to: any }) => {
  if (dateRange.from === 0) {
    return "Lifetime";
  } else if (dateRange.from === dateRange.to) {
    return epochToDateShortFormat(dateRange.from);
  } else {
    return `${epochToDateShortFormat(dateRange.from)} to ${epochToDateShortFormat(dateRange.to)}`;
  }
};
