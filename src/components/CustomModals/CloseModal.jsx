import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Checkbox, FormControlLabel, Typography, useMediaQuery } from "@mui/material";
import CustomModal from "./newModal/CustomModal";
import warning from "@/assets/images/userSettings/ReferralTabs/Warning.svg";

const CloseModal = ({ isOpen, close, positionEntry, isloading, isDisabled }) => {
  const [DontShowMeAgain, setDontShowMeAgain] = useState(false);
  const isMWeb = useMediaQuery("(max-width:600px)");
  const primaryAction = () => {
    DontShowMeAgain && localStorage.setItem("doNotShowAgainPositionCloseModal", true);
    positionEntry();
  };
  return (
    <>
      <CustomModal
        isDisabled={isDisabled}
        isloading={isloading}
        IsOpen={isOpen}
        close={close}
        isClose={true}
        isSecondaryAction={true}
        ContainerSx={{ maxWidth: { sm: "420px", xs: "320px" } }}
        secondaryName={"Dismiss"}
        secondaryAction={close}
        isPrimaryAction={true}
        primaryName={"Confirm"}
        primaryAction={primaryAction}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "column" },
            alignItems: { xs: "center", md: "flex-start" },
            gap: 1
          }}
        >
          <img src={warning} alt={"image"} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { md: "10px", xs: "" }
            }}
          >
            <Typography textAlign={{ xs: "center", md: "start" }} variant={isMWeb ? "Medium_26" : "Medium_22"}>
              {"Are you sure ?"}
            </Typography>
            <Typography
              textAlign={{ xs: "center", md: "start" }}
              variant={isMWeb ? "Regular_14" : "Regular_14"}
              sx={{ letterSpacing: "0.5px ", marginTop: "0px", marginBottom: "-8px", color: "text.quaternary" }}
            >
              {" This will cancel your existing open order for the respective contract. "}
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  id="Position-close-checkbox"
                  sx={{
                    width: "0px",
                    height: " 0px",
                    color: "text.quaternary",
                    "&:hover": {
                      backgroundColor: "transparent"
                    }
                  }}
                  checked={DontShowMeAgain}
                  onChange={(event) => setDontShowMeAgain(event.target.checked)}
                />
              }
              label="Don't show me again"
              sx={{
                mt: 1,
                ml: 0,
                gap: "10px",
                ".MuiTypography-root": { fontSize: { xs: "10px", md: "12px" }, fontWeight: "500", letterSpacing: "0.5px", color: "text.quaternary" }
              }}
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: "2px" }} />
      </CustomModal>
    </>
  );
};

CloseModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  secondaryActionTitle: PropTypes.string,
  secondaryAction: PropTypes.func,
  isSecondaryActionVisible: PropTypes.bool,
  positionEntry: PropTypes.func,
  setClosePositionApiResponseStatus: PropTypes.func,
  message: PropTypes.string,
  isDisabled: PropTypes.bool,
  isloading: PropTypes.bool
};
export default CloseModal;
