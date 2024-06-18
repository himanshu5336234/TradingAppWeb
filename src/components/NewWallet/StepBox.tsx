import TextView from "@/components/UI/TextView/TextView";
import { Box } from "@mui/material";
import React from "react";

interface ComponentProps {
  title: string;
  stepNumber: number;
  description: string;
  icon: string;
}

const StepBox: React.FC<ComponentProps> = ({ title, description, icon, stepNumber }) => {
  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: "260px",
        border: `0.2px solid #667D00`,
        borderRadius: "4px",
        background: `linear-gradient(185deg, rgba(226, 255, 111, 0.12) -53.88%, rgba(54, 208, 104, 0.00) 165.2%)`
      }}
    >
      <Box px={2} py={0.5} sx={{ backgroundColor: "#C0DF5A" }}>
        <TextView variant={"Bold_12"} color={"#000"} text={`STEP ${stepNumber}`}></TextView>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >
        <img src={icon} width={"24px"} />
        <TextView variant={"Medium_16"} color={"text.main"} text={title}></TextView>
      </Box>

      <TextView component={"p"} style={{ textAlign: "center", px: 4 }} variant="Regular_14" text={description}></TextView>
    </Box>
  );
};

export default StepBox;
