import { REQUEST_TYPE } from "../Base";

// API End Points
export const POSITION_RISK = {
  url: "/fapi/v2/positionRisk?symbol={0}",
  reqType: REQUEST_TYPE.GET
};

export const OPEN_ORDERS = {
  url: "/v1/futures/source-order/open",
  reqType: REQUEST_TYPE.GET
};

export const ORDER_HISTORY = {
  url: "/fapi/v1/allOrders?symbol={0}",
  reqType: REQUEST_TYPE.GET
};

export const ALL_ORDER_HISTORY = {
  url: "/fapi/user/order",
  reqType: REQUEST_TYPE.GET
};

export const TRADE_HISTORY = {
  // url: "/fapi/v1/userTrades?symbol={0}",
  url: "/fapi/v1/userTrades",
  reqType: REQUEST_TYPE.GET
};

export const TRANSACTION_HISTORY = {
  url: "/v2/futures/account/income-transaction?incomeType={0}&symbol={1}&pageSize={2}&cursor={3}",
  reqType: REQUEST_TYPE.GET
};
export const TRADE_ID_DATA = {
  url: "/v1/futures/order/trade/{0}",
  reqType: REQUEST_TYPE.GET
};
export const CHANGE_PASSWORD = {
  url: `/change_password`,
  reqType: REQUEST_TYPE.POST
};

export const UPDATE_PROFILE = {
  url: "/update_profile",
  reqType: REQUEST_TYPE.POST
};

export const GET_PROFILE = {
  url: "v1/user/profile",
  reqType: REQUEST_TYPE.GET
};

export const SET_PROFILE = {
  url: "v1/user/profile",
  reqType: REQUEST_TYPE.PATCH
};

export const SET_LEVERAGE = {
  url: "/v2/futures/account/leverage",
  reqType: REQUEST_TYPE.PUT
};

export const FETCH_LEVERAGE = {
  url: "/v2/futures/account/leverage",
  reqType: REQUEST_TYPE.GET
};

export const SET_MARGIN = {
  url: "/fapi/v1/marginType?symbol={0}&marginType={1}",
  reqType: REQUEST_TYPE.POST
};

export const UPLOAD_IMAGE = {
  url: "/upload_image",
  reqType: REQUEST_TYPE.POST
};

export const GET_SPOT_ACCOUNT_DETAILS = {
  url: "/api/v3/account",
  reqType: REQUEST_TYPE.GET
};

export const GET_FUTURES_ACCOUNT_DETAILS = {
  url: "/v2/futures/accounts/accountId12/info",
  reqType: REQUEST_TYPE.GET
};
export const GET_FUTURES_POSITION = {
  url: "/v2/futures/account/positions",
  reqType: REQUEST_TYPE.GET
};

export const GENERATE_WS_TOKEN = {
  url: "/token",
  reqType: REQUEST_TYPE.POST
};

// export const GET_OPEN_INTEREST = {
//   url: "/fapi/v1/openInterest?symbol={0}",
//   reqType: REQUEST_TYPE.GET
// };

export const GET_24HR_TICKER = {
  url: "/fapi/v1/ticker/24hr?symbol={0}",
  reqType: REQUEST_TYPE.GET
};

export const GET_SYMBOL_LIST = {
  url: "/fapi/v1/exchangeInfo",
  reqType: REQUEST_TYPE.GET
};

export const GET_TOP_X_TRADABLE_SYMBOL_LIST = {
  url: "/tradeable-symbol",
  reqType: REQUEST_TYPE.GET
};

export const AVAILABLE_BALANCE = {
  url: "/fapi/v2/balance",
  reqType: REQUEST_TYPE.GET
};

export const TICKER_SNAPSHOT = {
  url: "/tradeable-symbol/24hour-ticker",
  reqType: REQUEST_TYPE.GET
};

export const ORDER_BOOK = {
  url: "/ws/order-book?symbol={0}",
  reqType: REQUEST_TYPE.GET
};

