/* eslint-disable multiline-ternary */
import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

import CopyButton from "../CopyButton/CopyButton";

const LabelInfo = ({ label, value, isCopiedToClipboard }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      gap: 1,
      mt: "0.3rem"
    }}
  >
    <Typography variant="body2">{label}</Typography>
    {isCopiedToClipboard ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1
        }}
      >
        <Typography color={[value > 0 ? "text.success" : "text.error"]} sx={{ textAlign: "right" }} variant="body2">
          {value}
        </Typography>
        <CopyButton copyText={value}></CopyButton>
      </Box>
    ) : (
      <Typography color={[value > 0 ? "text.success" : "text.error"]} sx={{ textAlign: "right" }} variant="body2">
        {value}
      </Typography>
    )}
  </Box>
);

LabelInfo.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  isCopiedToClipboard: PropTypes.bool
};

export default LabelInfo;
