import { Box, Grid, InputAdornment, Typography, Tooltip } from "@mui/material";
import Hidden from "@mui/material/Hidden";
import RefreshIcon from "@mui/icons-material/Refresh";
import React from "react";
import DurationSelect from "../UI/DurationSelect";
import Search from "@mui/icons-material/Search";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";

import { REFRESHICONSTYLE } from "@/pages/LeaderBoard/styles";
import BasicSearchFields from "../UI/CustomInput/BasicSearchFields";
import PropTypes from "prop-types";
const LeaderBoardActions = ({ duration, changeDuration, refreshScreen, handleClearSearch, handleSearch, filterOptions, searchName }) => {
  return (
    <Grid
      // backgroundColor={"background.primary"}
      container
      justifyContent={"space-between"}
      p={1}
      sx={{ marginTop: "88px" }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Grid xs={16} sm={16} md={16} display={"flex"} justifyContent={"space-between"} flexDirection={"row"}>
        <Typography variant={"Medium_24"}>Leaderboard</Typography>
        <Grid item xs={6} sm={4} md={2.5} lg={2.5}>
          <Box sx={{ borderRadius: "8px" }}>
            <BasicSearchFields
              styles={{
                ".MuiInputBase-input": {
                  padding: "2px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontFamily: "Neurial Grotesk",
                  fontWeight: "400"
                  //  width:"100px"
                }
              }}
              fullWidth
              variant="outlined"
              value={searchName}
              type="search"
              onChange={(event) => handleSearch(event.target.value)}
              size="small"
              InputProps={{
                className: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "white" }} />
                  </InputAdornment>
                )
              }}
              placeholder="Search Nickname"
              name="search"
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={7} sm={7} md={16} sx={{ marginTop: "36px", marginBottom: "40px" }}>
        <Hidden smUp>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", backgroundColor: "background.secondary", borderRadius: "4px", paddingRight: "10px", py: "5px" }}>
            <Box>
              <DurationSelect options={filterOptions} value={duration} setValue={(value) => changeDuration(value)} />
            </Box>
            <Tooltip title="refresh" placement="top">
              <RefreshIcon onClick={() => refreshScreen()} sx={REFRESHICONSTYLE} />
            </Tooltip>
          </Box>
        </Hidden>
        <Hidden smDown>
          <ToggleGroup
            value={duration}
            // variant={"chip"}
            styles={{ borderRadius: "4px" }}
            handleChange={(event, value) => {
              if (value !== null) {
                changeDuration(value);
              } else {
                changeDuration("day");
              }
            }}
            values={[
              {
                name: "1D",
                value: "day"
              },
              { name: "1W", value: "week" },
              { name: "1M", value: "month" },
              { name: `Daily Competition`, value: "DailyComp" },
              { name: "Live Competition", value: "Futures" }
            ]}
          />
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default LeaderBoardActions;

LeaderBoardActions.propTypes = {
  duration: PropTypes.string,
  changeDuration: PropTypes.func,
  searchName: PropTypes.string,
  handleSearch: PropTypes.func,
  handleClearSearch: PropTypes.func,
  filterOptions: PropTypes.array,
  refreshScreen: PropTypes.func
};
