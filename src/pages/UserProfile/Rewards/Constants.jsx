import { Box, Typography } from "@mui/material";
import React from "react";

// REFERRAL
// Columns
export const COLUMN_REFEREE_HISTORY = [
  {
    field: "date",
    headerName: "Sign-Up Date",
    type: "date",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    valueFormatter: ({ value }) =>
      value &&
      new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
  },
  {
    field: "email",
    type: "string",
    headerName: "E-mail",
    headerAlign: "center",
    minWidth: 150,
    flex: 2,
    headerClassName: "data-grid-header",
    align: "center",
    sortable: false
  },
  {
    field: "kyc",
    headerName: "KYC",
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ["Verified", "Pending", "Failed"],
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "center",
    renderCell: (params) => (
      <>
        <Typography variant="Regular_14" sx={{ ...(params.row.kyc === "Verified" ? { color: "trade.primary" } : params.row.kyc === "Failed" ? { color: "trade.secondary" } : { color: "#CF8C28" }) }}>
          {params.row.kyc}
        </Typography>
      </>
    )
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ["active", "expired"],
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "center",
    renderCell: (params) => (
      <Box
        sx={{
          ...(params.row.status === "active" ? { backgroundColor: "background.success.secondary" } : { backgroundColor: "#6B6A6A" }),
          height: "24px",
          width: "64px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px"
        }}
      >
        <Typography variant="Regular_14" sx={{ ...(params.row.status === "active" ? { color: "trade.primary" } : { color: "#DBDBDB" }) }}>
          {params.row.status}
        </Typography>
      </Box>
    )
  }
];

export const COLUMN_REFERRALREWARD_HISTORY = [
  {
    field: "date",
    headerName: "Date",
    type: "date",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    valueFormatter: ({ value }) =>
      value &&
      new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
  },
  {
    field: "reward",
    type: "number",
    headerName: "Reward",
    headerAlign: "center",
    minWidth: 120,
    headerClassName: "data-grid-header",
    align: "center",
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <Typography color="text.main" variant="Bold_14_21">
        {params.row.reward.toFixed(4)} {"USDT"}
      </Typography>
    )
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ["rewarded", "credited"],
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "center",
    renderCell: (params) => (
      <>
        <Typography variant="Regular_14" sx={{ ...(params.row.status === "rewarded" ? { color: "trade.primary" } : { color: "#CF8C28" }) }}>
          {params.row.status}
        </Typography>
      </>
    )
  }
];

export const REWARD_HISTORY_ROW_DATA = [
  {
    date: new Date(),
    reward: "10 USDT",
    status: "credited"
  }
];

// TEXT
export const REFERRAL_STEP_1 = "Get Verified & Share your referral code with friends.";
export const REFERRAL_STEP_2 = "Invite friends to sign up and start trading";
export const REFERRAL_STEP_3 = "Invite friends to sign up and start trading. Earn upto 0.03% of the trading volume generate by them.";

const REFER_LISTITEM_1 = "Earn rewards for every referral who generates trading volume on our platform!";
const REFER_LISTITEM_2 = "Referral rewards are tiered based on cumulative trading volume, with the potential to earn up to 0.01% of your referee's volume.";
const REFER_LISTITEM_3 = "Referral rewards are credited to your wallet on a daily basis, allowing you to earn consistently.";
const REFER_LISTITEM_4 = "Keep track of your earnings and referees volume through our user-friendly interface.";
const REFER_LISTITEM_5 = "Ensure a minimum daily trading volume of 100 USDT of the referee's to be eligible for the Referral reward for that day";
export const REFER_GUIDE_LIST = [REFER_LISTITEM_1, REFER_LISTITEM_2, REFER_LISTITEM_3, REFER_LISTITEM_4, REFER_LISTITEM_5];

// REBATE
// TEXT
export const REBATE_STEP_1 = "Get Verified & Earn back a percentage of your trading fees as a reward with our rebate programme!";
export const REBATE_STEP_2 = "Sign up using a referral code and get a flat rebate of upto 20% on your trading fees!";
export const REBATE_STEP_3 = "Get your Rebate credited to your wallet on daily basis and track your earnings on our user friendly dashboard.";

