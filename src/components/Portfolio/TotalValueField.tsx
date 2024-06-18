import { Box, Tooltip } from "@mui/material";
import React, { useState } from "react";
import TextView from "../UI/TextView/TextView";

const TotalValueField = ({ totalName, totalValue, color, tooltipText }: { totalName: string; totalValue: string; color: string; tooltipText: string }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Box gap={1}>
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
              maxWidth: 160
            }
          }
        }}
      >
        <TextView variant="Medium_14" text={totalName} component={"p"} color={open ? "text.highlight" : "neutral.white"} />

        <TextView variant="Medium_28" text={totalValue} component={"p"} color={color} />
      </Tooltip>
    </Box>
  );
};

export default TotalValueField;
