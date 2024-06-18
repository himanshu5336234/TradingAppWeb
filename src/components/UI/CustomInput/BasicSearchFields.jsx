import * as React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
export default function BasicTextFields(props) {
  const { styles, variant, backgroundColor, label, type, Error, disabled, placeholder, children } = props;
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor ?? "background.default",
        py: "8px",
        borderRadius: "8px",
        border: "2px solid",
        borderColor: [Error ? "text.error" : "background.tertiary"]
      }}
    >
      {label && (
        <Typography color={"text.secondary"} variant="Medium_10">
          {label}
        </Typography>
      )}
      <TextField
        {...props}
        placeholder={placeholder}
        sx={[
          {
            ".MuiInputBase-input": {
              p: "0px",
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
        onFocus={(e) =>
          e.target.addEventListener(
            "wheel",
            function (e) {
              e.preventDefault();
            },
            { passive: false }
          )
        }
        disabled={disabled ?? false}
        label={""}
        type={type ?? "text"}
        variant={variant ?? "outlined"}
        InputLabelProps={{ shrink: true }}
        autoComplete="off"
      />
      {children}
    </Box>
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
  children: PropTypes.node
};
