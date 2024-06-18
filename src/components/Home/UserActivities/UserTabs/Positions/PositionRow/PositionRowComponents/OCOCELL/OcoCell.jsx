import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { SymbolPrecisionHelper } from "@/helpers";
import NewOCOModal from "@/components/CustomModals/OCOModals/OCO-New-Modals";
import { useSelector } from "react-redux";
const OcoCell = ({ isMobile, symbol, leverage, entryPrice, side, sizeInContractAsset, quantityValue, isIsolated }) => {
  const [showOCOModal, setShowOCOModal] = useState(false);
  const { setDecimalPrecision } = SymbolPrecisionHelper({ symbol });
  const isolatedWallet = useSelector((state) => state.positionsDirectory.isolatedWallet.find((data) => data.sym === symbol));
  useEffect(() => {
    if (showOCOModal === true) {
      if (typeof window !== "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showOCOModal]);
  return (
    <>
      <Box
        id="position-tp-sl-button"
        sx={{ textAlign: "center" }}
        onClick={() => {
          setShowOCOModal(true);
        }}
      >
        <Typography
          variant="Bold_12"
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            textDecorationThickness: "3px"
          }}
        >
          {"TP/SL"}
        </Typography>
      </Box>

      {showOCOModal && !isMobile && (
        <NewOCOModal
          IsOpen={showOCOModal}
          setShowOCOModal={setShowOCOModal}
          symbol={symbol}
          leverage={leverage}
          entryPrice={entryPrice}
          side={side}
          type={0}
          sizeInContractAsset={sizeInContractAsset}
          isIsolated={isIsolated}
          // liqPrice={showOCOModal.props?.liqPrice}
          quantityValue={quantityValue}
          isolatedWallet={isolatedWallet}
          // strategyOrders={strategyOrders}
          setDecimalPrecision={setDecimalPrecision}
          // setStrategyOrders={setStrategyOrders}
        />
      )}
    </>
  );
};

OcoCell.propTypes = {
  symbol: PropTypes.string,
  leverage: PropTypes.number,
  entryPrice: PropTypes.number,
  side: PropTypes.string,
  sizeInContractAsset: PropTypes.number,
  quantityValue: PropTypes.number,
  isIsolated: PropTypes.bool,
  isMobile: PropTypes.bool
};

export default OcoCell;
