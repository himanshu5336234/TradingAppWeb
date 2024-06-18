import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { BOXUSERPROFILE, BOXUSERPROFILEVALUE, COLOR_DARKGREY, NOT_VERIFIED_LABEL, USERPROFILE, VERIFIED_LABEL, WRAPPER_PADDING } from "./styles";
import { epochToDateConvertor } from "@/helpers";
import PropTypes from "prop-types";
import { EMAIL_ADDRESS, LAST_LOGIN, NOT_VERIFIED, PHONE_NO, VERIFIED } from "./Constants";
import { useSelector } from "react-redux";

function BasicDetails({ PersonalDetails }) {
  const { getKycDetails } = useSelector((state) => state.getKycDetails);
  const { basicDetails, personalInfo } = PersonalDetails;

  const verification_status = () => {
    return getKycDetails?.status === "VERIFIED" ? (
      <Typography variant="SemiBold_14" sx={VERIFIED_LABEL}>
        {VERIFIED}
      </Typography>
    ) : (
      <Typography variant="SemiBold_14" sx={NOT_VERIFIED_LABEL}>
        {NOT_VERIFIED}
      </Typography>
    );
  };

  return (
    <Box>
      <Box>
        <Avatar sx={USERPROFILE} alt={basicDetails?.firstName} src={personalInfo.userAvatarUrl} />
      </Box>
      <Box sx={WRAPPER_PADDING}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="SemiBold_18">{`${basicDetails?.firstName} ${basicDetails?.lastName}`}</Typography>
          {verification_status()}
        </Box>
        <Grid container sx={[BOXUSERPROFILE]}>
          <Grid item sx={BOXUSERPROFILEVALUE}>
            <Typography variant={"Regular_12"} sx={COLOR_DARKGREY} component={"h3"}>
              {EMAIL_ADDRESS}
            </Typography>
            <Typography variant={"SemiBold_12"} component={"h3"}>
              {basicDetails?.email}
            </Typography>
          </Grid>
          <Grid item sx={BOXUSERPROFILEVALUE}>
            <Typography variant={"Regular_12"} sx={COLOR_DARKGREY} component={"h3"}>
              {PHONE_NO}
            </Typography>
            <Typography variant={"SemiBold_12"} component={"h3"}>
              {basicDetails?.mobile_number}
            </Typography>
          </Grid>
          <Grid item sx={BOXUSERPROFILEVALUE}>
            <Typography variant={"Regular_12"} sx={COLOR_DARKGREY} component={"h3"}>
              {LAST_LOGIN}
            </Typography>
            <Typography variant={"SemiBold_12"} component={"h3"}>
              {epochToDateConvertor(new Date(basicDetails?.lastActive))}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <>ghjkjhgffghkgfghj</>
    </Box>
  );
}

export default BasicDetails;

BasicDetails.propTypes = { PersonalDetails: PropTypes.object };
