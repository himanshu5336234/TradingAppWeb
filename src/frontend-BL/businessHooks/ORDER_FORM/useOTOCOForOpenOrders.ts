import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SymbolPrecisionHelper } from "../../../helpers";
import { updateOCOOrder } from "../../../frontend-api-service/Api";
import { ORDER_CREATION_TP_SL_SUCESS, ORDER_CREATION_TP_SL_FAIL } from "../../redux/constants/Constants";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";

interface OrderTypes {
  TAKE_PROFIT_MARKET: string;
  STOP_MARKET: string;
  LIMIT: string;
  STOP: string;
  TAKE_PROFIT: string;
}

const orderTypes: OrderTypes = {
  TAKE_PROFIT_MARKET: "TAKE_PROFIT_MARKET",
  STOP_MARKET: "STOP_MARKET",
  LIMIT: "LIMIT",
  STOP: "STOP",
  TAKE_PROFIT: "TAKE_PROFIT"
};

interface Data {
  stopPrice: string;
  idUuid: string;
}
interface ParentData {
  side: "BUY" | "SELL";
  quantity: string;
  stopPrice: string;
  type: string;
  price: string;
  averagePrice: string;
  symbol: string;
}
interface UseOtOCOForOpenOrdersProps {
  data: Data; // Replace 'any' with the actual type of data
  parentData: ParentData; // Replace 'any' with the actual type of parentData
  childOrderType: string; // Replace 'string' with the actual type of childOrderType
  close: () => void;
}

