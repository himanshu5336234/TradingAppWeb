import { Grid, Typography, Tooltip, IconButton } from "@mui/material";
import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface HeaderSectionCellProps {
  heading: string;
  value: string;
  gridSize: number;
  valueColor: string;
  showToolTip: boolean;
  toolTipTitle: string;
}

const HeaderSectionCell: React.FC<HeaderSectionCellProps> = ({ heading, value, gridSize, valueColor, showToolTip = false, toolTipTitle }) => {
  return (
    <Grid item container gap={2} xs={gridSize}>
      <Grid item xs={12}>
        <Typography color={"text.secondary"} variant={"Regular_12"}>
          {heading}
        </Typography>
        {showToolTip && (
          <Tooltip placement="top" title={toolTipTitle}>
            <IconButton sx={{ color: "grey" }}>
              <InfoOutlinedIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography color={valueColor} variant={"Reular_16"}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HeaderSectionCell;
