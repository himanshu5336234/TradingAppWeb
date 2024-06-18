import React from "react";
import { Container, Typography } from "@mui/material";
import { Api_Notes_Wrapper } from "./styles";
function ApiNotes() {
  return (
    <>
      <Typography component={"h1"} variant={"SemiBold_28"} sx={{ pb: "28px" }}>
        Note for API
      </Typography>
      <Container sx={Api_Notes_Wrapper}>
        <Typography color={"text.main"} variant={"Regular_16"} component={"h2"}>
          • Morem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
        </Typography>
      </Container>
    </>
  );
}

export default ApiNotes;
