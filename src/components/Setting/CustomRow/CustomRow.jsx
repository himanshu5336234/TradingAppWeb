import { Avatar, Button, Grid, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { AVATAR_WRAPPER, BUTTON_WRAPPER, CHANGE_BUTTON, CONTENT, ICON_BUTTONS, TEXT_FIELD, TITLE } from "./styles";

function CustomRow({ title, children, text, CustomButton, isCustomButton, customChangeAction, isCustomChangeAction, doneAction, isErrorInput, errorText, seterrortext }) {
  const [IsEditMode, setIsEditMode] = useState(false);
  const [TemporaryText, setTemporaryText] = useState("");

  useEffect(() => {
    setTemporaryText(text);
  }, [text]);

  const defaultChangeAction = () => {
    setIsEditMode(true);
  };

  const doneActionMain = () => {
    doneAction(TemporaryText)
      .then((res) => {
        setIsEditMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeEditMode = () => {
    setTemporaryText("");
    setIsEditMode(false);
  };
  const InputAndButton = () => {
    if (IsEditMode) {
      return (
        <>
          <Grid item sx={CONTENT} xs={6}>
            <BasicTextFields
              variant="outlined"
              value={TemporaryText}
              styles={TEXT_FIELD}
              inputProps={{
                style: {
                  padding: 6
                }
              }}
              onChange={(event) => {
                setTemporaryText(event.target.value);
                seterrortext(false);
              }}
              error={isErrorInput}
              helperText={isErrorInput && errorText}
            />
          </Grid>
          <Grid item sx={ICON_BUTTONS} xs={3}>
            <Avatar
              sx={{
                ...{ backgroundColor: "background.success.primary" },
                ...AVATAR_WRAPPER
              }}
              onClick={doneActionMain}
            >
              <DoneIcon sx={{ fontSize: "14px" }} />
            </Avatar>
            <Avatar
              sx={{
                ...{ backgroundColor: "background.error.primary" },
                ...AVATAR_WRAPPER
              }}
              onClick={closeEditMode}
            >
              <CloseIcon sx={{ fontSize: "14px" }} />
            </Avatar>
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid item sx={CONTENT} xs={6}>
            {children}
          </Grid>
          <Grid item sx={BUTTON_WRAPPER} xs={3}>
            {isCustomButton ? (
              CustomButton
            ) : (
              <Button
                sx={CHANGE_BUTTON}
                variant="outlined"
                onClick={isCustomChangeAction ? customChangeAction : defaultChangeAction}
                startIcon={<EditIcon sx={{ fontSize: "14px !important", marginBottom: "2px" }}></EditIcon>}
              >
                <Typography variant="Regular_12">Change</Typography>
              </Button>
            )}
          </Grid>
        </>
      );
    }
  };

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{ minHeight: "53px" }}>
      <Grid item sx={TITLE} xs={3}>
        <Typography variant={"Regular_16"}>{title}</Typography>
      </Grid>
      {InputAndButton()}
    </Grid>
  );
}

export default memo(CustomRow);

CustomRow.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  text: PropTypes.any,
  doneAction: PropTypes.any,
  CustomButton: PropTypes.any,
  isCustomButton: PropTypes.bool,
  customChangeAction: PropTypes.func,
  isCustomChangeAction: PropTypes.bool,
  isErrorInput: PropTypes.bool,
  errorText: PropTypes.string,
  seterrortext: PropTypes.func
};
