import React from "react";
import { Grid, Typography } from "@mui/material";

interface SeeDetailsCellProps {
  gridSize: number;
}

const SeeDetailsCell: React.FC<SeeDetailsCellProps> = ({ gridSize }) => {
  return (
    <Grid item container xs={gridSize} alignItems={"center"} gap={2}>
      <Grid item xs={6}>
        <Typography
          variant={"Bold_14"}
          color={"text.error"}
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            textDecorationThickness: "3px",
            textUnderlineOffset: "4px"
          }}
        >
          {"See Details"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SeeDetailsCell;
