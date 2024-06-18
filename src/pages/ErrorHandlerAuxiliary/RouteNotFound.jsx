import TextView from "@/components/UI/TextView/TextView";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Logo } from "@/components/UI/Logo";

const RouteNotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      p={"1rem"}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Box>
        <TextView
          onClick={() => {
            navigate("/");
          }}
          style={{ fontSize: "32px", cursor: "pointer", marginBottom: "10px" }}
          component={"span"}
          text="&#8592;"
        />

        <TextView variant={"Medium_18"} component={"p"} text={"To continue browsing,"} />
        <TextView variant={"Medium_18"} component={"p"} text={"use density app"} />

        <Logo withName={true} style={{ maxWidth: "300px", width: "100%" }} />
      </Box>
      <Button onClick={() => window.open("https://url.density.exchange/mWebRedirect")} variant={"primary"}>
        Open App
      </Button>
    </Box>
  );
};
export default RouteNotFound;
