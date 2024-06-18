import React, { useState } from "react";
import PropTypes from "prop-types";
import warning from "@/assets/images/userSettings/ReferralTabs/Warning.svg";

import { Box, Checkbox, FormControlLabel, Typography, useMediaQuery } from "@mui/material";
import CustomModal from "./newModal/CustomModal";
import TextView from "../UI/TextView/TextView";
interface Props {
  isOpen: boolean;
  positionEntry: () => void;
  close: () => void;
  closeAllPositionApiResponseStatus: boolean;
}
const CloseAllModal = ({ isOpen, positionEntry, close, closeAllPositionApiResponseStatus }: Props) => {
  const [DontShowMeAgain, setDontShowMeAgain] = useState(false);
  const isMWeb = useMediaQuery("(max-width:600px)");

  const primaryAction = () => {
    DontShowMeAgain && localStorage.setItem("doNotShowAgainAllPositionCloseModal", true);

    positionEntry();
  };
  return (
    <>
      <CustomModal
        IsOpen={isOpen}
        secondaryAction={close}
        isDisabled={closeAllPositionApiResponseStatus}
        isloading={closeAllPositionApiResponseStatus}
        close={close}
        isClose={true}
        isSecondaryAction={true}
        isPrimaryAction={true}
        primaryName={"Yes, I am sure"}
        secondaryName={"Cancel"}
        ContainerSx={{ maxWidth: { sm: "420px", xs: "320px" } }}
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
            <TextView style={{ textAlign: { xs: "center", md: "start" } }} variant={isMWeb ? "Medium_26" : "Medium_22"} text={"Are you sure ?"} />

            <Typography
              textAlign={{ xs: "center", md: "start" }}
              variant={isMWeb ? "Regular_14" : "Regular_14"}
              sx={{
                letterSpacing: "0.5px ",
                marginTop: "0px",
                marginBottom: "-8px",
                color: "text.quaternary"
              }}
            >
              {"This will cancel all your existing open orders for the contracts. Exercise caution before confirming."}
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
                ".MuiTypography-root": {
                  fontSize: { xs: "10px", md: "12px" },
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                  color: "text.quaternary"
                }
              }}
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: "2px" }} />
      </CustomModal>
    </>
  );
};

CloseAllModal.prototype = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,

  closeAllPositionApiResponseStatus: PropTypes.func,

  positionEntry: PropTypes.func
};

export default CloseAllModal;
