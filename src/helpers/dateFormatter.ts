export const dateFormatter = (dateString: string) => {
  // return example -> 23 Sept 2023
  return new Date(dateString).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(",", "");
};

export const timeFormatter = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
};
