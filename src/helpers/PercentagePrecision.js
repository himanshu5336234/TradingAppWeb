export const setPrecisionForPercentageValue = (value, prec) => {
  return Math.round(parseFloat(value) * Math.pow(10, prec)) / Math.pow(10, prec);
};
