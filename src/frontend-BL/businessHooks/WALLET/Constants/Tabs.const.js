export const TABS_CONSTANTS = {
  FILTER_TRANSACTION_FIAT: "Filter transactions based on transaction type",
  TOTAL_BALANCE_LABEL: "Total INR Balance",
  TRANSACTION_HISTORY_LABEL_FIAT: "Transaction History",
  TRANSACTION_HISTORY_COLUMNS: ["Time", "Amount", "Transaction Type", "Currency", "Status", "Reference ID"],
  FILTER_VALUE_DEFAULT: "ALL",
  FIAT_WALLET: "FIAT",
  FUTURES_WALLET: "FUTURES",
  FIAT_FILTER_VALUES: [
    { name: "All", val: "ALL" },
    { name: "INR Deposit", val: "INR_DEPOSIT" },
    { name: "INR Withdraw", val: "INR_WITHDRAWAL" },
    { name: "INR to USDT", val: "CRYPTO_ASSET_BUY" },
    { name: "USDT to INR", val: "CRYPTO_ASSET_SELL" }
    // { name: "TDS FOR USDT SELL", val: "TDS" }
  ],
  TABLE_DURATION_FILTER_VALUE: [
    { name: "All", value: "all" },
    { name: "1 Day", value: "day" },
    { name: "1 Week", value: "week" },
    { name: "1 Month", value: "month" },
    { name: "3 Months", value: "three-months" },
    { name: "Custom Date", value: "custom" }
  ],
  MARGIN_BALANCE_LABEL: "Total Margin Balance",
  FREE_MARGIN_LABEL: "Free Margin Balance",
  REALIZED_PNL_LABEL: "Realised 24h PnL",
  ASSETS_LABEL: "assets",
  ASSETS_HISTORY_COLUMNS_LABEL: ["Symbol", "Balance", "Unrealised PnL", "Free Balance", "Max Withdrawable Balance"],
  ASSETS_TYPE_COLUMNS_LABEL: ["Time", "Type", "Amount", "@/asset", "Symbol"],
  FILTER_TRANSACTION_FUTURES: "Filter transactions based on income type",
  TRANSACTION_HISTORY_LABEL_FUTURES: "Transaction History",
  NOT_APPLICABLE_LABEL: "Not Applicable",
  REALIZED_PNL_SERVER_LABEL: "REALIZED_PNL",
  FUTURES_FILTER_VALUES: [
    { name: "ALL", val: "ALL" },
    { name: "Transfer", val: "TRANSFER" },
    { name: "Commission", val: "COMMISSION" },
    { name: "Realized PnL", val: "REALIZED_PNL" },
    { name: "Funding Fee", val: "FUNDING_FEE" },
    { name: "Clearance Fee", val: "INSURANCE_CLEAR" }
  ]
};
