export const JsonToQueryParams = (payload) => {
  return (
    "?" +
    Object.keys(payload)
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(payload[key]);
      })
      .join("&")
  );
};
