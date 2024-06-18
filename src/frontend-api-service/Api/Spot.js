import { LAST_TRADED_PRICE_FOR_SYMBOLS, CONVERT_ASSETS_SPOT } from "../URI";

import { Format } from "../../helpers/String";
import axiosWithBinanceServerSpot from "../Utils/axiosHelpers/axiosWithBinanceServerSpot";
import axiosWithApiServer from "../Utils/axiosHelpers/axiosWithApiServer";

export const lastTradedPriceForSymbolsApi = () => {
  const url = Format(LAST_TRADED_PRICE_FOR_SYMBOLS.url);
  return axiosWithBinanceServerSpot({
    url,
    method: LAST_TRADED_PRICE_FOR_SYMBOLS.reqType
  });
};

export const convertAssetsSpotApi = (sellingAsset, buyingAsset, origQty) => {
  const url = Format(CONVERT_ASSETS_SPOT.url, sellingAsset, buyingAsset, origQty);
  return axiosWithApiServer({ url, method: CONVERT_ASSETS_SPOT.reqType });
};