export const MARKET_TRADES = {
  url: "/fapi/v1/trades?symbol={0}",
  reqType: REQUEST_TYPE.GET
};

export const USER_TRADES = {
  url: "/fapi/v1/allOrders?symbol={0}",
  reqType: REQUEST_TYPE.GET
};

export const LEVERAGE_BRACKET = {
  url: "/v2/futures/account/leverage-bracket",
  reqType: REQUEST_TYPE.GET
};
export const UPDATE_KYC_DETAILS = {
  url: "/v2/kyc",
  reqType: REQUEST_TYPE.PUT
};
export const GET_KYC_DETAILS = {
  url: "/v2/kyc",
  reqType: REQUEST_TYPE.GET
};
export const PAN_VALIDATION = {
  url: "/v2/kyc/validate/pan",
  reqType: REQUEST_TYPE.POST
};
export const INITIATE_KYC_ = {
  url: "/v2/kyc",
  reqType: REQUEST_TYPE.POST
};
export const NEW_KYC_STEP_VERIFICATION = {
  url: "/v1/kyc/step",
  reqType: REQUEST_TYPE.GET
};

export const NEW_BANK_VERIFICATION = {
  url: "/v1/bankAccounts",
  reqType: REQUEST_TYPE.GET
};
export const NEW_ADD_BANK_ACCOUNT = {
  url: "/v1/bankAccounts",
  reqType: REQUEST_TYPE.POST
};
export const NEW_GET_BANK_ACCOUNT_STATUS = {
  url: "/v1/bankAccounts",
  reqType: REQUEST_TYPE.GET
};
export const NEW_UPDATE_BANK_ACCOUNT = {
  url: "/v1/bankAccounts",
  reqType: REQUEST_TYPE.PATCH
};
export const NEW_DELETE_BANK_ACCOUNT = {
  url: "/v1/bankAccounts",
  reqType: REQUEST_TYPE.DELETE
};
export const INITIATE_KYC = {
  url: "/v2/kyc",
  reqType: REQUEST_TYPE.POST
};
export const REGENERATE_KYC = {
  url: "/v2/kyc/regenerate-token",
  reqType: REQUEST_TYPE.POST
};

export const COMPLETE_KYC = {
  url: "/kyc/update",
  reqType: REQUEST_TYPE.POST
};

export const LAST_TRADED_PRICE_FOR_SYMBOLS = {
  url: "/api/v3/ticker/price",
  reqType: REQUEST_TYPE.GET
};

export const CONVERT_ASSETS_SPOT = {
  url: "/api/v3/convert?sellingAsset={0}&buyingAsset={1}&origQty={2}",
  reqType: REQUEST_TYPE.POST
};

export const POST_METADATA = {
  url: "v1/user/metadata",
  reqType: REQUEST_TYPE.POST
};

export const GET_METADATA = {
  url: "v1/user/metadata",
  reqType: REQUEST_TYPE.GET
};

export const UPDATE_BANK_DETAILS = {
  url: "/v1/bankAccounts",
  reqType: REQUEST_TYPE.POST
};

export const FETCH_FIAT_BALANCE = {
  url: "/v1/fiat/balance",
  reqType: REQUEST_TYPE.GET
};

export const FETCH_FIAT_TRANSACTION_HISTORY = {
  url: "/v1/fiat/transactions",
  reqType: REQUEST_TYPE.GET
};

export const FETCH_DENSITY_BANK_ACCOUNT_DETAILS = {
  url: "/v1/fiat/master-deposit-accounts",
  reqType: REQUEST_TYPE.GET
};

export const FIAT_DEPOSIT = {
  url: "/v1/fiat/transactions/deposit",
  reqType: REQUEST_TYPE.POST
};

export const FIAT_EXCHANGE_RATE_PER_USDT = {
  url: "/v1/fiat/crypto-conversion-rate/USDT",
  reqType: REQUEST_TYPE.GET
};

