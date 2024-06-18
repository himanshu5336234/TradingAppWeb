import {
  getUserPersonnaForSignalTrading,
  getAnalystList,
  getOverallSignalTradingStatisticsInThePlatform,
  followerDetails,
  getFollowerPerformance,
  getSignalListForFollower,
  getSignalListForAnalyst,
  getAlltheSignalsAsAdmin
} from "@/frontend-api-service/Api/SignalTrading/SignalTrading";

import {
  SET_USER_PERSONNA,
  SET_LIST_OF_ANALYSTS,
  // SET_OVERALL_SIGNAL_TRADING_STATS,
  SET_FOLLOWER_DETAILS,
  SET_ANALYST_ID,
  SET_ANALYST_FOLLOWED_BY_THE_FOLLOWER,
  SET_FOLLOWER_STATS,
  SET_LIVE_SIGNALS_FOR_FOLLOWERS,
  SET_COMPLETED_SIGNALS_FOR_FOLLOWERS,
  SET_REJECTED_SIGNALS_FOR_FOLLOWERS,
  SET_ANALYST_DETAILS_FOR_SELF,
  SET_LIVE_SIGNALS_IF_AN_ANALYST,
  SET_COMPLETED_SIGNALS_IF_AN_ANALYST,
  SET_SIGNAL_LIST_FOR_ANALYST,
  SET_TRADING_STATS,
  SET_ALL_SIGNAL_DATA_ADMIN
} from "../../constants/Constants";

export const fetchUserPersonna = () => (dispatch: Function) => {
  getUserPersonnaForSignalTrading().then((userPersonna: any) => {
    dispatch({
      type: SET_USER_PERSONNA,
      payload: {
        userType: userPersonna.data.userPersona,
        analystId: userPersonna.data.analystId,
        analystStatus: userPersonna.data.analystStatus
      }
    });
  });
};

export const fetchListOfAvailableAnalysts = ({
  analystId = null,
  fromDate = null,
  status = null,
  ToDate = null,
  pageNumber = null,
  size = null,
  statsTimeWindow = null
}: {
  analystId?: number | null;
  fromDate?: string | null;
  status?: string | null;
  ToDate?: string | null;
  pageNumber?: number | null;
  size?: number | null;
  statsTimeWindow?: string | null;
}) => {
  return (dispatch: Function) => {
    getAnalystList({
      analystId,
      fromDate,
      status,
      ToDate,
      pageNumber,
      size,
      statsTimeWindow
    }).then((analystList: any) => {
      dispatch({
        type: SET_LIST_OF_ANALYSTS,
        payload: {
          data: analystList.data.data,
          totalRecords: analystList.data.totalRecords
        }
      });
    });
  };
};

export const fetchFollowedAnalyst = ({ analystId = null }: { analystId?: string | null }) => {
  return (dispatch: Function) => {
    getAnalystList({ analystId }).then((analyst: any) => {
      dispatch({
        type: SET_ANALYST_FOLLOWED_BY_THE_FOLLOWER,
        payload: analyst.data.data[0]
      });
    });
  };
};

export const fetchAnalystDetailsForSelf = ({ analystId = null, statsTimeWindow }: { analystId?: number | null; statsTimeWindow: string }) => {
  return (dispatch: Function) => {
    getAnalystList({ analystId, statsTimeWindow }).then((analyst: any) => {
      dispatch({
        type: SET_ANALYST_DETAILS_FOR_SELF,
        payload: analyst.data.data[0]
      });
    });
  };
};

export const fetchSignalTradingOverAllStats = () => {
  return (dispatch) => {
    getOverallSignalTradingStatisticsInThePlatform().then((overAllSignalTradingStats) => {
      dispatch({
        type: SET_TRADING_STATS,
        payload: overAllSignalTradingStats.data.data
      });
    });
  };
};

