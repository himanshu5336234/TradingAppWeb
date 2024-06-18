export const DAILY_PNL_TABLE_HEADER = [
  { id: 0, name: "DATE", gridSize: 1.5, tooltip: false, tooltipText: "" },
  { id: 1, name: "GROSS P&L (USDT)", gridSize: 2, tooltip: true, tooltipText: "Realised P&L excluding all Fee, for the specific date" },
  { id: 2, name: "TOTAL FEE (USDT)", gridSize: 2, tooltip: true, tooltipText: "Sum of Commission, Funding Fee(can be positive) and Liquidation Fee, for the specific date" },
  { id: 3, name: "NET P&L (USDT)", gridSize: 2, tooltip: true, tooltipText: "Realised P&L including all Fee, for the specific date" },
  { id: 4, name: "EXECUTED ORDERS", gridSize: 2, tooltip: true, tooltipText: "Total Number fully filled or Partially filled Orders, for the specific date" },
  { id: 5, name: "AVERAGE LEVERAGE", gridSize: 2, tooltip: true, tooltipText: "Average Leverage taken, for the specific date" }
];
