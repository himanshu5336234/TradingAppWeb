import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
const useStyles = makeStyles({
  colorPrimary: {
    height: "100%",
    backgroundColor: "#000000"
  },
  barColorPrimary: {
    backgroundColor: "#E2FF6F"
  },
  dashedColorPrimary: {
    backgroundImage: "radial-gradient(#f6ce95 0%, #f6ce95 16%, transparent 42%)"
  }
});
const Loader = (props) => {
  const { customObject, linear, circular } = props;

  const classes = useStyles();
  const loaderObject = {
    width: "30%",
    margin: "auto"
  };
  return (
    <Box sx={customObject || loaderObject}>
      {linear && (
        <LinearProgress
          classes={{
            colorPrimary: classes.colorPrimary,
            dashedColorPrimary: classes.dashedColorPrimary,
            barColorPrimary: classes.barColorPrimary
          }}
        />
      )}
      {circular && <CircularProgress sx={{ color: "text.main" }} />}
    </Box>
  );
};

Loader.propTypes = {
  customObject: PropTypes.object
};

export default Loader;
