import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { makeStyles } from "@mui/styles";

const Field = ({ label, value, setValue, helperText, setHelperText, customHandleChange, sx, margin, ...rest }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
    if (setHelperText) setHelperText("");
  };

  const useStyles = makeStyles({
    input: {
      "& input[type=number]": {
        "-moz-appearance": "textfield"
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0
      },
      border: "0px"
    }
  });
  const useHelperTextStyles = makeStyles(() => ({
    root: {
      background: "#101010",
      margin: "0px"
    }
  }));
  const classes = useStyles();
  const helperTextStyles = useHelperTextStyles();

  return (
    <FormControl fullWidth margin={margin ? "normal" : "none"}>
      <Typography id="label" variant="Medium_14" sx={{ mb: "0.2rem", color: "#fff" }}>
        {label}
      </Typography>
      <TextField
        autoComplete="off"
        sx={{
          background: "rgba(79, 79, 79, 0.25)",
          input: { p: "12px", color: "#FCFCFC" },
          ...sx
        }}
        helperText={helperText}
        error={!!helperText}
        FormHelperTextProps={{
          classes: {
            root: helperTextStyles.root
          }
        }}
        className={[classes.input]}
        value={value}
        onChange={customHandleChange || handleChange}
        placeholder="xxxxxxx"
        {...rest}
      />
    </FormControl>
  );
};

Field.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  setValue: PropTypes.any,
  sx: PropTypes.any,
  margin: PropTypes.bool,
  rest: PropTypes.any,
  helperText: PropTypes.string,
  setHelperText: PropTypes.func,
  customHandleChange: PropTypes.func
};

export default Field;
