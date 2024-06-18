import { fetchLeverageApi } from "../../../../frontend-api-service/Api";
import { SET_LEVERAGE_POS_RISK } from "../../constants/Constants";

export const getLeverage = (symbol) => (dispatch) => {
  fetchLeverageApi(symbol)
    .then((leverageFromServer) => {
      const LeverageData = leverageFromServer.data;
      dispatch({
        type: SET_LEVERAGE_POS_RISK,
        payload: {
          sym: LeverageData.symbol,
          leverage: LeverageData.leverage
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
