/* eslint-disable no-unused-vars */
import {
  GET_REFEREE_HISTORY,
  GET_REFERER_DETAILS,
  GET_TOTAL_REBATE_DETAILS,
  GET_REBATE_HISTORY,
  GET_REWARD_HISTORIES,
  GET_TRADES_LIST,
  GET_REFERRAL_REWARD_HISTORIES
} from "@/frontend-api-service/Api/Setting/Reward/Rewards";

export const getReferralEarningsByTimeFrame = (payload) => {
  const referralEarnings = GET_REFERER_DETAILS(payload).then(
    (result) => {
      const data = {
        totalVolume: result?.data?.total_referee_volume,
        totalReward: result?.data?.total_referrer_reward,
        level: result?.data?.reward_level ? `${result?.data?.reward_level}` : "--"
      };
      return data;
    },
    (error) => {
      const message = error.response;
      return {};
    }
  );
  return referralEarnings;
};

export const getReferralDetails = () => {
  const referralDetails = GET_REFEREE_HISTORY().then(
    (result) => {
      const refereeHistory = result?.data?.referees_data?.map((refereeData) => {
        // defined state format in UI
        const refereeDetailsRowState = {
          date: 0,
          email: "",
          kyc: "",
          status: ""
        };
        refereeDetailsRowState.date = new Date(refereeData.signup_date);
        refereeDetailsRowState.kyc = refereeData.kyc_status === "VERIFIED" ? "Verified" : refereeData.kyc_status === "FAILED" ? "Failed" : "Pending";
        refereeDetailsRowState.status = refereeData?.is_referral_active ? "active" : "expired";
        refereeDetailsRowState.email = refereeData?.email;

        return refereeDetailsRowState;
      });
      const referralCode = result?.data?.referrer_referral_code;
      return { refereeHistory, referralCode };
    },
    (error) => {
      const message = error.response;
      return { refereeHistory: [], referralCode: "" };
    }
  );
  return referralDetails;
};

export const getReferralRewardHistory = (rewardHistoryPayload) => {
  const rewardHistory = GET_REFERRAL_REWARD_HISTORIES(rewardHistoryPayload).then(
    (result) => {
      const data = result?.data?.referralHistory.map((reward, index) => {
        // defined state format in UI
        const referralRewardRowState = {
          internalId: 0,
          date: 0,
          reward: 0,
          status: ""
        };
        referralRewardRowState.internalId = index;
        referralRewardRowState.date = new Date(reward?.from_date);
        referralRewardRowState.reward = reward?.referrer_reward;
        referralRewardRowState.status = reward?.status.toLowerCase();
        return referralRewardRowState;
      });
      return { tableData: data, totalCount: result?.data?.totalCount };
    },
    (error) => {
      const message = error.response;
      return { tableData: [], totalCount: 0 };
    }
  );
  return rewardHistory;
};

export const getRebateEarningsByTimeFrame = (payload) => {
  const rebateEarnings = GET_TOTAL_REBATE_DETAILS(payload).then(
    (result) => {
      const data = {
        totalRebateRate: result?.data?.rebate_rate,
        totalRebateReward: result?.data?.total_rebate_reward,
        totalRebateFees: result?.data?.total_fees
      };
      return data;
    },
    (error) => {
      const message = error.response;
      return {};
    }
  );
  return rebateEarnings;
};

export const getRebateHistory = (payload) => {
  const rebateHistory = GET_REBATE_HISTORY(payload).then(
    (result) => {
      const data = result?.data?.rebateHistory.map((rebateDetails, index) => {
        const rebateHistoryRowState = {
          internalId: 0,
          date: 0,
          rebateCashback: 0,
          rebateRate: 0,
          fee: 0,
          status: ""
        };
        rebateHistoryRowState.internalId = index;
        rebateHistoryRowState.date = new Date(rebateDetails?.from_date);
        rebateHistoryRowState.fee = rebateDetails?.fees_paid;
        rebateHistoryRowState.rebateCashback = rebateDetails?.rebate_amount;
        rebateHistoryRowState.rebateRate = rebateDetails?.rebate_rate;
        rebateHistoryRowState.status = rebateDetails?.status.toLowerCase();
        return rebateHistoryRowState;
      });
      return { tableData: data, totalCount: result?.data?.totalCount };
    },
    (error) => {
      const message = error.response;
      return { tableData: [], totalCount: 0 };
    }
  );
  return rebateHistory;
};

export const getTaskRewardHistoryBasedOnType = (payload) => {
  const taskReward = GET_REWARD_HISTORIES({
    rewardType: payload.rewardType,
    size: payload.size,
    page: payload.page
  }).then(
    (result) => {
      const data = result?.data?.data.map((reward, index) => {
        const taskRewardRowData = {
          internalId: 0,
          date: 0,
          campaign: "",
          reward: 0,
          status: "",
          expiry: 0
        };
        taskRewardRowData.internalId = index;
        taskRewardRowData.date = new Date(reward?.created_at);
        taskRewardRowData.reward = reward?.reward_amount;
        taskRewardRowData.campaign = formatCampaignName(reward?.reward_type);
        taskRewardRowData.status = reward?.reward_status.toLowerCase();
        taskRewardRowData.expiry = reward?.expiry_time;
        return taskRewardRowData;
      });
      return data;
    },
    (error) => {
      const message = error.response;
      return [];
    }
  );
  return taskReward;
};

export const getTaskRewardHistory = async () => {
  const signUpRowData = await getTaskRewardHistoryBasedOnType({
    rewardType: "SIGNUP_REWARD",
    size: 1,
    page: 1
  });
  // NOTE: 1M Vol not required
  // const oneMillVolumeRowData = await getTaskRewardHistoryBasedOnType({ rewardType: "1M_VOLUME_REWARD", size: 1, page: 1 });
  const kycRowData = await getTaskRewardHistoryBasedOnType({
    rewardType: "KYC_REWARD",
    size: 1,
    page: 1
  });

  const taskRewardHistory = [...signUpRowData, ...kycRowData];
  return taskRewardHistory;
};

// NOTE: below action can be used in future for campaigns

// export const getTaskReward = () => {
//   const getTaskRewardData = GET_USER_TASK_REWARD().then(
//     (result) => {
//       const data = result?.data.map((rewardDetails, index) => {
//         const details = {
//           rewardName: formatCampaignName(rewardDetails?.reward_type),
//           reward: rewardDetails?.reward_amount
//         };
//         return details;
//       });
//       return data;
//     },
//     (error) => {
//       console.log(error.message);
//       return [];
//     }
//   );
//   return getTaskRewardData;
// };

export const getTotalTrades = (payload) => {
  const tradesCount = GET_TRADES_LIST(payload).then(
    (result) => result.data.totalCount,
    (error) => {
      console.log(error);
      return 0;
    }
  );

  return tradesCount;
};

// reward util
const formatCampaignName = (campaignName) => {
  if (campaignName === "SIGNUP_REWARD") {
    return "Sign Up";
  } else if (campaignName === "KYC_REWARD") {
    return "KYC";
  } else {
    return campaignName;
  }
};
