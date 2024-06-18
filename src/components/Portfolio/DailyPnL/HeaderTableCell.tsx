import TextView from "@/components/UI/TextView/TextView";
import { Box, Tooltip } from "@mui/material";
import React, { useState } from "react";

const HeaderTableCell = ({ Header, tooltipText, enableTooltip }: { Header: string; tooltipText: string; enableTooltip: boolean }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      {enableTooltip ? (
        <Tooltip
          placement="top"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          title={tooltipText}
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                color: "text.quaternary",
                fontSize: "11px",
                backgroundColor: "background.tertiary",
                fontWeight: 600,
                p: "8px",
                maxWidth: 180
              }
            }
          }}
        >
          <></>
          <TextView style={{ py: 0.5 }} variant="Bold_11" textAlign="center" text={Header} component={"p"} color={open ? "text.highlight" : "text.regular"} />
        </Tooltip>
      ) : (
        <TextView style={{ py: 0.5 }} variant="Bold_11" text={Header} component={"p"} color={"text.regular"} />
      )}
    </>
  );
};

export default HeaderTableCell;
