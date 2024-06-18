import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import AccountIcon from "../../../../assets/icons/SideBar/AccountIcon";
import WalletIcon from "../../../../assets/icons/SideBar/WalletIcon";
import { useNavigate } from "react-router-dom";
import SideBarIconButton from "../SideBarIconButton";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { USER_SETTING_TABS } from "../../../../pages/UserProfile/Constants";

const UserPageIcons = () => {
  const [activeUserPageButton, setActiveUserPageButton] = useState("market");
  const { personalInfo } = useSelector((state: any) => state.getPersonalDetails.PersonalDetails);
  const navigate = useNavigate();

  const theme = useTheme();
  //useEffect will update State on update state
  useEffect(() => {
    switch (window.location.pathname) {
      case "/user":
        setActiveUserPageButton("account");
        break;
      case "/wallet":
        setActiveUserPageButton("assets");
        break;
      default:
        setActiveUserPageButton("");
    }
  }, [window.location.pathname]);

  // logout function
  return (
    <>
      <SideBarIconButton
        onClick={() => {
          setActiveUserPageButton("account");
          navigate("/user", {
            state: { currentTab: USER_SETTING_TABS.PERSONAL_DETAILS }
          });
        }}
        iconComponent={
          personalInfo.userAvatarUrl ? (
            <Box component={"img"} src={personalInfo.userAvatarUrl} sx={{ width: 24, height: 24 }} />
          ) : (
            <AccountIcon
              strokeColor={activeUserPageButton === "account" ? `${theme.palette.neutral.black}` : `${theme.palette.neutral.grey7}`}
              fill={activeUserPageButton === "account" ? `${theme.palette.neutral.black}` : "none"}
            />
          )
        }
        selected={activeUserPageButton === "account"}
      />
      <SideBarIconButton
        onClick={() => {
          setActiveUserPageButton("assests");
          navigate("/wallet", {
            state: { currentTab: USER_SETTING_TABS.WALLET }
          });
        }}
        iconComponent={<WalletIcon fill={activeUserPageButton === "assets" ? `${theme.palette.neutral.black}` : `${theme.palette.neutral.grey7}`} />}
        selected={activeUserPageButton === "assets"}
      />
    </>
  );
};

export default UserPageIcons;
