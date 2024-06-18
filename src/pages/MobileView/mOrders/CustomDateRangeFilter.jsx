import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
const CustomDateRangeFilter = (props) => {
  const { setSelectDateRange } = props;
  return (
    <Box sx={{ height: "100vh", animation: "3s linear 1s slidein" }}>
      <Grid container gap={"30px"}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ArrowBackIosIcon onClick={() => setSelectDateRange(false)}>back</ArrowBackIosIcon>
            <Typography variant="h5">Select Date Range</Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2 }}>
            <Box>
              <Typography sx={{ my: 1 }}>Select Date</Typography>
              <TextField fullWidth type={"Date"} />
            </Box>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1 }}>
                <RotateLeftIcon />
                <span>Reset</span>
              </Box>
              <TextField fullWidth type={"Date"} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
CustomDateRangeFilter.propTypes = {
  setSelectDateRange: PropTypes.func
};

export default CustomDateRangeFilter;
