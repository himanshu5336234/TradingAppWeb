import { GET_REFERRAL_STATUS, GET_USER_REFERRAL_CODE, POST_REFERRAL_CODE } from "@/frontend-api-service/URI";
import { Format } from "@/helpers/String";
import axiosWithApiServer from "API/Utils/axiosHelpers/axiosWithApiServer";
import {
  GET_REFERRAL_EARNING_DETAILS,
  GET_REFEREE_DETAILS,
  GET_REBATE_EARNING_DETAILS,
  GET_REBATE_HISTORY_DETAILS,
  GET_REWARD_HISTORY,
  GET_TASK_REWARD,
  GET_TRADES,
  GET_REFERRAL_REWARD_HISTORY,
  VALIDATE_REFERRAL_CODE
} from "./URI";

//REFERRAL API's
//Gives Referrer Earnings
export const GET_REFERER_DETAILS = (payload) => {
  const url = Format(GET_REFERRAL_EARNING_DETAILS.url, payload?.startTime, payload?.endTime);
  return axiosWithApiServer({
    url,
    method: GET_REFERRAL_EARNING_DETAILS.reqType
  });
};

//API for referee detials - KYC, STATUS, DATE, EMAIL () - to populate referral history
export const GET_REFEREE_HISTORY = () => {
  // /v1/reward/referralDetails
  const url = Format(GET_REFEREE_DETAILS.url);
  return axiosWithApiServer({ url, method: GET_REFEREE_DETAILS.reqType });
};

export const GET_REWARD_HISTORIES = (rewardHistoryPayload) => {
  const url = Format(GET_REWARD_HISTORY.url, rewardHistoryPayload.rewardType, rewardHistoryPayload.page, rewardHistoryPayload.size);
  return axiosWithApiServer({ url, method: GET_REWARD_HISTORY.reqType });
};

export const GET_REFERRAL_REWARD_HISTORIES = (rewardHistoryPayload) => {
  const url = Format(GET_REFERRAL_REWARD_HISTORY.url, rewardHistoryPayload.page, rewardHistoryPayload.size);
  return axiosWithApiServer({ url, method: GET_REWARD_HISTORY.reqType });
};

//REBATE API's

export const GET_TOTAL_REBATE_DETAILS = (payload) => {
  // payload to set start and end time
  const url = Format(GET_REBATE_EARNING_DETAILS.url, payload?.startTime, payload?.endTime);
  return axiosWithApiServer({
    url,
    method: GET_REBATE_EARNING_DETAILS.reqType
  });
};

export const GET_REBATE_HISTORY = (payload) => {
  const url = Format(GET_REBATE_HISTORY_DETAILS.url, payload.startTime, payload.endTime, payload.page, payload.size);
  return axiosWithApiServer({
    url,
    method: GET_REBATE_HISTORY_DETAILS.reqType
  });
};

// TASK REWARD API's

// NOTE: below action can be used in future for campaigns

// export const GET_USER_TASK_REWARD = () => {
//   const url = Format(GET_TASK_REWARD.url);
//   return axiosWithApiServer({ url, method: GET_TASK_REWARD.reqType });
// }

export const GET_TRADES_LIST = (payload) => {
  const url = Format(GET_TRADES.url, payload.startTime, payload.endTime);
  return axiosWithApiServer({ url, method: GET_TRADES.reqType });
};

//other api's
export const getUserReferralCode = () => {
  const url = Format(GET_USER_REFERRAL_CODE.url);
  return axiosWithApiServer({
    url,
    method: GET_USER_REFERRAL_CODE.reqType
  });
};

export const postReferralCode = (referralCode) => {
  const url = Format(POST_REFERRAL_CODE.url);
  return axiosWithApiServer({
    url,
    method: POST_REFERRAL_CODE.reqType,
    body: JSON.stringify({ referralCode: referralCode })
  });
};

export const getReferralStatus = () => {
  const url = Format(GET_REFERRAL_STATUS.url);
  return axiosWithApiServer({
    url,
    method: GET_REFERRAL_STATUS.reqType
  });
};

export const verifyReferralCode = (referralCode) => {
  const url = Format(VALIDATE_REFERRAL_CODE.url, referralCode);

  return axiosWithApiServer({
    url,
    method: VALIDATE_REFERRAL_CODE.reqType
  });
};
