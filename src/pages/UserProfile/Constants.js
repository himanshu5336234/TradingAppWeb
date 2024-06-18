export const USER_SETTING_TABS = {
  SECURITY: { name: "Security", route: "/setting/security", value: "security" },
  USER_VERIFICATION: {
    name: "User Verification",
    route: "/user",
    value: "user-verification"
  },
  PREFERENCES: {
    name: "Preferences",
    route: "/setting/preferences",
    value: "preferences"
  },
  PERSONAL_DETAILS: {
    name: "Personal Details",
    route: "/user",
    value: "personal-details"
  },
  API_MANAGEMENT: {
    name: "API Management",
    route: "/setting/api_management",
    value: "api-management"
  },
  REFER_AND_EARN: {
    name: "Refer and Earn",
    route: "/setting/reward/referral",
    value: "refer-and-earn"
  },
  REBATE: { name: "Rebate", route: "/setting/reward/rebate", value: "rebate" },
  TASK_REWARDS: {
    name: "Task Rewards",
    route: "/setting/reward/task-reward",
    value: "task-reward"
  },
  WALLET: { name: "Wallet", route: "/wallet", value: "wallet" },
  INR_WALLET: { name: "INR Wallet", route: "/wallet", value: "inrWallet" },
  USDT_WALLET: { name: "USDT Wallet", route: "/wallet", value: "usdtWallet" },
  DEPOSIT_WALLET: { name: "INR Deposit", route: "/wallet", value: "deposit" },
  WITHDRAW_WALLET: { name: "INR Withdrawal", route: "/wallet", value: "withdraw" }
};

export const USER_SETTING_SIGN_OUT = "Sign Out";
export const USER_SETTING_TITLE = "User Setting";
export const REFERRAL_AND_REWARD = "Referral & Reward";
export const WALLET = "Assets";
