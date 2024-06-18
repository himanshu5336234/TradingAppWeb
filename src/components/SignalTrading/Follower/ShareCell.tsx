import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import ShareIcon from "../../../assets/images/ShareIcon.svg";
import PriceSummaryModal from "../Modals/PriceSummaryModal";
import PriceSummaryWithTPSLModal from "../Modals/PriceSummaryWithTPSL";
import ShareModal from "../Modals/ShareModal";
interface Data {
  signalData: object;
  roi?: number;
  remarks: string;
}
interface ShareCellProps {
  showShareIcon: boolean;
  gridSize: number;
  data: Data;
}

const ShareCell: React.FC<ShareCellProps> = ({ showShareIcon = false, gridSize, data }) => {
  const [showPriceSummaryModal, setShowPriceSummaryModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  return (
    <>
      <Grid item container xs={gridSize} alignItems="center" justifyContent="space-evenly">
        {showShareIcon && <img src={ShareIcon} width="24px" style={{ cursor: "pointer" }} onClick={() => setShowShareModal(true)} />}
        <Grid item xs={6}>
          <Typography
            variant={"Bold_14"}
            onClick={() => setShowPriceSummaryModal(true)}
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
              textDecorationThickness: "3px",
              textUnderlineOffset: "4px"
            }}
          >
            {"See Details"}
          </Typography>
        </Grid>
      </Grid>
      {showShareIcon && showPriceSummaryModal && (
        <PriceSummaryModal
          IsOpen={showPriceSummaryModal}
          setShowPriceSummaryModal={setShowPriceSummaryModal}
          data={data.signalData ? { ...data, ...data.signalData, remarks: data.remarks, roi: data.roi } : data}
        />
      )}
      {!showShareIcon && showPriceSummaryModal && (
        <PriceSummaryWithTPSLModal
          IsOpen={showPriceSummaryModal}
          setShowPriceSummaryModal={setShowPriceSummaryModal}
          data={data.signalData ? { ...data, ...data.signalData, remarks: data.remarks, roi: data.roi } : data}
        />
      )}
      {showShareModal && <ShareModal data={data.signalData ? { ...data, ...data.signalData } : data} IsOpen={showShareModal} setShowShareModal={setShowShareModal} />}
    </>
  );
};

export default ShareCell;
