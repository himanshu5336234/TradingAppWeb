import { React } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import WhatsAppIcon from "ASSETS/images/userSettings/ReferralTabs/WhatsAppIcon.svg";
import TelegramIcon from "ASSETS/images/userSettings/ReferralTabs/TelegramIcon.svg";
import shareCardCoin from "ASSETS/images/ShareCardCoin.svg";
import twitterLogo from "ASSETS/images/userSettings/ReferralTabs/twitterLogo.svg";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import EmailIcon from "@mui/icons-material/Email";
import PropTypes from "prop-types";
import { EmailShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { EMAIL_ICON, REFERRAL_MEDIA_SHARE_ICON_STYLE } from "@/pages/UserProfile/Rewards/styles";
import CustomModal from "../../CustomModals/newModal/CustomModal";
import ToggleGroup from "../../UI/ToggleGroup/ToggleGroup";
import { useShareOrderForm } from "@/frontend-BL/businessHooks/ORDER_FORM/useShareOrderForm";

const ShareOrderFormModal = ({ open, close }) => {
  const { createDeepLinkOrderForm, orderFormDeepLink, setexpiryMinutes, expiryMinutes } = useShareOrderForm();
  const handleChange = (event) => {
    setexpiryMinutes(event);
    createDeepLinkOrderForm(event);
  };

  return (
    <CustomModal
      ContainerSx={{
        maxWidth: { xs: "570px" }
      }}
      IsOpen={open}
      close={close}
      isClose={true}
      title={"Order Link"}
      paddingSX={{ p: 0 }}
      TitleSx={{ px: 3.1, pt: 3.1 }}
    >
      <Box
        sx={{
          position: "relative"
        }}
      >
        <Box
          id="orderForm-share-button"
          sx={{
            display: "flex",
            height: "100%",
            gap: "20px",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
            borderRadius: 0,
            paddingTop: "20px",
            position: "relative",
            p: 3.1
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%"
            }}
          >
            <Box>
              <Typography component={"p"} color={"text.quaternary"} variant="Regular_14" mb={1.5}>
                {"Link will expire in"}
              </Typography>
              <ToggleGroup
                value={expiryMinutes}
                styles={{
                  padding: "4px 24px 4px 24px"
                }}
                handleChange={(event, value) => handleChange(value)}
                values={[
                  { name: "15 min", value: 15, id: "filterBarToggles" },
                  { name: "30 min", value: 30, id: "filterBarToggles" },
                  { name: "45 min", value: 45, id: "filterBarToggles" },
                  { name: "1 hour", value: 60, id: "filterBarToggles" }
                ]}
              />
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                borderRadius: "4px",
                mt: 4,
                backgroundColor: "background.default",
                pt: 1,
                px: 1.5,
                pb: 1.25
              }}
            >
              <Typography color="text.quaternary" variant="Medium_10" paddingLeft={1}>
                {"Order Link"}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "4px",
                  width: "100%",
                  borderRadius: "4px",
                  alignItems: "center",
                  backgroundColor: "background.default"
                }}
              >
                <Typography color="text.main" variant="Regular_16" paddingLeft={1}>
                  {orderFormDeepLink?.url ?? "https://google.co.in"}
                </Typography>
                <Box>
                  <CopyButton copyText={orderFormDeepLink?.message} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection="column" width="100%" sx={{ backgroundColor: "background.secondary" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
              pr: 1.5
            }}
          >
            <Typography variant="Medium_12">{"Share via"}</Typography>
            <IconButton sx={{ width: 50, height: 50 }}>
              <WhatsappShareButton url={orderFormDeepLink?.message}>
                <img src={WhatsAppIcon} alt="whatsapp" style={REFERRAL_MEDIA_SHARE_ICON_STYLE} />
              </WhatsappShareButton>
            </IconButton>
            <IconButton sx={{ width: 50, height: 50 }}>
              <TelegramShareButton url={orderFormDeepLink?.message}>
                <img src={TelegramIcon} alt="telegram" style={REFERRAL_MEDIA_SHARE_ICON_STYLE} />
              </TelegramShareButton>
            </IconButton>
            <IconButton sx={{ width: 50, height: 50 }}>
              <TwitterShareButton url={orderFormDeepLink?.message}>
                <img src={twitterLogo} alt="twitter" style={REFERRAL_MEDIA_SHARE_ICON_STYLE} />
              </TwitterShareButton>
            </IconButton>
            <IconButton sx={{ width: 50, height: 50 }}>
              <EmailShareButton url={orderFormDeepLink?.message}>
                <EmailIcon sx={EMAIL_ICON} />
              </EmailShareButton>
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          overflow: "hidden"
        }}
      >
        <img
          src={shareCardCoin}
          style={{
            opacity: 0.5,
            width: "124px",
            marginTop: "-8px",
            marginRight: "-8px"
          }}
        />
      </Box>
    </CustomModal>
  );
};

export default ShareOrderFormModal;
ShareOrderFormModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  createDeepLinkOrderForm: PropTypes.func,
  orderFormDeepLink: PropTypes.string
};
