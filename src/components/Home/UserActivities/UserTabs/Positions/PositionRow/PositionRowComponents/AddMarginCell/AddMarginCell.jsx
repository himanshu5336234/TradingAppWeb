import React, { useState } from "react";
import PropTypes from "prop-types";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddMarginModal from "@/components/CustomModals/AddMarginModal/AddMarginModal";
import { Box } from "@mui/material";
import AddMarginModalm from "@/components/CustomModals/AddMarginModal/addMarginModelm";

const AddMarginCell = ({ symbol, isMobile }) => {
  const [showAddMarginModal, setShowAddMarginModal] = useState({
    isVisible: false,
    symbol: ""
  });
  return (
    <>
      <Box id="position-addMargin-Parent" sx={{ cursor: "pointer" }} onClick={() => setShowAddMarginModal({ isVisible: true, symbol })}>
        <ControlPointIcon id="position-addMargin-button" sx={{ fontSize: "15px" }} />
      </Box>
      {showAddMarginModal.isVisible && !isMobile && (
        <AddMarginModal isOpen={showAddMarginModal.isVisible} close={() => setShowAddMarginModal({ isVisible: false })} symbol={showAddMarginModal?.symbol} />
      )}
      {showAddMarginModal.isVisible && isMobile && (
        <AddMarginModalm isOpen={showAddMarginModal.isVisible} close={() => setShowAddMarginModal({ isVisible: false })} symbol={showAddMarginModal?.symbol} />
      )}
    </>
  );
};

AddMarginCell.propTypes = {
  symbol: PropTypes.string,
  isMobile: PropTypes.bool
};

export default AddMarginCell;
