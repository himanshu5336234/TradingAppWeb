import { useState } from "react";
import { postReferralCode, verifyReferralCode } from "@/frontend-api-service/Api/Setting/Reward/Rewards";
import { GetAppURL } from "@/frontend-api-service/Base";
interface ReferralInputTextMessage {
  type: string;
  message: string;
}

interface IsReferred {
  isCode: boolean;
  code: string;
}

export const useReferral = () => {
  const [isReferralVerified, setIsReferralVerified] = useState<boolean>(false);
  const [referralInputTextMessage, setReferralInputTextMessage] = useState<ReferralInputTextMessage>({
    type: "",
    message: ""
  });
  const [isReferred, setIsReferred] = useState<IsReferred>({
    isCode: true,
    code: ""
  });

  const [headingMessage, setHeadingMessage] = useState<string>("");
  const applyReferralCode = (referralCode: string, setLoading: (loading: boolean) => void) => {
    postReferralCode(referralCode)
      .then(() => {
        setLoading(false);
        window.localStorage.setItem("isSignedUp", true);
        localStorage.removeItem("referralCode");
        localStorage.removeItem("isReferralDone");
        window.location.href = GetAppURL() + "/auth";
      })
      .catch((e: any) => {
        setReferralInputTextMessage({
          type: "error",
          message: e.response.data.details || "Something went wrong, please retry!"
        });
        setLoading(false);
        setIsReferralVerified(false);
      });
  };

  const VerifyReferralCode = (referralCode: string, throughLink = false) => {
    if (!referralCode) {
      setReferralInputTextMessage({
        type: "error",
        message: "Error Code is Invalid"
      });
    } else {
      verifyReferralCode(referralCode)
        .then((successResponse: any) => {
          setIsReferralVerified(true);
          let isUser = false;
          if (successResponse.data.userFirstName || successResponse.data.userlasttName) {
            isUser = true;
          }
          if (throughLink) {
            if (isUser) {
              setHeadingMessage("You have been referred by " + successResponse.data?.userFirstName + " " + successResponse.data?.userLastName);
            } else setHeadingMessage("Referral Code Successfully Applied");
          } else {
            setHeadingMessage("Do you have a referral code? Enter it below.");
          }
          setReferralInputTextMessage({
            type: "success",
            message: isUser ? "You have been referred by " + successResponse.data?.userFirstName + " " + successResponse.data?.userLastName : "Referral Code successfully applied"
          });
        })
        .catch((e: any) => {
          setHeadingMessage("Do you have a referral code? Enter it below.");
          if (throughLink) {
            setIsReferred({
              code: "",
              isCode: false
            });
          } else {
            setReferralInputTextMessage({
              type: "error",
              message: e.response.data.details || "Something went wrong, please retry!"
            });
          }
        });
    }
  };

  return {
    applyReferralCode,
    VerifyReferralCode,
    isReferralVerified,
    setIsReferralVerified,
    referralInputTextMessage,
    setReferralInputTextMessage,
    isReferred,
    setIsReferred,
    headingMessage,
    setHeadingMessage
  };
};
