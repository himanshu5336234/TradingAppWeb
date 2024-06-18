import { typography } from "@/assets/Theme/typography";

const styles = {
  section: {
    backgroundColor: "background.secondary",
    borderRadius: "0px",
    border: "1px solid",
    borderColor: "borderColor.secondary",
    display: "flex",
    justifyContent: "center",
    p: 2,
    m: 4
  },
  Mobsection: {
    borderRadius: "0px",
    display: "flex",
    justifyContent: "space-between",
    p: 1,
    m: 3
  },
  mobileTitleTypography: {
    m: 4,
    ...typography.SemiBold_20,
    textDecoration: "underline 4px",
    textUnderlineOffset: "6px",
    textDecorationColor: "#E2FF6F"
  },
  titleTypography: { m: 4, ...typography.SemiBold_20 }
};

export default styles;
