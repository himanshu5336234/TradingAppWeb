import React from "react";

import PropTypes from "prop-types";
// import { Box, Button, Typography } from "@mui/material";
import Lottie from "react-lottie";
import PrimaryLoader from "@/assets/images/Loaders/LoaderButtons/ButtonLoader.json";
import { Box, Button, Typography } from "@mui/material";

const defaultOptions = {
  animationData: PrimaryLoader,
  autoplay: true,
  loop: true
};
const CustomButton = ({ id, label, variant, onClick, type, style, isDisabled, isloading, loadingTextDisable, textVariant, fullWidth }) => {
  return (
    <Button id={id} variant={variant ?? "primary"} onClick={onClick} type={type ?? "submit"} sx={[{ width: "100%", p: 1.3 }, { ...style }]} width={"100%"} disabled={isDisabled} fullWidth={fullWidth}>
      {isloading === true ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Lottie autoplay={true} options={defaultOptions} height={20} width={15} />
          {!loadingTextDisable && <Typography variant={textVariant ?? "SemiBold_12"}>{"Please wait ..."}</Typography>}
        </Box>
      ) : (
        <Typography variant={textVariant ?? "SemiBold_12"}>{label ?? "Confirm"}</Typography>
      )}
    </Button>
  );
};

CustomButton.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  isloading: PropTypes.bool,
  style: PropTypes.object,
  loadingTextDisable: PropTypes.bool,
  textVariant: PropTypes.string,
  fullWidth: PropTypes.bool
};

export default CustomButton;
