import { availableBalanceApi } from "../../../../frontend-api-service/Api";
import { AVAILABLE_BALANCE_FETCH_SUCCESS, AVAILABLE_BALANCE_FETCH_FAIL } from "../../../../frontend-BL/redux/constants/Constants";

const defaultSettlementCurrency = "USDT";

export const availableBalanceAction =
  (settlementCurrencyType = defaultSettlementCurrency) =>
  (dispatch) => {
    availableBalanceApi()
      .then(
        (apiResponse) => {
          const baseCurrencyAsset = apiResponse.data.filter((asset) => asset.asset === settlementCurrencyType);
          dispatch({
            type: AVAILABLE_BALANCE_FETCH_SUCCESS,
            payload: {
              availableBalance: parseFloat(baseCurrencyAsset[0].availableBalance)
            }
          });
          return Promise.resolve();
        },
        (error) => {
          const message = error.toString();
          dispatch({
            type: AVAILABLE_BALANCE_FETCH_FAIL,
            payload: message
          });
          return Promise.reject(error);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  };