export const FIAT_SELL_USDT = {
  url: "/v1/account/trade-asset",
  reqType: REQUEST_TYPE.POST
};
export const FIAT_BUY_USDT = {
  url: "/v1/fiat/transactions/convertToCryptoAsset",
  reqType: REQUEST_TYPE.POST
};

export const GENERTATE_OTP = {
  url: "/v1/otpValidation",
  reqType: REQUEST_TYPE.POST
};

export const FIAT_WITHDRAW = {
  url: "/v1/fiat/transactions/withdrawal",
  reqType: REQUEST_TYPE.POST
};

// TODO: Modify This
export const PLACE_ORDER = {
  url: "/v2/futures/orders",
  reqType: REQUEST_TYPE.POST
};
export const CLOSE_ORDER = {
  url: "/v2/futures/account/positions",
  reqType: REQUEST_TYPE.DELETE
};
export const PLACE_ORDER_LIMIT = {
  url: "fapi/v1/order?symbol={0}&side={1}&type={2}&quantity={3}&price={4}&reduceOnly=true&timeInForce=GTC",
  reqType: REQUEST_TYPE.POST
};

export const CANCEL_ORDER = {
  url: "/v2/futures/orders/open/{0}",
  reqType: REQUEST_TYPE.DELETE
};

export const ADD_REMOVE_MARGIN = {
  url: "/v1/account/position/margin",
  reqType: REQUEST_TYPE.PUT
};

export const CLOSE_ALL_POSITIONS = {
  url: "/v2/futures/account/positions",
  reqType: REQUEST_TYPE.DELETE
};

export const PORTFOLIO_STATISTICS_YESTERDAY = {
  url: "/fapi/v1/portfolio/dashboard?startTime={0}&endTime={1}",
  reqType: REQUEST_TYPE.GET
};

export const FETCH_ALL_OPEN_ORDERS = {
  url: "/v2/futures/orders/query?accountUuid={0}&status={1}",
  reqType: REQUEST_TYPE.GET
};

export const CURRENT_STATUS = {
  url: "/fapi/v2/account/status",
  reqType: REQUEST_TYPE.GET
};

export const SERVER_DOWN_HELPER = {
  url: "/server-down-helper"
};

export const SIGNIN_URL = {
  url: "/auth/signin",
  reqType: REQUEST_TYPE.POST
};

export const SIGNINUP_URL = {
  url: "/auth/signinup",
  reqType: REQUEST_TYPE.POST
};

export const CREATE_OTP_URL = {
  url: "/auth/signinup/code",
  reqType: REQUEST_TYPE.POST
};

export const CONSUME_OTP_URL = {
  url: "/auth/signinup/code/consume",
  reqType: REQUEST_TYPE.POST
};

export const RESEND_OTP_URL = {
  url: "/auth/signinup/code/resend",
  reqType: REQUEST_TYPE.POST
};

export const FORGOT_PASSWORD_URL = {
  url: "/auth/user/password/reset/token",
  reqType: REQUEST_TYPE.POST
};

export const RESET_PASSWORD_URL = {
  url: "/auth/user/password/reset",
  reqType: REQUEST_TYPE.POST
};

export const RESEND_EMAIL_VERIFICATION_OTP_URL = {
  url: "/auth/email-verification/resend",
  reqType: REQUEST_TYPE.POST
};

export const SIGNUP_URL = {
  url: "/auth/signup",
  reqType: REQUEST_TYPE.POST
};

export const EMAIL_VERIFICATION_OTP_CREATE = {
  url: "/auth/email-verification/create",
  reqType: REQUEST_TYPE.POST
};

export const EMAIL_VERIFICATION_OTP_RESEND = {
  url: "/auth/email-verification/resend",
  reqType: REQUEST_TYPE.POST
};

