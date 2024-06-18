import { Box, Typography, FormGroup, FormControlLabel, Badge, Switch } from "@mui/material/node";
import React from "react";
import CustomModal from "./CustomModal";
import PropTypes from "prop-types";
import densityCoin from "../../../assets/images/onboarding/densityCoin.svg";
import densityBackground from "../../../assets/images/onboarding/densityBackground.svg";
import onBoardingReward from "../../../assets/images/onboarding/onBoardingReward.svg";
import { STATUS_MODAL_WRAPPER_TYPE_1, CENTER_TEXT } from "./Style";

const OnBoardingMoadal = ({
  type,
  IsOpen,
  close,
  isPrimaryAction,
  isSecondaryAction,
  primaryAction,
  secondaryName,
  secondaryAction,
  primaryName,
  isSupportChatVisible,
  toggleIsSupportChatVisible,
  isClose
}) => {
  function getModalType(type) {
    switch (type) {
      case "ONBOARDING_REWARD":
        return (
          <Box sx={{ ...STATUS_MODAL_WRAPPER_TYPE_1 }}>
            <img src={onBoardingReward} alt="logo" width={"152px"} />
            <Typography variant="SemiBold_28_KYC" component={"h2"} sx={[CENTER_TEXT]}>
              {"Congratulations!"}
              <Typography variant="SemiBold_28_KYC" component={"div"} sx={[CENTER_TEXT, { color: "text.main" }]}>
                {"5 USDT added to your wallet"}
              </Typography>
            </Typography>
          </Box>
        );
      case "ONBOARDING_INTRO":
        return (
          <Box sx={{ ...STATUS_MODAL_WRAPPER_TYPE_1, paddingBottom: "0px" }}>
            <Typography variant="SemiBold_28_KYC" component={"h2"} sx={[CENTER_TEXT]}>
              {"Welcome to "}{" "}
              <Typography component={"span"} variant="SemiBold_28_KYC" sx={{ color: "text.main" }}>
                {"Density"}
              </Typography>
            </Typography>
            <Typography component={"p"} sx={[CENTER_TEXT, { color: "text.main" }]}>
              {"A platform for trading crypto derivatives!"}
            </Typography>
            <Typography component={"p"} variant="Regular_16" sx={{ maxWidth: "458px", color: "#A6A5A5" }}>
              {"Hi there! Unleash your full trading potential with our "}{" "}
              <Typography component={"span"} variant="Regular_16" sx={{ color: "" }}>
                {"lightning-fast order execution and real-time market data."}{" "}
              </Typography>{" "}
              {
                "Whether you're an experienced trader or just starting out, we're confident that you'll find everything you need to succeed on our platform. So, let's dive into the exciting world of crypto derivatives!"
              }
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%", height: "90px", overflow: "hidden" }} mb={0}>
              <img src={densityCoin} style={{ alignSelf: "center", marginTop: "70px" }} width={"102px"} alt="logo" />
              <img src={densityBackground} alt="logo" width={"152px"} />
            </Box>
          </Box>
        );
      case "ONBOARDING_FINAL":
        return (
          <Box sx={{ ...STATUS_MODAL_WRAPPER_TYPE_1, paddingBottom: "0px" }}>
            <Typography variant="SemiBold_28_KYC" component={"h2"} sx={[CENTER_TEXT]}>
              {"Happy Trading"}
            </Typography>
            <Typography component={"p"} sx={[CENTER_TEXT, { color: "text.main" }]}>
              {"You are ready now. Go and place your first trade!"}
            </Typography>
            <FormGroup>
              <FormControlLabel
                sx={{ cursor: "pointer" }}
                control={
                  <>
                    <Typography variant="Regular_16" component={"p"} sx={{ maxWidth: "458px", color: "text.mild" }}>
                      {"We hope that you are excited to start trading with us. Our team is committed to providing you with the best possible trading experience, so please don't hesitate to contact"}
                      <Typography component={"span"} sx={{ textDecorationLine: "underline", color: "" }}>
                        {"  Support"}
                      </Typography>{" "}
                      {"if you have any questions or feedback. Happy trading!"}
                    </Typography>
                    <Badge sx={{ display: "none" }}>
                      <Switch checked={isSupportChatVisible} onChange={(event) => toggleIsSupportChatVisible(event)} />
                    </Badge>
                  </>
                }
              />
            </FormGroup>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%", height: "90px", overflow: "hidden" }} mb={0}>
              <img src={densityCoin} style={{ alignSelf: "center", marginTop: "70px" }} width={"102px"} alt="logo" />
              <img src={densityBackground} alt="logo" width={"152px"} />
            </Box>
          </Box>
        );
      default:
        return <></>;
    }
  }
  return (
    <CustomModal
      IsOpen={IsOpen}
      close={close}
      isSecondaryAction={isSecondaryAction}
      secondaryAction={secondaryAction}
      primaryAction={primaryAction}
      isPrimaryAction={isPrimaryAction}
      primaryName={primaryName}
      secondaryName={secondaryName}
      isClose={isClose}
    >
      {getModalType(type)}
    </CustomModal>
  );
};

OnBoardingMoadal.propTypes = {
  IsOpen: PropTypes.bool,
  close: PropTypes.func,
  type: PropTypes.string,
  primaryName: PropTypes.string,
  secondaryName: PropTypes.string,
  isPrimaryAction: PropTypes.bool,
  isSecondaryAction: PropTypes.bool,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
  isSupportChatVisible: PropTypes.bool,
  toggleIsSupportChatVisible: PropTypes.func,
  isClose: PropTypes.bool
};
export default OnBoardingMoadal;