export const fetchFollowerDetails = ({ status }: { status: string }) => {
  return (dispatch: Function) => {
    followerDetails(status).then((followerDetails: any) => {
      dispatch({
        type: SET_FOLLOWER_DETAILS,
        payload: followerDetails.data.data
      });
      dispatch({
        type: SET_ANALYST_ID,
        payload: followerDetails.data.data[0].analystId
      });
    });
  };
};

export const fetchFollowerStats = (analystId?: number | null, startTime?: string | null, endTime?: string | null, statusTimeWindow?: string | null) => {
  return (dispatch: Function) => {
    getFollowerPerformance({
      analystId,
      startTime,
      endTime,
      statusTimeWindow
    }).then((followerStats: any) => {
      dispatch({
        type: SET_FOLLOWER_STATS,
        payload: followerStats.data
      });
    });
  };
};

export const fetchSignalListForFollowers = (
  analystId?: string | null,
  endTime?: string | null,
  pageNumber?: number | null,
  pageSize?: number | null,
  signalId?: string | null,
  startTime?: string | null,
  status?: string | null,
  symbol?: string | null
) => {
  return (dispatch: Function) => {
    getSignalListForFollower({
      analystId,
      endTime,
      pageNumber,
      pageSize,
      signalId,
      startTime,
      status,
      symbol
    }).then((signalsList: any) => {
      switch (status) {
        case "LIVE":
          dispatch({
            type: SET_LIVE_SIGNALS_FOR_FOLLOWERS,
            payload: signalsList.data
          });
          break;
        case "COMPLETED":
          dispatch({
            type: SET_COMPLETED_SIGNALS_FOR_FOLLOWERS,
            payload: signalsList.data
          });
          break;
        case "REJECTED":
          dispatch({
            type: SET_REJECTED_SIGNALS_FOR_FOLLOWERS,
            payload: signalsList.data
          });
          break;
      }
    });
  };
};

export const fetchAllSignalListForAnalyst = ({ analystId, pageSize, pageNumber }: { analystId: string; pageSize: number; pageNumber: number }) => {
  return (dispatch: Function) => {
    getSignalListForAnalyst({ analystId, pageSize, pageNumber }).then((signals: any) => {
      dispatch({
        type: SET_SIGNAL_LIST_FOR_ANALYST,
        payload: {
          signals: signals.data.data,
          totalSignals: signals.data.totalRecords
        }
      });
    });
  };
};

export const fetchSignalListForAnAnalyst = (
  endTime?: string | null,
  analystId?: string | null,
  orderSide?: string | null,
  pageNumber?: number | null,
  pageSize?: number | null,
  signalId?: string | null,
  startTime?: string | null,
  status?: string | null,
  symbol?: string | null
) => {
  return (dispatch: Function) => {
    getSignalListForAnalyst({
      endTime,
      analystId,
      orderSide,
      pageNumber,
      pageSize,
      signalId,
      startTime,
      status,
      symbol
    }).then((signalList: any) => {
      if (status && status.includes("NEW")) {
        dispatch({
          type: SET_LIVE_SIGNALS_IF_AN_ANALYST,
          payload: signalList.data
        });
      } else {
        dispatch({
          type: SET_COMPLETED_SIGNALS_IF_AN_ANALYST,
          payload: signalList.data
        });
      }
    });
  };
};

export const fetchAlltheSignalsAsAdmin =
  ({ analystId, pageNumber, pageSize }: { analystId: string; pageNumber: number; pageSize: number }) =>
  (dispatch: Function) => {
    getAlltheSignalsAsAdmin({ analystId, pageNumber, pageSize }).then((signals: any) => {
      dispatch({
        type: SET_ALL_SIGNAL_DATA_ADMIN,
        payload: {
          signals: signals.data.data,
          totalSignals: signals.data.totalRecords
        }
      });
    });
  };

export const fetchSignalToBeDeleted = (signalId: string) => {
  return getSignalListForAnalyst({ signalId })
    .then((res: any) => res.data.data)
    .catch((err: any) => console.log("err", err));
};
