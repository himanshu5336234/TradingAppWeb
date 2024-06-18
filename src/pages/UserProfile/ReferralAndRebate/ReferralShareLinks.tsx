import { useState } from "react";
import { TelegramShareButton, WhatsappShareButton } from "react-share";
import { Popper, Box, MenuItem, ClickAwayListener } from "@mui/material";
import TextView from "@/components/UI/TextView/TextView";

import WhatsappIcon from "@/assets/icons/Whatsapp.svg";
import TelegramIcon from "@/assets/icons/Telegram.svg";
import React from "react";

interface ReferralShareLinkProps {
  ReferralDeepLinkUrl: string;
  title: string;
}

export const ReferralShareLinks: React.FC<ReferralShareLinkProps> = ({ ReferralDeepLinkUrl, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const referralTypes = [
    {
      name: "Whatsapp",
      value: "Whatsapp"
    },
    {
      name: "Telegram",
      value: "Telegram"
    }
  ];

  const handleReferralType = (referralType: string) => {
    switch (referralType) {
      case "Whatsapp":
        return (
          <WhatsappShareButton url={ReferralDeepLinkUrl}>
            <img src={WhatsappIcon} height="14px" width="14px" />
            <TextView variant={"Regular_14"} text={"Whatsapp"} style={{ marginLeft: "0.3rem" }}></TextView>
          </WhatsappShareButton>
        );
      case "Telegram":
        return (
          <TelegramShareButton url={ReferralDeepLinkUrl}>
            <img src={TelegramIcon} height="14px" width="14px" />
            <TextView variant={"Regular_14"} text={"Telegram"} style={{ marginLeft: "0.3rem" }}></TextView>
          </TelegramShareButton>
        );
    }
  };

  return (
    <>
      <TextView
        variant={"SemiBold_14"}
        text={title}
        style={{ textDecoration: "underline", cursor: "pointer", marginLeft: "1rem" }}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
          setOpenDropdown(!openDropdown);
        }}
      ></TextView>
      {openDropdown && (
        <ClickAwayListener onClickAway={() => setOpenDropdown(false)}>
          <Popper anchorEl={anchorEl} open={openDropdown}>
            <Box p={"0.625rem 0.625rem 0.625rem 0.625rem"} sx={{ backgroundColor: "background.primary" }}>
              {referralTypes?.map(({ value }) => (
                <MenuItem key={value} value={value}>
                  {handleReferralType(value)}
                </MenuItem>
              ))}
            </Box>
          </Popper>
        </ClickAwayListener>
      )}
    </>
  );
};
