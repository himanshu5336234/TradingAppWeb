import { Typography, Grid, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProfileApi } from "@/frontend-api-service/Api";
import { SET_PROFILE_SUCCESS } from "@/frontend-BL/redux/constants/Constants";

import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";

import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
const EditDetails = ({ close }: { close: () => void }) => {
  const [nickName, setnickName] = useState(profileDetails?.userName);

  const handlechangeNickName = (event: { target: { value: any } }) => {
    setnickName(event.target.value); // Update the nickname based on user input
  };

  const dispatch = useDispatch<any>();
  const changeNickName = () => {
    return new Promise((resolve, reject) => {
      setProfileApi(JSON.stringify({ userName: nickName }))
        .then((res: any) => {
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
          dispatch(
            showSnackBar({
              src: "CHANGE_NICKNAME_SUCCESSFULLY",
              message: "Nick name has been changed successfully",
              type: "success"
            })
          );
          close();
        })
        .catch((err: any) => {
          setisErrorNickName(true);
          reject(err);
        });
    });
  };
  return (
    <CustomModal
      isPrimaryAction={true}
      primaryName={"confirm"}
      IsOpen={true}
      close={close}
      isClose={true}
      secondaryName={"Dismiss"}
      primaryAction={changeNickName}
      isSecondaryAction={true}
      ContainerSx={{
        maxWidth: { xs: "360px", sm: "360px", md: "500px", lg: "500px" },
        maxHeight: "370px"
      }}
      secondaryAction={close}
      secondaryButtonSX={{
        maxWidth: { xs: "130px", md: "132px", lg: "132px" }
      }}
      primaryButtonSX={{
        maxWidth: { xs: "130px", md: "132px", lg: "132px" },
        marginRight: "20px"
      }}
      isDisabled={nickName.length > 10}
    >
      <Grid container md={12} lg={12} sm={12} xs={12} px={1}>
        <Grid md={9} lg={9} sm={9} xs={9}></Grid>
        <Grid md={12} lg={12} sm={12} xs={12} mt={4}>
          <Typography variant="Medium_16">Enter Nickname</Typography>
        </Grid>
        <Grid md={12} lg={12} sm={12} xs={12} mt={2}>
          <BasicTextFields
            autoFocus={true}
            variant="outlined"
            label={"Enter Nickname"}
            onChange={handlechangeNickName}
            value={nickName}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <>
                    <Typography component="p" variant="Bold_12" style={{ cursor: "pointer" }}>
                      {`${nickName.length}/10`}
                    </Typography>
                  </>
                </InputAdornment>
              )
            }}
          >
            {nickName.length > 10 && (
              <Typography color={"text.error"} variant="Medium_11">
                {"Nick Name length can not be greater than 10"}
              </Typography>
            )}
          </BasicTextFields>
        </Grid>
      </Grid>
    </CustomModal>
  );
};
export default EditDetails;