export const useOtOCOForOpenOrders = ({ data, parentData, childOrderType, close }: UseOtOCOForOpenOrdersProps) => {
  const dispatch = useDispatch<any>();
  const { convertToPrecisionValueInContractAssetUnit, symbolPricePrecision } = SymbolPrecisionHelper({ symbol: parentData.symbol });
  const [priceError, setPriceError] = useState<string>("");
  const [updatePrice, setUpdatePrice] = useState<string>("");
  useEffect(() => {
    if (data?.stopPrice) {
      setUpdatePrice(String(data.stopPrice));
    }
  }, [data]);

  const [showEditTPButton, setShowEditTPButton] = useState(false);

  const handleCheckClick = () => {
    let returnFlag = false;
    const payload = {
      data: [
        {
          orderId: data.idUuid,
          stopPrice: convertToPrecisionValueInContractAssetUnit(updatePrice, symbolPricePrecision)
        }
      ]
    };
    if (Number(updatePrice) <= 0) {
      setPriceError("Price can not be zero");
      returnFlag = true;
    }
    if (parentData.side === "BUY") {
      if (childOrderType === orderTypes.TAKE_PROFIT_MARKET) {
        if ((parentData.type === orderTypes.STOP_MARKET || parentData.type === orderTypes.TAKE_PROFIT_MARKET) && Number(updatePrice) < Number(parentData.stopPrice)) {
          setPriceError("TP value should be greater than the trigger price of the parent order");
          returnFlag = true;
        } else if ((parentData.type === orderTypes.LIMIT || parentData.type === orderTypes.STOP || parentData.type === orderTypes.TAKE_PROFIT) && Number(updatePrice) < Number(parentData.price)) {
          setPriceError("TP value should be greater than the Limit price of the parent order");
          returnFlag = true;
        }
      }
      if (childOrderType === orderTypes.STOP_MARKET) {
        if ((parentData.type === orderTypes.STOP_MARKET || parentData.type === orderTypes.TAKE_PROFIT_MARKET) && Number(updatePrice) > Number(parentData.stopPrice)) {
          setPriceError("SL value should be less than the trigger price of the parent order");
          returnFlag = true;
        } else if ((parentData.type === orderTypes.LIMIT || parentData.type === orderTypes.STOP || parentData.type === orderTypes.TAKE_PROFIT) && Number(updatePrice) > Number(parentData.price)) {
          setPriceError("SL value should be less than the Limit price of the parent order");
          returnFlag = true;
        }
      }
    } else {
      if (childOrderType === orderTypes.TAKE_PROFIT_MARKET) {
        if ((parentData.type === orderTypes.STOP_MARKET || parentData.type === orderTypes.TAKE_PROFIT_MARKET) && Number(updatePrice) > Number(parentData.stopPrice)) {
          setPriceError("TP value should be less than the trigger price of the parent order");
          returnFlag = true;
        } else if ((parentData.type === orderTypes.LIMIT || parentData.type === orderTypes.STOP || parentData.type === orderTypes.TAKE_PROFIT) && Number(updatePrice) > Number(parentData.price)) {
          setPriceError("TP value should be less than the Limit price of the parent order");
          returnFlag = true;
        }
      }

      if (childOrderType === orderTypes.STOP_MARKET) {
        if ((parentData.type === orderTypes.STOP_MARKET || parentData.type === orderTypes.TAKE_PROFIT_MARKET) && Number(updatePrice) < Number(parentData.stopPrice)) {
          setPriceError("SL value should be greater than the trigger price of the parent order");
          returnFlag = true;
        } else if ((parentData.type === orderTypes.LIMIT || parentData.type === orderTypes.STOP || parentData.type === orderTypes.TAKE_PROFIT) && Number(updatePrice) < Number(parentData.price)) {
          setPriceError("SL value should be greater than the Limit price of the parent order");
          returnFlag = true;
        }
      }
    }

    // ... (rest of the code remains unchanged)

    if (returnFlag) return;
    updateOCOOrder(payload)
      .then(() => {
        dispatch(
          showSnackBar({
            src: ORDER_CREATION_TP_SL_SUCESS,
            message: "Your TP/SL order has been Updated successfully",
            type: "success"
          })
        );

        setShowEditTPButton(false);
        close();
      })
      .catch((err: any) => {
        dispatch(
          showSnackBar({
            src: ORDER_CREATION_TP_SL_FAIL,
            message: err.response?.data.message,
            type: "failure"
          })
        );

        setShowEditTPButton(false);
        close();
      });
  };
  const handleChangeUpdatedPrice = (e: { target: { value: string } }) => {
    if (e.target.value.length > 0) {
      setUpdatePrice(convertToPrecisionValueInContractAssetUnit(e.target.value, Number(symbolPricePrecision)));
    } else {
      setUpdatePrice("");
    }
    setPriceError("");
  };
  const getEstimatedPnL = () => {
    if (!data || !parentData) return "--/--";
    if (!updatePrice) return "--/--";
    if (childOrderType === "STOP_MARKET") {
      let price;
      if (parentData.type === "TAKE_PROFIT_MARKET" || parentData.type === "STOP_MARKET") {
        price = Number(parentData.stopPrice);
      } else {
        price = Math.max(Number(parentData.price), Number(parentData.averagePrice));
      }

      let pnl = 0;
      if (parentData.side === "SELL") {
        pnl = Number(price) - Number(updatePrice);
      } else {
        pnl = Number(updatePrice) - Number(price);
      }
      if (pnl > 0) return "--/--";
      else return `${convertToPrecisionValueInContractAssetUnit(String(pnl * Number(parentData.quantity)), Number(symbolPricePrecision))} USDT`;
    } else {
      let price;
      if (parentData.type === "TAKE_PROFIT_MARKET" || parentData.type === "STOP_MARKET") {
        price = Number(parentData.stopPrice);
      } else {
        price = Math.max(Number(parentData.price), Number(parentData.averagePrice));
      }
      let pnl = 0;
      if (parentData.side === "SELL") {
        pnl = price - Number(updatePrice);
      } else {
        pnl = Number(updatePrice) - price;
      }
      if (pnl < 0) return "--/--";
      else return `${convertToPrecisionValueInContractAssetUnit(String(pnl * Number(parentData.quantity)), Number(symbolPricePrecision))} USDT`;
    }
  };

  return {
    priceError,
    setPriceError,
    handleCheckClick,
    updatePrice,
    setUpdatePrice,
    showEditTPButton,
    setShowEditTPButton,
    handleChangeUpdatedPrice,
    convertToPrecisionValueInContractAssetUnit,
    symbolPricePrecision,
    getEstimatedPnL
  };
};
