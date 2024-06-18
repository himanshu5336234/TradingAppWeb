import { Avatar, Box, Grid } from "@mui/material";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { AVATAR_GRID_WRAPPER, AVATAR_SIZE, SELECTED_AVATAR } from "./styles";
import { getMetaDataApi, postMetaDataApi } from "@/frontend-api-service/Api";

function AvatarModal({ IsOpen, CloseModal }) {
  const [TemporaryAvatarIndex, setTemporaryAvatarIndex] = useState(-1);
  const dispatch = useDispatch();

  const AVATAR_ICON_LIST = [];

  const BASE_URL = "https://static-dev.density.exchange/avatar/User%200";
  for (let no = "1"; no <= "7"; ++no) {
    ["a", "b", "c"].forEach((ch) => {
      const newIcon = BASE_URL + no + ch + ".svg";
      AVATAR_ICON_LIST.push(newIcon);
    });
  }

  const primaryAction = () => {
    if (TemporaryAvatarIndex === -1) {
      return null;
    } else {
      getMetaDataApi()
        .then((MetaData) => {
          const NewMetaData = MetaData;
          NewMetaData.data.metadata = {
            ...NewMetaData.data.metadata,
            userAvatarUrl: AVATAR_ICON_LIST[TemporaryAvatarIndex]
          };
          postMetaDataApi(JSON.stringify(NewMetaData.data.metadata));
          dispatch({
            type: "GET_USER_AVATAR_SUCCESS",
            payload: AVATAR_ICON_LIST[TemporaryAvatarIndex]
          });
          setTemporaryAvatarIndex(-1);
          CloseModal();
        })
        .catch((err) => console.log(err));
    }
  };

  const CloseModalWithCleanUp = () => {
    setTemporaryAvatarIndex(-1);
    CloseModal();
  };

  const RenderAvatars = () => {
    return AVATAR_ICON_LIST.map((e, curIndex) => {
      return (
        <Grid item xs={4} key={curIndex}>
          <Box sx={AVATAR_SIZE}>
            <Avatar
              src={e}
              key={curIndex}
              onClick={() => setTemporaryAvatarIndex(curIndex)}
              sx={{
                ...{ width: "100%", height: "auto" },
                ...(curIndex === TemporaryAvatarIndex && SELECTED_AVATAR)
              }}
            />
          </Box>
        </Grid>
      );
    });
  };

  return (
    <CustomModal
      isClose={true}
      close={CloseModal}
      IsOpen={IsOpen}
      primaryName="Save"
      secondaryName="Cancel"
      secondaryAction={CloseModalWithCleanUp}
      isSecondaryAction={true}
      isPrimaryAction={true}
      title={"Choose your Avatar"}
      primaryAction={primaryAction}
    >
      <Box sx={{ overflow: "auto" }}>
        <Grid container sx={AVATAR_GRID_WRAPPER} colSpacing={1} rowSpacing={2}>
          {RenderAvatars()}
        </Grid>
      </Box>
    </CustomModal>
  );
}

export default AvatarModal;
AvatarModal.propTypes = {
  IsOpen: PropTypes.bool,
  CloseModal: PropTypes.func,
  setAvatarIndex: PropTypes.func
};
