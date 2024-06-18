/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Satisfied from "ASSETS/images/KycVerification/verified.svg";
import NotSatisfied from "ASSETS/images/KycVerification/failed.svg";
import TextView from "../TextView/TextView";

const PasswordStrength = ({ isOpen, password }) => {
  const [strength, setStrength] = useState(0);
  const [strengthString, setStrengthString] = useState("Weak");
  const [conditionsMet, setConditionsMet] = useState({
    eightChars: { condition: false, label: "8-16 characters" },
    upperCase: { condition: false, label: "One Upper case" },
    lowerCase: { condition: false, label: "One Lower case" },
    number: { condition: false, label: "One number" },
    specialChar: { condition: false, label: "Special Characters" }
  });

  useEffect(() => {
    let count = 0;
    if (/[A-Z]/.test(password)) {
      count++;
      setConditionsMet((prevState) => ({
        ...prevState,
        upperCase: { ...prevState.upperCase, condition: true }
      }));
    } else {
      setConditionsMet((prevState) => ({
        ...prevState,
        upperCase: { ...prevState.upperCase, condition: false }
      }));
    }
    if (/[a-z]/.test(password)) {
      count++;
      setConditionsMet((prevState) => ({
        ...prevState,
        lowerCase: { ...prevState.lowerCase, condition: true }
      }));
    } else {
      setConditionsMet((prevState) => ({
        ...prevState,
        lowerCase: { ...prevState.lowerCase, condition: false }
      }));
    }
    if (/[0-9]/.test(password)) {
      count++;
      setConditionsMet((prevState) => ({
        ...prevState,
        number: { ...prevState.number, condition: true }
      }));
    } else {
      setConditionsMet((prevState) => ({
        ...prevState,
        number: { ...prevState.number, condition: false }
      }));
    }
    if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password)) {
      count++;
      setConditionsMet((prevState) => ({
        ...prevState,
        specialChar: { ...prevState.specialChar, condition: true }
      }));
    } else {
      setConditionsMet((prevState) => ({
        ...prevState,
        specialChar: { ...prevState.specialChar, condition: false }
      }));
    }
    if (/.{8}/.test(password)) {
      count++;
      setConditionsMet((prevState) => ({
        ...prevState,
        eightChars: { ...prevState.eightChars, condition: true }
      }));
    } else {
      setConditionsMet((prevState) => ({
        ...prevState,
        eightChars: { ...prevState.eightChars, condition: false }
      }));
    }

    if (count <= 1) setStrengthString("Weak");
    else if (count <= 3) setStrengthString("Medium");
    else setStrengthString("Strong");
    setStrength(count * 20);
  }, [password, setStrength]);

  return (
    <>
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            zIndex: 1300,
            borderRadius: "6px",
            padding: "15px",
            width: "250px",
            backgroundColor: "background.primary"
          }}
        >
          <LinearProgress variant="determinate" value={strength} />
          <TextView style={{ my: 1 }} component={"p"} variant={"Medium_12"} text={strengthString} />

          <TextView variant={"Medium_12"} text={"Your password should contain "} />

          {Object.keys(conditionsMet).map((key) => (
            <Grid key={key} sx={{ display: "flex", alignItems: "center" }}>
              <Grid sx={{ height: "25px", margin: "5px 10px 5px 0" }}>
                {conditionsMet[key].condition ? <img style={{ width: "20px" }} src={Satisfied} /> : <img style={{ width: "20px" }} src={NotSatisfied} />}
              </Grid>
              <TextView variant={"Medium_12"} text={conditionsMet[key].label} />
            </Grid>
          ))}
        </Box>
      )}
    </>
  );
};

PasswordStrength.propTypes = {
  isOpen: PropTypes.bool,
  password: PropTypes.string
};
export default PasswordStrength;
