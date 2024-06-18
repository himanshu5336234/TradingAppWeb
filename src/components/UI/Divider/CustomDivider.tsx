import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";
const linerDividerHorizontal = {
  color: "#808090",
  background: "linear-gradient(90deg, rgba(128, 128, 144, 0.2) 0%, #808090 52.08%, rgba(128, 128, 144, 0.2) 100%)",
  width: "100%",
  height: "0.6px"
};
const linerDividerVertical = {
  color: "#808090",
  background: "linear-gradient(0deg,rgba(128, 128, 144, 0.2), rgba(128, 128, 144, 1), rgba(128, 128, 144, 0.2))",
  width: "0.6px"
};
const CustomDivider = ({ alignment }: { alignment: string }) => <Box sx={alignment === "vertical" ? linerDividerVertical : linerDividerHorizontal}></Box>;

CustomDivider.propTypes = {
  alignment: PropTypes.string
};
export default CustomDivider;
