type Side = "BUY" | "SELL";
type OrderType = 0 | 1 | 2 | number;

export const calculateOpenLoss = (
  assumingPrice: number | null,
  side: Side,
  fetchMarkPrice: number | null,
  OrderType: OrderType,
  size: number,
  triggerPrice: string | null,
  limitPrice: string | null
): number => {
  if (fetchMarkPrice !== null && assumingPrice !== null) {
    const sideMultiplier = side === "BUY" ? 1 : -1;
    let calculatedLoss = 0;
    switch (OrderType) {
      case 0:
        calculatedLoss = Number(size) * Math.abs(Math.min(0, sideMultiplier * (fetchMarkPrice - Number(assumingPrice))));
        break;
      case 2:
        calculatedLoss = Number(size) * Math.abs(Math.min(0, sideMultiplier * (fetchMarkPrice - Number(triggerPrice!))));
        break;
      default:
        calculatedLoss = Number(size) * Math.abs(Math.min(0, sideMultiplier * (fetchMarkPrice - Number(limitPrice!))));
        break;
    }

    return calculatedLoss;
  } else {
    return 0;
  }
};
