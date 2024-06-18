import React from "react";
import { PanDetails } from "@/components/UserVerification/KycVerification/KycDigio/PanDetails";

import KYCVerification from "./KYCVerification";
import { useSelector } from "react-redux";
const KYCHome: React.FC = () => {
  const { getKycDetails } = useSelector((state: any) => state.getKycDetails);
  return (
    <>
      {getKycDetails?.status === "NOT_STARTED" && <PanDetails />}
      {getKycDetails?.status !== "NOT_STARTED" && <KYCVerification kycDetails={getKycDetails} />}
    </>
  );
};

export default KYCHome;
