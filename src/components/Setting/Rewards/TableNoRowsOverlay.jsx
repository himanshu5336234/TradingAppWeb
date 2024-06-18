import { Grid, Typography } from "@mui/material";
import NoTableDataIcon from "@/assets/images/NoTableDataIcon.svg";
import React from "react";
import PropTypes from "prop-types";

const TableNoRowsOverlay = ({ message }) => {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} mt={4}>
      <Grid item xs={12} container justifyContent={"center"} alignItems={"center"} my={2}>
        <img src={NoTableDataIcon} />
      </Grid>
      <Typography variant="Medium_14" color={"text.secondary"}>
        {message}
      </Typography>
    </Grid>
  );
};

export default TableNoRowsOverlay;
TableNoRowsOverlay.propTypes = {
  message: PropTypes.string
};
