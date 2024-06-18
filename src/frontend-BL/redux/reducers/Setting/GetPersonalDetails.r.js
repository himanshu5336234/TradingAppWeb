const initialState = {
  PersonalDetails: {
    basicDetails: {
      firstName: "",
      lastName: "",
      nameAsPerPAN: "",
      lastActive: "",
      mobile_number: "",
      email: "",
      kyc_status: ""
    },
    personalInfo: {
      userAvatarUrl: ""
    }
  },
  renderingStop: false,
  binanceWebWorkerInstance: undefined,
  ticketSymbolList: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_USER_AVATAR_SUCCESS":
      return {
        ...state,
        PersonalDetails: {
          ...state.PersonalDetails,
          personalInfo: {
            ...state.PersonalDetails.personalInfo,
            userAvatarUrl: payload
          }
        }
      };
    case "GET_BASIC_DETAILS": {
      return {
        ...state,
        PersonalDetails: {
          ...state.PersonalDetails,
          basicDetails: payload
        }
      };
    }
    case "PAUSE_RENDERING":
      return {
        ...state,
        renderingStop: true
      };
    case "RESUME_RENDERING":
      return {
        ...state,
        renderingStop: false
      };
    case "SET_BINACE_INSTANCE": {
      return {
        ...state,
        binanceWebWorkerInstance: payload
      };
    }
    case "SET_SUBSCRIPTION_SYMBOL": {
      return {
        ...state,
        ticketSymbolList: payload
      };
    }
    default:
      return state;
  }
}
