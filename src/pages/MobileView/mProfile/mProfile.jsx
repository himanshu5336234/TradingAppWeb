import { Grid, Box, Tab, Tabs } from "@mui/material";
import React, { useMemo, useState } from "react";
import { FONT14 } from "@/pages/MobileView/style";
import PropTypes from "prop-types";
import UserVerification from "@/pages/UserVerification/UserVerification";
import PersonalDetails from "@/pages/UserProfile/PersonalDetails/PersonalDetails";
const MProfile = () => {
  const [currentView, setCurrentView] = useState(0);
  const TABSINDEX = useMemo(() => currentView, [currentView]);

  const ToggleView = () => {
    switch (TABSINDEX) {
      case 1:
        return <UserVerification index={TABSINDEX} />;
      default:
        return <PersonalDetails />;
    }
  };

  ToggleView.propTypes = {
    current: PropTypes.number
  };
  const handleChange2 = (e) => {
    const attributeValue = e.target.attributes.order.nodeValue;
    e.stopPropagation();
    setCurrentView(Number(attributeValue));
  };
  return (
    <>
      <Box sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Tabs
            selectionFollowsFocus
            textColor="text.ultramild"
            value={currentView}
            variant="scrollable"
            scrollButtons={false}
            aria-label="Tabs where each tab needs to be selected manually"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              overflow: "auto !important"
            }}
            onChange={(e) => handleChange2(e)}
          >
            <Tab sx={FONT14} label="Profile" order={0} />
            <Tab sx={FONT14} label="User Verification" order={1} />
          </Tabs>
        </Grid>
        <Box sx={{ mt: 4 }}>{ToggleView()}</Box>
      </Box>
    </>
  );
};
export default MProfile;
