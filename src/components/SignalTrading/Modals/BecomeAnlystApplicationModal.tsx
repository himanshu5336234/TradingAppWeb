import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import React, { useState } from "react";
import StatusBody from "./StatusBody";
import { useDispatch } from "react-redux";
import { fetchUserPersonna } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";

interface BecomAnalystApplicationModalProps {
  IsOpen: boolean;
  setShowApplicationModal: React.Dispatch<React.SetStateAction<boolean>>;
  dispatchFetchAllAnalyst: Function;
}

const BecomeAnalystApplicationModal: React.FC<BecomAnalystApplicationModalProps> = ({ IsOpen, setShowApplicationModal, dispatchFetchAllAnalyst }) => {
  const dispatch = useDispatch();
  const handlePrimary = () => {
    dispatchFetchAllAnalyst();
    dispatch(fetchUserPersonna());
    setShowApplicationModal(false);
  };
  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      close={() => setShowApplicationModal(false)}
      isPrimaryAction={true}
      primaryName={"Continue"}
      primaryAction={handlePrimary}
      ContainerSx={{ maxWidth: { lg: "420px", sm: "400px", xs: "350px" } }}
    >
      <StatusBody message={"You have applied to become an analyst."} heading={"Application Under Review"} status={"WARNING"} />
    </CustomModal>
  );
};

export default BecomeAnalystApplicationModal;
