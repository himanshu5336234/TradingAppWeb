import {
  FETCH_FIAT_BALANCE,
  FETCH_FIAT_TRANSACTION_HISTORY,
  FETCH_DENSITY_BANK_ACCOUNT_DETAILS,
  FIAT_DEPOSIT,
  FIAT_EXCHANGE_RATE_PER_USDT,
  FIAT_WITHDRAW,
  GENERTATE_OTP,
  FIAT_SELL_USDT,
  FIAT_BUY_USDT
} from "../URI";

import { Format } from "../../helpers/String";
import axiosWithApiServer from "../../frontend-api-service/Utils/axiosHelpers/axiosWithApiServer";

export const fetchFiatBalanceApi = () => {
  const url = Format(FETCH_FIAT_BALANCE.url);
  return axiosWithApiServer({ url, method: FETCH_FIAT_BALANCE.reqType });
};

export const fetchFiatTransactionHistoryApi = (payload) => {
  const url = Format(FETCH_FIAT_TRANSACTION_HISTORY.url);
  return axiosWithApiServer({
    url: `${url}?type=${payload?.type}&start=${payload?.page}&size=${payload.size}&startTime=${payload.startTime}&endTime=${payload.endTime}`,
    method: FETCH_FIAT_TRANSACTION_HISTORY.reqType
  });
};

export const fetchDensityBankAccountDetailsapi = () => {
  const url = Format(FETCH_DENSITY_BANK_ACCOUNT_DETAILS.url);
  return axiosWithApiServer({
    url,
    method: FETCH_DENSITY_BANK_ACCOUNT_DETAILS.reqType
  });
};

export const fiatDepositApi = (despositDetails) => {
  const url = Format(FIAT_DEPOSIT.url);
  return axiosWithApiServer({
    url,
    method: FIAT_DEPOSIT.reqType,
    body: despositDetails
  });
};

export const fiatExchangeRateApi = () => {
  const url = Format(FIAT_EXCHANGE_RATE_PER_USDT.url);
  return axiosWithApiServer({
    url,
    method: FIAT_EXCHANGE_RATE_PER_USDT.reqType
  });
};

export const fiatSellUsdt = (payload) => {
  const url = Format(FIAT_SELL_USDT.url);
  return axiosWithApiServer({
    url,
    method: FIAT_SELL_USDT.reqType,
    body: payload
  });
};
export const fiatBuyUsdt = (payload) => {
  const url = Format(FIAT_BUY_USDT.url);
  return axiosWithApiServer({
    url,
    method: FIAT_BUY_USDT.reqType,
    body: payload
  });
};

export const generateOTP = () => {
  const url = Format(GENERTATE_OTP.url);
  return axiosWithApiServer({ url, method: GENERTATE_OTP.reqType });
};

export const fiatWithdrawApi = (withdrawDetails) => {
  const url = Format(FIAT_WITHDRAW.url);
  return axiosWithApiServer({
    url,
    method: FIAT_WITHDRAW.reqType,
    body: withdrawDetails
  });
};
