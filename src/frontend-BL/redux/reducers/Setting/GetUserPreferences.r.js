import {
  GET_USER_PREFERENCES_CONFIRMATION_SUCCESS,
  GET_USER_PREFERENCES_EMAIL_ALERT_SUCCESS,
  GET_USER_PREFERENCES_FAIL,
  GET_USER_PREFERENCES_SUCCESS,
  IS_LOW_END_DEVICE,
  NOT_A_LOW_END_DEVICE
} from "../../constants/Constants";

const initialState = {
  UserPreferences: {
    isLowEndDevice: null,
    userId: 123,
    preferences: {
      email_alert: [
        {
          alert_type: "Stop Loss",
          alert_preference: true
        },
        {
          alert_type: "Margin",
          alert_preference: false
        }
      ],
      confirmation: [
        {
          preference_type: "Limit Order",
          preference_value: false
        },
        {
          preference_type: "Market Order",
          preference_value: false
        },
        {
          preference_type: "Stop Market Order",
          preference_value: true
        }
      ]
    }
  }
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case IS_LOW_END_DEVICE:
      return {
        ...state,
        UserPreferences: {
          ...state.UserPreferences,
          isLowEndDevice: true
        }
      };
    case NOT_A_LOW_END_DEVICE:
      return {
        ...state,
        UserPreferences: {
          ...state.UserPreferences,
          isLowEndDevice: false
        }
      };
    case GET_USER_PREFERENCES_SUCCESS:
      return {
        ...state,
        UserPreferences: payload
      };
    case GET_USER_PREFERENCES_EMAIL_ALERT_SUCCESS:
      return {
        ...state,
        UserPreferences: {
          ...state.UserPreferences,
          preferences: {
            ...state.UserPreferences.preferences,
            email_alert: payload
          }
        }
      };
    case GET_USER_PREFERENCES_CONFIRMATION_SUCCESS:
      return {
        ...state,
        UserPreferences: {
          ...state.UserPreferences,
          preferences: {
            ...state.UserPreferences.preferences,
            confirmation: payload
          }
        }
      };
    case GET_USER_PREFERENCES_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
