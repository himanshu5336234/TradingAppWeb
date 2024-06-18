// Name of the component
export const MuiToggleButton = {
  styleOverrides: {
    // Name of the slot
    root: {
      textTransform: "capitalize",
      outlineWidth: "none",
      color: "white",
      outlineStyle: "none"
    }
  },
  variants: [
    {
      props: { variant: "primary" },
      style: ({ theme }: { theme: any }) => ({
        color: theme.palette.neutral.grey7,
        border: "0.1px solid #323339 !important",
        fontSize: "11px",
        "&.Mui-selected": {
          backgroundColor: "#3E4D00",
          "&:hover": { backgroundColor: "transparent" }
        }
      })
    },

    {
      props: { variant: "secondary" },
      style: ({ theme }: { theme: any }) => ({
        fontSize: "12px",
        color: theme.palette.neutral.grey7,
        border: "none",
        padding: "4px 6px",
        fontWeight: 600,
        "&.Mui-selected": {
          backgroundColor: "transparent",
          "&:hover": { backgroundColor: "transparent" }
        },
        "&:hover": { backgroundColor: "transparent" }
      })
    },
    {
      props: { variant: "success" },
      style: {
        color: "#28b67e",
        border: " 1px solid rgb(255 255 255 / 8%);",
        "&.Mui-selected": {
          color: "#fff",
          background: "linear-gradient(173.87deg, #29B57E -234.51%, rgba(41, 181, 126, 0) 253.9%) !important",
          "&:hover": { color: "#fff", backgroundColor: "#219165;" }
        },
        "&:hover": { backgroundColor: "rgb(255 255 255 / 8%);" }
      }
    },

    {
      props: { variant: "failed" },
      style: {
        color: "#f46251",
        border: " 1px solid rgb(255 255 255 / 8%);",
        "&.Mui-selected": {
          color: "#fff",
          background: "linear-gradient(173.87deg, #FF6554 -234.51%, rgba(255, 101, 84, 0) 253.9%) !important",
          "&:hover": { color: "#fff", backgroundColor: "#c34c4c" }
        },
        "&:hover": { backgroundColor: "#rgb(255 255 255 / 8%);" }
      }
    },
    /* <--- New Design System Variant---> */
    {
      props: { variant: "chip" },
      style: ({ theme }: { theme: any }) => ({
        borderRadius: "4px",
        paddingX: 3,
        paddingY: 1,
        color: theme.palette.neutral.grey7,
        ...theme.typography.bodyLarge,
        border: `1px solid ${theme.palette.neutral.grey4}`,
        backgroundColor: "transparent",
        "&.Mui-selected": {
          color: theme.palette.neutral.black,
          backgroundColor: theme.palette.neutral.grey6,
          border: "1px solid transparent !important"
        },
        "&:hover": { backgroundColor: theme.palette.neutral.grey2 }
      })
    }
    /* <--- New Design System Variant ---> */
  ]
};
