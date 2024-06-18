import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PropTypes from "prop-types";

function MFinal({ Header, SubHeader, setSelectedWalletTab }) {
  return (
    <Box>
      <Box>
        <Box sx={{ gap: "5px", mb: 3, pt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CheckCircleRoundedIcon sx={{ fontSize: "65px", marginBottom: "4px", color: "#27BD67", marginLeft: "-5px" }} />
          <Box sx={{ textAlign: "center" }}>
            <Typography component={"h1"} variant={"SemiBold_20"}>
              {Header}
            </Typography>
            <Typography component={"p"} variant="Regular_14" sx={{ marginTop: 1 }}>
              {SubHeader}
            </Typography>
          </Box>
        </Box>
        <Grid container justifyContent={"center"} marginTop={"72px"}>
          <Box sx={{ width: "100%", borderTop: "1px dashed #595959" }}></Box>
          <Grid item xs={8} marginTop={2}>
            <Box>
              <Button fullWidth variant="primary" sx={{ textTransform: "none" }}>
                <Typography variant="SemiBold_16" onClick={() => setSelectedWalletTab("inrWallet")}>
                  View Transaction History
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default MFinal;

MFinal.propTypes = {
  Header: PropTypes.string,
  SubHeader: PropTypes.string,
  setSelectedWalletTab: PropTypes.func
};
