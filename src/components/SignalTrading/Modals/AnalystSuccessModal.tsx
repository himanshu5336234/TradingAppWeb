import CustomModal from "@/components/CustomModals/newModal/CustomModal";
// import StatusModal from "@/components/CustomModals/newModal/StatusModal";
import React from "react";
import StatusBody from "./StatusBody";
interface AnalystSuccessModalProps {
  IsOpen: boolean;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  analystName: string;
}
const AnalystSuccessModal: React.FC<AnalystSuccessModalProps> = ({ IsOpen, setShowSuccess, analystName }) => {
  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      close={() => setShowSuccess(false)}
      isPrimaryAction={true}
      primaryName={"Continue"}
      isSecondaryAction={true}
      secondaryName={"Dismiss"}
      secondaryAction={() => setShowSuccess(false)}
      primaryAction={() => setShowSuccess(false)}
    >
      <StatusBody
        heading={"Congratulations!"}
        message={`You are now following ${analystName}. All new signals from ${analystName} will be placed on your behalf. To minimize the risk of signals getting rejected, please make sure to read our Frequently Asked Questions (FAQs)`}
        status={"SUCCESS"}
      />
    </CustomModal>
  );
};

export default AnalystSuccessModal;
