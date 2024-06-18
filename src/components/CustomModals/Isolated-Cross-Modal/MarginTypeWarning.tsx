import { Box, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import React from "react";
const MarginTypeWarning = ({ symbol, isMobile }: { symbol: string; isMobile: boolean }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: isMobile ? "center" : "flex-start",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          justifyContent: "center",
          gap: isMobile ? "10px" : "30px",
          pb: isMobile ? 1 : 3
        }}
      >
        <Box sx={{ width: "10%" }}>
          <ReportProblemIcon sx={{ fontSize: "55px", color: "#ECA233", mr: "10px", mt: 0.5 }} />
        </Box>
        <Box sx={{ width: isMobile ? "100%" : "70%", display: "flex", flexDirection: "column", gap: "12px", alignItems: isMobile ? "center" : "flex-start" }}>
          <Typography variant={isMobile ? "SemiBold_16" : "SemiBold_24"} component={"p"}>
            {"Margin Mode Cannot Be Changed"}
          </Typography>
          <Typography variant={isMobile ? "Regular_12" : "Regular_16"} component={"p"} color="text.mild" textAlign={isMobile ? "center" : "flex-start"}>
            {`Margin mode cannot be changed if there are open position or open orders. Please close the existing position or orders of`}
            <Typography variant={isMobile ? "Regular_12" : "Regular_16"} component={"span"} color="text.main">
              &nbsp;{symbol.toUpperCase()}&nbsp;
            </Typography>
            {"to change the margin mode"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MarginTypeWarning;
