import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import React from "react";
import StatusBody from "./StatusBody";
interface KYCErrorModalProps {
  IsOpen: boolean;
  setShowKYCModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const KYCErrorModal: React.FC<KYCErrorModalProps> = ({ IsOpen, setShowKYCModal }) => {
  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      close={() => setShowKYCModal(false)}
      isPrimaryAction={false}
      secondaryName={"Close"}
      isSecondaryAction={true}
      secondaryAction={() => setShowKYCModal(false)}
      ContainerSx={{ maxWidth: { lg: "420px", sm: "400px", xs: "350px" } }}
    >
      <StatusBody message={"KYC Verification is required to follow an Analyst"} heading={"KYC Verification Pending"} status={"ERROR"} />
    </CustomModal>
  );
};

export default KYCErrorModal;
