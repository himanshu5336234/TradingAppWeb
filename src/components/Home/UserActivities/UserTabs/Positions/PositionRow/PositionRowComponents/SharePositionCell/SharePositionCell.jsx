import React, { useState } from "react";
import PropTypes from "prop-types";
import ShareIcon from "@/assets/images/ShareIconEnabled.svg";
import SharePositionModal from "@/components/CustomModals/sharePosition/SharePosition";
import SharePositionDrawer from "@/components/CustomModals/sharePosition/SharePositionDrawer";
import { Box } from "@mui/material";
const SharePositionCell = ({ symbolPricePrecision, isMobile, symbol, marginType, entryPrice, leverage, side }) => {
  const [showSharePositionModal, setShowSharePositionModal] = useState({
    isVisible: false,
    symbol: ""
  });
  return (
    <>
      <Box
        src={ShareIcon}
        component={"img"}
        id="position-share-button"
        onClick={() => {
          setShowSharePositionModal({
            isVisible: true
          });
        }}
        sx={{
          height: "100%",
          mt: 1,
          cursor: "pointer",
          mx: "auto"
        }}
      />
      {!isMobile && (
        <SharePositionModal
          symbolPricePrecision={symbolPricePrecision}
          isOpen={showSharePositionModal.isVisible}
          close={() =>
            setShowSharePositionModal({
              isVisible: false
            })
          }
          symbol={symbol}
          marginType={marginType}
          entryPrice={entryPrice}
          leverage={leverage}
          side={side}
        />
      )}
      {isMobile && (
        <SharePositionDrawer
          symbolPricePrecision={symbolPricePrecision}
          isOpen={showSharePositionModal.isVisible}
          close={() =>
            setShowSharePositionModal({
              isVisible: false
            })
          }
          symbol={symbol}
          marginType={marginType}
          entryPrice={entryPrice}
          leverage={leverage}
          side={side}
        />
      )}
    </>
  );
};

SharePositionCell.propTypes = {
  symbol: PropTypes.string,
  isMobile: PropTypes.bool,
  symbolPricePrecision: PropTypes.number,
  marginType: PropTypes.string,
  entryPrice: PropTypes.number,
  leverage: PropTypes.number,
  side: PropTypes.string
};

export default SharePositionCell;
