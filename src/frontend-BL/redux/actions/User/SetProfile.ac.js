import { getProfileApi } from "@/frontend-api-service/Api";
import { SET_INACTIVE_TIME, SET_PROFILE_SUCCESS } from "../../../redux/constants/Constants";

export const setProfileDetails = () => (dispatch) => {
  getProfileApi().then((successResponseForFetchProfileFetails) => {
    if (successResponseForFetchProfileFetails.data !== undefined) {
      dispatch({
        type: SET_PROFILE_SUCCESS,
        payload: {
          profileDetails: {
            ...successResponseForFetchProfileFetails.data
          }
        }
      });
    }
  });
};

export const setInactiveTime = (time) => (dispatch) => {
  if (time !== undefined) {
    dispatch({
      type: SET_INACTIVE_TIME,
      payload: { inactiveTimestamp: time }
    });
  }
};
