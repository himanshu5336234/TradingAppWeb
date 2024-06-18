import { INTERNET_ONLINE, INTERNET_OFFLINE } from "../../../redux/constants/Constants";

export const internetOnline = () => (dispatch) => {
  dispatch({
    type: INTERNET_ONLINE
  });
};

export const internetOffline = () => (dispatch) => {
  dispatch({
    type: INTERNET_OFFLINE
  });
};
