import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import DemoProfile from "../../../assets/images/DemoProfile.svg";
import EclipseText from "@/components/UI/EclipseText";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import AnalystDetailsModal from "../Modals/AnalystDetailsModal";
import TermsAndConditionsModal from "../Modals/TermsAndConditionsModal";
import AnalystSuccess from "../Modals/AnalystSuccessModal";
import RiskParameterModal from "../Modals/RiskParameterModal";
import { useSelector } from "react-redux";
import KYCErrorModal from "../Modals/KYCErrorModal";
import { ANALYST_CARD_CONTAINER } from "./LandingPage.styles";
const BOX_STYLING = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%"
};

interface Analyst {
  nickName: string;
  approvedAt: number;
  roi: number;
  followersCount: number;
  signalsGenerated: number;
  winRate: number;
  analystId: string;
  avatar: string;
}
interface UserPersonna {
  userType: "ANALYST" | "FOLLOWER";
  analystId: any;
}
interface AnalystCardProps {
  analyst: Analyst;
  userPersonna: UserPersonna;
  followedAnalystId: string;
  dispatchFetchAllAnalyst: () => void;
}

const AnalystCard: React.FC<AnalystCardProps> = ({ analyst, userPersonna, followedAnalystId, dispatchFetchAllAnalyst }) => {
  const kycStatus = useSelector((state: any) => state.getKycDetails.getKycDetails?.status);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showTnCModal, setShowTncModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState({ type: "", status: false });
  const handleFollowButton = () => {
    if (followedAnalystId) return;
    if (kycStatus !== "VERIFIED") {
      setShowKYCModal(true);
    } else {
      setShowTncModal(true);
    }
  };

  const getDateFromTimestamp = (timeStamp: number): string => {
    if (!timeStamp) {
      return "--";
    }
    const timeZoneOffsetInMilli = new Date(timeStamp).getTimezoneOffset() * 60000;
    const dt = new Date(timeStamp).getTime() + timeZoneOffsetInMilli;
    const currDate = new Date().getTime();

    const days = Math.ceil((currDate - dt) / (1000 * 60 * 60 * 24));
    if (days <= 30) {
      return `${days} D`;
    }
    if (days >= 365) {
      return `${Math.floor(days / 365)} Y`;
    }
    return `${Math.floor(days / 30)} M`;
  };

  return (
    <Grid item px={3} py={6} xs={3.7} sx={{ backgroundColor: "#1B1B1F", borderRadius: "8px" }}>
      <Box sx={ANALYST_CARD_CONTAINER}>
        <Box sx={BOX_STYLING}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1
            }}
          >
            <img src={analyst.avatar || DemoProfile} alt="Demo Profile" width={"35px"} />
            <EclipseText variant={"Medium_16"} color={"text.primary"} placesToTake={10} text={analyst?.nickName}>
              <Typography component={"div"} variant="SemiBold_11" color={"text.secondary"}>
                {`Analyst Since ${getDateFromTimestamp(analyst.approvedAt)}`}
              </Typography>
            </EclipseText>
          </Box>
          <Typography variant="Medium_16" color={analyst.roi > 0 ? "text.success" : analyst.roi < 0 ? "#FF6554" : "#FFF"}>
            {analyst.roi.toFixed(2)}
            {" %"}
            <Typography component={"div"} variant="SemiBold_11" color={"text.secondary"}>
              {"ROI"}
            </Typography>
          </Typography>
        </Box>

        <Box sx={BOX_STYLING} mt={3}>
          <Typography color={"text.secondary"} variant="SemiBold_11">
            {"followers"}
            <Typography component={"div"} variant="SemiBold_12" color={"#fff"}>
              {analyst.followersCount}
            </Typography>
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Typography color={"text.secondary"} variant="SemiBold_11">
              {"Signals"}
              <Typography component={"span"} ml={2} variant="SemiBold_12" color={"#fff"}>
                {analyst.signalsGenerated}
              </Typography>
            </Typography>

            <Typography color={"text.secondary"} variant="SemiBold_11">
              {"Win %"}
              <Typography component={"span"} ml={2} variant="SemiBold_12" color={"#fff"}>
                {analyst.winRate.toFixed(2)}
                {" %"}
              </Typography>
            </Typography>
          </Box>
        </Box>

        <CustomButton
          variant={"primary"}
          label={userPersonna.userType === "FOLLOWER" && followedAnalystId === analyst?.analystId ? "Following" : "Follow"}
          onClick={handleFollowButton}
          isDisabled={
            userPersonna.userType === "ANALYST" ||
            (userPersonna.userType === "FOLLOWER" && followedAnalystId !== analyst?.analystId) ||
            (userPersonna.userType === "NORMAL_USER" && userPersonna.analystStatus === "PENDING")
          }
          style={{
            mt: 3
          }}
        />

        <Typography
          onClick={() => setShowDetails(true)}
          variant={"Bold_14"}
          mt={2}
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            textDecorationThickness: "3px",
            textUnderlineOffset: "4px"
          }}
        >
          {"More Details"}
        </Typography>
      </Box>
      {showDetails && (
        <AnalystDetailsModal
          IsOpen={showDetails}
          setShowDetails={setShowDetails}
          setShowTnC={kycStatus === "VERIFIED" ? setShowTncModal : setShowKYCModal}
          analyst={analyst}
          isFollowedAnalyst={userPersonna.userType === "FOLLOWER" && followedAnalystId === analyst?.analystId}
        />
      )}
      {showKYCModal && <KYCErrorModal IsOpen={showKYCModal} setShowKYCModal={setShowKYCModal} />}
      {showTnCModal && <TermsAndConditionsModal IsOpen={showTnCModal} setShowTnC={setShowTncModal} primaryAction={() => setShowRiskModal((state) => ({ ...state, status: true }))} />}
      {showRiskModal.status && (
        <RiskParameterModal
          IsOpen={showRiskModal.status}
          setShowRiskModal={setShowRiskModal}
          type={showRiskModal.type}
          analystId={analyst.analystId}
          setShowSuccessModal={setShowSuccess}
          dispatchFetchAllAnalyst={dispatchFetchAllAnalyst}
          initialMarginAcrossAllSignals={10}
          initialMarginPerSignal={10}
        />
      )}
      {showSuccess && <AnalystSuccess IsOpen={showSuccess} setShowSuccess={setShowSuccess} analystName={analyst.nickName.trim() !== "" ? analyst.nickName : "This Anlyst"} />}
    </Grid>
  );
};

export default AnalystCard;
