/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/SwipeableDrawer";

import { Box, Typography } from "@mui/material";
import OrderFormWrapper from "@/components/Home/OrderForm/OrderFormWrapper";
const MobileOrderForm = ({ isOpen, close, side }) => {
  return (
    <>
      {" "}
      <Box>
        <Drawer
          anchor="right"
          onOpen={false}
          sx={{
            "&::-webkit-scrollbar": {
              width: "0.4em"
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)"
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              outline: "1px solid slategrey"
            },
            "& .MuiPaper-root": {
              backgroundColor: "background.primary",
              boxShadow: " 6px 8px 8px 0px #0000008F",
              top: 0,
              backgroundImage: "none",

              width: "320px"
            }
          }}
          open={isOpen ?? false}
          onClose={close}
        >
          <Typography onClick={close} px={1} sx={{ fontSize: "32px", cursor: "pointer" }} component={"p"}>
            &#8592;
          </Typography>
          <OrderFormWrapper Side={side} isMobile={true} />
        </Drawer>
      </Box>
    </>
  );
};

MobileOrderForm.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  side: PropTypes.string,
  isMobile: PropTypes.bool
};
export default MobileOrderForm;
