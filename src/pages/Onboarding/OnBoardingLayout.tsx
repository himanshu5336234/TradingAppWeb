import { Box, Grid } from "@mui/material";
import React from "react";

import OnBoardingBanner from "@/assets/images/onboarding/Onboarding.svg";
import OnBoardingHeader from "./OnBoardingHeader";
type Props = { children: object };

const OnBoardingLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "flex-start",
        justifyContent: "space-between"
      }}
    >
      <Box sx={{ flex: 1, p: 3 }}>
        <Box sx={{ maxWidth: "540px", m: "auto" }}>
          <Grid gap={4} container>
            <Grid item xs={12}>
              <OnBoardingHeader value={1 * 10} />
            </Grid>
            <Grid item xs={12}>
              <>{children}</>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          flex: 1,
          width: "100%",
          height: "100%",
          backgroundPositionY: "center",
          backgroundImage: `url(${OnBoardingBanner})`,
          backgroundSize: "cover"
        }}
      />
    </Box>
  );
};

export default OnBoardingLayout;
