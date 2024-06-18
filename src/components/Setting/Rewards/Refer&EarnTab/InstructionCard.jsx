import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { INSTRUCTION_CARD_STYLE, INSTRUCTION_CARD_TEXT_FLEX } from "@/pages/UserProfile/Rewards/styles";

const InstructionCard = ({ stepNo, stepVector, instruction }) => {
  return (
    <Box sx={INSTRUCTION_CARD_STYLE}>
      <Box sx={INSTRUCTION_CARD_TEXT_FLEX}>
        <Typography color={"text.main"} variant="SemiBold_18" component={"h4"}>
          {`Step ${stepNo}`}
        </Typography>
        <Typography variant="Medium_16">{instruction}</Typography>
      </Box>
      <Box paddingX={1}>
        <img src={stepVector} alt={stepNo} style={{ height: "110px" }} />
      </Box>
    </Box>
  );
};

export default InstructionCard;
InstructionCard.propTypes = {
  stepNo: PropTypes.number,
  stepVector: PropTypes.string,
  instruction: PropTypes.string
};
