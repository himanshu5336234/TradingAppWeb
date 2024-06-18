import { Box, Divider, FormControl, FormControlLabel, FormGroup, Grid, Switch, Typography } from "@mui/material";

import React, { useState } from "react";
import { SECURITY_TAB_WRAPPER } from "../Security/styles";
import { FORM_LABEL_STYLE, SWITCH_STYLE } from "./styles";
import CustomRow from "@/components/Setting/CustomRow/CustomRow";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_PREFERENCES_EMAIL_ALERT_SUCCESS, GET_USER_PREFERENCES_CONFIRMATION_SUCCESS } from "BL/redux/constants/Constants";
import CustomSnackbar from "@/components/UI/Snackbar/CustomSnackbar";
import { CONFIRMATION, CONFIRMATION_SUBTITLE, DEFAULT_LEVERAGE, DEFAULT_ORDER_SIZE, DEFAULT_SETTINGS, DEFAULT_SUBTITLE, EMAIL_ALERTS, EMAIL_ALERTS_SUBTITLE } from "./constant";

const Preferences = () => {
  const dispatch = useDispatch();

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [defaultOrderSize, setDefaultOrderSize] = useState("10");
  const [defaultLeverage, setDefaultLeverage] = useState("10");

  const userPreferences = useSelector((state) => state.GetUserPreferences.UserPreferences);
  const emailAlertPreferences = userPreferences.preferences.email_alert;
  const confirmationPreferences = userPreferences.preferences.confirmation;

  const handleOpen = () => {
    setOpenConfirmation(true);
  };

  const handleEmailAlertPreferences = (event) => {
    const currentPreferenceValue = event.target.value;

    const updatedEmailAlertPreferences = emailAlertPreferences.map((emailPref) => {
      if (emailPref.alert_type === currentPreferenceValue) {
        emailPref.alert_preference = !emailPref.alert_preference;
      }
      return emailPref;
    });

    // Send Email Alert Preferences
    dispatch({ type: GET_USER_PREFERENCES_EMAIL_ALERT_SUCCESS, payload: updatedEmailAlertPreferences });
    handleOpen();
  };

  const handleConfirmationPreferences = (event) => {
    const currentPreferenceValue = event.target.value;

    const updatedConfirmationPreferences = confirmationPreferences.map((confirmationPref) => {
      if (confirmationPref.preference_type === currentPreferenceValue) {
        confirmationPref.preference_value = !confirmationPref.preference_value;
      }
      return confirmationPref;
    });

    // Send Confirmation Preferences
    dispatch({ type: GET_USER_PREFERENCES_CONFIRMATION_SUCCESS, payload: updatedConfirmationPreferences });
    handleOpen();
  };

  const emailPreferenceItems = () => {
    return emailAlertPreferences.map((option, index) => (
      <FormControlLabel
        sx={FORM_LABEL_STYLE}
        key={option.alert_type}
        value={option.alert_type}
        control={<Switch sx={SWITCH_STYLE} checked={option.alert_preference} onChange={(event) => handleEmailAlertPreferences(event)} />}
        label={option.alert_type}
      />
    ));
  };

  const confirmationPreferenceItems = () => {
    return confirmationPreferences.map((option, index) => (
      <FormControlLabel
        sx={FORM_LABEL_STYLE}
        key={option.preference_type}
        value={option.preference_type}
        control={<Switch sx={SWITCH_STYLE} checked={option.preference_value} onChange={(event) => handleConfirmationPreferences(event)} />}
        label={option.preference_type}
      />
    ));
  };

  return (
    <>
      <Grid container rowSpacing={2} sx={SECURITY_TAB_WRAPPER}>
        <Grid item xs={12}>
          <Box padding={2}>
            <Typography variant="SemiBold_18" component={"h3"}>
              {EMAIL_ALERTS}
            </Typography>
            <Typography color="text.mild" variant="Regular_16" component={"h4"}>
              {EMAIL_ALERTS_SUBTITLE}
            </Typography>
          </Box>
          <Box>
            <FormControl component="fieldset" variant="standard">
              <FormGroup sx={{ maxWidth: 200 }}>{emailPreferenceItems()}</FormGroup>
            </FormControl>
          </Box>
          <Divider sx={{ marginTop: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <Box padding={2}>
            <Typography variant="SemiBold_18" component={"h3"}>
              {CONFIRMATION}
            </Typography>
            <Typography color="text.mild" variant="Regular_16" component={"h4"}>
              {CONFIRMATION_SUBTITLE}
            </Typography>
          </Box>
          <Box>
            <FormControl component="fieldset" variant="standard">
              <FormGroup sx={{ maxWidth: 200 }}>{confirmationPreferenceItems()}</FormGroup>
            </FormControl>
          </Box>
          <Divider sx={{ marginTop: 2 }} />
        </Grid>

        <Grid item xs={12} pb={2}>
          <Box padding={2}>
            <Typography variant="SemiBold_18" component={"h3"}>
              {DEFAULT_SETTINGS}
            </Typography>
            <Typography color="text.mild" variant="Regular_16" component={"h4"}>
              {DEFAULT_SUBTITLE}
            </Typography>
          </Box>
          <Box paddingX={2}>
            <CustomRow title={DEFAULT_ORDER_SIZE} Text={defaultOrderSize} setText={setDefaultOrderSize}>
              {defaultOrderSize} USDT
            </CustomRow>
            <Divider />
            <CustomRow title={DEFAULT_LEVERAGE} Text={defaultLeverage} setText={setDefaultLeverage}>
              <Typography color="text.main" variant="Regular_16">
                {defaultLeverage}x
              </Typography>
            </CustomRow>
            <Divider />
          </Box>
        </Grid>
        {/* To be removed once globalmesage is done in call */}
        <CustomSnackbar
          snackbarTitle="Preferences Updated Successfully"
          isSnackbarOpen={openConfirmation}
          handleIsSnackbarOpen={setOpenConfirmation}
          snackbarType="success"
          snackbarActionDefault={() => null}
          alertTimer={700}
          snackbarSubTitle="Lorem ipsum dolor sit amet, consectetur adipiscing"
        />
      </Grid>
    </>
  );
};

export default Preferences;
