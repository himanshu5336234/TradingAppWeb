import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowedAnalyst } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";
import { becomeAnAnalyst } from "@/frontend-api-service/Api/SignalTrading/SignalTrading";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { ANALYST_STATUS_MAIN_CONTAINER, ANALYST_STATUS_BOX_STYLINGS } from "./LandingPage.styles";
import TermsAndConditionsModal from "../Modals/TermsAndConditionsModal";
import BecomeAnalystApplicationModal from "../Modals/BecomeAnlystApplicationModal";
import KYCErrorModal from "../Modals/KYCErrorModal";
import { deleteAnalystRequest } from "../../../frontend-api-service/Api/SignalTrading/SignalTrading";
import WarningBeforeDeleteModal from "../Modals/WarningDeleteModal";
import { fetchUserPersonna } from "../../../frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";

interface ActionStatusProps {
  analystId: string;
  dispatchFetchAllAnalyst: Function;
}

const ActionStatus: React.FC<ActionStatusProps> = ({ analystId, dispatchFetchAllAnalyst }) => {
  // const [analystStatus, setAnalystStatus] = useState<string>("");
  const dispatch = useDispatch();
  const userPersonna = useSelector((state: any) => state.SignalTrading.userPersonna);
  const followedAnalyst = useSelector((state: any) => state.SignalTrading.analystDetailsFollowedByTheFollower);
  const kycStatus = useSelector((state: any) => state.getKycDetails.getKycDetails?.status);
  const [showKycModal, setShowKYCModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showTnCModal, setShowTnCModal] = useState(false);
  const [showApplicationStatusModal, setShowApplicationStatusModal] = useState(false);
  const [showCancelAnalystModal, setShowCancelAnalystModal] = useState(false);

  const handleCancelAnalystModal = () => {
    setShowCancelAnalystModal(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (analystId) {
      dispatch(fetchFollowedAnalyst({ analystId }));
    }
  }, [analystId]);

  const handleAnalystApplication = () => {
    if (userPersonna.userType !== "NORMAL_USER") return;
    if (kycStatus !== "VERIFIED") {
      setShowKYCModal(true);
    } else {
      setShowTnCModal(true);
    }
  };

  const handleBecomeAnAnalyst = () => {
    setLoader(true);
    becomeAnAnalyst()
      .then(() => {
        setLoader(false);
        setShowApplicationStatusModal(true);
        // window.location.reload();
      })
      .catch((err: any) => {
        dispatch(
          showSnackBar({
            src: "ANALYST_APPLICATION_FAILED",
            message: err.response.data.details,
            type: "failure"
          })
        );
        setLoader(false);
      });
  };

  const handleCancelAnalystRequest = () => {
    setLoader(true);
    deleteAnalystRequest()
      .then(() => {
        setLoader(false);
        dispatchFetchAllAnalyst();
        dispatch(fetchUserPersonna());
        setShowCancelAnalystModal(false);
      })
      .catch((err: any) => {
        dispatch(
          showSnackBar({
            src: "DELETE_ANALYST_APPLICATION_FAILED",
            message: err.response.data.details,
            type: "failure"
          })
        );
        setLoader(false);
        setShowCancelAnalystModal(false);
      });
  };

  // const following = false; // You need to define this variable as it's used in the code.

  const getBecomeAnalystUI = () => {
    if (userPersonna.userType === "FOLLOWER" || (userPersonna.userType === "NORMAL_USER" && userPersonna.analystStatus === "")) {
      return (
        <Box sx={{ ...ANALYST_STATUS_BOX_STYLINGS, borderRadius: "0 0 8px 0" }}>
          <Typography variant="Regular_12" color={"text.secondary"}>
            {"Apply to become Analyst"}
          </Typography>
          <Typography width={"70%"} variant="Regular_16" color={"#B1B1BA"}>
            {"Become Analyst & Generate Signals"}
          </Typography>
          <Typography
            variant={"Bold_14"}
            onClick={handleAnalystApplication}
            color={userPersonna.userType === "FOLLOWER" ? "text.secondary" : "text.primary"}
            sx={{
              textDecoration: "underline",
              cursor: userPersonna.userType === "FOLLOWER" ? "not-allowed" : "pointer",
              textDecorationThickness: "3px",
              textUnderlineOffset: "4px"
            }}
          >
            {"Become An Analyst"}
          </Typography>
        </Box>
      );
    }
    switch (userPersonna.analystStatus) {
      case "PENDING":
        return (
          <Box
            sx={{
              ...ANALYST_STATUS_BOX_STYLINGS,
              border: "1px solid rgba(233, 174, 24, 0.40)",
              borderRadius: "0 0 8px 0",
              backgroundColor: "rgba(233, 174, 24, 0.20)",
              backdropFilter: "blur(10px)"
            }}
          >
            <Typography variant="Regular_12" color={"text.secondary"}>
              {"Apply to become Analyst"}
            </Typography>
            <Typography width={"70%"} variant="Regular_16" color={"#B1B1BA"}>
              {"Your Analyst Application is currently under Process"}
            </Typography>

            <Typography
              variant={"Bold_14"}
              color={"text.primary"}
              onClick={() => setShowCancelAnalystModal(true)}
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                textDecorationThickness: "3px",
                textUnderlineOffset: "4px"
              }}
            >
              {"Cancel Request"}
            </Typography>
          </Box>
        );

      case "ACTIVE":
        return (
          <Box
            sx={{
              ...ANALYST_STATUS_BOX_STYLINGS,
              border: "1px solid rgba(41, 181, 126, 0.40)",
              borderRadius: "0 0 8px 0",
              backgroundColor: "rgba(41, 181, 126, 0.20)",
              backdropFilter: "blur(10px)"
            }}
          >
            <Typography variant="Regular_12" color={"text.secondary"}>
              {"Apply to become Analyst"}
            </Typography>
            <Typography variant="Regular_16" color={"#B1B1BA"}>
              {"Analyst Profile Approved. Congratulations!!!"}
            </Typography>
            <Typography
              onClick={() => navigate("analyst")}
              variant={"Bold_14"}
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                textDecorationThickness: "3px",
                textUnderlineOffset: "4px"
              }}
            >
              {"Analyst Dashboard"}
            </Typography>
          </Box>
        );

      case "REJECTED":
        return (
          <Box
            sx={{
              ...ANALYST_STATUS_BOX_STYLINGS,
              border: "1px solid rgba(255, 101, 84, 0.40)",
              background: "rgba(255, 101, 84, 0.20)",
              borderRadius: "0 0 8px 0",
              backdropFilter: "blur(10px)"
            }}
          >
            <Typography variant="Regular_12" color={"text.secondary"}>
              {"Apply to become Analyst"}
            </Typography>
            <Typography width={"70%"} variant="Regular_16" color={"#B1B1BA"}>
              {"Application is rejected due to some reason but you can Reapply!"}
            </Typography>
            <Typography
              variant={"Bold_14"}
              onClick={handleAnalystApplication}
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                textDecorationThickness: "3px",
                textUnderlineOffset: "4px"
              }}
            >
              {"Become An Analyst"}
            </Typography>
          </Box>
        );

      default:
        return (
          <Box sx={{ ...ANALYST_STATUS_BOX_STYLINGS, borderRadius: "0 0 8px 0" }}>
            <Typography variant="Regular_12" color={"text.secondary"}>
              {"Apply to become Analyst"}
            </Typography>
            <Typography width={"70%"} variant="Regular_16" color={"#B1B1BA"}>
              {"Become Analyst & Generate Signals"}
            </Typography>
            <Typography
              variant={"Bold_14"}
              onClick={handleAnalystApplication}
              sx={{
                textDecoration: "underline",
                cursor: loader || followedAnalyst ? "not-allowed" : "pointer",
                textDecorationThickness: "3px",
                textUnderlineOffset: "4px"
              }}
            >
              {"Become An Analyst"}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ ...ANALYST_STATUS_MAIN_CONTAINER, alignItems: "stretch" }}>
      <Box sx={{ ...ANALYST_STATUS_BOX_STYLINGS, borderRadius: "0 0 0 8px" }}>
        <Typography variant="Regular_12" color={"text.secondary"}>
          {userPersonna.userType === "FOLLOWER" && followedAnalyst.nickName ? "You are following" : "Your Analyst"}
        </Typography>
        {userPersonna.userType === "FOLLOWER" && (
          <Typography width={"70%"} variant="Regular_16" color={"#B1B1BA"}>
            {followedAnalyst?.nickName?.trim() ? followedAnalyst?.nickName?.trim() : "An Analyst"}
          </Typography>
        )}
        {userPersonna.userType !== "FOLLOWER" && (
          <Typography width={"70%"} variant="Regular_16" color={"#B1B1BA"}>
            {"You aren’t following anyone, Follow Someone!"}
          </Typography>
        )}

        <Typography
          variant={"Bold_14"}
          onClick={() => {
            if (userPersonna.userType !== "FOLLOWER") return;
            navigate("user");
          }}
          color={userPersonna.userType !== "FOLLOWER" ? "text.secondary" : "text.primary"}
          sx={{
            textDecoration: "underline",
            cursor: userPersonna.userType !== "FOLLOWER" ? "not-allowed" : "pointer",
            textDecorationThickness: "3px",
            textUnderlineOffset: "4px"
          }}
        >
          {"Signal Dashboard"}
        </Typography>
      </Box>
      {getBecomeAnalystUI()}
      {showKycModal && <KYCErrorModal IsOpen={showKycModal} setShowKYCModal={setShowKYCModal} />}
      {showTnCModal && (
        <TermsAndConditionsModal
          IsOpen={showTnCModal}
          primaryAction={() => {
            handleBecomeAnAnalyst();
          }}
          setShowTnC={setShowTnCModal}
        />
      )}
      {showApplicationStatusModal && (
        <BecomeAnalystApplicationModal IsOpen={showApplicationStatusModal} setShowApplicationModal={setShowApplicationStatusModal} dispatchFetchAllAnalyst={dispatchFetchAllAnalyst} />
      )}
      {showCancelAnalystModal && (
        <WarningBeforeDeleteModal
          IsOpen={showCancelAnalystModal}
          handleShowWarningBeforeDeleteModal={handleCancelAnalystModal}
          primaryAction={handleCancelAnalystRequest}
          loader={loader}
          message={"This will cancel Your Request to become an Analyst"}
        />
      )}
    </Box>
  );
};

export default ActionStatus;
