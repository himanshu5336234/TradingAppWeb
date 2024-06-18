import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const CustomCheckBox = ({ varient, label, disabled, id, checked, onchange }: { varient: string; label: any; id: string; disabled: boolean; checked: boolean; onchange: Function }) => {
  return (
    <>
      {varient === "primary" && (
        <FormControlLabel
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "12px",
              color: "text.regular"
            }
          }}
          control={
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 16 },
                "&.Mui-checked": {
                  color: "text.main"
                }
              }}
              disabled={disabled}
              id={id}
              color={"primary"}
              checked={checked}
              onChange={onchange}
            />
          }
          label={label}
        />
      )}
      {varient === "secondary" && (
        <FormControlLabel
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "12px",
              color: "text.regular"
            }
          }}
          control={
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 16 },
                "&.Mui-checked": {
                  color: "#EBB62F"
                }
              }}
              disabled={disabled}
              id={id}
              color={"primary"}
              checked={checked}
              onChange={onchange}
            />
          }
          label={label}
        />
      )}
    </>
  );
};

export default CustomCheckBox;
