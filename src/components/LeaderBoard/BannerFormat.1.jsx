import React from "react";
import { Box, Grid, Typography, Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// import { SymbolPrecisionHelper } from "@/src/helpers/PrecisionHelper";
import { SymbolPrecisionHelper } from "@/helpers";

export const BannerFormat = ({ image, dataDetails, child }) => {
  const { setDecimalPrecision } = SymbolPrecisionHelper({ symbol: "" });
  const size = Object.keys(dataDetails).length;
  return (
    <Grid container item display={"flex"} flexDirection={"column"}>
      <Grid
        container
        justifyContent={"space-between"}
        item
        xs={12}
        sx={{
          px: "32px",
          py: "24px",
          backgroundColor: "background.primary",
          borderRadius: "8px 8px 0px 0px"
        }}
      >
        <Grid xs={7} item>
          {child}
        </Grid>
        <Grid item>
          <Box component={"img"} src={image} />
        </Grid>
      </Grid>

      <Grid item display={"grid"} gridTemplateColumns={`repeat(${size}, 1fr)`} xs={12}>
        {Object.entries(dataDetails).map(([key, value], ind) => (
          <Grid
            key={key}
            item
            container
            display="flex"
            ß
            flexDirection="column"
            py={"24px"}
            sx={{
              border: "1px solid",
              borderColor: "#383840",
              borderRadius: ind === 0 ? "0px 0px 0px 8px" : ind === Object.entries(dataDetails)?.length - 1 ? "0px 0px 8px 0px" : "0px 0px 0px 0px",
              paddingLeft: "20px"
            }}
          >
            <Typography variant={"Medium_12"} color={"#808090"}>
              {value[0]}
              {value[2] && (
                <Tooltip placement="top" title={value[2]}>
                  <IconButton sx={{ color: "grey" }}>
                    <InfoOutlinedIcon sx={{ fontSize: "16px" }} />
                  </IconButton>
                </Tooltip>
              )}
            </Typography>
            <Typography variant={"Medium_12"} color={"white"} sx={{ marginTop: "5px" }}>
              {isNaN(value[1]) ? value[1] : value[0] === "Phone Number" ? value[1] : setDecimalPrecision(value[1])}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
