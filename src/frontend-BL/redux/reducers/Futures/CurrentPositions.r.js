/* eslint-disable no-case-declarations */
import {
  CREATE_POSIITON_ACCOUNT_INFO,
  ADD_ISOLATED_WALLET_ACCOUNT_UPDATE,
  CREATE_NEW_POSITION_WEB_STREAM,
  UPDATE_ACTIVE_POSITIONS_WEB_STREAM,
  UPDATE_ISOLATED_WALLET_POS_RISK,
  SET_LIQUIDATION_PRICE,
  UPDATE_LIQUIDATION_PRICE,
  REMOVE_POSITIONS_QUANT,
  SET_LEVERAGE_POS_RISK,
  SET_MARGIN_TYPE,
  ERASE_POSITION_DIRECTORY,
  SET_UNREALISED_PROFITLOSS,
  REMOVE_UNREALISED_PROFITLOSS,
  SET_UNREALISED_PROFITLOSS_CROSS,
  SET_CROSS_WALLET_DETAILS,
  REMOVE_CROSS_WALLET_DETAILS,
  UPDATE_ISOLATED_WALLET_POSITIONS,
  CLEAR_UNREALISED_PROFITLOSS,
  API_SNAPSHOT_UPDATED,
  SET_UNREALISED_PROFITLOSS_CROSS_BASED_ON_LTP,
  SET_UNREALISED_PROFITLOSS_BASED_ON_LTP
} from "../../../redux/constants/Constants";