export const GET_AUTHORISATION_URL = {
  url: "/auth/authorisationurl?thirdPartyId=google",
  reqType: REQUEST_TYPE.GET
};

export const API_ORDER_DETAILS = {
  url: "fapi/user/order?origClientOrderId={0}",
  reqType: REQUEST_TYPE.GET
};

export const CREATE_OTOCO_ORDER = {
  url: "/fapi/v1/otoOrder?parentOrder={0}&childOrders={1}",
  reqType: REQUEST_TYPE.POST
};

export const CREATE_OCO_ORDER = {
  url: "/fapi/v1/otoOrder?childOrders={0}&onlyOCO=true",
  reqType: REQUEST_TYPE.POST
};

export const GET_OTOCO_ORDER_DETAILS = {
  url: "/fapi/v1/otoOrder?symbol={0}&orderId={1}",
  reqType: REQUEST_TYPE.GET
};

export const CREATE_API_KEY = {
  url: "/v1/auth/apiKeys",
  reqType: REQUEST_TYPE.POST
};

export const GET_AUTH_KEYS = {
  url: "/v1/auth/apiKeys",
  reqType: REQUEST_TYPE.GET
};

export const DELETE_AUTH_KEY = {
  url: "/v1/auth/apiKeys/{0}",
  reqType: REQUEST_TYPE.PATCH
};

export const VALIDATE_OTP = {
  url: "/v1/otpValidation",
  reqType: REQUEST_TYPE.POST
};

// export const CHART_URLS = {
//   SAVE_CHART: {
//     url: "1.1/charts?client={0}&user={1}&chart={2}",
//     reqType: REQUEST_TYPE.POST
//   },
//   LOAD_CHART: {
//     url: "1.1/charts?client={0}&user={1}&chart={2}",
//     reqType: REQUEST_TYPE.GET
//   },
//   LIST_CHARTS: {
//     url: "1.1/charts?client={0}&user={1}",
//     reqType: REQUEST_TYPE.GET
//   },
//   DELETE_CHART: {
//     url: "1.1/charts?client={0}&user={1}&chart={2}",
//     reqType: REQUEST_TYPE.DELETE
//   },
//   SAVE_STUDY_TEMPLATE: {
//     url: "1.1/study_templates?client={0}&user={1}&template={2}",
//     reqType: REQUEST_TYPE.POST
//   },
//   LOAD_STUDY_TEMPLATE: {
//     url: "1.1/study_templates?client={0}&user={1}&template={2}",
//     reqType: REQUEST_TYPE.GET
//   },
//   LIST_STUDY_TEMPLATE: {
//     url: "1.1/study_templates?client={0}&user={1}",
//     reqType: REQUEST_TYPE.GET
//   },
//   DELETE_STUDY_TEMPLATE: {
//     url: "1.1/study_templates?client={0}&user={1}&template={2}",
//     reqType: REQUEST_TYPE.DELETE
//   }
// };

export const FETCH_ORDER_HISTORY = {
  url: "/v2/futures/orders/query?accountUuid={0}&StartTime={1}&Endtime={2}&symbol={3}&orderType={4}&side={5}&reduceOnly={6}&pageSize={7}&cursor={8}",
  reqType: REQUEST_TYPE.GET
};
export const FETCH_TRADES_BASED_ON_ID = {
  url: "/v2/futures/orders/{0}/trades",
  reqType: REQUEST_TYPE.GET
};

export const FETCH_PNL_HISTORY = {
  // url: "/v1/portfolio/aggregate-trades?startTime={0}&endtime={1}&symbol={2}&size={3}&start={4}&side={5}",
  url: "v1/portfolio/position-history?start={0}&size={1}&symbol={2}&startTime={3}&endTime={4}",
  reqType: REQUEST_TYPE.GET
};
export const FETCH_PNL_TRADES = {
  url: "v1/futures/order",
  reqType: REQUEST_TYPE.GET
};
export const GENERATE_TOKEN = {
  url: "/v1/token",
  reqType: REQUEST_TYPE.POST
};

