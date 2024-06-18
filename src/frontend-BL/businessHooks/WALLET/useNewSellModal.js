import { fiatExchangeRateApi, fiatSellUsdt, getFuturesAccountDetailsApi } from "../../../frontend-api-service/Api";
import { walletScreenRender } from "../../redux/actions/Internal/WalletScreenRender.ac";
import { FETCH_FIAT_EXCHANGE_RATE_FAIL, FETCH_FUTURES_ACCOUNT_DETAILS_FAIL, GLOBAL_ERROR_ADD, GLOBAL_ERROR_REMOVE, SELL_USDT_FAIL } from "../../redux/constants/Constants";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WALLET_CONSTANTS } from "./Constants/WalletConstants.const";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { fetchFutureAccountDetails } from "@/frontend-BL/redux/actions/Futures/Futures.ac";

export const useNewSellModal = () => {
  const walletScreenRenderBoolean = useSelector((state) => state.walletScreenRender.walletScreenRenderFlag);
  const [showUSDTConversionStep, setShowUSDTConversionStep] = useState("main");
  const [USDTConversionHelperText, setUSDTConversionHelperText] = useState("");
  const [USDTConversionAmount, setUSDTConversionAmount] = useState({
    freeMarginBalance: 0,
    amountInInr: "",
    amountInUsdt: "",
    TDS: 0,
    getAmount: 0,
    OTP: ""
  });
  const [conversionRateforUSDT, setConversionRateForUSDT] = useState(0);
  const [conversionRateforINR, setConversionRateForINR] = useState(0);
  const [loadingUsdtSell, setLoadingUsdtSell] = useState(false);
  const dispatch = useDispatch();
  const SETAMOUNTDATA = useCallback(
    (payload) => {
      setUSDTConversionAmount(payload);
      validateUSDTInput(payload.amountInUsdt);
    },
    [USDTConversionAmount]
  );
  useEffect(() => {
    fiatExchangeRateApi()
      .then((successResponse) => {
        setConversionRateForINR(successResponse.data.inr);
        setConversionRateForUSDT(1 / successResponse.data.inr);
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: FETCH_FIAT_EXCHANGE_RATE_FAIL,
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
    getFuturesAccountDetailsApi()
      .then((successResponse) => {
        SETAMOUNTDATA({
          ...USDTConversionAmount,
          freeMarginBalance: successResponse?.data?.availableBalance
        });
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: FETCH_FUTURES_ACCOUNT_DETAILS_FAIL,
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
  }, []);
  const validateUSDTInput = (value) => {
    if (value === "") {
      setUSDTConversionHelperText("");
      return;
    }
    if (value < 0) {
      setUSDTConversionHelperText(WALLET_CONSTANTS.AMOUNT_NOT_NEGATIVE_LABEL);
    } else if (value < WALLET_CONSTANTS.MINIMUM_USDT_SELL) {
      setUSDTConversionHelperText(WALLET_CONSTANTS.MINIMUM_USDT_SELL_LABEL);
    } else if (value > Math.trunc(USDTConversionAmount?.freeMarginBalance * 100) / 100) {
      if (value > 1000) {
        setUSDTConversionHelperText(WALLET_CONSTANTS.MAXIMUM_USDT_SELL_LABEL);
      } else {
        setUSDTConversionHelperText(WALLET_CONSTANTS.EXCEEDS_AVAILABLE_BALANCE_USDT);
      }
    } else if (value > 1000) {
      setUSDTConversionHelperText(WALLET_CONSTANTS.MAXIMUM_USDT_SELL_LABEL);
    } else {
      setUSDTConversionHelperText("");
    }
  };
  const USDTTOINR = (payload) => {
    if (payload < 0) return;
    SETAMOUNTDATA({
      ...USDTConversionAmount,
      amountInUsdt: payload,
      amountInInr: parseFloat(payload / conversionRateforUSDT).toFixed(2),
      getAmount: parseFloat((payload / conversionRateforUSDT) * ((100 - WALLET_CONSTANTS.TDS_AMOUNT_PERCENTAGE) / 100)).toFixed(2),
      TDS: parseFloat(payload / conversionRateforUSDT) - parseFloat((payload / conversionRateforUSDT) * ((100 - WALLET_CONSTANTS.TDS_AMOUNT_PERCENTAGE) / 100))
    });
  };
  // const INRtoUSDT = (payload) => {
  //   const currentAmountInUsdt = parseFloat(
  //     payload * conversionRateforUSDT
  //   ).toFixed(2);
  //   SETAMOUNTDATA({
  //     ...Amount,
  //     amountInInr: payload,
  //     amountInUsdt: currentAmountInUsdt,
  //     getAmount: parseFloat(
  //       payload * ((100 - WALLET_CONSTANTS.TDS_AMOUNT_PERCENTAGE) / 100)
  //     ).toFixed(2),
  //     TDS:
  //       parseFloat(payload) -
  //       parseFloat(
  //         payload * ((100 - WALLET_CONSTANTS.TDS_AMOUNT_PERCENTAGE) / 100)
  //       )
  //   });
  // };

  const callSellUsdtAPI = () => {
    setLoadingUsdtSell(true);
    fiatSellUsdt(
      JSON.stringify({
        transactionType: "SELL",
        amount: (Math.trunc(parseFloat(USDTConversionAmount?.amountInUsdt) * 100) / 100).toString()
      })
    )
      .then((successResponse) => {
        // setShowLoader(false);
        setTimeout(() => dispatch(walletScreenRender(true, !walletScreenRenderBoolean)), 2000);
        setLoadingUsdtSell(false);
        setShowUSDTConversionStep("success");
        dispatch(fetchFutureAccountDetails());
      })
      .catch((errorResponse) => {
        dispatch({
          type: GLOBAL_ERROR_ADD,
          payload: {
            src: SELL_USDT_FAIL,
            errorMessage: errorResponse.response.data.details,
            errorCode: errorResponse.response.status,
            dialogType: "failure",
            errorUi: "SNACKBAR",
            errorHandlerForReduxStateUpdation: () =>
              dispatch({
                type: GLOBAL_ERROR_REMOVE,
                payload: { src: SELL_USDT_FAIL }
              })
          }
        });
        setLoadingUsdtSell(false);
      });
  };
  const SubmitUSDTConversionFormData = () => {
    if (USDTConversionHelperText.length > 0) return;
    if (USDTConversionAmount?.amountInUsdt === "") {
      setUSDTConversionHelperText(WALLET_CONSTANTS.NOT_EMPTY_LABEL);
    } else {
      setShowUSDTConversionStep("confirm");
    }
  };
  const handleMaxClickForUsdt = (value) => {
    let maxValue;
    if (Math.trunc(value * 100) / 100 > 1000) {
      maxValue = 1000;
    } else {
      maxValue = Math.trunc(value * 100) / 100;
    }
    SETAMOUNTDATA({
      ...USDTConversionAmount,
      TDS: parseFloat(maxValue / conversionRateforUSDT) - parseFloat((maxValue / conversionRateforUSDT) * ((100 - WALLET_CONSTANTS.TDS_AMOUNT_PERCENTAGE) / 100)),
      amountInUsdt: maxValue,
      getAmount: parseFloat((maxValue / conversionRateforUSDT) * ((100 - WALLET_CONSTANTS.TDS_AMOUNT_PERCENTAGE) / 100)).toFixed(2),
      amountInInr: parseFloat(maxValue / conversionRateforUSDT).toFixed(2)
    });
  };
  const primaryUSDTActionName = showUSDTConversionStep !== "confirm" ? "Submit" : "Confirm";
  return {
    showUSDTConversionStep,
    USDTConversionHelperText,
    SubmitUSDTConversionFormData,
    USDTConversionAmount,
    primaryUSDTActionName,
    USDTTOINR,
    SETAMOUNTDATA,
    handleMaxClickForUsdt,
    conversionRateforINR,
    callSellUsdtAPI,
    loadingUsdtSell,
    setShowUSDTConversionStep
  };
};
