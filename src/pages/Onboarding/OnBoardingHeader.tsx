import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import { Box } from "@mui/system";
import React from "react";
import { Logo } from "@/components/UI/Logo";
const OnBoardingHeader = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Logo withName={true} />
      {/* <Box sx={{ width: "71px" }}>
        <LinearProgress color="success" variant="determinate" {...props} />
      </Box> */}
    </Box>
  );
};

export default OnBoardingHeader;
