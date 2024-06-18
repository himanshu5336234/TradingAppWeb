export const WhiteText = { color: "text.primary" };
export const ButtonGroups = {
  p: { xs: 0, sm: "5px 20px" },
  borderColor: "borderColor.primary",
  ":hover": {
    borderColor: "borderColor.primary",
    backgroundColor: "background.regular"
  }
};
export const STEP = {
  "& .MuiStepLabel-root .Mui-completed": {
    color: "success.main" // circle color (COMPLETED)
  },
  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
    color: "common.white" // Just text label (COMPLETED)
  },
  "& .MuiStepLabel-root .Mui-active": {
    color: "success.main" // circle color (ACTIVE)
  },
  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
    color: "common.white" // Just text label (ACTIVE)
    //  color: "black",
  },
  "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
    fill: "common.white", // circle's number (ACTIVE)
    color: "common.white"
  }
};
export const FAILED_ICON_STYLE = {
  color: "red",
  fontSize: "27px",
  marginTop: "-2px"
};
export const SUCCESS_ICON_STYLE = {
  color: "#00BD84",
  fontSize: "27px",
  marginTop: "-2px"
};
export const SUCCESS_CONTAINER = {
  marginTop: 10
};
export const GREEN_ICON = {
  backgroundColor: "#27BD67",
  width: "62px",
  height: "62px"
};
export const DONE_ICON = { color: "black", fontSize: "40px" };
export const GREEN_TITLE = {
  mt: 2,
  mb: 1,
  color: "text.primary",
  textAlign: "center"
};
export const ENTER_AMOUNT_CONTAINER = {
  marginTop: "2%",
  marginLeft: "4%",
  marginRight: "4%"
};
export const STEP_TITLE = {
  display: "flex",
  justifyContent: "space-between"
};
export const TITLE_FONT = { color: "text.primary", marginBottom: "35px" };
export const PADDED_TEXT_FIELD = {
  color: "text.primary",
  paddingTop: "14px",
  paddingBottom: "14px"
};
export const RUPEE_LOGO = {
  border: "1px solid",
  borderRadius: "2px",
  height: { xs: "43px", sm: "43px", md: "55px" },
  width: "111px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px"
};
export const AVATAR = {
  backgroundColor: "background.white",
  width: "20px",
  height: "20px",
  color: "black",
  borderRadius: "50%"
};
export const BUTTON_WRAPPER = {
  mt: 3,
  alignItems: { sm: "center", xs: "end" },
  gap: "5px",
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "space-between"
};
export const BUTTON_BOX = { display: "flex", gap: "7px" };

export const BOX_SPACE_BETWEEN = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "flex-start"
};
export const GAP = { display: "flex", gap: "30px" };
export const TRANSFERFUNDFIELD = { display: "flex", justifyContent: "space-between", gap: "30px" };
export const CURSOR_POINTER = { "&:hover": { cursor: "pointer" } };
export const STEP_MAIN = {
  marginTop: "20px"
};
export const FOOTER_MAIN = {
  display: "flex",
  py: "25px",
  backgroundColor: "#2C2C34",
  width: "100%",
  justifyContent: "flex-end",
  gap: "25px",
  pr: "45px"
};
export const WHITE_OUTLINED = {
  color: "white",
  borderColor: "white",
  ":hover": {
    borderColor: "white"
  },
  width: "196px",
  borderRadius: "0px"
};
export const WHITE_CONTAINED = {
  color: "black",
  backgroundColor: "white",
  ":hover": {
    bgcolor: "white"
  },
  width: "196px",
  borderRadius: "0px"
};
export const TRANSFER_FUND_NOTE_STYLE = {
  fontSize: "14px",
  color: "gray",
  mt: "30px"
};
export const ENTER_AMOUNT_NOTE_STYLE = {
  fontSize: "14px",
  mb: "10px"
};
export const ENTER_AMOUNT_HELPER_TEXT_WRAPPER = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};
