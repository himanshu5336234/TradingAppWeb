import React from "react";
import { Box, Grid, Tooltip } from "@mui/material";

// import { SymbolPrecisionHelper } from "@/helpers";
import PropTypes from "prop-types";
import TextView from "../UI/TextView/TextView";
import { numberWithCommas } from "@/helpers/commaHelper";

interface BannerFormatProps {
  image: string;
  dataDetails: any;
  child: any;
  child2: any;
}
interface Upto2DecimalFunction {
  (para: number | string): number;
}
export const BannerFormat = ({ image, dataDetails, child, child2 }: BannerFormatProps) => {
  const size = Object.keys(dataDetails).length;

  const Upto2Decimal: Upto2DecimalFunction = (para) => {
    let num = Number(para);
    num = Math.floor(num * 100) / 100;
    return num;
  };

  return (
    <Grid container item display={"flex"} flexDirection={"column"} sx={{ height: "auto" }}>
      <Grid
        container
        justifyContent={"space-between"}
        item
        alignItems={"center"}
        xs={12}
        sx={{
          px: "32px",
          py: "24px",
          backgroundColor: "background.primary",
          borderRadius: "8px 8px 0px 0px"
        }}
      >
        <Grid xs={7} item sx={{}}>
          {child}
        </Grid>
        {child2 && (
          <Grid item mt={15}>
            {child2}
          </Grid>
        )}
        <Grid item>
          <Box component={"img"} src={image} />
        </Grid>
      </Grid>

      <Grid item container gridTemplateColumns={`repeat(${size}, 1fr)`} xs={12}>
        {Object.entries(dataDetails).map(([key, value]: [string, any], ind: number) => (
          <Grid
            key={key}
            item
            py={"24px"}
            xs={12 / Object.entries(dataDetails).length}
            sx={{
              border: "1px solid",
              borderColor: "#383840",
              borderRadius: ind === 0 ? "0px 0px 0px 8px" : ind === Object.entries(dataDetails)?.length - 1 ? "0px 0px 8px 0px" : "0px 0px 0px 0px",
              paddingLeft: "20px"
            }}
          >
            {value[2] ? (
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      color: "#ffff",
                      fontSize: "11px",
                      backgroundColor: "background.tertiary",
                      fontWeight: 600
                    }
                  }
                }}
                arrow
                placement="top"
                title={<TextView text={value[2]} />}
              >
                {" "}
                <TextView text={value[0]} variant="Medium_12" color={"text.secondary"} component={"h6"} />
              </Tooltip>
            ) : (
              <TextView component={"span"} variant={"Medium_12"} text={value[0]} color={"#808090"} />
            )}

            <TextView
              text={isNaN(value[1]) ? value[1] : value[0] === "Phone Number" ? value[1] : numberWithCommas(Upto2Decimal(value[1]))}
              variant={"Medium_12"}
              component={"div"}
              color={"white"}
              style={{ marginTop: "5px" }}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default BannerFormat;
BannerFormat.proptypes = {
  dataDetails: PropTypes.object,
  image: PropTypes.string,
  child: PropTypes.node
};
