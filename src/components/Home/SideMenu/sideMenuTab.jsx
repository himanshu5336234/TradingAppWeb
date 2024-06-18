import { Box } from "@mui/material";
import React from "react";

import PropTypes from "prop-types";
import ToggleGroup from "../../UI/ToggleGroup/ToggleGroup";

const SideMenuTab = ({ tabText, handleTabsChange }) => {
  return (
    <Box sx={{ my: 2, mb: 3 }}>
      <ToggleGroup
        value={tabText}
        handleChange={handleTabsChange}
        values={[
          { name: "All", value: "ALL" },
          { name: "Favourites", value: "Favourites" }
        ]}
        exclusive
      />
    </Box>
  );
};
SideMenuTab.propTypes = {
  tabText: PropTypes.string,
  handleTabsChange: PropTypes.func
};

export default SideMenuTab;
