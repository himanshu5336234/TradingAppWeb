import { useSelector } from "react-redux";
import useMarketBestPricehandler from "./useMarketBestPricehandler";

interface OpenLossHandlerProps {
  side: "BUY" | "SELL";
  type: 0 | 1 | 2 | 3;
  sizeInContractAsset: number;
  triggerPrice: number;
  limitPriceContractAsset: number;
}

export const useOpenLossHandler = ({ side, type, sizeInContractAsset, triggerPrice, limitPriceContractAsset }: OpenLossHandlerProps) => {
  const selectedSymbol = useSelector((state: any) => state.selectSymbol && state.selectSymbol.selectedSymbol);
  const markPriceForSelectedSymbol = useSelector((state: { BinanceStreamData: { binanceData: any } }) => state.BinanceStreamData.binanceData?.[`${selectedSymbol?.toLowerCase()}@markPrice@1s`]);
  const { assumingPrice } = useMarketBestPricehandler({
    side
  });
  if (markPriceForSelectedSymbol && assumingPrice) {
    if (side === "BUY") {
      if (type === 0) {
        return sizeInContractAsset * Math.abs(Math.min(0, Number(markPriceForSelectedSymbol?.markprice) - Number(assumingPrice)));
      } else if (type === 2) {
        return sizeInContractAsset * Math.abs(Math.min(0, Number(markPriceForSelectedSymbol?.markprice) - Number(triggerPrice)));
      } else {
        return sizeInContractAsset * Math.abs(Math.min(0, Number(markPriceForSelectedSymbol?.markprice) - Number(limitPriceContractAsset)));
      }
    } else {
      if (type === 0) {
        return sizeInContractAsset * Math.abs(Math.min(0, -1 * (Number(markPriceForSelectedSymbol?.markprice) - Number(assumingPrice))));
      } else if (type === 2) {
        return sizeInContractAsset * Math.abs(Math.min(0, -1 * (Number(markPriceForSelectedSymbol?.markprice) - Number(triggerPrice))));
      } else {
        return sizeInContractAsset * Math.abs(Math.min(0, -1 * (Number(markPriceForSelectedSymbol?.markprice) - Number(limitPriceContractAsset))));
      }
    }
  } else {
    return 0;
  }
};

export default useOpenLossHandler;
