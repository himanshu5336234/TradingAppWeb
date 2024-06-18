import React from "react";
import { Box, Typography } from "@mui/material";
import MyEarningImage from "../../../assets/images/MyEarningImage.svg";
import { EARNING_BOX_CONTAINER } from "./Follower.Styles";

interface MyEarningBoxProps {
  ROI: number;
}

const MyEarningBox: React.FC<MyEarningBoxProps> = ({ ROI }) => {
  return (
    <Box sx={EARNING_BOX_CONTAINER}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography variant="Regular_14" mb={2}>
          {"ROI"}
        </Typography>
        <Typography variant="Bold_32" color={ROI > 0 ? "text.success" : ROI < 0 ? "#FF6554" : "#FFF"}>
          {ROI} {"%"}
        </Typography>
      </Box>

      <img src={MyEarningImage} alt="My Earning" />
    </Box>
  );
};

export default MyEarningBox;
