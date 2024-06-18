import * as React from "react";
import PropTypes from "prop-types";
import { StyledToggleButtonGroup, StyledToggleButtonGroupPrimary, StyledToggleButtonGroupSecondary } from "./ToggleGroup.styled.js";
import ToggleButton from "@mui/material/ToggleButton";
const ToggleGroup = ({ id, values, value, handleChange, variant, includesCustom, handleCustomClick, disabled, styles }) => {
  const ReturnComponentBasedOnVarient = (id, variant) => {
    if (variant === "primary") {
      return (
        <StyledToggleButtonGroupPrimary id={id} value={value} disabled={disabled} exclusive styles={styles} onChange={handleChange}>
          {values.map(({ name, value, id }, index) => {
            if (includesCustom && value === "custom") {
              return (
                <ToggleButton key={index} value={value} onClick={handleCustomClick} id={id}>
                  {name}
                </ToggleButton>
              );
            } else {
              return (
                <ToggleButton key={index} variant={variant ?? "chip"} value={value} id={id}>
                  {name}
                </ToggleButton>
              );
            }
          })}
        </StyledToggleButtonGroupPrimary>
      );
    } else if (variant === "secondary") {
      return (
        <StyledToggleButtonGroupSecondary id={id} value={value} disabled={disabled} styles={styles} exclusive onChange={handleChange}>
          {values.map(({ name, value, id }, index) => {
            return (
              <ToggleButton key={index} variant={variant ?? "chip"} value={value} id={id}>
                {name}
              </ToggleButton>
            );
          })}
        </StyledToggleButtonGroupSecondary>
      );
    } else {
      return (
        <StyledToggleButtonGroup id={id} value={value} disabled={disabled} exclusive styles={styles} onChange={handleChange}>
          {values.map(({ name, value, id }, index) => {
            if (includesCustom && value === "custom") {
              return (
                <ToggleButton key={index} value={value} onClick={handleCustomClick} id={id}>
                  {name}
                </ToggleButton>
              );
            } else {
              return (
                <ToggleButton key={index} variant={variant ?? "chip"} value={value} id={id}>
                  {name}
                </ToggleButton>
              );
            }
          })}
        </StyledToggleButtonGroup>
      );
    }
  };
  return <>{ReturnComponentBasedOnVarient(id, variant)}</>;
};

ToggleGroup.propTypes = {
  values: PropTypes.array,
  value: PropTypes.any,
  variant: PropTypes.string,
  handleChange: PropTypes.func,
  includesCustom: PropTypes.bool,
  handleCustomClick: PropTypes.func,
  styles: PropTypes.object,
  disabled: PropTypes.bool
};

export default ToggleGroup;
