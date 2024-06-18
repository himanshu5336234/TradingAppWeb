import React from "react";
import PropTypes from "prop-types";
import TextView from "@/components/UI/TextView/TextView";

import { Box, useMediaQuery } from "@mui/material";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import warning from "ASSETS/images/userSettings/ReferralTabs/Warning.svg";

interface PrimaryModalProps {
  IsOpen: boolean;
  close: () => void;
  primaryAction: () => void;
}

const PrimaryModal: React.FC<PrimaryModalProps> = ({ close, primaryAction, IsOpen }) => {
  //   const [DontShowMeAgain, setDontShowMeAgain] = useState(false);
  const isMWeb = useMediaQuery("(max-width:600px)");

  return (
    <>
      <CustomModal
        IsOpen={IsOpen}
        close={close}
        isClose={true}
        isSecondaryAction={true}
        ContainerSx={{ maxWidth: { sm: "420px", xs: "320px" } }}
        secondaryName={"Dismiss"}
        secondaryAction={close}
        isPrimaryAction={true}
        primaryName={"Confirm"}
        primaryAction={primaryAction}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "column" },
            alignItems: { xs: "center", md: "flex-start" },
            gap: 1
          }}
        >
          <img src={warning} alt={"image"} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { md: "10px", xs: "" }
            }}
          >
            <TextView variant={isMWeb ? "Medium_26" : "Medium_22"} text={"Are you sure?"} />

            <TextView
              variant={isMWeb ? "Regular_14" : "Regular_14"}
              style={{
                letterSpacing: "0.5px ",
                color: "text.quaternary"
              }}
              text={"This action will set the bank account as the primary bank account for carrying out transactions."}
            />
          </Box>
        </Box>
        <Box mt={3} />
      </CustomModal>
    </>
  );
};

PrimaryModal.propTypes = {
  IsOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  primaryAction: PropTypes.func.isRequired
};

export default PrimaryModal;
