import React from "react";
import PropTypes from "prop-types";

// material UI
import { InputLabel } from "@mui/material";
import Select from "@mui/material/Select";

// style
import useStyles from "./select.style";

const CustomSelectField = ({ name, label, multiline, rows, Required, children, value, onChange }) => {
  const classes = useStyles();

  const configSelectField = {
    onChange,
    size: "small",
    multiline,
    rows,
    className: classes.textField,
    variant: "outlined"
  };

  return (
    <React.Fragment>
      <InputLabel
        required={Required}
        className={classes.inputLabel}
        classes={{
          asterisk: classes.labelAsterisk
        }}
      >
        {label}
      </InputLabel>

      <Select {...configSelectField} fullWidth multiline={multiline} rows={rows} value={value}>
        {children}
      </Select>
    </React.Fragment>
  );
};

CustomSelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  Required: PropTypes.bool,
  rest: PropTypes.object,
  children: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func
};

CustomSelectField.defaultProps = {
  name: "",
  label: "",
  multiline: false,
  Required: false,
  rows: 1,
  onChange: () => {},
  rest: {}
};

export default CustomSelectField;