const REBATE_LISTITEM_1 = "Earn rewards for your trading fees! Get a percentage back on your fees paid as a rebate";
const REBATE_LISTITEM_2 = "Use a referral code for an exclusive flat rebate of upto 20% on your trading fees.";
const REBATE_LISTITEM_3 = "Keep track of your rebate earnings on a daily, weekly, and monthly basis.";
const REBATE_LISTITEM_4 = "Rebate will be credited to your Wallet on a daily basis.";
const REBATE_LISTITEM_5 = "Rebate will be processed if daily trading fees is more than 0.01 USDT";

export const REBATE_GUIDE_LIST = [REBATE_LISTITEM_1, REBATE_LISTITEM_2, REBATE_LISTITEM_3, REBATE_LISTITEM_4, REBATE_LISTITEM_5];

// COLUMNS
export const REBATE_HISTORY_COLUMNS = [
  {
    field: "date",
    headerName: "Date",
    type: "date",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    valueFormatter: ({ value }) =>
      value &&
      new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
  },
  {
    field: "rebateCashback",
    headerName: "Rebate Cashback",
    headerAlign: "center",
    type: "number",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "center",
    renderCell: (params) => (
      <>
        <Typography variant="Regular_14" color="text.main">
          {params.row.rebateCashback.toFixed(4)} {"USDT"}
        </Typography>
      </>
    )
  },
  {
    field: "rebateRate",
    headerName: "Fee Rebate %",
    headerAlign: "center",
    type: "number",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "center",
    renderCell: (params) => (
      <>
        <Typography variant="Regular_14" color="#F4F16C">
          {params.row.rebateRate} {"%"}
        </Typography>
      </>
    )
  },
  {
    field: "fee",
    headerName: "Fee",
    headerAlign: "center",
    type: "number",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "center",
    renderCell: (params) => (
      <>
        <Typography variant="Regular_14">
          {params.row.fee.toFixed(4)} {"USDT"}
        </Typography>
      </>
    )
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ["processing", "rewarded"],
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "center",
    renderCell: (params) => (
      <>
        <Typography variant="Regular_14" sx={{ ...(params.row.status === "rewarded" ? { color: "trade.primary" } : { color: "#CF8C28" }) }}>
          {params.row.status}
        </Typography>
      </>
    )
  }
];

export const REBATE_HISTORY_ROWS = [
  {
    date: new Date(),
    rebateCashback: 0.04,
    rebateRate: 0.2,
    fee: 20,
    status: "credited"
  }
];

// TASK REWARDS
export const COLUMN_TASKREWARD_HISTORY = [
  {
    field: "date",
    headerName: "Date",
    type: "date",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    valueFormatter: ({ value }) =>
      value &&
      new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
  },
  {
    field: "campaign",
    headerName: "Campaign",
    headerAlign: "center",
    type: "string",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "center",
    renderCell: (params) => (
      <>
        <Typography variant="Regular_14" color="#F4F16C">
          {params.row.campaign}
        </Typography>
      </>
    )
  },
  {
    field: "reward",
    type: "number",
    headerName: "Rewards Earned",
    headerAlign: "center",
    minWidth: 120,
    headerClassName: "data-grid-header",
    align: "center",
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <Typography color="text.main" variant="Bold_14_21">
        {params.row.reward} {"USDT"}
      </Typography>
    )
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ["processing", "rewarded"],
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    align: "center",
    renderCell: (params) => (
      <>
        <Typography variant="Regular_14" sx={{ ...(params.row.status === "rewarded" ? { color: "trade.primary" } : { color: "#CF8C28" }) }}>
          {params.row.status}
        </Typography>
      </>
    )
  },
  {
    field: "expiry",
    headerName: "Expiry",
    headerAlign: "center",
    align: "center",
    type: "date",
    minWidth: 120,
    flex: 1,
    headerClassName: "data-grid-header",
    valueFormatter: ({ value }) =>
      value &&
      new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
  }
];

// CONTENT
export const REFER_SUBTITLE = "Why earn on trading fees when you can earn on trading volume ? The DENSITY Referral program allows users to earn on the trading volume of your friends.";
export const TASK_REWARD_SUBTITLE = "Embark on an exciting Trading Adventure and unlock amazing rewards as you achieve specific milestones along your journey!";

export const KYC_CTA_TEXT = "Complete KYC Now !";
export const VERIFICATION_BANNER_TEXT = "You are not a verified user on our platform. Get yourself verified and unlock rewards !";
export const VERIFICATION_CTA_TEXT = "Get Verified Now";
