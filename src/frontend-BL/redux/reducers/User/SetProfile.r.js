import { SET_PROFILE_SUCCESS, SET_PROFILE_FAIL, SET_INACTIVE_TIME } from "../../../redux/constants/Constants";

const initialState = {
  profileDetails: {},
  inactiveTimestamp: undefined
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PROFILE_SUCCESS:
      return {
        ...state,
        profileDetails: payload.profileDetails
      };
    case SET_PROFILE_FAIL:
      return {
        ...state
      };
    case SET_INACTIVE_TIME:
      return {
        ...state,
        inactiveTimestamp: payload.inactiveTimestamp
      };
    default:
      return state;
  }
}
