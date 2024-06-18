import { React } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import WhatsAppIcon from "ASSETS/images/userSettings/ReferralTabs/WhatsAppIcon.svg";
import TelegramIcon from "ASSETS/images/userSettings/ReferralTabs/TelegramIcon.svg";
import GoldCoins from "ASSETS/images/userSettings/ReferralTabs/GoldCoins.svg";
import twitterLogo from "ASSETS/images/userSettings/ReferralTabs/twitterLogo.svg";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import EmailIcon from "@mui/icons-material/Email";
import PropTypes from "prop-types";
import { EmailShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { EMAIL_ICON, REFERRAL_CODE_BOX, REFERRAL_CODE_DISPLAY_STYLE, REFERRAL_MEDIA_SHARE_ICON_STYLE, REFERRAL_URL_BOX_STYLE } from "@/pages/UserProfile/Rewards/styles";

const ReferralCode = ({ referralCode, referralUrl }) => {
  return (
    <Box sx={REFERRAL_CODE_BOX}>
      <img src={GoldCoins} style={{ position: "absolute", right: "4px" }} alt=""></img>
      <Box>
        <Typography>{"Referral Code"}</Typography>
        <Box sx={REFERRAL_CODE_DISPLAY_STYLE}>
          <Typography variant={"Bold_16_21"} color="text.main" component={"h2"}>
            {referralCode}
          </Typography>
          <Box sx={{ marginTop: "-5px" }}>
            <CopyButton copyText={referralCode} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Typography>Referral Link</Typography>
        <Box sx={REFERRAL_URL_BOX_STYLE}>
          <Typography color="text.main" variant="Regular_14" marginTop="4px" paddingLeft={1} sx={{ maxWidth: { sm: "auto", md: "280px" }, overflow: "hidden", textOverflow: "ellipsis" }}>
            {referralUrl}
          </Typography>
          <Box sx={{ marginTop: "-3px" }}>
            <CopyButton copyText={referralUrl} />
          </Box>
        </Box>
      </Box>

      <Box display={"flex"} flexDirection="column" width="100%" gap={1}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <IconButton sx={{ width: 50, height: 50 }}>
            <WhatsappShareButton url={referralUrl}>
              <img src={WhatsAppIcon} alt="whatsapp" style={REFERRAL_MEDIA_SHARE_ICON_STYLE} />
            </WhatsappShareButton>
          </IconButton>
          <IconButton sx={{ width: 50, height: 50 }}>
            <TelegramShareButton url={referralUrl}>
              <img src={TelegramIcon} alt="telegram" style={REFERRAL_MEDIA_SHARE_ICON_STYLE} />
            </TelegramShareButton>
          </IconButton>
          <IconButton sx={{ width: 50, height: 50 }}>
            <EmailShareButton url={referralUrl}>
              <EmailIcon sx={EMAIL_ICON} />
            </EmailShareButton>
          </IconButton>
          <IconButton sx={{ width: 50, height: 50 }}>
            <TwitterShareButton url={referralUrl}>
              <img src={twitterLogo} alt="twitter" style={REFERRAL_MEDIA_SHARE_ICON_STYLE} />
            </TwitterShareButton>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ReferralCode;
ReferralCode.propTypes = {
  referralCode: PropTypes.string,
  referralUrl: PropTypes.string
};
