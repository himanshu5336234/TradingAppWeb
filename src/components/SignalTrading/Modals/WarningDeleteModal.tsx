import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import React from "react";
import StatusBody from "./StatusBody";
import { Box } from "@mui/material";

interface BecomAnalystApplicationModalProps {
  IsOpen: boolean;
  handleShowWarningBeforeDeleteModal: Function;
  primaryAction: Function;
  loader: boolean;
  message: string;
}

const WarningBeforeDeleteModal: React.FC<BecomAnalystApplicationModalProps> = ({ IsOpen, handleShowWarningBeforeDeleteModal, primaryAction, message, loader }) => {
  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      close={() => handleShowWarningBeforeDeleteModal()}
      isSecondaryAction={true}
      secondaryName={"Close"}
      primaryName={"Yes, I am sure"}
      isPrimaryAction={true}
      loading={loader}
      secondaryAction={() => handleShowWarningBeforeDeleteModal()}
      primaryDisabled={loader}
      primaryAction={() => primaryAction()}
      ContainerSx={{ maxWidth: { lg: "420px", sm: "400px", xs: "350px" } }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
        gap={2}
      >
        <StatusBody message={message} heading={"Warning!"} status={"WARNING"} />
      </Box>
    </CustomModal>
  );
};

export default WarningBeforeDeleteModal;
