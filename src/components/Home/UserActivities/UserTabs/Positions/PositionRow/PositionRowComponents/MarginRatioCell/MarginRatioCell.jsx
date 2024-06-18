import React, { useState } from "react";
import PropTypes from "prop-types";
import CrossWalletMarginRatioDetails from "@/components/CustomModals/MarginRatioModal/CrossWalletMarginRatioDetails";
import MCrossWalletMarginRationDetails from "@/components/CustomModals/MarginRatioModal/MCrossWalletMarginRationDetails";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Eyeicon } from "@/assets/icons";
const MarginRatioCell = ({ symbol, setDecimalPrecision, isIsolated, isMobile }) => {
  const getIsolatedWallet = useSelector((state) => state.positionsDirectory?.isolatedWallet).find((item) => item?.sym === symbol);

  const [showCrossWalletMarginRationModal, setShowCrossWalletMarginRatioModal] = useState({
    isOpen: false,
    symbol: "",
    isIsolated: true
  });
  return (
    <>
      <Box id="positon-marginRatio-button">
        <Box
          component={"img"}
          id="positon-marginRatio-img"
          onClick={() =>
            setShowCrossWalletMarginRatioModal({
              isOpen: true,
              symbol,
              isIsolated,
              getIsolatedWallet: setDecimalPrecision(getIsolatedWallet?.isolatedWallet, 2)
            })
          }
          src={Eyeicon}
          sx={{ cursor: "pointer", width: "14px" }}
          alt={"logo"}
        />
      </Box>

      {showCrossWalletMarginRationModal.isOpen && !isMobile && (
        <CrossWalletMarginRatioDetails showCrossWalletMarginRationModal={showCrossWalletMarginRationModal} close={() => setShowCrossWalletMarginRatioModal({ isOpen: false })} />
      )}
      {showCrossWalletMarginRationModal.isOpen && isMobile && (
        <MCrossWalletMarginRationDetails showCrossWalletMarginRationModal={showCrossWalletMarginRationModal} close={() => setShowCrossWalletMarginRatioModal({ isOpen: false })} />
      )}
    </>
  );
};

MarginRatioCell.propTypes = {
  isIsolated: PropTypes.bool,
  symbol: PropTypes.string,
  isMobile: PropTypes.string,
  setDecimalPrecision: PropTypes.func
};

export default MarginRatioCell;
