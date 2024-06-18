// fiat type format helper
export const formatFiatTypes = (fiatType) => {
  switch (fiatType) {
    case "INR_WITHDRAWAL":
      return "INR Withdraw";
    case "INR_DEPOSIT":
      return "INR Deposit";
    case "CRYPTO_ASSET_BUY":
      return "INR to USDT";
    case "CRYPTO_ASSET_SELL":
      return "USDT to INR";
    default:
      return fiatType;
  }
};
// futures type format helper
export const formatFuturesTypes = (futuresType) => {
  switch (futuresType) {
    case "TRANSFER":
      return "Transfer";
    case "COMMISSION":
      return "Commission";
    case "REALIZED_PNL":
      return "Realized Pnl";
    case "FUNDING_FEE":
      return "Funding Fee";
    case "INSURANCE_CLEAR":
      return "Clearance Fee";
    default:
      return futuresType;
  }
};