const initialState = {
  currentPositions: [],
  isolatedWallet: [],
  liquidationPrice: [],
  leverage: [],
  marginType: [],
  unRealizedPnL: [],
  unRealizedPnLCalculatedBasedOnLastTradedPrice: [],
  unRealizedPnLForCross: [],
  unRealizedPnLForCrossCalculatedBasedOnLastTradedPrice: [],
  crossWalletDetails: [],
  isSnapshotUpdated: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ERASE_POSITION_DIRECTORY:
      return {
        ...state,
        currentPositions: []
      };
    case CREATE_POSIITON_ACCOUNT_INFO:
      const positionIndex = state.currentPositions.findIndex((activePosition) => activePosition.sym?.toUpperCase() === payload.sym.toUpperCase());

      if (positionIndex !== -1) {
        const updatedPosition = {
          ...state.currentPositions[positionIndex],
          ...payload
        };

        let isDifferent = false;

        for (const key in payload) {
          if (payload[key] !== updatedPosition[key]) {
            isDifferent = true;
            break;
          }
        }

        if (isDifferent) {
          return {
            ...state,
            currentPositions: [...state.currentPositions.slice(0, positionIndex), updatedPosition, ...state.currentPositions.slice(positionIndex + 1)]
          };
        } else {
          return {
            ...state
          };
        }
      } else {
        return {
          ...state,
          currentPositions: [
            ...state.currentPositions,
            {
              ...payload
            }
          ]
        };
      }

    case SET_LIQUIDATION_PRICE:
      const liquidationPriceIndex = state.liquidationPrice.findIndex((pos) => pos.sym.toUpperCase() === payload.sym.toUpperCase());
      if (liquidationPriceIndex === -1) {
        return {
          ...state,
          liquidationPrice: [
            ...state.liquidationPrice,
            {
              sym: payload.sym,
              liquidationPrice: payload.liquidationPrice
            }
          ]
        };
      } else {
        return {
          ...state,
          liquidationPrice: [
            ...state.liquidationPrice.slice(0, liquidationPriceIndex),
            {
              ...state.liquidationPrice[liquidationPriceIndex],
              liquidationPrice: payload.liquidationPrice
            },
            ...state.liquidationPrice.slice(liquidationPriceIndex + 1)
          ]
        };
      }
    case UPDATE_LIQUIDATION_PRICE:
      const liquidationPrice = state.liquidationPrice.findIndex((pos) => pos.sym.toUpperCase() === payload.sym.toUpperCase());
      if (liquidationPrice === -1) {
        return {
          ...state,
          liquidationPrice: [
            ...state.liquidationPrice,
            {
              sym: payload.sym,
              liquidationPrice: payload.liquidationPrice
            }
          ]
        };
      } else {
        return {
          ...state,
          liquidationPrice: [
            ...state.liquidationPrice.slice(0, liquidationPrice),
            {
              ...state.liquidationPrice[liquidationPrice],
              liquidationPrice: payload.liquidationPrice
            },
            ...state.liquidationPrice.slice(liquidationPrice + 1)
          ]
        };
      }

    case ADD_ISOLATED_WALLET_ACCOUNT_UPDATE:
      const checkIfPositionExist = state.isolatedWallet.findIndex((pos) => pos.sym.toUpperCase() === payload.sym.toUpperCase());
      if (checkIfPositionExist === -1) {
        return {
          ...state,
          isolatedWallet: [
            ...state.isolatedWallet,
            {
              sym: payload.s,
              isolatedWallet: payload.iw
            }
          ]
        };
      } else {
        return {
          ...state,
          isolatedWallet: [
            ...state.isolatedWallet.slice(0, checkIfPositionExist),
            {
              ...state.isolatedWallet[checkIfPositionExist],
              isolatedWallet: payload.iw
            },
            ...state.isolatedWallet.slice(checkIfPositionExist + 1)
          ]
        };
      }

    case UPDATE_ISOLATED_WALLET_POS_RISK:
      const isolatedWalletIndex = state.isolatedWallet.findIndex((pos) => pos.sym.toUpperCase() === payload.sym.toUpperCase());
      if (isolatedWalletIndex === -1) {
        return {
          ...state,
          isolatedWallet: [
            ...state.isolatedWallet,
            {
              sym: payload.sym,
              isolatedWallet: payload.isolatedWallet
            }
          ]
        };
      } else {
        return {
          ...state,
          isolatedWallet: [
            ...state.isolatedWallet.slice(0, isolatedWalletIndex),
            {
              ...state.isolatedWallet[isolatedWalletIndex],
              isolatedWallet: payload.isolatedWallet
            },
            ...state.isolatedWallet.slice(isolatedWalletIndex + 1)
          ]
        };
      }
    case UPDATE_ISOLATED_WALLET_POSITIONS:
      const isolatedWalletPositionsIndex = state.currentPositions.findIndex((pos) => pos.sym.toUpperCase() === payload.sym.toUpperCase());
      if (isolatedWalletPositionsIndex !== -1) {
        const updatedPosition = {
          ...state.currentPositions[isolatedWalletPositionsIndex],
          ...payload
        };
        return {
          ...state,
          currentPositions: [...state.currentPositions.slice(0, isolatedWalletPositionsIndex), updatedPosition, ...state.currentPositions.slice(isolatedWalletPositionsIndex + 1)]
        };
      }
      break;
    case SET_LEVERAGE_POS_RISK: {
      const PreviousData = state.leverage.filter((item) => item.sym.toUpperCase() !== payload.sym.toUpperCase());
      return {
        ...state,
        leverage: [...PreviousData, payload]
      };
    }
    case CREATE_NEW_POSITION_WEB_STREAM:
      return {
        ...state,
        currentPositions: [
          ...state.currentPositions,
          {
            sym: payload.sym,
            leverage: 0,
            side: payload.side,
            entryPrice: payload.entryPrice,
            posAmt: payload.posAmt,
            marginType: payload.marginType
          }
        ]
      };

    case UPDATE_ACTIVE_POSITIONS_WEB_STREAM:
      // based on trade_order_update stream only
      const activePositionIndex = state.currentPositions.findIndex((activePosition) => activePosition.sym.toUpperCase() === payload.sym.toUpperCase());
      if (activePositionIndex === -1) {
        return {
          ...state
        };
      } else {
        return {
          ...state,
          currentPositions: [
            ...state.currentPositions.slice(0, activePositionIndex),
            {
              ...state.currentPositions[activePositionIndex],
              side: payload.posAmt > 0 ? "BUY" : "SELL",
              ...payload
            },
            ...state.currentPositions.slice(activePositionIndex + 1)
          ]
        };
      }

    case REMOVE_POSITIONS_QUANT:
      const posIndex = state.currentPositions.findIndex((pos) => pos.sym.toUpperCase() === payload.toUpperCase());
      if (posIndex !== -1) {
        return {
          ...state,
          currentPositions: [...state.currentPositions.slice(0, posIndex), ...state.currentPositions.slice(posIndex + 1)]
        };
      } else {
        return {
          ...state
        };
      }
    case SET_UNREALISED_PROFITLOSS: {
      const oldDate = state.unRealizedPnL.filter((item) => item.symbol.toUpperCase() !== payload.symbol.toUpperCase());
      return {
        ...state,

        unRealizedPnL: [...oldDate, payload]
      };
    }
    case SET_UNREALISED_PROFITLOSS_BASED_ON_LTP: {
      const oldDate = state.unRealizedPnLCalculatedBasedOnLastTradedPrice.filter((item) => item.symbol.toUpperCase() !== payload.symbol.toUpperCase());
      return {
        ...state,

        unRealizedPnLCalculatedBasedOnLastTradedPrice: [...oldDate, payload]
      };
    }
    case SET_UNREALISED_PROFITLOSS_CROSS: {
      const oldDateCross = state.unRealizedPnLForCross.filter((item) => item.symbol.toUpperCase() !== payload.symbol.toUpperCase());
      return {
        ...state,

        unRealizedPnLForCross: [...oldDateCross, payload]
      };
    }

    case SET_UNREALISED_PROFITLOSS_CROSS_BASED_ON_LTP: {
      const oldDateCross = state.unRealizedPnLForCrossCalculatedBasedOnLastTradedPrice.filter((item) => item.symbol.toUpperCase() !== payload.symbol.toUpperCase());
      return {
        ...state,

        unRealizedPnLForCrossCalculatedBasedOnLastTradedPrice: [...oldDateCross, payload]
      };
    }
    case REMOVE_UNREALISED_PROFITLOSS: {
      const oldLiqData = state.liquidationPrice.filter((item) => item.sym.toUpperCase() !== payload.symbol.toUpperCase());
      const oldDate = state.unRealizedPnL.filter((item) => item.symbol.toUpperCase() !== payload.symbol.toUpperCase());
      const oldDateCross = state.unRealizedPnLForCross.filter((item) => item.symbol.toUpperCase() !== payload.symbol.toUpperCase());
      const oldDateBasedOnLTP = state.unRealizedPnLCalculatedBasedOnLastTradedPrice.filter((item) => item.symbol.toUpperCase() !== payload.symbol.toUpperCase());
      const oldDateCrossBasedOnLTP = state.unRealizedPnLForCrossCalculatedBasedOnLastTradedPrice.filter((item) => item.symbol.toUpperCase() !== payload.symbol.toUpperCase());

      return {
        ...state,
        unRealizedPnLForCross: oldDateCross,
        unRealizedPnL: oldDate,
        liquidationPrice: oldLiqData,
        unRealizedPnLCalculatedBasedOnLastTradedPrice: oldDateBasedOnLTP,
        unRealizedPnLForCrossCalculatedBasedOnLastTradedPrice: oldDateCrossBasedOnLTP
      };
    }
    case CLEAR_UNREALISED_PROFITLOSS: {
      return {
        ...state,
        unRealizedPnLForCross: [],
        unRealizedPnLCalculatedBasedOnLastTradedPrice: [],
        unRealizedPnLForCrossCalculatedBasedOnLastTradedPrice: [],
        unRealizedPnL: []
      };
    }
    case REMOVE_CROSS_WALLET_DETAILS: {
      const previousData = state.crossWalletDetails.filter((item) => item.symbol.toUpperCase() !== payload.symbol.toUpperCase());
      return {
        ...state,
        crossWalletDetails: previousData
      };
    }
    case SET_CROSS_WALLET_DETAILS:
      const CrossPositionIndex = state.crossWalletDetails.findIndex((activePosition) => activePosition.symbol.toUpperCase() === payload.symbol.toUpperCase());
      if (CrossPositionIndex !== -1) {
        // Convert properties to numbers for comparison
        const existingDetails = state.crossWalletDetails[CrossPositionIndex];
        const existingMargin = Number(existingDetails.margin);
        const existingPosAmt = Number(existingDetails.posAmt);
        const existingMaintMargin = Number(existingDetails.maintMargin);
        const existingMarginBalance = Number(existingDetails.marginBalance);
        const existingInitialMargin = Number(existingDetails.initialMargin);
        const existingMarginRatio = Number(existingDetails.marginRatio);
        const existingCum = Number(existingDetails?.cum);

        // Convert payload properties to numbers for comparison
        const newMargin = Number(payload.margin);
        const newPosAmt = Number(payload.posAmt);
        const newMaintMargin = Number(payload.maintMargin);
        const newMarginBalance = Number(payload.marginBalance);
        const newInitialMargin = Number(payload.initialMargin);
        const newInitialMarginRatio = Number(payload.marginRatio);
        const newCum = Number(payload?.cum);
        // Check if any of the values are different
        if (
          existingMargin !== newMargin ||
          existingPosAmt !== newPosAmt ||
          existingMaintMargin !== newMaintMargin ||
          existingMarginBalance !== newMarginBalance ||
          existingInitialMargin !== newInitialMargin ||
          existingMarginRatio !== newInitialMarginRatio ||
          newCum !== existingCum
          // Add more conditions to compare other properties if needed
        ) {
          return {
            ...state,
            crossWalletDetails: [
              ...state.crossWalletDetails.slice(0, CrossPositionIndex),
              {
                ...existingDetails, // Keep existing values
                ...payload // Overwrite with new values
              },
              ...state.crossWalletDetails.slice(CrossPositionIndex + 1)
            ]
          };
        } else {
          // No changes, return the existing state
          return state;
        }
      } else {
        return {
          ...state,
          crossWalletDetails: [
            ...state.crossWalletDetails,
            {
              ...payload
            }
          ]
        };
      }

    case API_SNAPSHOT_UPDATED: {
      return {
        ...state,
        isSnapshotUpdated: payload
      };
    }

    case SET_MARGIN_TYPE: {
      const PreviousData = state.marginType.filter((item) => item.sym.toUpperCase() === payload.sym.toUpperCase());
      const PreviousData2 = state.marginType.filter((item) => item.sym.toUpperCase() !== payload.sym.toUpperCase());
      if (PreviousData.length > 0) {
        if (PreviousData[0].marginType !== payload.marginType) {
          return { ...state, marginType: [...PreviousData2, payload] };
        }
      } else {
        return { ...state, marginType: [...state.marginType, payload] };
      }
      return { ...state };
    }
    default:
      return state;
  }
}
