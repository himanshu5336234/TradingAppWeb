import React, { useState } from "react";
import CustomModal from "./CustomModal";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const RiskWarningModal = ({ IsOpen, primaryAction, primaryName, isPrimaryAction }) => {
  const [isReadMore, setisReadMore] = useState(false);

  const content = () => {
    return !isReadMore ? (
      <>
        <Typography variant="Medium_14">
          The cryptocurrency futures market is associated with substantial risks and may lead to notable price swings. These fluctuations can occur quickly and unexpectedly. It is important to note
          that prior performance is not necessarily indicative of future outcomes.
        </Typography>
        <br />
        <Typography variant="Medium_14">
          Additionally, it is crucial to be aware that in the event of significant price fluctuations, there is a possibility of liquidating all your margin funds...
        </Typography>
      </>
    ) : (
      <>
        <Typography variant="Medium_14">
          The cryptocurrency futures market is associated with substantial risks and may lead to notable price swings. These fluctuations can occur quickly and unexpectedly. It is important to note
          that prior performance is not necessarily indicative of future outcomes.
        </Typography>
        <br />
        <Typography variant="Medium_14">
          Additionally, it is crucial to be aware that in the event of significant price fluctuations, there is a possibility of liquidating all your margin funds. Therefore, we strongly recommend
          that you thoroughly evaluate your investment goals, level of familiarity with the market, and risk tolerance before engaging in cryptocurrency futures trading.
        </Typography>
      </>
    );
  };
  return (
    <CustomModal IsOpen={IsOpen} primaryAction={primaryAction} isPrimaryAction={true} primaryName={"I Understand"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: " flex-start",
          gap: "10px"
        }}
      >
        <ReportProblemIcon sx={{ color: "#FF6554", fontSize: "34px" }}></ReportProblemIcon>
        <Typography component={"h1"} variant="SemiBold_28">
          {"Attention !"}
        </Typography>
      </Box>
      <Box
        sx={{
          px: "30px",
          boxShadow: "0 -20px 10px -20px rgba(0,0,0,0.45) inset;",
          py: "10px",
          my: "10px",
          height: "200px",
          width: "540px",

          m: "20px auto",
          overflowY: "scroll"
        }}
      >
        {content()}
        {!isReadMore && (
          <Typography
            variant="Medium_14"
            style={{
              margin: "0px 5px",

              color: "#E2FF6F",
              cursor: "pointer"
            }}
            onClick={() => setisReadMore(true)}
          >
            Read more
          </Typography>
        )}
      </Box>
    </CustomModal>
  );
};

RiskWarningModal.propTypes = {
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
export default RiskWarningModal;
