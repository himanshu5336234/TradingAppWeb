export const USDT_TRANSACTION_FILTERS = {
  ALL: { label: "All", value: "ALL" },
  COMMISSION: { label: "Commission", value: "Commission" },
  REALIZED_PnL: { label: "Realized PnL", value: "Realized_PnL" },
  FUNDING_FEE: { label: "Funding Fee", value: "Funding_Fee" },
  USDT_INR_TRANSFER: { label: "USDT to INR Transfer", value: "Transfer" },
  CLEARANCE_FEE: { label: "Clearance Fee", value: "INSURANCE_CLEAR" }
};

export const INR_TRANSACTION_FILTERS = {
  ALL: { label: "All", value: "ALL" },
  INR_DEPOSIT: { label: "INR DEPOSIT", value: "INR_DEPOSIT" },
  INR_WITHDRAWAL: { label: "INR WITHDRAW", value: "INR_WITHDRAWAL" },
  INR_USDT_TRANSFER: { label: "INR to USDT Transfer", value: "CRYPTO_ASSET_BUY" },
  USDT_INR_TRANSFER: { label: "USDT to INR Transfer", value: "CRYPTO_ASSET_SELL" },
  TDS_USDT_SELL: { label: "TDS for USDT to INR Transfer", value: "TDS" }
};

export const TRANSACTION_HISTORY = "Transaction History";
export const TRANSACTION_HISTORY_DURATION = "7 Days";
