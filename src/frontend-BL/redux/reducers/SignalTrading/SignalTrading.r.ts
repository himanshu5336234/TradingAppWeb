import {
  SET_LIST_OF_ANALYSTS,
  SET_ANALYST_ID,
  SET_USER_PERSONNA,
  SET_SYMBOLS_BARRED_FROM_PLACING_A_NEW_ORDER_IF_A_FOLLOWER,
  SET_OVERALL_SIGNAL_TRADING_STATS,
  SET_FOLLOWER_DETAILS,
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
  SET_ALL_SIGNAL_DATA_ADMIN,
  SET_ANALYST_SIGNALS_COUNT
} from "../../constants/Constants";

interface UserPersona {
  analystId: string;
  userType: string;
  analystStatus: string;
}

interface SignalListForAnalyst {
  signals: any[]; // Replace 'any' with actual signal type
  totalSignals: number;
}

interface State {
  analystsListedOnDensity: {
    data: any[]; // Replace 'any' with actual analyst type
    totalRecords: number;
  };
  analystIdIfAFollower: string;
  userPersonna: UserPersona;
  symbolsBarredFromPlacingANewOrderIfAFollower: any[]; // Replace 'any' with actual type
  overAllSignalTradingStats: any; // Replace 'any' with actual type
  followerDetails: any; // Replace 'any' with actual type
  analystDetailsFollowedByTheFollower: any; // Replace 'any' with actual type
  followerStats: any; // Replace 'any' with actual type
  liveSignalsForFollowers: any; // Replace 'any' with actual type
  completedSignalsForFollowers: any; // Replace 'any' with actual type
  rejectedSignalsForFollowers: any; // Replace 'any' with actual type
  analystDetailsForSelf: any; // Replace 'any' with actual type
  liveSignalsIssuedIfAnAnalyst: any; // Replace 'any' with actual type
  completedSignalsIfAnAnalyst: any; // Replace 'any' with actual type
  signalListForAnalyst: SignalListForAnalyst;
  signalTradingAllStats: any; // Replace 'any' with actual type
  allSignalsAdmin: {
    signals: [];
    totalSignalS: 0;
  };
  analystSignalsCount: {
    liveSignals: number;
    completedSignals: number;
  };
  liveSignalsFollowerCount: 0;
  completedSignalsFollowerCount: 0;
  rejectedSignalsFollowerCount: 0;
}

const initialState: State = {
  analystsListedOnDensity: {
    data: [],
    totalRecords: 0
  },
  analystIdIfAFollower: "",
  userPersonna: {
    analystId: "",
    userType: "",
    analystStatus: ""
  },
  signalsIssuedIfAnAnalyst: [],
  symbolsBarredFromPlacingANewOrderIfAFollower: [],
  overAllSignalTradingStats: {},
  followerDetails: {},
  analystDetailsFollowedByTheFollower: {},
  followerStats: {},
  liveSignalsForFollowers: {},
  completedSignalsForFollowers: {},
  rejectedSignalsForFollowers: {},
  analystDetailsForSelf: {},
  liveSignalsIssuedIfAnAnalyst: {},
  completedSignalsIfAnAnalyst: {},
  signalListForAnalyst: {
    signals: [],
    totalSignals: 0
  },
  signalTradingAllStats: {},
  allSignalsAdmin: {},
  analystSignalsCount: {
    liveSignals: 0,
    completedSignals: 0
  }
};

export default function reducer(state: State = initialState, action: { type: string; payload: any }): State {
  const { type, payload } = action;
  switch (type) {
    case SET_LIST_OF_ANALYSTS:
      return {
        ...state,
        analystsListedOnDensity: payload
      };
    case SET_ANALYST_ID:
      return {
        ...state,
        analystIdIfAFollower: payload
      };
    case SET_USER_PERSONNA:
      return {
        ...state,
        userPersonna: payload
      };
    case SET_SYMBOLS_BARRED_FROM_PLACING_A_NEW_ORDER_IF_A_FOLLOWER:
      return {
        ...state,
        symbolsBarredFromPlacingANewOrderIfAFollower: payload
      };
    case SET_OVERALL_SIGNAL_TRADING_STATS:
      return {
        ...state,
        overAllSignalTradingStats: payload
      };
    case SET_FOLLOWER_DETAILS:
      return {
        ...state,
        followerDetails: payload
      };
    case SET_ANALYST_FOLLOWED_BY_THE_FOLLOWER:
      return {
        ...state,
        analystDetailsFollowedByTheFollower: payload
      };
    case SET_FOLLOWER_STATS:
      return {
        ...state,
        followerStats: payload
      };
    case SET_LIVE_SIGNALS_FOR_FOLLOWERS:
      return {
        ...state,
        liveSignalsForFollowers: payload
      };
    case SET_COMPLETED_SIGNALS_FOR_FOLLOWERS:
      return {
        ...state,
        completedSignalsForFollowers: payload
      };
    case SET_REJECTED_SIGNALS_FOR_FOLLOWERS:
      return {
        ...state,
        rejectedSignalsForFollowers: payload
      };
    case SET_ANALYST_DETAILS_FOR_SELF:
      return {
        ...state,
        analystDetailsForSelf: payload
      };
    case SET_LIVE_SIGNALS_IF_AN_ANALYST:
      return {
        ...state,
        liveSignalsIssuedIfAnAnalyst: payload
      };
    case SET_COMPLETED_SIGNALS_IF_AN_ANALYST:
      return {
        ...state,
        completedSignalsIfAnAnalyst: payload
      };
    case SET_SIGNAL_LIST_FOR_ANALYST:
      return {
        ...state,
        signalListForAnalyst: payload
      };
    case SET_TRADING_STATS:
      return {
        ...state,
        signalTradingAllStats: payload
      };
    case SET_ALL_SIGNAL_DATA_ADMIN:
      return {
        ...state,
        allSignalsAdmin: payload
      };
    case SET_ANALYST_SIGNALS_COUNT:
      return {
        ...state,
        analystSignalsCount: payload
      };
    default:
      return state;
  }
}
