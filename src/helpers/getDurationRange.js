const getDurationRange = (duration) => {
  const now = new Date();
  const to = now.getTime(); // Current time in milliseconds

  let from;
  switch (duration) {
    case "day":
    case "1 Day":
      from = now.getTime() - 24 * 60 * 60 * 1000; // Subtracting 1 day in milliseconds
      break;
    case "week":
    case "1 Week":
      from = now.getTime() - 7 * 24 * 60 * 60 * 1000; // Subtracting 7 days in milliseconds
      break;
    case "month":
    case "1 Month":
      from = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).getTime(); // Subtracting 1 month in milliseconds
      break;
    case "three-months":
    case "3 Month":
      from = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).getTime(); // Subtracting 3 months in milliseconds
      break;
    case "all":
    case "All":
      return { from: "", to: "" };
    case "all-data":
      return { from: 0, to: 0 };
    default:
      // default to Week
      return { from: null, to: null };
  }

  return { from, to };
};

export default getDurationRange;
