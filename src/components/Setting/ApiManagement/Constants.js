export const COLUMN_DATA = [
  {
    id: "Date",
    label: "Date",
    minWidth: 40,
    enableSort: true,
    sortDirection: "asc"
  },
  { id: "Id", label: "Id", minWidth: 120, align: "center", enableSort: false, sortDirection: "asc" },
  {
    id: "Permissions",
    label: "Permissions",
    minWidth: 120,
    align: "center",
    enableSort: false,
    sortDirection: "asc"
  },
  {
    id: "Actions",
    label: "Actions",
    minWidth: 120,
    align: "center",
    enableSort: false,
    sortDirection: "asc"
  }
];
export const API_RESTRICTIONS_DATA = [
  {
    name: "Read Only"
  },
  { name: "Trade" }
];
export const CreateApiInitialFormState = { name: "", token_expiry_days: 30, permissions: [] };