export const SESSION_SIGNIN_URL = {
  url: "/v1/signin/emailpassword",
  reqType: REQUEST_TYPE.POST
};
export const PNL_LINE_CHART = {
  url: "/v1/portfolio/pnl/history?startTime={0}&endTime={1}",
  reqType: REQUEST_TYPE.GET
};

export const GET_USER_REFERRAL_CODE = {
  url: "v1/user/referral-code",
  reqType: REQUEST_TYPE.GET
};

export const POST_REFERRAL_CODE = {
  url: "v1/user/referral-code",
  reqType: REQUEST_TYPE.POST
};

export const GET_REFERRAL_STATUS = {
  url: "v1/user/referral-code/status",
  reqType: REQUEST_TYPE.GET
};

export const REQUEST_DOWNLOAD_HISTORY = {
  url: "/v1/portfolio/link",
  reqType: REQUEST_TYPE.POST
};

export const GET_HISTORY_DOWNLOADLINK = {
  url: "/v1/portfolio/link?fileID={0}",
  reqType: REQUEST_TYPE.GET
};

export const GET_MARGIN_TYPE = {
  url: "/v2/futures/account/margin-type?symbol={0}",
  reqType: REQUEST_TYPE.GET
};

export const CHANGE_MARGIN_TYPE = {
  url: "/v2/futures/account/margin-type",
  reqType: REQUEST_TYPE.PUT
};

export const GET_MARKET_NEWS = {
  url: "/v1/crypto-news?topic={0}",
  reqType: REQUEST_TYPE.GET
};
export const GET_ECONOMIC_CALENDER_DATA = {
  url: "/v1/economic-calender?fromDate={0}&toDate={1}&size={2}&page={3}",
  reqType: REQUEST_TYPE.GET
};
export const QUICK_ORDER = {
  url: "futures/data/topLongShortPositionRatio?symbol={0}&period=5m",
  reqType: REQUEST_TYPE.GET
};

export const GET_STRATEGY_ORDER_DATA = {
  url: "/v2/futures/orders/strategy?symbol={0}",
  reqType: REQUEST_TYPE.GET
};

export const PLACE_STRATEGY_ORDER = {
  url: "/v2/futures/orders/strategy",
  reqType: REQUEST_TYPE.POST
};

export const CANCEL_ALL_STRATEGY_ORDER = {
  url: "/v2/futures/orders/open/cancel",
  reqType: REQUEST_TYPE.POST
};

export const GET_STRATEGY_ORDER_DATA_BY_ID = {
  url: "/v2/futures/orders/meta?metadata[TRIGGER_ORDER_ID]={0}",
  reqType: REQUEST_TYPE.GET
};
export const UPDATE_STRATEGY_ORDER = {
  url: "/v2/futures/orders",
  reqType: REQUEST_TYPE.PUT
};
export const CANCEL_STRATEGY_ORDER_BY_ID = {
  url: "/v1/futures/order/{0}/{1}",
  reqType: REQUEST_TYPE.DELETE
};
export const GET_MARK_PRICE_SANPSHOT = {
  url: "/fapi/v1/premiumIndex?symbol={0}",
  reqType: REQUEST_TYPE.GET
};
export const GET_LTP_SNAPSHOT = {
  url: "/fapi/v1/ticker/price?symbol={0}",
  reqType: REQUEST_TYPE.GET
};
export const GET_ORDER_BOOK_SNAPSHOT = {
  url: "/fapi/v1/depth?symbol={0}&limit={1}",
  reqType: REQUEST_TYPE.GET
};
export const GET_ORDER_DETAILS_BY_ID = {
  url: "/v1/futures/order",
  reqType: REQUEST_TYPE.GET
};

// Signal Trading API Contract

