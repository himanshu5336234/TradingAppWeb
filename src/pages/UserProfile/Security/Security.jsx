import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import React, { useState } from "react";

import {
  ACCOUNT_ACTIVITY_HEADER,
  ADVANCED_SECURITY_HEADER,
  ADVANCED_SECURITY_SUBHEADER,
  BUTTON_NAME_CHANGE,
  BUTTON_NAME_LEARNMORE,
  CONTACT_TEXT,
  LAST_LOGIN,
  LOGIN_PASSWORD,
  SUSPICOUS_ACTIVITY
} from "./magicStrings";
import { SECURITY_TAB_WRAPPER, ACCOUNT_ACTIVITY_WRAPPER_STYLE } from "./styles";
import CustomRow from "@/components/Setting/CustomRow/CustomRow";
import ChangePasswordModal from "@/components/Setting/Security/ChangePasswordModal/ChangePasswordModal";
import { useSelector } from "react-redux";
import SecurityActionButtons from "@/components/Setting/Security/SecurityActionButtons";
import { epochToDateConvertor } from "@/helpers";

const Security = () => {
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const lastActiveTimeStamp = useSelector((state) => state.profile.profileDetails.lastActive);

  return (
    <>
      <Grid container rowSpacing={4} sx={SECURITY_TAB_WRAPPER}>
        <Grid item xs={12}>
          <Box paddingBottom={0.5}>
            <Typography color="text.main" variant="SemiBold_18" component={"h3"}>
              {ADVANCED_SECURITY_HEADER}
            </Typography>
            <Typography color="text.mild" variant="Regular_16" component={"h4"}>
              {ADVANCED_SECURITY_SUBHEADER}
            </Typography>
          </Box>
          <CustomRow title={LOGIN_PASSWORD} isCustomButton CustomButton={<SecurityActionButtons buttonName={BUTTON_NAME_CHANGE} actionButtonHandler={() => setOpenPasswordModal(true)} />} />
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box paddingBottom={1}>
            <Typography color="text.main" variant="SemiBold_18" component={"h3"}>
              {ACCOUNT_ACTIVITY_HEADER}
            </Typography>
          </Box>
          <Box sx={ACCOUNT_ACTIVITY_WRAPPER_STYLE}>
            <Box>
              <Typography color="text.mild" variant="Regular_16" component={"h4"}>
                {LAST_LOGIN} {epochToDateConvertor(new Date(lastActiveTimeStamp))}
              </Typography>
              <Typography color="text.mild" variant="Regular_16" component={"h4"}>
                {SUSPICOUS_ACTIVITY} <Link sx={{ cursor: "pointer" }}>{CONTACT_TEXT}</Link>
              </Typography>
            </Box>
            <Box>
              <SecurityActionButtons buttonName={BUTTON_NAME_LEARNMORE} />
            </Box>
          </Box>
        </Grid>
        <ChangePasswordModal openPasswordModal={openPasswordModal} setOpenPasswordModal={setOpenPasswordModal} />
      </Grid>
    </>
  );
};

export default Security;
