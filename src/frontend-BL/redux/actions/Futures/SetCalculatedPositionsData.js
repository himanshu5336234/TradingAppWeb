import { SET_POSITIONS_DATA } from "../../../redux/constants/Constants";

export const setPositionsData = (data) => (dispatch) => {
  dispatch({
    type: SET_POSITIONS_DATA,
    payload: data
  });
};
