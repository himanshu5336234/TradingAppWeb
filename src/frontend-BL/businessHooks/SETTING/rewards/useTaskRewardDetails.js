/* eslint-disable brace-style */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTaskRewardHistory, getTotalTrades } from "../../../redux/actions/Setting/GetRewardData.ac";
import { REWARD_STATUS, REWARD_TYPE } from "./constants";

const useTaskRewardDetails = () => {
  const { verificationStatus, updatedAt } = useSelector((state) => ({
    verificationStatus: state.getKycDetails?.getKycDetails?.data?.status,
    updatedAt: state?.getKycDetails?.getKycDetails?.data?.updatedAt
  }));
  const signUpTime = useSelector((state) => state.profile?.profileDetails?.createdAt);
  const [taskRewardHistory, setTaskRewardHistory] = useState([]);
  const [taskRewardCards, setTaskRewardCards] = useState([]);
  const isUserVerified = verificationStatus === "VERIFIED";

  // get trades
  const totalTrades = async (dateRange) => {
    const totalTrades = await getTotalTrades({
      startTime: dateRange.startTime,
      endTime: dateRange.endTime
    });

    return totalTrades;
  };

  // function to get KYC Reward Status
  const getKYCRewardStatus = async () => {
    // get KYC when verified and updated datec
    const verifiedTime = updatedAt ?? new Date().getHours(0, 0, 0, 0);
    const resetVerifiedTimeToFirstSecond = new Date(verifiedTime).setHours(0, 0, 0, 0);
    const currentTime = new Date().getTime();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    const timeDifference = Math.abs(resetVerifiedTimeToFirstSecond - currentTime); // Calculate the absolute difference in milliseconds
    const daysDifference = Math.floor(timeDifference / millisecondsPerDay); // Number of Days
    // trades = check for number of trades between KYC update day and 7th day
    const trades = await totalTrades({
      startTime: resetVerifiedTimeToFirstSecond,
      endTime: new Date().getTime()
    });

    if (verificationStatus === "VERIFIED") {
      if (daysDifference <= 7) {
        // if trades >= 2 && (current time{day}  - sign up time{day}) <= 7 days -> REWARDED
        if (trades >= 2) {
          return REWARD_STATUS.REWARDED;
        }
        // if trades < 2  && (current time{day}  - sign up time{day}) <= 7 days -> ACTIVE
        else {
          return REWARD_STATUS.ACTIVE;
        }
      } else {
        // if trades < 2  && (current time{day}  - sign up time{day}) > 7 days -> if reward table shows expired -> EXPIRED
        if (trades < 2) {
          return REWARD_STATUS.EXPIRED;
        } else {
          return REWARD_STATUS.REWARDED;
        }
      }
    } else {
      return REWARD_STATUS.NOT_ACTIVE;
    }
  };

  // function to get Sign Up Reward Status
  // eslint-disable-next-line no-unused-vars
  const getSignUpRewardStatus = async () => {
    // reset to first second of sign up date
    const resetSignUpTimeToFirstSecond = new Date(signUpTime ?? new Date()).setHours(0, 0, 0, 0);
    const currentTime = new Date().getTime();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    const timeDifference = Math.abs(resetSignUpTimeToFirstSecond - currentTime); // Calculate the absolute difference in milliseconds
    const daysDifference = Math.floor(timeDifference / millisecondsPerDay); // Number of Days

    // trades = check for number of trades between sign up day and 7th day
    const trades = await totalTrades({
      startTime: signUpTime ?? new Date().getHours(0, 0, 0, 0),
      endTime: currentTime
    });
    if (daysDifference <= 7) {
      // if trades >= 1 && (current time{day}  - sign up time{day}) <= 7 days -> REWARDED
      if (trades >= 1) {
        return REWARD_STATUS.REWARDED;
      }
      // if trades < 1  && (current time{day}  - sign up time{day}) <= 7 days -> ACTIVE
      else {
        return REWARD_STATUS.ACTIVE;
      }
    } else {
      // if trades < 1  && (current time{day}  - sign up time{day}) > 7 days -> if reward table shows expired -> EXPIRED
      if (trades < 1) {
        return REWARD_STATUS.EXPIRED;
      } else {
        return REWARD_STATUS.REWARDED;
      }
    }
  };

  // function to add status for each task reward
  const addStatusForRewards = async (rewards) => {
    const KYCRewardStatus = await getKYCRewardStatus();
    // check if user has a signupReward
    const rewardsWithStatus = rewards.map((reward) => {
      if (reward.rewardName === REWARD_TYPE.KYC) {
        return { ...reward, rewardStatus: KYCRewardStatus };
      } else {
        return { ...reward, rewardStatus: "" };
      }
    });

    return rewardsWithStatus;
  };

  // get available task rewards
  const getTaskRewardCards = async (rewardHistoryHash) => {
    const rewardCards = [];
    const kycRewardDetails = {
      rewardName: REWARD_TYPE.KYC,
      reward: 5
    };

    // const signUpRewardDetails = {
    //   rewardName: REWARD_TYPE.SIGNUP,
    //   reward: 5
    // };

    // SIGN UP
    // check if present in REWARD HISTORY
    // if (rewardHistoryHash[REWARD_TYPE.SIGNUP]) {
    //   // YES -> create card
    //   rewardCards.push(signUpRewardDetails);
    // }

    // KYC
    // if user verified -> check if present in REWARD HISTORY -> add card
    if (verificationStatus === "VERIFIED") {
      if (rewardHistoryHash[REWARD_TYPE.KYC]) {
        rewardCards.push(kycRewardDetails);
      }
    } else {
      rewardCards.push(kycRewardDetails);
    }

    const rewardCardsWithStatus = await addStatusForRewards(rewardCards);

    return rewardCardsWithStatus;
  };

  const getTaskRewardData = async () => {
    const tableData = await getTaskRewardHistory();
    const rewardHistoryHash = {};
    tableData.forEach((reward) => (rewardHistoryHash[reward.campaign] = true));
    const rewardCards = await getTaskRewardCards(rewardHistoryHash);
    setTaskRewardHistory(tableData);
    setTaskRewardCards(rewardCards);
  };

  useEffect(() => {
    getTaskRewardData();
    // getTaskRewardCards();
  }, [signUpTime, verificationStatus, updatedAt]);

  return {
    taskRewardHistory,
    taskRewardCards,
    isUserVerified
  };
};

export default useTaskRewardDetails;
