import { typography } from "@/assets/Theme/typography";

export const TableStyles = {
  tableHeadCell: {
    ...typography.Regular_16,
    borderBottom: "1px solid rgba(81, 81, 81, 1)",
    color: "#ffffff"
    // backgroundColor: "#3c3b3b"
  },
  tableBodyCell: {
    ...typography.Regular_16,
    borderBottom: "1px solid rgba(81, 81, 81, 1)",
    color: "#bdbdbd",
    lineHeight: "2",
    textTransform: "none"
  }
};
