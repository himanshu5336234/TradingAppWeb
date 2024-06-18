export const StepperStyle = {
  width: "100%",
  justifyContent: "center",
  "& .MuiStepConnector-root": {
    display: "none"
  },
  "& .MuiStep-root": {
    px: 0,
    ml: 1
  },
  "& .MuiSvgIcon-root": {
    fontSize: "20px"
  },
  "& .MuiStepLabel-root": {
    ".MuiStepLabel-label": {
      fontSize: "12px",
      marginTop: "2px"
    },
    ".Mui-completed": {
      color: "#E2FF6F !important", // circle color (ACTIVE)
      ".MuiSvgIcon-root": {
        color: "#E2FF6F !important",
        fontSize: "20px"
      } // circle color (COMPLETED)
    },
    ".Mui-active": {
      color: "#E2FF6F !important", // circle color (ACTIVE)
      "&.MuiSvgIcon-root": {
        color: "#E2FF6F !important",
        fontSize: "20px"
      }
    }
  },
  "& .MuiStepIcon-root": {
    ".Mui-active": {
      color: "#E2FF6F"
    }
  }
};
