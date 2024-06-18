/* eslint-disable no-unused-vars */
import { GET_LEVERAGE_BRACKET_SUCCESS, GET_LEVERAGE_BRACKET_FAIL } from "../../../redux/constants/Constants";
import { getLeverageBracketApi } from "../../../../frontend-api-service/Api/Futures";

export const getLeverageBracket = () => (dispatch) => {
  getLeverageBracketApi().then(
    ({ data }) => {
      data.symbolLeverageBracket.forEach((element) => {
        dispatch({
          type: GET_LEVERAGE_BRACKET_SUCCESS,
          payload: element
        });
      });
    },
    ({ response }) => {
      dispatch({
        type: GET_LEVERAGE_BRACKET_FAIL,
        payload: response.data.message
      });
    }
  );
};
