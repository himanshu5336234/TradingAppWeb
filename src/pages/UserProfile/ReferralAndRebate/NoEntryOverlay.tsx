import { Grid, Typography } from "@mui/material";
import NoTableDataIcon from "@/assets/images/NoTableDataIcon.svg";
import React from "react";

interface NoEntryOverlayProps {
  message: string;
}

const NoEntryOverlay: React.FC<NoEntryOverlayProps> = ({ message }) => {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid item xs={12} container justifyContent={"center"} alignItems={"center"}>
        <img src={NoTableDataIcon} />
      </Grid>
      <Typography variant="Medium_14" color={"text.secondary"}>
        {message}
      </Typography>
    </Grid>
  );
};

export default NoEntryOverlay;