export const GET_ANALYST_LIST = {
  url: "/v1/st/analyst",
  reqType: REQUEST_TYPE.GET
};

export const DELETE_ANALYST_REQUEST = {
  url: "/v1/st/analyst",
  reqType: REQUEST_TYPE.DELETE
};

export const BECOME_AN_ANALYST = {
  url: "/v1/st/analyst",
  reqType: REQUEST_TYPE.POST
};

export const FOLLOW_AN_ANALYST = {
  url: "/v1/st/follow",
  reqType: REQUEST_TYPE.POST
};

export const GET_LIST_OF_SIGNALS_FOR_AN_ANALYST = {
  url: "/v1/st/signal",
  reqType: REQUEST_TYPE.GET
};

export const GET_LIST_OF_SIGNALS_FOR_FOLLOWERS = {
  url: "/v1/st/follower/signals",
  reqType: REQUEST_TYPE.GET
};

export const UPDATE_SIGNAL_CREATED_BY_AN_ANALYST = {
  url: "/v1/st/signal",
  reqType: REQUEST_TYPE.PUT
};

export const CREATE_NEW_SIGNAL = {
  url: "/v1/st/signal",
  reqType: REQUEST_TYPE.POST
};

export const DELETE_A_SIGNAL = {
  url: "/v1/st/signal/",
  reqType: REQUEST_TYPE.DELETE
};

export const UNFOLLOW_AN_ANALYST = {
  url: "/v1/st/unfollow",
  reqType: REQUEST_TYPE.PATCH
};

export const UPDATE_RISK_FOR_A_FOLLOWER = {
  url: "/v1/st/follower",
  reqType: REQUEST_TYPE.PATCH
};

export const PUBLISH_A_LIVE_SIGNAL = {
  url: "/v1/st/signal/publish",
  reqType: REQUEST_TYPE.POST
};

export const GET_OVERALL_SIGNAL_TRADING_STATS_IN_PLATFORM = {
  url: "/v1/st/stats",
  reqType: REQUEST_TYPE.GET
};

export const GET_USER_PERSONNA = {
  url: "/v1/st/user-persona",
  reqType: REQUEST_TYPE.GET
};

export const FOLLOWER_PERFORMANCE = {
  url: "/v1/st/follower/stats",
  reqType: REQUEST_TYPE.GET
};

export const FOLLOWER_DETAILS = {
  url: "/v1/st/following?status={0}",
  reqType: REQUEST_TYPE.GET
};

export const CANCEL_PUBLISHED_SIGNAL = {
  url: "/v1/st/signal/cancel",
  reqType: REQUEST_TYPE.POST
};

export const ALL_SIGNALS_OF_AN_ANALAYST_ADMIN = {
  url: "/v1/st/admin/signal",
  reqType: REQUEST_TYPE.GET
};

// Portfolio - V2 API's
export const GET_PORTFOLIO_SUMMARY = {
  url: "/v1/portfolio/pnl?startTime={0}&endTime={1}",
  reqType: REQUEST_TYPE.GET
};
export const GET_PORTFOLIO_PNL_DAILY = {
  url: "/v1/portfolio/pnl/dailyHistory?startTime={0}&endTime={1}",
  reqType: REQUEST_TYPE.GET
};
export const GET_PORTFOLIO_PNL_CUMULATIVE = {
  url: "/v1/portfolio/pnl/dailyHistory:Cumulative?startTime={0}&endTime={1}",
  reqType: REQUEST_TYPE.GET
};
export const GET_PORTFOLIO_PNL_TOP_PERFORMERS = {
  url: "/v1/portfolio/topPerformingSymbols?startTime={0}&endTime={1}",
  reqType: REQUEST_TYPE.GET
};
export const GET_PORTFOLIO_COMMISSIONS = {
  url: "/v1/portfolio/pnl/commission?startTime={0}&endTime={1}",
  reqType: REQUEST_TYPE.GET
};
