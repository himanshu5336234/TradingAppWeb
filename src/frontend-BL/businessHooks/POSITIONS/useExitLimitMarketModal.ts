import { useEffect, useState, useRef, Dispatch } from "react";
import { SymbolPrecisionHelper } from "@/helpers";

import { DENSITY_WS_SUBSCRIBE_CLOSE_ORDER, DENSITY_WS_SUBSCRIBE_CREATE_ORDER, EXIT_ORDER_FAIL, EXIT_ORDER_SUCCESS } from "../../redux/constants/Constants";

import { createOrder } from "../../../frontend-api-service/Api";

import { useDispatch, useSelector } from "react-redux";

import { EXIT_LIMIT_MARKET_CONSTANTS } from "./constants/ExitMarketModal.const";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { recordCleverTapEvent } from "../../../utils/recordCleverTapEvent";
export const BUY_SELL_MAP = {
  LONG: "BUY",
  SHORT: "SELL"
};

export const useExitLimitMarketModal = ({
  isOpen,
  close,
  orderType,
  positionEntry,
  symbol
}: {
  isOpen: boolean;
  close: () => void;
  orderType: string;
  positionEntry: { getPositionSide: string; symbol: string; ltp: string };
  symbol: string;
}) => {
  const dispatch: Dispatch<any> = useDispatch();
  const LastTradedPrice = useSelector((state: any) => state.BinanceStreamData?.binanceData?.[`${symbol.toLowerCase()}@ticker`]);
  const openOrdersApiData = useSelector((state: any) => state.futures.openOrders).filter(
    (openOrder: { symbol: any; side: any }) => openOrder.symbol === positionEntry.symbol && openOrder.side !== BUY_SELL_MAP[positionEntry.getPositionSide]
  );
  const openOrdersSocketData = useSelector((state: any) => state.OpenOrdersStream.OpenOrdersStream).filter(
    (openOrder: { s: any; S: any }) => openOrder.s === positionEntry.symbol && openOrder.S !== BUY_SELL_MAP[positionEntry.getPositionSide]
  );

  const [limitPrice, setLimitPrice] = useState("");
  const [size, setSize] = useState("");

  const { setDecimalPrecision, symbolPricePrecision, symbolPrecisionByMinTickSize, symbolQuantityPrecision } = SymbolPrecisionHelper({ symbol });

  const [helperTextForPrice, setHelperTextForPrice] = useState("");
  const [helperTextForSize, setHelperTextForSize] = useState("");

  const [toggleSize, setToggleSize] = useState(0);
  const isValidationSuccessful = useRef(true);
  const [OrgSize, setOrgSize] = useState("");
  const [maxSize, setMaxSize] = useState(0);
  const [estimatedPnL, setEstimatedPnL] = useState(0);

  ///
  const convertToPrecisionValueInContractAssetUnit = (value: number, Precision: any) => {
    let numStr = value.toString();
    if (numStr.startsWith(".")) {
      numStr = `0${numStr}`; // Add a leading zero
    }

    numStr = numStr.replace(/-/g, "");
    // Find the index of the decimal point
    const decimalIndex = numStr.indexOf(".");

    // If there is a decimal point, remove the portion before it
    if (decimalIndex !== -1) {
      const val = (numStr = numStr.substr(0, Precision + decimalIndex + 1));
      if (Precision === 0) {
        const valBeforePoint = val.split(".")[0];
        if (valBeforePoint === "0") {
          setHelperTextForSize("Minimum quantity for this coin is 1");
        }
        return valBeforePoint;
      }
      return val;
    } else {
      return numStr;
    }
  };
  const handleSizeChange = (event: { target: { value: number } }) => {
    setHelperTextForSize("");
    setToggleSize("");
    const value = event.target.value;

    const result = convertToPrecisionValueInContractAssetUnit(value, symbolQuantityPrecision);
    setSize(result);
  };

  const [exitPositionApiResponseStatus, setExitPositionApiResponseStatus] = useState(false);

  const handleSubmit = () => {
    // empty validators
    // console.log(limitPrice, LastTradedPrice, size, maxSize, positionEntry, "exit limit");
    isValidationSuccessful.current = true;
    if (!size) {
      setHelperTextForSize(EXIT_LIMIT_MARKET_CONSTANTS.EMPTY_SIZE_LABEL);
      isValidationSuccessful.current = false;
    }
    if (!limitPrice) {
      setHelperTextForPrice(EXIT_LIMIT_MARKET_CONSTANTS.EMPTY_PRICE_LABEL);
      isValidationSuccessful.current = false;
    }

    // quantity validators
    if (Number(size) > Number(maxSize)) {
      setHelperTextForSize(EXIT_LIMIT_MARKET_CONSTANTS.SIZE_EXCEEDED_LABEL);
      isValidationSuccessful.current = false;
    }
    if (orderType === EXIT_LIMIT_MARKET_CONSTANTS.ORDER_TYPE_LIMIT) {
      if (positionEntry.getPositionSide === "BUY") {
        if (Number(limitPrice) < Number(LastTradedPrice)) {
          setHelperTextForPrice(EXIT_LIMIT_MARKET_CONSTANTS.INVALID_PRICE_LABEL);
          isValidationSuccessful.current = false;
        }
      } else {
        if (Number(limitPrice) > Number(LastTradedPrice)) {
          setHelperTextForPrice(EXIT_LIMIT_MARKET_CONSTANTS.INVALID_PRICE_LABEL);
          isValidationSuccessful.current = false;
        }
      }
    }

    if (isValidationSuccessful.current === false) return;
    setExitPositionApiResponseStatus(true);
    if (orderType === "MARKET") {
      createOrder({
        symbol,
        side: positionEntry.getPositionSide === "BUY" ? "SELL" : "BUY",
        type: "MARKET",
        quantity: size.toString(),
        reduceOnly: true
      })
        .then((response: { status: number; data: { order: any } }) => {
          if (response.status === 200) {
            recordCleverTapEvent("CLOSE_AT_MARKET_SUCCESS", {
              symbol,
              side: positionEntry?.getPositionSide === "LONG" ? "SELL" : "BUY",
              type: "MARKET",
              quantity: size.toString(),
              reduceOnly: true
            });
            setExitPositionApiResponseStatus(false);
            close();

            dispatch(
              showSnackBar({
                src: EXIT_ORDER_SUCCESS,
                message: EXIT_LIMIT_MARKET_CONSTANTS.EXIT_ORDER_SUCCESSFUL_SNACKBAR_LABEL,
                type: "success"
              })
            );
            dispatch({
              type: DENSITY_WS_SUBSCRIBE_CLOSE_ORDER,
              payload: {
                data: [response?.data?.order],
                type: "MARKET",
                eventType: "CLOSE_ORDER"
              }
            });
          }
        })
        .catch((err: { response: { data: { details: any; message: string } } }) => {
          setExitPositionApiResponseStatus(false);
          recordCleverTapEvent("CLOSE_AT_MARKET_FAILED", {
            symbol,
            side: positionEntry?.getPositionSide === "LONG" ? "SELL" : "BUY",
            type: "MARKET",
            quantity: size.toString(),
            reduceOnly: true,
            error: err.response?.data.message.split(":")[1]
          });
          dispatch(
            showSnackBar({
              src: EXIT_ORDER_FAIL,
              message: err.response?.data.message.split(":")[1],
              type: "failure"
            })
          );
        });
    } else {
      createOrder({
        symbol,
        side: positionEntry.getPositionSide === "BUY" ? "SELL" : "BUY",
        type: "LIMIT",
        quantity: size.toString(),
        price: limitPrice.toString(),
        reduceOnly: true
      })
        .then((response: { status: number; data: { order: any } }) => {
          if (response.status === 200) {
            setExitPositionApiResponseStatus(false);
            close();
            recordCleverTapEvent("CLOSE_AT_LIMIT_SUCCESS", {
              symbol,
              side: positionEntry?.getPositionSide === "LONG" ? "SELL" : "BUY",
              type: "LIMIT",
              quantity: size.toString(),
              price: limitPrice.toString(),
              reduceOnly: true
            });
            dispatch(
              showSnackBar({
                src: EXIT_ORDER_SUCCESS,
                message: EXIT_LIMIT_MARKET_CONSTANTS.EXIT_ORDER_SUCCESSFUL_SNACKBAR_LABEL,
                type: "success"
              })
            );
            dispatch({
              type: DENSITY_WS_SUBSCRIBE_CREATE_ORDER,
              payload: {
                data: [response?.data?.order],
                type: "LIMIT"
              }
            });
          }
        })
        .catch((err: { response: { data: { details: any; message: string } } }) => {
          recordCleverTapEvent("CLOSE_AT_LIMIT_FAILED", {
            symbol,
            side: positionEntry?.getPositionSide === "LONG" ? "SELL" : "BUY",
            type: "LIMIT",
            quantity: size.toString(),
            price: limitPrice.toString(),
            reduceOnly: true,
            error: err.response?.data.message.split(":")[1]
          });
          setExitPositionApiResponseStatus(false);
          dispatch(
            showSnackBar({
              src: EXIT_ORDER_FAIL,
              message: err.response?.data.message.split(":")[1],
              type: "failure"
            })
          );
        });
    }
  };

  const handleLimitPriceChange = (event: { target: { value: any } }) => {
    setHelperTextForPrice("");
    const value = event.target.value;
    const result = convertToPrecisionValueInContractAssetUnit(value, symbolPrecisionByMinTickSize);
    setLimitPrice(result);
  };
  useEffect(() => {
    if (positionEntry.getPositionSide === "SELL") {
      setEstimatedPnL(
        parseFloat(
          orderType === EXIT_LIMIT_MARKET_CONSTANTS.ORDER_TYPE_MARKET
            ? (LastTradedPrice - positionEntry.getEntryPrice) * (size || Math.abs(OrgSize))
            : (limitPrice - positionEntry.getEntryPrice) * (size || Math.abs(OrgSize))
        ).toFixed(4) * -1
      );
    } else {
      setEstimatedPnL(
        parseFloat(
          orderType === EXIT_LIMIT_MARKET_CONSTANTS.ORDER_TYPE_MARKET
            ? (LastTradedPrice - positionEntry.getEntryPrice) * (size || Math.abs(OrgSize))
            : (limitPrice - positionEntry.getEntryPrice) * (size || Math.abs(OrgSize))
        ).toFixed(4)
      );
    }
  }, [OrgSize, positionEntry, size, limitPrice, LastTradedPrice]);

  useEffect(() => {
    const openOrderSizeAccumulatorApi = Math.abs(
      openOrdersApiData.reduce((accumulator: number, openOrder: { origQty: string }) => {
        return accumulator + parseFloat(openOrder.origQty);
      }, 0)
    );
    const openOrderSizeAccumulatorSocket = Math.abs(
      parseFloat(
        openOrdersSocketData.reduce((accumulator: number, openOrder: { q: string }) => {
          return accumulator + parseFloat(openOrder.q);
        }, 0)
      )
    );
    setMaxSize((Math.abs(positionEntry.getPositionAmount) - (openOrderSizeAccumulatorApi + openOrderSizeAccumulatorSocket)).toFixed(symbolQuantityPrecision));
    setOrgSize(positionEntry.getPositionAmount - (openOrderSizeAccumulatorApi + openOrderSizeAccumulatorSocket).toFixed(symbolQuantityPrecision));
  }, [openOrdersApiData, openOrdersSocketData, isOpen]);

  useEffect(() => {
    setSize(maxSize);
    setLimitPrice(convertToPrecisionValueInContractAssetUnit(Number(positionEntry?.ltp), symbolPrecisionByMinTickSize));
  }, [maxSize, isOpen]);

  return {
    handleSizeChange,
    handleSubmit,
    handleLimitPriceChange,
    exitPositionApiResponseStatus,
    setDecimalPrecision,
    helperTextForPrice,
    toggleSize,
    setOrgSize,
    OrgSize,
    maxSize,
    setLimitPrice,
    estimatedPnL,
    setEstimatedPnL,
    helperTextForSize,
    isValidationSuccessful,
    symbolPricePrecision,
    setHelperTextForPrice,
    setHelperTextForSize,
    setSize,
    size,
    setToggleSize,
    ltp: LastTradedPrice,
    limitPrice
  };
};
