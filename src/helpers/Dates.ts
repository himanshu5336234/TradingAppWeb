export const epochToDateConvertor = (date: number) => new Date(Number(date)).toLocaleString();

export const UTCToDateConvertor = (date: number) => new Date(date).toLocaleString();

export const dateStringConvertor = (date: number) => String(date).replace(/\//g, ".");

export const dateToEpochConvertor = (dates: number) => Math.floor(new Date(dates).getTime() / 1000);

export function isTimeDifferenceMoreThanThreshold(timestamp1: number, timestamp2: number, threshold = 1) {
  const diffInMillis = Math.abs(timestamp1 - timestamp2);
  const oneMinuteInMillis = threshold * 60 * 1000;

  return diffInMillis > oneMinuteInMillis;
}

export const epochToDateShortFormat = (timeInMilli: number) => {
  const date = new Date(timeInMilli);
  let day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().substr(-2);
  // Add leading zero to day if less than 10
  day = day < 10 ? `0${day}` : day;

  return `${day} ${month} '${year}`;
};
