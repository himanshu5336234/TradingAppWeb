import { Box, Grid, ListItemText, Typography } from "@mui/material";
import React from "react";
import { fav } from "./sidemenuobject";
import { MENU_CONSTANTS } from "./style";
import PropTypes from "prop-types";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextView from "../../UI/TextView/TextView";
const SidemenuFilters = ({ handleSort }) => {
  return (
    <>
      <Grid container px={1} justifyContent={"space-between"}>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={5}>
          <ListItemText component={"p"} sx={{ textAlign: "start" }} primary={MENU_CONSTANTS.MARKET_NAME} primaryTypographyProps={fav} />
        </Grid>
        <Grid item xs={3.5}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextView component={"p"} text={MENU_CONSTANTS.PRICE} variant={"Medium_11"} color={"text.regular"} />

            <Typography
              component="div"
              sx={{
                marginLeft: "0px",
                marginRight: "-2px",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer"
              }}
              mx={5}
            >
              <ExpandLessIcon
                onClick={() => handleSort("lp")}
                sx={{
                  "&:hover": {
                    backgroundColor: "#50535e"
                  },
                  width: "20px",
                  height: "13px",
                  margin: "1px"
                }}
              />
              <ExpandMoreIcon
                onClick={() => handleSort("LP")}
                sx={{
                  "&:hover": {
                    backgroundColor: "#50535e"
                  },
                  width: "20px",
                  height: "13px",
                  margin: "1px"
                }}
              />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2.5}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <TextView text={MENU_CONSTANTS.HR24} variant={"Medium_11"} color={"text.regular"} />
            <Typography
              component="div"
              sx={{
                marginLeft: "0px",
                marginRight: "-2px",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer"
              }}
              mx={5}
            >
              <ExpandLessIcon
                onClick={() => handleSort("percentage")}
                sx={{
                  "&:hover": {
                    backgroundColor: "#50535e"
                  },
                  width: "20px",
                  height: "13px",
                  margin: "1px"
                }}
              />
              <ExpandMoreIcon
                onClick={() => handleSort("PERCENTAGE")}
                sx={{
                  "&:hover": {
                    backgroundColor: "#50535e"
                  },
                  width: "20px",
                  height: "13px",
                  margin: "1px"
                }}
              />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
SidemenuFilters.propTypes = {
  handleSort: PropTypes.func
};

export default SidemenuFilters;
