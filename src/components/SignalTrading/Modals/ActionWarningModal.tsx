import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import React from "react";
import StatusBody from "./StatusBody";
import { Box } from "@mui/material";
// import { CheckBox } from '@mui/icons-material';

interface ModalStateData {
  message: string;
  state: boolean;
}
interface BecomAnalystApplicationModalProps {
  IsOpen: boolean;
  handleShowDeletionModal: Function;
  dispatchLatestListOfSignalsForAnalyst: Function;
  showDeleteWarning: ModalStateData;
}

const ActionWarningModal: React.FC<BecomAnalystApplicationModalProps> = ({ IsOpen, handleShowDeletionModal, dispatchLatestListOfSignalsForAnalyst, showDeleteWarning }) => {
  const handleAction = () => {
    dispatchLatestListOfSignalsForAnalyst();
    handleShowDeletionModal();
  };
  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      close={() => handleShowDeletionModal()}
      isSecondaryAction={true}
      secondaryName={"Close"}
      secondaryAction={handleAction}
      // primaryDisabled={true}
      ContainerSx={{ maxWidth: { lg: "420px", sm: "400px", xs: "350px" } }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
        gap={2}
      >
        <StatusBody message={showDeleteWarning.message} heading={"Warning!"} status={"WARNING"} />
      </Box>
    </CustomModal>
  );
};

export default ActionWarningModal;
