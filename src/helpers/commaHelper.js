export const numberWithCommas = (x) => {
  if (x === undefined || isNaN(x)) return "--";
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
export const getSnapPrice = (data, symbol, priceType) => {
  if (priceType === "markPrice") {
    return data?.[`${symbol}@markPrice@1s`] || undefined;
  } else if (priceType === "ltp") {
    return data?.[`${symbol}@ticker`] || undefined;
  }

  return undefined;
};
export const numFormatter = (num, precision) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(precision) + "K";
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(precision) + "M";
  } else if (num < 900) {
    return num.toFixed(precision);
  }
};
