import { Avatar, Box, Divider, Typography } from "@mui/material";
import CustomRow from "@/components/Setting/CustomRow/CustomRow";
import React, { useState } from "react";
import AvatarModal from "./AvatarModal";
import { MODIFY_INFO_WRAPPER } from "./styles";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setProfileApi } from "@/frontend-api-service/Api";
import { SET_PROFILE_SUCCESS } from "@/frontend-BL/redux/constants/Constants";

function ModifyPersonalInfo({ IsVerified }) {
  const [setAvatarIndex] = useState(0);
  const [IsAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [TriggerAlert, setTriggerAlert] = useState(false);
  const [isErrorNickName, setisErrorNickName] = useState(false);

  const personalInfo = useSelector((state) => state.getPersonalDetails.PersonalDetails.personalInfo);
  const { profileDetails } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const changeNickName = (nickName) => {
    return new Promise((resolve, reject) => {
      setProfileApi(JSON.stringify({ userName: nickName }))
        .then((res) => {
          dispatch({
            type: SET_PROFILE_SUCCESS,
            payload: {
              profileDetails: {
                ...profileDetails,
                userName: nickName
              }
            }
          });
          resolve(res);
        })
        .catch((err) => {
          setisErrorNickName(true);
          reject(err);
        });
    });
  };

  return (
    <Box sx={{ ...MODIFY_INFO_WRAPPER, ...(!IsVerified ? { height: "414px" } : { height: "517px" }) }}>
      <Typography component={"h1"} variant={"SemiBold_18"}>
        Modify Personal Info
      </Typography>
      <Box sx={{ mt: "30px" }}>
        <CustomRow
          title="Nick Name"
          text={profileDetails?.userName}
          doneAction={changeNickName}
          isErrorInput={isErrorNickName}
          errorText={"Nickname Already exists !"}
          seterrortext={setisErrorNickName}
        >
          {profileDetails.userName}
        </CustomRow>
        <Divider sx={{ my: "5px" }} />
        <CustomRow title="Avatar" isCustomChangeAction={true} customChangeAction={() => setIsAvatarModalOpen(true)} TriggerAlert={TriggerAlert}>
          <Avatar
            // alt={profileDetails?.firstName}
            src={personalInfo.userAvatarUrl}
          ></Avatar>
        </CustomRow>
        <Divider sx={{ my: "5px" }} />
      </Box>
      <AvatarModal IsOpen={IsAvatarModalOpen} CloseModal={() => setIsAvatarModalOpen(false)} setAvatarIndex={setAvatarIndex} setTriggerAlert={setTriggerAlert}></AvatarModal>
    </Box>
  );
}

export default ModifyPersonalInfo;

ModifyPersonalInfo.propTypes = {
  IsVerified: PropTypes.bool
};
