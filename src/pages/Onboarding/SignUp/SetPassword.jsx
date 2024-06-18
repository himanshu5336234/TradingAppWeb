import React, { useState } from "react";
import { Box, InputAdornment } from "@mui/material";
import PropTypes from "prop-types";
import PasswordStrength from "@/components/UI/PasswordStrength/PasswordStrength";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { Eyeicon } from "@/assets/icons";

const textStrings = {
  TITLE: "Get Started with Density!",
  SUBTITLE: "Lorem ipsum dolor sit amet consectetur.",
  CREATEPASSWORD: "Create your password",
  BACK: "Create your password"
};

function SetPassword({ userInputPassword, setUserInputPassword, setPasswordError }) {
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleFocus = (event) => {
    if (event.type === "focus") {
      setShowPasswordStrength(true);
    } else if (event.type === "blur") {
      setShowPasswordStrength(false);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <BasicTextFields
        backgroundColor={"background.primary"}
        variant="outlined"
        label={textStrings.CREATEPASSWORD}
        id="password"
        name="password"
        onChange={(event) => {
          setUserInputPassword(String(event.target.value));
          setPasswordError("");
        }}
        onBlur={handleFocus}
        onFocus={handleFocus}
        value={String(userInputPassword)}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" disableTypography>
              <span style={{ cursor: "pointer" }} onClick={() => handleClickShowPassword()}>
                {showPassword ? (
                  <Box
                    sx={{
                      background: "linear-gradient(to top right, #00000008 calc(50% - 1px), #fff , transparent calc(43% + 1px) )"
                    }}
                    component={"img"}
                    src={Eyeicon}
                  />
                ) : (
                  <Box component={"img"} src={Eyeicon} />
                )}
              </span>
            </InputAdornment>
          )
        }}
      />
      <PasswordStrength password={userInputPassword} isOpen={showPasswordStrength} />
    </Box>
  );
}

SetPassword.propTypes = {
  setCurrentScreen: PropTypes.func,
  redirectFrom: PropTypes.string,
  userInputPassword: PropTypes.string,
  setUserInputPassword: PropTypes.func,
  setPasswordError: PropTypes.func
};

export default SetPassword;
