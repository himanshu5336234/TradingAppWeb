import { getProfileApi } from "API/Api";
import { ITEMS_REQUESTED, ITEMS_RECEIVED } from "../../constants/Constants";

export const ExtractItemsAction = () => (dispatch) => {
  dispatch({ type: ITEMS_REQUESTED });
  getProfileApi()
    .then((res) => res.data)
    .then((response) => {
      dispatch({ type: ITEMS_RECEIVED, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
};
