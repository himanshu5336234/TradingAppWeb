import { GET_LEADERBOARD_AUTHENTICATED_DETAILS, GET_LEADERBOARD_UNAUTHENTICATED_DETAILS, GET_COMPETION_INFO, GET_RANK_BY_NICK_NAME } from "@/frontend-api-service/Api/LeaderBoard/LeaderBoard";

export const getRankByNickName = (payload) => {
  const listOfUsers = GET_RANK_BY_NICK_NAME({
    name: payload.name,
    filter: mapDuration(payload.duration)
  }).then(
    (result) => {
      const leaderBoardTableData = result.data.data.map((user, index) => {
        const rowData = {};
        rowData.internalId = index;
        rowData.userId = user?.userId ?? index;
        rowData.rank = user.rank === 0 ? "--" : user.rank;
        rowData.nickname = user.nickName;
        rowData.volume = user?.volume?.toFixed(1);
        rowData.winRate = user.winRate;
        rowData.favouritePair = user.favPair ? user.favPair : "--";

        return rowData;
      });
      return leaderBoardTableData;
    },
    (error) => {
      console.log(error.message);
      return [];
    }
  );
  return listOfUsers;
};

// authenticated
export const getUserRankDetails = (payload) => {
  const userRankDetails = GET_LEADERBOARD_AUTHENTICATED_DETAILS({
    count: payload.count,
    filter: mapDuration(payload.duration)
  }).then(
    (result) => {
      const userRank = result.data.data.myRank;
      if (userRank) {
        userRank.volume = userRank.volume.toFixed(1);
        userRank.rank = userRank.rank === 0 ? "---" : userRank.rank;
        userRank.favPair = userRank.favPair ? userRank.favPair : "--";
      }
      return userRank ?? {};
    },
    (error) => {
      const message = error.response;
      return {};
    }
  );
  return userRankDetails;
};

// unauthenticated
export const getLeaderBoardDetails = (payload) => {
  const leaderBoardDetails = GET_LEADERBOARD_UNAUTHENTICATED_DETAILS({
    count: payload.count,
    filter: mapDuration(payload.duration)
  }).then(
    (result) => {
      const winnersObj = {
        firstRank: {},
        secondRank: {},
        thirdRank: {}
      };
      result.data.data.winners.map((winner) => {
        const leader = {};
        leader.name = winner.nickName;
        leader.rank = winner.rank;
        leader.volume = winner.volume.toFixed(1);

        if (leader.rank === 1) {
          winnersObj.firstRank = leader;
        } else if (leader.rank === 2) {
          winnersObj.secondRank = leader;
        } else {
          winnersObj.thirdRank = leader;
        }

        return leader;
      });

      const leaderBoardTableData = result.data.data.allRank.map((user, index) => {
        const rowData = {};
        rowData.internalId = index;
        rowData.userId = user?.userId ?? index;
        rowData.rank = user.rank === 0 ? "--" : user.rank;
        rowData.nickname = user.nickName;
        rowData.volume = user.volume.toFixed(1);
        rowData.winRate = user.winRate;
        rowData.favouritePair = user.favPair ? user.favPair : "--";

        return rowData;
      });

      return { winnersObj, leaderBoardTableData };
    },
    (error) => {
      const message = error.response;
      return { winnersList: {}, leaderBoardTableData: [] };
    }
  );
  return leaderBoardDetails;
};

export const getCompetitionName = () => {
  const competitionName = GET_COMPETION_INFO().then(
    (result) => {
      // take index [0] for latest competition
      const competitionList = result.data.competition;
      if (competitionList.length > 0) {
        const LatestCompetitionName = competitionList[0].competitionName;
        return LatestCompetitionName;
      }

      return "";
    },
    (error) => {
      const message = error.response;
      return "";
    }
  );
  return competitionName;
};

// util
const mapDuration = (duration) => {
  if (duration === "day") return "H24";
  else if (duration === "week") return "Day7";
  else if (duration === "month") return "Day30";
  else return duration;
};
