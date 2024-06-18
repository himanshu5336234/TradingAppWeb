import React, { useState } from "react";
import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";
import TextView from "../TextView/TextView";

function CopyButton({ copyText, fontSize, additionalCopyHandler, sideText }) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleCopyEvent = () => {
    navigator.clipboard.writeText(copyText);
    setOpen(true);
    if (additionalCopyHandler) additionalCopyHandler();
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableTouchListener
          title="Copied"
        >
          <IconButton onClick={handleCopyEvent}>
            <ContentCopyIcon sx={{ fontSize: fontSize ?? "18px" }} />
          </IconButton>
          {sideText && (
            <TextView
              variant={"Bold_14"}
              onClick={handleCopyEvent}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                textDecorationThickness: "3px",
                textUnderlineOffset: "4px"
              }}
              text={sideText}
            ></TextView>
          )}
        </Tooltip>
      </ClickAwayListener>
    </>
  );
}

export default CopyButton;

CopyButton.propTypes = {
  copyText: PropTypes.string,
  fontSize: PropTypes.string,
  additionalCopyHandler: PropTypes.func
};
