import KycBackGround from "ASSETS/images/KycVerification/KYCBG.svg";
import ConnectionStatus from "@/components/ConnnectionStatus/ConnectionStatus";
import SideBar from "@/components/Home/SideBar/SideBar";
import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import OnboardingStepTopBar from "@/components/UserVerification/KycVerification/KycNudges/OnboardingStepTopBar";
import { useCheckLoginStatus } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";

const Home = () => {
  const { isLoggedIn } = useCheckLoginStatus();

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, height: "calc(97vh)" }}>
        {<SideBar />}
        <Box
          sx={{
            height: "100%",
            position: "relative",
            backgroundSize: "cover",
            backgroundImage: `url(${KycBackGround})`,
            overflow: "auto",
            width: "100%"
          }}
        >
          <>
            {isLoggedIn && <OnboardingStepTopBar />}
            <Outlet />
          </>
        </Box>
      </Box>
      <ConnectionStatus />
    </Box>
  );
};

export default Home;
