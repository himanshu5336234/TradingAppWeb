export const MuiStep = {
  styleOverrides: {
    root: {
      ".MuiStepLabel-root .MuiStepLabel-labelContainer ": {
        color: "#fff !important"
      },
      "& .MuiStepLabel-root .Mui-completed": {
        "&.MuiSvgIcon-root": {
          color: "#00BD84"
        }
      },
      "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
        "&.MuiSvgIcon-root": {
          color: "#00BD84"
        } // Just text label (COMPLETED)
      },
      "& .MuiStepLabel-root .Mui-active": {
        "&.MuiStepIcon-text": {
          fill: "#fff"
        },
        "&.MuiSvgIcon-root": {
          color: "#00BD84"
        },
        color: "#fff" // circle color (ACTIVE)
      },
      "&.MuiStepLabel-root .MuiStepLabel-vertical .Mui-disabled css-14sza3e-MuiStepLabel-root": {
        "&.MuiStepIcon-text": {
          fill: "#fff"
        },
        "&.MuiSvgIcon-root": {
          color: "#00BD84"
        },
        color: "#fff !important"
      }
    }
  }
};
