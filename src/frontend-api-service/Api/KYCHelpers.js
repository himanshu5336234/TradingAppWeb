import {
  INITIATE_KYC,
  COMPLETE_KYC,
  UPDATE_BANK_DETAILS,
  GET_KYC_DETAILS,
  NEW_KYC_STEP_VERIFICATION,
  NEW_BANK_VERIFICATION,
  NEW_ADD_BANK_ACCOUNT,
  NEW_GET_BANK_ACCOUNT_STATUS,
  NEW_UPDATE_BANK_ACCOUNT,
  NEW_DELETE_BANK_ACCOUNT,
  PAN_VALIDATION,
  REGENERATE_KYC,
  UPDATE_KYC_DETAILS
} from "../URI";

import { Format } from "../../helpers/String";
import axiosWithApiServer from "../Utils/axiosHelpers/axiosWithApiServer";
export const updateKycDetails = (payload) => {
  const url = Format(UPDATE_KYC_DETAILS.url);
  return axiosWithApiServer({
    url,
    method: UPDATE_KYC_DETAILS.reqType,
    body: JSON.stringify({ ...payload })
  });
};
export const getKycDetails = () => {
  const url = Format(GET_KYC_DETAILS.url);
  return axiosWithApiServer({ url, method: GET_KYC_DETAILS.reqType });
};
export const initiatePanValidation = ({ payload }) => {
  const url = Format(PAN_VALIDATION.url);
  return axiosWithApiServer({
    url,
    method: PAN_VALIDATION.reqType,
    body: JSON.stringify(payload)
  });
};
export const initiateKyc = ({ payload }) => {
  const url = Format(INITIATE_KYC.url);
  return axiosWithApiServer({
    url,
    method: INITIATE_KYC.reqType,
    body: JSON.stringify(payload)
  });
};
export const regenerateKyc = ({ payload }) => {
  const url = Format(REGENERATE_KYC.url);
  return axiosWithApiServer({
    url,
    method: REGENERATE_KYC.reqType,
    body: JSON.stringify(payload)
  });
};
export const BankVerification = () => {
  const url = Format(NEW_BANK_VERIFICATION.url);
  return axiosWithApiServer({
    url: `${url}?status=VERIFIED&isActive=true`,
    method: NEW_KYC_STEP_VERIFICATION.reqType
  });
};
export const AddNewBankAccount = (payload) => {
  const url = Format(NEW_ADD_BANK_ACCOUNT.url);
  return axiosWithApiServer({
    url,
    method: NEW_ADD_BANK_ACCOUNT.reqType,
    body: JSON.stringify(payload)
  });
};

export const GetAccountStatusById = (payload) => {
  const url = Format(NEW_GET_BANK_ACCOUNT_STATUS.url);
  return axiosWithApiServer({
    url: `${url}/${payload}`,
    method: NEW_GET_BANK_ACCOUNT_STATUS.reqType
  });
};
export const UpdateBankAccount = (payload) => {
  const url = Format(NEW_UPDATE_BANK_ACCOUNT.url);
  return axiosWithApiServer({
    url: `${url}/${payload}`,
    method: NEW_UPDATE_BANK_ACCOUNT.reqType,
    body: JSON.stringify({ isPrimary: true })
  });
};
export const DeleteBankAccount = (payload) => {
  const url = Format(NEW_DELETE_BANK_ACCOUNT.url);
  return axiosWithApiServer({
    url: `${url}/${payload}`,
    method: NEW_DELETE_BANK_ACCOUNT.reqType,
    body: JSON.stringify(payload)
  });
};

export const addBankAccountApi = (bankAccountDetails) => {
  const url = Format(UPDATE_BANK_DETAILS.url);
  return axiosWithApiServer({
    url,
    method: UPDATE_BANK_DETAILS.reqType,
    body: bankAccountDetails
  });
};
