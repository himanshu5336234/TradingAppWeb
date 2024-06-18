import { BankVerification, getKycDetails, updateKycDetails } from "../../../../frontend-api-service/Api";
import { NEW_BANK_DETAILS, NEW_KYC_DETAILS } from "../../constants/Constants";
import { showSnackBar } from "../Internal/GlobalErrorHandler.ac";

export const getUpdatedKyc = (payload) => (dispatch) => {
  updateKycDetails(payload)
    .then((response) => {
      dispatch({
        type: NEW_KYC_DETAILS,
        payload: {
          ...response.data
        }
      });
    })
    .catch(({ response }) => {
      dispatch(
        showSnackBar({
          src: "FETCH_KYC_DETAILS_FALSE",
          message: response.data.details,
          details: response.message,
          type: "failure"
        })
      );
    });
};
export const getKyc = () => (dispatch) => {
  getKycDetails()
    .then((response) => {
      dispatch({
        type: NEW_KYC_DETAILS,
        payload: {
          ...response.data
        }
      });
    })
    .catch(({ response }) => {
      dispatch(
        showSnackBar({
          src: "FETCH_KYC_DETAILS_FALSE",
          message: response.data.details,
          details: response.message,
          type: "failure"
        })
      );
    });
};
export const getBankDetail = () => (dispatch) => {
  BankVerification()
    .then((response) => {
      const STATUS = { true: 1, false: 2 };
      const bankAccounts = response?.data.data?.sort((a, b) => {
        const bandA = STATUS[a.isPrimary];
        const bandB = STATUS[b.isPrimary];
        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      });

      dispatch({ type: NEW_BANK_DETAILS, payload: { bankAccounts } });
    })
    .catch((errorResponse) => {
      dispatch(
        showSnackBar({
          src: "FETCH_BANKS_DETAILS_FALSE",
          message: errorResponse.response.data.details,
          details: errorResponse.message,
          type: "failure"
        })
      );
    });
};
