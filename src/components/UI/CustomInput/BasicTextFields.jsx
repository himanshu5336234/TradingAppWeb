import * as React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
export default function BasicTextFields(props) {
  const { styles, className, autoFocus, onFocus, errorText, variant, backgroundColor, label, type, Error, disabled, placeholder, children, onBlur, disabledTextInPrimary } = props;

  const CustomOnFocusHandler = (event) => {
    if (onFocus) {
      onFocus(event);
    } else {
      event.target.addEventListener(
        "wheel",
        function (e) {
          e.preventDefault();
        },
        { passive: false }
      );
    }
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: backgroundColor ?? "background.default",
          p: " 4px 8px",
          width: "100%",
          borderRadius: "4px",
          border: "0.5px solid",
          borderColor: [Error ? "text.error" : "background.default"]
        }}
      >
        {label && (
          <Typography color={"text.regular"} variant="Medium_10">
            {label}
          </Typography>
        )}
        <TextField
          {...props}
          className={className}
          placeholder={placeholder}
          sx={[
            disabledTextInPrimary && {
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "white"
              }
            },
            {
              ".MuiInputBase-input": {
                p: "5px 0px",
                fontFamily: "Neurial-Bold",
                fontSize: "14px"
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderWidth: "0px" }
              }
            },
            {
              width: "100%",
              "&.MuiFormHelperText-root.Mui-error": { color: "white" }
            },
            styles
          ]}
          errorText={errorText}
          onFocus={CustomOnFocusHandler}
          onBlur={onBlur}
          disabled={disabled ?? false}
          label={""}
          autoFocus={autoFocus}
          type={type ?? "text"}
          variant={variant ?? "outlined"}
          InputLabelProps={{ shrink: true }}
          autoComplete="off"
        />
        {children}
      </Box>
      <Typography variant="Medium_10" sx={{ textTransform: "capitalize" }} color={"text.error"}>
        {errorText}
      </Typography>
    </>
  );
}
BasicTextFields.propTypes = {
  value: PropTypes.any,
  backgroundColor: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  required: PropTypes.bool,
  Error: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  InputProps: PropTypes.object,
  inputProps: PropTypes.object,
  styles: PropTypes.object,
  onBlur: PropTypes.func,
  errorText: PropTypes.string,
  helperText: PropTypes.string,
  autoFocus: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  disabledTextInPrimary: PropTypes.string
};
