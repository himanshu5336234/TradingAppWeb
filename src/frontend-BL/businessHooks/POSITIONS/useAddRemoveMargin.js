import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addRemoveMarginApi } from "../../../frontend-api-service/Api";
import { ADD_REMOVE_MARGIN_FAIL, ADD_REMOVE_MARGIN_SUCCESS, UPDATE_ISOLATED_WALLET_POSITIONS, UPDATE_ISOLATED_WALLET_POS_RISK } from "../../../frontend-BL/redux/constants/Constants";

// import { availableBalanceAction } from "../../../frontend-BL/redux/actions/User/AvailableBalance.ac";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { fetchFutureAccountDetails } from "@/frontend-BL/redux/actions/Futures/Futures.ac";
export const useAddRemoveMargin = ({ symbol, close }) => {
  const [selectedDropDownValue, setSelectedDropDownValue] = useState("Add");
  const [marginValue, setMarginValue] = useState("");
  const [maximumMarginPermissible, setMaximumMarginPermissible] = useState("-");

  const crossWalletBalance = useSelector((state) => state.futures.accountInfo.totalCrossWalletBalance);
  const activeCrossedPositions = useSelector((state) => state.positionsDirectory.crossWalletDetails);
  const leverageBracketData = useSelector((state) => state.leverageBracket.leverageBracket.find((sym) => sym.symbol === symbol));
  const availableBalanceForPlacingNewOrderWithCrossedPositions = useSelector((state) => state.currentPositions.crossWalletBalance);
  const openOrdersApiData = useSelector((state) => state.futures.openOrders);
  const openOrdersSocketData = useSelector((state) => state.OpenOrdersStream.OpenOrdersStream);
  const currentPositionData = useSelector((state) => state.positionsDirectory.currentPositions?.find((data) => data.sym === symbol));
  const binanceData = useSelector((state) => state.BinanceStreamData?.binanceData);
  const selectedPositionAuxiliaryMarkPrice = useSelector((state) => state.BinanceStreamData?.binanceData?.[`${symbol.toLowerCase()}@markPrice@1s`]);
  const getPositionSize = Number(currentPositionData?.posAmt) * Number(currentPositionData?.entryPrice);
  const marginUsed = useSelector((state) => state.positionsDirectory.isolatedWallet.find((data) => data.sym === symbol))?.isolatedWallet;
  const activePositions = useSelector((state) => state.positionsDirectory.currentPositions);
  const MarginRatioHelpers = useMemo(() => {
    const size = Math.abs(getPositionSize);
    if (leverageBracketData !== undefined) {
      const leverageData = leverageBracketData.brackets;
      if (leverageData !== undefined) {
        for (let i = 0; i < leverageData.length; i++) {
          if (size >= leverageData[i].notionalFloor && size <= leverageData[i].notionalCap) {
            return {
              maintainanceMargin: size * leverageData[i].maintMarginRatio - leverageData[i].cum,
              mmr: leverageData[i].maintMarginRatio,
              cum: leverageData[i].cum
            };
          }
        }
      }
    }
  }, [leverageBracketData, getPositionSize]);

  const maintenanceMarginRate = currentPositionData && MarginRatioHelpers?.mmr;
  const cumulative = currentPositionData && MarginRatioHelpers?.cum;

  const selectedPositionForMarginUpdation = useSelector((state) => state.positionsDirectory.currentPositions.find((position) => position.sym === symbol));
  const leverageForSelectedPosition = parseFloat(useSelector((state) => state.positionsDirectory.leverage.find((position) => position.sym === symbol)?.leverage));
  const [helperText, setHelperText] = useState("");
  const dispatch = useDispatch();
  const [estimatedLiquidationPrice, setEstimatedLiquidationPrice] = useState("-");

  const leverageDirectory = useSelector((state) => state.positionsDirectory.leverage);

  useEffect(() => {
    if (selectedDropDownValue === "Add") {
      const totalMaintenanceMarginOfAllCrossedContracts = activeCrossedPositions.reduce((accumulator, position) => (Number(position.maintMargin) || 0) + accumulator, 0);

      const contractListWithOpenOrdersFromSocket = {};
      const nonReduceOnlyLimitOrdersFromSocket = openOrdersSocketData.filter((openOrder) => openOrder.o === "LIMIT");

      for (const openOrder of nonReduceOnlyLimitOrdersFromSocket) {
        if (contractListWithOpenOrdersFromSocket[openOrder.s]) {
          contractListWithOpenOrdersFromSocket[openOrder.s][openOrder.S]
            ? (contractListWithOpenOrdersFromSocket[openOrder.s][openOrder.S] += Number(openOrder.p * openOrder.q))
            : (contractListWithOpenOrdersFromSocket[openOrder.s][openOrder.S] = Number(openOrder.p * openOrder.q));
        } else {
          contractListWithOpenOrdersFromSocket[openOrder.s] = {};
          contractListWithOpenOrdersFromSocket[openOrder.s][openOrder.S] = Number(openOrder.p * openOrder.q);
        }
      }

      const contractListWithOpenOrdersFromApi = {};
      const nonReduceOnlyLimitOrdersFromApi = openOrdersApiData.filter((openOrder) => openOrder.type === "LIMIT");

      for (const openOrder of nonReduceOnlyLimitOrdersFromApi) {
        if (contractListWithOpenOrdersFromApi[openOrder.symbol]) {
          contractListWithOpenOrdersFromApi[openOrder.symbol][openOrder.side]
            ? (contractListWithOpenOrdersFromApi[openOrder.symbol][openOrder.side] += Number(openOrder.notionalQuantity))
            : (contractListWithOpenOrdersFromApi[openOrder.symbol][openOrder.side] = Number(openOrder.notionalQuantity));
        } else {
          contractListWithOpenOrdersFromApi[openOrder.symbol] = {};
          contractListWithOpenOrdersFromApi[openOrder.symbol][openOrder.side] = Number(openOrder.notionalQuantity);
        }
      }

      const individualContractsWithOpenOrdersDirectory = {
        ...contractListWithOpenOrdersFromSocket,
        ...contractListWithOpenOrdersFromApi
      };
      const individualContractsWithOpenOrdersList = Object.keys(individualContractsWithOpenOrdersDirectory);
      let totalOpenOrdersMargin = 0;

      for (const contractAsset of individualContractsWithOpenOrdersList) {
        const bidNotionalQuantity = individualContractsWithOpenOrdersDirectory[contractAsset].BUY || individualContractsWithOpenOrdersDirectory[contractAsset].LONG || 0;
        const askNotionalQuantity = individualContractsWithOpenOrdersDirectory[contractAsset].SELL || individualContractsWithOpenOrdersDirectory[contractAsset].SHORT || 0;

        const activePositionWithContractAsset = activePositions.find((position) => position.sym === contractAsset);
        const MarkPriceForContractAsset = binanceData?.[`${contractAsset.toLowerCase()}@markPrice@1s`];
        const side = activePositionWithContractAsset ? (activePositionWithContractAsset.side === "LONG" || activePositionWithContractAsset.side === "BUY" ? 1 : -1) : 0;
        const positionNotionalQuantity = activePositionWithContractAsset ? Number(Math.abs(activePositionWithContractAsset.posAmt) * (MarkPriceForContractAsset || 0)) : 0;
        const positionInitialMargin = activePositionWithContractAsset
          ? Number(Math.abs(activePositionWithContractAsset.posAmt) * Number(MarkPriceForContractAsset || 0)) / activePositionWithContractAsset?.leverage
          : 0;
        const leverage = leverageDirectory.find((obj) => obj.sym === contractAsset);
        const initialMargin =
          Math.max(Number(askNotionalQuantity) - Number(side * positionNotionalQuantity), Number(bidNotionalQuantity) + Number(side * positionNotionalQuantity)) / (leverage?.leverage || 1); // Use a default leverage value if not found
        totalOpenOrdersMargin = initialMargin - positionInitialMargin;
      }
      // Max Addable Margin to a Position(Position specific isolated Wallet) : min (crossWalletBalance - ∑Open Order Initial Margin - ∑crossPosition Maintenance Margin, Available Balance(to place new order))
      const maxAddableMargin = Math.min(
        Number(crossWalletBalance) - Number(totalMaintenanceMarginOfAllCrossedContracts) - Number(totalOpenOrdersMargin),
        Number(availableBalanceForPlacingNewOrderWithCrossedPositions)
      );
      setMaximumMarginPermissible((maxAddableMargin && (maxAddableMargin * 0.98).toFixed(3)) || 0);
    } else {
      // min [{isolatedWalletBalance, isolatedWalletBalance + size * (Mark Price - Entry Price) - Mark Price * (contract size)/Leverage)}]
      const maxRemovableMargin = Math.min(
        Number(marginUsed),
        Number(marginUsed) +
          Number(currentPositionData?.posAmt) * (Number(selectedPositionAuxiliaryMarkPrice) - Number(currentPositionData?.entryPrice)) -
          Math.abs(Number(currentPositionData?.posAmt) * Number(selectedPositionAuxiliaryMarkPrice)) / Number(leverageForSelectedPosition)
      );

      setMaximumMarginPermissible(maxRemovableMargin > 0 ? maxRemovableMargin && (maxRemovableMargin * 0.98).toFixed(3) : 0);
    }
  }, [selectedDropDownValue, currentPositionData, leverageDirectory]);

  
  useEffect(() => {
    const effectiveMargin = parseFloat(marginUsed) + (selectedDropDownValue === "Add" ? 1 : -1) * parseFloat(marginValue || 0);
    const liquidationPriceUpdated =
      (effectiveMargin + cumulative - selectedPositionForMarginUpdation?.posAmt * selectedPositionForMarginUpdation?.entryPrice) /
      (Math.abs(selectedPositionForMarginUpdation?.posAmt) * maintenanceMarginRate - selectedPositionForMarginUpdation?.posAmt);

    setEstimatedLiquidationPrice(liquidationPriceUpdated > 0 ? liquidationPriceUpdated : "-");
  }, [marginValue]);

  function handleSubmitForMarginChange() {
    if (marginValue === "") {
      setHelperText("Value cannot be empty");
      return;
    } else if (Number(marginValue) > Number(maximumMarginPermissible)) {
      setHelperText("Value greater than the maximum permissible value");
      return;
    } else if (marginValue < 0) {
      setHelperText("Value cannot be negative");
      return;
    } else {
      setHelperText("");
    }
    addRemoveMarginApi({
      symbol: selectedPositionForMarginUpdation.sym,
      amount: selectedDropDownValue === "Add" ? `${marginValue}` : `${-marginValue}`
    })
      .then(() => {
        dispatch(fetchFutureAccountDetails());
        close();
        setMarginValue("");
        dispatch(
          showSnackBar({
            src: ADD_REMOVE_MARGIN_SUCCESS,
            message: "Margin updated successfully!",
            type: "success"
          })
        );
        dispatch({
          type: UPDATE_ISOLATED_WALLET_POS_RISK,
          payload: {
            sym: selectedPositionForMarginUpdation.sym,
            isolatedWallet: parseFloat(marginUsed) + (selectedDropDownValue === "Add" ? 1 : -1) * parseFloat(marginValue || 0)
          }
        });
        dispatch({
          type: UPDATE_ISOLATED_WALLET_POSITIONS,
          payload: {
            sym: selectedPositionForMarginUpdation.sym,
            isolatedWallet: parseFloat(marginUsed) + (selectedDropDownValue === "Add" ? 1 : -1) * parseFloat(marginValue || 0)
          }
        });
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: ADD_REMOVE_MARGIN_FAIL,
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
  }
  const convertToPrecisionValueInContractAssetUnit = (value, Precision) => {
    let numStr = value.toString();
    if (numStr.startsWith(".")) {
      numStr = `0${numStr}`; // Add a leading zero
    }

    numStr = numStr.replace(/-/g, "");
    // Find the index of the decimal point
    const decimalIndex = numStr.indexOf(".");

    // If there is a decimal point, remove the portion before it
    if (decimalIndex !== -1) {
      return (numStr = numStr.substr(0, Precision + decimalIndex + 1));
    } else {
      return numStr;
    }
  };
  const handleMargin = (event) => {
    const value = event.target.value;
    setHelperText("");
    setMarginValue(convertToPrecisionValueInContractAssetUnit(value, 2));
  };
  return {
    handleMargin,
    selectedDropDownValue,
    setSelectedDropDownValue,
    helperText,
    setHelperText,
    estimatedLiquidationPrice,
    handleSubmitForMarginChange,
    marginValue,
    setMarginValue,
    marginUsed,
    maximumMarginPermissible
  };
};
