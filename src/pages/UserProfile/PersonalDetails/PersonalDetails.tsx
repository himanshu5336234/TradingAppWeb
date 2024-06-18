import React, { useState, useEffect } from "react";
import { Box, Grid, Avatar } from "@mui/material";
import EditDetails from "./EditDetails";
import AvatarIcon from "./AvatarIcon.svg";
import { USER_SETTING_TABS } from "@/pages/UserProfile/Constants";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { BannerFormat } from "@/components/PagesTopDataBanner/BannerFormat";
import verificationStatus_false from "./NotVerifiedImage.svg";
import verificationStatus_true from "./VerifiedImage.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { epochToDateConvertor } from "@/helpers";
import { USERPROFILE } from "@/components/Setting/PersonalDetails/styles";
import VerificationCard from "./VerificationCard";
import AssetsCard from "./AssetsCard.jsx";
import { APIManagementCard } from "./APIManagementCard";
import ReferralAndRebateCard from "./ReferralAndRebateCard_nothingActivated";
import TextView from "@/components/UI/TextView/TextView";
import { logoutApp } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import AvatarModal from "@/components/Setting/PersonalDetails/AvatarModal";
import { getMetaDataApi } from "@/frontend-api-service/Api";
import { useDispatch } from "react-redux";
import { getKyc } from "@/frontend-BL/redux/actions/User/UserKyc.ac";

function PersonalDetails() {
  const PersonalDetail = useSelector((state: any) => state.getPersonalDetails.PersonalDetails);
  const { profileDetails } = useSelector((state: any) => state.profile);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { basicDetails, personalInfo } = PersonalDetail;
  const [showEditDetails, setshowEditDetails] = useState(false);
  useEffect(() => {
    dispatch(getKyc());
    getMetaDataApi().then((response: any) => {
      dispatch({
        type: "GET_USER_AVATAR_SUCCESS",
        payload: response.data.metadata.userAvatarUrl
      });
    });
  }, []);

  const BankVerificationTag = (
    <TextView text={"Bank Verification"} variant="Medium_14">
      <CheckIcon style={{ color: "#D4F939", fontSize: "inherit", marginRight: "3px" }} />
    </TextView>
  );

  const LogOutTag = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        cursor: "pointer",
        textDecoration: "underline",
        lineHeight: "24px"
      }}
      onClick={logoutApp}
    >
      <LogoutIcon />
      <TextView text={"Logout"} variant="SemiBold_16" color={"text.primary"} />
    </Box>
  );
  const KycVerificationTag = (
    <TextView text={"KYC Verification"} variant="Medium_14">
      <CheckIcon style={{ color: "#D4F939", fontSize: "inherit", marginRight: "3px" }} />
    </TextView>
  );
  const ViewKyc = (
    <span
      style={{
        cursor: "pointer",
        textDecoration: "underline"
      }}
      onClick={() =>
        navigate("/user/kyc", {
          state: {
            currentTab: {
              name: "kyc Verification",
              value: USER_SETTING_TABS.USER_VERIFICATION.value
            }
          }
        })
      }
    >
      <TextView text={"ViewKYC"} variant="SemiBold_14" color={"text.primary"} />
    </span>
  );
  const ViewBankDetails = (
    <span
      style={{
        cursor: "pointer",
        textDecoration: "underline",
        lineHeight: "24px"
      }}
      onClick={() =>
        navigate("/user/account", {
          state: {
            currentTab: {
              name: "bank Verification",
              value: USER_SETTING_TABS.USER_VERIFICATION.value
            }
          }
        })
      }
    >
      <TextView text={"View Bank Details"} variant="SemiBold_14" color={"text.primary"} />
    </span>
  );
  const child = (
    <Grid container gap={2}>
      <Grid item xs={12} md={1.8} onClick={() => setIsAvatarModalOpen(true)}>
        <Avatar sx={{ ...USERPROFILE, cursor: "pointer" }} alt={basicDetails?.firstName} src={personalInfo?.userAvatarUrl || AvatarIcon} />
      </Grid>
      <Grid item container md={8} lg={8.5} justifyContent={"left"}>
        <Grid xs={12} item>
          <TextView text={PersonalDetail?.userName} component={"p"} variant="Medium_22" color="text.quaternary" />
        </Grid>
        <Grid item xs={12} display={"flex"} gap={1} alignItems={"center"}>
          <Box onClick={() => setshowEditDetails(true)}>
            <TextView
              style={{
                cursor: "pointer",
                textDecoration: "underline"
              }}
              text={"Edit Name"}
              component={"span"}
              variant="SemiBold_14"
              color="text.defualt"
            />
          </Box>
          <TextView text={" | "} component="span" color="text.regular" variant={"Medium_14"} />
          <Box>
            <TextView text={"Last Login - "} component="span" color="text.regular" variant={"Medium_12"} />

            <TextView text={epochToDateConvertor(new Date(basicDetails?.lastActive))} component="span" variant={"Medium_12"} />
          </Box>
        </Grid>

        {showEditDetails && <EditDetails close={() => setshowEditDetails(false)} />}
      </Grid>
    </Grid>
  );
  const BasicDetails_NotVerified = {
    PhoneNo: ["Phone Number", basicDetails?.mobile_number],
    EmailAddress: ["Email Address", basicDetails?.email],
    LogOut: [LogOutTag]
  };
  const BasicDetails_Verified = {
    PhoneNo: ["Phone Number", basicDetails?.mobile_number],
    EmailAddress: ["Email Address", basicDetails?.email],
    ViewKYC: [KycVerificationTag, ViewKyc],
    ViewBankDetails: [BankVerificationTag, ViewBankDetails],
    LogOut: [LogOutTag]
  };
  return (
    <Box sx={{ p: { xs: "0px 0px", md: "1rem" } }}>
      <Grid gap={2} container>
        <Grid item xs={12}>
          <BannerFormat
            child={child}
            dataDetails={profileDetails?.statuses?.bankVerified && profileDetails?.statuses?.kycVerified ? BasicDetails_Verified : BasicDetails_NotVerified}
            image={profileDetails?.statuses?.bankVerified && profileDetails?.statuses?.kycVerified ? verificationStatus_true : verificationStatus_false}
            child2={undefined}
          />
        </Grid>
        <Grid item xs={12}>
          {(!profileDetails?.statuses?.bankVerified || !profileDetails?.statuses?.kycVerified) && (
            <VerificationCard IsUserKycVerified={profileDetails?.statuses?.kycVerified} IsUserBankVerified={profileDetails?.statuses?.bankVerified} />
          )}
        </Grid>
        <Grid container gap={2} justifyContent={"space-between"} item>
          <Grid item xs={12} lg={5.9}>
            <AssetsCard IsUserVerified={profileDetails?.statuses?.bankVerified} />
          </Grid>
          <Grid gap={2} container item justifyContent={"space-between"} lg={5.9}>
            <Grid item xs={12} md={5.8}>
              <ReferralAndRebateCard />
            </Grid>
            <Grid item xs={12} md={5.8}>
              <APIManagementCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AvatarModal IsOpen={isAvatarModalOpen} CloseModal={() => setIsAvatarModalOpen(false)} />
    </Box>
  );
}

export default PersonalDetails;
