import { REQUEST_TYPE } from "@/frontend-api-service/Base";
// referal routes
export const GET_REFERRAL_EARNING_DETAILS = {
  url: "/v1/reward/referral/referrerReward?fromDate={0}&toDate={1}",
  reqType: REQUEST_TYPE.GET
};
export const GET_REFEREE_DETAILS = {
  url: "/v1/reward/referralDetails",
  reqType: REQUEST_TYPE.GET
};

// rebate routes
export const GET_REBATE_EARNING_DETAILS = {
  url: "/v1/reward/rebate/rebateReward?fromDate={0}&toDate={1}",
  reqType: REQUEST_TYPE.GET
};

export const GET_REBATE_HISTORY_DETAILS = {
  url: "/v1/reward/rebate/rebateHistory?fromDate={0}&toDate={1}&page={2}&size={3}",
  reqType: REQUEST_TYPE.GET
};

// task rewards
export const GET_TASK_REWARD = {
  url: "/v1/reward/getTaskReward",
  reqType: REQUEST_TYPE.GET
};

//reward history based on rewardType
export const GET_REWARD_HISTORY = {
  url: "/v1/reward/rewardHistory?reward_type={0}&page={1}&size={2}",
  reqType: REQUEST_TYPE.GET
};
export const GET_REFERRAL_REWARD_HISTORY = {
  url: "/v1/reward/referral/referralHistory?page={0}&size={1}",
  reqType: REQUEST_TYPE.GET
};

export const GET_TRADES = {
  url: "/v1/futures/query-trade?startTime={0}&endTime={1}",
  reqType: REQUEST_TYPE.GET
};

export const VALIDATE_REFERRAL_CODE = {
  url: "v1/user/referral-code/validate?referralCode={0}",
  reqType: REQUEST_TYPE.GET
};
