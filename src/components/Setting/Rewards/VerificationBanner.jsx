import { Avatar, Box, Button, Typography } from "@mui/material";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  BANNER_CLOSE_WRAPPER,
  BANNER_WARNING_ICON_STYLE,
  BANNER_WARNING_WRAPPER,
  GET_VERIFIED_BANNER_STYLE,
  GET_VERIFIED_BUTTON_STYLE,
  GET_VERIFIED_CTA_WRAPPER
} from "@/pages/UserProfile/Rewards/styles";
import { useNavigate } from "react-router-dom";
import { VERIFICATION_BANNER_TEXT, VERIFICATION_CTA_TEXT } from "@/pages/UserProfile/Rewards/Constants";
import { USER_SETTING_TABS } from "@/pages/UserProfile/Constants";

const VerificationBanner = () => {
  const [isOpenBanner, setIsOpenBanner] = useState(true);
  const navigate = useNavigate();
  if (isOpenBanner) {
    return (
      <Box sx={GET_VERIFIED_BANNER_STYLE}>
        <Box display="flex" gap="24px" px={2} alignItems="center">
          <span style={BANNER_WARNING_WRAPPER}>
            <ErrorOutlinedIcon sx={BANNER_WARNING_ICON_STYLE} />
          </span>

          <Typography color="text.dark" variant="Medium_14" component={"span"}>
            {VERIFICATION_BANNER_TEXT}
          </Typography>
        </Box>
        <Box px={1}>
          <Box sx={GET_VERIFIED_CTA_WRAPPER}>
            <Button
              sx={GET_VERIFIED_BUTTON_STYLE}
              variant="contained"
              disableElevation
              onClick={() =>
                navigate("/user", {
                  state: { currentTab: USER_SETTING_TABS.USER_VERIFICATION }
                })
              }
            >
              {VERIFICATION_CTA_TEXT}
            </Button>
            <Avatar sx={BANNER_CLOSE_WRAPPER} onClick={() => setIsOpenBanner(false)}>
              <CloseRoundedIcon sx={{ color: "#F8FFDC", fontSize: "18px" }} />
            </Avatar>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

export default VerificationBanner;
