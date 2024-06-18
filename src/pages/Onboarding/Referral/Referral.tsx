import ReferralDefault from "@/components/Referral/ReferralDefault";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Referral = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // const isSignedUp = window.localStorage.getItem("isSignedUp");
    const isReferralDone = window.localStorage.getItem("isReferralDone");
    if (isReferralDone === null || isReferralDone === "true") {
      navigate("/auth");
    }

    return () => {
      const isReferralDone = window.localStorage.getItem("isReferralDone");

      if (isReferralDone === null || isReferralDone === "false") {
        navigate("/referral");
      }
    };
  }, [navigate]);

  return <ReferralDefault />;
};

export default Referral;
