export const MuiSwitch = {
  styleOverrides: {
    root: {
      width: "30px",
      height: "15px",
      borderRadius: "2.5px",
      border: "1px solid",
      padding: 0,
      "&.Mui-checked": {
        borderColor: "#EBFF25"
      },
      "& .MuiSwitch-switchBase": {
        padding: 0,

        transitionDuration: "300ms",
        "& + .MuiSwitch-track": {
          borderColor: "#EBFF25",
          backgroundColor: "#1B1B1F",
          opacity: 1,
          border: 2
        },
        "&.Mui-checked": {
          "& .MuiSwitch-thumb": {
            backgroundColor: "#EBFF25"
          },
          transform: "translateX(13px)",
          color: "#fff",
          "& + .MuiSwitch-track": {
            backgroundColor: "#1B1B1F",
            opacity: 1,
            border: 0
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.5
          }
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
          color: "#fff",
          border: "6px solid #fff"
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
          backgroundColor: "gray"
        }
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: "#fff",
        boxSizing: "border-box",
        width: 15,
        height: 13,
        borderRadius: "2px"
      },
      "& .MuiSwitch-track": {
        borderRadius: 4 / 2,
        backgroundColor: "#29b57e",
        opacity: 1
      }
    }
  }
};
