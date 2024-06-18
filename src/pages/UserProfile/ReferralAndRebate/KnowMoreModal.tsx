import CustomModal from "@/components/CustomModals/newModal/CustomModal";

import { Box } from "@mui/material";

import TextView from "@/components/UI/TextView/TextView";
import PropTypes from "prop-types";
import React from "react";
interface KnowMoreModalProps {
  isOpen: boolean;
  setShowKnowMoreModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const KnowMoreModal: React.FC<KnowMoreModalProps> = ({ isOpen, setShowKnowMoreModal }) => {
  return (
    <CustomModal IsOpen={isOpen} isClose={true} close={() => setShowKnowMoreModal(false)} isPrimaryAction={true} primaryName="Okay, Got it" primaryAction={() => setShowKnowMoreModal(false)}>
      <>
        <TextView variant={"Regular_16"} text={"How does it work?"} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1rem",
            justifyContent: "space-evenly",
            height: "140px"
          }}
        >
          <Box
            p={"1.25rem 0.5rem 1.25rem 0.5rem"}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "background.secondary",
              borderRadius: "4px",
              marginRight: "1rem",
              maxWidth: "9rem"
            }}
          >
            <TextView variant={"Regular_14"} text={"Upto 20%"} style={{ marginBottom: "12px" }} />
            <TextView variant={"Medium_12"} color={"text.quaternary"} text={"Flat rebate of upto 20% on your trading fees"} />
          </Box>
          <Box
            p={"1.25rem 0.5rem 1.25rem 0.5rem"}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "background.secondary",
              borderRadius: "4px",
              marginRight: "1rem",
              maxWidth: "9rem"
            }}
          >
            <TextView style={{ marginBottom: "12px" }} variant={"Regular_14"} text={"Easy tracking"} />
            <TextView variant={"Medium_12"} color={"text.quaternary"} text={"Keep track of your earnings on a daily, weekly and a monthly basis"} />
          </Box>
          <Box
            p={"1.25rem 0.5rem 1.25rem 0.5rem"}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "background.secondary",
              borderRadius: "4px",
              marginRight: "1rem",
              maxWidth: "9rem"
            }}
          >
            <TextView variant={"Regular_14"} text={"Daily Rebate Credits"} style={{ marginBottom: "12px" }} />
            <TextView variant={"Medium_12"} color={"text.quaternary"} text={"Rebate will be credited to your wallet on a daily basis"} />
          </Box>
          <Box
            p={"1.25rem 0.5rem 1.25rem 0.5rem"}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "background.secondary",
              maxWidth: "9rem"
            }}
          >
            <TextView variant={"Regular_14"} text={"100USDT Volume"} style={{ marginBottom: "12px" }} />
            <TextView variant={"Medium_12"} color={"text.quaternary"} text={"Daily trading volume of 100USDT for eligibility"} />
          </Box>
        </Box>
      </>
    </CustomModal>
  );
};
KnowMoreModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setShowKnowMoreModal: PropTypes.func.isRequired
};
export default KnowMoreModal;
